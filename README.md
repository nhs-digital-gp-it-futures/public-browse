# Public Browse 

Allows the public to browse the buying catalogue.

## Requirements
- Node 10

Install the long-term support (LTS) version of <a href="https://nodejs.org/en/">Node.js</a>, which includes NPM.

## Setting up
```
git clone https://github.com/nhs-digital-gp-it-futures/public-browse.git
cd public-browse
npm install
```

## Running the application
- Run - `npm run start`
- Unit Tests - `npm run test`
- Integration Tests - `npm run test:integration`

Application should now be running on <a href="http://localhost:3000">http://localhost:3000</a>.

## Dependencies
### Buying Catalogue API
In order to experience the full functionality, make sure you have an instance of the Buying Catalogue API in dev. environment running. How to set up the [Buying Catalogue API](https://github.com/nhs-digital-gp-it-futures/BuyingCatalogueService/blob/master/README.md "Buying Catalogue API setup").
