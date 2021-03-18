import nock from 'nock';
import { extractInnerText } from 'buying-catalogue-library';
import { Selector, ClientFunction } from 'testcafe';
import publicSolutionWithData from '../../test-utils/fixtures/publicSolutionWithData.json';
import publicSolutionNoData from '../../test-utils/fixtures/publicSolutionNoData.json';
import aFoundationSolutionList from '../../test-utils/fixtures/aFoundationSolutionList.json';

import { apiLocalhost, apiPath, clientLocalhost } from '../../test-utils/config';

const getLocation = ClientFunction(() => document.location.href);

const mocks = (existingData) => {
  if (!existingData) {
    nock(apiLocalhost)
      .get(`${apiPath}/Public`)
      .reply(200, publicSolutionNoData);
  } else {
    nock(apiLocalhost)
      .get(`${apiPath}/Public`)
      .reply(200, publicSolutionWithData);
  }
};

const pageSetup = async (t, existingData = false) => {
  mocks(existingData);
  await t.navigateTo(`${clientLocalhost}/solutions/foundation/100000-001`);
};

fixture('Show view solution page - heading components');

test('should navigate back to the previous page when backlink is clicked', async (t) => {
  await pageSetup(t);
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/Foundation')
    .reply(200, aFoundationSolutionList);
  const backLink = Selector('[data-test-id="view-solution-page-back-link"] a');

  await t
    .expect(backLink.exists).ok()
    .expect(await extractInnerText(backLink)).eql('Go back to previous page')
    .click(backLink)
    .expect(getLocation()).contains('/solutions')
    .expect(Selector('[data-test-id="general-page-title"]').exists).ok();
});

test('should render foundation tag', async (t) => {
  await pageSetup(t);

  const foundationTag = Selector('[data-test-id="view-solution-foundation"]');

  await t
    .expect(await extractInnerText(foundationTag)).eql('Foundation Solution Set');
});

test('should render solution name', async (t) => {
  await pageSetup(t);

  const solutionName = Selector('[data-test-id="view-solution-page-solution-name"]');

  await t
    .expect(await extractInnerText(solutionName)).eql('Write on Time');
});

test('should render supplier name', async (t) => {
  await pageSetup(t);

  const supplierName = Selector('[data-test-id="view-solution-page-supplier-name"]');

  await t
    .expect(await extractInnerText(supplierName)).eql('Really Kool Corporation');
});

test('should render solution id', async (t) => {
  await pageSetup(t);

  const solutionId = Selector('[data-test-id="view-solution-page-solution-id"]');

  await t
    .expect(await extractInnerText(solutionId)).eql('Solution ID: 100000-001');
});

test('should render last updated date', async (t) => {
  await pageSetup(t);

  const lastUpdated = Selector('[data-test-id="view-solution-page-last-updated"]');

  await t
    .expect(await extractInnerText(lastUpdated)).eql('Solution information last updated: 15 March 1996');
});

fixture('Show view solution page - no existing marketing data');

test('Solution description section should not be rendered', async (t) => {
  await pageSetup(t);

  const solutionDescriptionSection = Selector('[data-test-id="view-solution-description"]');

  await t
    .expect(solutionDescriptionSection.exists).notOk();
});

test('Features section should not be rendered', async (t) => {
  await pageSetup(t);
  const featuresSection = Selector('[data-test-id="view-features"]');

  await t
    .expect(featuresSection.exists).notOk();
});

test('Capabilities section should not be rendered', async (t) => {
  await pageSetup(t);
  const capabilitiesSection = Selector('[data-test-id="view-capabilities"]');

  await t
    .expect(capabilitiesSection.exists).notOk();
});

test('Integrations section should not be rendered', async (t) => {
  await pageSetup(t);
  const integrationsSection = Selector('[data-test-id="view-integrations"]');

  await t
    .expect(integrationsSection.exists).notOk();
});

test('Implementation timescales section should not be rendered', async (t) => {
  await pageSetup(t);
  const integrationsSection = Selector('[data-test-id="view-implementation-timescales"]');

  await t
    .expect(integrationsSection.exists).notOk();
});

test('Client-application-types section should not be rendered', async (t) => {
  await pageSetup(t);

  const clientApplicationTypesSection = Selector('[data-test-id="view-client-application-types"]');

  await t
    .expect(clientApplicationTypesSection.exists).notOk();
});

test('Hosting type - public cloud section should not be rendered', async (t) => {
  await pageSetup(t);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');

  await t
    .expect(hostingTypesSection.exists).notOk();
});

test('Hosting type - private cloud section should not be rendered', async (t) => {
  await pageSetup(t);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');

  await t
    .expect(hostingTypesSection.exists).notOk();
});

test('Hosting type - hybrid section should not be rendered', async (t) => {
  await pageSetup(t);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');

  await t
    .expect(hostingTypesSection.exists).notOk();
});

