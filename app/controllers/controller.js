import axios from 'axios';
import { createShowCardPageContext } from '../contextCreators/showCardsPageContext';

const config = {
  description: {
    showTitle: false,
  },
  features: {
    showTitle: true,
  },
  'capability-section': {
    showTitle: true,
    displayType: 'columns',
  },
};

export const getShowCardsPageContext = async () => {
  const solutionData = await axios.get('http://localhost:5000/api/v1/solutions');

  const context = createShowCardPageContext(solutionData.data.solutions, config);

  return context;
};
