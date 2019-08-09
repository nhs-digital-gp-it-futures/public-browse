import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../app';

const aSimpleSection = (showTitle = true) => ({
  section: {
    name: "Simple Section",
    value: "This is the simple section",
    showTitle,
    columns: 1
  }
});

const aListSection = {
  section: {
    name: "List Section",
    value: [
      "value 1",
      "value 2",
      "value 3",
    ],
    showTitle: true,
    columns: 1
  }
}

const createDummyApp = (context) => {
  const app = new App().createApp()

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './solution-card-section.njk' import solutionCardSection %}
                          {{ solutionCardSection(section) }}`

    const a = nunjucks.renderString(macroWrapper, context)

    res.send(a)
  })

  app.use(dummyRouter)

  return app;
}


describe('solution-card', () => {
  it('should render the title of the section', (done) => {
    const dummyApp = createDummyApp(aSimpleSection())
    request(dummyApp)
      .get('/')
      .then(res => {
        const $ = cheerio.load(res.text)

        expect($('label .nhsuk-label--s').text().trim()).toEqual('Simple Section')

        done();
      })
  })

  it('should not render the title of the section if the showTitle flag is false', (done) => {
    const dummyApp = createDummyApp(aSimpleSection(false))
    request(dummyApp)
      .get('/')
      .then(res => {
        const $ = cheerio.load(res.text)

        expect($('label .nhsuk-label--s').length).toEqual(0)

        done();
      })
  })

  it('should render the value of the section', (done) => {
    const dummyApp = createDummyApp(aSimpleSection())
    request(dummyApp)
      .get('/')
      .then(res => {
        const $ = cheerio.load(res.text)

        expect($('p').text().trim()).toEqual('This is the simple section')

        done();
      })
  })

  it('should render all the values of the section when it is an array', (done) => {
    const dummyApp = createDummyApp(aListSection)
    request(dummyApp)
      .get('/')
      .then(res => {
        const $ = cheerio.load(res.text)

        expect($('p').length).toEqual(3)
        $('p').each((index, sectionValue) => {
          expect($(sectionValue).text()).toEqual(`- ${aListSection.section.value[index]}`)
        })

        done();
      })
  })
})