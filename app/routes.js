import express from 'express';
import {
  getShowCardsPageContext,
  getSolutionPageContext,
  postCapabilityFilters,
  getFoundationCapabilitySolutions,
} from './controller';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home-page', {});
});
router.get('/view-solution/:solutionId', async (req, res) => {
  const context = {
    id: 'S100000-001',
    name: 'Write on Time',
    organisationName: 'Really Kool Corporation',
    isFoundation: true,
    lastUpdated: 'a date',
    sections: {
      'solution-description': {
        answers: {
          summary: 'Write on Time is a Citizen-facing Appointments Management system specifically designed to reduce the number of DNAs in your practice.',
          description: 'a description',
          link: 'link.com',
        },
      },
      'contact-details': {
        answers: {
          'contact-1': {
            'department-name': 'a contact dept',
            'contact-name': 'jim jones',
            'phone-number': '0111 111111',
            'email-address': 'jim@solution.com',
          },
          'contact-2': {
            'department-name': 'a second contact dept',
            'contact-name': 'jacky johnston',
            'phone-number': '0222 222222',
            'email-address': 'jacky@solution.com',
          },
        },
      },
      capabilities: {
        answers: {
          'capabilities-met': ['capability 1', 'capability 2', 'capability 3'],
        },
      },
    },
  };
  res.render('view-solution-page', context);
});

router.get('/browse-solutions', async (req, res) => {
  res.render('browse-solutions-page', {});
});

// router.get('/', async (req, res) => {
//   const context = await getShowCardsPageContext();

//   res.render('index', context);
// });

// router.get('/foundation', async (req, res) => {
//   const context = await getFoundationCapabilitySolutions();

//   res.render('index', context);
// });

// router.get('/view/:solutionId', async (req, res) => {
//   const { solutionId } = req.params;

//   const context = await getSolutionPageContext(solutionId);

//   res.render('solution-page', context);
// });

// router.post('/', async (req, res) => {
//   const selectedCapabilities = req.body;

//   const context = await postCapabilityFilters(selectedCapabilities);

//   res.render('index', context);
// });

module.exports = router;
