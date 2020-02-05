import { createTestHarness } from '../../test-utils/testHarness';

const setup = {
  template: {
    path: 'pages/view-solution/template.njk',
  },
};

describe('view solution', () => {
  it('should render back-link component with correct href', createTestHarness(setup, (harness) => {
    const context = {};

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-page-back-link"]').length).toEqual(1);
      expect($('[data-test-id="view-solution-page-back-link"]').find('a').attr('href')).toEqual('./');
    });
  }));

  it('should render the foundation tag if isFoundation is true', createTestHarness(setup, (harness) => {
    const context = {
      isFoundation: true,
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-foundation-tag"]').length).toEqual(1);
    });
  }));

  it('should not render the foundation tag if isFoundation is false', createTestHarness(setup, (harness) => {
    const context = {
      isFoundation: false,
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="solution-foundation-tag"]').length).toEqual(0);
    });
  }));

  it('should render the debug name', createTestHarness(setup, (harness) => {
    const context = {
      supplierName: 'Really Kool Corporation',
    };

    harness.request(context, ($) => {
      const orgName = $('[data-test-id="view-solution-page-supplier-name"]');
      expect(orgName.length).toEqual(1);
      expect(orgName.text().trim()).toEqual(context.supplierName);
    });
  }));

  it('should render the solution name', createTestHarness(setup, (harness) => {
    const context = {
      name: 'Write on Time',
    };

    harness.request(context, ($) => {
      const solutionName = $('[data-test-id="view-solution-page-solution-name"]');
      expect(solutionName.length).toEqual(1);
      expect(solutionName.text().trim()).toEqual(context.name);
    });
  }));

  it('should render the solution id', createTestHarness(setup, (harness) => {
    const context = {
      id: '111',
    };

    harness.request(context, ($) => {
      const solutionId = $('[data-test-id="view-solution-page-solution-id"]');
      expect(solutionId.length).toEqual(1);
      expect(solutionId.text().trim()).toEqual(`Solution ID: ${context.id}`);
    });
  }));

  it('should render the last updated', createTestHarness(setup, (harness) => {
    const context = {
      lastUpdated: '2019-12-11T11:28:24.701Z',
    };

    harness.request(context, ($) => {
      const lastUpdated = $('[data-test-id="view-solution-page-last-updated"]');
      expect(lastUpdated.length).toEqual(1);
      expect(lastUpdated.text().trim()).toEqual('Solution information last updated: 11 December 2019');
    });
  }));

  it('should render the solution description section', createTestHarness(setup, (harness) => {
    const context = {
      sections: {
        'solution-description': {},
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-description"]').length).toEqual(1);
    });
  }));

  it('should render the solution capabilities section', createTestHarness(setup, (harness) => {
    const context = {
      sections: {
        capabilities: {},
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-capabilities"]').length).toEqual(1);
    });
  }));

  it('should render the learn more section', createTestHarness(setup, (harness) => {
    const context = {
      sections: {
        capabilities: {},
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="learn-more"]').length).toEqual(1);
    });
  }));

  it('should render the solution contact details section', createTestHarness(setup, (harness) => {
    const context = {
      sections: {
        'contact-details': {},
      },
    };

    harness.request(context, ($) => {
      expect($('[data-test-id="view-solution-contact-details"]').length).toEqual(1);
    });
  }));

  it('should render the download more information button', createTestHarness(setup, (harness) => {
    const context = {
      downloadSolutionUrl: '/path-to-blob',
      config: {
        blobstoreHost: 'www.some-blob-store.com',
      },
    };

    harness.request(context, ($) => {
      const moreInfoButton = $('[data-test-id="view-solution-page-download-info-button"] a');
      expect(moreInfoButton.length).toEqual(1);
      expect(moreInfoButton.text().trim()).toEqual('Download this PDF');
      expect(moreInfoButton.attr('href')).toEqual('www.some-blob-store.com/path-to-blob');
    });
  }));
});
