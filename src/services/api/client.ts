import axios from 'axios';

const apiHost = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const baseURL = `${apiHost}/api`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
