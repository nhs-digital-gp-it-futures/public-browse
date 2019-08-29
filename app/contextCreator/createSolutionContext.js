import { applyDefaultConfig, applySectionConfig } from './applyConfig';

export const createSolutionContext = (solutionData, config) => {
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
