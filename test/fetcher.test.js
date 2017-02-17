const test = require('ava');
const { getComments, fetcher } = require('../lib/fetcher');
const nock = require('./helpers/nock');

const path = '/projects/2074786394/vast-the-crystal-caverns-second-printing-with-mini/comments';

test.before(() => {
  //nock.record();
  nock.playback();
});

test('fetcher', t => {
  t.plan(3);

  return fetcher(path)
  .then(results => {
    t.is(typeof results, 'object');
    t.is(results.comments.constructor, Array);
    t.is(typeof results.nextUrl, 'string');
  });
});


test('getComments', t => {
  t.plan(1);

  return getComments(path, 5)
  .then(comments => {
    t.is(comments.constructor, Array);
  });
});
