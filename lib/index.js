import assert from 'assert';
import renderBlockList from './block-list';
import objectAssign from 'object-assign';
import defaultStyles from './default-styles';
import bundleImages from './bundle-images';
import renderHeader from './header';
import formatDate from './format-date';
import packageJson from '../package.json';

function convertToAppleNews (articleJson, opts) {
  assert(opts, 'opts required');
  assert(opts.identifier, 'opts.identifier required');
  assert(articleJson, 'articleJson required');
  assert(articleJson.title, 'articleJson.title required');
  assert(Array.isArray(articleJson.body), 'articleJson.body required to be an array');

  const header = renderHeader(articleJson, opts);
  const blockList = renderBlockList(articleJson, opts);
  const body = {
    role: 'container',
    components: blockList,
    layout: 'bodyLayout'
  };
  const components = [header, body];
  const bundlesToUrls = bundleImages(components);
  const article = {
    version: '1.0',
    identifier: opts.identifier,
    title: articleJson.title,
    language: articleJson.language || 'en',
    generatorName: 'article-json-to-apple-news',
    generatorVersion: packageJson.version,
    layout: objectAssign({}, defaultStyles.layout, opts.layout),
    componentLayouts: objectAssign({}, defaultStyles.componentLayouts, opts.componentLayouts),
    componentTextStyles: objectAssign({}, defaultStyles.componentTextStyles, opts.componentTextStyles),
    textStyles: objectAssign({}, defaultStyles.textStyles, opts.textStyles),
    components
  };

  if (articleJson.author && articleJson.author.name) {
    article.authors = [articleJson.author.name];
  }

  if (articleJson.headerEmbed && articleJson.headerEmbed.type === 'embed' &&
      articleJson.headerEmbed.embedType === 'image') {
    Object.keys(bundlesToUrls).forEach(function (key) {
      const value = bundlesToUrls[key];
      if (value === articleJson.headerEmbed.src) {
        article.thumbnailURL = 'bundle://' + key;
      }
    });
  }

  if (articleJson.modifiedDate) {
    article.dateModified = formatDate(articleJson.modifiedDate);
  }

  if (articleJson.publishedDate) {
    const published = formatDate(articleJson.publishedDate);
    article.datePublished = published;
    article.dateCreated = published;
  }

  if (opts.excerpt) {
    article.excerpt = String(opts.excerpt);
  }

  if (opts.canonicalURL) {
    article.canonicalURL = String(opts.canonicalURL);
  }

  if (opts.campaignData) {
    article.campaignData = opts.campaignData;
  }

  if (opts.keywords) {
    article.keywords = opts.keywords;
  }

  return {article, bundlesToUrls};
}

module.exports = convertToAppleNews;
