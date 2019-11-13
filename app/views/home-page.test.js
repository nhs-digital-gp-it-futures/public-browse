import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';
import { App } from '../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    res.render('home-page.njk', context);
  });

  app.use(dummyRouter);

  return app;
};


describe('home page', () => {
  it('should render the header', (done) => {
    const context = {};

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('.header-panel').length).toEqual(1);

        done();
      });
  });
});
