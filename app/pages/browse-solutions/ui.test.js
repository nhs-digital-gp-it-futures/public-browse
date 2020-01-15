import nock from 'nock';
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
    .expect(allSolutions.find('h3').innerText).eql(content.allPromoHeading)
    .expect(allSolutions.find('p').innerText).eql(content.allPromoDescription);
});

test('should render Browse Foundation Solutions container', async (t) => {
  await pageSetup(t);

  const foundationSolutions = Selector('[data-test-id="foundation-solutions-promo"]');

  await t
    .expect(foundationSolutions.exists).ok()
    .expect(foundationSolutions.find('h3').innerText).eql(content.foundationPromoHeading)
    .expect(foundationSolutions.find('p').innerText).eql(content.foundationPromoDescription);
});

test('should render buyers guide information', async (t) => {
  await pageSetup(t);

  const buyersGuideInformation = Selector('[data-test-id="browse-solutions-buyers-guide-information"]');

  await t
    .expect(buyersGuideInformation.exists).ok()
    .expect(buyersGuideInformation.find('p').innerText).eql("Find more information in our Buyer's Guide.")
    .expect(buyersGuideInformation.find('a').innerText).eql("Buyer's Guide")
    .expect(buyersGuideInformation.find('a').getAttribute('href')).eql('/guide');
});

test('should navigate to browse all solutions page', async (t) => {
  await nock('http://localhost:8080')
    .get('/api/v1/Solutions')
    .reply(200, aSolutionList);

  await pageSetup(t);

  const browseAllSolutionsLink = Selector('[data-test-id="all-solutions-promo"] a h3');

  await t
    .expect(browseAllSolutionsLink.exists).ok()
    .expect(browseAllSolutionsLink.visible).ok()
    .click(browseAllSolutionsLink)
    .expect(getLocation()).contains('/all');
});

test('should navigate to browse foundation solutions page', async (t) => {
  await nock('http://localhost:8080')
    .get('/api/v1/Solutions/Foundation')
    .reply(200, aFoundationSolutionList);

  await pageSetup(t);

  const foundationSolutionsLink = Selector('[data-test-id="foundation-solutions-promo"] a h3');

  await t
    .expect(foundationSolutionsLink.exists).ok()
    .click(foundationSolutionsLink)
    .expect(getLocation()).contains('/foundation');
});
