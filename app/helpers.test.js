import { convertCapabilitiesToArrayIfRequired } from './helpers';

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
