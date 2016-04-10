import startsWith from 'lodash.startswith';
import renderParagraph from './paragraph';
import renderHeading from './heading';
import renderEmbed from './embed';

const types = {
  paragraph: ({children}) => renderParagraph(children),
  header1: ({children}) => renderHeading(1, children),
  header2: ({children}) => renderHeading(2, children),
  header3: ({children}) => renderHeading(3, children),
  header4: ({children}) => renderHeading(4, children),
  header5: ({children}) => renderHeading(5, children),
  header6: ({children}) => renderHeading(6, children),
  embed: renderEmbed
};

const isText = type => type === 'paragraph' || startsWith(type, 'header');

const hasContent = ({children}) =>
  children.some(child => child.type !== 'linebreak' &&
    (child.content && child.content.trim()));

function renderItem (item) {
  const {type} = item;
  if (!types[type]) {
    return null;
  }

  if (isText(type) && !hasContent(item)) {
    return null;
  }

  return types[type](item);
}

export default function ({body}) {
  const bundlesToUrls = {};
  const urlsToBundles = {};
  let count = 0;

  const components = body
    .map(renderItem)
    .filter(Boolean);

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

  return {components, bundlesToUrls};
}
