/* global require */
/* global process */
/* global console */

var fs = require('fs');

if (process.argv[2]) {
  var fileName = process.argv[2];
  console.log('Touching ' + fileName + '...');
  fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) {
      console.log('err');
      process.exit(1);
    }
    var random = Math.random();
    var result = data.replace(/[?]v=(r|[.0-9]+)"/g, '?v=' + random + '"');
    fs.writeFile(fileName, result, 'utf8', function (err) {
      if (err) {
        console.log('err');
        process.exit(1);
      }
    });
  });
}