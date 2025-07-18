'use client';

import { VideoWithCategoryType } from '@/app/types';
import { Button, Card, Text } from '@mantine/core';
import Image from 'next/image';
import { getYouTubeVideoId } from '@/app/(authenticated)/videos/utils';

interface VideoCardProps {
  video: VideoWithCategoryType;
}

function getThumbnailUrl(video: VideoWithCategoryType): string {
  if (video.thumbnail_path) {
    return video.thumbnail_path;
  }

  const videoId = getYouTubeVideoId({ url: video.url });
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return "/default_video_thumbnail.png";
}

export function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = getThumbnailUrl(video);
  return (
    <Card component="a" href={`/videos/${video.id}`} shadow="sm" padding="0" radius="md" w="100%" withBorder className="hover:shadow-lg transition-shadow">
      <Card.Section>
        <div className="aspect-video mx-auto" style={{ position: 'relative' }}>
          <Image
            src={thumbnailUrl}
            alt={video.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Card.Section>
      <Card.Section p="md">
        <Text fw={700} size="lg" mb="xs">{video.name}</Text>
        <Text component="div" lineClamp={2} c="dimmed" mb="md">
          {video.description}
        </Text>
        <Button component="div" radius="md" size="compact-sm" c="rgb(23,23,23)" bg="gray.2" fs="0.875rem">
          {video.category?.name}
        </Button>
      </Card.Section>
    </Card>
  );
}
