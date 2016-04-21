import walk from 'walk-apple-news-format';
import startsWith from 'lodash.startswith';
import {extname} from 'path';

export default components => {
  const bundlesToUrls = {};
  const urlsToBundles = {};
  let count = 0;

  function handleURL (URL) {
    if (!URL) {
      return null;
    }

    if (startsWith(URL, 'bundle://')) {
      return null;
    }

    if (!urlsToBundles[URL]) {
      const filename = `image-${count++}${extname(URL)}`;
      urlsToBundles[URL] = filename;
      bundlesToUrls[filename] = URL;
    }

    return 'bundle://' + urlsToBundles[URL];
  }

  walk({components}, component => {
    const {role, URL, style} = component;

    if (role === 'photo') {
      const bundleFilename = handleURL(URL);
      if (bundleFilename) {
        component.URL = bundleFilename;
      }
    }

    if (Object(style) === style && style.fill &&
      style.fill.type === 'image' && style.fill.URL) {
      const bundleFilename = handleURL(style.fill.URL);
      if (bundleFilename) {
        component.style.fill.URL = bundleFilename;
      }
    }
  });

  return bundlesToUrls;
};
