const fs = require('fs');
const nock = require('nock');
const test = require('ava');
const fetcher = require('../lib/fetcher');

const path = '/projects/2074786394/vast-the-crystal-caverns-second-printing-with-mini/comments';

test.before(() => {
  const html = fs.readFileSync('./test/fixtures/example.html', 'utf-8');

  nock('https://www.kickstarter.com')
  .get(path)
  .reply(200, html);
});

test('fetcher', t => {
  t.plan(3);

  return fetcher(path)
  .then(results => {
    t.is(typeof results, 'object');
    t.is(results.comments.constructor, Array);
    t.is(typeof results.nextUrl, 'string');
    //console.log('results.comments', results.comments);
  });
});
