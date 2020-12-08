import { useMutation } from 'react-query';
import { LOGIN_PATH, REGISTER_PATH } from '../routes/Paths';
import { postFetch } from './defaults';

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

export const useRegisteryQuery = () => useMutation(postRegister);
export const useLoginQuery = () => useMutation(postLogin);
