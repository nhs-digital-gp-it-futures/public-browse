import { componentTester, snapshotTest } from '../test-utils/componentTester';
import manifest from './manifest.json';

const setup = {
  template: {
    path: 'includes/header.njk',
  },
};

describe('header', () => {
  it('should render the header', componentTester(setup, (harness) => {
    harness.request(manifest, ($) => {
      const snapshot = snapshotTest($, '[data-test-id="header-wrap"]');
      expect(snapshot).toMatchSnapshot();
    });
  }));

  describe('covid banner', () => {
    it('should render the covid19 global warning if feature flag set', componentTester(setup, (harness) => {
      const context = {
        config: {
          showCovid19: true,
        },
      };

      harness.request(context, ($) => {
        const globalAlert = $('[data-test-id="covid19-global-alert"]');
        expect(globalAlert.length).toEqual(1);
      });
    }));

    it('should not render the covid19 global warning if feature flag is not set', componentTester(setup, (harness) => {
      const context = {
        config: {
          showCovid19: false,
        },
      };

      harness.request(context, ($) => {
        const globalAlert = $('[data-test-id="covid19-global-alert"]');
        expect(globalAlert.length).toEqual(0);
      });
    }));
  });

  describe('login/logout component', () => {
    // TODO: LOGIN_ENABLED Remove describe block surrounding the tests below
    // when login is on by default
    describe('when login is enabled by default', () => {
      it('should not render the login component', componentTester(setup, (harness) => {
        const context = {
          loginEnabled: true,
        };
        harness.request(context, ($) => {
          const loginComponent = $('[data-test-id="login-logout-component"]');
          expect(loginComponent.length).toBe(1);
        });
      }));
    });

    // TODO: LOGIN_ENABLED Remove test below when login is on by default
    describe('when login is disabled by default', () => {
      it('should not render the login component', componentTester(setup, (harness) => {
        const context = {
          loginEnabled: false,
        };
        harness.request(context, ($) => {
          const loginComponent = $('[data-test-id="login-logout-component"]');
          expect(loginComponent.length).toBe(0);
        });
      }));
    });
  });
});
