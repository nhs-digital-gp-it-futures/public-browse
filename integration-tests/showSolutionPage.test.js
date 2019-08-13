import nock from 'nock';
import { Selector } from 'testcafe';
import aSolutionFixture from './fixtures/aSolution.json';

const mocks = () => {
  nock('http://localhost:5000')
    .get('/api/v1/solution/00001')
    .reply(200, aSolutionFixture);
};

const pageSetup = async (t) => {
  mocks();
  await t.navigateTo('http://localhost:1234/00001');
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
