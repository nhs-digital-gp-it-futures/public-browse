import { componentTester } from '../../../test-utils/componentTester';

const setup = {
  component: {
    name: 'capabilitiesSelector',
    path: 'pages/capabilities-selector/components/macro.njk',
  },
};

describe('capabilitiesSelector', () => {
  it('should render the checkbox options for column1', componentTester(setup, (harness) => {
    const context = {
      params: {
        capabilities: {
          column1: [{
            value: 'value-1',
            text: 'text 1',
          }, {
            value: 'value-2',
            text: 'text 2',
          }],
        },
      },
    };

    harness.request(context, async ($) => {
      const question = $('div[data-test-id="capabilities-selector"]');
      expect(question.find('.nhsuk-checkboxes__item').length).toEqual(2);
      expect(question.find('.nhsuk-checkboxes__item:nth-child(1)').find('input').attr('value')).toEqual('value-1');
      expect(question.find('.nhsuk-checkboxes__item:nth-child(1)').find('label').text().trim()).toEqual('text 1');
      expect(question.find('.nhsuk-checkboxes__item:nth-child(2)').find('input').attr('value')).toEqual('value-2');
      expect(question.find('.nhsuk-checkboxes__item:nth-child(2)').find('label').text().trim()).toEqual('text 2');
    });
  }));

  it('should render the checkbox options for column2', componentTester(setup, (harness) => {
    const context = {
      params: {
        capabilities: {
          column2: [{
            value: 'value-3',
            text: 'text 3',
          }, {
            value: 'value-4',
            text: 'text 4',
          }],
        },
      },
    };

    harness.request(context, async ($) => {
      const question = $('div[data-test-id="capabilities-selector"]');
      expect(question.find('.nhsuk-checkboxes__item').length).toEqual(2);
      expect(question.find('.nhsuk-checkboxes__item:nth-child(1)').find('input').attr('value')).toEqual('value-3');
      expect(question.find('.nhsuk-checkboxes__item:nth-child(1)').find('label').text().trim()).toEqual('text 3');
      expect(question.find('.nhsuk-checkboxes__item:nth-child(2)').find('input').attr('value')).toEqual('value-4');
      expect(question.find('.nhsuk-checkboxes__item:nth-child(2)').find('label').text().trim()).toEqual('text 4');
    });
  }));
});
