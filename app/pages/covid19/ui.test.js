import { extractInnerText } from 'buying-catalogue-library';
import { Selector, ClientFunction } from 'testcafe';
import covid19Data from './data/non-production/covid19-solutions.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/solutions/covid19');
};

fixture('Show covid19 Page');

test('should display the covid19 solution cards', async (t) => {
  await pageSetup(t);
  await t
    .expect(Selector('div[data-test-id="solution-card-covid19"]').count).eql(covid19Data.solutions.length);
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
  const firstSolutionId = covid19Data.solutions[0].id;
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation())
    .contains(`/solutions/covid19/${firstSolutionId}`);
});

const defaultSections = {
  'should display the covid19 page title': '[data-test-id="general-description"] h1',
  'should display the covid19 page inset text': '[data-test-id="covid19-inset-text"]',
  'should display the covid19 card title': '[data-test-id="solution-card-covid19-title"]',
};

Object.keys(defaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(defaultSections[key]);
    await t
      .expect(element.exists).ok();
  });
});
