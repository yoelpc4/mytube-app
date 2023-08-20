import axios from 'axios'
import nprogress from 'nprogress'
import store from '@/store';
import { unsetUser } from '@/store/auth.js';

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

    if (response && (!config.retry || config.retry < 2)) {
        config.retry = (config.retry ?? 0) + 1

        if (response.status === 401) {
            if (config.url === 'auth/refresh'){
                store.dispatch(unsetUser())

                return Promise.reject(error)
            }

            try {
                await client.post('auth/refresh', null, {
                    retry: config.retry,
                })

                return client(config)
            } catch {
                // no-op
            }
        } else if (response.status === 403 && response.data.message === 'Invalid CSRF token') {
            try {
                const {data} = await client.get('csrf-token', {
                    retry: config.retry,
                })

                client.defaults.headers.common['x-csrf-token'] = config.headers['x-csrf-token'] = data.csrfToken

                return client(config)
            } catch {
                // no-op
            }
        }
    }

    return Promise.reject(error)
}

client.interceptors.request.use(fulfillRequest, rejectRequest)

client.interceptors.response.use(fulfillResponse, rejectResponse)

export default client
