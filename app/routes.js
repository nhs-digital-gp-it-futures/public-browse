// External dependencies
const express = require('express');

// Initialise router
const router = express.Router();

router.get('/', (req, res) => {
  const context = {
    capabilities: [
      {
        text: "capability A",
        value: "capability A",
        checked: false
      },
      {
        text: "capability B",
        value: "capability B",
        checked: false
      },
      {
        text: "capability C",
        value: "capability C",
        checked: false
      },
      {
        text: "capability D",
        value: "capability D",
        checked: false
      },
      {
        text: "capability E",
        value: "capability E",
        checked: false
      },
      {
        text: "capability F",
        value: "capability F",
        checked: false
      }
    ],
    solutions: [
        {
          id: "00001",
          name: "The first solution",
        sections: [
          {
            name: "Description",
            value: "First the worse",
          },
          {
            name: "Features",
            value: [
              "feature 1",
              "feature 2",
              "feature 3",
            ],
          },
        ],
      },
      {
        id: "00002",
        name: "The second solution",
        sections: [
          {
            name: "Description",
            value: "Second the best",
          },
          {
            name: "Features",
            value: [
              "feature 4",
              "feature 5",
              "feature 6",
            ],
          },
          {
            name: "SAy WhaTTT!!! lots",
            value: [
              "WHatttt!!!",
              "WHatttt!!! whattt!!",
            ]
          }
        ],
      },
      {
        id: "00003",
        name: "The third solution",
        sections: [
          {
            name: "Description",
            value: "Third the one with the hairy chest",
          },
          {
            name: "Features",
            value: [
              "feature 7",
              "feature 8",
              "feature 9",
            ],
          },
          {
            name: "SAy WhaTTT!!! once",
            value: "WHatttt!!!"
          }
        ],
      }
    ]
  }

  res.render('index', context);
});

module.exports = router;
