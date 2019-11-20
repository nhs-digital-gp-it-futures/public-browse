import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aSolutionList from './fixtures/aSolutionList.json';

const mocks = () => {
  nock('http://localhost:8080')
    .get('/api/v1/Solutions')
    .reply(200, aSolutionList);
  nock('http://localhost:8080')
    .get('/api/v1/Solutions/S1/Public')
    .reply(200);
};

const pageSetup = async (t) => {
  mocks();
  await t.navigateTo('http://localhost:1234/solutions/all');
};

fixture('Show Solution List Page');

test('should display the page title', async (t) => {
  pageSetup(t);

  const pageTitle = Selector('div[data-test-id="solutions-list-title"] h2');

  await t
    .expect(pageTitle.exists).ok()
    .expect(pageTitle.innerText).eql('All Solutions results');
});

test('should display the page description', async (t) => {
  pageSetup(t);

  const pageDescription = Selector('div[data-test-id="solutions-list-description"]');

  await t
    .expect(pageDescription.exists).ok()
    .expect(pageDescription.innerText).eql('These are the Solutions on the GP IT Futures framework available from the Buying Catalogue.');
});

test('should display the capabilities heading', async (t) => {
  pageSetup(t);

  const capabilityHeading = Selector('div[data-test-id="capability-list"] h4');

  await t
    .expect(capabilityHeading.exists).ok()
    .expect(capabilityHeading.innerText).eql('Capabilities met');
});

test('should display the solution cards', async (t) => {
  pageSetup(t);

  await t
    .expect(Selector('div[data-test-id="solution-card"]').count).eql(2);
});

test('should display the solution details of a solution card', async (t) => {
  pageSetup(t);

  const solutionCardsSection = Selector('div[data-test-id="solution-cards"]');

  await t
    .expect(solutionCardsSection.find('div[data-test-id="solution-card"]').count).eql(2);

  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card"]:nth-child(1)');

  await t
    .expect(solutionCard.find('div[data-test-id="solution-card-foundation-tag"]').exists).notOk()
    .expect(solutionCard.find('h5[data-test-id="solution-card-organisation"]').innerText).eql('some organisation name')
    .expect(solutionCard.find('h3').innerText)
    .eql('some solution name')
    .expect(solutionCard.find('div[data-test-id="solution-card-summary"]').innerText)
    .eql('some solution summary');
});

test('should display the capability details of a solution card', async (t) => {
  pageSetup(t);

  const solutionCard = Selector('div[data-test-id="solution-card"]:nth-child(1)');
  const capabilityList = solutionCard.find('[data-test-id="capability-list"]');

  await t
    .expect(capabilityList.exists).ok()
    .expect(capabilityList.find('li').count).eql(1)
    .expect(capabilityList.find('li:nth-child(1)').innerText)
    .eql('some capability name');
});

test('should navigate to the solution view page when clicking on the title of the solution', async (t) => {
  pageSetup(t);

  const getLocation = ClientFunction(() => document.location.href);

  const solutionCardTitleLink = Selector('div[data-test-id="solution-card"]:nth-child(1) a');

  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation())
    .contains('/solutions/all/S1');
});

test('should navigate to browse solutions page when click Go back', async (t) => {
  pageSetup(t);

  const getLocation = ClientFunction(() => document.location.href);

  const goBackLink = Selector('[data-test-id="go-back-link"] a');

  await t
    .expect(goBackLink.exists).ok()
    .click(goBackLink)
    .expect(getLocation())
    .contains('/solutions');
});
