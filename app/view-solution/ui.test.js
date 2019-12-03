import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import publicSolution from './fixtures/publicSolution.json';
import aSolutionList from './fixtures/aSolutionList.json';
import aFoundationSolutionList from './fixtures/aFoundationSolutionList.json';

const mocks = (responseStatus, responseBody) => {
  nock('http://localhost:8080')
    .get('/api/v1/Solutions/1234/Public')
    .reply(responseStatus, responseBody);
};

const pageSetup = async (t, filterType, responseStatus = 200, responseBody = publicSolution) => {
  mocks(responseStatus, responseBody);
  await t.navigateTo(`http://localhost:1234/solutions/${filterType}/1234`);
};

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
  nock('http://localhost:8080')
    .get('/api/v1/Solutions')
    .reply(200, aSolutionList);
  const getLocation = ClientFunction(() => document.location.href);
  const backLink = Selector('div[data-test-id="view-solution-page-back-link"] a');
  await t
    .expect(backLink.getAttribute('href')).eql('./')
    .click(backLink);
  await t
    .expect(getLocation()).contains('/solutions/all');
});

test('should navigate to /solutions/foundation when clicking on the back link from a foundation solution', async (t) => {
  await pageSetup(t, 'foundation');
  nock('http://localhost:8080')
    .get('/api/v1/Solutions/Foundation')
    .reply(200, aFoundationSolutionList);
  const getLocation = ClientFunction(() => document.location.href);
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
    .expect(foundationTag.innerText).eql('Foundation Solution');
});

test('should display the organisation name', async (t) => {
  await pageSetup(t, 'all');
  const orgName = Selector('h2[data-test-id="view-solution-page-organisation-name"]');
  await t
    .expect(orgName.exists).ok()
    .expect(orgName.innerText).eql('Really Kool Corporation');
});

test('should display the solution name', async (t) => {
  await pageSetup(t, 'all');
  const solutionName = Selector('h1[data-test-id="view-solution-page-solution-name"]');
  await t
    .expect(solutionName.exists).ok()
    .expect(solutionName.innerText).eql('Write on Time');
});

test('should display the solution id', async (t) => {
  await pageSetup(t, 'all');
  const solutionId = Selector('h4[data-test-id="view-solution-page-solution-id"]');
  await t
    .expect(solutionId.exists).ok()
    .expect(solutionId.innerText).eql('Solution ID: 1234');
});

test('should display the last updated', async (t) => {
  await pageSetup(t, 'all');
  const lastUpdated = Selector('div[data-test-id="view-solution-page-last-updated"]');
  await t
    .expect(lastUpdated.exists).ok()
    .expect(lastUpdated.innerText).eql('Page last updated: a date');
});

test('should display the solution description', async (t) => {
  await pageSetup(t, 'all');
  const solutionDescription = Selector('div[data-test-id="view-solution-description"]');
  const solutionDescriptionSummary = Selector('div[data-test-id="view-section-question-summary"]');
  const solutionDescriptionDescription = Selector('div[data-test-id="view-section-question-description"]');
  const solutionDescriptionLink = Selector('div[data-test-id="view-section-question-link"]');
  await t
    .expect(solutionDescription.exists).ok()
    .expect(solutionDescription.find('h3').innerText).eql('Solution description')
    .expect(solutionDescriptionSummary.find('div').innerText).eql('Summary')
    .expect(solutionDescriptionSummary.find('div[data-test-id="view-question-data-text-summary"]').innerText).eql('Write on Time is a Citizen-facing Appointments Management system specifically designed to reduce the number of DNAs in your practice.')
    .expect(solutionDescriptionDescription.find('div').innerText).eql('About the solution')
    .expect(solutionDescriptionDescription.find('div[data-test-id="view-question-data-text-description"]').innerText).eql('a description')
    .expect(solutionDescriptionLink.innerText).eql('link.com');
});

test('should navigate to the link address when clicking on the link in the solution description', async (t) => {
  await pageSetup(t, 'all');

  nock('http://localhost:8080')
    .get('/api/v1/Solutions/link.com/Public')
    .reply(200, {});

  const getLocation = ClientFunction(() => document.location.href);
  const solutionDescriptionLink = Selector('div[data-test-id="view-section-question-link"]');
  await t
    .click(solutionDescriptionLink)
    .expect(getLocation()).contains('link.com');
});

test('should display the solution capabilities met', async (t) => {
  await pageSetup(t, 'all');
  const capabilitiesMet = Selector('div[data-test-id="view-solution-capabilities"]');
  await t
    .expect(capabilitiesMet.exists).ok()
    .expect(capabilitiesMet.find('h3').innerText).eql('Capabilities met')
    .expect(capabilitiesMet.find('li').innerText).eql('capability 1')
    .expect(capabilitiesMet.find('li:nth-child(2)').innerText).eql('capability 2')
    .expect(capabilitiesMet.find('li:nth-child(3)').innerText).eql('capability 3');
});

test('should display the solution contact details', async (t) => {
  await pageSetup(t, 'all');
  const contactDetails = Selector('div[data-test-id="view-solution-contact-details"]');
  const contact1 = Selector('div[data-test-id="view-section-question-contact-1"]');
  const contact2 = Selector('div[data-test-id="view-section-question-contact-2"]');
  await t
    .expect(contactDetails.exists).ok()
    .expect(contactDetails.find('h3').innerText).eql('Contact details')
    .expect(contact1.find('div[data-test-id="view-question-data-text-department-name"]').innerText).eql('a contact dept')
    .expect(contact1.find('div[data-test-id="view-question-data-text-contact-name"]').innerText).eql('jim jones')
    .expect(contact1.find('div[data-test-id="view-question-data-text-phone-number"]').innerText).eql('0111 111111')
    .expect(contact1.find('div[data-test-id="view-question-data-text-email-address"]').innerText).eql('jim@solution.com')
    .expect(contact2.find('div[data-test-id="view-question-data-text-department-name"]').innerText).eql('a second contact dept')
    .expect(contact2.find('div[data-test-id="view-question-data-text-contact-name"]').innerText).eql('jacky johnston')
    .expect(contact2.find('div[data-test-id="view-question-data-text-phone-number"]').innerText).eql('0222 222222')
    .expect(contact2.find('div[data-test-id="view-question-data-text-email-address"]').innerText).eql('jacky@solution.com');
});

test('should display the download button', async (t) => {
  await pageSetup(t, 'all');
  const downloadButton = Selector('div[data-test-id="view-solution-page-download-info-button"]');
  await t.expect(downloadButton.exists).ok();
  await t.expect(downloadButton.innerText).eql('Download more information');
});

test('should navigate to the downloadSolutionUrl when clicking on the download more info button', async (t) => {
  await pageSetup(t, 'all');
  const downloadButton = Selector('div[data-test-id="view-solution-page-download-info-button"] a');
  await t
    .expect(downloadButton.getAttribute('href')).eql('https://gpitfuturesadev.blob.core.windows.net/$web/content/1234.pdf');
});

test('should render the error page when receiving an error from the solution public api endpoint', async (t) => {
  await pageSetup(t, 'all', 500, {});

  const errorTitle = Selector('[data-test-id="error-page-title"]');

  await t
    .expect(errorTitle.exists).ok();
});
