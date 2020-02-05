import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import publicSolution from '../../test-utils/fixtures/publicSolution.json';
import aSolutionList from '../../test-utils/fixtures/aSolutionList.json';
import aFoundationSolutionList from '../../test-utils/fixtures/aFoundationSolutionList.json';
import { blobstoreHost } from '../../config';
import { extractInnerText } from '../../test-utils/helper';

const mocks = async (responseStatus, responseBody) => {
  await nock('http://localhost:8080')
    .get('/api/v1/Solutions/1234/Public')
    .reply(responseStatus, responseBody);
};

const pageSetup = async (t, filterType, responseStatus = 200, responseBody = publicSolution) => {
  await mocks(responseStatus, responseBody);
  await t.navigateTo(`http://localhost:1234/solutions/${filterType}/1234`);
};

const getLocation = ClientFunction(() => document.location.href);

fixture('Show View Solution Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display the view solutions page', async (t) => {
  await pageSetup(t, 'all');
  const soultionPage = Selector('div[data-test-id="view-solution-page"]');
  await t.expect(soultionPage.count).eql(1);
});

test('should display the back link', async (t) => {
  await pageSetup(t, 'all');
  const backLink = Selector('div[data-test-id="view-solution-page-back-link"]');
  await t.expect(backLink.exists).ok();
});

test('should navigate to /solutions/all when clicking on the back link from all solutions', async (t) => {
  await pageSetup(t, 'all');
  await nock('http://localhost:8080')
    .get('/api/v1/Solutions')
    .reply(200, aSolutionList);
  const backLink = Selector('div[data-test-id="view-solution-page-back-link"] a');
  await t
    .expect(backLink.getAttribute('href')).eql('./')
    .click(backLink);
  await t
    .expect(getLocation()).contains('/solutions/all');
});

test('should navigate to /solutions/foundation when clicking on the back link from a foundation solution', async (t) => {
  await pageSetup(t, 'foundation');
  await nock('http://localhost:8080')
    .get('/api/v1/Solutions/Foundation')
    .reply(200, aFoundationSolutionList);
  const backLink = Selector('div[data-test-id="view-solution-page-back-link"] a');
  await t
    .expect(backLink.getAttribute('href')).eql('./')
    .click(backLink);
  await t
    .expect(getLocation()).contains('/solutions/foundation');
});

test('should display the foundation solution tag', async (t) => {
  await pageSetup(t, 'all');
  const foundationTag = Selector('div[data-test-id="view-solution-foundation-tag"]');
  await t
    .expect(foundationTag.exists).ok()
    .expect(await extractInnerText(foundationTag)).eql('Foundation Solution Set');
});

test('should display the supplier name', async (t) => {
  await pageSetup(t, 'all');
  const orgName = Selector('h2[data-test-id="view-solution-page-supplier-name"]');
  await t
    .expect(orgName.exists).ok()
    .expect(await extractInnerText(orgName)).eql('Really Kool Corporation');
});

test('should display the solution name', async (t) => {
  await pageSetup(t, 'all');
  const solutionName = Selector('h1[data-test-id="view-solution-page-solution-name"]');
  await t
    .expect(solutionName.exists).ok()
    .expect(await extractInnerText(solutionName)).eql('Write on Time');
});

test('should display the solution id', async (t) => {
  await pageSetup(t, 'all');
  const solutionId = Selector('p[data-test-id="view-solution-page-solution-id"]');
  await t
    .expect(solutionId.exists).ok()
    .expect(await extractInnerText(solutionId)).eql('Solution ID: 1234');
});

test('should display the last updated', async (t) => {
  await pageSetup(t, 'all');
  const lastUpdated = Selector('div[data-test-id="view-solution-page-last-updated"]');
  await t
    .expect(lastUpdated.exists).ok()
    .expect(await extractInnerText(lastUpdated)).eql('Solution information last updated: 11 December 2019');
});

test('should display the solution description', async (t) => {
  await pageSetup(t, 'all');
  const solutionDescription = Selector('div[data-test-id="view-solution-description"]');
  const solutionDescriptionSummary = Selector('div[data-test-id="view-section-question-summary"]');
  const solutionDescriptionDescription = Selector('div[data-test-id="view-section-question-description"]');
  const solutionDescriptionLink = Selector('div[data-test-id="view-section-question-link"]');
  await t
    .expect(solutionDescription.exists).ok()
    .expect(await extractInnerText(solutionDescription.find('h3'))).eql('Solution description')
    .expect(await extractInnerText(solutionDescriptionSummary.find('h4'))).eql('Summary')
    .expect(await extractInnerText(solutionDescriptionSummary.find('div[data-test-id="view-question-data-text-summary"]'))).eql('Write on Time is a Citizen-facing Appointments Management system specifically designed to reduce the number of DNAs in your practice.')
    .expect(await extractInnerText(solutionDescriptionDescription.find('h4'))).eql('About the solution')
    .expect(await extractInnerText(solutionDescriptionDescription.find('div[data-test-id="view-question-data-text-description"]'))).eql('a description')
    .expect(await extractInnerText(solutionDescriptionLink)).eql('//www.link.com');
});

