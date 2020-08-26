$(function() {

  $('.nav-link[data-section="users"]').addClass('active');

  const browser = br.dataBrowser('users', {noun: 'user'});

  browser.dataGrid.getContainer().on('click', '.action-switch-option', function() {
    const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
    let data = Object.create({});
    data[$(this).attr('data-field')] = ($(this).is(':checked') ? 1 : 0);
    browser.dataSource.update( rowid, data );
  });

  browser.on('editor.show', function(data) {

    if (!data) {
      browser.dataEditor.getContainer().find('input.data-field[name=is_active]').prop('checked', true);
    }

  });

  browser.refresh();

});