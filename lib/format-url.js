import startsWith from 'lodash.startswith';

export default function (url) {
  if (!url) {
    return '';
  }

  let t = String(url).trim();
  if (!t) {
    return '';
  }

  if (startsWith(t, '//')) {
    t = 'https:' + t;
  }

  if (!startsWith(t, 'http://') && !startsWith(t, 'https://') && !startsWith(t, 'mailto:')) {
    t = 'http://' + t;
  }

  return encodeURI(t);
}
