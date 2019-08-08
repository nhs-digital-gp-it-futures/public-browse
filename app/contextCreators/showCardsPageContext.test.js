import { createShowCardPageContext, applySectionConfig } from './showCardsPageContext'

const dummySection = (sectionName, sectionValue) => ({
  "id": sectionName.toLowerCase().replace(' ', '-'),
  "name": sectionName,
  "data": [
    {
      "id": "some-id",
      "name": "Some Name",
      "value": sectionValue,
    }
  ],
})

const dummySolutionData = (id, name, sections, capabilities) => ({
  "id": id,
  "name": name,
  "marketingData": {
    "manifestId": "buying-catalogue-live",
    "sections": sections
  },
  "capabilities": capabilities
})


describe('showCardsPageContext', () => {
  it('should create a context for one solution with one section', () => {
    const expectedContext = {
      solutions: [
        {
          id: "00001",
          name: "The first solution",
          sections: [
            {
              id: "first-section",
              name: "First Section",
              value: "First Section Value",
            },
          ],
        }
      ]
    }

    const oneSolutionWithOneSection = [dummySolutionData('00001', 'The first solution', 
      [dummySection('First Section', 'First Section Value')])]

    const context = createShowCardPageContext(oneSolutionWithOneSection)

    expect(context).toEqual(expectedContext)
  })

  it('should create a context for one solution with two sections', () => {
    const expectedContext = {
      solutions: [
        {
          id: "00001",
          name: "The first solution",
          sections: [
            {
              id: "first-section",
              name: "First Section",
              value: "First Section Value",
            },
            {
              id: "second-section",
              name: "Second Section",
              value: ["Second section value 1", "Second section value 2", "Second section value 3"],
            },
          ],
        }
      ]
    }

    const oneSolutionWithTwoSections = [dummySolutionData('00001', 'The first solution', 
      [dummySection('First Section', 'First Section Value'), 
      dummySection('Second Section', ["Second section value 1", "Second section value 2", "Second section value 3"])])]

    const context = createShowCardPageContext(oneSolutionWithTwoSections)

    expect(context).toEqual(expectedContext)
  })

  it('should create a context for 2 solutions with 1 section each', () => {
    const expectedContext = {
      solutions: [
        {
          id: "00001",
          name: "The first solution",
          sections: [
            {
              id: "first-section",
              name: "First Section",
              value: "First Solution Section Value",
            },
          ],
        },
        {
          id: "00002",
          name: "The second solution",
          sections: [
            {
              id: "first-section",
              name: "First Section",
              value: "Second Solution Section Value",
            },
          ],
        }
      ]
    }

    const oneSolutionWithTwoSections = 
      [dummySolutionData('00001', 'The first solution', [dummySection('First Section', 'First Solution Section Value')]),
      dummySolutionData('00002', 'The second solution', [dummySection('First Section', 'Second Solution Section Value')])
    ]

    const context = createShowCardPageContext(oneSolutionWithTwoSections)

    expect(context).toEqual(expectedContext)
  })

  it('should create a context with the capabilities added to the section', () => {
    const expectedContext = {
      solutions: [
        {
          id: "00001",
          name: "The first solution",
          sections: [
            {
              id: "first-section",
              name: "First Section",
              value: "First Solution Section Value",
            },
            {
              id: "capability-section",
              name: "Capabilities",
              value: ["Capability A", "Capability B"],
            },
          ],
        },
      ]
    }

    const capabilities = [{id: "001", name: "Capability A"}, {id: "002", name: "Capability B"}]

    const oneSolutionWithASectionAndCapabilities = 
      [
        dummySolutionData('00001', 'The first solution', [dummySection('First Section', 'First Solution Section Value')], capabilities),
      ]

    const context = createShowCardPageContext(oneSolutionWithASectionAndCapabilities)

    expect(context).toEqual(expectedContext)
  })
})

describe('applySectionConfig', () => {
  it('should only return sections defined in the config', () => {
    const expectedContext = [
      {
        id: "first-section",
        name: "First Section",
        value: "First Section Value",
      }
    ]


    const config = {
      "first-section": {}
    }

    const initialContext = [
      {
        id: "first-section",
        name: "First Section",
        value: "First Section Value",
      },
      {
        id: "unknown-section",
        name: "Unknown Section",
        value: "Unknown Section Value",
      },
    ]

    const context = applySectionConfig(initialContext, config)

    expect(context).toEqual(expectedContext)
  })

  it('should decorate a section with the config provided for that section', () => {
    const expectedContext = [
      {
        id: "first-section",
        name: "First Section",
        value: "First Section Value",
        showTitle: false
      }
    ]


    const config = {
      "first-section": {
        showTitle: false
      }
    }

    const initialContext = [
      {
        id: "first-section",
        name: "First Section",
        value: "First Section Value",
      }
    ]

    const context = applySectionConfig(initialContext, config)

    expect(context).toEqual(expectedContext)
  })
})