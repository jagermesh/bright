/*!
 * Bright 2.0
 *
 * Copyright 2012-2018, Sergiy Lavryk (jagermesh@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://brightfw.com
 *
 */

;(function ($, window) {

  $(function() {

    let usersDataSourcee = br.dataSource(br.baseUrl + 'api/users/');

    $('.action-signup').click(function() {

      let data = Object.create({});

      let form = $(this).closest('form');
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

      usersDataSourcee.invoke('signup', data, function(result, response) {
        if (result) {
          br.redirect('?from=signup');
        } else {
          if ($('.signup-error', form).length > 0) {
            $('.signup-error', form).text(response).fadeIn();
          } else {
            br.growlError(response);
          }
        }
      });

    });

    $('.action-login').click(function() {

      let data = Object.create({});

      let form = $(this).closest('form');
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

      usersDataSourcee.invoke('login', data, function(result, response) {
        if (result) {
          br.redirect(br.request.get('caller', '?from=login'));
        } else {
          if ($('.login-error', form).length > 0) {
            $('.login-error', form).text(response).show();
          } else {
            br.growlError(response);
          }
        }
      });

    });

    $('.action-reset-password').click(function() {

      let data = Object.create({});

      let form = $(this).closest('form');
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

      usersDataSourcee.invoke('remindPassword', data, function(result, response) {
        if (result) {
          br.redirect(br.request.get('caller', 'reset-password-final.html'));
        } else {
          if ($('.reset-password-error', form).length > 0) {
            $('.reset-password-error', form).text(response).fadeIn();
          } else {
            br.growlError(response);
          }
        }
      });

    });

    $('.action-logout').click(function() {

      let data = Object.create({});

      usersDataSourcee.invoke('logout', data, function(result) {
        if (result) {
          document.location = br.baseUrl;
        }
      });

    });

  });

})(jQuery, window);
