# Public Browse

Allows the public to browse the buying catalogue.

## Requirements

- Node 14

Install the long-term support (LTS) version of [Node.js](https://nodejs.org/en/), which includes NPM.

## Setting up

```shell
git clone https://github.com/nhs-digital-gp-it-futures/public-browse.git
cd public-browse
npm install
npm run build
```

## Running the tests

- Unit Tests - `npm run test`
- Integration Tests - `npm run test:integration`

## Running the application via the cluster

Update the cluster to disable pb via the cluster and a disabledUrl is set. In you `local-overrides.yaml` it will look something like this;

```javascript
pb: 
  enabled: false 
  disabledUrl: "http://localhost:3000/"
```

All environment variables are provided a default to work with your local cluster in `config.js` except;

`OIDC_CLIENT_SECRET` and `COOKIE_SECRET`

Update your .env file in project root with values that are mentioned below:

NODE_ENV=development  
LOGGER_LEVEL=debug   
OIDC_CLIENT_SECRET=SampleClientSecret
COOKIE_SECRET=secret squirrel

Run the app with `npm run start:dev`
Application should now be running on <http://localhost:3000>.

## Running the application locally

Create a `.env` file in the root of the project.
Look at the `Dependencies` section to run each app on your local machine.
Update the `.env` file to point to dependencies

Start local redis in your terminal run `npm run start:redis` this will run your local redis on port `6380`
Add `REDIS_PORT=6380` to you `.env` file

On a seperate terminal run the app with `npm run start:dev`
Application should now be running on <http://localhost:3000>.

## Dependencies

[Buying Catalogue API](https://github.com/nhs-digital-gp-it-futures/BuyingCatalogueService).
[Document API](https://github.com/nhs-digital-gp-it-futures/BuyingCatalogueDocumentService).
[Identity Server](https://github.com/nhs-digital-gp-it-futures/BuyingCatalogueIdentity).

### Ingress

Moved to ingress v1 configuration