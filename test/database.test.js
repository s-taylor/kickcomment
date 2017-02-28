const test = require('ava');
const database = require('../src/database');

const comment = {
  author: 'Jacob',
  date: '2017-02-19T23:14:46-05:00',
  id: 'comment-15967445',
  content: 'LeiraCon?'
};

test.before(() => {
  // delete comment before starting test,
  // ignore any errors i.e. if it does not exist
  return database.delete(comment.id)
  .catch(() => {});
});

test('create', t => {
  t.plan(1);

  return database.create(comment)
  .then(() => {
    return database.read(comment.id)
    .then(result => {
      t.deepEqual(result, { Item: comment });
    });
  });
});
