export const BASE_URL = `http${process.env.REACT_APP_HTTPS ? 's' : ''}://${
  process.env.REACT_APP_API_DOMAIN
}${process.env.REACT_APP_API_PORT !== '80' ? ':' + process.env.REACT_APP_API_PORT : ''}/api`;

export const BASE_SOCKET_URL = `ws${process.env.REACT_APP_HTTPS ? 's' : ''}://${
  process.env.REACT_APP_API_DOMAIN
}${process.env.REACT_APP_API_PORT !== '80' ? ':' + process.env.REACT_APP_API_PORT : ''}/api`;

export const DEFAULT_FETCH_HEADERS = {
  'Access-Control-Allow-Credentials': 'true',
  // 'Access-Control-Allow-Origin': `http://${process.env.REACT_APP_API_DOMAIN}`,
  // Vary: 'origin',
  'Content-Type': 'application/json',
};

export const SESSION_SECRET =
  process.env.SESSION_SECRET || 'oauseyfdpoiausdfvk239084672gfgwsd87twd';
export const COOKIE_NAME = process.env.COOKIE_NAME || `actix-session`;
