import { createSolutionListPageContext } from './context';
// TODO: USE_CAPABILITIES_SELECTOR Remove line below when capabilities-selector is on by default
import config from '../../config';

const solutionPageTitle = 'All Solutions results';
const solutionPageDescription = 'These are the Solutions on the GP IT Futures framework available from the Buying Catalogue.';

const foundationPageTitle = 'Foundation Solutions results';
const foundationPageDescription = 'These Solutions meet the six Foundation Capabilities (the business needs a Solution addresses) mandated by NHS England’s GP IT Futures Operating Model. All six Capabilities must be fulfilled to achieve Foundation Solution status.';

const covid19PageTitle = 'Catalogue Solutions to help with coronavirus';
const covid19PageDescription = 'The following Catalogue Solutions can help prevent the spread of coronavirus by providing online consultations, services and information.';

describe('createSolutionListPageContext - capabilities-selector', () => {
  it('should create a context for the solution list page', () => {
  // TODO: USE_CAPABILITIES_SELECTOR Remove line below when capabilities-selector is on by default
    config.useCapabilitiesSelector = 'true';
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.C1/00001',
        },
        {
          id: '00002',
          name: 'The second solution',
          summary: 'Some other solution summary',
          supplierName: 'Some other supplier',
          capabilities: [
            'Some other capability',
          ],
          isFoundation: false,
          viewSolutionUrl: '/solutions/capabilities-selector.C1/00002',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
        ],
      },
      {
        id: '00002',
        name: 'The second solution',
        summary: 'Some other solution summary',
        isFoundation: false,
        supplier: {
          id: '1',
          name: 'Some other supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some other capability',
          },
        ],
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['C1'],
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.C1/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
        ],
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['C1'],
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution and multiple capabilities', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [
            'Some capability',
            'Another capability',
          ],
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.C1+C2/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
          {
            id: '2',
            name: 'Another capability',
          },
        ],
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['C1', 'C2'],
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with empty capability list', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [],
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.C1/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [],
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['C1'],
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no capabilies', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.C1/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['C1'],
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no supplier', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          capabilities: [],
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.C1/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        capabilities: [],
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['C1'],
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [],
    };
    const solutionsData = [];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['C1'],
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with "all" as capabilities', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [],
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.all/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [],
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['all'],
    });

    expect(context).toEqual(expectedContext);
  });

  // TODO: USE_CAPABILITIES_SELECTOR Remove test below when capabilities-selector is on by default
  it('should create correct back link url if use capabilities selector is false by default', () => {
    config.useCapabilitiesSelector = 'false';
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions',
      filterType: 'capabilities-selector',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
          viewSolutionUrl: '/solutions/capabilities-selector.all/00001',
        },
        {
          id: '00002',
          name: 'The second solution',
          summary: 'Some other solution summary',
          supplierName: 'Some other supplier',
          capabilities: [
            'Some other capability',
          ],
          isFoundation: false,
          viewSolutionUrl: '/solutions/capabilities-selector.all/00002',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
        ],
      },
      {
        id: '00002',
        name: 'The second solution',
        summary: 'Some other solution summary',
        isFoundation: false,
        supplier: {
          id: '1',
          name: 'Some other supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some other capability',
          },
        ],
      },
    ];

    const solutionListManifest = {
      title: solutionPageTitle,
      description: solutionPageDescription,
    };

    const context = createSolutionListPageContext({
      filterType: 'capabilities-selector',
      solutionListManifest,
      solutionsData,
      capabilitiesSelected: ['all'],
    });

    expect(context).toEqual(expectedContext);
  });
});

