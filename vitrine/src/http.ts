import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: `http://localhost:3000/`
  baseURL: `http://90.79.207.27:3000/`
});

export const getPrints = () => {
  return HTTP.get('/print').then(res => res.data).catch(e => e);
}