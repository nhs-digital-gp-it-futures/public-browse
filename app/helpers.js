export const convertCapabilitiesToArrayIfRequired = (selectedCapabilities) => {
  if (!selectedCapabilities.capabilities) {
    return {
      capabilities: [],
    };
  }

  return Array.isArray(selectedCapabilities.capabilities)
    ? selectedCapabilities : { capabilities: [selectedCapabilities.capabilities] };
};

export const determineFoundationCapabilities = (capabilitiesData) => {
  const selectedCapabilities = {};

  const foundationCapabilityIds = capabilitiesData.data.capabilities
    .filter(capabilityData => capabilityData.isFoundation)
    .map(foundationCapability => foundationCapability.id);

  selectedCapabilities.capabilities = foundationCapabilityIds;

  return selectedCapabilities;
};