test('Hosting type - on premise section should not be rendered', async (t) => {
  await pageSetup(t);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');

  await t
    .expect(hostingTypesSection.exists).notOk();
});

test('About supplier section should not be rendered', async (t) => {
  await pageSetup(t);

  const aboutSupplierSection = Selector('[data-test-id="view-about-supplier"]');

  await t
    .expect(aboutSupplierSection.exists).notOk();
});

test('Contact-details section should not be rendered', async (t) => {
  await pageSetup(t);

  const contactDetailsSection = Selector('[data-test-id="view-solution-contact-details"]');

  await t
    .expect(contactDetailsSection.exists).notOk();
});

test('Roadmap section should not be rendered', async (t) => {
  await pageSetup(t);

  const roadmapSection = Selector('[data-test-id="view-roadmap"]');

  await t
    .expect(roadmapSection.exists).notOk();
});

test('Learn More section should not be rendered', async (t) => {
  await pageSetup(t);

  const learnMoreSection = Selector('[data-test-id="view-learn-more"]');

  await t
    .expect(learnMoreSection.exists).notOk();
});

fixture('Show view solution page - with existing marketing data');

test('Solution description section and all questions should be rendered', async (t) => {
  await pageSetup(t, true);

  const solutionDescriptionSection = Selector('[data-test-id="view-solution-description"]');
  const summaryQuestion = solutionDescriptionSection.find('[data-test-id="view-section-table-row-summary"]');
  const descriptionQuestion = solutionDescriptionSection.find('[data-test-id="view-section-table-row-description"]');
  const linkQuestion = solutionDescriptionSection.find('[data-test-id="view-question-data-link"]');

  await t
    .expect(solutionDescriptionSection.exists).ok()
    .expect(await extractInnerText(solutionDescriptionSection.find('h3'))).eql('Description')

    .expect(summaryQuestion.exists).ok()
    .expect(await extractInnerText(summaryQuestion.find('h4'))).eql('Summary')
    .expect(await extractInnerText(summaryQuestion.find('[data-test-id="view-question-data-text-summary"]'))).eql('The solution summary')

    .expect(descriptionQuestion.exists).ok()
    .expect(await extractInnerText(descriptionQuestion.find('h4'))).eql('Full description')
    .expect(await extractInnerText(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]'))).eql('The solution description')

    .expect(linkQuestion.exists).ok()
    .expect(await extractInnerText(linkQuestion)).eql('The solution link');
});

test('Features section should be rendered and the features displayed', async (t) => {
  await pageSetup(t, true);

  const featuresSection = Selector('[data-test-id="view-features"]');

  await t
    .expect(featuresSection.exists).ok()
    .expect(await extractInnerText(featuresSection.find('h3'))).eql('Features')

    .expect(featuresSection.find('[data-test-id="view-question-title"]').exists).notOk()
    .expect(featuresSection.find('[data-test-id="view-question-data-bulletlist"]').exists).ok()
    .expect(featuresSection.find('[data-test-id="view-question-data-bulletlist"]').find('li').count).eql(3)
    .expect(await extractInnerText(featuresSection.find('[data-test-id="view-question-data-bulletlist"]').find('li:nth-child(1)'))).eql('Feature A')
    .expect(await extractInnerText(featuresSection.find('[data-test-id="view-question-data-bulletlist"]').find('li:nth-child(2)'))).eql('Feature B')
    .expect(await extractInnerText(featuresSection.find('[data-test-id="view-question-data-bulletlist"]').find('li:nth-child(3)'))).eql('Feature C');
});

test('Capabilities section should be rendered and the capabilities displayed', async (t) => {
  await pageSetup(t, true);

  const capabilitiesSection = Selector('[data-test-id="view-capabilities"]');
  const capabilitiesExpandableSection = Selector('[data-test-id="view-section-capabilities"]');
  const capabilitiesTitle = await extractInnerText(capabilitiesSection.find('[data-test-id="view-section-table-row-capabilities"]'));
  const capabilitiesTitleParts = capabilitiesTitle.split(/\n/);
  const epicsSection = capabilitiesSection.find('[data-test-id="view-question-epic"]');
  const mustEpics = epicsSection.find('[data-test-id="must-epics"]');
  const mayEpics = epicsSection.find('[data-test-id="may-epics"]');

  await t
    .expect(capabilitiesSection.exists).ok()
    .expect(await extractInnerText(capabilitiesSection.find('h3'))).eql('Capabilities met - NHS assured')
    .expect(capabilitiesSection.find('[data-test-id="view-section-table-row-capabilities"]').exists).ok()
    .expect(capabilitiesTitleParts[0].trim()).eql('Example capability, 1.0.1')
    .expect(capabilitiesTitleParts[1].trim()).eql('Describes the capability.')
    .expect(capabilitiesTitleParts[2].trim()).eql('How this capability was met')
    .expect(capabilitiesSection.find('[data-test-id="view-question-data-text-description"]').exists).ok()
    .expect(await extractInnerText(capabilitiesSection.find('[data-test-id="view-question-data-text-description"]'))).eql('Describes the capability.')
    .expect(capabilitiesExpandableSection.exists).ok()
    .expect(capabilitiesExpandableSection.find('details[open]').exists).notOk()
    .click(capabilitiesExpandableSection.find('summary'))
    .expect(capabilitiesExpandableSection.find('details[open]').exists).ok()
    .expect(await capabilitiesExpandableSection.find('[data-test-id="view-question-data-text-link"] > a').getAttribute('href')).eql('https://link-to-capability.com')

    .expect(epicsSection.exists).ok()
    .expect(mustEpics.exists).ok()
    .expect(await extractInnerText(mustEpics.find('[data-test-id="must-tag"]'))).eql('Must epics')
    .expect(mustEpics.find('[data-test-id="must-met-epic-list"] li').count).eql(2)
    .expect(await extractInnerText(mustEpics.find('[data-test-id="must-met-epic-list"] li').nth(0))).eql('Must met epic 1 (C12E3)')
    .expect(await extractInnerText(mustEpics.find('[data-test-id="must-met-epic-list"] li').nth(1))).eql('Must met epic 2 (C12E4)')
    .expect(mustEpics.find('[data-test-id="must-not-met-epic-list"] li').count).eql(1)
    .expect(await extractInnerText(mustEpics.find('[data-test-id="must-not-met-epic-list"] li').nth(0))).eql('Must not-met epic 1 (C12E5)')
    .expect(mayEpics.exists).ok()
    .expect(await extractInnerText(mayEpics.find('[data-test-id="may-tag"]'))).eql('May epics')
    .expect(mayEpics.find('[data-test-id="may-met-epic-list"] li').count).eql(1)
    .expect(await extractInnerText(mayEpics.find('[data-test-id="may-met-epic-list"] li').nth(0))).eql('May met epic 1 (C12E1)')
    .expect(mayEpics.find('[data-test-id="may-not-met-epic-list"] li').count).eql(1)
    .expect(await extractInnerText(mayEpics.find('[data-test-id="may-not-met-epic-list"] li').nth(0))).eql('May not-met epic 1 (C12E2)');
});

test('Integrations section should be rendered', async (t) => {
  await pageSetup(t, true);

  const integrationsSection = Selector('[data-test-id="view-integrations"]');
  const documentLink = integrationsSection.find('[data-test-id="view-question-data-text-link-authority-integrations"]');

  await t
    .expect(integrationsSection.exists).ok()
    .expect(await extractInnerText(integrationsSection.find('h3'))).eql('Integrations')
    .expect(await extractInnerText(documentLink)).eql('View NHS assured integrations')
    .expect(await documentLink.find('a').getAttribute('href')).eql(`${publicSolutionWithData.id}/document/integration.pdf`)
    .expect(await extractInnerText(integrationsSection.find('[data-test-id="view-question-data-text-link-supplier-integrations"]'))).eql('http://www.link.com');
});

test('Implementation timescales section should be rendered', async (t) => {
  await pageSetup(t, true);

  const implementationTimescalesSection = Selector('[data-test-id="view-implementation-timescales"]');

  await t
    .expect(implementationTimescalesSection.exists).ok()
    .expect(await extractInnerText(implementationTimescalesSection.find('h3'))).eql('Implementation timescales')
    .expect(await extractInnerText(implementationTimescalesSection.find('[data-test-id="view-question-data-text-description"]'))).eql('Implementations without transition from another Catalogue Solution typically take 3-5 working days, the average is 4. The extent of your configuration requirements will have the greatest impact on these timescales. Your main responsibility will be configuration planning and approval.');
});

test('Client application type - browser-based section should be rendered', async (t) => {
  await pageSetup(t, true);
  const clientApplicationTypesSection = Selector('[data-test-id="view-client-application-types"]');
  const browserBasedExpandableSection = Selector('[data-test-id="view-section-browser-based"]');
  const browserBasedExpandaleSectionTable = Selector('[data-test-id="view-section-dl-browser-based"]');
  const supportedBrowsersRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(1)');
  const mobileResponsiveRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(2)');
  const mobileFirstRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(3)');
  const pluginsRequiredRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(4)');
  const pluginsDetailRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(5)');
  const minimumConnectionRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(6)');
  const minimumResolutionRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(7)');
  const hardwareRequirementsDescriptionRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(8)');
  const additionalInformationRow = browserBasedExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(9)');

  await t
    .expect(clientApplicationTypesSection.exists).ok()
    .expect(await extractInnerText(clientApplicationTypesSection.find('h3'))).eql('Client application type')

    .expect(browserBasedExpandableSection.exists).ok()
    .expect(await extractInnerText(browserBasedExpandableSection)).eql('Browser-based application')
    .expect(supportedBrowsersRow.find('dt').visible).notOk()
    .click(browserBasedExpandableSection.find('summary'))

    .expect(await extractInnerText(supportedBrowsersRow.find('dt'))).eql('Supported browser types')
    .expect(await extractInnerText(supportedBrowsersRow.find('dd'))).contains('Google Chrome')
    .expect(await extractInnerText(supportedBrowsersRow.find('dd'))).contains('Mozilla Firefox')

    .expect(await extractInnerText(mobileResponsiveRow.find('dt'))).eql('Mobile responsive')
    .expect(await extractInnerText(mobileResponsiveRow.find('dd'))).eql('Yes')

    .expect(await extractInnerText(mobileFirstRow.find('dt'))).eql('Mobile first approach')
    .expect(await extractInnerText(mobileFirstRow.find('dd'))).eql('Yes')

    .expect(await extractInnerText(pluginsRequiredRow.find('dt'))).eql('Plug-ins or extensions required')
    .expect(await extractInnerText(pluginsRequiredRow.find('dd'))).eql('Yes')

    .expect(await extractInnerText(pluginsDetailRow.find('dt'))).eql('Additional information about plug-ins or extensions')
    .expect(await extractInnerText(pluginsDetailRow.find('dd'))).eql('The plugin detail')

    .expect(await extractInnerText(minimumConnectionRow.find('dt'))).eql('Minimum connection speed')
    .expect(await extractInnerText(minimumConnectionRow.find('dd'))).eql('1Mbps')

    .expect(await extractInnerText(minimumResolutionRow.find('dt'))).eql('Screen resolution and aspect ratio')
    .expect(await extractInnerText(minimumResolutionRow.find('dd'))).eql('4:3 800 x 600')

    .expect(await extractInnerText(hardwareRequirementsDescriptionRow.find('dt'))).eql('Hardware requirements')
    .expect(await extractInnerText(hardwareRequirementsDescriptionRow.find('dd'))).eql('Some hardware requirement description')

    .expect(await extractInnerText(additionalInformationRow.find('dt'))).eql('Additional information')
    .expect(await extractInnerText(additionalInformationRow.find('dd'))).eql('Some browser additional information');
});

test('Client application type - native-mobile section should be rendered', async (t) => {
  await pageSetup(t, true);

  const clientApplicationTypesSection = Selector('[data-test-id="view-client-application-types"]');
  const nativeMobileExpandableSection = Selector('[data-test-id="view-section-native-mobile"]');
  const nativeMobileExpandaleSectionTable = Selector('[data-test-id="view-section-dl-native-mobile"]');
  const operatingSystemRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(1)');
  const operatingSystemDescriptionRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(2)');
  const mobileFirstRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(3)');
  const minimumConnectionRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(4)');
  const connectionRequirementsRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(5)');
  const connectionDescriptionRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(6)');
  const minimumMemoryRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(7)');
  const storageDescriptionRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(8)');
  const thirdPartyComponentsRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(9)');
  const deviceCapabilitiesRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(10)');
  const hardwareRequirementsRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(11)');
  const additionalInformationRow = nativeMobileExpandaleSectionTable.find('div.nhsuk-summary-list__row:nth-child(12)');

  await t
    .expect(clientApplicationTypesSection.exists).ok()
    .expect(await extractInnerText(clientApplicationTypesSection.find('h3'))).eql('Client application type')

    .expect(nativeMobileExpandableSection.exists).ok()
    .expect(await extractInnerText(nativeMobileExpandableSection)).eql('Native mobile or tablet application')
    .expect(operatingSystemRow.find('dt').visible).notOk()
    .click(nativeMobileExpandableSection.find('summary'))

    .expect(await extractInnerText(operatingSystemRow.find('dt'))).eql('Supported operating systems')
    .expect(await extractInnerText(operatingSystemRow.find('dd'))).contains('Apple')
    .expect(await extractInnerText(operatingSystemRow.find('dd'))).contains('Android')
    .expect(await extractInnerText(operatingSystemRow.find('dd'))).contains('Other')

    .expect(await extractInnerText(operatingSystemDescriptionRow.find('dt'))).eql('Description of supported operating systems')
    .expect(await extractInnerText(operatingSystemDescriptionRow.find('dd'))).eql('Android 4.1 and above, IOS 10.6 and above.')

    .expect(await extractInnerText(mobileFirstRow.find('dt'))).eql('Mobile first approach')
    .expect(await extractInnerText(mobileFirstRow.find('dd'))).eql('Yes')

    .expect(await extractInnerText(minimumMemoryRow.find('dt'))).eql('Memory size')
    .expect(await extractInnerText(minimumMemoryRow.find('dd'))).eql('4GB')

    .expect(await extractInnerText(storageDescriptionRow.find('dt'))).eql('Storage space')
    .expect(await extractInnerText(storageDescriptionRow.find('dd'))).eql('You will need at least 4GB of free space on each device the application is installed. It is advised to use an external SD card for additional storage.')

    .expect(await extractInnerText(minimumConnectionRow.find('dt'))).eql('Minimum connection speed')
    .expect(await extractInnerText(minimumConnectionRow.find('dd'))).eql('1Mbps')

    .expect(await extractInnerText(connectionRequirementsRow.find('dt'))).eql('Connection types supported')
    .expect(await extractInnerText(connectionRequirementsRow.find('dd'))).contains('GPRS')
    .expect(await extractInnerText(connectionRequirementsRow.find('dd'))).contains('3G')
    .expect(await extractInnerText(connectionRequirementsRow.find('dd'))).contains('4G')
    .expect(await extractInnerText(connectionRequirementsRow.find('dd'))).contains('Wifi')

    .expect(await extractInnerText(connectionDescriptionRow.find('dt'))).eql('Connection requirements')
    .expect(await extractInnerText(connectionDescriptionRow.find('dd'))).eql('Average data usage will vary depending on application activity.')

    .expect(await extractInnerText(thirdPartyComponentsRow.find('dt'))).eql('Third-party components')
    .expect(await extractInnerText(thirdPartyComponentsRow.find('dd'))).eql('The application supports and requires an authenticator on each device the application is installed. You will need a software-based authenticator that implements a two-step verification service.')

    .expect(await extractInnerText(deviceCapabilitiesRow.find('dt'))).eql('Device capabilities')
    .expect(await extractInnerText(deviceCapabilitiesRow.find('dd'))).eql('In order to use our file hosting services, the application will require permission to access device storage.')

    .expect(await extractInnerText(hardwareRequirementsRow.find('dt'))).eql('Hardware requirements')
    .expect(await extractInnerText(hardwareRequirementsRow.find('dd'))).eql('To fully utilise our print functionality within the application, you will need a WiFi or Bluetooth connected printer to connect and print documents straight from the device.')

    .expect(await extractInnerText(additionalInformationRow.find('dt'))).eql('Additional information')
    .expect(await extractInnerText(additionalInformationRow.find('dd'))).eql('It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.');
});

test('Client application type - native-desktop section should be rendered', async (t) => {
  await pageSetup(t, true);

  const clientApplicationTypesSection = Selector('[data-test-id="view-client-application-types"]');
  const nativeDesktopExpandableSection = Selector('[data-test-id="view-section-native-desktop"]');
  const nativeDesktopExpandableSectionTable = Selector('[data-test-id="view-section-dl-native-desktop"]');
  const operatingSystemDescriptionRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(1)');
  const minimumConnectionRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(2)');
  const minimumMemoryRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(3)');
  const storageDescriptionRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(4)');
  const minimumCPURow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(5)');
  const recommendedResolutionRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(6)');
  const thirdPartyComponentsRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(7)');
  const deviceCapabilitiesRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(8)');
  const hardwareRequirementsRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(9)');
  const additionalInformationRow = nativeDesktopExpandableSectionTable.find('div.nhsuk-summary-list__row:nth-child(10)');

  await t
    .expect(clientApplicationTypesSection.exists).ok()
    .expect(await extractInnerText(clientApplicationTypesSection.find('h3'))).eql('Client application type')

    .expect(nativeDesktopExpandableSection.exists).ok()
    .expect(await extractInnerText(nativeDesktopExpandableSection)).eql('Native desktop application')
    .expect(nativeDesktopExpandableSection.find('details[open]').exists).notOk()
    .click(nativeDesktopExpandableSection.find('summary'))
    .expect(nativeDesktopExpandableSection.find('details[open]').exists).ok()

    .expect(await extractInnerText(operatingSystemDescriptionRow.find('dt'))).eql('Supported operating systems')
    .expect(await extractInnerText(operatingSystemDescriptionRow.find('dd'))).eql('Windows 7 and above.')

    .expect(await extractInnerText(minimumConnectionRow.find('dt'))).eql('Minimum connection speed')
    .expect(await extractInnerText(minimumConnectionRow.find('dd'))).eql('2Mbps')

    .expect(await extractInnerText(minimumMemoryRow.find('dt'))).eql('Memory size')
    .expect(await extractInnerText(minimumMemoryRow.find('dd'))).eql('4GB')

    .expect(await extractInnerText(storageDescriptionRow.find('dt'))).eql('Storage space')
    .expect(await extractInnerText(storageDescriptionRow.find('dd'))).eql('You will need at least 2.5GB of free space on each device the application is installed.')

    .expect(await extractInnerText(minimumCPURow.find('dt'))).eql('Processing power')
    .expect(await extractInnerText(minimumCPURow.find('dd'))).eql('Intel Core i5-4460 (3.4GHz) Quad-core or Better.')

    .expect(await extractInnerText(recommendedResolutionRow.find('dt'))).eql('Screen resolution and aspect ratio')
    .expect(await extractInnerText(recommendedResolutionRow.find('dd'))).eql('16:9 - 1920 x 1080')

    .expect(await extractInnerText(thirdPartyComponentsRow.find('dt'))).eql('Third-party components')
    .expect(await extractInnerText(thirdPartyComponentsRow.find('dd'))).eql('To fully utilise the letter template functionality, you will need a fully licensed version of Microsoft Word 2013 or higher.')

    .expect(await extractInnerText(deviceCapabilitiesRow.find('dt'))).eql('Device capabilities')
    .expect(await extractInnerText(deviceCapabilitiesRow.find('dd'))).eql('In order to use our branded wireless Dictaphone, the device will require Bluetooth.')

    .expect(await extractInnerText(hardwareRequirementsRow.find('dt'))).eql('Hardware requirements')
    .expect(await extractInnerText(hardwareRequirementsRow.find('dd'))).eql('To fully utilise the transcribing functionality within the application, you will need to purchase our branded wireless Dictaphone.')

    .expect(await extractInnerText(additionalInformationRow.find('dt'))).eql('Additional information')
    .expect(await extractInnerText(additionalInformationRow.find('dd'))).eql('It is possible that it may install on other platforms or versions not listed in this section. However, support is limited to systems that meet the minimum requirements.');
});

test('Hosting type - public cloud section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypePublicCloudExpandableSection = Selector('[data-test-id="view-section-hosting-type-public-cloud"]');
  const hostingTypePublicCloudExpandableSectionTable = Selector('[data-test-id="view-section-hosting-type-public-cloud"]');

  const summaryRow = hostingTypePublicCloudExpandableSectionTable.find('[data-test-id="view-section-table-row-summary"]');
  const requiresHSCNRow = hostingTypePublicCloudExpandableSectionTable.find('[data-test-id="view-section-table-row-requires-hscn"]');

  await t
    .expect(hostingTypesSection.exists).ok()
    .expect(await extractInnerText(hostingTypesSection.find('h3'))).eql('Hosting type')

    .expect(hostingTypePublicCloudExpandableSection.exists).ok()
    .expect(await extractInnerText(hostingTypePublicCloudExpandableSection)).eql('Public cloud')
    .expect(hostingTypePublicCloudExpandableSection.find('details[open]').exists).notOk()
    .click(hostingTypePublicCloudExpandableSection.find('summary'))
    .expect(hostingTypePublicCloudExpandableSection.find('details[open]').exists).ok()

    .expect(await extractInnerText(summaryRow.find('h4'))).eql('Summary')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-summary"]'))).eql('Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-link"]'))).eql('www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting')
    .expect(summaryRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok()

    .expect(await extractInnerText(requiresHSCNRow.find('div[data-test-id="view-section-table-row-component"]'))).eql('This Solution requires a HSCN/N3 connection')
    .expect(requiresHSCNRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok();
});

test('Hosting type - private cloud section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypePrivateCloudExpandableSection = Selector('[data-test-id="view-section-hosting-type-private-cloud"]');
  const hostingTypePrivateCloudExpandableSectionTable = Selector('[data-test-id="view-section-hosting-type-private-cloud"]');

  const summaryRow = hostingTypePrivateCloudExpandableSectionTable.find('[data-test-id="view-section-table-row-summary"]');
  const hostingModelRow = hostingTypePrivateCloudExpandableSectionTable.find('[data-test-id="view-section-table-row-hosting-model"]');
  const requiresHSCNRow = hostingTypePrivateCloudExpandableSectionTable.find('[data-test-id="view-section-table-row-requires-hscn"]');

  await t
    .expect(hostingTypesSection.exists).ok()
    .expect(await extractInnerText(hostingTypesSection.find('h3'))).eql('Hosting type')

    .expect(hostingTypePrivateCloudExpandableSection.exists).ok()
    .expect(await extractInnerText(hostingTypePrivateCloudExpandableSection)).eql('Private cloud')
    .expect(hostingTypePrivateCloudExpandableSection.find('details[open]').exists).notOk()
    .click(hostingTypePrivateCloudExpandableSection.find('summary'))
    .expect(hostingTypePrivateCloudExpandableSection.find('details[open]').exists).ok()

    .expect(await extractInnerText(summaryRow.find('h4'))).eql('Summary')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-summary"]'))).eql('Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-link"]'))).eql('www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting')
    .expect(summaryRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok()

    .expect(await extractInnerText(hostingModelRow.find('h4'))).eql('Data center hosting model')
    .expect(await extractInnerText(hostingModelRow.find('div[data-test-id="view-section-table-row-component"]'))).eql('Our managed data center is hosted in two separate geographical locations, they both comply to the highest standards to ensure that even if one of our data centers suffers an outage, we can ensure that your daily activities are not interrupted. We also create a back up of all of our data every evening and store it separately, so in the result of any catastrophic failure, we can ensure that patient confidential information is kept secure.')
    .expect(hostingModelRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok()

    .expect(await extractInnerText(requiresHSCNRow.find('div[data-test-id="view-section-table-row-component"]'))).eql('This Solution requires a HSCN/N3 connection')
    .expect(requiresHSCNRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok();
});

test('Hosting type - hybrid section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypeHybridExpandableSection = Selector('[data-test-id="view-section-hosting-type-hybrid"]');
  const hostingTypeHybridExpandableSectionTable = Selector('[data-test-id="view-section-hosting-type-hybrid"]');
  const summaryRow = hostingTypeHybridExpandableSectionTable.find('[data-test-id="view-section-table-row-summary"]');
  const hostingModelRow = hostingTypeHybridExpandableSectionTable.find('[data-test-id="view-section-table-row-hosting-model"]');
  const requiresHSCNRow = hostingTypeHybridExpandableSectionTable.find('[data-test-id="view-section-table-row-requires-hscn"]');

  await t
    .expect(hostingTypesSection.exists).ok()
    .expect(await extractInnerText(hostingTypesSection.find('h3'))).eql('Hosting type')

    .expect(hostingTypeHybridExpandableSection.exists).ok()
    .expect(await extractInnerText(hostingTypeHybridExpandableSection)).eql('Hybrid')
    .expect(hostingTypeHybridExpandableSection.find('details[open]').exists).notOk()
    .click(hostingTypeHybridExpandableSection.find('summary'))
    .expect(hostingTypeHybridExpandableSection.find('details[open]').exists).ok()

    .expect(await extractInnerText(summaryRow.find('h4'))).eql('Summary')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-summary"]'))).eql('Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-link"]'))).eql('www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting')
    .expect(summaryRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok()

    .expect(await extractInnerText(hostingModelRow.find('h4'))).eql('Data center hosting model')
    .expect(await extractInnerText(hostingModelRow.find('div[data-test-id="view-section-table-row-component"]'))).eql('Our managed data center is hosted in two separate geographical locations, they both comply to the highest standards to ensure that even if one of our data centers suffers an outage, we can ensure that your daily activities are not interrupted. We also create a back up of all of our data every evening and store it separately, so in the result of any catastrophic failure, we can ensure that patient confidential information is kept secure.')
    .expect(hostingModelRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok()

    .expect(await extractInnerText(requiresHSCNRow.find('div[data-test-id="view-section-table-row-component"]'))).eql('This Solution requires a HSCN/N3 connection')
    .expect(requiresHSCNRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok();
});

test('Hosting type - on premise section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypeOnPremiseExpandableSection = Selector('[data-test-id="view-section-hosting-type-on-premise"]');
  const hostingTypeOnPremiseExpandableSectionTable = Selector('[data-test-id="view-section-hosting-type-on-premise"]');
  const summaryRow = hostingTypeOnPremiseExpandableSectionTable.find('[data-test-id="view-section-table-row-summary"]');
  const hostingModelRow = hostingTypeOnPremiseExpandableSectionTable.find('[data-test-id="view-section-table-row-hosting-model"]');
  const requiresHSCNRow = hostingTypeOnPremiseExpandableSectionTable.find('[data-test-id="view-section-table-row-requires-hscn"]');

  await t
    .expect(hostingTypesSection.exists).ok()
    .expect(await extractInnerText(hostingTypesSection.find('h3'))).eql('Hosting type')

    .expect(hostingTypeOnPremiseExpandableSection.exists).ok()
    .expect(await extractInnerText(hostingTypeOnPremiseExpandableSection)).eql('On premise')
    .expect(hostingTypeOnPremiseExpandableSection.find('details[open]').exists).notOk()
    .click(hostingTypeOnPremiseExpandableSection.find('summary'))
    .expect(hostingTypeOnPremiseExpandableSection.find('details[open]').exists).ok()

    .expect(await extractInnerText(summaryRow.find('h4'))).eql('Summary')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-summary"]'))).eql('Our solution uses a combination of private and public cloud suppliers. We store all of our patient confidential data in a data center that we own and manage. We leverage the power of [Public cloud provider] to run our analytical suite and only transfer anonymised or pseudonymised to that provider to support this.')
    .expect(await extractInnerText(summaryRow.find('div[data-test-id="view-question-data-text-link"]'))).eql('www.healthcare-pro.co.uk/healthcare-system-1/hybrid-hosting')
    .expect(summaryRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok()

    .expect(await extractInnerText(hostingModelRow.find('h4'))).eql('Data center hosting model')
    .expect(await extractInnerText(hostingModelRow.find('div[data-test-id="view-section-table-row-component"]'))).eql('Our managed data center is hosted in two separate geographical locations, they both comply to the highest standards to ensure that even if one of our data centers suffers an outage, we can ensure that your daily activities are not interrupted. We also create a back up of all of our data every evening and store it separately, so in the result of any catastrophic failure, we can ensure that patient confidential information is kept secure.')
    .expect(hostingModelRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok()

    .expect(await extractInnerText(requiresHSCNRow.find('div[data-test-id="view-section-table-row-component"]'))).eql('This Solution requires a HSCN/N3 connection')
    .expect(requiresHSCNRow.find('div[data-test-id="view-section-table-row-vertical"]').exists).ok();
});

test('About supplier section and all questions should be rendered', async (t) => {
  await pageSetup(t, true);

  const aboutSupplierSection = Selector('[data-test-id="view-about-supplier"]');
  const descriptionQuestion = aboutSupplierSection.find('[data-test-id="view-section-question-description"]');
  const linkQuestion = aboutSupplierSection.find('[data-test-id="view-section-question-link"]');

  await t
    .expect(aboutSupplierSection.exists).ok()
    .expect(await extractInnerText(aboutSupplierSection.find('h3'))).eql('About supplier')

    .expect(descriptionQuestion.exists).ok()
    .expect(descriptionQuestion.find('[data-test-id="view-question-title"]').exists).notOk()
    .expect(await extractInnerText(descriptionQuestion.find('[data-test-id="view-question-data-text-description"]'))).eql('The supplier description data')

    .expect(linkQuestion.exists).ok()
    .expect(linkQuestion.find('[data-test-id="view-question-title"]').exists).notOk()
    .expect(await extractInnerText(linkQuestion.find('[data-test-id="view-question-data-link"]'))).eql('http://www.supplier.com');
});

test('Contact-details section should be rendered', async (t) => {
  await pageSetup(t, true);

  const contactDetailsSection = Selector('[data-test-id="view-solution-contact-details"]');
  const contact1Details = contactDetailsSection.find('[data-test-id="view-section-question-contact-1"]');
  const contact1DepartmentName = contact1Details.find('[data-test-id="view-question-data-text-department-name"]');
  const contact1ContactName = contact1Details.find('[data-test-id="view-question-data-text-contact-name"]');
  const contact1PhoneNumber = contact1Details.find('[data-test-id="view-question-data-text-phone-number"]');
  const contact1EmailAddress = contact1Details.find('[data-test-id="view-question-data-text-email-address"]');

  const contact2Details = contactDetailsSection.find('[data-test-id="view-section-question-contact-2"]');
  const contact2DepartmentName = contact2Details.find('[data-test-id="view-question-data-text-department-name"]');
  const contact2ContactName = contact2Details.find('[data-test-id="view-question-data-text-contact-name"]');
  const contact2PhoneNumber = contact2Details.find('[data-test-id="view-question-data-text-phone-number"]');
  const contact2EmailAddress = contact2Details.find('[data-test-id="view-question-data-text-email-address"]');

  await t
    .expect(contactDetailsSection.exists).ok()
    .expect(await extractInnerText(contactDetailsSection.find('h3'))).eql('Contact details')

    .expect(contact1Details.exists).ok()
    .expect(await extractInnerText(contact1DepartmentName)).eql('One Department')
    .expect(await extractInnerText(contact1ContactName)).eql('Contact One')
    .expect(await extractInnerText(contact1PhoneNumber)).eql('111111111')
    .expect(await extractInnerText(contact1EmailAddress)).eql('contact@one.com')

    .expect(contact2Details.exists).ok()
    .expect(await extractInnerText(contact2DepartmentName)).eql('Two Department')
    .expect(await extractInnerText(contact2ContactName)).eql('Contact Two')
    .expect(await extractInnerText(contact2PhoneNumber)).eql('222222222')
    .expect(await extractInnerText(contact2EmailAddress)).eql('contact@two.com');
});

test('Roadmap section should be rendered', async (t) => {
  await pageSetup(t, true);

  const roadmapSection = Selector('[data-test-id="view-roadmap"]');
  const summaryQuestion = roadmapSection.find('[data-test-id="view-section-question-summary"]');
  const documentLink = roadmapSection.find('[data-test-id="view-section-question-document-link"]');

  await t
    .expect(roadmapSection.exists).ok()
    .expect(await extractInnerText(roadmapSection.find('h3'))).eql('Roadmap')

    .expect(summaryQuestion.exists).ok()
    .expect(await extractInnerText(summaryQuestion.find('[data-test-id="view-question-data-text-summary"]'))).eql('The roadmap summary details')

    .expect(documentLink.exists).ok()
    .expect(await extractInnerText(documentLink.find('[data-test-id="view-question-data-link-document-link"]'))).eql('View roadmap')
    .expect(documentLink.find('[data-test-id="view-question-data-link-document-link"] > a').getAttribute('href')).eql(`${publicSolutionWithData.id}/document/roadmap.pdf`);
});

test('Learn More section should be rendered', async (t) => {
  await pageSetup(t, true);

  const learnMoreSection = Selector('[data-test-id="view-learn-more"]');
  const documentLink = learnMoreSection.find('[data-test-id="view-section-question-document-link"] a');

  await t
    .expect(learnMoreSection.exists).ok()
    .expect(await extractInnerText(learnMoreSection.find('h3'))).eql('Learn more')

    .expect(documentLink.exists).ok()
    .expect(await extractInnerText(documentLink)).eql('Download PDF')
    .expect(documentLink.getAttribute('href')).eql(`${publicSolutionWithData.id}/document/solution.pdf`);
});
