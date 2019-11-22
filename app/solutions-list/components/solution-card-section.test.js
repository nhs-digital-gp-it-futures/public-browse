import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const aSimpleSection = (showTitle = true) => ({
  section: {
    id: 'simple-section',
    name: 'Simple Section',
    value: 'This is the simple section',
    showTitle,
  },
});

const aListSection = {
  section: {
    id: 'list-section',
    name: 'List Section',
    value: [
      'value 1',
      'value 2',
      'value 3',
    ],
    showTitle: true,
  },
};

const aColumnSection = {
  section: {
    id: 'column-section',
    name: 'Column Section',
    value: {
      column1: ['Capability A', 'Capability B'],
      column2: ['Capability C'],
    },
    showTitle: true,
    displayType: 'columns',
  },
};


const createDummyApp = (context, showAnchor = false) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from 'solutions-list/components/solution-card-section.njk' import solutionCardSection %}
                          {{ solutionCardSection(section, ${showAnchor}) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};


describe('solution-card', () => {
  it('should render the title of the section', (done) => {
    const dummyApp = createDummyApp(aSimpleSection());
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('label .nhsuk-label--s').text().trim()).toEqual('Simple Section');

        done();
      });
  });

  it('should not render the title of the section if the showTitle flag is false', (done) => {
    const dummyApp = createDummyApp(aSimpleSection(false));
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('label .nhsuk-label--s').length).toEqual(0);

        done();
      });
  });

  it('should render the title of the section as an anchor', (done) => {
    const dummyApp = createDummyApp(aSimpleSection(), true);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('a').attr('name')).toEqual('simple-section');

        done();
      });
  });

  it('should not render the title of the section as an anchor if showAnchor is false', (done) => {
    const dummyApp = createDummyApp(aSimpleSection(), false);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('a').length).toEqual(0);

        done();
      });
  });

  it('should render the value of the section', (done) => {
    const dummyApp = createDummyApp(aSimpleSection());
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('p').text().trim()).toEqual('This is the simple section');
        expect($('[data-test-id="simple-section-value"]').length).toEqual(1);

        done();
      });
  });

  it('should render all the values of the section when it is an array', (done) => {
    const dummyApp = createDummyApp(aListSection);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const sectionValues = $('[data-test-id="list-section-value"]');

        expect(sectionValues.length).toEqual(3);
        sectionValues.each((index, sectionValue) => {
          expect($(sectionValue).text()).toEqual(`- ${aListSection.section.value[index]}`);
        });

        done();
      });
  });

  it('should render the values in columns if the displayType of the section is config', (done) => {
    const dummyApp = createDummyApp(aColumnSection);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const column1 = $('[data-test-id="section-column1"]');
        const column2 = $('[data-test-id="section-column2"]');

        expect($('[data-test-id="column-section-value"]').length).toEqual(3);
        expect(column1.length).toEqual(1);
        expect(column1.find('p').length).toEqual(2);
        column1.find('p').each((index, sectionValue) => {
          expect($(sectionValue).text()).toEqual(`- ${aColumnSection.section.value.column1[index]}`);
        });

        expect(column2.length).toEqual(1);
        expect(column2.find('p').length).toEqual(1);
        column2.find('p').each((index, sectionValue) => {
          expect($(sectionValue).text()).toEqual(`- ${aColumnSection.section.value.column2[index]}`);
        });

        done();
      });
  });
});
