import { useEffect, useState } from 'react';
import { Video } from '../types/video';
import { useVideoCommentsQuery } from '../redux/api/commentApi';

interface UsePaginatedVideosProps {
  videoId?: string
  initialPage?: number;
}

export const usePaginatedComments = ({ videoId, initialPage = 1 }:UsePaginatedVideosProps) => {
  const [page, setPage] = useState(initialPage);
  const [comments, setComments] = useState<Video[]>([]);

  const { data, isLoading, isFetching, refetch } = useVideoCommentsQuery({ videoId, page });

  useEffect(() => {
    if (page === 1) {
      setComments(data?.docs);
    } else {
      const combinedComment =
        page === 1 ? data?.docs : [...comments, ...data?.docs];
      const uniqueComment = Array.from(
        new Map(combinedComment?.map(comment => [comment._id, commnet])).values(),
      );
      setComments(uniqueComment);
    }
  }, [data, page]);

  const handleRefresh = () => {
    setPage(1);
    refetch();
  };

  const handleLoadMore = () => {
    if (!isFetching && data?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  return {
    comments,
    isLoading,
    isFetching,
    page,
    handleLoadMore,
    handleRefresh,
    totalComments:data?.totalDocs
  };
};
