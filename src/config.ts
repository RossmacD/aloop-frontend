export const BASE_URL = `http${process.env.HTTPS ? 's' : ''}://${process.env.REACT_APP_API_DOMAIN}${
  process.env.REACT_APP_API_PORT !== '80' ? ':' + process.env.REACT_APP_API_PORT : ''
}`;

export const DEFAULT_FETCH_HEADERS = {
  'Content-Type': 'application/json',
};
