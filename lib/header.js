import moment from 'moment';
import renderEmbed from './embed';
import renderTextItems from './text-items';

function componentsWithoutEmbed (article, opts) {
  const {title, author: {name, href}, publishedDate} = article;
  const {dividerComponent, heroComponent} = opts;

  const titleComponent = {
    role: 'title',
    layout: 'titleLayout',
    text: title
  };

  const bylineComponent = renderTextItems('byline', [{
    type: 'text',
    content: 'By '
  }, {
    type: 'text',
    content: name,
    href: href
  }, {
    type: 'text',
    content: ` ${moment(publishedDate).format('MMMM D, YYYY')}`
  }], {
    appendNewline: false,
    layout: 'bylineLayout',
    boldTextStyle: 'bodyBoldStyle',
    italicTextStyle: 'bodyItalicStyle',
    boldItalicTextStyle: 'bodyBoldItalicStyle',
    linkTextStyle: opts.bylineLinkTextStyle || 'bodyLinkTextStyle'
  });

  // Remove title in case there is a custom hero component
  if (heroComponent) {
    if (dividerComponent) {
      return [bylineComponent, dividerComponent];
    }

    return [bylineComponent];
  }

  if (dividerComponent) {
    return [titleComponent, bylineComponent, dividerComponent];
  }

  return [titleComponent, bylineComponent];
}

const componentsWithEmbed = (article, opts) =>
  [opts.heroComponent ? opts.heroComponent : renderEmbed(article.headerEmbed, {
    layout: 'headerEmbedLayout',
    style: 'headerEmbedStyle',
    mediaLayout: 'headerEmbedMediaLayout',
    mediaStyle: 'headerEmbedMediaStyle',
    captionLayout: 'headerCaptionLayout',
    captionTextStyle: 'headerCaptionTextStyle',
    showCaptionInArticleView: opts.showCaptionInArticleView
  })]
    .concat(componentsWithoutEmbed(article, opts));

export default (article, opts) => ({
  role: 'header',
  layout: 'headerLayout',
  style: 'headerStyle',
  components: article.headerEmbed && article.headerEmbed.type === 'embed'
    ? componentsWithEmbed(article, opts)
    : (opts.heroComponent ? [opts.heroComponent] : []).concat(componentsWithoutEmbed(article, opts))
});
