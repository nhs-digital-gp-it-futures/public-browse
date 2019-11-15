import axios from 'axios';
import { createSolutionPageContext } from './contextCreator/createSolutionPageContext';
import { createShowCardsPageContext } from './contextCreator/createShowCardsPageContext';
import { convertCapabilitiesToArrayIfRequired, determineFoundationCapabilities } from './helpers';

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
  const solutionData = await axios.get('http://localhost:8080/api/v1/Solutions');

  const capabilitiesData = await axios.get('http://localhost:8080/api/v1/Capabilities');

  const context = createShowCardsPageContext(
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
  const selectedCapabilitiesToArray = convertCapabilitiesToArrayIfRequired(selectedCapabilities);

  const solutionData = await axios.post('http://localhost:8080/api/v1/Solutions', selectedCapabilitiesToArray);

  const capabilitiesData = await axios.get('http://localhost:8080/api/v1/Capabilities');

  const context = createShowCardsPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, selectedCapabilities, config,
  );

  return context;
};

export const getFoundationCapabilitySolutions = async () => {
  const capabilitiesData = await axios.get('http://localhost:8080/api/v1/Capabilities');

  const selectedCapabilities = determineFoundationCapabilities(capabilitiesData.data.capabilities);

  const solutionData = await axios.post('http://localhost:8080/api/v1/Solutions', selectedCapabilities);

  const context = createShowCardsPageContext(
    solutionData.data.solutions, capabilitiesData.data.capabilities, selectedCapabilities, config,
  );

  return context;
};

export const getPublicSolutionById = solutionId => axios.get(`http://localhost:8080/api/v1/Solutions/${solutionId}/Public`)
  .then(data => data.data)
  .catch(err => console.log(err));
