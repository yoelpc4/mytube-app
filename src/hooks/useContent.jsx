import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { formatCount } from '../helpers.js';

export default function useContent(content) {
  const description = useMemo(() => content?.description ? content?.description.replaceAll("\n", '<br>') : '', [content?.description])

  const createdAt = useMemo(() => DateTime.fromISO(content?.createdAt).toRelative(), [content?.createdAt])

  const countViews = useMemo(() => formatCount(content?.countViews), [content?.countViews])

  const countLikes = useMemo(() => formatCount(content?.countLikes), [content?.countLikes])

  const countDislikes = useMemo(() => formatCount(content?.countDislikes), [content?.countDislikes])

  return {
    description,
    createdAt,
    countViews,
    countLikes,
    countDislikes,
  }
}
