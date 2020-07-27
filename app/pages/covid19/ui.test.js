import { extractInnerText } from 'buying-catalogue-library';
import { Selector, ClientFunction } from 'testcafe';

import manifest from './manifest.json';
import covid19Data from './data/non-production/covid19-solutions.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/solutions/covid19');
};

fixture('Show covid19 Page');

test('should display the covid19 page title', async (t) => {
  await pageSetup(t);
  const title = Selector('h1[data-test-id="general-page-title"]');
  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(manifest.title);
});

test('should display the covid19 page description', async (t) => {
  await pageSetup(t);
  const pageDescription = Selector('h2[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(await extractInnerText(pageDescription)).eql(manifest.description);
});

test('should display the covid19 page inset text', async (t) => {
  await pageSetup(t);
  const pageInsetText = Selector('[data-test-id="covid19-inset-text"]');
  await t
    .expect(pageInsetText.exists).ok()
    .expect(pageInsetText.find('p').count).eql(manifest.insetText.length);
});

test('should display the covid19 solution cards', async (t) => {
  await pageSetup(t);
  await t
    .expect(Selector('div[data-test-id="solution-card-covid19"]').count).eql(covid19Data.solutions.length);
});

test('should display the covid19 solution details of a solution card', async (t) => {
  await pageSetup(t);
  const solutionCardsSection = Selector('div[data-test-id="solution-cards-covid19"]');
  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card-covid19"]:nth-child(1)');
  const covid19Tag = solutionCard.find('div[data-test-id="solution-card-covid19-tag"]');
  await t
    .expect(covid19Tag.exists).ok()
    .expect(await extractInnerText(covid19Tag)).eql('Coronavirus')
    .expect(await extractInnerText(solutionCard.find('h3'))).eql(covid19Data.solutions[0].name)
    .expect(await extractInnerText(solutionCard.find('h4[data-test-id="solution-card-supplier"]'))).eql(covid19Data.solutions[0].supplier.name)
    .expect(await extractInnerText(solutionCard.find('p[data-test-id="solution-card-summary"]'))).eql(covid19Data.solutions[0].summary);
});

test('should display the covid19 card title', async (t) => {
  await pageSetup(t);
  const covid19Title = Selector('[data-test-id="solution-card-covid19-title"]');
  await t
    .expect(covid19Title.exists).ok()
    .expect(await extractInnerText(covid19Title)).eql(covid19Data.solutions[0].covid19.title);
});

test('should display the covid19 card list', async (t) => {
  await pageSetup(t);
  const solutionCard = Selector('div[data-test-id="solution-card-covid19"]:nth-child(1)');
  const covid19List = solutionCard.find('[data-test-id="solution-card-covid19-list"]');
  await t
    .expect(covid19List.exists).ok()
    .expect(covid19List.find('li').count).eql(covid19Data.solutions[0].covid19.list.length);

  await Promise.all(covid19Data.solutions[0].covid19.list.map(async (listItem, i) => {
    await t
      .expect(covid19List.find('li').count).eql(covid19Data.solutions[0].covid19.list.length)
      .expect(await extractInnerText(covid19List.find(`li:nth-child(${i + 1})`))).eql(listItem);
  }));
});

test('should navigate to the covid19 solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card-covid19"]:nth-child(1) a');
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains('/solutions/covid19/100000-001');
});
