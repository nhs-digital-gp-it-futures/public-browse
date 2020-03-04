import content from './manifest.json';

export const createCapabilitiesSelectorPageContext = ({ capabilities }) => (
  {
    ...content,
    capabilities: capabilities ? capabilities.reduce((acc, capability, i) => {
      const option = {
        value: capability.reference,
        text: capability.name,
      };
      if (i < (capabilities.length / 2)) {
        acc.column1.push(option);
      } else acc.column2.push(option);
      return acc;
    }, {
      column1: [],
      column2: [],
    }) : {},
  }
);
