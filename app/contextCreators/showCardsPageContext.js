export const createShowCardPageContext = (solutionData) => {
  const context = {}
  const solutions = [];

  solutionData.map(solData => {
    const solution = {};
    solution.id = solData.id
    solution.name = solData.name

    const sections = []
    

    solData.marketingData.sections.map(s => {
        const section = {}

        section.id = s.id
        section.name = s.name
        section.value = s.data[0].value
    
        sections.push(section)
    })

    if (solData.capabilities) {
      const capabilitySection = {}
      capabilitySection.id = "capability-section"
      capabilitySection.name = "Capabilities"

      const capabilityValues = solData.capabilities.map(cap => cap.name)

      capabilitySection.value = capabilityValues
      sections.push(capabilitySection)
    }

    solution.sections = sections

    solutions.push(solution)
  
  })

  context.solutions = solutions


  return context
}