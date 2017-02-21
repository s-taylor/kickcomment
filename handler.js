/* eslint-disable strict, no-var, vars-on-top, prefer-template */

'use strict';

// WARNING: must be node 4.3 compatible due to AWS lambda

var getComments = require('./build/fetcher').getComments;

module.exports.getComments = (event, context, callback) => {
  // see https://serverless.com/framework/docs/providers/aws/events/apigateway/#default-request-templates
  if (typeof event !== 'object') return callback(new Error('[400] Event object not found'));
  if (!event.query) return callback(new Error('[400] No query string provided'));
  if (!event.query.id) return callback(new Error('[400] No (project) id found in query'));
  if (!event.query.name) return callback(new Error('[400] No (project) name found in query'));

  var path = '/projects/' + event.query.id + '/' + event.query.name + '/comments';
  // temporary limit until comments can be cached
  // retrieves last 4 pages (200 comments)
  var limit = 4;

  return getComments(path, limit)
  .then(comments => callback(null, comments))
  .catch(callback);
};

/* eslint-enable no-var, vars-on-top, prefer-template */
