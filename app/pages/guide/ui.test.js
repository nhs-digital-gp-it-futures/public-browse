import { extractInnerText } from 'buying-catalogue-library';
import { Selector } from 'testcafe';
import content from './manifest.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/guide');
};

fixture('Show Buyers Guide Page');

test('should render the title', async (t) => {
  await pageSetup(t);
  const title = Selector('[data-test-id="guide-page-title"]');
  await t
    .expect(title.count).eql(1)
    .expect(await extractInnerText(title)).eql(content.title);
});

test('should render the description', async (t) => {
  await pageSetup(t);
  const description = Selector('[data-test-id="guide-page-description"]');
  await t
    .expect(description.count).eql(1)
    .expect(await extractInnerText(description)).eql(content.description);
});

test('should render the advice', async (t) => {
  await pageSetup(t);
  const advice = Selector('[data-test-id="guide-page-advice"]');
  await t
    .expect(await extractInnerText(advice.find('p').nth(0))).eql(content.advice[0])
    .expect(await extractInnerText(advice.find('p').nth(1))).eql(content.advice[1])
    .expect(await extractInnerText(advice.find('p').nth(2))).eql(content.advice[2]);
});

test('should render the subtext', async (t) => {
  await pageSetup(t);
  const subtext = Selector('[data-test-id="guide-page-subtext"]');
  await t
    .expect(await extractInnerText(subtext)).eql(content.subtext);
});

test('should render Catalogue Solution subsections', async (t) => {
  await pageSetup(t);
  const catalogueSolutionSelector = Selector('[data-test-id="guide-section-catalogue-solution"]');
  const catalogueSolution = content.sections[0];
  await t
    .expect(await extractInnerText(catalogueSolutionSelector.find('[data-test-id="guide-section-title"]'))).eql(catalogueSolution.title)
    .expect(await extractInnerText(catalogueSolutionSelector.find('[data-test-id="subsection-title-associated-services"]'))).eql(catalogueSolution.subsections[1].title)
    .expect(await extractInnerText(catalogueSolutionSelector.find('[data-test-id="subsection-associated-services"]'))).eql(catalogueSolution.subsections[1].description[0])
    .expect(await extractInnerText(catalogueSolutionSelector.find('[data-test-id="subsection-title-additional-services"]'))).eql(catalogueSolution.subsections[2].title)
    .expect(await extractInnerText(catalogueSolutionSelector.find('[data-test-id="subsection-additional-services"] > p:nth-child(1)'))).eql(catalogueSolution.subsections[2].description[0])
    .expect(await extractInnerText(catalogueSolutionSelector.find('[data-test-id="subsection-additional-services"] > p:nth-child(2)'))).eql(catalogueSolution.subsections[2].description[1])
    .expect(await extractInnerText(catalogueSolutionSelector.find('[data-test-id="subsection-additional-services"] > p:nth-child(3)'))).eql(catalogueSolution.subsections[2].description[2]);
});

test('should render Capabilities subsections', async (t) => {
  await pageSetup(t);
  const capabilitiesSelector = Selector('[data-test-id="guide-section-capabilities"]');
  const capabilitiesSection = content.sections[1];
  await t
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="guide-section-title"]'))).eql(capabilitiesSection.title)
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > p:nth-child(1)'))).eql(capabilitiesSection.subsections[0].description[0])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > p:nth-child(2)'))).eql(capabilitiesSection.subsections[0].description[1])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > p:nth-child(3)'))).eql(capabilitiesSection.subsections[0].description[2])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > p:nth-child(3)'))).eql(capabilitiesSection.subsections[0].description[2])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="guide-section-description-with-link"] > a'))).eql(capabilitiesSection.subsections[1].description[0].linkText)
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-title-epics"]'))).eql(capabilitiesSection.subsections[2].title)
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-epics"] > p:nth-child(1)'))).eql(capabilitiesSection.subsections[2].description[0])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-epics"] > p:nth-child(2)'))).eql(capabilitiesSection.subsections[2].description[1])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-epics"] > p:nth-child(3)'))).eql(capabilitiesSection.subsections[2].description[2])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-title-foundation-solution-set"]'))).eql(capabilitiesSection.subsections[3].title)
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-foundation-solution-set"] > p:nth-child(1)'))).eql(capabilitiesSection.subsections[3].description[0])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-they-are"] > p:nth-child(1)'))).eql(capabilitiesSection.subsections[4].description[0])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(1)'))).eql(capabilitiesSection.subsections[5].bulletlist[0])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(2)'))).eql(capabilitiesSection.subsections[5].bulletlist[1])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(3)'))).eql(capabilitiesSection.subsections[5].bulletlist[2])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(4)'))).eql(capabilitiesSection.subsections[5].bulletlist[3])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(5)'))).eql(capabilitiesSection.subsections[5].bulletlist[4])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(6)'))).eql(capabilitiesSection.subsections[5].bulletlist[5])
    .expect(await extractInnerText(capabilitiesSelector.find('[data-test-id="subsection-view-only-catalogue-solutions"] > p:nth-child(1)'))).eql(capabilitiesSection.subsections[6].description[0]);
});

