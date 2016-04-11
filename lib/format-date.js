import moment from 'moment';

export default function (date) {
  return moment(date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
}
