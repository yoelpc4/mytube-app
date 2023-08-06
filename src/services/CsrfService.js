import client from '@/services/client.js';

export default class CsrfService {
  async getCsrfToken() {
    const { data } = await client.get('csrf-token')

    return data
  }
}
