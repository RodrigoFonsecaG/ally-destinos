import axios from 'axios';

const api = axios.create({
    baseURL: 'https://amazon-api.sellead.com/',
});

export default api;
