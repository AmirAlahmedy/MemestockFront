import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://18.217.163.16/api/'
});

export default instance;