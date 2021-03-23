import nock from 'nock';
import { extractInnerText } from 'buying-catalogue-library';
import { Selector, ClientFunction } from 'testcafe';
import manifest from './manifest.json';

const url = 'http://localhost:1234/solutions/compare';

const getLocation = ClientFunction(() => document.location.href);

const pageSetup = async (t) => {
  await t.navigateTo(url);
};

fixture('Compare Page')
  .page('http://localhost:1234/healthcheck')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      // eslint-disable-next-line no-console
      console.error(`pending mocks: ${nock.pendingMocks()}`);
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should navigate to /solutions when click on Back', async (t) => {
  await pageSetup(t);

  const goBackLink = Selector('[data-test-id="go-back-link"] a');

  await t
    .expect(goBackLink.exists).ok()
    .expect(await extractInnerText(goBackLink)).eql(manifest.backLinkText)
    .click(goBackLink)
    .expect(getLocation())
    .eql('http://localhost:1234/solutions');
});

const defaultSections = {
  'should render the title': '[data-test-id="compare-page-title"]',
  'should render the description': '[data-test-id="compare-page-description"]',
  'should render the compare button': '[data-test-id="compare-button"]',
};

Object.keys(defaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(defaultSections[key]);
    await t
      .expect(element.exists).ok();
  });
});
