import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aCustomSolutionList from '../../../../test-utils/fixtures/aCustomSolutionList.json';
import capabilitiesList from '../../../../test-utils/fixtures/capabilitiesList.json';
import publicSolutionNoData from '../../../../test-utils/fixtures/publicSolutionNoData.json';
import { extractInnerText } from '../../../../test-utils/helper';
import manifest from './manifest.json';

const getLocation = ClientFunction(() => document.location.href);

const mocks = async (responseStatus, responseBody) => {
  await nock('http://localhost:5100')
    .post('/api/v1/Solutions')
    .reply(responseStatus, responseBody);
};

const pageSetup = async ({
  t,
  responseStatus = 200,
  responseBody = aCustomSolutionList,
  capabilities = ['all'],
}) => {
  await mocks(responseStatus, responseBody);
  await t.navigateTo(`http://localhost:1234/solutions/capabilities-selector.${capabilities.join('+')}`);
};

fixture('Show Capability Selector Solution List Page - one capability selected')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      // eslint-disable-next-line no-console
      console.error(`pending mocks: ${nock.pendingMocks()}`);
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display the page title', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  const title = Selector('h1[data-test-id="general-page-title"]');
  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(manifest.title);
});

test('should display the page description', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  const pageDescription = Selector('h2[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(await extractInnerText(pageDescription)).eql(manifest.description);
});

test('should display the compare description', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  const compareDescription = Selector('div[data-test-id="compare-solutions-description"]');
  await t
    .expect(compareDescription.exists).ok()
    .expect(await extractInnerText(compareDescription)).eql(manifest.compareSolutionsDescription);
});

test('should display the compare solutions button', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  const button = Selector('div[data-test-id="compare-button"] a');
  await t
    .expect(button.exists).ok()
    .expect(await extractInnerText(button)).eql(manifest.compareButtonText)
    .expect(button.getAttribute('href')).eql('/compare/document');
});

test('should display the capabilities heading', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  const capabilityHeading = Selector('div[data-test-id="capability-list"] h5');
  await t
    .expect(capabilityHeading.exists).ok()
    .expect(await extractInnerText(capabilityHeading)).eql('Capabilities met');
});

test('should display the solution cards', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});

test('should display the solution details of a solution card', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  const solutionCardsSection = Selector('div[data-test-id="solution-cards"]');
  await t
    .expect(solutionCardsSection.find('div[data-test-id="solution-card"]').count).eql(2);

  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card"]:nth-child(1)');
  const foundationTag = solutionCard.find('div[data-test-id="solution-card-foundation"]');
  await t
    .expect(foundationTag.exists).ok()
    .expect(await extractInnerText(foundationTag)).eql('Foundation Solution Set')
    .expect(await extractInnerText(solutionCard.find('h4[data-test-id="solution-card-supplier"]'))).eql('some supplier name')
    .expect(await extractInnerText(solutionCard.find('h3'))).eql('some foundation solution name')
    .expect(await extractInnerText(solutionCard.find('p[data-test-id="solution-card-summary"]'))).eql('some foundation solution summary');
});

test('should display the capability details of a solution card', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');
  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(await extractInnerText(capabilityList.find('li:nth-child(1)'))).eql('some capability name');
});

test('should navigate to the solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/S1/Public')
    .reply(200, publicSolutionNoData);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card"]:nth-child(1) a');
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains('/solutions/capabilities-selector.C1/S1')
    .expect(Selector('[data-test-id="view-solution-header"]').exists).ok();
});

test('should navigate back to the capabilities-selector when backlink is clicked', async (t) => {
  await pageSetup({ t, capabilities: ['C1'] });
  await nock('http://localhost:5100')
    .get('/api/v1/Capabilities')
    .reply(200, capabilitiesList);
  const backLink = Selector('[data-test-id="go-back-link"] a');
  await t
    .expect(backLink.exists).ok()
    .click(backLink)
    .expect(getLocation()).contains('/solutions/capabilities-selector')
    .expect(Selector('[data-test-id="capabilities-selector-page-title"]').exists).ok();
});

fixture('Show Capability Selector Solution List Page - multiple capabilities selected')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      // eslint-disable-next-line no-console
      console.error(`pending mocks: ${nock.pendingMocks()}`);
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display the page title', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  const title = Selector('h1[data-test-id="general-page-title"]');
  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(manifest.title);
});

test('should display the page description', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  const pageDescription = Selector('h2[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(await extractInnerText(pageDescription)).eql(manifest.description);
});

test('should display the capabilities heading', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  const capabilityHeading = Selector('div[data-test-id="capability-list"] h5');
  await t
    .expect(capabilityHeading.exists).ok()
    .expect(await extractInnerText(capabilityHeading)).eql('Capabilities met');
});

test('should display the solution cards', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});

