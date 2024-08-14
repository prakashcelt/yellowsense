import axios from 'axios';

const apiEndpoint = 'https://testapi.getlokalapp.com/common/jobs?page=';

export const fetchJobs = async (page) => {
  const response = await axios.get(`${apiEndpoint}+${page}`);
  return response.data.results;
};
