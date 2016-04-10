import assert from 'assert';
import renderBlockList from './block-list';
import objectAssign from 'object-assign';
import defaultStyles from './default-styles';
import bundleImages from './bundle-images';

function convertToAppleNews (articleJson, opts) {
  assert(opts, 'opts required');
  assert(opts.identifier, 'opts.identifier required');
  assert(articleJson, 'articleJson required');
  assert(articleJson.title, 'articleJson.title required');
  assert(Array.isArray(articleJson.body), 'articleJson.body required to be an array');

  const components = renderBlockList(articleJson, opts);
  const bundlesToUrls = bundleImages(components);
  const article = {
    version: '1.0',
    identifier: opts.identifier,
    title: articleJson.title,
    language: articleJson.language || 'en',
    layout: {
      columns: 7,
      width: 1024,
      margin: 70,
      gutter: 40
    },
    componentTextStyles: objectAssign({}, defaultStyles.componentTextStyles, opts.componentTextStyles),
    textStyles: objectAssign({}, defaultStyles.textStyles, opts.textStyles),
    components
  };

  return {article, bundlesToUrls};
}

module.exports = convertToAppleNews;
