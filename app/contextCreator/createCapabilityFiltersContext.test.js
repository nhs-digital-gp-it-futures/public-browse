import { createCapabilityFiltersContext } from './createCapabilityFiltersContext';

describe('createCapabilityFiltersContext', () => {
  it('should return undefined if no capabilities are provided', () => {
    const context = createCapabilityFiltersContext();

    expect(context).toEqual(undefined);
  });

  it('should return undefined if capabilities is an empty array', () => {
    const context = createCapabilityFiltersContext([]);

    expect(context).toEqual(undefined);
  });

  it('should create a context consisting of one capability if only one capability is provided', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: false,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
    ];

    const context = createCapabilityFiltersContext(capabilitiesData);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });

  it('should create a context consisting of multiple capabilities if multiple capabilities are provided', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: false,
      },
      {
        text: 'Capability Two',
        value: 'C2',
        checked: false,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
      {
        id: 'C2',
        name: 'Capability Two',
        description: 'Some description about capability two',
      },
    ];

    const context = createCapabilityFiltersContext(capabilitiesData);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });

  it('should mark the single selectedCapabilities as checked', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: true,
      },
      {
        text: 'Capability Two',
        value: 'C2',
        checked: false,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
      {
        id: 'C2',
        name: 'Capability Two',
        description: 'Some description about capability two',
      },
    ];

    const selectedCapabilities = { capabilities: 'C1' };

    const context = createCapabilityFiltersContext(capabilitiesData, selectedCapabilities);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });

  it('should mark multiple selectedCapabilities as checked', () => {
    const expectedCapabilityFiltersContext = [
      {
        text: 'Capability One',
        value: 'C1',
        checked: true,
      },
      {
        text: 'Capability Two',
        value: 'C2',
        checked: true,
      },
    ];

    const capabilitiesData = [
      {
        id: 'C1',
        name: 'Capability One',
        description: 'Some description about capability one',
      },
      {
        id: 'C2',
        name: 'Capability Two',
        description: 'Some description about capability two',
      },
    ];

    const selectedCapabilities = { capabilities: ['C1', 'C2'] };

    const context = createCapabilityFiltersContext(capabilitiesData, selectedCapabilities);

    expect(context).toEqual(expectedCapabilityFiltersContext);
  });
});
