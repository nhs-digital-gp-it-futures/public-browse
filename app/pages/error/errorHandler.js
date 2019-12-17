export const errorHandler = (err) => {
  const formattedError = {
    status: err && err.status ? err.status : 400,
    message: err && err.message ? err.message : 'Something went wrong',
  };

  if (err && err.response && err.response.data && err.response.data.errors) {
    formattedError.status = err.response.status;
    formattedError.message = `${err.response.data.errors[0]} ${err.response.statusText}`;
    if (err.response.status === 404) {
      const splitUrl = err.response.config.url.split('/');
      const solutionId = splitUrl[splitUrl.length - 2];
      formattedError.message = `Solution with id: ${solutionId} not found`;
    }
  }

  return formattedError;
};
