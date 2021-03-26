import content from './manifest.json';
import { componentTester } from '../../test-utils/componentTester';

const setup = {
  template: {
    path: 'pages/dfocvc/template.njk',
  },
};

describe('guide', () => {
  it('should render a backLink to the home page', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const goBacklLink = $('[data-test-id="go-back-link"]');
      expect(goBacklLink.length).toEqual(1);
      expect(goBacklLink.text().trim()).toEqual('Go back');
      expect($(goBacklLink).find('a').attr('href')).toEqual('./');
    });
  }));

  it('should render the dfocvc title, description', componentTester(setup, (harness) => {
    const context = content;

    harness.request(context, ($) => {
      const title = $('[data-test-id="dfocvc-page-title"]');
      const description = $('[data-test-id="dfocvc-page-description"]');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual(content.title);
      expect(description.length).toEqual(1);
      expect(description.text().trim()).toEqual(content.description);
    });
  }));
});
