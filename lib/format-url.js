import startsWith from 'lodash.startswith';

export default function (url) {
  if (!url) {
    return '';
  }

  if (startsWith(url, '//')) {
    return 'https:' + url;
  }

  return encodeURI(String(url).trim());
}
