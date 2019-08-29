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
