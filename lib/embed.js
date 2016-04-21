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

  const result = {
    role: 'container',
    components: [embed]
  };

  if (opts.layout) {
    result.layout = opts.layout;
  }

  if (opts.style) {
    result.style = opts.style;
  }

  if (embed.role === 'photo' && item.caption && item.caption.length > 0) {
    const captionOpts = {
      appendNewline: true,
      textStyle: opts.captionTextStyle
    };

    if (opts.captionTextStyle) {
      captionOpts.textStyle = opts.captionTextStyle;
    }

    embed.caption = renderTextItems(null, item.caption, captionOpts);
  }

  return result;
};

export default (item, opts) => embeds[item.embedType] && render(item, opts);
