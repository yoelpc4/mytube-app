import client from './client.js';

export default class ChannelService {
  async findChannel(username) {
    const { data } = await client.get(`channels/${username}`)

    return data
  }

  async getChannelContents(id, params = {}) {
    const { data } = await client.get(`channels/${id}/contents`, {
      params,
    })

    return data
  }

  async subscribe(id) {
    const { data } = await client.post(`channels/${id}/subscribe`)

    return data
  }

  async unsubscribe(id) {
    const { data } = await client.post(`channels/${id}/unsubscribe`)

    return data
  }
}
