import { createSolutionListPageContext } from './context';
// TODO: Remove line below when capabilities-selector is on by default
import config from '../../config';

const solutionPageTitle = 'All Solutions results';
const solutionPageDescription = 'These are the Solutions on the GP IT Futures framework available from the Buying Catalogue.';

const foundationPageTitle = 'Foundation Solutions results';
const foundationPageDescription = 'These Solutions meet the six Foundation Capabilities (the business needs a Solution addresses) mandated by NHS England’s GP IT Futures Operating Model. All six Capabilities must be fulfilled to achieve Foundation Solution status.';

describe('createSolutionListPageContext - capabilities-selector', () => {
  it('should create a context for the solution list page', () => {
  // TODO: Remove line below when capabilities-selector is on by default
    config.useCapabilitiesSelector = true;
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
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
      capabilitiesSelected: 'C1',
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
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
      capabilitiesSelected: 'C1',
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with empty capability list', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
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
      capabilitiesSelected: 'C1',
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no capabilies', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
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
      capabilitiesSelected: 'C1',
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no supplier', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
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
      capabilitiesSelected: 'C1',
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
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
      capabilitiesSelected: 'C1',
    });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with "all" as capabilities', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions/capabilities-selector',
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
      capabilitiesSelected: 'all',
    });

    expect(context).toEqual(expectedContext);
  });

  // TODO: Remove test below when capabilities-selector is on by default
  it('should create correck back link url if use capabilities selector is false by default', () => {
    config.useCapabilitiesSelector = false;
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '/solutions',
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
      capabilitiesSelected: 'all',
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
});
