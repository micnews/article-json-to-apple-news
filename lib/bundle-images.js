import walk from 'walk-apple-news-format';
import startsWith from 'lodash.startswith';
import {extname} from 'path';

export default components => {
  const bundlesToUrls = {};
  const urlsToBundles = {};
  let count = 0;

  walk({components}, component => {
    const {role, URL} = component;
    if (role === 'photo' && !startsWith(URL, 'bundle://')) {
      if (!urlsToBundles[URL]) {
        const filename = `image-${count}${extname(URL)}`;
        urlsToBundles[URL] = filename;
        bundlesToUrls[filename] = URL;
        count++;
      }

      component.URL = `bundle://${urlsToBundles[URL]}`;
    }
  });

  return bundlesToUrls;
};
