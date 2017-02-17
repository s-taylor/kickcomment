const test = require('ava');
const { getComments, fetcher } = require('../lib/fetcher');
const nock = require('./helpers/nock');

const path = '/projects/2074786394/vast-the-crystal-caverns-second-printing-with-mini/comments';

test.before(() => {
  //nock.record();
  nock.playback();
});

test('fetcher', t => {
  t.plan(7);

  return fetcher(path)
  .then(results => {
    t.is(typeof results, 'object');
    t.is(results.comments.constructor, Array);
    t.is(typeof results.nextUrl, 'string');

    const comment = results.comments[0];
    t.is(typeof comment.author, 'string');
    t.is(typeof comment.date, 'string');
    t.is(typeof comment.id, 'string');
    t.is(typeof comment.content, 'string');
  });
});


test('getComments', t => {
  t.plan(6);

  const limit = 5;
  return getComments(path, limit)
  .then(comments => {
    t.is(comments.constructor, Array);
    t.is(comments.length, limit * 50); // 5 pages x 50 per page

    const comment = comments[0];
    t.is(typeof comment.author, 'string');
    t.is(typeof comment.date, 'string');
    t.is(typeof comment.id, 'string');
    t.is(typeof comment.content, 'string');
  });
});
