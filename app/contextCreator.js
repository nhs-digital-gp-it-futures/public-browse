const defaultSectionConfig = {
  showTitle: true,
};

export const createColumnsForSectionValue = (value) => {
  const newValue = {};
  const column1 = [];
  const column2 = [];

  value.map((v, idx) => {
    const id = idx + 1;
    if (Math.ceil(value.length / 2) >= id) {
      column1.push(v);
    } else {
      column2.push(v);
    }
  });

  newValue.column1 = column1;
  newValue.column2 = column2;

  return newValue;
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

const createSolutionContext = (solutionData, config) => {
  const solution = {};
  solution.id = solutionData.id;
  solution.name = solutionData.name;

  const sections = [];

  solutionData.marketingData.sections.map((s) => {
    const section = {};

    section.id = s.id;
    section.name = s.name;
    section.value = s.data[0].value;

    sections.push(section);
  });

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

export const createShowCardPageContext = (solutionData, config) => {
  const context = {};
  const solutions = [];

  solutionData.map((solData) => {
    solutions.push(createSolutionContext(solData, config));
  });

  context.solutions = solutions;

  return context;
};

export const createSolutionPageContext = (solutionData, config) => {
  const context = {};

  context.solution = createSolutionContext(solutionData, config);

  return context;
};