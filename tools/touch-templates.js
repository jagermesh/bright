/* global process */
/* global __dirname */
/* global Buffer */

(function() {
  const fs = require('fs');
  const crypto = require('crypto');
  const path = require('path');
  const url = require('url');

  String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.split(search).join(replacement);
  };

  if (process.argv[2]) {
    const fileName = path.resolve(process.argv[2]);
    const resources = [];
    const resourceRegExp = new RegExp('<(script|link).+?(href|src)="(.+?[.](css|js)[^"]*?)"', 'ig');
    const brightPath = path.dirname(__dirname) + '/';
    const basePath = path.dirname(path.dirname(path.dirname(brightPath))) + '/';
    let content = fs.readFileSync(fileName, 'utf8');
    let originalContent = content;
    let resourcesMatch = resourceRegExp.exec(content);
    while(resourcesMatch) {
      let fullUrl = resourcesMatch[3];
      let urlMatch = fullUrl.match(new RegExp('^[^?"]+', 'ig'));
      if (urlMatch) {
        resources.push({
          fullUrl: fullUrl,
          relativeUrl: urlMatch[0]
        });
      }
      resourcesMatch = resourceRegExp.exec(content);
    }
    const localTouchTemplatesScriptPath = `${basePath}tools/touch-templates.js`;
    const localTouchTemplates = fs.existsSync(localTouchTemplatesScriptPath) ? require(localTouchTemplatesScriptPath) : function() {
      // stub
    };
    resources.forEach(function(resource) {
      let filePath = resource.relativeUrl.
        replace('{/}', basePath).
        replace('[[/]]', basePath).
        replace('{request.host}', '').
        replace('{br}',  brightPath).
        replace('[[br]]',  brightPath);

      let files = [];

      if (filePath.match(/^[^/]/i)) {
        filePath = `${path.dirname(fileName)}/${filePath}`;
      }

      if (fs.existsSync(filePath)) {
        files.push(filePath);
      } else {
        localTouchTemplates(filePath, files);
      }

      if (files.length > 0) {
        let fileContent = files.map(function(filePath0) {
          try {
            return fs.readFileSync(filePath0).toString();
          } catch (error) {
            console.log(`${fileName}: Can not resolve file path ${resource.relativeUrl}`);
            process.exit(1);
          }
        }).join('');

        const shaHash = crypto.createHash('sha256').setEncoding('hex').update(fileContent, 'utf8').digest('hex');
        const size = Buffer.from(fileContent).length;
        const hash = shaHash.substring(0, 6);

        let match0 = /[?].*$/.exec(resource.fullUrl);
        let searchParams = new url.URLSearchParams(match0 ? match0[0] : '');
        searchParams.set('v', `${size}${hash}`);
        const constructedUrl = `${resource.relativeUrl}?${searchParams.toString()}`;
        content = content.replaceAll(resource.fullUrl, constructedUrl);
      } else
      if (!resource.relativeUrl.match(/^https:\/\//i) && !resource.relativeUrl.match(/^\/\//i)) {
        console.log(`${fileName}: Can not resolve file path ${resource.relativeUrl}`);
        process.exit(1);
      }
    });

    if (originalContent != content) {
      console.log(`Touching ${fileName}`);
      fs.writeFileSync(fileName, content, 'utf8');
    }
  }
})();