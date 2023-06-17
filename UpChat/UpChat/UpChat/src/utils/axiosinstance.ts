import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;


const api = axios.create({
    baseURL:BASE_URL
});

api.interceptors.request.use((config) => {



    return config;
});

export default  api;