import { env } from '../../config';
import { createVaccinationsSolutionListPageContext } from './context';

import vaccinationsManifest from './manifest.json';
import vaccinationsProdData from './data/production/vaccinations-solutions.json';
import vaccinationsNonProdData from './data/non-production/vaccinations-solutions.json';

export const getVaccinationsSolutionListPageContext = async () => {
  const vaccinationsData = env === 'production' ? vaccinationsProdData : vaccinationsNonProdData;

  return createVaccinationsSolutionListPageContext({
    manifest: vaccinationsManifest,
    data: vaccinationsData,
  });
};
