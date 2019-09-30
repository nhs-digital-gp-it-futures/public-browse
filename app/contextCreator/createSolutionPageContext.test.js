import { createSolutionPageContext } from './createSolutionPageContext';
import { dummySection, dummySolutionData } from './fixtures/createSolutionData';

describe('createSolutionPageContext', () => {
  it('should create a context for the solution page', () => {
    const expectedContext = {
      solution: {
        id: '00001',
        name: 'The first solution',
        organisation: 'Halls',
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
