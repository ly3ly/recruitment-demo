import apiClient from './axios';

export const updateCheck = (data) => apiClient.put('/subjects', data);
export const fetchCheck = () => apiClient.get('/subjects');