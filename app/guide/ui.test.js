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
  const subText = Selector('[data-test-id="guide-section-catalogue-solution"]');
  await t
    .expect(subText.find('[data-test-id="guide-section-title"]').innerText).eql(content.sections[0].title)
    .expect(subText.find('[data-test-id="subsection-title-associated-services"]').innerText).eql(content.sections[0].subsections[1].title)
    .expect(subText.find('[data-test-id="subsection-associated-services"]').innerText).eql(content.sections[0].subsections[1].description[0])
    .expect(subText.find('[data-test-id="subsection-title-additional-services"]').innerText).eql(content.sections[0].subsections[2].title)
    .expect(subText.find('[data-test-id="subsection-additional-services"] > div:nth-child(1)').innerText).eql(content.sections[0].subsections[2].description[0])
    .expect(subText.find('[data-test-id="subsection-additional-services"] > div:nth-child(2)').innerText).eql(content.sections[0].subsections[2].description[1])
    .expect(subText.find('[data-test-id="subsection-additional-services"] > div:nth-child(3)').innerText).eql(content.sections[0].subsections[2].description[2])
  });

test('should render Capabilities subsections', async (t) => {
  pageSetup(t);
  const subText = Selector('[data-test-id="guide-section-capabilities"]');
  await t
    .expect(subText.find('[data-test-id="guide-section-title"]').innerText).eql(content.sections[1].title)
    .expect(subText.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(1)').innerText).eql(content.sections[1].subsections[0].description[0])
    .expect(subText.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(2)').innerText).eql(content.sections[1].subsections[0].description[1])
    .expect(subText.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(3)').innerText).eql(content.sections[1].subsections[0].description[2])
    .expect(subText.find('[data-test-id="subsection-capabilities-description"] > div:nth-child(3)').innerText).eql(content.sections[1].subsections[0].description[2])
    .expect(subText.find('[data-test-id="guide-section-description-with-link"] > a').innerText).eql(content.sections[1].subsections[1].description[0].linkText)
    .expect(subText.find('[data-test-id="subsection-title-epics"]').innerText).eql(content.sections[1].subsections[2].title)
    .expect(subText.find('[data-test-id="subsection-epics"] > div:nth-child(1)').innerText).eql(content.sections[1].subsections[2].description[0])
    .expect(subText.find('[data-test-id="subsection-epics"] > div:nth-child(2)').innerText).eql(content.sections[1].subsections[2].description[1])
    .expect(subText.find('[data-test-id="subsection-epics"] > div:nth-child(3)').innerText).eql(content.sections[1].subsections[2].description[2])
    .expect(subText.find('[data-test-id="subsection-title-foundation-solution-set"]').innerText).eql(content.sections[1].subsections[3].title)
    .expect(subText.find('[data-test-id="subsection-foundation-solution-set"] > div:nth-child(1)').innerText).eql(content.sections[1].subsections[3].description[0])
    .expect(subText.find('[data-test-id="subsection-they-are"] > div:nth-child(1)').innerText).eql(content.sections[1].subsections[4].description[0])
    .expect(subText.find('[data-test-id="subsection-bullet-list"] > li:nth-child(1)').innerText).eql(content.sections[1].subsections[5].bulletlist[0])
    .expect(subText.find('[data-test-id="subsection-bullet-list"] > li:nth-child(2)').innerText).eql(content.sections[1].subsections[5].bulletlist[1])
    .expect(subText.find('[data-test-id="subsection-bullet-list"] > li:nth-child(3)').innerText).eql(content.sections[1].subsections[5].bulletlist[2])
    .expect(subText.find('[data-test-id="subsection-bullet-list"] > li:nth-child(4)').innerText).eql(content.sections[1].subsections[5].bulletlist[3])
    .expect(subText.find('[data-test-id="subsection-bullet-list"] > li:nth-child(5)').innerText).eql(content.sections[1].subsections[5].bulletlist[4])
    .expect(subText.find('[data-test-id="subsection-bullet-list"] > li:nth-child(6)').innerText).eql(content.sections[1].subsections[5].bulletlist[5])
    .expect(subText.find('[data-test-id="subsection-view-only-catalogue-solutions"] > div:nth-child(1)').innerText).eql(content.sections[1].subsections[5].description[0])
  });

