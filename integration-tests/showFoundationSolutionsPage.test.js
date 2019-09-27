import nock from 'nock';
import { Selector } from 'testcafe';
import allCapabilitiesFixture from './fixtures/allCapabilities.json';
import filteredSolutionsFixture from './fixtures/filteredSolutions.json';

const mocks = () => {
  nock('http://localhost:8080')
    .post('/api/v1/Solutions')
    .reply(200, filteredSolutionsFixture);

  nock('http://localhost:8080')
    .get('/api/v1/Capabilities')
    .reply(200, allCapabilitiesFixture);
};

const pageSetup = async (t) => {
  mocks();
  await t.navigateTo('http://localhost:1234/foundation');
};

fixture('Show Foundation Solutions Page');

test('should display the foundation solutions view', async (t) => {
  pageSetup(t);

  const solutionsCards = Selector('[data-test-id="solution-card"]');

  await t
    .expect(Selector('#capabilities-1:checked').exists).ok()
    .expect(Selector('#capabilities-2:checked').exists).ok()
    .expect(solutionsCards.count).eql(2);
});
