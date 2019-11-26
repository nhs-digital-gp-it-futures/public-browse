import express from 'express';
import { App } from '../../app';
import nunjucks from 'nunjucks';

export const testHarness = () => {
  const app = new App().createApp();
  const router = express.Router();

  return {
    createComponentDummyApp(template, context) {
      const dummyRouter = router.get('/', (req, res) => {
        res.render(template, context);
      });
      app.use(dummyRouter);
      return app;
    },
    createTemplateDummyApp (template, context) {
      const dummyRouter = router.get('/', (req, res) => {
        const viewToTest = nunjucks.renderString(template, context);
        res.send(viewToTest);
      });
      app.use(dummyRouter);
      return app;
    }
    
  }
}
