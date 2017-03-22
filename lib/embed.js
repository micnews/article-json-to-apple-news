import renderTextItems from './text-items';
const twitterRegex = /^https?:\/\/twitter\.com\/([-a-zA-Z0-9+&@#%?=~_|!:,.;]+)\/status(es){0,1}\/(\d+)/;

function formatTwitterUrl (url) {
  const match = url.match(twitterRegex);
  if (!match) {
    return '';
  }

  return `https://twitter.com/${match[1]}/status/${match[3]}`;
}

function createTwitterEmbed ({url}) {
  const formatted = formatTwitterUrl(url);
  if (!formatted) {
    return null;
  }

  return {
    role: 'tweet',
    URL: formatted
  };
}

const embeds = {
  instagram: ({id}) => ({
    role: 'instagram',
    // use id to assure the url is correct
    URL: `https://instagram.com/p/${id}`
  }),
  twitter: createTwitterEmbed,
  youtube: ({youtubeId}) => ({
    role: 'embedwebvideo',
    URL: `https://www.youtube.com/embed/${youtubeId}`
  }),
  video: ({src}) => ({
    role: 'video',
    URL: src
  }),
  image: ({src}) => ({
    role: 'photo',
    URL: src
  })
};

const renderCaption = (item, opts) => {
  const captionToRender = item.attribution
    ? item.caption.concat([{ type: 'text', content: ' ' }], item.attribution)
    : item.caption;

  return renderTextItems(null, captionToRender, opts);
};

const render = (item, opts) => {
  opts = opts || {};
  const embed = embeds[item.embedType](item);

  if (!embed) {
    return null;
  }

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

    const captionComponent = renderCaption(item, captionOpts);
    captionComponent.role = 'caption';

    embed.caption = captionComponent;
    if (opts.showCaptionInArticleView) {
      result.components.push(captionComponent);
    }
  }

  return result;
};

export default (item, opts) => embeds[item.embedType] && render(item, opts);
