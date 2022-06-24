import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

export const publicAPI = axios.create({
  baseURL: API_URL
});

