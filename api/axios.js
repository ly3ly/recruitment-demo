import axios from 'axios';
const baseURL = 'https://qibyjk53c5.execute-api.ap-southeast-1.amazonaws.com';
const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
