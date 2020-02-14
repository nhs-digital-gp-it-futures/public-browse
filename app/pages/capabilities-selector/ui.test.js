import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import content from './manifest.json';
import capabilitiesData from '../../test-utils/fixtures/capabilitiesData.json';
import { extractInnerText } from '../../test-utils/helper';
import { apiLocalhost } from '../../test-utils/config';

const mocks = () => {
  nock(apiLocalhost)
    .get('/api/v1/Capabilities')
    .reply(200, capabilitiesData);
};

const pageSetup = async (t, existingData = false) => {
  mocks(existingData);
  await t.navigateTo('http://localhost:1234/solutions/capabilities');
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
    .expect(await extractInnerText(column1.find('label').nth(0))).eql(capabilitiesData.capabilities[0].name)
    .expect(await extractInnerText(column1.find('label').nth(1))).eql(capabilitiesData.capabilities[1].name)
    .expect(column2.find('label').count).eql(1)
    .expect(await extractInnerText(column2.find('label').nth(0))).eql(capabilitiesData.capabilities[2].name);
});

test('should render continue button', async (t) => {
  await pageSetup(t);

  const continueButton = Selector('[data-test-id="capabilities-selector-continue-button"]');

  await t
    .expect(continueButton.exists).ok()
    .expect(await extractInnerText(continueButton.find('a'))).eql('Continue')
    .expect(continueButton.find('a').hasClass('nhsuk-button--secondary')).ok()
    .expect(continueButton.find('a').getAttribute('href')).eql('/');
});
