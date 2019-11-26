import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aFoundationSolutionList from './fixtures/aFoundationSolutionList.json';

const mocks = () => {
  nock('http://localhost:8080')
    .get('/api/v1/Solutions/Foundation')
    .reply(200, aFoundationSolutionList);
};

const pageSetup = async (t) => {
  mocks();
  await t.navigateTo('http://localhost:1234/solutions/foundation');
};

fixture('Show Foundation Solution List Page');

test('should display the page title', async (t) => {
  pageSetup(t);
  const pageTitle = Selector('h2[data-test-id="general-page-title"]');
  await t
    .expect(pageTitle.exists).ok()
    .expect(pageTitle.innerText).eql('Foundation Solutions results');
});

test('should display the page description', async (t) => {
  pageSetup(t);
  const pageDescription = Selector('div[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(pageDescription.innerText).eql('These Solutions meet the six Foundation Capabilities (the business needs a Solution addresses) mandated by NHS England’s GP IT Futures Operating Model. All six Capabilities must be fulfilled to achieve Foundation Solution status.');
});

test('should display the capabilities heading', async (t) => {
  pageSetup(t);
  const capabilityHeading = Selector('div[data-test-id="capability-list"] h4');
  await t
    .expect(capabilityHeading.exists).ok()
    .expect(capabilityHeading.innerText).eql('Capabilities met');
});

test('should display the foundation solution cards', async (t) => {
  pageSetup(t);
  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});

test('should display the foundation solution details of a solution card', async (t) => {
  pageSetup(t);
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
  pageSetup(t);
  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');
  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(capabilityList.find('li:nth-child(1)').innerText).eql('some capability name');
});

test('should navigate to the foundation solution view page when clicking on the title of the solution', async (t) => {
  pageSetup(t);
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