describe('createSolutionListPageContext - Foundation', () => {
  it('should create a context for the solution list page', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '/solutions',
      filterType: 'foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
          viewSolutionUrl: '/solutions/foundation/00001',
        },
        {
          id: '00002',
          name: 'The second solution',
          summary: 'Some other solution summary',
          supplierName: 'Some other supplier',
          capabilities: [
            'Some other capability',
          ],
          isFoundation: true,
          viewSolutionUrl: '/solutions/foundation/00002',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
        ],
      },
      {
        id: '00002',
        name: 'The second solution',
        summary: 'Some other solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some other supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some other capability',
          },
        ],
      },
    ];

    const solutionListManifest = {
      title: foundationPageTitle,
      description: foundationPageDescription,
    };

    const context = createSolutionListPageContext({ filterType: 'foundation', solutionListManifest, solutionsData });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '/solutions',
      filterType: 'foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
          viewSolutionUrl: '/solutions/foundation/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
        ],
      },
    ];

    const solutionListManifest = {
      title: foundationPageTitle,
      description: foundationPageDescription,
    };

    const context = createSolutionListPageContext({ filterType: 'foundation', solutionListManifest, solutionsData });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with empty capability list', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '/solutions',
      filterType: 'foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          capabilities: [],
          isFoundation: true,
          viewSolutionUrl: '/solutions/foundation/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
        capabilities: [],
      },
    ];

    const solutionListManifest = {
      title: foundationPageTitle,
      description: foundationPageDescription,
    };

    const context = createSolutionListPageContext({ filterType: 'foundation', solutionListManifest, solutionsData });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no capabilies', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '/solutions',
      filterType: 'foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplierName: 'Some supplier',
          isFoundation: true,
          viewSolutionUrl: '/solutions/foundation/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        supplier: {
          id: '1',
          name: 'Some supplier',
        },
      },
    ];

    const solutionListManifest = {
      title: foundationPageTitle,
      description: foundationPageDescription,
    };

    const context = createSolutionListPageContext({ filterType: 'foundation', solutionListManifest, solutionsData });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no supplier', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '/solutions',
      filterType: 'foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          capabilities: [],
          isFoundation: true,
          viewSolutionUrl: '/solutions/foundation/00001',
        },
      ],
    };

    const solutionsData = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        capabilities: [],
      },
    ];

    const solutionListManifest = {
      title: foundationPageTitle,
      description: foundationPageDescription,
    };

    const context = createSolutionListPageContext({ filterType: 'foundation', solutionListManifest, solutionsData });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '/solutions',
      filterType: 'foundation',
      solutions: [],
    };

    const solutionsData = [];

    const solutionListManifest = {
      title: foundationPageTitle,
      description: foundationPageDescription,
    };

    const context = createSolutionListPageContext({ filterType: 'foundation', solutionListManifest, solutionsData });

    expect(context).toEqual(expectedContext);
  });

  describe('covid19', () => {
    it('should create a context for the solution list page with one solution with empty list with filterType covid19', () => {
      const expectedContext = {
        pageTitle: covid19PageTitle,
        pageDescription: covid19PageDescription,
        backLinkPath: '/solutions',
        filterType: 'covid19',
        solutions: [
          {
            id: '00001',
            name: 'The first solution',
            summary: 'Some solution summary',
            supplierName: 'Some supplier',
            covid19: {
              title: 'Some title',
              list: [],
            },
            viewSolutionUrl: '/solutions/covid19/00001',
          },
        ],
      };

      const solutionsData = [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplier: {
            id: '1',
            name: 'Some supplier',
          },
          covid19: {
            title: 'Some title',
            list: [],
          },
        },
      ];

      const solutionListManifest = {
        title: covid19PageTitle,
        description: covid19PageDescription,
      };

      const context = createSolutionListPageContext({ filterType: 'covid19', solutionListManifest, solutionsData });

      expect(context).toEqual(expectedContext);
    });

    it('should create a context for the solution list page with one solution with no list with filterType covid19', () => {
      const expectedContext = {
        pageTitle: covid19PageTitle,
        pageDescription: covid19PageDescription,
        backLinkPath: '/solutions',
        filterType: 'covid19',
        solutions: [
          {
            id: '00001',
            name: 'The first solution',
            summary: 'Some solution summary',
            supplierName: 'Some supplier',
            viewSolutionUrl: '/solutions/covid19/00001',
            covid19: {
              title: 'Some title',
            },
          },
        ],
      };

      const solutionsData = [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          supplier: {
            id: '1',
            name: 'Some supplier',
          },
          covid19: {
            title: 'Some title',
          },
        },
      ];

      const solutionListManifest = {
        title: covid19PageTitle,
        description: covid19PageDescription,
      };

      const context = createSolutionListPageContext({ filterType: 'covid19', solutionListManifest, solutionsData });

      expect(context).toEqual(expectedContext);
    });

    it('should create a context for the solution list page with one solution with no supplier with filterType covid19', () => {
      const expectedContext = {
        pageTitle: covid19PageTitle,
        pageDescription: covid19PageDescription,
        backLinkPath: '/solutions',
        filterType: 'covid19',
        solutions: [
          {
            id: '00001',
            name: 'The first solution',
            summary: 'Some solution summary',
            covid19: {
              title: 'Some title',
              list: [
                'Some first list item',
                'Some second list item',
                'Some third list item',
              ],
            },
            viewSolutionUrl: '/solutions/covid19/00001',
          },
        ],
      };

      const solutionsData = [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          covid19: {
            title: 'Some title',
            list: [
              'Some first list item',
              'Some second list item',
              'Some third list item',
            ],
          },
        },
      ];

      const solutionListManifest = {
        title: covid19PageTitle,
        description: covid19PageDescription,
      };

      const context = createSolutionListPageContext({ filterType: 'covid19', solutionListManifest, solutionsData });

      expect(context).toEqual(expectedContext);
    });

    it('should create a context for the solution list page with no solutions with filterType covid19', () => {
      const expectedContext = {
        pageTitle: covid19PageTitle,
        pageDescription: covid19PageDescription,
        backLinkPath: '/solutions',
        filterType: 'covid19',
        solutions: [],
      };

      const solutionsData = [];

      const solutionListManifest = {
        title: covid19PageTitle,
        description: covid19PageDescription,
      };

      const context = createSolutionListPageContext({ filterType: 'covid19', solutionListManifest, solutionsData });

      expect(context).toEqual(expectedContext);
    });
  });
});
