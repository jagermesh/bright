/*!
 * Bright 0.0.5
 *
 * Copyright 2012, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://brightfw.com
 *
 */

;(function ($, window) {

  $(document).ready(function() {

    var users = br.dataSource(br.baseUrl + 'api/users/');

    // users.on('error', function(operation, error) {
    //   if ($('.login-error').length > 0) {
    //     $('.login-error').text(error).fadeIn();
    //   } else {
    //     br.growlError(error);
    //   }
    // });

    $('.action-signup').click(function() {

      var data = {};

      var form = $(this).closest('form');
      if (form.length === 0) {
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

      var $btn = $(this);
      $btn.button('loading');
      users.invoke('signup', data, function(result, response) {
        $btn.button('reset');
        if (result) {
          br.redirect('?from=signup');
        } else {
          if ($('.signup-error').length > 0) {
            $('.signup-error').text(response).fadeIn();
          } else {
            br.growlError(response);
          }
        }
      });

    });

    $('.action-login').click(function() {

      var data = {};

      var form = $(this).closest('form');
      if (form.length === 0) {
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

      var $btn = $(this);
      $btn.button('loading');
      users.invoke( 'login'
                  , data
                  , function(result, response) {
                      $btn.button('reset');
                      if (result) {
                        br.redirect(br.request.get('caller', '?from=login'));
                      } else {
                        if ($('.login-error').length > 0) {
                          $('.login-error').text(response).fadeIn();
                        } else {
                          br.growlError(response);
                        }
                      }
                    }
                  );

    });

    $('.action-reset-password').click(function() {

      var data = {};

      var form = $(this).closest('form');
      if (form.length === 0) {
        form = $(this).closest('div.modal');
      }
      if (form.length > 0) {
        $(form).find('input,select').each(function() {
          data[$(this).attr('name')] = $(this).val();
        });
      }
      $('.reset-password-field').each(function() {
        data[$(this).attr('name')] = $(this).val();
      });

      var $btn = $(this);
      $btn.button('loading');
      users.invoke( 'remindPassword'
                  , data
                  , function(result, response) {
                      $btn.button('reset');
                      if (result) {
                        br.redirect(br.request.get('caller', 'reset-password-final.html'));
                      } else {
                        if ($('.reset-password-error').length > 0) {
                          $('.reset-password-error').text(response).fadeIn();
                        } else {
                          br.growlError(response);
                        }
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

})(jQuery, window);
