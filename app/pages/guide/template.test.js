import { getGuidePageContext } from './context';
import { componentTester, snapshotTest } from '../../test-utils/componentTester';

const setup = {
  template: {
    path: 'pages/guide/template.njk',
  },
};

describe('guide', () => {
  it('should render the content', componentTester(setup, (harness) => {
    harness.request(getGuidePageContext(), ($) => {
      const snapshot = snapshotTest($, '[data-test-id="main-content"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  it('should render a title, and subsection for each section', componentTester(setup, (harness) => {
    const content = getGuidePageContext();
    harness.request(content, ($) => {
      const title = $('[data-test-id="guide-section-title"]');
      const subsection = $('[data-test-id="guide-section-subsection"]');
      expect(title.length).toEqual(content.sections.length);
      expect(subsection.length).toEqual(content.sections.length);
    });
  }));

  it('should render each piece of advice', componentTester(setup, (harness) => {
    const content = getGuidePageContext();
    harness.request(content, ($) => {
      const advice = $('[data-test-id="guide-page-advice"] p');
      expect(advice.length).toEqual(content.advice.length);
    });
  }));
});
