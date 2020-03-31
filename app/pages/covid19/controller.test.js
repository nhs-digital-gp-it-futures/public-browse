import { getCovid19SolutionListPageContext } from './controller';

import * as context from './context';

import covid19Content from './manifest.json';
import covid19SolutionData from './data/covid19-solutions';

jest.mock('./context', () => ({
  createCovid19SolutionListPageContext: jest.fn(),
}));

describe('covid19 controller', () => {
  it('should call createCovid19SolutionListPageContext with the local content if filterType is covid19', async () => {
    context.createCovid19SolutionListPageContext.mockResolvedValueOnce();

    await getCovid19SolutionListPageContext();

    expect(context.createCovid19SolutionListPageContext.mock.calls.length).toEqual(1);
    expect(context.createCovid19SolutionListPageContext).toHaveBeenCalledWith({
      manifest: covid19Content,
      data: covid19SolutionData,
    });
  });
});
