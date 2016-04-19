import renderTextItems from './text-items';

const embeds = {
  instagram: ({id}) => ({
    role: 'instagram',
    // use id to assure the url is correct
    URL: `https://instagram.com/p/${id}`
  }),
  twitter: ({url}) => ({
    role: 'tweet',
    URL: url
  }),
  youtube: ({youtubeId}) => ({
    role: 'embedwebvideo',
    URL: `https://www.youtube.com/embed/${youtubeId}`
  }),
  image: ({src}) => ({
    role: 'photo',
    URL: src
  })
};

const render = (item, opts) => {
  opts = opts || {};
  const embed = embeds[item.embedType](item);

  if (opts.mediaStyle) {
    embed.style = opts.mediaStyle;
  }

  if (opts.mediaLayout) {
    embed.layout = opts.mediaLayout;
  }

  if (!item.caption || item.caption.length === 0) {
    return {role: 'container', components: [embed]};
  }

  const captionOpts = {
    appendNewline: true,
    textStyle: opts.captionTextStyle,
    boldTextStyle: 'bodyBoldStyle',
    italicTextStyle: 'bodyItalicStyle',
    boldItalicTextStyle: 'bodyBoldItalicStyle',
    linkTextStyle: 'bodyLinkTextStyle'
  };

  if (opts.captionLayout) {
    captionOpts.layout = opts.captionLayout;
  }

  if (opts.captionTextStyle) {
    captionOpts.textStyle = opts.captionTextStyle;
  }

  const result = {
    role: 'container',
    components: [
      embed,
      renderTextItems('caption', item.caption, captionOpts)
    ]
  };

  if (opts.layout) {
    result.layout = opts.layout;
  }

  if (opts.style) {
    result.style = opts.style;
  }

  return result;
};

export default (item, opts) => embeds[item.embedType] && render(item, opts);
