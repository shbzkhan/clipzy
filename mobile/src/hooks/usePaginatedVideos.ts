import { useEffect, useState } from 'react';
import { useGetVideosQuery } from '../redux/api/videoApi';
import { Video } from '../types/video.types';

interface UsePaginatedVideosProps {
  userId?: string;
  search?: string;
  initialPage?: number;
  limit?: number;
}

export const usePaginatedVideos = ({
  userId,
  search,
  initialPage = 1,
}: UsePaginatedVideosProps) => {
  const [page, setPage] = useState(initialPage);
  const [videos, setVideos] = useState<Video[]>([]);

  const { data, isLoading, isFetching, refetch } = useGetVideosQuery({
    page,
    userId,
    search,
  });

  useEffect(() => {
    if (page === 1) {
      setVideos(data?.docs);
    } else {
      const combinedVideos =
        page === 1 ? data?.docs : [...videos, ...data?.docs];
      const uniqueVideo = Array.from(
        new Map(combinedVideos?.map(video => [video._id, video])).values(),
      );
      setVideos(uniqueVideo);
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
    videos,
    isLoading,
    isFetching,
    page,
    handleLoadMore,
    handleRefresh,
    totalVideos: data?.totalDocs,
  };
};
