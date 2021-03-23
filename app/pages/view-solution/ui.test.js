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

fixture('Show view solution page - with existing marketing data');

const mockSections = {
  'Integrations section should be rendered': '[data-test-id="view-integrations"]',
  'Implementation timescales section should be rendered': '[data-test-id="view-implementation-timescales"]',
  'Contact-details section should be rendered': '[data-test-id="view-solution-contact-details"]',
  'Roadmap section should be rendered': '[data-test-id="view-roadmap"]',
  'Learn More section should be rendered': '[data-test-id="view-learn-more"]',
  'Document link should be rendered': '[data-test-id="view-section-question-document-link"] a',
};

Object.keys(mockSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t, true);
    const element = Selector(mockSections[key]);
    await t
      .expect(element.exists)
      .ok();
  });
});

test('Capabilities section should be rendered and the capabilities displayed', async (t) => {
  await pageSetup(t, true);

  const capabilitiesSection = Selector('[data-test-id="view-capabilities"]');
  const capabilitiesExpandableSection = Selector('[data-test-id="view-section-capabilities"]');
  const epicsSection = capabilitiesSection.find('[data-test-id="view-question-epic"]');
  const mustEpics = epicsSection.find('[data-test-id="must-epics"]');
  const mayEpics = epicsSection.find('[data-test-id="may-epics"]');

  await t
    .expect(capabilitiesSection.exists)
    .ok()
    .expect(capabilitiesExpandableSection.find('details[open]').exists)
    .notOk()
    .click(capabilitiesExpandableSection.find('summary'))
    .expect(capabilitiesExpandableSection.find('details[open]').exists)
    .ok()

    .expect(epicsSection.exists)
    .ok()
    .expect(mustEpics.exists)
    .ok()
    .expect(mayEpics.exists)
    .ok();
});

test('Client application type - browser-based section should be rendered', async (t) => {
  await pageSetup(t, true);
  const clientApplicationTypesSection = Selector('[data-test-id="view-client-application-types"]');
  const browserBasedExpandableSection = Selector('[data-test-id="view-section-browser-based"]');

  await t
    .expect(clientApplicationTypesSection.exists)
    .ok()

    .expect(browserBasedExpandableSection.exists)
    .ok()
    .expect(browserBasedExpandableSection.find('details[open]').exists)
    .notOk()
    .click(browserBasedExpandableSection.find('summary'))
    .expect(browserBasedExpandableSection.find('details[open]').exists)
    .ok();
});

test('Client application type - native-mobile section should be rendered', async (t) => {
  await pageSetup(t, true);

  const clientApplicationTypesSection = Selector('[data-test-id="view-client-application-types"]');
  const nativeMobileExpandableSection = Selector('[data-test-id="view-section-native-mobile"]');

  await t
    .expect(clientApplicationTypesSection.exists)
    .ok()

    .expect(nativeMobileExpandableSection.exists)
    .ok()
    .expect(nativeMobileExpandableSection.find('details[open]').exists)
    .notOk()
    .click(nativeMobileExpandableSection.find('summary'))
    .expect(nativeMobileExpandableSection.find('details[open]').exists)
    .ok();
});

test('Client application type - native-desktop section should be rendered', async (t) => {
  await pageSetup(t, true);

  const clientApplicationTypesSection = Selector('[data-test-id="view-client-application-types"]');
  const nativeDesktopExpandableSection = Selector('[data-test-id="view-section-native-desktop"]');

  await t
    .expect(clientApplicationTypesSection.exists)
    .ok()

    .expect(nativeDesktopExpandableSection.exists)
    .ok()
    .expect(await extractInnerText(nativeDesktopExpandableSection))
    .eql('Native desktop application')
    .expect(nativeDesktopExpandableSection.find('details[open]').exists)
    .notOk()
    .click(nativeDesktopExpandableSection.find('summary'))
    .expect(nativeDesktopExpandableSection.find('details[open]').exists)
    .ok();
});

test('Hosting type - public cloud section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypePublicCloudExpandableSection = Selector('[data-test-id="view-section-hosting-type-public-cloud"]');

  await t
    .expect(hostingTypesSection.exists)
    .ok()

    .expect(hostingTypePublicCloudExpandableSection.exists)
    .ok()
    .expect(hostingTypePublicCloudExpandableSection.find('details[open]').exists)
    .notOk()
    .click(hostingTypePublicCloudExpandableSection.find('summary'))
    .expect(hostingTypePublicCloudExpandableSection.find('details[open]').exists)
    .ok();
});

