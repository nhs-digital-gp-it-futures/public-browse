import nock from 'nock';
import { Selector, ClientFunction } from 'testcafe';
import { extractInnerText } from '../../../../test-utils/helper';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/solutions/covid19');
};

fixture('Show Covid19 Solution List Page')
  .afterEach(async (t) => {
    const isDone = nock.isDone();
    if (!isDone) {
      nock.cleanAll();
    }

    await t.expect(isDone).ok('Not all nock interceptors were used!');
  });

test('should display the page title', async (t) => {
  await pageSetup(t);
  const pageTitle = Selector('h1[data-test-id="general-page-title"]');
  await t
    .expect(pageTitle.exists).ok()
    .expect(await extractInnerText(pageTitle)).eql('Catalogue Solutions to help with coronavirus');
});

test('should display the page description', async (t) => {
  await pageSetup(t);
  const pageDescription = Selector('h2[data-test-id="general-page-description"]');
  await t
    .expect(pageDescription.exists).ok()
    .expect(await extractInnerText(pageDescription)).eql('The following Catalogue Solutions can help prevent the spread of coronavirus by providing online consultations, services and information.');
});

test('should display the covid19 solution cards', async (t) => {
  await pageSetup(t);
  await t
    .expect(Selector('div[data-test-id="solution-card-covid19"]').count).eql(4);
});

test('should display the covid19 solution details of a solution card', async (t) => {
  await pageSetup(t);
  const solutionCardsSection = Selector('div[data-test-id="solution-cards-covid19"]');
  await t
    .expect(solutionCardsSection.find('div[data-test-id="solution-card-covid19"]').count).eql(4);

  const solutionCard = solutionCardsSection.find('div[data-test-id="solution-card-covid19"]:nth-child(1)');
  const covid19Tag = solutionCard.find('div[data-test-id="solution-card-covid19-tag"]');
  await t
    .expect(covid19Tag.exists).ok()
    .expect(await extractInnerText(covid19Tag)).eql('Coronavirus')
    .expect(await extractInnerText(solutionCard.find('h4[data-test-id="solution-card-supplier"]'))).eql('iPLATO Healthcare Limited')
    .expect(await extractInnerText(solutionCard.find('h3'))).eql('Remote Consultation')
    .expect(await extractInnerText(solutionCard.find('p[data-test-id="solution-card-summary"]'))).eql('Remote Consultation is a solution integrated into the iPLATO platform and myGP® app that helps GP practices avoid unnecessary appointments and supports remote consultation via chat, video and voice. It allows practices to communicate with patients via video, audio and asynchronous messaging.');
});

test('should display the covid19 card title', async (t) => {
  await pageSetup(t);
  const covid19Title = Selector('[data-test-id="solution-card-covid19-title"]');
  await t
    .expect(covid19Title.exists).ok()
    .expect(await extractInnerText(covid19Title)).eql('How this Catalogue Solution can help with coronavirus');
});

test('should display the covid19 card list', async (t) => {
  await pageSetup(t);
  const solutionCard = Selector('div[data-test-id="solution-card-covid19"]:nth-child(1)');
  const covid19List = solutionCard.find('[data-test-id="solution-card-covid19-list"]');
  await t
    .expect(covid19List.exists).ok()
    .expect(covid19List.find('li').count).eql(3)
    .expect(await extractInnerText(covid19List.find('li:nth-child(1)'))).eql('supports online consultations')
    .expect(await extractInnerText(covid19List.find('li:nth-child(2)'))).eql('provides automated, clinically safe sign-posting to alternative pathways')
    .expect(await extractInnerText(covid19List.find('li:nth-child(3)'))).eql('provides local and national services to suitable patients');
});

test('should navigate to the covid19 solution view page when clicking on the title of the solution', async (t) => {
  await pageSetup(t);
  const getLocation = ClientFunction(() => document.location.href);
  const solutionCardTitleLink = Selector('div[data-test-id="solution-card-covid19"]:nth-child(1) a');
  await t
    .expect(solutionCardTitleLink.exists).ok()
    .click(solutionCardTitleLink)
    .expect(getLocation()).contains('/solutions/covid19/100000-001');
});
