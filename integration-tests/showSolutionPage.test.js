import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import aSolutionFixture from './fixtures/aSolution.json';

const mocks = () => {
  nock('http://localhost:5000')
    .get('/api/v1/solution/00001')
    .reply(200, aSolutionFixture);
};

const pageSetup = async (t) => {
  mocks();
  await t.navigateTo('http://localhost:1234/view/00001');
};

fixture('Show Solution Page');

test('should render the title', async (t) => {
  pageSetup(t);

  const title = Selector('h1');

  await t
    .expect(title.innerText).eql('View Solution');
});

test('should render page description', async (t) => {
  pageSetup(t);

  const pageDescription = Selector('.nhsuk-body-l');

  await t
    .expect(pageDescription.innerText).eql('The first solution and more');
});

test('should render the solution details', async (t) => {
  pageSetup(t);

  const solutionDetails = Selector('[data-test-id="full-solution-card"]');

  await t
    .expect(solutionDetails.count).eql(1);
});

test('should render the page contents', async (t) => {
  pageSetup(t);

  const pageContents = Selector('[data-test-id="page-contents-list"]');

  await t
    .expect(pageContents.count).eql(1);
});

test('should navigate to the particular section when clicking on the anchor points in the page contents', async (t) => {
  pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);

  const firstPageContentSection = Selector('[data-test-id="page-contents-list"] a').nth(0);

  await t
    .click(firstPageContentSection)
    .expect(getLocation()).contains('00001#description');
});
