$(function() {

  $('.nav-item[rel=users]').addClass('active');

  const browser = br.dataBrowser('users', {noun: 'user'});

  $('.data-table').on('click', '.action-switch-option', function() {
    const rowid = $(this).closest('[data-rowid]').attr('data-rowid');
    let data = Object.create({});
    data[$(this).attr('data-field')] = ($(this).is(':checked') ? 1 : 0);
    browser.dataSource.update( rowid, data );
  });

  browser.refresh();

});