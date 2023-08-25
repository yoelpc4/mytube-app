import { useCallback, useState } from 'react';
import { DateTime } from 'luxon'
import { formatCount } from '@/utils/helpers.js'

export default function useContent(initialContent = null) {
  const [content, setContent] = useState(initialContent)

  const handleLiked = useCallback(() => setContent(content => ({
    ...content,
    likesCount: content.likesCount + (content.isLiked ? -1 : 1),
    dislikesCount: content.dislikesCount + (content.isDisliked ? -1 : 0),
    isLiked: !content.isLiked,
    isDisliked: false,
  })), [])

  const handleDisliked = useCallback(() => setContent(content => ({
    ...content,
    likesCount: content.likesCount + (content.isLiked ? -1 : 0),
    dislikesCount: content.dislikesCount + (content.isDisliked ? -1 : 1),
    isLiked: false,
    isDisliked: !content.isDisliked,
  })), [])

  return {
    content,
    description: content?.description ? content?.description.replaceAll("\n", '<br>') : '',
    createdAt: DateTime.fromISO(content?.createdAt).toRelative(),
    viewsCount: formatCount(content?.viewsCount),
    likesCount: formatCount(content?.likesCount),
    dislikesCount: formatCount(content?.dislikesCount),
    setContent,
    handleLiked,
    handleDisliked,
  }
}
