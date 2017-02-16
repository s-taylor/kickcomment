const jsdom = require('jsdom');

const domain = 'https://www.kickstarter.com';

function getDate($comment) {
  const datePath = '.comment-inner > .main > h3 > span.date > a > data';
  return $comment.find(datePath).attr('data-value').replace(/"/g, '');
}

function getAuthor($comment) {
  const authorPath = '.comment-inner > .main > h3 > a.author';
  return $comment.find(authorPath).text();
}

function getContent($, $comment) {
  const contentArr = [];
  $comment.find('.comment-inner > .main p').each(function each() {
    const text = $(this).text();
    contentArr.push(text);
  });
  return contentArr.join('\n\n');
}

function getComments(path) {
  const url = `${domain}${path}`;

  return new Promise((resolve, reject) => {
    jsdom.env({
      url,
      scripts: ['http://code.jquery.com/jquery.js'],
      done(err, window) {
        if (err) return reject(err);

        const $ = window.$;
        const comments = [];
        $('.NS_comments__comment').each(function each() {
          const $comment = $(this);

          comments.push({
            author: getAuthor($comment),
            date: getDate($comment),
            id: $comment.attr('id'),
            content: getContent($, $comment)
          });
        });

        const nextUrl = $('.older_comments').attr('href');

        return resolve({ comments, nextUrl });
      }
    });
  });
}

module.exports = getComments;
