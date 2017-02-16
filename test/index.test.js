const test = require('ava');
const fetcher = require('../lib/fetcher');

test('fetcher', t => {
  t.plan(3);

  const path = '/projects/2074786394/vast-the-crystal-caverns-second-printing-with-mini/comments';
  return fetcher(path)
  .then(results => {
    t.is(typeof results, 'object');
    t.is(results.comments.constructor, Array);
    t.is(typeof results.nextUrl, 'string');
    //console.log('results.comments', results.comments);
  });
});
