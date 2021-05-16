import { useMutation, useQuery } from 'react-query';
import { queryClient } from '../components/app/App';
import { LOGIN_PATH, REGISTER_PATH, SELF_PATH, USERS_PATH } from '../routes/Paths';
import { getFetch, postFetch } from './defaults';

const SELF_CACHE_KEY = 'self';
const USER_CACHE_KEY = 'users';

export interface UserRes {
  user_id: number;
  email: string;
  pass: string;
  first_name: string;
  last_name: string;
  role_id: number,
  created_at: string
}

export interface RegisterInput {
  email: string;
  pass: string;
  first_name: string;
  last_name: string;
}

const postRegister = async (formInput: RegisterInput) =>
  postFetch<RegisterInput>(REGISTER_PATH, formInput);

export interface LoginInput {
  email: string;
  pass: string;
}

const postLogin = async (formInput: LoginInput) =>
  postFetch<LoginInput>(LOGIN_PATH, formInput)
    .then((res) => res.json())
    .catch((e) => {
      console.error('POST REQUEST ERROR', e);
      throw e;
    });

const getSelf = async () =>
  getFetch(SELF_PATH)
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

const getUsers = async () =>
  getFetch(USERS_PATH)
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

export const useRegisteryQuery = () => useMutation(postRegister);
export const useLoginQuery = () =>
  useMutation(postLogin, {
    onSuccess: (data) => queryClient.setQueryData(SELF_CACHE_KEY, data),
  });

export const useGetSelfQuery = () => useQuery(SELF_CACHE_KEY, getSelf, { retry: false });
export const useGetUsers = () => useQuery(USER_CACHE_KEY, getUsers);