test('should render learn more about the Capability Model link', async (t) => {
  await pageSetup(t);
  const link = Selector('[data-test-id="guide-section-description-with-link"] > a');
  await t
    .expect(link.exists).ok();
});

test('should render Standards subsections', async (t) => {
  await pageSetup(t);
  const standardsSelector = Selector('[data-test-id="guide-section-standards"]');
  const standardsSection = content.sections[2];
  await t
    .expect(await extractInnerText(standardsSelector.find('[data-test-id="guide-section-title"]'))).eql(standardsSection.title)
    .expect(await extractInnerText(standardsSelector.find('[data-test-id="subsection-standards-describe"] > p:nth-child(1)'))).eql(standardsSection.subsections[0].description[0])
    .expect(await extractInnerText(standardsSelector.find('[data-test-id="subsection-standards-describe"] > p:nth-child(2)'))).eql(standardsSection.subsections[0].description[1]);
});

test('should render Work-off Plans subsections', async (t) => {
  await pageSetup(t);
  const workOffPlansSelector = Selector('[data-test-id="guide-section-work-off-plans"]');
  const workOffPlansSection = content.sections[3];
  await t
    .expect(await extractInnerText(workOffPlansSelector.find('[data-test-id="guide-section-title"]'))).eql(workOffPlansSection.title)
    .expect(await extractInnerText(workOffPlansSelector.find('[data-test-id="subsection-work-off-plans-describe"] > p:nth-child(1)'))).eql(workOffPlansSection.subsections[0].description[0])
    .expect(await extractInnerText(workOffPlansSelector.find('[data-test-id="subsection-work-off-plans-describe"] > p:nth-child(2)'))).eql(workOffPlansSection.subsections[0].description[1]);
});

test('should render Integrations subsections', async (t) => {
  await pageSetup(t);
  const integrationSelector = Selector('[data-test-id="guide-section-integrations"]');
  const integrationSection = content.sections[4];
  await t
    .expect(await extractInnerText(integrationSelector.find('[data-test-id="guide-section-title"]'))).eql(integrationSection.title)
    .expect(await extractInnerText(integrationSelector.find('[data-test-id="subsection-title-nhs-assured-integrations"]'))).eql(integrationSection.subsections[0].title)
    .expect(await extractInnerText(integrationSelector.find('[data-test-id="subsection-nhs-assured-integrations"] > p:nth-child(1)'))).eql(integrationSection.subsections[0].description[0])
    .expect(await extractInnerText(integrationSelector.find('[data-test-id="subsection-title-supplier-assured-integrations"]'))).eql(integrationSection.subsections[1].title)
    .expect(await extractInnerText(integrationSelector.find('[data-test-id="subsection-supplier-assured-integrations"] > p:nth-child(1)'))).eql(integrationSection.subsections[1].description[0]);
});

test('should render Learn More subsections', async (t) => {
  await pageSetup(t);
  const learnMoreSelector = Selector('[data-test-id="guide-section-learn-more"]');
  const learnMoreSection = content.sections[5];
  await t
    .expect(await extractInnerText(learnMoreSelector.find('[data-test-id="guide-section-title"]'))).eql(learnMoreSection.title)
    .expect(await extractInnerText(learnMoreSelector.find('[data-test-id="subsection-learn-more"] > p:nth-child(1)'))).eql(learnMoreSection.subsections[0].description[0]);
});

test('should render Contact Us subsections', async (t) => {
  await pageSetup(t);
  const contactUsSelector = Selector('[data-test-id="guide-section-contact-us"]');
  const contactUsSection = content.sections[6];
  await t
    .expect(await extractInnerText(contactUsSelector.find('[data-test-id="guide-section-title"]'))).eql(contactUsSection.title)
    .expect(await extractInnerText(contactUsSelector.find('[data-test-id="guide-section-description-with-link"] > span:nth-child(1)'))).eql(contactUsSection.subsections[0].description[0].startText)
    .expect(await extractInnerText(contactUsSelector.find('[data-test-id="guide-section-description-with-link"] > span:nth-child(3)'))).eql(contactUsSection.subsections[0].description[0].endText)
    .expect(await extractInnerText(contactUsSelector.find('[data-test-id="guide-section-description-with-link"] > a'))).eql(contactUsSection.subsections[0].description[0].linkText);
});
