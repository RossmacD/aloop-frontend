import { useMutation, useQuery } from 'react-query';
import { getFetch, postFetch } from './defaults';
import { queryClient } from '../components/app/App';

const NEW_MESSAGE_PATH = 'message/new'

const TEXT_CHANNEL_CACHE_KEY = 'text_channel';
export const TEXT_CHANNEL_MESSAGES_CACHE_KEY = 'text_channel_messages';

export interface TextChannelRes {
  text_channel_id: number;
  channel_name: string;
  created_at: string;
}

export interface MessageRes {
  message_id: number,
  contents: String,
  author_id: number,
  text_channel_id: number,
  seen: boolean,
  created_at: String
}


export interface MessageInput {
  contents: String,
  text_channel_id: number
}

const getTextChannels = async () =>
  getFetch('/textchan')
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


const getTextChannelMessages = async (chan_id: number) =>
  getFetch(`/messages/chan/${chan_id}`)
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


const postMessage = async (messageInput: MessageInput) => postFetch<MessageInput>(NEW_MESSAGE_PATH, messageInput).then((res) => res.json())
  .catch((e) => {
    console.error('POST REQUEST ERROR', e);
    throw e;
  });;




export const useGetTextChannelQuery = () =>
  useQuery<TextChannelRes[]>(TEXT_CHANNEL_CACHE_KEY, getTextChannels);



export const useGetTextChannelMessagesQuery = (chan_id: number) =>
  useQuery<MessageRes[]>([TEXT_CHANNEL_MESSAGES_CACHE_KEY, chan_id], () => getTextChannelMessages(chan_id));

export const useNewMessageQuery = () =>
  useMutation<MessageRes, Error, MessageInput, any>(postMessage, {
    onSuccess: (data) => {
      queryClient.setQueryData<MessageRes>(['Messages', data.message_id], data)
    },
    // Always refetch after error or success:
    onSettled: (newMessage) => {
      if (newMessage) {
        queryClient.invalidateQueries([TEXT_CHANNEL_MESSAGES_CACHE_KEY, newMessage.text_channel_id])
      }
    },
  });
