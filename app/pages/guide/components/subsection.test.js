import { componentTester } from '../../../test-utils/componentTester';

const context = {
  params: {
    subSection: {
      id: '1',
      title: 'Additional Services',
      description: [
        'Description sentence 1.',
        'Description sentence 2.',
        'Description sentence 3.',
      ],
      bulletlist: [
        'bullet 1',
        'bullet 2',
        'bullet 3',
      ],
      button: {
        text: 'Download Buyer’s Guide PDF',
        href: '/path-to-blob',
      },
    },
    blobstoreHost: 'www.someblobstore.com',
  },
};

const setup = {
  component: {
    name: 'subsection',
    path: 'pages/guide/components/subsection.njk',
  },
};

describe('subsection', () => {
  it('should render a title if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="subsection-title-1"]').text().trim()).toEqual(context.params.subSection.title);
    });
  }));

  it('should not render a title if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.subSection.title;
    harness.request(newContext, ($) => {
      expect($('[data-test-id="subsection-title"]').length).toEqual(0);
    });
  }));

  it('should render a description if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      const description = $('[data-test-id="subsection-1"]');
      context.params.subSection.description.forEach((descriptionText, i) => {
        expect(description.find(`p:nth-child(${i + 1})`).text().trim()).toEqual(descriptionText);
      });
    });
  }));

  it('should render a link within description if provided', componentTester(setup, (harness) => {
    const testCaseContext = {
      params: {
        subSection: {
          id: '1',
          title: 'Additional Services',
          description: [
            {
              startText: 'You can learn more about the Capability Model',
              linkText: '[link]',
              href: 'https://www.nhs.uk/',
              endText: '',
            },
          ],
        },
      },
    };

    harness.request(testCaseContext, ($) => {
      const description = $('[data-test-id="subsection-1"]');
      const startText = description.find('span:nth-child(1)');
      const endText = description.find('span:nth-child(3)');
      const link = description.find('a');

      expect(endText.text().trim())
        .toEqual(testCaseContext.params.subSection.description[0].endText.trim());
      expect(startText.text().trim())
        .toEqual(testCaseContext.params.subSection.description[0].startText.trim());
      expect(link.text().trim())
        .toEqual(testCaseContext.params.subSection.description[0].linkText.trim());
      expect(link.attr('href'))
        .toEqual(testCaseContext.params.subSection.description[0].href.trim());
    });
  }));

  it('should not render a description if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.subSection.description;

    harness.request(newContext, ($) => {
      expect($('[data-test-id="subsection-description"]').length).toEqual(0);
    });
  }));

  it('should render a bulletlist if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      const bulletList = $('ul[data-test-id="subsection-bulletlist"]');
      context.params.subSection.bulletlist.map((bulletListText, i) => {
        expect(bulletList.find(`li:nth-child(${i + 1})`).text().trim()).toEqual(bulletListText);
      });
    });
  }));

  it('should not render a bulletlist if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.subSection.bulletlist;

    harness.request(newContext, ($) => {
      expect($('[data-test-id="subsection-bulletlist"]').length).toEqual(0);
    });
  }));


  it('should render a button if provided', componentTester(setup, (harness) => {
    harness.request(context, ($) => {
      expect($('[data-test-id="subsection-button"]').text().trim()).toEqual(context.params.subSection.button.text);
      expect($('[data-test-id="subsection-button"] a').attr('href')).toEqual('www.someblobstore.com/path-to-blob');
    });
  }));

  it('should not render a button if not provided', componentTester(setup, (harness) => {
    const newContext = { ...context };
    delete newContext.params.subSection.button;
    harness.request(newContext, ($) => {
      expect($('[data-test-id="subsection-button"]').length).toEqual(0);
    });
  }));
});
