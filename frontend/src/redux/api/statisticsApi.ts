import axios from 'axios';
const base_url = "http://localhost:5000/song";

export const getStatisticsApi = async () => {
  try {
    const response = await axios.get(`${base_url}/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};