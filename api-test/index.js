import 'babel-core/register';
import createClient from 'apple-news';
import assert from 'assert';
import test from 'ava';
import chalk from 'chalk';
import toAppleNews from '../lib';

assert(process.env.NODE_ENV === 'test', 'should run in the test environment');
assert(process.env.API_ID, 'API_ID environment variable required');
assert(process.env.API_SECRET, 'API_SECRET environment variable required');
assert(process.env.CHANNEL_ID, 'CHANNEL_ID environment variable required');

const printResponses = process.env.PRINT_RESPONSES;
const channelId = process.env.CHANNEL_ID;
const client = createClient({
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET
});

function PUBLISH_TEST (name, articleJson) {
  test(name, t => {
    return new Promise((resolve, reject) => {
      const randomId = String(Math.random().toFixed(7)).split('.')[1];
      const apn = toAppleNews(articleJson, { identifier: 'TEST-ID-' + randomId });
      client.createArticle({
        channelId: channelId,
        article: apn.article,
        bundleFiles: apn.bundleFiles,
        isPreview: true
      }, function (err, data) {
        if (err) {
          return reject(err);
        }

        console.log(chalk.green('++', data.id));

        if (printResponses) {
          console.log(JSON.stringify(data, null, 2));
        }

        if (!data || !data.id) {
          return reject(new Error('failed to create an article'));
        }

        client.deleteArticle({ articleId: data.id }, function (err2) {
          if (err2) {
            console.log(`Article deletion error, please delete ID ${data.id} manually`, err2);
            return reject(err2);
          }

          console.log(chalk.red('--', data.id));
          return resolve(data);
        });
      });
    });
  });
}

PUBLISH_TEST('simple article', {
  title: 'Article Title',
  author: {
    name: 'David Hipsterson',
    href: 'http://mic.com'
  },
  publishedDate: new Date('2016-02-04T14:00:00Z'),
  body: [
    { type: 'header1', children: [{ type: 'text', content: 'header 1 text' }, { type: 'text', content: '1', bold: true }] },
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
    { type: 'blockquote',
      children: [
        { type: 'paragraph', children: [
          { type: 'text', content: 'block quote text ' },
          { type: 'text', content: ' and a link', href: 'http://mic.com' }
        ] }
      ]
    },
    { type: 'paragraph',
      children: [
        { type: 'text', content: 'other text' }
      ]
    },
    { type: 'paragraph', children: [{ type: 'text', mark: true }] }
  ]
});
