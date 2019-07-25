resizeDiv();
window.onresize = function(event) {
    resizeDiv();
}

function resizeDiv() {
    var viewportHeight = $(window).height();
    $('.Open_video_section').css('height', viewportHeight);
}

$(function() {
    $(".Open_video_section__player").YTPlayer({
        showControls: false
    });
    $(".Open_video_section__player").on("YTPTime",function(e){
        var currentTime = e.time;
        if(currentTime === 5){
            $(".Open_video_section").css('position','relative');
            $(".Open_video_section__player").css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%, -50%)',
                'color': '#ffffff',
                'font-size': '8vw',
                'text-align': 'center',

            });
            $(".Open_video_section__player").html(`<h1 class="glitch" data-text="我的第一張AI證照">我的第一張AI證照</h1>`);
        }
        if(currentTime === 8){
            $(".Open_video_section__player").YTPPause();

            $('html,body').animate({
                scrollTop: $('#header').offset().top-52
            }, 250);
            setInterval(function () {
                $(".Open_video_section").hide();
            }, 1000);
            return;
        }

    });
});