import moment from 'moment';
import renderEmbed from './embed';

const componentsWithoutEmbed = ({title, author: {name}, date}) => [{
  role: 'title',
  text: title
}, {
  role: 'author',
  text: `By ${name}`
}, {
  role: 'byline',
  text: moment(date).format('MMMM D, YYYY')
}];

const componentsWithEmbed = article =>
  [renderEmbed(article.headerEmbed)].concat(componentsWithoutEmbed(article));

export default article => ({
  role: 'header',
  components: article.headerEmbed && article.headerEmbed.type === 'embed'
    ? componentsWithEmbed(article)
    : componentsWithoutEmbed(article)
});
