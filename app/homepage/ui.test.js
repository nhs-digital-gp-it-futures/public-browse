import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import content from './manifest.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/');
};

fixture('Show Home Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should render the homepage hero', async (t) => {
  await pageSetup(t);
  const homepageSection = Selector('[data-test-id="homepage-hero"] > section');
  const title = homepageSection.find('h1');
  const description = homepageSection.find('p');

  await t
    .expect(homepageSection.count).eql(1)
    .expect(title.innerText).eql(content.heroHeading)
    .expect(description.innerText).eql(content.heroText);
});

test('should render the about us section', async (t) => {
  await pageSetup(t);
  const aboutUsSection = Selector('[data-test-id="about-us"]');
  await t
    .expect(aboutUsSection.find('h3').innerText).eql(content.title)
    .expect(aboutUsSection.find('p').innerText).eql(content.description[0])
    .expect(aboutUsSection.find('p').nth(1).innerText).eql(content.description[1])
    .expect(aboutUsSection.find('p').nth(2).innerText).eql(content.description[2]);
});

test('should render the guidance promo', async (t) => {
  await pageSetup(t);
  const guidancePromo = Selector('[data-test-id="guidance-promo"]');
  await t
    .expect(guidancePromo.count).eql(1)
    .expect(guidancePromo.find('h3').innerText).eql(content.guidePromoHeading)
    .expect(guidancePromo.find('p').innerText).eql(content.guidePromoDescription);
});

test('should render the browse promo', async (t) => {
  await pageSetup(t);
  const browsePromo = Selector('[data-test-id="browse-promo"]');
  await t
    .expect(browsePromo.count).eql(1)
    .expect(browsePromo.find('h3').innerText).eql(content.viewSolutionsPromoHeading)
    .expect(browsePromo.find('p').innerText).eql(content.viewSolutionsPromoDescription);
});

test('should navigate to the browse solution page when clicking on the browse promo', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const browsePromoLink = Selector('[data-test-id="browse-promo"] a');
  await t
    .expect(browsePromoLink.exists).ok()
    .click(browsePromoLink)
    .expect(getLocation()).contains('/solutions');
});
