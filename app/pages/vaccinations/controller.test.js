import { getVaccinationsSolutionListPageContext } from './controller';

import * as context from './context';

import vaccinationsContent from './manifest.json';
import vaccinationsSolutionData from './data/non-production/vaccinations-solutions.json';

jest.mock('./context', () => ({
  createVaccinationsSolutionListPageContext: jest.fn(),
}));

describe('vaccinations controller', () => {
  it('should call createVaccinationsSolutionListPageContext with the local content if filterType is vaccinations', async () => {
    context.createVaccinationsSolutionListPageContext.mockResolvedValueOnce();

    await getVaccinationsSolutionListPageContext();

    expect(context.createVaccinationsSolutionListPageContext.mock.calls.length).toEqual(1);
    expect(context.createVaccinationsSolutionListPageContext).toHaveBeenCalledWith({
      manifest: vaccinationsContent,
      data: vaccinationsSolutionData,
    });
  });
});
