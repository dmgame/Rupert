/* eslint-disable import/prefer-default-export */
import axios from '@/plugins/axios';

function normalizeData(data) {
  return data.reduce((acc, item) => {
    acc[item.id] = { ...item };
    return acc;
  }, {});
}

export async function getWorkbooks(siteId) {
  try {
    const res = await axios.get(`/sites/${siteId}/workbooks`);
    const data = normalizeData(res.data.workbooks.workbook);
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}
