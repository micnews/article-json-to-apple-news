import walk from 'walk-apple-news-format';
import startsWith from 'lodash.startswith';

export default components => {
  const bundlesToUrls = {};
  const urlsToBundles = {};
  let count = 0;

  walk({components}, component => {
    const {role, URL} = component;
    if (role === 'photo' && !startsWith(URL, 'bundle://')) {
      if (!urlsToBundles[URL]) {
        urlsToBundles[URL] = `image-${count}`;
        bundlesToUrls[`image-${count}`] = URL;
        count++;
      }

      component.URL = `bundle://${urlsToBundles[URL]}`;
    }
  });

  return bundlesToUrls;
};
