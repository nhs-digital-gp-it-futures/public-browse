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
  await t.navigateTo('http://localhost:1234/solutions/capability-selector');
};

const getLocation = ClientFunction(() => document.location.href);

fixture('Capability Selector Page')
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

test('should render capability-selector title', async (t) => {
  await pageSetup(t);

  const title = Selector('[data-test-id="capability-selector-page-title"]');

  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(content.title);
});

test('should render capability-selector component', async (t) => {
  await pageSetup(t);

  const capabilitySelectorComponent = Selector('[data-test-id="capability-selector"]');
  const column1 = capabilitySelectorComponent.find('[data-test-id="capability-checkbox-column-1"]');
  const column2 = capabilitySelectorComponent.find('[data-test-id="capability-checkbox-column-2"]');

  await t.debug()
    .expect(capabilitySelectorComponent.exists).ok()
    .expect(column1.exists).ok()
    .expect(column1.find('label').length).eql(2)
    .expect(column2.exists).ok();
});
