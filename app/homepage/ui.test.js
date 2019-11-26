/* eslint-disable newline-per-chained-call */
import { Selector, ClientFunction } from 'testcafe';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/');
};

fixture('Show Home Page');

test('should render the homepage hero', async (t) => {
  pageSetup(t);
  const homepageSection = Selector('[data-test-id="homepage-hero"] > section');
  const title = homepageSection.find('h1');
  const description = homepageSection.find('p');

  await t
    .expect(homepageSection.count).eql(1)
    .expect(title.innerText).eql('Buying Catalogue')
    .expect(description.innerText).eql('The GP IT Futures procurement framework has replaced GP System of Choice (GPSoC). Use our Buying Catalogue to find out what high-quality IT systems and services are available.');
});

test('should render the about us section', async (t) => {
  pageSetup(t);
  const aboutUsSection = Selector('[data-test-id="about-us"]');
  await t
    .expect(aboutUsSection.find('h3').innerText).eql('About us')
    .expect(aboutUsSection.find('p').innerText).eql('The NHS Digital Buying Catalogue is an online marketplace platform. It can be used to find out which clinical IT systems are available to buy from the GP IT Futures framework.')
    .expect(aboutUsSection.find('p').nth(1).innerText).eql('The GP IT Futures procurement framework, which replaces the GP System of Choice (GPSoC) framework, will make a wider range of systems available. The systems have been assessed against a set of Capabilities and Standards to help improve safety, quality and efficiency in GP surgeries.')
    .expect(aboutUsSection.find('p').nth(2).innerText).eql('The functionality of the Buying Catalogue will be enhanced and the number of available products – known as Solutions - will increase over time.');
});

test('should render the guidance promo', async (t) => {
  pageSetup(t);
  const guidancePromo = Selector('[data-test-id="guidance-promo"]');
  await t
    .expect(guidancePromo.count).eql(1)
    .expect(guidancePromo.find('h3').innerText).eql('Buying Catalogue Guide')
    .expect(guidancePromo.find('p').innerText).eql('Our guide explains how to use the Buying Catalogue to find and procure clinical Solutions.');
});

test('should render the browse promo', async (t) => {
  pageSetup(t);
  const browsePromo = Selector('[data-test-id="browse-promo"]');
  await t
    .expect(browsePromo.count).eql(1)
    .expect(browsePromo.find('h3').innerText).eql('View Solutions')
    .expect(browsePromo.find('p').innerText).eql('See what’s available on the GP IT Futures procurement framework that can meet your needs.');
});

test('should navigate to the browse solution page when clicking on the browse promo', async (t) => {
  pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const browsePromoLink = Selector('[data-test-id="browse-promo"] a');
  await t
    .expect(browsePromoLink.exists).ok()
    .click(browsePromoLink)
    .expect(getLocation()).contains('/solutions');
});
