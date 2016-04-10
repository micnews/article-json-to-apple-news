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
  image: ({url}) => ({
    role: 'photo',
    URL: url
  })
};

const render = opts => {
  const embed = embeds[opts.embedType](opts);

  if (!opts.caption || opts.caption.length === 0) {
    return {role: 'container', components: [embed]};
  }

  return {
    role: 'container',
    components: [
      embed,
      renderTextItems('caption', opts.caption, {
        appendNewline: true,
        textStyle: 'captionStyle',
        boldTextStyle: 'bodyBoldStyle',
        italicTextStyle: 'bodyItalicStyle',
        boldItalicTextStyle: 'bodyBoldItalicStyle',
        linkTextStyle: 'bodyLinkTextStyle'
      })
    ]
  };
};

export default (opts) => embeds[opts.embedType] && render(opts);
