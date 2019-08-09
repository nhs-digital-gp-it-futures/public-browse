import { createShowCardPageContext } from './../contextCreators/showCardsPageContext';
import axios from 'axios';

const config = {
  "description": {
    showTitle: false,
    columns: 1
  },
  "features": {
    showTitle: true,
    columns: 1
  },
  "capability-section": {
    showTitle: true,
    columns: 2
  }
}


export const getShowCardsPageContext = async () => {
  const solutionData = await axios.get('http://localhost:5000/api/v1/solutions');

  const context = createShowCardPageContext(solutionData.data.solutions);

  return context;
}