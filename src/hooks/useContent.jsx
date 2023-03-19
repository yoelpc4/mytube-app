import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { formatNumberPreview } from '../helpers.js';

export default function useContent(content) {
  const description = useMemo(() => content.description ? content.description.replaceAll("\n", '<br>') : '', [content.description])

  const createdAt = useMemo(() => DateTime.fromISO(content.createdAt).toRelative(), [content.createdAt])

  const countViews = useMemo(() => {
    if (!content._count) {
      return null
    }

    if (content._count.contentViews < 1_000) {
      return content._count.contentViews
    }

    if (content._count.contentViews < 1_000_000) {
      const contentViews = content._count.contentViews / 1_000

      if (content._count.contentViews >= 10_000) {
        return `${formatNumberPreview(contentViews)}K`
      }

      return `${formatNumberPreview(contentViews, 1)}K`
    }

    if (content._count.contentViews < 1_000_000_000) {
      const contentViews = content._count.contentViews / 1_000_000

      if (content._count.contentViews >= 10_000_000) {
        return `${formatNumberPreview(contentViews)}M`
      }

      return `${formatNumberPreview(contentViews, 1)}M`
    }

    if (content._count.contentViews < 1_000_000_000_000) {
      const contentViews = content._count.contentViews / 1_000_000_000

      if (content._count.contentViews >= 10_000_000_000_000) {
        return `${formatNumberPreview(contentViews)}B`
      }

      return `${formatNumberPreview(contentViews, 1)}B`
    }

    const contentViews = content._count.contentViews / 1_000_000_000_000

    if (content._count.contentViews >= 10_000_000_000_000_000) {
      return `${formatNumberPreview(contentViews)}T`
    }

    return `${formatNumberPreview(contentViews, 1)}T`
  }, [content._count?.contentViews])

  return {
    countViews,
    createdAt,
    description,
  }
}
