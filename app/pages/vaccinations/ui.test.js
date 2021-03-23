import { Selector, ClientFunction } from 'testcafe';

import vaccinationsData from './data/non-production/vaccinations-solutions.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/solutions/vaccinations');
};

fixture('Show vaccinations Page');

test('should navigate to the vaccinations solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card-vaccinations"]:nth-child(1) a');
  const firstSolutionId = vaccinationsData.solutions[0].id;
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation())
    .contains(`/solutions/vaccinations/${firstSolutionId}`);
});

const defaultSections = {
  'should render the title': '[data-test-id="general-description"] h1',
  'should render the description': '[data-test-id="general-description"] h2',
  'should display the vaccinations solution details of a solution card': '[data-test-id="solution-cards-vaccinations"]',
  'should display the vaccinations card title': '[data-test-id="solution-card-vaccinations-title"]',
  'should display the vaccinations card list': '[data-test-id="solution-card-vaccinations-list"]',
};

Object.keys(defaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(defaultSections[key]);
    await t
      .expect(element.exists).ok();
  });
});
