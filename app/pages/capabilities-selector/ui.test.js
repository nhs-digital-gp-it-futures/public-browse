import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import capabilitiesList from '../../test-utils/fixtures/capabilitiesList.json';
import aCustomSolutionList from '../../test-utils/fixtures/aCustomSolutionList.json';
import { apiLocalhost } from '../../test-utils/config';

const mocks = () => {
  nock(apiLocalhost)
    .get('/api/v1/Capabilities')
    .reply(200, capabilitiesList);
};

const pageSetup = async (t, existingData = false) => {
  mocks(existingData);
  await t.navigateTo('http://localhost:1234/solutions/capabilities-selector');
};

const getLocation = ClientFunction(() => document.location.href);

fixture('Capabilities Selector Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      // eslint-disable-next-line no-console
      console.error(`pending mocks: ${nock.pendingMocks()}`);
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should navigate to solutions when click Go back to previous page', async (t) => {
  await pageSetup(t);

  const goBackLink = Selector('[data-test-id="go-back-link"] a');

  await t
    .expect(goBackLink.exists).ok()
    .click(goBackLink)
    .expect(getLocation())
    .eql('http://localhost:1234/solutions');
});

test('should navigate to the view-solution page when capabilities have been selected and continue clicked', async (t) => {
  await pageSetup(t);
  await nock('http://localhost:5100')
    .post('/api/v1/Solutions')
    .reply(200, aCustomSolutionList);

  const capabilityC1Checkbox = Selector('input[value="C1"]');
  const capabilityC2Checkbox = Selector('input[value="C2"]');
  const continueButton = Selector('[data-test-id="capabilities-selector-continue-button"] button');
  await t
    .expect(capabilityC1Checkbox.exists)
    .ok()
    .click(capabilityC1Checkbox)
    .expect(capabilityC2Checkbox.exists)
    .ok()
    .click(capabilityC2Checkbox)
    .expect(continueButton.exists)
    .ok()
    .click(continueButton)
    .expect(getLocation())
    .contains('/solutions/capabilities-selector.C1+C2')
    .expect(Selector('[data-test-id="solution-card"]').count)
    .eql(2);
});

test('should navigate back to browse solutions page when backlink is clicked', async (t) => {
  await pageSetup(t);

  const backLink = Selector('[data-test-id="go-back-link"] a');
  await t
    .expect(backLink.exists)
    .ok()
    .click(backLink)
    .expect(getLocation())
    .contains('/solutions')
    .expect(Selector('[data-test-id="browse-solutions"]').exists)
    .ok();
});

const defaultSections = {
  'should render the page title': '[data-test-id="capabilities-selector-page-title"]',
  'should render the page description': '[data-test-id="capabilities-selector-page-description"]',
  'should render a fieldset': 'fieldset[data-test-id="capabilities-selector-fieldset"]',
  'should have the fieldset containing the capabilities selector': 'fieldset[data-test-id="capabilities-selector-fieldset"] [data-test-id="capabilities-selector"]',
  'should render the continue button': '[data-test-id="capabilities-selector-continue-button"]',
};

Object.keys(defaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(defaultSections[key]);
    await t
      .expect(element.exists).ok();
  });
});
