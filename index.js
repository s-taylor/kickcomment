const jsdom = require('jsdom');

const url = 'https://www.kickstarter.com/projects/2074786394/vast-the-crystal-caverns-second-printing-with-mini/comments';

function getDate($comment) {
  const datePath = '.comment-inner > .main > h3 > span.date > a > data';
  return $comment.find(datePath).attr('data-value').replace(/\"/g, '');
}

function getAuthor($comment) {
  const authorPath = '.comment-inner > .main > h3 > a.author';
  return $comment.find(authorPath).text();
}

function getContent($, $comment) {
  let contentArr = [];
  $comment.find(".comment-inner > .main p").each(function() {
    const text = $(this).text();
    contentArr.push(text);
  });
  return contentArr.join('\n\n');
}

jsdom.env({
  url,
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    if (err) return console.log('Error:', err);

    const $ = window.$;
    const comments = [];
    $(".NS_comments__comment").each(function() {
      const $comment = $(this);

      comments.push({
        author: getAuthor($comment),
        date: getDate($comment),
        id:  $comment.attr('id'),
        content: getContent($, $comment)
      });
    });

    console.log(comments);

    const nextUrl = $('.older_comments').attr('href');
    console.log('---------------------------');
    console.log('nextUrl', nextUrl);
  }
});
