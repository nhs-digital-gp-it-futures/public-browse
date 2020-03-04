import { createTestHarness } from '../../../test-utils/testHarness';

const setup = {
  component: {
    name: 'solutionCardSection',
    path: 'pages/solutions-list/components/solution-card-section.njk',
  },
};

describe('solution-card', () => {
  it('should render the title of the section', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          id: 'simple-section',
          name: 'Simple Section',
          value: 'This is the simple section',
          showTitle: true,
        },
      },
    };

    harness.request(context, ($) => {
      expect($('label .nhsuk-label--s').text().trim()).toEqual('Simple Section');
    });
  }));

  it('should not render the title of the section if the showTitle flag is false', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          id: 'simple-section',
          name: 'Simple Section',
          value: 'This is the simple section',
          showTitle: false,
        },
      },
    };

    harness.request(context, ($) => {
      expect($('label .nhsuk-label--s').length).toEqual(0);
    });
  }));

  it('should render the title of the section as an anchor', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          id: 'simple-section',
          name: 'Simple Section',
          value: 'This is the simple section',
          showTitle: true,
        },
        showAnchor: true,
      },
    };

    harness.request(context, ($) => {
      expect($('a').attr('name')).toEqual('simple-section');
    });
  }));

  it('should not render the title of the section as an anchor if showAnchor is false', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          id: 'simple-section',
          name: 'Simple Section',
          value: 'This is the simple section',
          showTitle: true,
        },
      },
    };

    harness.request(context, ($) => {
      expect($('a').length).toEqual(0);
    });
  }));

  it('should render the value of the section', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          id: 'simple-section',
          name: 'Simple Section',
          value: 'This is the simple section',
          showTitle: true,
        },
      },
    };

    harness.request(context, ($) => {
      expect($('p').text().trim()).toEqual('This is the simple section');
      expect($('[data-test-id="simple-section-value"]').length).toEqual(1);
    });
  }));

  it('should render all the values of the section when it is an array', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          id: 'list-section',
          name: 'List Section',
          value: [
            'value 1',
            'value 2',
            'value 3',
          ],
          showTitle: true,
        },
      },
    };

    harness.request(context, ($) => {
      const sectionValues = $('[data-test-id="list-section-value"]');

      expect(sectionValues.length).toEqual(3);
      sectionValues.each((index, sectionValue) => {
        expect($(sectionValue).text()).toEqual(`- ${context.params.section.value[index]}`);
      });
    });
  }));

  it('should render the values in columns if the displayType of the section is config', createTestHarness(setup, (harness) => {
    const context = {
      params: {
        section: {
          id: 'column-section',
          name: 'Column Section',
          value: {
            column1: ['Capability A', 'Capability B'],
            column2: ['Capability C'],
          },
          showTitle: true,
          displayType: 'columns',
        },
      },
    };

    harness.request(context, ($) => {
      const column1 = $('[data-test-id="section-column1"]');
      const column2 = $('[data-test-id="section-column2"]');

      expect($('[data-test-id="column-section-value"]').length).toEqual(3);
      expect(column1.length).toEqual(1);
      expect(column1.find('p').length).toEqual(2);
      column1.find('p').each((index, sectionValue) => {
        expect($(sectionValue).text()).toEqual(`- ${context.params.section.value.column1[index]}`);
      });

      expect(column2.length).toEqual(1);
      expect(column2.find('p').length).toEqual(1);
      column2.find('p').each((index, sectionValue) => {
        expect($(sectionValue).text()).toEqual(`- ${context.params.section.value.column2[index]}`);
      });
    });
  }));
});
