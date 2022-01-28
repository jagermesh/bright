$(function() {
  $('.nav-link[data-section="my-account"]').addClass('active');

  const usersDataSource = br.dataSource(`${br.baseUrl}api/users/`);
  usersDataSource.on('error', function(operation, error) { br.growlError(error); });

  const editor = br.dataEditor('#userEditor', usersDataSource);
  editor.show($('body').attr('data-rowid'));
});
