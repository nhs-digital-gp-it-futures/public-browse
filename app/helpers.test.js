import { convertCapabilitiesToArrayIfRequired, determineFoundationCapabilities } from './helpers';

describe('convertCapabilitiesToArrayIfRequired', () => {
  it('should return the selected capabilities as is if the selected capabilities in an array', () => {
    const expectedSelectedCapabilities = {
      capabilities: ['0001', '0002'],
    };

    const selectedCapbilities = convertCapabilitiesToArrayIfRequired(expectedSelectedCapabilities);

    expect(selectedCapbilities).toEqual(expectedSelectedCapabilities);
  });

  it('should return the selected capabilities as an array if a single string value is provided', () => {
    const expectedSelectedCapabilities = {
      capabilities: ['0001'],
    };

    const initialSelectedCapabilities = {
      capabilities: '0001',
    };

    const selectedCapbilities = convertCapabilitiesToArrayIfRequired(initialSelectedCapabilities);

    expect(selectedCapbilities).toEqual(expectedSelectedCapabilities);
  });

  it('should return the selected capabilities as an empty array if no capabilities have been selected', () => {
    const expectedSelectedCapabilities = {
      capabilities: [],
    };

    const initialSelectedCapabilities = {};

    const selectedCapbilities = convertCapabilitiesToArrayIfRequired(initialSelectedCapabilities);

    expect(selectedCapbilities).toEqual(expectedSelectedCapabilities);
  });
});

describe('determineFoundationCapabilities', () => {
  it('should only return ids of capabilities that are foundation capabilities', () => {
    const expectedFoundationCapabilityIds = {
      capabilities: ['0001', '0003'],
    };

    const capabilities = [
      {
        id: '0001',
        name: 'capability one',
        isFoundation: true,
      },
      {
        id: '0002',
        name: 'capability two',
        isFoundation: false,
      },
      {
        id: '0003',
        name: 'capability three',
        isFoundation: true,
      },
    ];


    const foundationCapabilityIds = determineFoundationCapabilities(capabilities);

    expect(foundationCapabilityIds).toEqual(expectedFoundationCapabilityIds);
  });
});
