import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cdn.jsdelivr.net/npm/@rocketleagueapi/items/src/',
    timeout: 20000,
});

export default api;