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
    solutionData.data.solutions, capabilitiesData.data.capabilities, {}, config,
  );

  return context;
};

export const getSolutionPageContext = async (solutionId) => {
  const solutionData = await axios.get(`http://localhost:5000/api/v1/solution/${solutionId}`);

  const context = createSolutionPageContext(solutionData.data.solution);

  return context;
};

export const postCapabilityFilters = async (selectedCapabilities) => {
  const solutionData = await axios.post('http://localhost:5000/api/v1/solutions', selectedCapabilities);

  const capabilitiesData = await axios.get('http://localhost:5000/api/v1/capabilities');

  const context = createShowCardPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, selectedCapabilities, config,
  );

  return context;
};

const determineFoundationCapabilities = (capabilitiesData) => {
  const selectedCapabilities = {};

  const foundationCapabilityIds = capabilitiesData.data.capabilities
    .filter(capabilityData => capabilityData.type && capabilityData.type === 'foundation')
    .map(foundationCapability => foundationCapability.id);

  selectedCapabilities.capabilities = foundationCapabilityIds;

  return selectedCapabilities;
};

export const getFoundationCapabilitySolutions = async () => {
  const capabilitiesData = await axios.get('http://localhost:5000/api/v1/capabilities');

  const selectedCapabilities = determineFoundationCapabilities(capabilitiesData);

  const solutionData = await axios.post('http://localhost:5000/api/v1/solutions', selectedCapabilities);

  const context = createShowCardPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, selectedCapabilities, config,
  );

  return context;
};
