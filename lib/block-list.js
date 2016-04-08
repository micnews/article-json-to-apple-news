import startsWith from 'lodash.startswith';
import renderParagraph from './paragraph';
import renderHeader from './header';

const types = {
  paragraph: ({children}) => renderParagraph(children),
  header1: ({children}) => renderHeader(1, children),
  header2: ({children}) => renderHeader(2, children),
  header3: ({children}) => renderHeader(3, children),
  header4: ({children}) => renderHeader(4, children),
  header5: ({children}) => renderHeader(5, children),
  header6: ({children}) => renderHeader(6, children)
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
  return body.map(renderItem).filter(Boolean);
}
