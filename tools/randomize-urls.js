/* global require */
/* global process */
/* global console */

const fs = require('fs');

if (process.argv[2]) {
  const fileName = process.argv[2];
  console.log('Touching ' + fileName + '...');
  fs.readFile(fileName, 'utf8', function (err,data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    const random = Math.random();
    const result = data.replace(/[.](css|js)[?]v=[.0-9]*"/g, `.$1?v=${random}"`);
    if (result != data) {
      fs.writeFile(fileName, result, 'utf8', function (err) {
        if (err) {
          console.log(err);
          process.exit(1);
        }
      });
    }
  });
}