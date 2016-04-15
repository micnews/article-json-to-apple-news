import renderTextItems from './text-items';

export default function (children) {
  return renderTextItems('body', children, {
    appendNewline: true,
    boldTextStyle: 'bodyBoldStyle',
    italicTextStyle: 'bodyItalicStyle',
    boldItalicTextStyle: 'bodyBoldItalicStyle',
    linkTextStyle: 'bodyLinkTextStyle'
  });
}
