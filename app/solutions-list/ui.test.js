import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aSolutionList from './fixtures/aSolutionList.json';
import aFoundationSolutionList from './fixtures/aFoundationSolutionList.json';

const mockAllSolutions = (responseStatus, responseBody) => {
  nock('http://localhost:8080')
    .get('/api/v1/Solutions')
    .reply(responseStatus, responseBody);
};

const pageSetupAllSolutions = async (t, responseStatus = 200, responseBody = aSolutionList) => {
  mockAllSolutions(responseStatus, responseBody);
  await t.navigateTo('http://localhost:1234/solutions/all');
};

fixture('Show Solution List Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display the page title', async (t) => {
  await pageSetupAllSolutions(t);
  const pageTitle = Selector('h2[data-test-id="general-page-title"]');
  await t
    .expect(pageTitle.exists).ok()
    .expect(pageTitle.innerText).eql('All Solutions results');
});

test('should display the page description', async (t) => {
  await pageSetupAllSolutions(t);
  const pageDescription = Selector('div[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(pageDescription.innerText).eql('These are the Solutions on the GP IT Futures framework available from the Buying Catalogue.');
});

test('should display the capabilities heading', async (t) => {
  await pageSetupAllSolutions(t);
  const capabilityHeading = Selector('div[data-test-id="capability-list"] h4');
  await t
    .expect(capabilityHeading.exists).ok()
    .expect(capabilityHeading.innerText).eql('Capabilities met');
});

test('should display the solution cards', async (t) => {
  await pageSetupAllSolutions(t);
  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});
test('should display the solution details of a solution card', async (t) => {
  await pageSetupAllSolutions(t);
  const solutionCardsSection = Selector('div[data-test-id="solution-cards"]');
  await t
    .expect(solutionCardsSection.find('div[data-test-id="solution-card"]').count).eql(2);

  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card"]:nth-child(1)');
  await t
    .expect(solutionCard.find('div[data-test-id="solution-card-foundation-tag"]').exists).notOk()
    .expect(solutionCard.find('h5[data-test-id="solution-card-organisation"]').innerText).eql('some organisation name')
    .expect(solutionCard.find('h3').innerText).eql('some solution name')
    .expect(solutionCard.find('div[data-test-id="solution-card-summary"]').innerText).eql('some solution summary');
});

test('should display the capability details of a solution card', async (t) => {
  await pageSetupAllSolutions(t);
  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');
  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(capabilityList.find('li:nth-child(1)').innerText).eql('some capability name');
});

test('should navigate to the solution view page when clicking on the title of the solution', async (t) => {
  nock('http://localhost:8080')
    .get('/api/v1/Solutions/S1/Public')
    .reply(200, {});
  await pageSetupAllSolutions(t);
  const getLocation = ClientFunction(() => document.location.href);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card"]:nth-child(1) a');
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains('/solutions/all/S1');
});

test('should navigate to solutions page when click Go back', async (t) => {
  await pageSetupAllSolutions(t);

  const getLocation = ClientFunction(() => document.location.href);
  const goBackLink = Selector('[data-test-id="go-back-link"] a');
  await t
    .expect(goBackLink.exists).ok()
    .click(goBackLink)
    .expect(getLocation()).contains('/solutions');
});

test('should render the error page when receiving an error from the solution list api endpoint', async (t) => {
  await pageSetupAllSolutions(t, 500, {});

  const errorTitle = Selector('[data-test-id="error-page-title"]');

  await t
    .expect(errorTitle.exists).ok();
});

const mockFoundationSolutions = (responseStatus, responseBody) => {
  nock('http://localhost:8080')
    .get('/api/v1/Solutions/Foundation')
    .reply(responseStatus, responseBody);
};

const pageSetupFoundationSolutions = async (
  t, responseStatus = 200, responseBody = aFoundationSolutionList,
) => {
  mockFoundationSolutions(responseStatus, responseBody);
  await t.navigateTo('http://localhost:1234/solutions/foundation');
};

fixture('Show Foundation Solution List Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display the page title', async (t) => {
  await pageSetupFoundationSolutions(t);
  const pageTitle = Selector('h2[data-test-id="general-page-title"]');
  await t
    .expect(pageTitle.exists).ok()
    .expect(pageTitle.innerText).eql('Foundation Solutions results');
});

test('should display the page description', async (t) => {
  await pageSetupFoundationSolutions(t);
  const pageDescription = Selector('div[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(pageDescription.innerText).eql('These Solutions meet the six Foundation Capabilities (the business needs a Solution addresses) mandated by NHS England’s GP IT Futures Operating Model. All six Capabilities must be fulfilled to achieve Foundation Solution status.');
});

test('should display the capabilities heading', async (t) => {
  await pageSetupFoundationSolutions(t);
  const capabilityHeading = Selector('div[data-test-id="capability-list"] h4');
  await t
    .expect(capabilityHeading.exists).ok()
    .expect(capabilityHeading.innerText).eql('Capabilities met');
});

test('should display the foundation solution cards', async (t) => {
  await pageSetupFoundationSolutions(t);
  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});

test('should display the foundation solution details of a solution card', async (t) => {
  await pageSetupFoundationSolutions(t);
  const solutionCardsSection = Selector('div[data-test-id="solution-cards"]');
  await t
    .expect(solutionCardsSection.find('div[data-test-id="solution-card"]').count).eql(2);

  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card"]:nth-child(1)');
  const foundationTag = solutionCard.find('div[data-test-id="solution-card-foundation-tag"]');
  await t
    .expect(foundationTag.exists).ok()
    .expect(foundationTag.innerText).eql('Foundation Solution')
    .expect(solutionCard.find('h5[data-test-id="solution-card-organisation"]').innerText).eql('some organisation name')
    .expect(solutionCard.find('h3').innerText).eql('some foundation solution name')
    .expect(solutionCard.find('div[data-test-id="solution-card-summary"]').innerText).eql('some foundation solution summary');
});

test('should display the capability details of a foundation solution card', async (t) => {
  await pageSetupFoundationSolutions(t);
  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');
  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(capabilityList.find('li:nth-child(1)').innerText).eql('some capability name');
});

test('should navigate to the foundation solution view page when clicking on the title of the solution', async (t) => {
  await pageSetupFoundationSolutions(t);
  nock('http://localhost:8080')
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
  await pageSetupFoundationSolutions(t, 500, {});

  const errorTitle = Selector('[data-test-id="error-page-title"]');

  await t
    .expect(errorTitle.exists).ok();
});
