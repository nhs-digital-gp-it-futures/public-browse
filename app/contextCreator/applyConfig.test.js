import { applySectionConfig, applyDefaultConfig } from './applyConfig';

describe('applySectionConfig', () => {
  it('should only return sections defined in the config', () => {
    const expectedContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: true,
      },
    ];


    const config = {
      'first-section': {},
    };

    const initialContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
      {
        id: 'unknown-section',
        name: 'Unknown Section',
        value: 'Unknown Section Value',
      },
    ];

    const context = applySectionConfig(initialContext, config);

    expect(context).toEqual(expectedContext);
  });

  it('should decorate a section with the config provided for that section', () => {
    const expectedContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: false,
      },
    ];

    const config = {
      'first-section': {
        showTitle: false,
      },
    };

    const initialContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
    ];

    const context = applySectionConfig(initialContext, config);

    expect(context).toEqual(expectedContext);
  });
});

describe('applyDefaultConfig', () => {
  it('show decorate the section with the default config when a config is not provided', () => {
    const expectedContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: true,
      },
    ];

    const initialContext = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
    ];

    const context = applyDefaultConfig(initialContext);

    expect(context).toEqual(expectedContext);
  });
});
