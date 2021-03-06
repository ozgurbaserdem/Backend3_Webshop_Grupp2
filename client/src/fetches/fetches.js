import axios from 'axios';

axios.defaults.withCredentials = true;

/* const url = axios.create({
    baseURL: process.env.API_KEY || 'http://localhost:5000'
}); */

const url = axios.create({
    baseURL: 'https://stark-headland-25678.herokuapp.com'
});

export const loginUser = (payload) => url.post('/users/login', payload);
export const registerUser = (payload) => url.post('/users/register', payload);
export const logoutUser = () => url.get('users/logout');
export const getAllProducts = () => url.get('/products');
export const getSingleProduct = (id) => url.get(`/products/${id}`);
export const addProduct = (payload) => url.post(`/products/add`, payload);
export const editSingleProduct = (id, payload) => url.post(`/products/${id}`, payload);
export const deleteSingleProduct = (id) => url.delete(`/products/${id}`);
export const getAllOrders = () => url.get('/orders');
export const toggleOrderIsShipped = (id) => url.post(`/orders/${id}`);
export const getUser = () => url.get('/users');
export const getUserOrders = () => url.get('/orders/user');
export const getSingleOrder = (id) => url.get(`/orders/${id}`);
export const editUser = (payload) => url.post('/users/update', payload);

export const getCart = () => url.get('cart');

export const removeCartItem = (id) => url.post(`cart/delete/${id}`);

export const updateCart = (id, payload) => url.post(`cart/add/${id}`, payload);

export const placeOrder = (payload) => url.post('orders', payload);

export const deleteCart = () => url.post('cart/delete');
