import assert from 'assert';
import renderBlockList from './block-list';
import objectAssign from 'object-assign';
import defaultStyles from './default-styles';

function convertToAppleNews (article, opts) {
  assert(opts, 'opts required');
  assert(opts.title, 'opts.title required');
  assert(opts.identifier, 'opts.identifier required');

  return {
    version: '1.0',
    identifier: opts.identifier,
    title: opts.title,
    language: opts.language || 'en',
    layout: {
      columns: 7,
      width: 1024,
      margin: 70,
      gutter: 40
    },
    componentTextStyles: objectAssign({}, defaultStyles.componentTextStyles, opts.componentTextStyles),
    textStyles: objectAssign({}, defaultStyles.textStyles, opts.textStyles),
    components: renderBlockList(article, opts)
  };
}

module.exports = convertToAppleNews;
