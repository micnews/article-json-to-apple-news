import moment from 'moment';
import renderEmbed from './embed';
import renderTextItems from './text-items';

const componentsWithoutEmbed = ({title, author: {name, href}, date}) => [{
  role: 'title',
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
      content: ` ${moment(date).format('MMMM D, YYYY')}`
    }], {
      appendNewline: true,
      textStyle: 'captionStyle',
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
