v2.0.8

- NEW: added FontAwesome version 4.7.0
- NEW: [BrCore] Added function `exec` to execute shell commands. In comparison with standard `exec` function it will raise `\Bright\BrAppException` exception in case of error. Also it will return full execution output.
- NEW: [br.dataCombo] Added support for beutifying using selectize component (https://selectize.github.io/selectize.js/)
- CHG: [br.dataGrid/br.dataBrowser] will no longer store data row in .data('data-row') attribute for each DOM row by default. It can consume signiifcant amount of memory so this now made optional through option `storeDataRow` true/false
- FIX: [BrErrorTelegramLogAdapter] Fixed Telegram logger
- FIX: [BrMailLogAdapter] It did not send error report from console scripts (they were only showed in console)

v2.0.9

- CHG: Improved support of cascade Bootstrap dropdowns
