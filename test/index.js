import test from 'ava';
import 'babel-core/register';
import toAppleNews from '../lib';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import packageJson from '../package.json';

const writeAppleNewsArticle = (apn, name) => {
  mkdirp.sync(path.resolve(__dirname, '..', 'apple-news-article', name));
  fs.writeFileSync(path.resolve(__dirname, '..', 'apple-news-article', name, 'article.json'),
    JSON.stringify(apn, null, 2));
};

test('apple news format', t => {
  const data = {
    title: 'Article Title',
    author: {
      name: 'David Hipsterson',
      href: 'http://mic.com'
    },
    publishedDate: new Date('2016-02-04T14:00:00Z'),
    body: [
      { type: 'header1', children: [{ type: 'text', content: 'header 1 text' }] },
      { type: 'header2', children: [{ type: 'text', content: 'header 2 text' }] },
      { type: 'header3', children: [{ type: 'text', content: 'header 3 text' }] },
      { type: 'header4', children: [{ type: 'text', content: 'header 4 text' }] },
      { type: 'header5', children: [{ type: 'text', content: 'header 5 text' }] },
      { type: 'header6', children: [{ type: 'text', content: 'header 6 text' }] },
      { type: 'paragraph',
        children: [
          { type: 'text', href: 'http://mic.com', content: 'link' },
          { type: 'linebreak' },
          { type: 'text', content: 'normal text ' },
          { type: 'text', bold: true, content: 'bold text ' },
          { type: 'text', italic: true, content: 'italic text ' },
          { type: 'text', bold: true, italic: true, content: 'bold italic text ' },
          { type: 'text', mark: true, content: 'marked text' },
          { type: 'text', mark: true, markClass: 'marker1' }
        ]
      },
      { type: 'paragraph',
        children: [
          { type: 'text', content: 'other text' }
        ]
      },
      { type: 'paragraph', children: [{ type: 'text', mark: true }] }
    ]
  };

  const {article} = toAppleNews(data, {identifier: '100'});
  t.is(article.version, '1.0');
  t.is(article.identifier, '100');
  t.is(article.title, 'Article Title');

  const expected = {
    componentTextStyles: {
      bodyStyle: {
        fontName: 'HelveticaNeue',
        fontSize: 18
      },
      quoteStyle: {
        fontName: 'HelveticaNeue-Italic',
        fontSize: 26,
        textAlignment: 'center'
      },
      bylineStyle: {
        fontName: 'HelveticaNeue',
        fontSize: 13
      },
      captionStyle: {
        fontName: 'HelveticaNeue',
        fontSize: 10
      },
      titleStyle: {
        fontName: 'HelveticaNeue-Bold',
        fontSize: 36
      },
      heading1Style: {
        fontName: 'HelveticaNeue-Bold',
        fontSize: 32
      },
      heading2Style: {
        fontName: 'HelveticaNeue-Bold',
        fontSize: 24
      },
      heading3Style: {
        fontName: 'HelveticaNeue-Bold',
        fontSize: 19
      },
      heading4Style: {
        fontName: 'HelveticaNeue-Bold',
        fontSize: 16
      },
      heading5Style: {
        fontName: 'HelveticaNeue-Bold',
        fontSize: 13
      },
      heading6Style: {
        fontName: 'HelveticaNeue-Bold',
        fontSize: 11
      }
    },
    textStyles: {
      bodyBoldStyle: {
        fontName: 'HelveticaNeue-Bold'
      },
      bodyItalicStyle: {
        fontName: 'HelveticaNeue-Italic'
      },
      bodyBoldItalicStyle: {
        fontName: 'HelveticaNeue-BoldItalic'
      },
      bodyLinkTextStyle: {
        textColor: '#48BFEE',
        underline: true
      }
    },
    components: [
      {
        role: 'header',
        components: [
          {
            role: 'title',
            layout: 'bodyLayout',
            text: 'Article Title',
            textStyle: 'titleStyle'
          },
          {
            role: 'byline',
            text: 'By David Hipsterson February 4, 2016',
            textStyle: 'bylineStyle',
            additions: [{
              type: 'link',
              rangeStart: 3,
              rangeLength: 16,
              URL: 'http://mic.com'
            }],
            inlineTextStyles: [{
              rangeStart: 3,
              rangeLength: 16,
              textStyle: 'bodyLinkTextStyle'
            }],
            layout: 'bodyLayout'
          }
        ]
      },
      {
        role: 'container',
        components: [
          {
            role: 'heading1',
            text: 'header 1 text',
            textStyle: 'heading1Style',
            additions: [],
            inlineTextStyles: []
          },
          {
            role: 'heading2',
            text: 'header 2 text',
            textStyle: 'heading2Style',
            additions: [],
            inlineTextStyles: []
          },
          {
            role: 'heading3',
            text: 'header 3 text',
            textStyle: 'heading3Style',
            additions: [],
            inlineTextStyles: []
          },
          {
            role: 'heading4',
            text: 'header 4 text',
            textStyle: 'heading4Style',
            additions: [],
            inlineTextStyles: []
          },
          {
            role: 'heading5',
            text: 'header 5 text',
            textStyle: 'heading5Style',
            additions: [],
            inlineTextStyles: []
          },
          {
            role: 'heading6',
            text: 'header 6 text',
            textStyle: 'heading6Style',
            additions: [],
            inlineTextStyles: []
          },
          {
            role: 'body',
            text: 'link\nnormal text bold text italic text bold italic text marked text\n',
            textStyle: 'bodyStyle',
            additions: [
              {
                'type': 'link',
                'rangeStart': 0,
                'rangeLength': 4,
                'URL': 'http://mic.com'
              }
            ],
            'inlineTextStyles': [
              {
                'rangeStart': 0,
                'rangeLength': 4,
                'textStyle': 'bodyLinkTextStyle'
              },
              {
                'rangeStart': 17,
                'rangeLength': 10,
                'textStyle': 'bodyBoldStyle'
              },
              {
                'rangeStart': 27,
                'rangeLength': 12,
                'textStyle': 'bodyItalicStyle'
              },
              {
                'rangeStart': 39,
                'rangeLength': 17,
                'textStyle': 'bodyBoldItalicStyle'
              }
            ]
          },
          {
            role: 'body',
            text: 'other text\n',
            textStyle: 'bodyStyle',
            additions: [],
            inlineTextStyles: []
          }
        ],
        layout: 'bodyLayout'
      }
    ]
  };

  t.deepEqual(expected.components, article.components);
  t.deepEqual(expected.componentTextStyles, article.componentTextStyles);
  t.deepEqual(expected.textStyles, article.textStyles);

  // write test article for the preview
  writeAppleNewsArticle(article, 'text');
});

