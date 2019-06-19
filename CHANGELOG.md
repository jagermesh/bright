v2.0.8

- NEW: added FontAwesome version 4.7.0
- NEW: [BrCore] Added function `exec` to execute shell commands. In comparison with standard `exec` function it will raise `\Bright\BrAppException` exception in case of error. Also it will return full execution output.
- NEW: [br.dataCombo] Added support for beutifying using selectize component (https://selectize.github.io/selectize.js/)
- CHG: [br.dataGrid/br.dataBrowser] will no longer store data row in .data('data-row') attribute for each DOM row by default. It can consume signiifcant amount of memory so this now made optional through option `storeDataRow` true/false
- FIX: [BrErrorTelegramLogAdapter] Fixed Telegram logger
- FIX: [BrMailLogAdapter] It did not send error report from console scripts (they were only showed in console)

v2.0.9

- CHG: Improved support of cascade Bootstrap dropdowns

v2.0.10

- CHG: Enchanced protection against malicious REST param values
- CHG: br.dataSource prromise will not be rejected in case of error if there is "on error" event configured.
- NEW: tools/randomize-urls.js - script to randomize urls, usefull when you don't have or can't install mod-pagespeed

  value of v in below url's will be refreshed

```html
  <link href="{/}css/print-preview.css?v=0.8050659263242956" rel="stylesheet">
```

  could be used as grunt-shell task

```javascript
  , refreshTags: {
    options: {
      stdout: true
    }
  , command: 'node vendor/jagermesh/bright/tools/randomize-urls.js templates/head.html && node vendor/jagermesh/bright/tools/randomize-urls.js templates/footer.html'
  }
```