test('should have the correct href for the link in the solution description', async (t) => {
  await pageSetup(t, 'all');
  const solutionDescriptionLink = Selector('div[data-test-id="view-section-question-link"] a');
  await t
    .expect(solutionDescriptionLink.exists).ok()
    .expect(solutionDescriptionLink.getAttribute('href')).contains('//www.link.com');
});

test('should display the solution capabilities met', async (t) => {
  await pageSetup(t, 'all');
  const capabilitiesMet = Selector('div[data-test-id="view-solution-capabilities"]');
  await t
    .expect(capabilitiesMet.exists).ok()
    .expect(await extractInnerText(capabilitiesMet.find('h3'))).eql('Capabilities met')
    .expect(await extractInnerText(capabilitiesMet.find('li'))).eql('capability 1')
    .expect(await extractInnerText(capabilitiesMet.find('p'))).eql('This Catalogue Solution has demonstrated it meets the necessary requirements for the following Capabilities:')
    .expect(await extractInnerText(capabilitiesMet.find('li:nth-child(2)'))).eql('capability 2')
    .expect(await extractInnerText(capabilitiesMet.find('li:nth-child(3)'))).eql('capability 3');
});

test('should display the solution contact details', async (t) => {
  await pageSetup(t, 'all');
  const contactDetails = Selector('div[data-test-id="view-solution-contact-details"]');
  const contact1 = Selector('div[data-test-id="view-section-question-contact-1"]');
  const contact2 = Selector('div[data-test-id="view-section-question-contact-2"]');
  await t
    .expect(contactDetails.exists).ok()
    .expect(await extractInnerText(contactDetails.find('h3'))).eql('Contact details')
    .expect(await extractInnerText(contact1.find('div[data-test-id="view-question-data-text-department-name"]'))).eql('a contact dept')
    .expect(await extractInnerText(contact1.find('div[data-test-id="view-question-data-text-contact-name"]'))).eql('jim jones')
    .expect(await extractInnerText(contact1.find('div[data-test-id="view-question-data-text-phone-number"]'))).eql('0111 111111')
    .expect(await extractInnerText(contact1.find('div[data-test-id="view-question-data-text-email-address"]'))).eql('jim@solution.com')
    .expect(await extractInnerText(contact2.find('div[data-test-id="view-question-data-text-department-name"]'))).eql('a second contact dept')
    .expect(await extractInnerText(contact2.find('div[data-test-id="view-question-data-text-contact-name"]'))).eql('jacky johnston')
    .expect(await extractInnerText(contact2.find('div[data-test-id="view-question-data-text-phone-number"]'))).eql('0222 222222')
    .expect(await extractInnerText(contact2.find('div[data-test-id="view-question-data-text-email-address"]'))).eql('jacky@solution.com');
});

test('should display the download button', async (t) => {
  await pageSetup(t, 'all');
  const downloadButton = Selector('div[data-test-id="view-solution-page-download-info-button"]');
  await t
    .expect(downloadButton.exists).ok()
    .expect(await extractInnerText(downloadButton)).eql('Download this PDF')
    .expect(downloadButton.find('a').getAttribute('href')).contains(`${blobstoreHost}/$web/content/1234.pdf`);
});

test('should display learn more', async (t) => {
  await pageSetup(t, 'all');
  const contactDetails = Selector('div[data-test-id="learn-more"]');
  await t
    .expect(contactDetails.exists).ok()
    .expect(await extractInnerText(contactDetails.find('h3'))).eql('Learn more')
    .expect(await extractInnerText(contactDetails.find('p'))).eql('Find out more about this Catalogue Solution by downloading the full details.');
});

test('should render the error page when receiving an error from the solution public api endpoint', async (t) => {
  await pageSetup(t, 'all', 500, {});

  const errorTitle = Selector('[data-test-id="error-page-title"]');

  await t
    .expect(errorTitle.exists).ok();
});
