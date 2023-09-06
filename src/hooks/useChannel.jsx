import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/auth.js';
import { formatCount } from '@/utils/helpers.js'

export default function useChannel(initialChannel = null) {
  const user = useSelector(selectUser)

  const [channel, setChannel] = useState(initialChannel)

  const handleSubscribed = useCallback(() => setChannel(channel => ({
    ...channel,
    channelSubscriptions: [{subscriberId: user.id}],
    channelSubscriptionsCount: channel.channelSubscriptionsCount + 1,
  })), [user])

  const handleUnsubscribed = useCallback(() => setChannel(channel => ({
    ...channel,
    channelSubscriptions: [],
    channelSubscriptionsCount: channel.channelSubscriptionsCount - 1,
  })), [])

  return {
    channel,
    hasSubscribed: user && channel?.channelSubscriptions[0]?.subscriberId === user.id,
    subscribersCount: formatCount(channel?.channelSubscriptionsCount),
    contentsCount: formatCount(channel?.contentsCount),
    setChannel,
    handleSubscribed,
    handleUnsubscribed,
  }
}
