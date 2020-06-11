import axios from '@/plugins/axios';

function normalizeAuthData(data) {
  return {
    siteId: data.credentials.site.id,
    contentUrl: data.credentials.site.contentUrl,
    userId: data.credentials.user.id,
  };
}

async function singIn(name, password, contentUrl) {
  try {
    const data = {
      credentials: {
        name,
        password,
        site: {
          contentUrl,
        },
      },
    };
    const res = await axios.post('/auth/signin', data);
    const resData = normalizeAuthData(res.data);
    return resData;
  } catch (err) {
    return Promise.reject(err);
  }
}

export default singIn;
