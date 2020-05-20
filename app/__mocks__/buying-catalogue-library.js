// Let Jest create the mock.
const buyingCatalogueLibrary = jest.genMockFromModule('buying-catalogue-library');

// Get the unmocked methods.
const {
  FakeAuthProvider, ErrorContext, createTestHarness, errorHandler, getCsrfTokenFromGet,
} = require.requireActual('buying-catalogue-library');

// Patch it in.
buyingCatalogueLibrary.FakeAuthProvider = FakeAuthProvider;
buyingCatalogueLibrary.ErrorContext = ErrorContext;
buyingCatalogueLibrary.createTestHarness = createTestHarness;
buyingCatalogueLibrary.errorHandler = errorHandler;
buyingCatalogueLibrary.getCsrfTokenFromGet = getCsrfTokenFromGet;

module.exports = buyingCatalogueLibrary;
