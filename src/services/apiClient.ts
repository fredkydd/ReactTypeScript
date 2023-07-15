import axios from 'axios';

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    apiKey: 'key is for HTTP request',
  },
});
