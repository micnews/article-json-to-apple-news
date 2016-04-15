import moment from 'moment';
import renderEmbed from './embed';
import renderTextItems from './text-items';

function componentsWithoutEmbed (article, opts) {
  const {title, author: {name, href}, publishedDate} = article;
  const {dividerComponent} = opts;

  const titleComponent = {
    role: 'title',
    layout: 'bodyLayout',
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
    layout: 'bodyLayout',
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
  [renderEmbed(article.headerEmbed)].concat(componentsWithoutEmbed(article, opts));

export default (article, opts) => ({
  role: 'header',
  components: article.headerEmbed && article.headerEmbed.type === 'embed'
    ? componentsWithEmbed(article, opts)
    : componentsWithoutEmbed(article, opts)
});
