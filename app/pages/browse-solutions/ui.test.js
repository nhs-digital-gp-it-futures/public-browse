import nock from 'nock';
import { extractInnerText } from 'buying-catalogue-library';
import { Selector, ClientFunction } from 'testcafe';
import content from './manifest.json';
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

test('should navigate to home page when click Go back', async (t) => {
  await pageSetup(t);

  const goBackLink = Selector('[data-test-id="go-back-link"] a');

  await t
    .expect(goBackLink.exists).ok()
    .click(goBackLink)
    .expect(getLocation()).eql('http://localhost:1234/');
});

test('should render Browse All Solutions container', async (t) => {
  await pageSetup(t);

  const allSolutions = Selector('[data-test-id="all-solutions-promo"]');

  await t
    .expect(allSolutions.exists).ok()
    .expect(await extractInnerText(allSolutions.find('h3'))).eql(content.allPromoHeading)
    .expect(await extractInnerText(allSolutions.find('p'))).eql(content.allPromoDescription);
});

test('should render Browse Foundation Solutions container', async (t) => {
  await pageSetup(t);

  const foundationSolutions = Selector('[data-test-id="foundation-solutions-promo"]');

  await t
    .expect(foundationSolutions.exists).ok()
    .expect(await extractInnerText(foundationSolutions.find('h3'))).eql(content.foundationPromoHeading)
    .expect(await extractInnerText(foundationSolutions.find('p'))).eql(content.foundationPromoDescription);
});

test('should render the compare promo', async (t) => {
  await pageSetup(t);
  const promo = Selector('[data-test-id="compare-promo"]');
  await t
    .expect(promo.exists).ok()
    .expect(await extractInnerText(promo.find('h3'))).eql(content.comparePromoHeading)
    .expect(await extractInnerText(promo.find('p'))).eql(content.comparePromoDescription);
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

test('should render buyers guide information', async (t) => {
  await pageSetup(t);

  const buyersGuideInformation = Selector('[data-test-id="browse-solutions-buyers-guide-information"]');

  await t
    .expect(buyersGuideInformation.exists).ok()
    .expect(await extractInnerText(buyersGuideInformation.find('p'))).eql("Find more information in our Buyer's Guide.")
    .expect(await extractInnerText(buyersGuideInformation.find('a'))).eql("Buyer's Guide")
    .expect(buyersGuideInformation.find('a').getAttribute('href')).eql('/guide');
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
    .expect(getLocation()).contains('/capabilities');
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
    .expect(getLocation()).contains('/foundation');
});
