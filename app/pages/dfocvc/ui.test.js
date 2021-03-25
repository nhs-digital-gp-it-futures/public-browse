import { extractInnerText } from 'buying-catalogue-library';
import { Selector } from 'testcafe';
import content from './manifest.json';

const pageSetup = async (t) => {
  await t.navigateTo('http://localhost:1234/solutions/dfocvc');
};

fixture('Show DFOCVC Page');

test('should render the title', async (t) => {
  await pageSetup(t);
  const title = Selector('[data-test-id="dfocvc-page-title"]');
  await t
    .expect(title.count).eql(1)
    .expect(await extractInnerText(title)).eql(content.title);
});

test('should render the description', async (t) => {
  await pageSetup(t);
  const description = Selector('[data-test-id="dfocvc-page-description"]');
  await t
    .expect(description.count).eql(1)
    .expect(await extractInnerText(description)).eql(content.description);
});
