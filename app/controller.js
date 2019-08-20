import axios from 'axios';
import { createShowCardPageContext, createSolutionPageContext } from './contextCreator';

const config = {
  description: {
    showTitle: false,
  },
  features: {
    showTitle: true,
  },
  'capability-section': {
    showTitle: true,
    displayType: 'columns',
  },
};

export const getShowCardsPageContext = async () => {
  const solutionData = await axios.get('http://localhost:5000/api/v1/solutions');

  const capabilitiesData = await axios.get('http://localhost:5000/api/v1/capabilities');

  const context = createShowCardPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, config,
  );

  return context;
};

export const getSolutionPageContext = async (solutionId) => {
  const solutionData = await axios.get(`http://localhost:5000/api/v1/solution/${solutionId}`);

  const context = createSolutionPageContext(solutionData.data.solution);

  return context;
};

export const postCapabilityFilters = async (capabilities) => {
  const solutionData = await axios.post('http://localhost:5000/api/v1/solutions', capabilities);

  const capabilitiesData = await axios.get('http://localhost:5000/api/v1/capabilities');
  // Will need to check selected capabilities

  const context = createShowCardPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, config,
  );

  return context;
};
