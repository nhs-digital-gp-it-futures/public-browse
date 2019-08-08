import nock from 'nock';
import allSolutionFixture from './fixtures/allSolutions.json';
import { Selector } from 'testcafe';

const mocks = () => {
  nock('http://localhost:5000')
    .get('/api/v1/solutions')
    .reply(200, allSolutionFixture)

}

const pageSetup = async (t) => {
  mocks()
  await t.navigateTo('http://localhost:1234/')
}

fixture('Show Solutions Page')


test('should render the title', async t => {
  pageSetup(t)

  const title = Selector('h1')

  await t
    .expect(title.innerText).eql('View all solutions')
})

test('should render page description', async t => {
  pageSetup(t)

  const pageDescription = Selector('.nhsuk-body-l')

  await t
    .expect(pageDescription.innerText).eql('All the solutions. Check them out.')
})

test('should render the solutions cards', async t => {
  pageSetup(t)

  const solutionsCards = Selector('[data-test-id="solution-card"]')
  
  await t
    .expect(solutionsCards.count).eql(3)
})