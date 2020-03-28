$(document).ready(function () {
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          event.preventDefault();

          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            var $target = $(target);
            $target.focus();

            if ($target.is(':focus')) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            }
          });
        }
      }
    });

  $('[data-toggle="tooltip"]').tooltip();

  $('#send-button').click(function () {
    var data = {
      name: $('input[name=name]').val(),
      email: $('input[name=email]').val(),
      message: $('textarea[name=message]').val()
    };

    if (validate(data)) {
      $('#send-button').prop('disabled', true);
      $('#send-button').text('sending');

      $.ajax({
        url: 'https://api.yemreozan.com/sendMail',
        type: 'POST',
        data: data,
        dataType: 'JSON',
        statusCode: {
          200: function () {
            $('#send-button').text('done');

            setTimeout(function () {
              $('#send-button').prop('disabled', false);
              $('#send-button').text('send');
              cleanForm();
            }, 3000);
          },
          400: function () {
            $('#send-button').text('fail');

            setTimeout(function () {
              $('#send-button').prop('disabled', false);
              $('#send-button').text('send');
            }, 3000);
          }
        },
        error: function () {
          $('#send-button').prop('disabled', false);
          alert('Fail connection!');
        }
      });
    }
  });

  function validate(data) {
    var animated = 'animated shake';
    var animatedEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    var isValid = true;

    if (data.name.length < 3) {
      $('input[name=name]').addClass(animated).one(animatedEnd, function () {
        $('input[name=name]').removeClass(animated);
      });

      isValid = false;
    }

    if (!validateEmail(data.email)) {
      $('input[name=email]').addClass(animated).one(animatedEnd, function () {
        $('input[name=email]').removeClass(animated);
      });

      isValid = false;
    }

    if (data.message.length < 3) {
      $('textarea[name=message]').addClass(animated).one(animatedEnd, function () {
        $('textarea[name=message]').removeClass(animated);
      });

      isValid = false;
    }

    return isValid;
  };

  function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  function cleanForm() {
    $('input[name=name]').val('');
    $('input[name=email]').val('');
    $('textarea[name=message]').val('');
  }
});

$(window).on('load', function () {
  $('#pre-loader').delay(100).fadeOut('slow');
  new Typed('#typed', {
    strings: ['Yunus Emre.', 'Developer.', 'Deaf.'],
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 700
  });
});