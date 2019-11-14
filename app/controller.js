import axios from 'axios';
import { createSolutionPageContext } from './contextCreator/createSolutionPageContext';
import { createShowCardsPageContext } from './contextCreator/createShowCardsPageContext';
import { createSolutionListPageContext } from './contextCreator/createSolutionListPageContext';
import { convertCapabilitiesToArrayIfRequired, determineFoundationCapabilities } from './helpers';
import { json } from 'graphlib';

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
    
    console.log(JSON.stringify(context));
    
    return context;
  };
  
  export const getSolutionListPageContext = async () => {
    const solutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions');

    const context = createSolutionListPageContext(solutionListResponse.data.solutions);

    return context;

}

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
