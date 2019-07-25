$(function () {
    $('#navbar ul li a[href^="#"],.courseBtn a.btn-go__mobile[href^="#"], .btn-join[href^="#"]').on('click', function (e) {
        e.preventDefault();
        let hash = this.hash;
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 500, function () {
            window.location.hash = hash;
        });
    });
});