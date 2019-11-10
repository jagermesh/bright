$(function() {

  const messagesDataSource = br.dataSource(br.baseUrl + 'api/messages/');
  const messagesDataEditor = br.dataEditor('#sendMessage', messagesDataSource);

  messagesDataEditor.after('editor.save', function(operation, message) {
    br.inform(br.trn('Done'), br.trn('Message has been sent! We\'ll be in touch soon!'));
  });

  $('.action-send-message').on('click', function() {
    messagesDataEditor.show();
  });

});