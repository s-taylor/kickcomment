'use strict';
// WARNING: must be node 4.3 compatible due to AWS lambda
// no string interpolation
// no object destructuring
// no const???

var getComments = require('./build/fetcher').getComments;

module.exports.getComments = (event, context, callback) => {
  if (!event.id) return callback('No (project) id found in query');
  if (!event.name) return callback('No (project) name found in query');

  var path = '/projects/' + event.id + '/' + event.name + '/comments';
  // temporary limit until comments can be cached
  // retrieves last 4 pages (200 comments)
  var limit = 4;

  return getComments(path, limit)
  .then(comments => {
    var response = {
      statusCode: 200,
      body: JSON.stringify(comments)
    };

    callback(null, response);
  })
  .catch(err => {
    var response = {
      statusCode: 500,
      body: JSON.stringify(err)
    };

    callback(response);
  });
};
