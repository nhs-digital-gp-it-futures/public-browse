import { env } from '../../config';
import { createCovid19SolutionListPageContext } from './context';

import covid19Manifest from './manifest.json';
import covid19ProdData from './data/production/covid19-solutions.json';
import covid19NonProdData from './data/non-production/covid19-solutions.json';

export const getCovid19SolutionListPageContext = async () => {
  const covid19Data = env === 'production' ? covid19ProdData : covid19NonProdData;

  return createCovid19SolutionListPageContext({
    manifest: covid19Manifest,
    data: covid19Data,
  });
};
