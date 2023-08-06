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

    async logout() {
        await client.post('auth/logout')
    }

    async getUser() {
        const { data } = await client.get('auth/user')

        return data
    }

    async updateProfile(payload) {
        const { data } = await client.post('auth/update-profile', payload)

        return data
    }

    async updatePassword(payload) {
        const { data } = await client.post('auth/update-password', payload)

        return data
    }
}