test('Hosting type - private cloud section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypePrivateCloudExpandableSection = Selector('[data-test-id="view-section-hosting-type-private-cloud"]');

  await t
    .expect(hostingTypesSection.exists)
    .ok()

    .expect(hostingTypePrivateCloudExpandableSection.exists)
    .ok()
    .expect(hostingTypePrivateCloudExpandableSection.find('details[open]').exists)
    .notOk()
    .click(hostingTypePrivateCloudExpandableSection.find('summary'))
    .expect(hostingTypePrivateCloudExpandableSection.find('details[open]').exists)
    .ok();
});

test('Hosting type - hybrid section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypeHybridExpandableSection = Selector('[data-test-id="view-section-hosting-type-hybrid"]');

  await t
    .expect(hostingTypesSection.exists)
    .ok()

    .expect(hostingTypeHybridExpandableSection.exists)
    .ok()
    .expect(hostingTypeHybridExpandableSection.find('details[open]').exists)
    .notOk()
    .click(hostingTypeHybridExpandableSection.find('summary'))
    .expect(hostingTypeHybridExpandableSection.find('details[open]').exists)
    .ok();
});

test('Hosting type - on premise section should be rendered', async (t) => {
  await pageSetup(t, true);

  const hostingTypesSection = Selector('[data-test-id="view-hosting-types"]');
  const hostingTypeOnPremiseExpandableSection = Selector('[data-test-id="view-section-hosting-type-on-premise"]');

  await t
    .expect(hostingTypesSection.exists)
    .ok()

    .expect(hostingTypeOnPremiseExpandableSection.exists)
    .ok()
    .expect(hostingTypeOnPremiseExpandableSection.find('details[open]').exists)
    .notOk()
    .click(hostingTypeOnPremiseExpandableSection.find('summary'))
    .expect(hostingTypeOnPremiseExpandableSection.find('details[open]').exists)
    .ok();
});

test('About supplier section and all questions should be rendered', async (t) => {
  await pageSetup(t, true);

  const aboutSupplierSection = Selector('[data-test-id="view-about-supplier"]');
  const descriptionQuestion = aboutSupplierSection.find('[data-test-id="view-section-question-description"]');
  const linkQuestion = aboutSupplierSection.find('[data-test-id="view-section-question-link"]');

  await t
    .expect(aboutSupplierSection.exists)
    .ok()

    .expect(descriptionQuestion.exists)
    .ok()
    .expect(descriptionQuestion.find('[data-test-id="view-question-title"]').exists)
    .notOk()

    .expect(linkQuestion.exists)
    .ok()
    .expect(linkQuestion.find('[data-test-id="view-question-title"]').exists)
    .notOk();
});

fixture('Show view solution page - heading components');

test('should navigate back to the previous page when backlink is clicked', async (t) => {
  await pageSetup(t);
  await nock('http://localhost:5100')
    .get('/api/v1/Solutions/Foundation')
    .reply(200, aFoundationSolutionList);
  const backLink = Selector('[data-test-id="view-solution-page-back-link"] a');

  await t
    .expect(backLink.exists)
    .ok()
    .click(backLink)
    .expect(getLocation())
    .contains('/solutions');
});

const defaultSections = {
  'should render foundation tag': '[data-test-id="view-solution-foundation"]',
  'should render solution name': '[data-test-id="view-solution-page-solution-name"]',
  'should render supplier name': '[data-test-id="view-solution-page-supplier-name"]',
  'should render solution id': '[data-test-id="view-solution-page-solution-id"]',
  'should render last updated date': '[data-test-id="view-solution-page-last-updated"]',
};

Object.keys(defaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(defaultSections[key]);
    await t
      .expect(element.exists).ok();
  });
});

fixture('Show view solution page - no existing marketing data');

const nonDefaultSections = {
  'Solution description section should not be rendered': '[data-test-id="view-solution-description"]',
  'Features section should not be rendered': '[data-test-id="view-features"]',
  'Capabilities section should not be rendered': '[data-test-id="view-capabilities"]',
  'Integrations section should not be rendered': '[data-test-id="view-integrations"]',
  'Implementation timescales section should not be rendered': '[data-test-id="view-implementation-timescales"]',
  'Client-application-types section should not be rendered': '[data-test-id="view-client-application-types"]',
  'Hosting type - sections should not be rendered': '[data-test-id="view-hosting-types"]',
  'About supplier section should not be rendered': '[data-test-id="view-about-supplier"]',
  'Contact-details section should not be rendered': '[data-test-id="view-solution-contact-details"]',
  'Roadmap section should not be rendered': '[data-test-id="view-roadmap"]',
  'Learn More section should not be rendered': '[data-test-id="view-learn-more"]',
};

Object.keys(nonDefaultSections).forEach((key) => {
  test(key, async (t) => {
    await pageSetup(t);
    const element = Selector(nonDefaultSections[key]);
    await t
      .expect(element.exists).notOk();
  });
});
