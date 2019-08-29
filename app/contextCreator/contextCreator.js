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

export const createPageContentsContext = (sections) => {
  const pageContents = [];

  sections.map((section) => {
    const pageContent = {};
    pageContent.text = section.name;
    pageContent.href = `#${section.id}`;
    pageContents.push(pageContent);
  });

  return pageContents;
};

export const createCapabilityFiltersContext = (capabilitiesData, selectedCapabilities = {}) => {
  if (capabilitiesData && capabilitiesData.length > 0) {
    const capabilityFilters = [];

    capabilitiesData.map((capabilityData) => {
      const capabilityFilter = {};
      capabilityFilter.text = capabilityData.name;
      capabilityFilter.value = capabilityData.id;

      if (selectedCapabilities.capabilities
        && selectedCapabilities.capabilities.length > 0
        && selectedCapabilities.capabilities.includes(capabilityData.id)) {
        capabilityFilter.checked = true;
      } else {
        capabilityFilter.checked = false;
      }

      capabilityFilters.push(capabilityFilter);
    });

    return capabilityFilters;
  }

  return undefined;
};

const createSolutionContext = (solutionData, config) => {
  const solution = {};
  solution.id = solutionData.id;
  solution.name = solutionData.name;

  const sections = [];

  if (solutionData.summary) {
    const summarySection = {};
    summarySection.id = 'summary-section';
    summarySection.name = 'Summary';

    summarySection.value = solutionData.summary;
    sections.push(summarySection);
  }

  if (solutionData.marketingData) {
    solutionData.marketingData.sections.map((s) => {
      const section = {};

      section.id = s.id;
      section.name = s.name;
      section.value = s.data[0].value;

      sections.push(section);
    });
  }

  if (solutionData.capabilities) {
    const capabilitySection = {};
    capabilitySection.id = 'capability-section';
    capabilitySection.name = 'Capabilities';

    const capabilityValues = solutionData.capabilities.map(cap => cap.name);

    capabilitySection.value = capabilityValues;
    sections.push(capabilitySection);
  }

  solution.sections = config
    ? applySectionConfig(sections, config)
    : applyDefaultConfig(sections);

  return solution;
};

export const createShowCardPageContext = (
  solutionData, capabilitiesData, selectedCapabilities, config,
) => {
  const context = {};
  const solutions = [];

  solutionData.map((solData) => {
    solutions.push(createSolutionContext(solData, config));
  });

  context.solutions = solutions;

  context.capabilities = createCapabilityFiltersContext(
    capabilitiesData, selectedCapabilities,
  );

  return context;
};

export const createSolutionPageContext = (solutionData, config) => {
  const context = {};

  const solution = createSolutionContext(solutionData, config);

  context.solution = solution;
  context.pageContents = createPageContentsContext(solution.sections);

  return context;
};
