import axios from 'axios';

const api = axios.create({
    baseURL: 'https://code-challenge.spectrumtoolbox.com/api/',
    headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt'
    },
});

export const getRestaurants = () => api.get('/restaurants');

export default api;