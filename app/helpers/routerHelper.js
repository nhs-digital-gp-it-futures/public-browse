export const withCatch = route => async (req, res, next) => {
  try {
    return await route(req, res, next);
  } catch (err) {
    return next(err);
  }
};

export const getCapabilitiesParam = (capabilities) => {
  let capabilitiesSelected = capabilities;
  if (!capabilitiesSelected || capabilitiesSelected.length < 1) capabilitiesSelected = 'all';
  if (!Array.isArray(capabilitiesSelected)) capabilitiesSelected = [capabilitiesSelected];
  return `.${capabilitiesSelected.join('+')}`;
};

export const determineContentType = (documentName) => {
  const documentNameSplit = documentName.split('.');
  const documentType = documentNameSplit[documentNameSplit.length - 1];
  return `application/${documentType}`;
};
