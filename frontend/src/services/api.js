import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || `http://localhost:${import.meta.env.VITE_API_PORT || 5000}`;
axios.defaults.withCredentials = true;

export default axios;
