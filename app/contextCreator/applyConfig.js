import { createColumnsForSectionValue } from './createColumnsForSectionValue';

const defaultSectionConfig = {
  showTitle: true,
};

export const applyDefaultConfig = (sections) => {
  const decoratedSections = [];

  sections.map((section) => {
    const decoratedSection = {
      ...section,
      ...defaultSectionConfig,
    };
    decoratedSections.push(decoratedSection);
  });

  return decoratedSections;
};

export const applySectionConfig = (sections, config) => {
  const decoratedSections = [];

  sections.map((section) => {
    if (config[section.id] !== undefined) {
      const decoratedSection = {
        ...section,
        ...defaultSectionConfig,
        ...config[section.id],
      };

      if (config[section.id].displayType === 'columns') {
        decoratedSection.value = createColumnsForSectionValue(section.value);
      }
      decoratedSections.push(decoratedSection);
    }
  });

  return decoratedSections;
};
