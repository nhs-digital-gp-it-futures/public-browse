import { extractInnerText } from 'buying-catalogue-library';
import { Selector, ClientFunction } from 'testcafe';

import manifest from './manifest.json';
import vaccinationsData from './data/non-production/vaccinations-solutions.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/solutions/vaccinations');
};

fixture('Show vaccinations Page');

test('should display the vaccinations page title', async (t) => {
  await pageSetup(t);
  const title = Selector('h1[data-test-id="general-page-title"]');
  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(manifest.title);
});

test('should display the vaccinations page description', async (t) => {
  await pageSetup(t);
  const pageDescription = Selector('p[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(await extractInnerText(pageDescription)).eql(manifest.description);
});

test('should display the vaccinations page inset text', async (t) => {
  await pageSetup(t);
  const pageInsetText = Selector('[data-test-id="vaccinations-inset-text"]');
  await t
    .expect(pageInsetText.exists).ok()
    .expect(await extractInnerText(pageInsetText.find('p'))).eql(`${manifest.insetText[0]}${manifest.insetTextLink}${manifest.insetText[1]}`);
});

test('should display the vaccinations solution cards', async (t) => {
  await pageSetup(t);
  await t
    .expect(Selector('div[data-test-id="solution-card-vaccinations"]').count).eql(vaccinationsData.solutions.length);
});

test('should display the vaccinations solution details of a solution card', async (t) => {
  await pageSetup(t);
  const solutionCardsSection = Selector('div[data-test-id="solution-cards-vaccinations"]');
  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card-vaccinations"]:nth-child(1)');
  const vaccinationsTag = solutionCard.find('div[data-test-id="solution-card-vaccinations-tag"]');
  await t
    .expect(vaccinationsTag.exists).ok()
    .expect(await extractInnerText(vaccinationsTag)).eql('Coronavirus vaccinations')
    .expect(await extractInnerText(solutionCard.find('h3'))).eql(vaccinationsData.solutions[0].name)
    .expect(await extractInnerText(solutionCard.find('h4[data-test-id="solution-card-supplier"]'))).eql(vaccinationsData.solutions[0].supplier.name)
    .expect(await extractInnerText(solutionCard.find('p[data-test-id="solution-card-summary"]'))).eql(vaccinationsData.solutions[0].summary);
});

test('should display the vaccinations card title', async (t) => {
  await pageSetup(t);
  const vaccinationsTitle = Selector('[data-test-id="solution-card-vaccinations-title"]');
  await t
    .expect(vaccinationsTitle.exists).ok()
    .expect(await extractInnerText(vaccinationsTitle))
    .eql(vaccinationsData.solutions[0].vaccinations.title);
});

test('should display the vaccinations card list', async (t) => {
  await pageSetup(t);
  const solutionCard = Selector('div[data-test-id="solution-card-vaccinations"]:nth-child(1)');
  const vaccinationsList = solutionCard.find('[data-test-id="solution-card-vaccinations-list"]');
  await t
    .expect(vaccinationsList.exists).ok()
    .expect(vaccinationsList.find('li').count).eql(vaccinationsData.solutions[0].vaccinations.list.length);

  await Promise.all(vaccinationsData.solutions[0].vaccinations.list.map(async (listItem, i) => {
    await t
      .expect(vaccinationsList.find('li').count).eql(vaccinationsData.solutions[0].vaccinations.list.length)
      .expect(await extractInnerText(vaccinationsList.find(`li:nth-child(${i + 1})`))).eql(listItem);
  }));
});

test('should navigate to the vaccinations solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card-vaccinations"]:nth-child(1) a');
  const firstSolutionId = vaccinationsData.solutions[0].id;
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains(`/solutions/vaccinations/${firstSolutionId}`);
});
