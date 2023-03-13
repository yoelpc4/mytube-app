import client from './client.js';

export default class AuthService {
    async register(payload) {
        const { data } = await client.post('auth/register', payload)

        return data
    }

    async login(payload) {
        const { data } = await client.post('auth/login', payload)

        return data
    }

    async getUser() {
        const { data } = await client.get('auth/user')

        return data
    }
}
