const test = require('ava');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

// NOTE: callback function testing with AVA requires test.cb(...)
// https://github.com/avajs/ava#documentation

function stubHandler(stub) {
  return proxyquire('../handler.js', {
    './build/fetcher': {
      getComments: stub || function proxyFetch() { return Promise.resolve(); }
    }
  });
}

test.cb('getComments - must error when no query string', t => {
  t.plan(1);
  const handler = stubHandler();

  handler.getComments({}, undefined, err => {
    t.deepEqual(err, new Error('[400] No query string provided'));
    t.end();
  });
});

test.cb('getComments - must error when no project id', t => {
  t.plan(1);
  const handler = stubHandler();

  handler.getComments({ query: {} }, undefined, err => {
    t.deepEqual(err, new Error('[400] No (project) id found in query'));
    t.end();
  });
});

test.cb('getComments - must error when no project name', t => {
  t.plan(1);
  const handler = stubHandler();

  handler.getComments({ query: { id: '1234567890' } }, undefined, err => {
    t.deepEqual(err, new Error('[400] No (project) name found in query'));
    t.end();
  });
});

test.cb('getComments - must trigger fetcher with correct args', t => {
  t.plan(3);
  const stub = sinon.spy(() => Promise.resolve());
  const handler = stubHandler(stub);

  const query = { id: '1234567890', name: 'really-cool-project' };
  handler.getComments({ query }, undefined, () => {
    t.truthy(stub.calledOnce);
    t.is(stub.args[0][0], `/projects/${query.id}/${query.name}/comments`);
    t.is(stub.args[0][1], 4);
    t.end();
  });
});
