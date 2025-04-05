import { apiClient } from "./ApiClient";

export const getToDosForUserService =
    (username) => apiClient.get(`/todos/${username}/all`);

export const getToDosByIdService =
    (username, id) => apiClient.get(`/todos/${username}/${id}`);

export const deleteToDoService =
    (id) => apiClient.delete(`/todos/delete/${id}`);

const config = { headers: { 'Content-Type': 'application/json' } };
export const updateToDoService =
    (id, item) => apiClient.put(`/todos/update/${id}`, item, config);

export const addToDoService =
    (item) => apiClient.post('/todos/add', item, config);