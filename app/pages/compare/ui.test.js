import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import manifest from './manifest.json';
import { extractInnerText } from '../../test-utils/helper';

const url = 'http://localhost:1234/solutions/compare';

const getLocation = ClientFunction(() => document.location.href);

const pageSetup = async ({ t }) => {
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
  await pageSetup({ t });

  const goBackLink = Selector('[data-test-id="go-back-link"] a');

  await t
    .expect(goBackLink.exists).ok()
    .expect(await extractInnerText(goBackLink)).eql(manifest.backLinkText)
    .click(goBackLink)
    .expect(getLocation()).eql('http://localhost:1234/solutions');
});

test('should render the title', async (t) => {
  await pageSetup({ t });
  const title = Selector('h1[data-test-id="compare-page-title"]');

  await t
    .expect(title.exists).ok()
    .expect(await extractInnerText(title)).eql(manifest.title);
});

test('should render the description', async (t) => {
  await pageSetup({ t });
  const description = Selector('h2[data-test-id="compare-page-description"]');

  await t
    .expect(description.exists).ok()
    .expect(await extractInnerText(description)).eql(manifest.description);
});

test('should render the compare button', async (t) => {
  await pageSetup({ t });

  const button = Selector('[data-test-id="compare-button"] a');

  await t
    .expect(button.exists).ok()
    .expect(button.getAttribute('href')).eql('/solutions/compare/document')
    .expect(await extractInnerText(button)).eql(manifest.compareButtonText);
});
