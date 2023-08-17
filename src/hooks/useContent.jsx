import { DateTime } from 'luxon'
import { formatCount } from '@/utils/helpers.js'

export default function useContent(content) {
  return {
    description: content?.description ? content?.description.replaceAll("\n", '<br>') : '',
    createdAt: DateTime.fromISO(content?.createdAt).toRelative(),
    countViews: formatCount(content?.countViews),
    countLikes: formatCount(content?.countLikes),
    countDislikes: formatCount(content?.countDislikes),
  }
}
