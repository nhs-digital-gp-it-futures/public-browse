import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import content from './manifest.json';
import { extractInnerText } from '../../test-utils/helper';

const setCookies = ClientFunction((payload) => {
  const cookieValue = JSON.stringify(payload);
  document.cookie = `fakeToken=${cookieValue}`;
});

const pageSetup = async (t, cookiePayload = undefined) => {
  if (cookiePayload) {
    await setCookies(cookiePayload);
  }
  await t.navigateTo('http://localhost:1234/');
};

fixture('Header')
  .page('http://localhost:1234/healthcheck')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display BETA banner', async (t) => {
  await pageSetup(t);
  const betaBanner = Selector('[data-test-id="terms-banner"] > div > div > div:nth-child(1)');
  await t
    .expect(await extractInnerText(betaBanner)).eql('BETA');
});

test('should display General Terms of Use text', async (t) => {
  await pageSetup(t);
  const termsOfUseText = Selector('[data-test-id="terms-banner"] > div > div > div:nth-child(2)');
  await t
    .expect(await extractInnerText(termsOfUseText)).eql('By using this site you are accepting the General Terms of Use which you can view by downloading this PDF. The Cookies Policy and Privacy Policy can be accessed using the links at the bottom of the page.');
});

test('should navigate to home page header banner', async (t) => {
  await t.navigateTo('http://localhost:1234/guide');
  const getLocation = ClientFunction(() => document.location.href);
  const headerBannerLink = Selector('[data-test-id="header-banner"] a');
  await t
    .expect(headerBannerLink.exists).ok()
    .click(headerBannerLink)
    .expect(getLocation()).eql('http://localhost:1234/');
});

test('when user is not authenticated - should display the login link', async (t) => {
  await pageSetup(t);

  const loginComponent = Selector('[data-test-id="login-logout-component"] a');
  await t
    .expect(await extractInnerText(loginComponent)).eql('Log in');
});

test('when user is not authenticated - should navigate to the identity server login page when clicking the login link', async (t) => {
  await pageSetup(t);

  nock('http://identity-server')
    .get('/login')
    .reply(200);

  const getLocation = ClientFunction(() => document.location.href);
  const loginComponent = Selector('[data-test-id="login-logout-component"] a');
  await t
    .click(loginComponent)
    .expect(getLocation()).eql('http://identity-server/login');
});

test('when user is authenticated - should display the logout link', async (t) => {
  await pageSetup(t, { id: '88421113', name: 'Cool Dude' });

  const logoutComponent = Selector('[data-test-id="login-logout-component"] a');
  await t
    .expect(await extractInnerText(logoutComponent)).eql('Log out');
});

fixture('Show Home Page')
  .page('http://localhost:1234/healthcheck')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should render the homepage hero', async (t) => {
  await pageSetup(t);
  const homepageSection = Selector('[data-test-id="homepage-hero"]');
  const title = homepageSection.find('h1');
  const description = homepageSection.find('h2');

  await t
    .expect(homepageSection.count).eql(1)
    .expect(await extractInnerText(title)).eql(content.heroHeading)
    .expect(await extractInnerText(description)).eql(content.heroText);
});

test('should render the about us section', async (t) => {
  await pageSetup(t);
  const aboutUsSection = Selector('[data-test-id="about-us"]');
  await t
    .expect(await extractInnerText(aboutUsSection.find('h3'))).eql(content.title)
    .expect(await extractInnerText(aboutUsSection.find('p'))).eql(content.description[0])
    .expect(await extractInnerText(aboutUsSection.find('p').nth(1))).eql(content.description[1])
    .expect(await extractInnerText(aboutUsSection.find('p').nth(2))).eql(content.description[2]);
});

test('should render the guidance promo', async (t) => {
  await pageSetup(t);
  const guidancePromo = Selector('[data-test-id="guidance-promo"]');
  await t
    .expect(guidancePromo.count).eql(1)
    .expect(await extractInnerText(guidancePromo.find('h3'))).eql(content.guidePromoHeading)
    .expect(await extractInnerText(guidancePromo.find('p'))).eql(content.guidePromoDescription);
});

test('should render the browse promo', async (t) => {
  await pageSetup(t);
  const browsePromo = Selector('[data-test-id="browse-promo"]');
  await t
    .expect(browsePromo.count).eql(1)
    .expect(await extractInnerText(browsePromo.find('h3'))).eql(content.viewSolutionsPromoHeading)
    .expect(await extractInnerText(browsePromo.find('p'))).eql(content.viewSolutionsPromoDescription);
});

test('should navigate to the browse solution page when clicking on the browse promo', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const browsePromoLink = Selector('[data-test-id="browse-promo"] a h3');
  await t
    .expect(browsePromoLink.exists).ok()
    .click(browsePromoLink)
    .expect(getLocation()).contains('/solutions');
});

test('should render the admin promo when user is authenticated and has an organisation claim', async (t) => {
  await pageSetup(t, { id: '88421113', name: 'Cool Dude', organisation: 'view' });
  const adminPromo = Selector('[data-test-id="admin-promo"]');
  await t
    .expect(adminPromo.count).eql(1)
    .expect(await extractInnerText(adminPromo.find('h3'))).eql(content.adminPromoHeading)
    .expect(await extractInnerText(adminPromo.find('p'))).eql(content.adminPromoDescription);
});

