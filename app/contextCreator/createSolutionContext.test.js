import { createSolutionContext } from './createSolutionContext';

const dummySection = (sectionName, sectionValue) => ({
  id: sectionName.toLowerCase().replace(' ', '-'),
  name: sectionName,
  data: [
    {
      id: 'some-id',
      name: 'Some Name',
      value: sectionValue,
    },
  ],
});

const dummySolutionData = (id, name, summary, capabilities, marketingData) => ({
  id,
  name,
  summary,
  organisation: {
    id: '235F7D1A',
    name: 'Halls',
  },
  marketingData,
  capabilities,
});

describe('createSolutionContext', () => {
  it('should create a context with one section containing the summary', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
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

  // it('should create a context for 2 solutions', () => {
  //   const expectedContext = {
  //     solutions: [
  //       {
  //         id: '00001',
  //         name: 'The first solution',
  //         sections: [
  //           {
  //             id: 'summary-section',
  //             name: 'Summary',
  //             value: 'The summary of the first solution',
  //             showTitle: true,
  //           },
  //         ],
  //       },
  //       {
  //         id: '00002',
  //         name: 'The second solution',
  //         sections: [
  //           {
  //             id: 'summary-section',
  //             name: 'Summary',
  //             value: 'The summary of the second solution',
  //             showTitle: true,
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   const twoSolutions = [dummySolutionData('00001', 'The first solution', 'The summary of the first solution'),
  //     dummySolutionData('00002', 'The second solution', 'The summary of the second solution'),
  //   ];

  //   const context = createShowCardPageContext(twoSolutions);

  //   expect(context).toEqual(expectedContext);
  // });

  it('should create a context with the capabilities added to the section', () => {
    const expectedContext = {
      id: '00001',
      name: 'The first solution',
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

  // it('should add the capabilities context if capability data is provided', () => {
  //   const expectedContext = {
  //     solutions: [
  //       {
  //         id: '00001',
  //         name: 'The first solution',
  //         sections: [
  //           {
  //             id: 'summary-section',
  //             name: 'Summary',
  //             value: 'The summary of the first solution',
  //             showTitle: true,
  //           },
  //         ],
  //       },
  //     ],
  //     capabilities: [
  //       {
  //         text: 'Capability One',
  //         value: 'C1',
  //         checked: false,
  //       },
  //     ],
  //   };

  //   const capabilitiesData = [{ id: 'C1', name: 'Capability One' }];

  //   const oneSolution = [
  //     dummySolutionData('00001', 'The first solution', 'The summary of the first solution'),
  //   ];

  //   const context = createShowCardPageContext(
  //     oneSolution, capabilitiesData, undefined,
  //   );

  //   expect(context).toEqual(expectedContext);
  // });
});
