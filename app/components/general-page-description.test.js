import { createTestHarness } from '../test-utils/testHarness';

const setup = {
  component: {
    name: 'generalPageDescription',
    path: 'components/general-page-description.njk',
  },
};

describe('general-page-description', () => {
  it('should render the title if provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        titleText: 'a title',
      },
    };

    harness.request(context, ($) => {
      const title = $('[data-test-id="general-page-title"]');
      expect(title.length).toEqual(1);
      expect(title.text().trim()).toEqual('a title');
    });
  }));

  it('should not render the title if not provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {},
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="general-page-title"]').length).toEqual(0);
    });
  }));

  it('should render the description if provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        descriptionText: ['a description'],
      },
    };

    harness.request(context, ($) => {
      const description = $('[data-test-id="general-page-description"]');
      expect(description.text().trim()).toEqual('a description');
      expect(description.length).toEqual(1);
    });
  }));

  it('should render a div for each string in the description array', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        descriptionText: ['a description', 'can be', 'separated out'],
      },
    };

    harness.request(context, ($) => {
      const description = $('[data-test-id="general-page-description"]');
      expect(description.find('div').length).toEqual(3);
      expect(description.find('div:nth-child(1)').text().trim()).toEqual('a description');
      expect(description.find('div:nth-child(2)').text().trim()).toEqual('can be');
      expect(description.find('div:nth-child(3)').text().trim()).toEqual('separated out');
    });
  }));

  it('should not render the description if not provided', createTestHarness(setup, (harness) => {
    const context = {
      params: {},
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="general-page-description"]').length).toEqual(0);
    });
  }));
});
