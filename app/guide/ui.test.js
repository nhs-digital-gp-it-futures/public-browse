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

test('should catalogue solution header', async (t) => {
  pageSetup(t);
  const subText = Selector('[data-test-id="guide-section-title"]');
  await t
    .expect(subText.nth(0).innerText).eql(content.sections[0].title);
});

test('should catalogue solution description', async (t) => {
  pageSetup(t);
  const subText = Selector('[data-test-id="guide-section-description"]');
  await t
    .expect(subText.nth(0).innerText).eql(content.sections[0].description);
});

test('should catalogue solution description', async (t) => {
  pageSetup(t);
  const subText = Selector('[data-test-id="guide-section-description"]');
  await t
    .expect(subText.nth(0).innerText).eql(content.sections[0].description);
});

test('should catalogue solution subsection 1 title', async (t) => {
  pageSetup(t);
  const subText = Selector('[data-test-id="subsection-title"]');
  await t
    .expect(subText.nth(0).innerText).eql(content.sections[0].contents[0].title);
});
