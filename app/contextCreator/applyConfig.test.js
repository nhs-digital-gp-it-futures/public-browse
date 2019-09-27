import { applySectionConfig, applyDefaultConfig } from './applyConfig';

describe('applySectionConfig', () => {
  it('should only return sections defined in the config', () => {
    const expectedDecoratedSections = [
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

    const initialSection = [
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

    const context = applySectionConfig(initialSection, config);

    expect(context).toEqual(expectedDecoratedSections);
  });

  it('should decorate a section with the config provided for that section', () => {
    const expectedDecoratedSections = [
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

    const initialSections = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
    ];

    const context = applySectionConfig(initialSections, config);

    expect(context).toEqual(expectedDecoratedSections);
  });
});

describe('applyDefaultConfig', () => {
  it('show decorate the section with the default config when a config is not provided', () => {
    const expectedDecoratedSections = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
        showTitle: true,
      },
    ];

    const initialSections = [
      {
        id: 'first-section',
        name: 'First Section',
        value: 'First Section Value',
      },
    ];

    const context = applyDefaultConfig(initialSections);

    expect(context).toEqual(expectedDecoratedSections);
  });
});
