const lsTokenKey = process.env.VUE_APP_STORAGE_KEY_ACCESS_TOKEN;

function setTokenToLs({ credentials: { token = '' } }) {
  if (!token) return;
  localStorage.setItem(lsTokenKey, token);
}

function setAuthHeader(config) {
  const clonedConfig = { ...config };

  if (!clonedConfig.url.includes('auth')) {
    const userToken = localStorage.getItem(lsTokenKey);
    clonedConfig.headers['X-Tableau-Auth'] = userToken;
  }
  return clonedConfig;
}

function saveTokensFromLogin(response) {
  if (!response.config) return response;
  if (response.config.url.includes('auth')) {
    setTokenToLs(response.data);
  }

  return response;
}

export default function (axios) {
  axios.interceptors.request.use(setAuthHeader);
  axios.interceptors.response.use(saveTokensFromLogin);
}
