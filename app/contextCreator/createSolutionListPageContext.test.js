import {
  createSolutionListPageContext,
  createFoundationSolutionListPageContext,
} from './createSolutionListPageContext';

const solutionPageTitle = 'All Solutions results';
const solutionPageDescription = 'These are the Solutions on the GP IT Futures framework available from the Buying Catalogue.';

const foundationPageTitle = 'Foundation Solutions results';
const foundationPageDescription = 'These Solutions meet the six Foundation Capabilities (the business needs a Solution addresses) mandated by NHS England’s GP IT Futures Operating Model. All six Capabilities must be fulfilled to achieve Foundation Solution status.';

describe('createSolutionListPageContext', () => {
  it('should create a context for the solution list page', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '?browse=all',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
        },
        {
          id: '00002',
          name: 'The second solution',
          summary: 'Some other solution summary',
          organisationName: 'Some other organisation',
          capabilities: [
            'Some other capability',
          ],
          isFoundation: false,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
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
        organisation: {
          id: '1',
          name: 'Some other organisation',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some other capability',
          },
        ],
      },
    ];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '?browse=all',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
        ],
      },
    ];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with empty capability list', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '?browse=all',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          capabilities: [],
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
        },
        capabilities: [],
      },
    ];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no capabilies', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '?browse=all',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
        },
      },
    ];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no organisation', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '?browse=all',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          capabilities: [],
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        capabilities: [],
      },
    ];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions', () => {
    const expectedContext = {
      pageTitle: solutionPageTitle,
      pageDescription: solutionPageDescription,
      backLinkPath: '?browse=all',
      solutions: [],
    };
    const solutions = [];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });
});

describe('createFoundationSolutionListPageContext', () => {
  it('should create a context for the solution list page', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '?browse=foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
        },
        {
          id: '00002',
          name: 'The second solution',
          summary: 'Some other solution summary',
          organisationName: 'Some other organisation',
          capabilities: [
            'Some other capability',
          ],
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
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
        organisation: {
          id: '1',
          name: 'Some other organisation',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some other capability',
          },
        ],
      },
    ];

    const context = createFoundationSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '?browse=foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          capabilities: [
            'Some capability',
          ],
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
        },
        capabilities: [
          {
            id: '1',
            name: 'Some capability',
          },
        ],
      },
    ];

    const context = createFoundationSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with empty capability list', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '?browse=foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          capabilities: [],
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
        },
        capabilities: [],
      },
    ];

    const context = createFoundationSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no capabilies', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '?browse=foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          organisationName: 'Some organisation',
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        organisation: {
          id: '1',
          name: 'Some organisation',
        },
      },
    ];

    const context = createFoundationSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no organisation', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '?browse=foundation',
      solutions: [
        {
          id: '00001',
          name: 'The first solution',
          summary: 'Some solution summary',
          capabilities: [],
          isFoundation: true,
        },
      ],
    };

    const solutions = [
      {
        id: '00001',
        name: 'The first solution',
        summary: 'Some solution summary',
        isFoundation: true,
        capabilities: [],
      },
    ];

    const context = createFoundationSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions', () => {
    const expectedContext = {
      pageTitle: foundationPageTitle,
      pageDescription: foundationPageDescription,
      backLinkPath: '?browse=foundation',
      solutions: [],
    };
    const solutions = [];

    const context = createFoundationSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });
});
