import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aSolutionList from '../../test-utils/fixtures/aSolutionList.json';
import aFoundationSolutionList from '../../test-utils/fixtures/aFoundationSolutionList.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/solutions');
};

const getLocation = ClientFunction(() => document.location.href);

fixture('Browse Solutions Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      // eslint-disable-next-line no-console
      console.error(`pending mocks: ${nock.pendingMocks()}`);
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should render cookie policy banner and it should not re-render again after dismissing', async (t) => {
  await pageSetup(t);
  const cookieBanner = Selector('[data-test-id="cookie-banner"]');
  const dismissButton = Selector('[data-test-id="cookie-dismiss"] a');
  await t
    .expect(cookieBanner.exists).ok()
    .click(dismissButton);
  await pageSetup(t);
  await t
    .expect(cookieBanner.exists).notOk();
});

test('should navigate to home page when click Go back', async (t) => {
  await pageSetup(t);

  const goBackLink = Selector('[data-test-id="go-back-link"] a');

  await t
    .expect(goBackLink.exists).ok()
    .click(goBackLink)
    .expect(getLocation())
    .eql('http://localhost:1234/');
});

test('should navigate to the compare page when the compare promo is clicked', async (t) => {
  await pageSetup(t);

  const promo = Selector('[data-test-id="compare-promo"]');

  await t
    .expect(promo.exists).ok()
    .expect(promo.find('a').getAttribute('href')).eql('/solutions/compare')
    .click(promo);

  await t
    .expect(getLocation()).eql('http://localhost:1234/solutions/compare');
});

test('should navigate to browse all solutions page', async (t) => {
  await nock('http://localhost:5100')
    .get('/api/v1/Capabilities')
    .reply(200, aSolutionList);

  await pageSetup(t);

  const browseAllSolutionsLink = Selector('[data-test-id="all-solutions-promo"] h3 a');

  await t
    .expect(browseAllSolutionsLink.exists).ok()
    .expect(browseAllSolutionsLink.visible).ok()
    .click(browseAllSolutionsLink)
    .expect(getLocation())
    .contains('/capabilities');
});

test('should navigate to browse foundation solutions page', async (t) => {
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/Foundation')
    .reply(200, aFoundationSolutionList);

  await pageSetup(t);

  const foundationSolutionsLink = Selector('[data-test-id="foundation-solutions-promo"] h3 a');

  await t
    .expect(foundationSolutionsLink.exists).ok()
    .click(foundationSolutionsLink)
    .expect(getLocation())
    .contains('/foundation');
});

const defaultSections = {
  'should render the general description': '[data-test-id="general-description"]',
  'should render Browse All Solutions promo': '[data-test-id="all-solutions-promo"]',
  'should render Browse Foundation Solutions promo': '[data-test-id="foundation-solutions-promo"]',
  'should render the compare promo': '[data-test-id="compare-promo"]',
  'should render buyers guide information': '[data-test-id="browse-solutions-buyers-guide-information"]',
};

Object.keys(defaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(defaultSections[key]);
    await t
      .expect(element.exists).ok();
  });
});
