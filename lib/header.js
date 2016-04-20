import moment from 'moment';
import renderEmbed from './embed';
import renderTextItems from './text-items';

function componentsWithoutEmbed (article, opts) {
  const {title, author: {name, href}, publishedDate} = article;
  const {dividerComponent} = opts;

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
    linkTextStyle: 'bodyLinkTextStyle'
  });

  if (dividerComponent) {
    return [titleComponent, bylineComponent, dividerComponent];
  }

  return [titleComponent, bylineComponent];
}

const componentsWithEmbed = (article, opts) =>
  [renderEmbed(article.headerEmbed, {
    layout: 'headerEmbedLayout',
    style: 'headerEmbedStyle',
    mediaLayout: 'headerEmbedMediaLayout',
    mediaStyle: 'headerEmbedMediaStyle',
    captionLayout: 'headerCaptionLayout',
    captionTextStyle: 'headerCaptionTextStyle'
  })]
    .concat(componentsWithoutEmbed(article, opts));

export default (article, opts) => ({
  role: 'header',
  layout: 'headerLayout',
  style: 'headerStyle',
  components: article.headerEmbed && article.headerEmbed.type === 'embed'
    ? componentsWithEmbed(article, opts)
    : componentsWithoutEmbed(article, opts)
});
