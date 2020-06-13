import axios from '@/plugins/axios';

function normalizeData(data) {
  return data.reduce((acc, item) => {
    acc[item.id] = { ...item };
    return acc;
  }, {});
}

function getImageURL(data) {
  const blob = new Blob([data], { type: 'image/png' });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);

  return imageUrl;
}

export async function getWorkbooks(siteId) {
  try {
    const res = await axios.get(`/sites/${siteId}/workbooks?fields=_all_`);
    const data = normalizeData(res.data.workbooks.workbook);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getWorkbookViews(siteId, workBookId) {
  try {
    const res = await axios.get(`/sites/${siteId}/workbooks/${workBookId}/views`);
    return res.data.views.view;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getWorkbookPreviewImage(siteId, workBookId) {
  try {
    const res = await axios.get(
      `/sites/${siteId}/workbooks/${workBookId}/previewImage`,
      {
        responseType: 'blob',
      },
    );

    const imageUrl = getImageURL(res.data);

    return imageUrl;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getWorkbookViewImage(siteId, viewId) {
  try {
    const res = await axios.get(
      `/sites/${siteId}/views/${viewId}/image`,
      {
        responseType: 'blob',
      },
    );

    const imageUrl = getImageURL(res.data);

    return imageUrl;
  } catch (err) {
    return Promise.reject(err);
  }
}
