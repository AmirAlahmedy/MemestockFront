import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://18.217.163.16/api/'
    // baseURL: 'http://localhost:4000/'
});

export default instance;