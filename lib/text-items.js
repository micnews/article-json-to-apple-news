function getTextStyle (bold, italic, link, opts) {
  if (link) {
    return opts.linkTextStyle || opts.textStyle;
  }

  if (bold && italic) {
    return opts.boldItalicTextStyle || opts.textStyle;
  }

  if (bold) {
    return opts.boldTextStyle || opts.textStyle;
  }

  if (italic) {
    return opts.italicTextStyle || opts.textStyle;
  }

  return opts.textStyle;
}

export default function (role, items, opts = {}) {
  const inlineStyles = [];
  const additions = [];
  let content = '';

  for (let i = 0; i < items.length; ++i) {
    const item = items[i];

    if (item.type === 'text') {
      const styled = item.bold || item.italic || item.href;
      if (styled) {
        inlineStyles.push({
          rangeStart: content.length,
          rangeLength: item.content.length,
          textStyle: getTextStyle(item.bold, item.italic, !!item.href, opts)
        });
      }

      if (item.href) {
        additions.push({
          type: 'link',
          rangeStart: content.length,
          rangeLength: item.content.length,
          URL: item.href
        });
      }

      content += item.content || '';
    }

    if (item.type === 'linebreak') {
      content += '\n';
    }
  }

  if (!content) {
    return null;
  }

  const obj = {
    text: content + (opts.appendNewline ? '\n' : ''),
    additions: additions,
    inlineTextStyles: inlineStyles
  };

  if (role) {
    obj.role = role;
  }

  if (opts.layout) {
    obj.layout = opts.layout;
  }

  if (opts.textStyle) {
    obj.textStyle = opts.textStyle;
  }

  return obj;
}
