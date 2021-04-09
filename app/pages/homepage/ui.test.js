import nock from 'nock';
import { extractInnerText } from 'buying-catalogue-library';
import { Selector, ClientFunction, RequestLogger } from 'testcafe';

const setfakeTokenCookie = ClientFunction((payload) => {
  const cookieValue = JSON.stringify(payload);
  document.cookie = `fakeToken=${cookieValue}`;
});

const getLocation = ClientFunction(() => document.location.href);

const pageSetup = async ({ t, cookiePayload = undefined }) => {
  if (cookiePayload) {
    await setfakeTokenCookie(cookiePayload);
  }
  await t.navigateTo('http://localhost:1234/');
};

const getCookies = ClientFunction(() => document.cookie);

const url = 'http://localhost:1234/';

const logger = RequestLogger({ url, method: 'get' }, {
  logResponseHeaders: true,
  logRequestHeaders: true,
});

fixture('Header')
  .page(url)
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) nock.cleanAll();

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('when user is not authenticated - should display the login link and navigate to identity server', async (t) => {
  await pageSetup({ t });

  nock('http://identity-server')
    .get('/login')
    .reply(200);

  const loginComponent = Selector('[data-test-id="login-logout-component"] a');

  await t
    .expect(await extractInnerText(loginComponent)).eql('Log in')
    .click(loginComponent)
    .expect(getLocation())
    .eql('http://identity-server/login');
});

test('when user is authenticated - should display the logout link', async (t) => {
  await pageSetup({ t, cookiePayload: { id: '88421113', name: 'Cool Dude' } });

  const logoutComponent = Selector('[data-test-id="login-logout-component"] a');

  await t
    .expect(await extractInnerText(logoutComponent)).eql('Log out');
});

test('when user is authenticated - should display log in text once log out link is clicked', async (t) => {
  await pageSetup({ t, cookiePayload: { id: '88421113', name: 'Cool Dude' } });

  const logoutComponent = Selector('[data-test-id="login-logout-component"] a');

  await t
    .expect(logoutComponent.exists).ok()
    .expect(await extractInnerText(logoutComponent)).eql('Log out')
    .click(logoutComponent);

  const logoutComponentAfterClick = Selector('[data-test-id="login-logout-component"] a');

  await t
    .expect(await extractInnerText(logoutComponentAfterClick)).eql('Log in');
});

test
  .requestHooks(logger)('when user is authenticated - should delete cookies once log out link is clicked', async (t) => {
    await pageSetup({ t, cookiePayload: { id: '88421113', name: 'Cool Dude' } });

    const logoutComponent = Selector('[data-test-id="login-logout-component"] a');

    await t
      .expect(logoutComponent.exists).ok()
      .expect(await getCookies()).contains(`fakeToken=${JSON.stringify({ id: '88421113', name: 'Cool Dude' })}`)
      .click(logoutComponent)
      .expect(logger.contains((r) => r.response.statusCode === 200))
      .ok()
      .expect(logger.requests[0].request.headers.cookie)
      .eql(undefined);
  });

test
  .requestHooks(logger)('when user is authenticated - should navigate to / once log out link is clicked', async (t) => {
    await pageSetup({ t, cookiePayload: { id: '88421113', name: 'Cool Dude' } });

    const logoutComponent = Selector('[data-test-id="login-logout-component"] a');

    await t
      .expect(logoutComponent.exists).ok()
      .expect(await getCookies()).contains(`fakeToken=${JSON.stringify({ id: '88421113', name: 'Cool Dude' })}`)
      .click(logoutComponent)
      .expect(getLocation())
      .eql('http://localhost:1234/');
  });

test('when user is authenticated - should navigate to the identity server log in page when clicking the log in link after logging out', async (t) => {
  await pageSetup({ t, cookiePayload: { id: '88421113', name: 'Cool Dude' } });
  nock('http://identity-server')
    .get('/login')
    .reply(200);

  const logoutComponent = Selector('[data-test-id="login-logout-component"] a');

  await t
    .expect(logoutComponent.exists).ok()
    .expect(await extractInnerText(logoutComponent)).eql('Log out')
    .click(logoutComponent);

  const logoutComponentAfterClick = Selector('[data-test-id="login-logout-component"] a');
  await t
    .expect(await extractInnerText(logoutComponentAfterClick))
    .eql('Log in')
    .click(logoutComponentAfterClick)
    .expect(getLocation())
    .eql('http://identity-server/login');
});

fixture('Show Home Page')
  .page('http://localhost:1234/healthcheck')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) nock.cleanAll();

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

const homepageSections = {
  'should render the homepage hero': '[data-test-id="homepage-hero"]',
  'should render the about us section': '[data-test-id="about-us"]',
  'should render the guidance promo': '[data-test-id="guidance-promo"]',
  'should render the vaccinations promo': '[data-test-id="vaccinations-promo"]',
  'should render the browse promo': '[data-test-id="browse-promo"]',
  'should render the proxy buying card': '[data-test-id="proxy-card"]',
  'should render footer': '[data-test-id="footer"]',
  'show render the beta banner': '[data-test-id="beta-banner"]',
  'should render the order form promo': '[data-test-id="order-form-promo"]',
};

Object.keys(homepageSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup({ t });
    const element = Selector(homepageSections[key]);
    await t
      .expect(element.exists).ok();
  });
});

test('should render the admin promo when user is authenticated and has an organisation claim', async (t) => {
  await pageSetup({ t, cookiePayload: { id: '88421113', name: 'Cool Dude', organisation: 'manage' } });

  const promo = Selector('[data-test-id="admin-promo"]');

  await t
    .expect(promo.exists).ok();
});

test('should not render the admin promo when user is authenticated but does not have the organisation claim in the cookie', async (t) => {
  await pageSetup({ t, cookiePayload: { id: '88421113', name: 'Cool Dude' } });

  const promo = Selector('[data-test-id="admin-promo"]');

  await t
    .expect(promo.exists).notOk();
});

test('should not render the admin promo when user is not authenticated', async (t) => {
  await pageSetup({ t });

  const promo = Selector('[data-test-id="admin-promo"]');

  await t
    .expect(promo.exists).notOk();
});
