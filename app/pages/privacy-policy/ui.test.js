import { Selector } from 'testcafe';

const url = 'http://localhost:1234/privacy-policy';

const pageSetup = async ({ t }) => {
  await t.navigateTo(url);
};

fixture('Privacy policy').page(url);

test('should expand the list of cookies when clicking the CTA', async (t) => {
  await pageSetup({ t });

  const cookieTableWrap = Selector('[data-test-id="cookie-table"]');
  await t
    .expect(cookieTableWrap.exists)
    .ok()
    .expect(cookieTableWrap.find('details[open]').exists)
    .notOk()
    .click(cookieTableWrap.find('summary'))
    .expect(cookieTableWrap.find('details[open]').exists)
    .ok();
});
