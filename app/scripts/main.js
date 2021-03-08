/* eslint-disable camelcase */
// NHS.UK frontend
import nhsuk_header from 'nhsuk-frontend/packages/components/header/header';
import nhsuk_skipLink from 'nhsuk-frontend/packages/components/skip-link/skip-link';
import autocomplete from 'nhsuk-frontend/packages/components/header/headerAutoComplete';
import nhsuk_card from 'nhsuk-frontend/packages/components/card/card';

// HTML5 polyfills
import nhsuk_details from 'nhsuk-frontend/packages/components/details/details';

// Initialise components
nhsuk_header();
nhsuk_skipLink();
autocomplete();
nhsuk_details();
nhsuk_card();
