import { componentTester } from '../test-utils/componentTester';

const setup = {
  component: {
    name: 'generalPageDescription',
    path: 'components/general-page-description.njk',
  },
};

describe('general-page-description', () => {
  it('should render the title if provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        titleText: 'a title',
      },
    };

    harness.request(context, ($) => {
      const title = $('[data-test-id="general-description"] h1');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual('a title');
    });
  }));

  it('should not render the title if not provided', componentTester(setup, (harness) => {
    const context = {
      params: {},
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="general-description"] h1').length).toEqual(0);
    });
  }));

  it('should render the description if provided', componentTester(setup, (harness) => {
    const context = {
      params: {
        descriptionText: 'a description',
      },
    };

    harness.request(context, ($) => {
      const description = $('[data-test-id="general-description"] h2');
      expect(description.length).toEqual(1);
      expect(description.text().trim()).toEqual('a description');
    });
  }));

  it('should not render the description if not provided', componentTester(setup, (harness) => {
    const context = {
      params: {},
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="general-description"] h2').length).toEqual(0);
    });
  }));
});
