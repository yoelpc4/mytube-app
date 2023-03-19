import client from './client.js';

export default class ContentService {
  async getPublishedContents(params = {}) {
    const { data } = await client.get('contents/published', {
      params,
    })

    return data
  }

  async findContent(id) {
    const { data } = await client.get(`contents/${id}`)

    return data
  }
}
