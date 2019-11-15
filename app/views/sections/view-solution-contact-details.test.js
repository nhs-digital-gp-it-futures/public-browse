import request from 'supertest';
import express from 'express';
import nunjucks from 'nunjucks';
import cheerio from 'cheerio';
import { App } from '../../../app';

const createDummyApp = (context) => {
  const app = new App().createApp();

  const router = express.Router();
  const dummyRouter = router.get('/', (req, res) => {
    const macroWrapper = `{% from './sections/view-solution-contact-details.njk' import viewSolutionContactDetails %}
                            {{ viewSolutionContactDetails(section) }}`;

    const viewToTest = nunjucks.renderString(macroWrapper, context);

    res.send(viewToTest);
  });

  app.use(dummyRouter);

  return app;
};

describe('view-solution-contact-details', () => {
  it('should render the title of the section', (done) => {
    const context = {
      section: {},
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('h3').text().trim()).toEqual('Contact details');
        done();
      });
  });

  it('should not render the solution-contact-details section when not provided', (done) => {
    const context = {
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);

        expect($('[data-test-id="view-solution-contact-details"]').length).toEqual(0);
        done();
      });
  });

  it('should render the contact 1 title and contact details', (done) => {
    const contact1 = {
      'department-name': 'a contact dept',
      'contact-name': 'jim jones',
      'phone-number': '0111 111111',
      'email-address': 'jim@solution.com',
    };
    const context = {
      section: {
        answers: {
          'contact-1': contact1,
        },
      },
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const contact1component = $('[data-test-id="view-section-question-contact-1"]');

        expect(contact1component.find('[data-test-id="view-question-data-text-department-name"]').text().trim()).toEqual(contact1['department-name']);
        expect(contact1component.find('[data-test-id="view-question-data-text-contact-name"]').text().trim()).toEqual(contact1['contact-name']);
        expect(contact1component.find('[data-test-id="view-question-data-text-phone-number"]').text().trim()).toEqual(contact1['phone-number']);
        expect(contact1component.find('[data-test-id="view-question-data-text-email-address"]').text().trim()).toEqual(contact1['email-address']);
        done();
      });
  });

  it('should render the contact 2 title and question-contact-details component', (done) => {
    const contact2 = {
      'department-name': 'a second contact dept',
      'contact-name': 'jim jones jr',
      'phone-number': '0111 111112',
      'email-address': 'jim2@solution.com',
    };
    const context = {
      section: {
        answers: {
          'contact-2': contact2,
        },
      },
    };

    const dummyApp = createDummyApp(context);
    request(dummyApp)
      .get('/')
      .then((res) => {
        const $ = cheerio.load(res.text);
        const contact2component = $('[data-test-id="view-section-question-contact-2"]');

        expect(contact2component.find('[data-test-id="view-question-data-text-department-name"]').text().trim()).toEqual(contact2['department-name']);
        expect(contact2component.find('[data-test-id="view-question-data-text-contact-name"]').text().trim()).toEqual(contact2['contact-name']);
        expect(contact2component.find('[data-test-id="view-question-data-text-phone-number"]').text().trim()).toEqual(contact2['phone-number']);
        expect(contact2component.find('[data-test-id="view-question-data-text-email-address"]').text().trim()).toEqual(contact2['email-address']);
        done();
      });
  });
});
