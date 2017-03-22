import startsWith from 'lodash.startswith';
import renderParagraph from './paragraph';
import renderBlockquote from './blockquote';
import renderHeading from './heading';
import renderEmbed from './embed';

const types = {
  paragraph: ({children}) => renderParagraph(children),
  blockquote: ({children}) => renderBlockquote(children),
  header1: ({children}) => renderHeading(1, children),
  header2: ({children}) => renderHeading(2, children),
  header3: ({children}) => renderHeading(3, children),
  header4: ({children}) => renderHeading(4, children),
  header5: ({children}) => renderHeading(5, children),
  header6: ({children}) => renderHeading(6, children),
  embed: (item, opts) => renderEmbed(item, {
    layout: 'embedLayout',
    style: 'embedStyle',
    mediaLayout: 'embedMediaLayout',
    mediaStyle: 'embedMediaStyle',
    captionLayout: 'embedCaptionLayout',
    captionTextStyle: 'embedCaptionTextStyle',
    showCaptionInArticleView: opts.showCaptionInArticleView
  })
};

const isText = type => type === 'paragraph' || startsWith(type, 'header');

const hasContent = ({children}) =>
  children.some(child => child.type !== 'linebreak' &&
    (child.content && child.content.trim()));

function renderItem (item, opts) {
  const {type} = item;
  if (!types[type]) {
    return null;
  }

  if (isText(type) && !hasContent(item)) {
    return null;
  }

  return types[type](item, opts);
}

export default function ({body}, opts) {
  return body
    .map(renderItem, opts)
    .filter(Boolean);
}
