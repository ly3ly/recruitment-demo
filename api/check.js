import apiClient from './axios';

export const updateCheck = (data) => apiClient.post('/api/endpoint', data);
export const fetchCheck = (data) => apiClient.post('/api/endpoint', data);