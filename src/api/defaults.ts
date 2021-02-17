import { BASE_URL, DEFAULT_FETCH_HEADERS } from '../config';

export const postFetch = <T>(path: string, body: T) =>
  fetch(BASE_URL + path, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: DEFAULT_FETCH_HEADERS,
    credentials: 'include',
  });

export const getFetch = (path: string) =>
  fetch(BASE_URL + path, {
    method: 'GET',
    headers: DEFAULT_FETCH_HEADERS,
    credentials: 'include',
  });
