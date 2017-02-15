const jsdom = require('jsdom');

const url = 'https://www.kickstarter.com/projects/2074786394/vast-the-crystal-caverns-second-printing-with-mini/comments';

jsdom.env({
  url,
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    if (err) return console.log('Error:', err);

    const $ = window.$;
    $(".NS_comments__comment").each(function() {
      const comment = $(this);
      const author = comment.find('.comment-inner > .main a.author').text();

      let contentArr = [];
      comment.find(".comment-inner > .main p").each(function() {
        const text = $(this).text();
        contentArr.push(text);
      });
      const content = contentArr.join('\n');

      console.log('---------------------------');
      console.log('Author:', author);
      console.log('...........................');
      console.log(content);
    });

    const nextUrl = window.$('.older_comments').attr('href');
    console.log('---------------------------');
    console.log('nextUrl', nextUrl);
  }
});
