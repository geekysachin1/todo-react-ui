import { apiClient } from "./ApiClient";

export const loginServiceBasic =
    (request) => apiClient.post('/user/login', request);