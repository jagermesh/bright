$(document).ready(function() {

  // grid

  var grid = br.dataBrowser([[entityName]], { noun: [[entityName]] });

  grid.before('select', function(request) {
  });

  // editor

  grid.on('editor.show', function(data) {

    grid.editor.lock();

    grid.editor.unlock();

  });

  // run

});