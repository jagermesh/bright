// 
// Breeze Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function ($, window, undefined) {

  $(document).ready(function() { 
    
    var users = br.dataSource(br.baseUrl + 'api/users/');

    users.on('error', function(operation, error) {
      br.growlError(error);
    });

    $('.action-signup').click(function() {

      var data = {};

      var form = $(this).closest('form');      
      if (form.length == 0) {
        form = $(this).closest('div.modal');
      }
      if (form.length > 0) {
        $(form).find('input,select').each(function() {
          data[$(this).attr('name')] = $(this).val();
        });
      }
      $('.signup-field').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });

      users.invoke('signup', data, function(result) {
        if (result) {
          br.redirect('?from=signup');
        }
      });

    });

    $('.action-login').click(function() {

      var data = {};

      var form = $(this).closest('form');      
      if (form.length == 0) {
        form = $(this).closest('div.modal');
      }
      if (form.length > 0) {
        $(form).find('input,select').each(function() {
          if ($(this).attr('type') == 'checkbox') {
            if ($(this).is(':checked')) {
              data[$(this).attr('name')] = $(this).val();
            }
          } else {
            data[$(this).attr('name')] = $(this).val();
          }
        });
      }
      $('.login-field').each(function() {
        if ($(this).attr('type') == 'checkbox') {
          if ($(this).is(':checked')) {
            data[$(this).attr('name')] = $(this).val();
          }
        } else {
          data[$(this).attr('name')] = $(this).val();
        }
      });

      users.invoke( 'login'
                  , data
                  , function(result) {
                      if (result) {
                        br.redirect(br.request.get('caller', '?from=login'));
                      }
                    }
                  );

    });

    $('.action-remind-password').click(function() {

      var data = {};

      var form = $(this).closest('form');      
      if (form.length == 0) {
        form = $(this).closest('div.modal');
      }
      if (form.length > 0) {
        $(form).find('input,select').each(function() {
          data[$(this).attr('name')] = $(this).val();
        });
      }
      $('.remind-password-field').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });

      users.invoke( 'remindPassword'
                  , data
                  , function(result) {
                      if (result) {
                        br.redirect(br.request.get('caller', '?from=login'));
                      }
                    }
                  );

    });

    $('.action-logout').click(function() {

      users.invoke( 'logout'
                  , { }
                  , function(result) {
                      if (result) {
                        document.location = br.baseUrl;
                      }
                    }
                  );

    });

  });

}(jQuery, window);
