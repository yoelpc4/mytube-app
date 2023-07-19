import { useMemo } from 'react';
import { formatCount } from '@/helpers.js';

export default function useChannel(channel) {
  const countSubscribers = useMemo(() => formatCount(channel?.countChannelSubscriptions), [channel?.countChannelSubscriptions])

  const countContents = useMemo(() => formatCount(channel?.countContents), [channel?.countContents])

  return {
    countSubscribers,
    countContents,
  }
}
