(function ($) {
    //author:dennis
    //date:2017/6/22
    //version:1.0
    //license:MIT

    $.verticalScroll = function (element, options) {
        var defaults = {
            list: [], //滚动内容
            speed: 2000 //滚动速度
        };

        var vs = this;

        vs.settings = {};

        var $element = $(element);

        vs.init = function () {
            vs.settings = $.extend({}, defaults, options);
            $element.append('<div class="broder-scroll left">' +
                            '<span class="angle top"></span>' +
                            '<div class="belt-relative"><div class="belt"><span></span><span></span><span></span></div></div>' +
                            '<span class="angle bottom"></span></div>' +
                            '<div class="content"><img src="src/image/B1.jpg"/>' +
                            '<ul class="items"></ul></div><div class="broder-scroll right"><span class="angle top"></span>' +
                            '<div class="belt-relative"><div class="belt"><span></span><span></span><span></span></div></div><span class="angle bottom"></span></div>');
            var ulElement = "";
            for (var i = 0; i < vs.settings.list.length; i++) {
                ulElement = ulElement + "<li>" + vs.settings.list[i] + "</i>";
            }
            $element.find(".items").append(ulElement);
            $element.find(".items li:eq(1)").addClass("current");
            $element.find(".items").prepend($element.find(".items").find('li:last'));

            function up(interval) {
                var $ul = $("#verticalScroll .items");
                $ul.append($ul.find('li:first'));
                $ul.find('.current').css({ 'font-size': "1.5rem" });
                $(".broder-scroll,.belt").animate({ "top": '-200%' }, interval, "linear", function () {
                    $(".broder-scroll,.belt").css("top", '-100%');
                });
                $element.find(".items").animate({ "top": '-65%' }, interval, "linear", function () {
                    $(this).css({ "top": '-30%' });
                    $ul.find("li").removeClass("current");
                    $element.find(".items li:eq(2)").addClass("current");
                    $ul.find('.current').css({ 'font-size': "3rem" });
                });
            }

            function down(interval) {
                var $ul = $("#verticalScroll .items");
                $ul.prepend($ul.find('li:last'));
                $ul.find('.current').css({ 'font-size': "1.5rem" });
                $(".broder-scroll,.belt").animate({ "top": '0' }, interval, "linear", function () {
                    $(".broder-scroll,.belt").css("top", '-100%');
                });

                $element.find(".items").animate({ "top": '5%' }, interval, "linear", function () {
                    $("#verticalScroll .items").css({ "top": '-30%' });
                    $ul.find("li").removeClass("current");
                    $element.find(".items li:eq(2)").addClass("current");
                    $ul.find('.current').css({ 'font-size': "3rem" });
                });
            }

            var startY, y;
            var once = true;
            function touchSatrt(e) {
                e.preventDefault();
                var touch = e.touches[0];
                startY = touch.pageY;
            }

            function touchMove(e) {
                e.preventDefault();
                var touch = e.touches[0];
                y = touch.pageY - startY;
                if (once == true) {
                    if (y > 0) {
                        down(vs.settings.speed);
                    } else {
                        up(vs.settings.speed);
                    }
                    once = false;
                }
            }

            function touchEnd(e) {
                once = true;
                e.preventDefault();
            }

            $("#verticalScroll .content")[0].addEventListener('touchstart', touchSatrt, false);
            $("#verticalScroll .content")[0].addEventListener('touchmove', touchMove, false);
            $("#verticalScroll .content")[0].addEventListener('touchend', touchEnd, false);
        };

        vs.init();

    };

    $.fn.verticalScroll = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('verticalScroll')) {
                var vs = new $.verticalScroll(this, options);
                $(this).data('verticalScroll', vs);
            }
        });
    };

})(jQuery);