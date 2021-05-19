import { useMutation, useQuery } from 'react-query';
import { UserRes } from './authQueries';
import { getFetch, postFetch } from './defaults';
import { queryClient } from '../components/app/App';

export const VIDEO_CHANNEL_CACHE_KEY = 'video_channel';

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

const getVideoChannelUsers = async (chan_id: number) =>
  getFetch(`/vidchan/${chan_id}`)
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Authentication Error');;
      }
    })
    .catch((e) => {
      console.error('POST REQUEST ERROR', e);
      throw e;
    });
export const useGetVideoChannelUsersQuery = (chan_id: number) =>
  useQuery<UserRes[]>([VIDEO_CHANNEL_CACHE_KEY + ":users", chan_id], () => getVideoChannelUsers(chan_id));






const addUserVideoChannel = async ({ chan_id, user }: { chan_id: number, user: UserRes }): Promise<[number, UserRes]> =>
  getFetch(`/textchan/add/${chan_id}/${user.user_id}`)
    .then((res) => {
      console.log(res);
      if (res.ok) {
        const returnVal: [number, UserRes] = [chan_id, user]
        return returnVal;
      } else {
        throw new Error('Authentication Error');
      }
    })
    .catch((e) => {
      console.error('POST REQUEST ERROR', e);
      throw e;
    });

export const useAddUserVideoChannelQuery = () => useMutation<[number, UserRes], Error, { chan_id: number, user: UserRes }, any>(
  addUserVideoChannel, {
  onSuccess: (data) => {
    queryClient.setQueryData<UserRes[]>([VIDEO_CHANNEL_CACHE_KEY + ":users", data[0]], (oldUsers) => oldUsers ? [...oldUsers, data[1]] : [data[1]])
  },
})