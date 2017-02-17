'use strict';

const { getComments } = require('./lib/fetcher');

module.exports.getComments = (event, context, callback) => {
  if (!event.id) return callback('No (project) id found in query');
  if (!event.name) return callback('No (project) name found in query');
  const { id, name } = event;
  
  const path = `/projects/${id}/${name}/comments`;
  // temporary limit until comments can be cached
  // retrieves last 4 pages (200 comments)
  const limit = 4;

  getComments(path, limit)
  .then(comments => callback(null, comments))
  .catch(callback);
};
