$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [ 
            {
                breakpoint: 992,
                settings: {
                    dots: true, 
                    arrows: false
                }
                
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__lists').eq(i).toggleClass('catalog-item__lists_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
    });
    

    $('.button_mini').each(function (i){
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") { // К условию можно добавить что окно уже открыто, проверить style.display
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
        }
      });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name:"required",
                phone:"required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone:"Пожалуйста, введите номер телефона",
                email: {
                  required: "Пожалуйста, введите почту",
                  email: "Неправильно введен адрес почты"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7(999)-999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost/mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
                $(this).find("input").val("");
                $('#consultation, #order').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');

                $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() >1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

});
// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false,
//     responsive: {
//         575: {
//             nav: true
//         }
//     }
//   });

//   document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
//   });

//   document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next');
//   });