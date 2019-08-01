const request = require('supertest');
const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const cheerio = require('cheerio')

const basicSolutionWithNoSectionsContext = {
  solution: {
    id: "00001",
    name: "This is the title of the solution",
    sections: [
    ],
  }
}

const aSimpleSection = {
  name: "Simple Section",
  value: "This is the simple section",
}

const aListSection = {
  name: "List Section",
  value: [
    "value 1",
    "value 2",
    "value 3",
  ],
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
    const macroWrapper = `{% from './solution-card.njk' import solutionCard %}
                          {{ solutionCard(solution) }}`

    const a = nunjucks.renderString(macroWrapper, context)

    res.send(a)
  })

  app.use(dummyRouter)

  return app;
}


describe('solution-card', () => {
  it('should render the title of the Solution', (done) => {
      const app = createDummyApp(basicSolutionWithNoSectionsContext)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text)

          expect($('.nhsuk-panel h3').text()).toEqual('YO This is the title of the solution')

          done();
        })
    })

    it('should render just the one simple section when provided', (done) => {
      const context = {
        solution: {
          ...basicSolutionWithNoSectionsContext.solution,
          sections: [aSimpleSection]
        }
      }
      
      const app = createDummyApp(context)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text)
          const section = $('[data-test-id="solution-sections"] > label')

          expect(section.length).toEqual(1)
          expect(section.find('label .nhsuk-label--s').text().trim()).toEqual('Simple Section')
          expect(section.find('p').text()).toEqual('This is the simple section')

          done();
        })
    })

    it('should render just the one section of type list when provided', (done) => {
      const context = {
        solution: {
          ...basicSolutionWithNoSectionsContext.solution,
          sections: [aListSection]
        }
      }
      
      const app = createDummyApp(context)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text)
          const section = $('[data-test-id="solution-sections"] > label')

          expect(section.length).toEqual(1)
          expect(section.find('label .nhsuk-label--s').text().trim()).toEqual('List Section')
          expect(section.find('p').length).toEqual(3)
          section.find('p').each((index, sectionValue) => {
            expect($(sectionValue).text()).toEqual(`- ${aListSection.value[index]}`)
          })

          done();
        })
    })

    it('should render multiple sections that are provided in the context', (done) => {
      const context = {
        solution: {
          ...basicSolutionWithNoSectionsContext.solution,
          sections: [aSimpleSection, aListSection]
        }
      }
      
      const app = createDummyApp(context)
      request(app)
        .get('/bang')
        .then(res => {
          const $ = cheerio.load(res.text)
          const section = $('[data-test-id="solution-sections"] > label')

          expect(section.length).toEqual(2)

          done();
        })
    })
})