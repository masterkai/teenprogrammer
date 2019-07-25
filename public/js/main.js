$(function () {
    $('.venobox').venobox();

    $('.ai-courses').slick({
        infinite: true,
        speed: 300,
        dots: true,
        adaptiveHeight: true,
        // arrows: false,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            }
        ]

    });

    $('.videos').slick({
        infinite: true,
        speed: 300,
        dots: true,
        autoplay: false,
        mobileFirst: true,
        slidesToShow: 1,
        arrows: true,
        prevArrow: $('.prev-v'),
        nextArrow: $('.next-v'),
        responsive: [
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 3,
                    slideToScroll: 3,
                    infinite: true,
                    dots: true,
                    arrows: true,
                    prevArrow: $('.prev-v'),
                    nextArrow: $('.next-v'),
                }
            }
        ]

    });

    $('.courseBtn a').click(function (e) {
        e.preventDefault();
        // console.log('test!!' + $(this).index());
        let slideIndex = $(this).index();
        $('.ai-courses').slick('slickGoTo', slideIndex);

    });
    $('.ai-course-intro').click(function (e) {
        e.preventDefault();
        // console.log($(this).parent().parent().parent().children('tbody tr:even'));
        console.log($(this).children()[0].className);
        let addorRemove = $(this).children()[0].className;
        let courseContent = $(this).parent().parent().parent().children('tbody').children('tr:nth-child(even)');

        if(addorRemove==='triangle-down'){
            $(this).children().removeClass('triangle-down');
            $(this).children().addClass('triangle-up');
        }else {
            $(this).children().removeClass('triangle-up');
            $(this).children().addClass('triangle-down');
        }

        courseContent.slideToggle('fast');
    });
})