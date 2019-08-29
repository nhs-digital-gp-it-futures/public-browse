import axios from 'axios';
import { createSolutionPageContext } from './contextCreator/contextCreator';
import { createShowCardPageContext } from './contextCreator/createShowCardsPageContext';

const config = {
  'summary-section': {
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
  const solutionData = await axios.get('http://localhost:8080/api/v1/SolutionsSummary');

  const capabilitiesData = await axios.get('http://localhost:8080/api/v1/Capabilities');

  const context = createShowCardPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, {}, config,
  );

  return context;
};

export const getSolutionPageContext = async (solutionId) => {
  const solutionData = await axios.get(`http://localhost:8080/api/v1/Solution/${solutionId}`);

  const context = createSolutionPageContext(solutionData.data.solution);

  return context;
};

export const postCapabilityFilters = async (selectedCapabilities) => {
  const solutionData = await axios.post('http://localhost:8080/api/v1/SolutionsSummary', selectedCapabilities);

  const capabilitiesData = await axios.get('http://localhost:8080/api/v1/Capabilities');

  const context = createShowCardPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, selectedCapabilities, config,
  );

  return context;
};

const determineFoundationCapabilities = (capabilitiesData) => {
  const selectedCapabilities = {};

  const foundationCapabilityIds = capabilitiesData.data.capabilities
    .filter(capabilityData => capabilityData.isFoundation)
    .map(foundationCapability => foundationCapability.id);

  selectedCapabilities.capabilities = foundationCapabilityIds;

  return selectedCapabilities;
};

export const getFoundationCapabilitySolutions = async () => {
  const capabilitiesData = await axios.get('http://localhost:8080/api/v1/Capabilities');

  const selectedCapabilities = determineFoundationCapabilities(capabilitiesData);

  const solutionData = await axios.post('http://localhost:8080/api/v1/SolutionsSummary', selectedCapabilities);

  const context = createShowCardPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, selectedCapabilities, config,
  );

  return context;
};
