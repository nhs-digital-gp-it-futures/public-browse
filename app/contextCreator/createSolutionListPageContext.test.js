import { createSolutionListPageContext } from './createSolutionListPageContext';

describe('createSolutionListPageContext', () => {
  it('should create a context for the solution list page', () => {
    const expectedContext = {
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
          }
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
          }
        ],
      },
    ];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution', () => {
    const expectedContext = {
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
          }
        ],
      },
    ]

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with empty capabilies', () => {
    const expectedContext = {
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
    ]

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no capabilies', () => {
    const expectedContext = {
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
    ]

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with one solution with no organisation', () => {
    const expectedContext = {
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
    ]

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions', () => {
    const expectedContext = {
      solutions: [],
    };
    const solutions = [];

    const context = createSolutionListPageContext(solutions);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions and a page title', () => {
    const expectedContext = {
      pageTitle: 'some page title',
      solutions: [],
    };

    const pageTitle = 'some page title';
    const solutions = [];

    const context = createSolutionListPageContext(solutions, pageTitle);

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the solution list page with no solutions and a page description', () => {
    const expectedContext = {
      pageTitle: 'some page title',
      pageDescription: 'some page description',
      solutions: [],
    };

    const pageTitle = 'some page title';
    const pageDescription = 'some page description';
    const solutions = [];

    const context = createSolutionListPageContext(solutions, pageTitle, pageDescription);

    expect(context).toEqual(expectedContext);
  });
});
