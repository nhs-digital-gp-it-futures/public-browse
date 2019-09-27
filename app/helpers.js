export const convertCapabilitiesToArrayIfRequired = (selectedCapabilities) => {
  if (!selectedCapabilities.capabilities) {
    return {
      capabilities: [],
    };
  }

  return Array.isArray(selectedCapabilities.capabilities)
    ? selectedCapabilities : { capabilities: [selectedCapabilities.capabilities] };
};

export const determineFoundationCapabilities = (capabilities) => {
  const selectedCapabilities = {};

  const foundationCapabilityIds = capabilities
    .filter(capability => capability.isFoundation)
    .map(foundationCapability => foundationCapability.id);

  selectedCapabilities.capabilities = foundationCapabilityIds;

  return selectedCapabilities;
};