test('should display the solution details of a solution card', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  const solutionCardsSection = Selector('div[data-test-id="solution-cards"]');
  await t
    .expect(solutionCardsSection.find('div[data-test-id="solution-card"]').count).eql(2);

  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card"]:nth-child(1)');
  const foundationTag = solutionCard.find('div[data-test-id="solution-card-foundation"]');
  await t
    .expect(foundationTag.exists).ok()
    .expect(await extractInnerText(foundationTag)).eql('Foundation Solution Set')
    .expect(await extractInnerText(solutionCard.find('h4[data-test-id="solution-card-supplier"]'))).eql('some supplier name')
    .expect(await extractInnerText(solutionCard.find('h3'))).eql('some foundation solution name')
    .expect(await extractInnerText(solutionCard.find('p[data-test-id="solution-card-summary"]'))).eql('some foundation solution summary');
});

test('should display the capability details of a solution card', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');
  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(await extractInnerText(capabilityList.find('li:nth-child(1)'))).eql('some capability name');
});

test('should navigate to the solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/S1/Public')
    .reply(200, publicSolutionNoData);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card"]:nth-child(1) a');
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains('/solutions/capabilities-selector.C1+C2/S1')
    .expect(Selector('[data-test-id="view-solution-header"]').exists).ok();
});

test('should navigate back to the capabilities-selector when backlink is clicked', async (t) => {
  await pageSetup({ t, capabilities: ['C1', 'C2'] });
  await nock('http://localhost:5100')
    .get('/api/v1/Capabilities')
    .reply(200, capabilitiesList);
  const backLink = Selector('[data-test-id="go-back-link"] a');
  await t
    .expect(backLink.exists).ok()
    .click(backLink)
    .expect(getLocation()).contains('/solutions/capabilities-selector')
    .expect(Selector('[data-test-id="capabilities-selector-page-title"]').exists).ok();
});

fixture('Show Capability Selector Solution List Page - no capabilities selected')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      // eslint-disable-next-line no-console
      console.error(`pending mocks: ${nock.pendingMocks()}`);
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display the page title', async (t) => {
  await pageSetup({ t });
  const title = Selector('h1[data-test-id="general-page-title"]');
  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(manifest.title);
});

test('should display the page description', async (t) => {
  await pageSetup({ t });
  const pageDescription = Selector('h2[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(await extractInnerText(pageDescription)).eql(manifest.description);
});

test('should display the capabilities heading', async (t) => {
  await pageSetup({ t });
  const capabilityHeading = Selector('div[data-test-id="capability-list"] h5');
  await t
    .expect(capabilityHeading.exists).ok()
    .expect(await extractInnerText(capabilityHeading)).eql('Capabilities met');
});

test('should display the solution cards', async (t) => {
  await pageSetup({ t });
  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});

test('should display the solution details of a solution card', async (t) => {
  await pageSetup({ t });
  const solutionCardsSection = Selector('div[data-test-id="solution-cards"]');
  await t
    .expect(solutionCardsSection.find('div[data-test-id="solution-card"]').count).eql(2);

  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card"]:nth-child(1)');
  const foundationTag = solutionCard.find('div[data-test-id="solution-card-foundation"]');
  await t
    .expect(foundationTag.exists).ok()
    .expect(await extractInnerText(foundationTag)).eql('Foundation Solution Set')
    .expect(await extractInnerText(solutionCard.find('h4[data-test-id="solution-card-supplier"]'))).eql('some supplier name')
    .expect(await extractInnerText(solutionCard.find('h3'))).eql('some foundation solution name')
    .expect(await extractInnerText(solutionCard.find('p[data-test-id="solution-card-summary"]'))).eql('some foundation solution summary');
});

test('should display the capability details of a solution card', async (t) => {
  await pageSetup({ t });
  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');
  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(await extractInnerText(capabilityList.find('li:nth-child(1)'))).eql('some capability name');
});

test('should navigate to the solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup({ t });
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/S1/Public')
    .reply(200, publicSolutionNoData);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card"]:nth-child(1) a');
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains('/solutions/capabilities-selector.all/S1')
    .expect(Selector('[data-test-id="view-solution-header"]').exists).ok();
});

test('should navigate back to the capabilities-selector when backlink is clicked', async (t) => {
  await pageSetup({ t });
  await nock('http://localhost:5100')
    .get('/api/v1/Capabilities')
    .reply(200, capabilitiesList);
  const backLink = Selector('[data-test-id="go-back-link"] a');
  await t
    .expect(backLink.exists).ok()
    .click(backLink)
    .expect(getLocation()).contains('/solutions/capabilities-selector')
    .expect(Selector('[data-test-id="capabilities-selector-page-title"]').exists).ok();
});


fixture('Show Capability Selector Solution List Page Error')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      // eslint-disable-next-line no-console
      console.error(`pending mocks: ${nock.pendingMocks()}`);
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should render the error page when receiving an error from the solution api endpoint', async (t) => {
  await pageSetup({ t, responseStatus: 500, responseBody: {} });

  const errorTitle = Selector('[data-test-id="error-title"]');

  await t
    .expect(errorTitle.exists).ok();
});
