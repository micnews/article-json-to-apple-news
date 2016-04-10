export default article => ({
  role: 'header',
  components: [{
    role: 'title',
    text: article.title
  }]
});
