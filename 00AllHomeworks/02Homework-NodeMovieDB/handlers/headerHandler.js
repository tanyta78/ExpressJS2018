const path = require('path');
const db = require('../config/database');

module.exports = (req, res) => {
    if (req.headers.statusheader === 'Full') {
        let htmlPath = path.normalize(PATH.join(__dirname, '../views/status.html'));
        let moviesCount = db.length();
        let content = `<h1>We currently have ${moviesCount} movies in our Database!</h1>`;

        FS.readFile(path, 'utf8', (err, data) => {
          if (err) {
              res.writeHead(404, {
                  'Content-Type': 'text/plain'
              });

              res.write('404 not found!');
              res.end();
              return;
          }

          res.writeHead(200, {
              'Content-Type': 'text/html'
          });

          data = data.replace('<div id="replaceMe">{{replaceMe}}</div>', content);
          res.write(data);
          res.end();
});
    } else {
        return true;
    }
};