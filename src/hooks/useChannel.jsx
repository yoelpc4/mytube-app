import { formatCount } from '@/utils/helpers.js'

export default function useChannel(channel) {
  return {
    countSubscribers: formatCount(channel?.countChannelSubscriptions),
    countContents: formatCount(channel?.countContents),
  }
}
