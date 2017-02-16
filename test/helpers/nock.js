const fs = require('fs');
const nock = require('nock');

function record() {
  // reset the file contents back to just the require statement
  const fileContent = "const nock = require('nock');\n";
  fs.writeFileSync('./test/fixtures/recordings.js', fileContent);

  // record http requests and log to recordings.js
  nock.recorder.rec({
    logging(content) {
      fs.appendFile('./test/fixtures/recordings.js', content);
    },
    use_separator: false
  });
}

function playback() {
  // disable outgoing http requests
  nock.disableNetConnect();

  // load fixtures
  // eslint-disable-next-line global-require
  require('../fixtures/recordings');
}

module.exports = { record, playback };