test('unknown element type', t => {
  const data = {
    title: 'Article Title',
    author: {
      name: 'David Hipsterson'
    },
    publishedDate: new Date('2016-02-04T14:00:00Z'),
    body: [
      { type: 'unknown-element', children: [] }
    ]
  };

  const {article} = toAppleNews(data, {identifier: '100'});
  t.deepEqual(article.components[1].components, []);
});

test('embeds', t => {
  const data = {
    title: 'embeds',
    author: {
      name: 'David Hipsterson'
    },
    publishedDate: new Date('2016-02-04T14:00:00Z'),
    body: [
      {
        type: 'embed',
        embedType: 'instagram',
        id: 'BDvcE47g6Ed',
        caption: [
          { type: 'text', href: 'http://mic.com', content: 'link' },
          { type: 'linebreak' },
          { type: 'text', content: 'normal text ' },
          { type: 'text', bold: true, content: 'bold text ' },
          { type: 'text', italic: true, content: 'italic text ' },
          { type: 'text', bold: true, italic: true, content: 'bold italic text ' },
          { type: 'text', mark: true, content: 'marked text' },
          { type: 'text', mark: true, markClass: 'marker1' }
        ]
      },
      {
        type: 'embed',
        embedType: 'twitter',
        url: 'https://twitter.com/randal_olson/status/709090467821064196',
        caption: [
          { type: 'text', href: 'http://mic.com', content: 'link' },
          { type: 'linebreak' },
          { type: 'text', content: 'normal text ' },
          { type: 'text', bold: true, content: 'bold text ' },
          { type: 'text', italic: true, content: 'italic text ' },
          { type: 'text', bold: true, italic: true, content: 'bold italic text ' },
          { type: 'text', mark: true, content: 'marked text' },
          { type: 'text', mark: true, markClass: 'marker1' }
        ]
      },
      {
        type: 'embed',
        embedType: 'youtube',
        youtubeId: 'oo6D4MXrJ5c',
        caption: [
          { type: 'text', href: 'http://mic.com', content: 'link' },
          { type: 'linebreak' },
          { type: 'text', content: 'normal text ' },
          { type: 'text', bold: true, content: 'bold text ' },
          { type: 'text', italic: true, content: 'italic text ' },
          { type: 'text', bold: true, italic: true, content: 'bold italic text ' },
          { type: 'text', mark: true, content: 'marked text' },
          { type: 'text', mark: true, markClass: 'marker1' }
        ]
      },
      {
        type: 'embed',
        embedType: 'image',
        src: 'bundle://image.jpg',
        caption: [
          { type: 'text', href: 'http://mic.com', content: 'link' },
          { type: 'linebreak' },
          { type: 'text', content: 'normal text ' },
          { type: 'text', bold: true, content: 'bold text ' },
          { type: 'text', italic: true, content: 'italic text ' },
          { type: 'text', bold: true, italic: true, content: 'bold italic text ' },
          { type: 'text', mark: true, content: 'marked text' },
          { type: 'text', mark: true, markClass: 'marker1' }
        ]
      }
    ]
  };
  const {article} = toAppleNews(data, {identifier: '100'});
  const actual = article;
  writeAppleNewsArticle(actual, 'embeds');

  const caption = {
    role: 'caption',
    text: 'link\nnormal text bold text italic text bold italic text marked text\n',
    textStyle: 'captionStyle',
    additions: [
      {
        'type': 'link',
        'rangeStart': 0,
        'rangeLength': 4,
        'URL': 'http://mic.com'
      }
    ],
    'inlineTextStyles': [
      {
        'rangeStart': 0,
        'rangeLength': 4,
        'textStyle': 'bodyLinkTextStyle'
      },
      {
        'rangeStart': 17,
        'rangeLength': 10,
        'textStyle': 'bodyBoldStyle'
      },
      {
        'rangeStart': 27,
        'rangeLength': 12,
        'textStyle': 'bodyItalicStyle'
      },
      {
        'rangeStart': 39,
        'rangeLength': 17,
        'textStyle': 'bodyBoldItalicStyle'
      }
    ]
  };

  const expectedComponents = [
    {
      role: 'container',
      components: [
        {
          role: 'instagram',
          URL: 'https://instagram.com/p/BDvcE47g6Ed'
        },
        caption
      ]
    },
    {
      role: 'container',
      components: [
        {
          role: 'tweet',
          URL: 'https://twitter.com/randal_olson/status/709090467821064196'
        },
        caption
      ]
    },
    {
      role: 'container',
      components: [
        {
          role: 'embedwebvideo',
          URL: 'https://www.youtube.com/embed/oo6D4MXrJ5c'
        },
        caption
      ]
    },
    {
      role: 'container',
      components: [
        {
          role: 'photo',
          URL: 'bundle://image.jpg'
        },
        caption
      ]
    }
  ];

  const actualBodyComponents = actual.components[1].components;
  t.deepEqual(actualBodyComponents, expectedComponents);
});

