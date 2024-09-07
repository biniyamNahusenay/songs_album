import axios from 'axios';
import { StatisticsState } from '../slices/statSlice';
const base_url = "http://localhost:5000/song";

export const getStatisticsApi = async ():Promise<StatisticsState[]> => {
  try {
    const response = await axios.get(`${base_url}/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};