import axios from "axios";

export const BASE_URL = 'https://munchies-api.up.railway.app';


const todoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const getProducts = async () => {
  const res = await todoApi.get('/products');
  return res.data;
}

export const addOrder = async (order) => {
  const res = await todoApi.post('/order', order);
  return res.data;
}