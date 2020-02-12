import axios from 'axios';

export const createRequest = async (method, url, data) => axios({
  method,
  url,
  data,
})
  .then(response => response)
  .catch(async (error) => {
    console.error(error);
  });