test('images', t => {
  const expectedComponents = [
    {
      role: 'container',
      components: [{role: 'photo', URL: 'bundle://image-0.jpg'}]
    },
    {
      role: 'container',
      components: [{role: 'photo', URL: 'bundle://image-1.png'}]
    },
    {
      role: 'container',
      components: [{role: 'photo', URL: 'bundle://image-0.jpg'}]
    }
  ];
  const expectedBundlesToUrls = {
    'image-0.jpg': 'http://example.com/image.jpg',
    'image-1.png': 'http://example.com/beep-boop.png'
  };
  const input = {
    title: 'foo',
    author: {
      name: 'David Hipsterson'
    },
    publishedDate: new Date('2016-02-04T14:00:00Z'),
    body: [
      {
        type: 'embed',
        embedType: 'image',
        src: 'http://example.com/image.jpg',
        caption: []
      },
      {
        type: 'embed',
        embedType: 'image',
        src: 'http://example.com/beep-boop.png',
        caption: []
      },
      {
        type: 'embed',
        embedType: 'image',
        src: 'http://example.com/image.jpg',
        caption: []
      }
    ]
  };
  const {article, bundlesToUrls} = toAppleNews(input, {identifier: '100'});
  const actualBodyComponents = article.components[1].components;

  t.deepEqual(bundlesToUrls, expectedBundlesToUrls);
  t.deepEqual(actualBodyComponents, expectedComponents);
});

