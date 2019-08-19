import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../app';

const capability = (text, value, checked = false) => ({
  text,
  value,
  checked,
});

const basicContext = {
  capabilities: [],
};

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './capability-filters.njk' import capabilityFilters %}
                          {{ capabilityFilters(capabilities) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};


describe('capability-filters', () => {
  it('should render the legend of the filters', (done) => {
    const context = {
      ...basicContext,
      capabilities: [capability('some capability', 'cap1')],
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('.nhsuk-fieldset > legend').text().trim()).toEqual('Filter your capabilites?');

        done();
      });
  });

  it('should render a single capability that is not selected', (done) => {
    const context = {
      ...basicContext,
      capabilities: [capability('some capability', 'cap1')],
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const checkboxes = $('.nhsuk-checkboxes__item');

        expect(checkboxes.length).toEqual(1);
        expect(checkboxes.find('label').text().trim()).toEqual('some capability');
        expect(checkboxes.find('input').attr('type')).toEqual('checkbox');
        expect(checkboxes.find('input').attr('checked')).toBeUndefined();
        done();
      });
  });

  it('should render a single capability that is selected', (done) => {
    const context = {
      ...basicContext,
      capabilities: [capability('some capability', 'cap1', true)],
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const checkboxes = $('.nhsuk-checkboxes__item');

        expect(checkboxes.find('input').attr('checked')).toEqual('checked');
        done();
      });
  });

  it('should render a list of unchecked capabilities', (done) => {
    const context = {
      ...basicContext,
      capabilities: [capability('cap 1', 'cap1'), capability('cap 2', 'cap2')],
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        const checkboxes = $('.nhsuk-checkboxes__item');

        expect(checkboxes.length).toEqual(2);
        checkboxes.each((checkbox) => {
          expect($(checkbox).find('input').attr('checked')).toBeUndefined();
        });
        done();
      });
  });

  it('should only check those capabilities that are marked as checked', (done) => {
    const context = {
      ...basicContext,
      capabilities: [capability('cap 1', 'cap1'), capability('cap 2', 'cap2', true), capability('cap 3', 'cap3')],
    };

    const app = createDummyApp(context);
    request(app)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('.nhsuk-checkboxes__item:nth-child(1)').find('input').attr('checked')).toBeUndefined();
        expect($('.nhsuk-checkboxes__item:nth-child(2)').find('input').attr('checked')).toEqual('checked');
        expect($('.nhsuk-checkboxes__item:nth-child(3)').find('input').attr('checked')).toBeUndefined();
        done();
      });
  });
});
