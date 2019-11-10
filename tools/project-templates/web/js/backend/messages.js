$(function() {

  $('.nav-item[rel=messages]').addClass('active');

  const browser = br.dataBrowser('messages', { noun: 'message' });
  browser.refresh();

});