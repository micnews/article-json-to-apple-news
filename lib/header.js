import moment from 'moment';
import renderEmbed from './embed';
import renderTextItems from './text-items';

const componentsWithoutEmbed = ({title, author: {name, href}, publishedDate}) => [{
  role: 'title',
  layout: 'bodyLayout',
  text: title,
  textStyle: 'titleStyle'
}, renderTextItems(
    'byline', [{
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
      appendNewline: true,
      layout: 'bodyLayout',
      textStyle: 'bylineStyle',
      boldTextStyle: 'bodyBoldStyle',
      italicTextStyle: 'bodyItalicStyle',
      boldItalicTextStyle: 'bodyBoldItalicStyle',
      linkTextStyle: 'bodyLinkTextStyle'
    })
];

const componentsWithEmbed = article =>
  [renderEmbed(article.headerEmbed)].concat(componentsWithoutEmbed(article));

export default article => ({
  role: 'header',
  components: article.headerEmbed && article.headerEmbed.type === 'embed'
    ? componentsWithEmbed(article)
    : componentsWithoutEmbed(article)
});
