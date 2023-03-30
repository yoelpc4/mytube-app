import client from './client.js';

export default class ContentService {
  async getContentFeeds(params = {}) {
    const { data } = await client.get('contents/feeds', {
      params,
    })

    return data
  }

  async getContentHistories(params = {}) {
    const { data } = await client.get('contents/histories', {
      params,
    })

    return data
  }

  async findContent(id) {
    const { data } = await client.get(`contents/${id}`)

    return data
  }

  async likeContent(id) {
    const { data } = await client.post(`contents/${id}/like`)

    return data
  }

  async dislikeContent(id) {
    const { data } = await client.post(`contents/${id}/dislike`)

    return data
  }
}
