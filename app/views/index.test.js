const request = require('supertest');
const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const cheerio = require('cheerio')

const capability = (text, value, checked = false) => ({
  text,
  value,
  checked,
})

const basicContext = {
  capabilities: []
}

const createDummyApp = (context) => {
  // Initialise application
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public/')));
  app.use('/nhsuk-frontend', express.static(path.join(__dirname, '/node_modules/nhsuk-frontend/packages')));

  app.set('view engine', 'njk');
  
  const env = nunjucks.configure(['app/views', 'node_modules/nhsuk-frontend/packages'], {
    autoescape: true,
    express   : app,
  });

  env.addFilter('isArray', value => Array.isArray(value))

  const router = express.Router();
  const dummyRouter = router.get('/bang', (req, res) => {
    res.render('index.njk', context);
  })

  app.use(dummyRouter);

  return app;
}


describe('index page', () => {
  it('should render the page title', (done) => {
      const context = {}

      const app = createDummyApp(context)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text);

          expect($('h1').text().trim()).toEqual('View all solutions');

          done();
        })
    })

  it('should render the page description message', (done) => {
    const context = {}

    const app = createDummyApp(context)
    request(app)
      .get('/bang')
      .then(res => {
        const $ = cheerio.load(res.text);

        expect($('.nhsuk-body-l').text().trim()).toEqual('All the solutions. Check them out.');

        done();
      })
  })

  describe('solution cards', () => {
    it('should render 0 cards if no solutions are provided in the context', (done) => {
      const context = {
        solutions: []
      }
  
      const app = createDummyApp(context)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text);

          const solutionCards = $('[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
  
          expect(solutionCards.length).toEqual(0)
  
          done();
        })
    })

    it('should render 1 card if only 1 solution is provided context', (done) => {
      const context = {
        solutions: [
          {
            id: "00001",
            name: "The first solution",
          }
        ]
      }
  
      const app = createDummyApp(context)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text);

          const solutionCards = $('[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
  
          expect(solutionCards.length).toEqual(1)
  
          done();
        })
    })

    it('should render 3 cards if 3 solutions are provided in the context', (done) => {
      const context = {
        solutions: [
          {
            id: "00001",
            name: "The first solution",
          },
          {
            id: "00002",
            name: "The second solution",
          },
          {
            id: "00003",
            name: "The third solution",
          }
        ]
      }
  
      const app = createDummyApp(context)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text);

          const solutionCards = $('[data-test-id="solution-cards"]').find('[data-test-id="solution-card"]');
  
          expect(solutionCards.length).toEqual(3)
  
          done();
        })
    })
  })
})