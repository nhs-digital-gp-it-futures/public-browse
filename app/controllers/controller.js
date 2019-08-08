import { createShowCardPageContext } from './../contextCreators/showCardsPageContext';
import axios from 'axios';

export const getShowCardsPageContext = async () => {
  const solutionData = await axios.get('http://localhost:5000/api/v1/solutions');

  const context = createShowCardPageContext(solutionData.data.solutions);

  return context;
}