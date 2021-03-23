import { Selector } from 'testcafe';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/guide');
};

fixture('Show Buyers Guide Page');

const defaultSections = {
  'should render the title': '[data-test-id="guide-page-title"]',
  'should render the description': '[data-test-id="guide-page-description"]',
  'should render the advice': '[data-test-id="guide-page-advice"]',
  'should render the subtext': '[data-test-id="guide-page-subtext"]',
  'should render Catalogue Solution subsections': '[data-test-id="guide-section-catalogue-solution"]',
  'should render Capabilities subsections': '[data-test-id="guide-section-capabilities"]',
  'should render learn more about the Capability Model link': '[data-test-id="guide-section-description-with-link"] > a',
  'should render Standards subsections': '[data-test-id="guide-section-standards"]',
  'should render Work-off Plans subsections': '[data-test-id="guide-section-work-off-plans"]',
  'should render Integrations subsections': '[data-test-id="guide-section-integrations"]',
  'should render Learn More subsections': '[data-test-id="guide-section-learn-more"]',
  'should render Contact Us subsections': '[data-test-id="guide-section-contact-us"]',
};

Object.keys(defaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(defaultSections[key]);
    await t
      .expect(element.exists).ok();
  });
});
