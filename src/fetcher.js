require('babel-polyfill'); // polyfill promise support
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

function fetcher(path) {
  const url = `${domain}${path}`;
  console.log('fetching url: ', url);

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

function getComments(path, limit) {
  let counter = 0;
  let comments = [];

  function fetchComments(nextPath) {
    return fetcher(nextPath)
    .then(results => {
      counter += 1;
      // TODO - NEEDS TEST
      if (counter === 1 && results.comments.length === 0) {
        // if first request returns empty array, project not found (or zero comments)
        return Promise.reject(new Error('[404] Project not found'));
      }

      comments = [...comments, ...results.comments];

      if (limit && counter >= limit) return comments;
      if (results.nextUrl) return fetchComments(results.nextUrl);
      return comments;
    });
  }

  return fetchComments(path);
}

module.exports = { getComments, fetcher };
