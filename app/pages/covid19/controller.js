import { createCovid19SolutionListPageContext } from './context';

import covid19Manifest from './manifest';
import covid19Data from './data/covid19-solutions';

export const getCovid19SolutionListPageContext = async () => createCovid19SolutionListPageContext({
  manifest: covid19Manifest,
  data: covid19Data,
});
