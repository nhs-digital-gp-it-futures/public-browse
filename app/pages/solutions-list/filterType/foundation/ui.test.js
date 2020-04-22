import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aFoundationSolutionList from '../../../../test-utils/fixtures/aFoundationSolutionList.json';
import { extractInnerText } from '../../../../test-utils/helper';

const mocks = async (responseStatus, responseBody) => {
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/Foundation')
    .reply(responseStatus, responseBody);
};

const pageSetup = async (
  t, responseStatus = 200, responseBody = aFoundationSolutionList,
) => {
  await mocks(responseStatus, responseBody);
  await t.navigateTo('http://localhost:1234/solutions/foundation');
};

fixture('Show Foundation Solution List Page')
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
  await pageSetup(t);
  const pageTitle = Selector('h1[data-test-id="general-page-title"]');
  await t
    .expect(pageTitle.exists).ok()
    .expect(await extractInnerText(pageTitle)).eql('Foundation Solution Sets – results');
});

test('should display the page description', async (t) => {
  await pageSetup(t);
  const pageDescription = Selector('h2[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(await extractInnerText(pageDescription)).eql('These Catalogue Solutions meet the 6 Foundation Capabilities that are the minimum requirement to enable a GP practice to operate.');
});

test('should not display the compare description', async (t) => {
  await pageSetup(t);
  const compareDescription = Selector('div[data-test-id="compare-solutions-description"]');
  await t
    .expect(compareDescription.exists).notOk();
});

test('should not display the compare solutions button', async (t) => {
  await pageSetup(t);
  const button = Selector('div[data-test-id="compare-button"] a');
  await t
    .expect(button.exists).notOk();
});

test('should display the capabilities heading', async (t) => {
  await pageSetup(t);
  const capabilityHeading = Selector('div[data-test-id="capability-list"] h5');
  await t
    .expect(capabilityHeading.exists).ok()
    .expect(await extractInnerText(capabilityHeading)).eql('Capabilities met');
});

test('should display the foundation solution cards', async (t) => {
  await pageSetup(t);
  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});

test('should display the foundation solution details of a solution card', async (t) => {
  await pageSetup(t);
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

test('should display the capability details of a foundation solution card', async (t) => {
  await pageSetup(t);
  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');
  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(await extractInnerText(capabilityList.find('li:nth-child(1)'))).eql('some capability name');
});

test('should navigate to the foundation solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup(t);
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/S1/Public')
    .reply(200);
  const getLocation = ClientFunction(() => document.location.href);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card"]:nth-child(1) a');
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains('/solutions/foundation/S1');
});

test('should render the error page when receiving an error from the foundation solution list api endpoint', async (t) => {
  await pageSetup(t, 500, {});

  const errorTitle = Selector('[data-test-id="error-page-title"]');

  await t
    .expect(errorTitle.exists).ok();
});
