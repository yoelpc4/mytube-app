import axios from 'axios';
import nprogress from 'nprogress';
import store from '@/store'
import { setToken } from '@/store/csrf.js';
import CsrfService from '@/services/CsrfService.js';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true,
    xsrfCookieName: null,
    xsrfHeaderName: null,
})

const fulfillRequest = config => {
    const {csrf} = store.getState()

    if (!['get', 'head', 'options'].includes(config.method)) {
        config.headers['x-csrf-token'] = csrf.token
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

const rejectResponse = async error => {
    nprogress.done()

    const {config, response} = error

    if (response.status === 403 && response.data.message === 'Invalid CSRF token' && !config.isRetried) {
        config.isRetried = true

        const csrfService = new CsrfService()

        const { csrfToken } = await csrfService.getCsrfToken()

        store.dispatch(setToken(csrfToken))

        return client(config)
    }

    return Promise.reject(error)
}

client.interceptors.request.use(fulfillRequest, rejectRequest)

client.interceptors.response.use(fulfillResponse, rejectResponse)

export default client
