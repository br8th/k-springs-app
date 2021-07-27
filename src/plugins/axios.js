import axios from 'axios';
import config from '../config';

window.axios = axios;
window.axios.defaults.baseURL = config.api_url;
