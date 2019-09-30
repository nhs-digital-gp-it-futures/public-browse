import { createSolutionContext } from './createSolutionContext';
import { dummySection, dummySolutionData } from './fixtures/createSolutionData';

describe('createSolutionContext', () => {
  it('should create a context with one section containing the summary', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [
        {
          id: 'summary-section',
          name: 'Summary',
          value: 'The summary of the first solution',
          showTitle: true,
        },
      ],
    };

    const solutionData = dummySolutionData('00001', 'The first solution', 'The summary of the first solution');

    const context = createSolutionContext(solutionData);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context with three sections a summary and two marketing section', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [
        {
          id: 'summary-section',
          name: 'Summary',
          value: 'The summary of the first solution',
          showTitle: true,
        },
        {
          id: 'first-section',
          name: 'First Section',
          value: 'First Section Value',
          showTitle: true,
        },
        {
          id: 'second-section',
          name: 'Second Section',
          value: ['Second section value 1', 'Second section value 2', 'Second section value 3'],
          showTitle: true,
        },
      ],
    };

    const marketingData = ({
      sections: [
        dummySection('First Section', 'First Section Value'),
        dummySection('Second Section', ['Second section value 1', 'Second section value 2', 'Second section value 3']),
      ],
    });

    const solutionWithMarketingData = dummySolutionData(
      '00001',
      'The first solution',
      'The summary of the first solution',
      undefined,
      marketingData,
    );

    const context = createSolutionContext(solutionWithMarketingData);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context with the capabilities added to the section', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [
        {
          id: 'summary-section',
          name: 'Summary',
          value: 'The summary of the first solution',
          showTitle: true,
        },
        {
          id: 'capability-section',
          name: 'Capabilities',
          value: ['Capability A', 'Capability B'],
          showTitle: true,
        },
      ],
    };

    const capabilities = [{ id: '001', name: 'Capability A' }, { id: '002', name: 'Capability B' }];

    const solutionWithCapabilities = dummySolutionData(
      '00001', 'The first solution', 'The summary of the first solution', capabilities,
    );

    const context = createSolutionContext(solutionWithCapabilities);

    expect(context).toEqual(expectedContext);
  });

  it('should apply the section config if one is provided', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
      organisation: 'Halls',
      sections: [
        {
          id: 'first-section',
          name: 'First Section',
          value: 'First Solution Section Value',
          showTitle: false,
        },
        {
          id: 'capability-section',
          name: 'Capabilities',
          value: {
            column1: ['Capability A'],
            column2: ['Capability B'],
          },
          showTitle: true,
          displayType: 'columns',
        },
      ],
    };

    const config = {
      'first-section': {
        showTitle: false,
      },
      'capability-section': {
        showTitle: true,
        displayType: 'columns',
      },
    };

    const capabilities = [{ id: '001', name: 'Capability A' }, { id: '002', name: 'Capability B' }];

    const marketingData = ({
      sections: [
        dummySection('First Section', 'First Solution Section Value'),
        dummySection('Unknown Section', 'Unknown Section Value'),
      ],
    });

    const solutionData = dummySolutionData('00001', 'The first solution',
      undefined,
      capabilities,
      marketingData);

    const context = createSolutionContext(
      solutionData, config,
    );

    expect(context).toEqual(expectedContext);
  });
});
