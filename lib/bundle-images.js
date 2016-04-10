import walk from 'walk-apple-news-format';

export default components => {
  const bundlesToUrls = {};
  const urlsToBundles = {};
  let count = 0;

  walk({components}, component => {
    const {role, URL} = component;
    if (role === 'photo') {
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
