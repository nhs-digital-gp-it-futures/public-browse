import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import content from './manifest.json';
import capabilitiesList from '../../test-utils/fixtures/capabilitiesList.json';
import aCustomSolutionList from '../../test-utils/fixtures/aCustomSolutionList.json';
import { extractInnerText } from '../../test-utils/helper';
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
    .expect(getLocation()).eql('http://localhost:1234/solutions');
});

test('should render capabilities-selector title', async (t) => {
  await pageSetup(t);

  const title = Selector('[data-test-id="capabilities-selector-page-title"]');

  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(content.title);
});

test('should render capabilities-selector component', async (t) => {
  await pageSetup(t);

  const capabilitiesSelectorComponent = Selector('[data-test-id="capabilities-selector"]');
  const column1 = capabilitiesSelectorComponent.find('[data-test-id="capabilities-checkbox-column-1"]');
  const column2 = capabilitiesSelectorComponent.find('[data-test-id="capabilities-checkbox-column-2"]');

  await t
    .expect(capabilitiesSelectorComponent.exists).ok()
    .expect(column1.exists).ok()
    .expect(column1.find('label').count).eql(2)
    .expect(await extractInnerText(column1.find('label').nth(0))).eql(capabilitiesList.capabilities[0].name)
    .expect(await extractInnerText(column1.find('label').nth(1))).eql(capabilitiesList.capabilities[1].name)
    .expect(column2.find('label').count).eql(1)
    .expect(await extractInnerText(column2.find('label').nth(0))).eql(capabilitiesList.capabilities[2].name);
});

test('should render continue button', async (t) => {
  await pageSetup(t);

  const continueButton = Selector('[data-test-id="capabilities-selector-continue-button"] button');

  await t
    .expect(continueButton.exists).ok()
    .expect(await extractInnerText(continueButton)).eql('Continue')
    .expect(continueButton.hasClass('nhsuk-button--secondary')).ok();
});

test('should navigate to the view-solution page when capabilities have been selected and continue clicked', async (t) => {
  await pageSetup(t);
  await nock('http://localhost:8080')
    .post('/api/v1/Solutions')
    .reply(200, aCustomSolutionList);

  const capabilityC1Checkbox = Selector('input[value="C1"]');
  const capabilityC2Checkbox = Selector('input[value="C2"]');
  const continueButton = Selector('[data-test-id="capabilities-selector-continue-button"] button');
  await t

    .expect(capabilityC1Checkbox.exists).ok()
    .click(capabilityC1Checkbox)
    .expect(capabilityC2Checkbox.exists).ok()
    .click(capabilityC2Checkbox)
    .expect(continueButton.exists).ok()
    .click(continueButton)
    .expect(getLocation()).contains('/solutions/capabilities-selector.C1+C2')
    .expect(Selector('[data-test-id="solution-card"]').count).eql(2);
});

test('should navigate back to browse solutions page when backlink is clicked', async (t) => {
  await pageSetup(t);

  const backLink = Selector('[data-test-id="go-back-link"] a');
  await t
    .expect(backLink.exists).ok()
    .click(backLink)
    .expect(getLocation()).contains('/solutions')
    .expect(Selector('[data-test-id="browse-solutions"]').exists).ok();
});
