# article-json-to-apple-news
Render [article json](https://github.com/micnews/html-to-article-json#format) in [Apple News format](https://developer.apple.com/library/ios/documentation/General/Conceptual/Apple_News_Format_Ref/index.html)

[![Build Status](https://travis-ci.org/micnews/article-json-to-apple-news.svg?branch=master)](https://travis-ci.org/micnews/article-json-to-apple-news)

## Usage

```
npm install article-json-to-apple-news
```

```js
const convertToAppleNews = require('article-json-to-apple-news');
const article = {
  title: 'Article Title',
  author: {
    name: 'John',
    href: 'http://example.com/john'
  },
  publishedDate: new Date('2016-02-04T14:00:00Z'),
  body: [
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          content: 'This is the text and '
        },
        {
          type: 'text',
          bold: true,
          content: 'some bold text '
        },
        {
          type: 'text',
          href: 'http://example.com',
          content: 'some link'
        }
      ]
    },
    {
      type: 'embed',
      embedType: 'image',
      src: 'http://example/image.jpg',
      width: 300,
      height: 150
    }
  ]
};

console.log(convertToAppleNews(article, { identifier: 'article-identifier' }));
// {
//   article: <apple news article>,
//   bundlesToUrls: <object that maps bundle:// urls to http(s) urls>
// }
```

### Body format

https://github.com/micnews/html-to-article-json#format

## License

MIT
