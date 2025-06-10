import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'test' 
  ?  import.meta.env.VITE_API_URL 
  :  import.meta.env.VITE_API_URL; // TODO: Replace with actual API URL in production

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api }; 