test('should not render the admin promo when user is authenticated but does not have the organisation claim in the cookie', async (t) => {
  await pageSetup(t, { id: '88421113', name: 'Cool Dude' });
  const adminPromo = Selector('[data-test-id="admin-promo"]');
  await t
    .expect(adminPromo.exists).notOk();
});

test('should not render the admin promo when user is not authenticated', async (t) => {
  await pageSetup(t);
  const adminPromo = Selector('[data-test-id="admin-promo"]');
  await t
    .expect(adminPromo.exists).notOk();
});

fixture('Footer')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should render buyers guide link', async (t) => {
  await pageSetup(t);
  const buyersGuideLink = Selector('[data-test-id="footer-component"] li:nth-child(1) > a');
  await t
    .expect(buyersGuideLink.exists).ok()
    .expect(await extractInnerText(buyersGuideLink)).eql("Buyer's Guide")
    .expect(buyersGuideLink.getAttribute('href')).eql('/guide');
});

test('should render buyers guide contact us link', async (t) => {
  await pageSetup(t);
  const guideContactUsLink = Selector('[data-test-id="footer-component"] li:nth-child(2) > a');
  await t
    .expect(guideContactUsLink.exists).ok()
    .expect(await extractInnerText(guideContactUsLink)).eql('NHS Digital Helpdesk')
    .expect(guideContactUsLink.getAttribute('href')).eql('/guide#contact-us');
});

test('should render nhs digital link', async (t) => {
  await pageSetup(t);
  const nhsDigitalLink = Selector('[data-test-id="footer-component"] li:nth-child(3) > a');
  await t
    .expect(nhsDigitalLink.exists).ok()
    .expect(await extractInnerText(nhsDigitalLink)).eql('NHS Digital')
    .expect(nhsDigitalLink.getAttribute('href')).eql('https://digital.nhs.uk/');
});

test('should render about GP IT futures link', async (t) => {
  await pageSetup(t);
  const aboutGpitLink = Selector('[data-test-id="footer-component"] li:nth-child(4) > a');
  await t
    .expect(aboutGpitLink.exists).ok()
    .expect(await extractInnerText(aboutGpitLink)).eql('About GP IT Futures')
    .expect(aboutGpitLink.getAttribute('href')).eql('https://digital.nhs.uk/services/future-gp-it-systems-and-services');
});

test('should render capabilities and standards link', async (t) => {
  await pageSetup(t);
  const capabilitiesAndStandardsLink = Selector('[data-test-id="footer-component"] li:nth-child(5) > a');
  await t
    .expect(capabilitiesAndStandardsLink.exists).ok()
    .expect(await extractInnerText(capabilitiesAndStandardsLink)).eql('Capabilities & Standards Model')
    .expect(capabilitiesAndStandardsLink.getAttribute('href')).eql('https://gpitbjss.atlassian.net/wiki/spaces/GPITF/overview');
});

test('should render legal banner', async (t) => {
  await pageSetup(t);
  const legalText = Selector('[data-test-id="legal-panel"] span:nth-child(1)');
  const privacyAndCookiesLink = Selector('[data-test-id="legal-panel"] span:nth-child(2) > a');
  await t
    .expect(legalText.exists).ok()
    .expect(await extractInnerText(legalText)).eql('Legal')
    .expect(privacyAndCookiesLink.exists).ok()
    .expect(await extractInnerText(privacyAndCookiesLink)).eql('Privacy and Cookies');
});

test('should navigate guide page', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const buyersGuideLink = Selector('[data-test-id="footer-component"] li:nth-child(1) > a');
  await t
    .expect(buyersGuideLink.exists).ok()
    .click(buyersGuideLink)
    .expect(getLocation()).contains('/guide');
});

test('should navigate guide page contact us section', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const guideContactUsLink = Selector('[data-test-id="footer-component"] li:nth-child(2) > a');
  await t
    .expect(guideContactUsLink.exists).ok()
    .click(guideContactUsLink)
    .expect(getLocation()).contains('/guide#contact-us');
});

test('should navigate nhs digital page', async (t) => {
  await pageSetup(t);
  const nhsDigitalLink = Selector('[data-test-id="footer-component"] li:nth-child(3) > a');
  await t
    .expect(nhsDigitalLink.exists).ok()
    .expect(nhsDigitalLink.getAttribute('href')).eql('https://digital.nhs.uk/');
});

test('should navigate to about GP IT futures page', async (t) => {
  await pageSetup(t);
  const aboutGpitLink = Selector('[data-test-id="footer-component"] li:nth-child(4) > a');
  await t
    .expect(aboutGpitLink.exists).ok()
    .expect(aboutGpitLink.getAttribute('href')).eql('https://digital.nhs.uk/services/future-gp-it-systems-and-services');
});

test('should navigate to capabilities & standards page', async (t) => {
  await pageSetup(t);
  const capabilitiesAndStandardsLink = Selector('[data-test-id="footer-component"] li:nth-child(5) > a');
  await t
    .expect(capabilitiesAndStandardsLink.exists).ok()
    .expect(capabilitiesAndStandardsLink.getAttribute('href')).eql('https://gpitbjss.atlassian.net/wiki/spaces/GPITF/overview');
});

test('should navigate to privacy and cookies page', async (t) => {
  await pageSetup(t);
  const privacyAndCookiesLink = Selector('[data-test-id="legal-panel"] span:nth-child(2) > a');
  await t
    .expect(privacyAndCookiesLink.exists).ok()
    .expect(privacyAndCookiesLink.getAttribute('href')).eql('https://digital.nhs.uk/about-nhs-digital/privacy-and-cookies');
});
