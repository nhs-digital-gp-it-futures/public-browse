import {
  createShowCardPageContext,
  createSolutionPageContext,
  applySectionConfig,
  applyDefaultConfig,
  createColumnsForSectionValue,
  createPageContentsContext,
  createCapabilityFiltersContext,
} from './contextCreator';

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


describe('createShowCardPageContext', () => {
  it('should create a context for one solution with one section containing the summary', () => {
    const expectedContext = {
      solutions: [
        {
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
        },
      ],
    };

    const oneSolution = [dummySolutionData('00001', 'The first solution', 'The summary of the first solution')];

    const context = createShowCardPageContext(oneSolution);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for one solution with three sections a summary and two marketing section', () => {
    const expectedContext = {
      solutions: [
        {
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
        },
      ],
    };

    const marketingData = ({
      sections: [
        dummySection('First Section', 'First Section Value'),
        dummySection('Second Section', ['Second section value 1', 'Second section value 2', 'Second section value 3']),
      ],
    });

    const oneSolutionWithMarketingData = [
      dummySolutionData(
        '00001',
        'The first solution',
        'The summary of the first solution',
        undefined,
        marketingData,
      )];

    const context = createShowCardPageContext(oneSolutionWithMarketingData);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for 2 solutions', () => {
    const expectedContext = {
      solutions: [
        {
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
        },
        {
          id: '00002',
          name: 'The second solution',
          sections: [
            {
              id: 'summary-section',
              name: 'Summary',
              value: 'The summary of the second solution',
              showTitle: true,
            },
          ],
        },
      ],
    };

    const twoSolutions = [dummySolutionData('00001', 'The first solution', 'The summary of the first solution'),
      dummySolutionData('00002', 'The second solution', 'The summary of the second solution'),
    ];

    const context = createShowCardPageContext(twoSolutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context with the capabilities added to the section', () => {
    const expectedContext = {
      solutions: [
        {
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
        },
      ],
    };

    const capabilities = [{ id: '001', name: 'Capability A' }, { id: '002', name: 'Capability B' }];

    const oneSolutionWithCapabilities = [
      dummySolutionData('00001', 'The first solution', 'The summary of the first solution', capabilities),
    ];

    const context = createShowCardPageContext(oneSolutionWithCapabilities);

    expect(context).toEqual(expectedContext);
  });

  it('should apply the section config if one is provided', () => {
    const expectedContext = {
      solutions: [
        {
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

    const oneSolution = [
      dummySolutionData('00001', 'The first solution',
        undefined,
        capabilities,
        marketingData),
    ];

    const context = createShowCardPageContext(
      oneSolution, undefined, undefined, config,
    );

    expect(context).toEqual(expectedContext);
  });

  it('should add the capabilities context if capability data is provided', () => {
    const expectedContext = {
      solutions: [
        {
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
        },
      ],
      capabilities: [
        {
          text: 'Capability One',
          value: 'C1',
          checked: false,
        },
      ],
    };

    const capabilitiesData = [{ id: 'C1', name: 'Capability One' }];

    const oneSolution = [
      dummySolutionData('00001', 'The first solution', 'The summary of the first solution'),
    ];

    const context = createShowCardPageContext(
      oneSolution, capabilitiesData, undefined,
    );

    expect(context).toEqual(expectedContext);
  });
});

describe('createSolutionPageContext', () => {
  it('should create a context for the solution page', () => {
    const expectedContext = {
      solution: {
        id: '00001',
        name: 'The first solution',
        sections: [
          {
            id: 'first-section',
            name: 'First Section',
            value: 'First Section Value',
            showTitle: true,
          },
        ],
      },
      pageContents: [
        {
          text: 'First Section',
          href: '#first-section',
        },
      ],
    };

    const marketingData = ({
      sections: [
        dummySection('First Section', 'First Section Value'),
      ],
    });

    const aSolutionWithOneSection = dummySolutionData('00001', 'The first solution',
      undefined,
      undefined,
      marketingData);

    const context = createSolutionPageContext(aSolutionWithOneSection);

    expect(context).toEqual(expectedContext);
  });
});

describe('applySectionConfig', () => {
  it('should only return sections defined in the config', () => {
    const expectedContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: true,
      },
    ];


    const config = {
      'first-section': {},
    };

    const initialContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
      {
        id: 'unknown-section',
        name: 'Unknown Section',
        value: 'Unknown Section Value',
      },
    ];

    const context = applySectionConfig(initialContext, config);

    expect(context).toEqual(expectedContext);
  });

  it('should decorate a section with the config provided for that section', () => {
    const expectedContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: false,
      },
    ];

    const config = {
      'first-section': {
        showTitle: false,
      },
    };

    const initialContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
    ];

    const context = applySectionConfig(initialContext, config);

    expect(context).toEqual(expectedContext);
  });
});

