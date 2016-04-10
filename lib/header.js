import moment from 'moment';

export default article => ({
  role: 'header',
  components: [{
    role: 'title',
    text: article.title
  }, {
    role: 'author',
    text: `By ${article.author.name}`
  }, {
    role: 'byline',
    text: moment(article.date).format('MMMM D, YYYY')
  }]
});
