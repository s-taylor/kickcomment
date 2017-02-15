const jsdom = require('jsdom');

const url = 'https://www.kickstarter.com/projects/2074786394/vast-the-crystal-caverns-second-printing-with-mini/comments';

jsdom.env({
  url,
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    if (err) return console.log('Error:', err);

    const $ = window.$;
    const comments = [];
    $(".NS_comments__comment").each(function() {
      const comment = $(this);
      const id = comment.attr('id');
      const author = comment.find('.comment-inner > .main > h3 > a.author').text();
      const date = comment.find('.comment-inner > .main > h3 > span.date > a > data').attr('data-value').replace(/\"/g, '');

      let contentArr = [];
      comment.find(".comment-inner > .main p").each(function() {
        const text = $(this).text();
        contentArr.push(text);
      });
      const content = contentArr.join('\n\n');

      comments.push({ author, date, id, content });
    });

    console.log(comments);

    const nextUrl = window.$('.older_comments').attr('href');
    console.log('---------------------------');
    console.log('nextUrl', nextUrl);
  }
});
