import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aSolutionList from './fixtures/aSolutionList.json';
import content from './manifest.json';

const mocks = () => {
  nock('http://localhost:8080')
    .get('/api/v1/Solutions')
    .reply(200, aSolutionList);
};

const pageSetup = async (t) => {
  mocks();
  await t.navigateTo('http://localhost:1234/solutions');
};

fixture('Browse Solutions Page');

test('should navigate to home page when click Go back', async (t) => {
  pageSetup(t);

  const getLocation = ClientFunction(() => document.location.href);

  const goBackLink = Selector('[data-test-id="go-back-link"] a');

  await t
    .expect(goBackLink.exists).ok()
    .click(goBackLink)
    .expect(getLocation()).eql('http://localhost:1234/');
});

test('should render Browse Foundation Solutions container', async (t) => {
  pageSetup(t);

  const foundationSolutions = Selector('[data-test-id="foundation-solutions-promo"]');

  await t
    .expect(foundationSolutions.exists).ok()
    .expect(foundationSolutions.find('h3').innerText).eql(content.foundationPromoHeading)
    .expect(foundationSolutions.find('p').innerText).eql(content.foundationPromoDescription);
});

test('should render Browse All Solutions container', async (t) => {
  pageSetup(t);

  const allSolutions = Selector('[data-test-id="all-solutions-promo"]');

  await t
    .expect(allSolutions.exists).ok()
    .expect(allSolutions.find('h3').innerText).eql(content.allPromoHeading)
    .expect(allSolutions.find('p').innerText).eql(content.allPromoDescription);
});

test('should navigate to Browse All Solutions page', async (t) => {
  pageSetup(t);

  const getLocation = ClientFunction(() => document.location.href);

  const browseAllSolutionsLink = Selector('[data-test-id="all-solutions-promo"]').find('a');

  await t
    .expect(browseAllSolutionsLink.exists).ok()
    .click(browseAllSolutionsLink)
    .expect(getLocation()).contains('/all');
});