test('header with image', t => {
  const data = {
    title: 'Beep boop',
    author: {
      name: 'Sergii Iefremov',
      href: 'http://mic.com/'
    },
    publishedDate: new Date('1985-03-22'),
    headerEmbed: {
      type: 'embed',
      embedType: 'image',
      src: 'bundle://image.jpg',
      caption: [
        { type: 'text', content: 'normal text' }
      ]
    },
    body: []
  };
  const {article} = toAppleNews(data, {identifier: '100'});
  const actual = article.components[0];
  const expected = {
    role: 'header',
    components: [{
      role: 'container',
      components: [{
        role: 'photo',
        URL: 'bundle://image.jpg'
      }, {
        role: 'caption',
        text: 'normal text\n',
        textStyle: 'captionStyle',
        additions: [],
        inlineTextStyles: []
      }]
    }, {
      role: 'title',
      layout: 'bodyLayout',
      text: 'Beep boop',
      textStyle: 'titleStyle'
    }, {
      role: 'byline',
      text: 'By Sergii Iefremov March 22, 1985',
      textStyle: 'bylineStyle',
      additions: [{
        type: 'link',
        rangeStart: 3,
        rangeLength: 15,
        URL: 'http://mic.com/'
      }],
      inlineTextStyles: [{
        rangeStart: 3,
        rangeLength: 15,
        textStyle: 'bodyLinkTextStyle'
      }],
      layout: 'bodyLayout'
    }]
  };

  writeAppleNewsArticle(article, 'header-with-image');
  t.deepEqual(actual, expected);
});

test('empty text element should not be rendered', t => {
  const data = {
    title: 'Article Title',
    author: {
      name: 'David Hipsterson'
    },
    publishedDate: new Date('2016-02-04T14:00:00Z'),
    body: [
      { type: 'paragraph', children: [
        { type: 'text', content: '' },
        { type: 'other', content: 'a' },
        { type: 'text' }
      ] }
    ]
  };

  const {article} = toAppleNews(data, {identifier: '100'});
  t.deepEqual(article.components[1].components, []);
});

test('metadata', t => {
  const data = {
    title: 'Article Title',
    author: {
      name: 'David Hipsterson'
    },
    headerEmbed: {
      type: 'embed',
      embedType: 'image',
      src: 'http://example.com/hero.jpg'
    },
    publishedDate: new Date('2016-02-04T14:00:00Z'),
    modifiedDate: new Date('2010-01-04T14:00:00Z'),
    body: []
  };

  const {article, bundlesToUrls} = toAppleNews(data, {
    identifier: '100',
    excerpt: 'This is cool article',
    canonicalURL: 'https://example.com/100',
    campaignData: {
      key: 'value',
      key2: 'value2'
    },
    keywords: ['cool', 'article']
  });
  t.is(article.metadata.datePublished, '2016-02-04T14:00:00Z');
  t.is(article.metadata.dateCreated, '2016-02-04T14:00:00Z');
  t.is(article.metadata.dateModified, '2010-01-04T14:00:00Z');
  t.deepEqual(article.metadata.authors, ['David Hipsterson']);
  t.is(article.metadata.generatorName, 'article-json-to-apple-news');
  t.is(article.metadata.generatorVersion, packageJson.version);
  t.is(article.metadata.thumbnailURL, 'bundle://image-0.jpg');
  t.deepEqual(bundlesToUrls, { 'image-0.jpg': 'http://example.com/hero.jpg' });
  t.is(article.metadata.excerpt, 'This is cool article');
  t.is(article.metadata.canonicalURL, 'https://example.com/100');
  t.deepEqual(article.metadata.campaignData, {
    key: 'value',
    key2: 'value2'
  });
  t.deepEqual(article.metadata.keywords, ['cool', 'article']);
});
