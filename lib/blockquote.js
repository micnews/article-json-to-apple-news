import renderTextItems from './text-items';

export default function (children) {
  const components = children
    .filter(Boolean)
    .filter(element => element.type === 'paragraph' && element.children && element.children.length > 0)
    .map(element => renderTextItems('quote', element.children, {
      textStyle: 'quoteStyle',
      boldTextStyle: 'bodyBoldStyle',
      italicTextStyle: 'bodyItalicStyle',
      boldItalicTextStyle: 'bodyBoldItalicStyle',
      linkTextStyle: 'bodyLinkTextStyle',
      layout: 'quoteLayout'
    }))
    .filter(Boolean);

  return {
    role: 'container',
    components
  };
}
