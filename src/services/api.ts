import axios from "axios";

const API_URL = 'https://my-json-server.typicode.com/richa-thakkar/jsonapi/tasks';

export const getTasks = () => axios.get(API_URL);


export const addTask = (task: any) => axios.post(API_URL, task);
export const updateTask = (id: number, task:any) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id:number) => axios.delete(`${API_URL}/${id}`);
