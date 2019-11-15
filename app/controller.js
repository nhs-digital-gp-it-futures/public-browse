import axios from 'axios';
import { createSolutionPageContext } from './contextCreator/createSolutionPageContext';
import { createSolutionListPageContext } from './contextCreator/createSolutionListPageContext';

export const getSolutionFoundationListPageContext = async () => {
  const foundationSolutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions/Foundation');

  const context = createSolutionListPageContext(
    foundationSolutionListResponse.data.solutions,
    'Foundation Solutions - results',
    'These Solutions meet the six Foundation Capabilities (the business needs a Solution addresses) mandated by NHS England’s GP IT Futures Operating Model. All six Capabilities must be fulfilled to achieve Foundation Solution status.',
  );

  return context;
};

export const getSolutionListPageContext = async () => {
  const solutionListResponse = await axios.get('http://localhost:8080/api/v1/Solutions');

  const context = createSolutionListPageContext(
    solutionListResponse.data.solutions,
    'All Solutions - results',
    'These are the Solutions on the GP IT Futures framework available from the Buying Catalogue.',
  );

  return context;
};

export const getSolutionPageContext = async (solutionId) => {
  const solutionData = await axios.get(`http://localhost:8080/api/v1/Solution/${solutionId}`);

  const context = createSolutionPageContext(solutionData.data.solution);

  return context;
};
