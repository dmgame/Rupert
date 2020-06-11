import { format } from 'date-fns';

function date(val, userFormat = '', prefix = '') {
  const dateFromStr = new Date(val);
  return `${prefix} ${format(dateFromStr, userFormat)}`;
}

export default date;
