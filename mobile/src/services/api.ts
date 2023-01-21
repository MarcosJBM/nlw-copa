import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.2.106:3333',
  headers: {
    'Content-Type': 'application/json',
  },
});
