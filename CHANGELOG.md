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
- CHG: [br.dataSource] prromise will not be rejected in case of error if there is "on error" event configured.
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

v2.0.11

- NEW: [bootstrap 2.3.2] Added 'shown.bs.dropdow' into Bootstrap 2.3.2 dropdowns
- CHG: [BrAuth] Code refactoring
- CHG: [BrResponse] Code refactoring
- CHG: [BrResponse] Added `sendHTML`, `sendAutodetect`
- CHG: [BrResponse] `SendJSON`, `SendJSONP` now returning header `no-store` to prevent unauthorized access to data via browser cache
- CHG: [BrResponse] All methods which return errors (`Send404`, `SendNOtAuthorized`, etc) are changed to do `exit()` from PHP script
- CHG: [BrSession] Added method `regenerate` to regenerate session id
- CHG: [BrGenerciRenderer] Method 'display' changed to use `br()->response()->sendAutodetect()` instead of `echo`
- CHG: [br.dataSource] All AJAX methods will send `X-Csrf-Token` headeer if such token exists in cookies
- CHG: [bootsrtap/br.ui] Added support for dropdowns which are inside block element with `overflow: hidden`. You need to add `br-dropdown-detachable` class in additional to standard Bootstrap's `dropdown` class
- CHG: [BrDataBaseManager] added support for deefiner
- CHG: [BrDataBasePatch] added lambda function into `executeScriptFile` as last parameter. Can be used to pre-process script which is gonna be executed.
- CHG: [BrMySQLiDBProvider] added function getQueryStructure - same as `getTableStructure` but for queries
- CHG: [BrMySQLDBProvider] added function getQueryStructure - same as `getTableStructure` but for queries
- FIX: [promise.js] library fixed to better support headless JS engines

Backward incompatible changes

- CHG: [BrDataBaseManager] method `registerTableForAuditing` removed as duplicate with `setupTableSupport`
- CHG: [BrDataBasePatch] method `registerTableForAuditing` removed as duplicate with `setupTableSupport`

v2.0.12

- NEW [BrConsole] Added methods `purple` and `blue` colors
- NEW [BrDataBaseManager] Added methods `executeScriptFile` and `executeScript`
- NEW [BrDataBaseDictionary] Validation for insert/update fields list
- NEW [br.draggable] Draggable support
- NEW [br.sortTable] Method to sort tables
- CHG [BrMySQLDbProvider] Added `selectUnbuffered` method, must be used same way as `select` but will not consume memory when iterating through result set
- CHG [BrMailLogAdapter] Added mail body cleanup from console color codes
- CHG [BrXSS] Added some safe domains

Backward incompatible changes

- CHG Removed support for mysql extension - it was deprecated long time ago
- CHG [BrDataBasePatch] Removed lambda function from `executeScriptFile`
- CHG 3rdparties folders re-arranged
