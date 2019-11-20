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
      $.ajax({
        url: 'https://api.yemreozan.com/sendMail',
        type: 'POST',
        data: data,
        dataType: 'JSON',
        statusCode: {
          200: function () {
            alert('working!');
          },
          400: function () {
            alert('Not working!');
          }
        },
        error: function () {
          alert('Bad connection!');
        }
      });
    }
  });

  function validate(data) {
    if (data.name.length < 3) {
      return false;
    }
    if (!validateEmail(data.email)) {
      return false;
    }
    if (data.message.length < 3) {
      return false;
    }

    return true;
  };

  function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
});

$(window).on('load', function () {
  new Typed('#typed', {
    strings: ['Yunus Emre.', 'Developer.', 'Deaf.'],
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 700
  });
});