describe('applyDefaultConfig', () => {
  it('show decorate the section with the default config when a config is not provided', () => {
    const expectedContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: true,
      },
    ];

    const initialContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
    ];

    const context = applyDefaultConfig(initialContext);

    expect(context).toEqual(expectedContext);
  });
});

describe('createColumnsForSection', () => {
  it('should split the section values evenly into 2 columns when they are 2 values', () => {
    const expectedSectionValue = {
      column1: ['value 1'],
      column2: ['value 2'],
    };

    const initialSectionValue = ['value 1', 'value 2'];

    const sectionValue = createColumnsForSectionValue(initialSectionValue);

    expect(sectionValue).toEqual(expectedSectionValue);
  });

  it('should split the section values with an extra value in the first column when an odd number of values', () => {
    const expectedSectionValue = {
      column1: ['value 1', 'value 2'],
      column2: ['value 3'],
    };

    const initialSectionValue = ['value 1', 'value 2', 'value 3'];

    const sectionValue = createColumnsForSectionValue(initialSectionValue);

    expect(sectionValue).toEqual(expectedSectionValue);
  });
});

describe('createPageContentsContext', () => {
  it('should create a list of 1 of page contents objects if the solution has just 1 section', () => {
    const expectedPageContents = [
      {
        href: '#first-section',
        text: 'First Section',
      },
    ];

    const sections = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: true,
      },
    ];

    const pageContents = createPageContentsContext(sections);

    expect(pageContents).toEqual(expectedPageContents);
  });

  it('should create a list of 2 page contents objects if the solution has 2 sections', () => {
    const expectedPageContents = [
      {
        href: '#first-section',
        text: 'First Section',
      },
      {
        href: '#second-section',
        text: 'Second Section',
      },
    ];

    const sections = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
      {
        id: 'second-section',
        name: 'Second Section',
        value: 'Second Section Value',
      },
    ];

    const pageContents = createPageContentsContext(sections);

    expect(pageContents).toEqual(expectedPageContents);
  });
});

describe('createCapabilityFiltersContext', () => {
  it('should return undefined if no capabilities are provided', () => {
    const context = createCapabilityFiltersContext();

    expect(context).toEqual(undefined);
  });

  it('should return undefined if capabilities is an empty array', () => {
    const context = createCapabilityFiltersContext([]);

    expect(context).toEqual(undefined);
  });

  it('should create a context consisting of one capability if only one capability is provided', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: false,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
    ];

    const context = createCapabilityFiltersContext(capabilitiesData);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });

  it('should create a context consisting of multiple capabilities if multiple capabilities are provided', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: false,
      },
      {
        text: 'Capability Two',
        value: 'C2',
        checked: false,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
      {
        id: 'C2',
        name: 'Capability Two',
        description: 'Some description about capability two',
      },
    ];

    const context = createCapabilityFiltersContext(capabilitiesData);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });

  it('should mark the single selectedCapabilities as checked', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: true,
      },
      {
        text: 'Capability Two',
        value: 'C2',
        checked: false,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
      {
        id: 'C2',
        name: 'Capability Two',
        description: 'Some description about capability two',
      },
    ];

    const selectedCapabilities = { capabilities: 'C1' };

    const context = createCapabilityFiltersContext(capabilitiesData, selectedCapabilities);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });

  it('should mark multiple selectedCapabilities as checked', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: true,
      },
      {
        text: 'Capability Two',
        value: 'C2',
        checked: true,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
      {
        id: 'C2',
        name: 'Capability Two',
        description: 'Some description about capability two',
      },
    ];

    const selectedCapabilities = { capabilities: ['C1', 'C2'] };

    const context = createCapabilityFiltersContext(capabilitiesData, selectedCapabilities);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });
});
