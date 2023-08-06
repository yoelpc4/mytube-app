import axios from 'axios';
import nprogress from 'nprogress';
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

        client.defaults.headers.common['x-csrf-token'] = config.headers['x-csrf-token'] = csrfToken

        return client(config)
    }

    return Promise.reject(error)
}

client.interceptors.request.use(fulfillRequest, rejectRequest)

client.interceptors.response.use(fulfillResponse, rejectResponse)

export default client
