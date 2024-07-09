import axios from "axios";

const axiosConfig = axios.create({
    baseURL: 'http://api.weatherapi.com/v1',
    params: {
        key: '5d13abf92c884a7c9dd164731230812'
    }
})