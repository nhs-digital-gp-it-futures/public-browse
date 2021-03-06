import { createCapabilitiesSelectorPageContext } from './capabilitiesSelectorPageContext';
import manifest from './manifest.json';

describe('createCapabilitiesSelectorPageContext', () => {
  it('should add the contents of the manifest to the context', () => {
    const expectedContext = {
      ...manifest,
      capabilities: {},
    };

    const context = createCapabilitiesSelectorPageContext({});

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the capabilities-selector page with one capability', () => {
    const expectedContext = {
      ...manifest,
      capabilities: {
        column1: [{
          text: 'Appointments Management - GP',
          value: 'C5',
        }],
        column2: [],
      },
    };

    const capabilities = [{
      reference: 'C5',
      version: '1.0.1',
      name: 'Appointments Management - GP',
      isFoundation: true,
    }];

    const context = createCapabilitiesSelectorPageContext({ capabilities });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the capabilities-selector page with same number of capabilities in each column when even number passed in', () => {
    const capabilities = [{
      reference: 'C5',
      version: '1.0.1',
      name: 'Appointments Management - GP',
      isFoundation: true,
    }, {
      reference: 'C13',
      version: '1.0.1',
      name: 'Patient Information Maintenance',
      isFoundation: true,
    }, {
      reference: 'C14',
      version: '1.0.1',
      name: 'Prescribing',
      isFoundation: true,
    }, {
      reference: 'C15',
      version: '1.0.1',
      name: 'Prescribing2',
      isFoundation: true,
    }];
    const context = createCapabilitiesSelectorPageContext({ capabilities });

    expect(context.capabilities.column1.length).toEqual(context.capabilities.column2.length);
  });

  it('should create a context for the capabilities-selector page with an extra one in column 1 when an odd number passed in', () => {
    const capabilities = [{
      reference: 'C5',
      version: '1.0.1',
      name: 'Appointments Management - GP',
      isFoundation: true,
    }, {
      reference: 'C13',
      version: '1.0.1',
      name: 'Patient Information Maintenance',
      isFoundation: true,
    }, {
      reference: 'C14',
      version: '1.0.1',
      name: 'Prescribing',
      isFoundation: true,
    }, {
      reference: 'C15',
      version: '1.0.1',
      name: 'Prescribing2',
      isFoundation: true,
    }, {
      reference: 'C16',
      version: '1.0.1',
      name: 'Prescribing3',
      isFoundation: true,
    }];

    const context = createCapabilitiesSelectorPageContext({ capabilities });
    expect(context.capabilities.column1.length - 1).toEqual(context.capabilities.column2.length);
  });
});
