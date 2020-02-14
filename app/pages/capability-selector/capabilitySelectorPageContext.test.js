import { createCapabilitySelectorPageContext } from './capabilitySelectorPageContext';
import manifest from './manifest.json';

describe('createCapabilitySelectorPageContext', () => {
  it('should create a context for the capability selector page', () => {
    const expectedContext = {
      ...manifest,
      capabilities: {
        column1: [{
          text: 'Appointments Management - GP',
          value: 'C5',
        }, {
          text: 'Patient Information Maintenance',
          value: 'C13',
        }],
        column2: [{
          text: 'Prescribing',
          value: 'C14',
        }],
      },
    };

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
    }];

    const context = createCapabilitySelectorPageContext({ capabilities });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the capability-selector page with one capability', () => {
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

    const context = createCapabilitySelectorPageContext({ capabilities });

    expect(context).toEqual(expectedContext);
  });

  it('should create a context for the capability-selector page with same number of capabilities in each column when even number passed in', () => {
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
    const context = createCapabilitySelectorPageContext({ capabilities });

    expect(context.capabilities.column1.length).toEqual(context.capabilities.column2.length);
  });

  it('should create a context for the capability-selector page with an extra one in column 1 when an odd number passed in', () => {
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

    const context = createCapabilitySelectorPageContext({ capabilities });
    expect(context.capabilities.column1.length - 1).toEqual(context.capabilities.column2.length);
  });
});
