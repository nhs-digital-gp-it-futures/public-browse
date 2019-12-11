import { Selector } from 'testcafe';
import content from './manifest.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/guide');
};

fixture('Show Buyers Guide Page');

test('should render the title', async (t) => {
  pageSetup(t);
  const title = Selector('[data-test-id="guide-page-title"]');
  await t
    .expect(title.count).eql(1)
    .expect(title.innerText).eql(content.title);
});

test('should render the description', async (t) => {
  pageSetup(t);
  const description = Selector('[data-test-id="guide-page-description"]');
  await t
    .expect(description.count).eql(1)
    .expect(description.innerText).eql(content.description);
});

test('should render the subtext', async (t) => {
  pageSetup(t);
  const subText = Selector('[data-test-id="guide-page-subtext"] > div');
  await t
    .expect(subText.find('div').nth(0).innerText).eql(content.subtext[0])
    .expect(subText.find('div').nth(1).innerText).eql(content.subtext[1])
    .expect(subText.find('div').nth(2).innerText).eql(content.subtext[2])
    .expect(subText.find('div').nth(3).innerText).eql(content.subtext[3]);
});

test('should render Catalogue Solution subsections', async (t) => {
  pageSetup(t);
  const catalogueSolutionSelector = Selector('[data-test-id="guide-section-catalogue-solution"]');
  const catalogueSolution = content.sections[0];
  await t
    .expect(catalogueSolutionSelector.find('[data-test-id="guide-section-title"]').innerText).eql(catalogueSolution.title)
    .expect(catalogueSolutionSelector.find('[data-test-id="subsection-title-associated-services"]').innerText).eql(catalogueSolution.subsections[1].title)
    .expect(catalogueSolutionSelector.find('[data-test-id="subsection-associated-services"]').innerText).eql(catalogueSolution.subsections[1].description[0])
    .expect(catalogueSolutionSelector.find('[data-test-id="subsection-title-additional-services"]').innerText).eql(catalogueSolution.subsections[2].title)
    .expect(catalogueSolutionSelector.find('[data-test-id="subsection-additional-services"] > div:nth-child(1)').innerText).eql(catalogueSolution.subsections[2].description[0])
    .expect(catalogueSolutionSelector.find('[data-test-id="subsection-additional-services"] > div:nth-child(2)').innerText).eql(catalogueSolution.subsections[2].description[1])
    .expect(catalogueSolutionSelector.find('[data-test-id="subsection-additional-services"] > div:nth-child(3)').innerText).eql(catalogueSolution.subsections[2].description[2]);
});

test('should render Capabilities subsections', async (t) => {
  pageSetup(t);
  const capabilitiesSelector = Selector('[data-test-id="guide-section-capabilities"]');
  const capabilitiesSection = content.sections[1];
  await t
    .expect(capabilitiesSelector.find('[data-test-id="guide-section-title"]').innerText).eql(capabilitiesSection.title)
    .expect(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(1)').innerText).eql(capabilitiesSection.subsections[0].description[0])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(2)').innerText).eql(capabilitiesSection.subsections[0].description[1])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(3)').innerText).eql(capabilitiesSection.subsections[0].description[2])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(3)').innerText).eql(capabilitiesSection.subsections[0].description[2])
    .expect(capabilitiesSelector.find('[data-test-id="guide-section-description-with-link"] > a').innerText).eql(capabilitiesSection.subsections[1].description[0].linkText)
    .expect(capabilitiesSelector.find('[data-test-id="subsection-title-epics"]').innerText).eql(capabilitiesSection.subsections[2].title)
    .expect(capabilitiesSelector.find('[data-test-id="subsection-epics"] > div:nth-child(1)').innerText).eql(capabilitiesSection.subsections[2].description[0])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-epics"] > div:nth-child(2)').innerText).eql(capabilitiesSection.subsections[2].description[1])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-epics"] > div:nth-child(3)').innerText).eql(capabilitiesSection.subsections[2].description[2])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-title-foundation-solution-set"]').innerText).eql(capabilitiesSection.subsections[3].title)
    .expect(capabilitiesSelector.find('[data-test-id="subsection-foundation-solution-set"] > div:nth-child(1)').innerText).eql(capabilitiesSection.subsections[3].description[0])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-they-are"] > div:nth-child(1)').innerText).eql(capabilitiesSection.subsections[4].description[0])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(1)').innerText).eql(capabilitiesSection.subsections[5].bulletlist[0])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(2)').innerText).eql(capabilitiesSection.subsections[5].bulletlist[1])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(3)').innerText).eql(capabilitiesSection.subsections[5].bulletlist[2])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(4)').innerText).eql(capabilitiesSection.subsections[5].bulletlist[3])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(5)').innerText).eql(capabilitiesSection.subsections[5].bulletlist[4])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-bulletlist"] > li:nth-child(6)').innerText).eql(capabilitiesSection.subsections[5].bulletlist[5])
    .expect(capabilitiesSelector.find('[data-test-id="subsection-view-only-catalogue-solutions"] > div:nth-child(1)').innerText).eql(capabilitiesSection.subsections[6].description[0]);
});

