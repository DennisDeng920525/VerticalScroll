(function ($) {
    //author:dennis
    //date:2017/6/22
    //version:1.0
    //license:MIT

    $.verticalScroll = function (element, options) {
        var defaults = {
            list: [], //滚动内容
            speed: 2000, //滚动速度
            placement: 'scroll' //触摸滑动元素 'belt'(两边的滑动皮带),'scroll'(最左边的滑轮),'content'(中间的内容)
        };

        var vs = this;

        vs.settings = {};

        var $element = $(element);

        vs.init = function () {
            vs.settings = $.extend({}, defaults, options);
            $element.append('<div class="content"><span class="broder-scroll left">' +
                '<img src="src/image/border-scroll-left.png" /><img src="src/image/border-scroll-left.png" /><img src="src/image/border-scroll-left.png" />' +
                '</span><ul class="template">' +
                '<li></li><li class="current"></li><li></li></ul><ul class="items"></ul><span class="broder-scroll right">' +
                '<img src="src/image/border-scroll-right.png" /><img src="src/image/border-scroll-right.png" /><img src="src/image/border-scroll-right.png" /></span></div>' +
                '<div class="operate">' +
                '<span class="up"> <img src="src/image/up.png" /></span>' +
                '<a class="scroll" id="scroll"><div class="cyc-scroll">' +
                '<img src="src/image/scroll.png" /><img src="src/image/scroll.png" /><img src="src/image/scroll.png" /></div></a>' +
                '<span class="down"><img src="src/image/down.png" /></span>' +
                '</div>');
            var ulElement = "";
            for (var i = 0; i < vs.settings.list.length; i++) {
                ulElement = ulElement + "<li>" + vs.settings.list[i] + "</i>";
            }
            $element.find(".items").append(ulElement);
            $element.find(".items li:eq(1)").addClass("current");

            function regroupli(ul, isUp) {
                var $ul = $(ul);
                $ul.find("li").removeClass("current");
                if (isUp == true) {
                    $ul.append($(ul).find('li:first'));
                } else {
                    $ul.prepend($(ul).find('li:last'));
                }
                $element.find(".items li:eq(1)").addClass("current");
            }

            function up(interval) {
                $(".broder-scroll,.cyc-scroll").animate({ "top": '-200%' }, interval, "linear", function () {
                    $(".broder-scroll,.cyc-scroll").css("top", '-100%');
                });
                $element.find(".items").animate({ "top": '-35%' }, interval, "linear", function () {
                    $("#verticalScroll .items").css("top", '0');
                    regroupli($element.find(".items"), true);
                });
            }

            function down(interval) {
                if ($(".broder-scroll.left img").length <3) {
                    $(".broder-scroll.left img:first").before($(".broder-scroll.left img:first").clone());
                    $(".broder-scroll.right img:first").before($(".broder-scroll.right img:first").clone());
                }
                $(".broder-scroll,.cyc-scroll").animate({ "top": '0' }, interval, "linear", function () {
                    $(".broder-scroll,.cyc-scroll").css("top", '-100%');
                });

                $element.find(".items").animate({ "top": '35%' }, interval, "linear", function () {
                    $("#verticalScroll .items").css("top", '0');
                    regroupli($element.find(".items"), false);
                });
            }

            var startY,
                y; //滑动的距离
            var once = true;
            function touchSatrt(e) {//触摸 
                e.preventDefault();
                var touch = e.touches[0];
                startY = touch.pageY; //刚触摸时的坐标 
            }

            function touchMove(e) {//滑动 
                e.preventDefault();
                var touch = e.touches[0];
                y = touch.pageY - startY;//滑动的距离 
                if (once == true) {
                    if (y > 0) {
                        down(vs.settings.speed);
                    } else {
                        up(vs.settings.speed);
                    }
                    once = false;
                }
            }

            function touchEnd(e) {//手指离开屏幕 
                once = true;
                e.preventDefault();
            }

            function getTouchElement() {
                if (vs.settings.placement === 'content') {
                    return $("#verticalScroll .items");
                }else if (vs.settings.placement === 'belt') {
                    return $("#verticalScroll .broder-scroll");
                } else {
                    return $("#scroll");
                }
            }

            var touchElement = getTouchElement();
            $(touchElement).each(function() {
                $(this)[0].addEventListener('touchstart', touchSatrt, false);
                $(this)[0].addEventListener('touchmove', touchMove, false);
                $(this)[0].addEventListener('touchend', touchEnd, false);
            });
            //document.getElementById("scroll").addEventListener('touchstart', touchSatrt, false);
            //document.getElementById("scroll").addEventListener('touchmove', touchMove, false);
            //document.getElementById("scroll").addEventListener('touchend', touchEnd, false);

            $(".roll .operate .down").on("click", function () {
                down(vs.settings.speed);
            });
            $(".roll .operate .up").on("click", function () {
                up(vs.settings.speed);
            });
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