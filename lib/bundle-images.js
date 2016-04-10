export default components => {
  const bundlesToUrls = {};
  const urlsToBundles = {};
  let count = 0;

  components.forEach(item => {
    if (item.components && item.components[0] && item.components[0].role === 'photo') {
      const url = item.components[0].URL;
      if (!urlsToBundles[url]) {
        urlsToBundles[url] = `image-${count}`;
        bundlesToUrls[`image-${count}`] = url;
        count++;
      }
      item.components[0].URL = `bundle://${urlsToBundles[url]}`;
    }
  });

  return bundlesToUrls;
};
