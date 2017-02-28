const test = require('ava');
const database = require('../src/database');

const comment = {
  author: 'Jacob',
  date: '2017-02-19T23:14:46-05:00',
  id: 'comment-15967445',
  content: 'LeiraCon?'
};

const comment2 = {
  author: 'Ricky Yde Herrig',
  date: '2017-01-23T11:41:46-05:00',
  id: 'comment-15742632',
  content: 'Hi Patrick\nSry if u had answered that question many times. If so, might I suggest you make an update then? All backers would be notified. Especially, lazy guys like me who dont read through too many comments to find info :)'
};

// delete comments before starting test,
// ignore any errors i.e. if it does not exist
test.before(() => {
  return database.delete(comment.id)
  .catch(() => {});
});

test.before(() => {
  return database.delete(comment2.id)
  .catch(() => {});
});

test('.create - must successfully create comment', t => {
  t.plan(1);

  return database.create(comment)
  .then(() => {
    return database.read(comment.id)
    .then(result => {
      t.deepEqual(result, { Item: comment });
    });
  });
});

test('.create - must not allow creating the same comment twice', t => {
  t.plan(2);

  return database.create(comment2)
  .then(() => {
    return database.create(comment2)
    .catch(err => {
      t.is(err.message, 'The conditional request failed');
      t.is(err.code, 'ConditionalCheckFailedException');
    });
  });
});