test('should render learn more about the Capability Model link', async (t) => {
  pageSetup(t);
  const link = Selector('[data-test-id="guide-section-description-with-link"] > a');
  await t
    .expect(link.exists).ok();
});

test('should render Standards subsections', async (t) => {
  pageSetup(t);
  const standardsSelector = Selector('[data-test-id="guide-section-standards"]');
  const standardsSection = content.sections[2];
  await t
    .expect(standardsSelector.find('[data-test-id="guide-section-title"]').innerText).eql(standardsSection.title)
    .expect(standardsSelector.find('[data-test-id="subsection-standards-describe"] > div:nth-child(1)').innerText).eql(standardsSection.subsections[0].description[0])
    .expect(standardsSelector.find('[data-test-id="subsection-standards-describe"] > div:nth-child(2)').innerText).eql(standardsSection.subsections[0].description[1])
    .expect(standardsSelector.find('[data-test-id="subsection-title-compliance-work-off-plan"]').innerText).eql(standardsSection.subsections[1].title)
    .expect(standardsSelector.find('[data-test-id="subsection-compliance-work-off-plan"] > div:nth-child(1)').innerText).eql(standardsSection.subsections[1].description[0])
    .expect(standardsSelector.find('[data-test-id="subsection-compliance-work-off-plan"] > div:nth-child(2)').innerText).eql(standardsSection.subsections[1].description[1]);
});

test('should render Integrations subsections', async (t) => {
  pageSetup(t);
  const integrationSelector = Selector('[data-test-id="guide-section-integrations"]');
  const integrationSection = content.sections[3];
  await t
    .expect(integrationSelector.find('[data-test-id="guide-section-title"]').innerText).eql(integrationSection.title)
    .expect(integrationSelector.find('[data-test-id="subsection-title-nhs-assured-integrations"]').innerText).eql(integrationSection.subsections[0].title)
    .expect(integrationSelector.find('[data-test-id="subsection-nhs-assured-integrations"] > div:nth-child(1)').innerText).eql(integrationSection.subsections[0].description[0])
    .expect(integrationSelector.find('[data-test-id="subsection-title-supplier-assured-integrations"]').innerText).eql(integrationSection.subsections[1].title)
    .expect(integrationSelector.find('[data-test-id="subsection-supplier-assured-integrations"] > div:nth-child(1)').innerText).eql(integrationSection.subsections[1].description[0]);
});

test('should render Learn More subsections', async (t) => {
  pageSetup(t);
  const learnMoreSelector = Selector('[data-test-id="guide-section-learn-more"]');
  const learnMoreSection = content.sections[4];
  await t
    .expect(learnMoreSelector.find('[data-test-id="guide-section-title"]').innerText).eql(learnMoreSection.title)
    .expect(learnMoreSelector.find('[data-test-id="subsection-learn-more"] > div:nth-child(1)').innerText).eql(learnMoreSection.subsections[0].description[0])
    .expect(learnMoreSelector.find('[data-test-id="subsection-button"] > a').innerText).eql(learnMoreSection.subsections[1].button.text)
    .expect(learnMoreSelector.find('[data-test-id="subsection-button"] > a').getAttribute('href')).eql(`https://gpitfuturesdevsa.blob.core.windows.net${learnMoreSection.subsections[1].button.href}`);
});

test('should render Contact Us subsections', async (t) => {
  pageSetup(t);
  const contactUsSelector = Selector('[data-test-id="guide-section-contact-us"]');
  const contactUsSection = content.sections[5];
  await t
    .expect(contactUsSelector.find('[data-test-id="guide-section-title"]').innerText).eql(contactUsSection.title)
    .expect(contactUsSelector.find('[data-test-id="guide-section-description-with-link"] > span:nth-child(1)').innerText).eql(contactUsSection.subsections[0].description[0].startText)
    .expect(contactUsSelector.find('[data-test-id="guide-section-description-with-link"] > span:nth-child(3)').innerText).eql(contactUsSection.subsections[0].description[0].endText)
    .expect(contactUsSelector.find('[data-test-id="guide-section-description-with-link"] > a').innerText).eql(contactUsSection.subsections[0].description[0].linkText);
});
