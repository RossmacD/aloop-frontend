import { queryCache, useMutation, useQuery } from 'react-query';
import { getFetch, postFetch } from './defaults';

const VIDEO_CHANNEL_CACHE_KEY = 'video_channel';

export interface VideoChannelRes {
  video_channel_id: number;
  channel_name: string;
  created_at: string;
}

const getVideoChannels = async () =>
  getFetch('/vidchan')
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Authentication Error');
      }
    })
    .catch((e) => {
      console.error('POST REQUEST ERROR', e);
      throw e;
    });

export const useGetVideoChannelQuery = () =>
  useQuery<VideoChannelRes[]>(VIDEO_CHANNEL_CACHE_KEY, getVideoChannels);
