export const dummySection = (sectionName, sectionValue) => ({
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

export const dummySolutionData = (id, name, summary, capabilities, marketingData) => ({
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
