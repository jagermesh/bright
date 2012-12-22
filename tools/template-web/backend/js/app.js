$(document).ready(function() {

  br
    .request
      .route('/login', function() {
      })
      .route('/users', function() {
        $('.nav-item[rel=users]').addClass('active');
        br.load.js(br.baseUrl + 'backend/js/users.js');
      })
  ;
  
});
