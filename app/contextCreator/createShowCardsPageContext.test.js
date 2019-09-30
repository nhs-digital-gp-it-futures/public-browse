import { createShowCardsPageContext } from './createShowCardsPageContext';
import { dummySolutionData } from './fixtures/createSolutionData';

describe('createShowCardPageContext', () => {
  it('should create a context for 2 solutions', () => {
    const expectedContext = {
      solutions: [
        {
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
        },
        {
          id: '00002',
          name: 'The second solution',
          organisation: 'Halls',
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

    const context = createShowCardsPageContext(twoSolutions);

    expect(context).toEqual(expectedContext);
  });

  it('should add the capabilities context if capability data is provided', () => {
    const expectedContext = {
      solutions: [
        {
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

    const context = createShowCardsPageContext(
      oneSolution, capabilitiesData, undefined,
    );

    expect(context).toEqual(expectedContext);
  });
});
