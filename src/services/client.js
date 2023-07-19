import axios from 'axios';
import nprogress from 'nprogress';
import {KEY_ACCESS_TOKEN} from '@/constants.js';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

const fulfillRequest = config => {
    const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN)

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (nprogress.isStarted()) {
        nprogress.inc()
    } else {
        nprogress.start()
    }

    return config
}

const rejectRequest = error => {
    nprogress.done()

    return Promise.reject(error)
}

const fulfillResponse = response => {
    nprogress.done()

    return response
}

const rejectResponse = error => {
    nprogress.done()

    return Promise.reject(error)
}

client.interceptors.request.use(fulfillRequest, rejectRequest)

client.interceptors.response.use(fulfillResponse, rejectResponse)

export default client
