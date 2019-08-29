import { createSolutionPageContext } from './createSolutionPageContext';

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
