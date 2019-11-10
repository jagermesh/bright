$(function() {

  $('.nav-item[rel=users]').addClass('active');

  $('#navBarRight').hide();
  $('#navBarEditor').show();

  const usersDataSource = br.dataSource(br.baseUrl + 'api/users');
  usersDataSource.on('error', function(operation, error) { br.growlError(error); });

  let editor;

  if ($('body').hasClass('my-account')) {
    editor = br.dataEditor('#userEditor', usersDataSource);
  } else {
    editor = br.dataEditor('#userEditor', usersDataSource, { noun: 'user', returnUrl: br.baseUrl + 'backend/users.html'});
  }

  const userTypeCombo   = br.dataCombo('#userEditor select.data-field[name=type_id]');

  editor.on('editor.show', function(data) {

    editor.lock();

    if (data) {

    } else {
      $('#userEditor input.data-field[name=is_active]').attr('checked', 'checked');
    }

    br.startProgress(2);
    $('#navBarEditor').show();
    $('.editor-toolbar').show();
    editor.unlock();
    br.hideProgress();

  });

  editor.after('editor.save', function() {
    document.location.hash = this.rowid();
  });

  if ($('body').hasClass('my-account')) {
    editor.show($('body').attr('data-user-id'));
  } else {
    editor.show(br.request.get('rowid', br.request.anchor()));
  }

});
