import axios from 'axios';

export const HTTP = axios.create({
  // baseURL: `http://localhost:3000/`
  baseURL: `https://diane-eshop.onrender.com/`
});

export const getPrints = () => {
  return HTTP.get('/print').then(res => res.data).catch(e => e);
}