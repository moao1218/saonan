/**
 * Created by Liu Yuhong on 14-9-26.
 */
function resizing() {
    var minWidth = $(".frame_width").width(), bg = $(".bg_header, .bg_top, .bg_site_map, .bg_copy");
    if($(window).width() <= minWidth) {
        bg.css({'width': minWidth});
    } else {
        bg.removeAttr("style");
    }
}
function init() {
    if(screen.width == 1024) {
        $("body").addClass("constricted");
    } else {
        $("body").removeClass("constricted");
    }
    resizing();
}
$(function() {
    init();
    $(window).resize(resizing);

    $("#serviceCenter, #allProduct").bind('mouseenter mouseleave', function(event) {
        var trigger = $(this), menu = $(this).find(".sub_menu");
        if(event.type === 'mouseenter') {
            trigger.addClass("hover");
            menu.slideDown();
        } else {
            trigger.removeClass("hover");
            menu.hide();
        }
    });

    $("label.placeholder input, label.placeholder textarea").bind('mouseout mouseup paste keyup change', function() {
        var val = $(this).val(), text = $(this).siblings("span");
        val.length > 0 ? text.fadeOut() : text.fadeIn();
    });

    $("input[type=text]").bind('mouseout mouseup paste keyup change', function() {
        var placeholder = $(this).siblings("label").find("span");
        $(this).val().length > 0 ? placeholder.fadeOut() : placeholder.fadeIn();
    });

    $("form").bind('reset', function() {
        var fm = this;
        setTimeout(function() {
            $(fm).find("label.placeholder input, label.placeholder textarea").trigger("keyup");
        }, 10);
    });

    $(".pager a.disabled").bind('click', function(e) {
        e.preventDefault();
        this.blur();
        return false;
    });
    $(".pager a.page_no").bind('click', function(e) {
        e.preventDefault();
        this.blur();
        $(this).addClass("current").siblings(".current").removeClass("current");
    });

    $(".gender a").bind('click', function(e) {
        e.preventDefault();
        this.blur();
        $(this).siblings("input").val($(this).is(".male") ? 0 : 1).parent().toggleClass("female", !$(this).is(".male"));
    });

    $(".category_title").bind('mouseenter mouseleave', function() {
        $(this).find(".cate_menu").toggle();
    });

    $(".cate_item").bind('mouseenter mouseleave', function(event) {
        var trigger = $(this), sub = $(this).find(".cate_sub_menu");
        if(event.type === 'mouseenter') {
            trigger.addClass("hover");
            sub.show();
        } else {
            trigger.removeClass("hover");
            sub.stop().hide();
        }
    });
    //点击左侧菜单二级面板，跳转到面板中的“我要投保”或“查看详情”页面
 //   $(".cate_sub_inner").click(function() {
 //       window.location = $(this).find("a.for_detail").attr("href");
//    });
});

//弹出层
	$('.button_a').click(function(){
		$('.pop_circle').show();
		$('.pop_background').show();
	});
	$('.button_b').click(function(){
		$('.pop_success').show();
		$('.pop_circle').hide();
	});
	$('.clos').click(function(){
		$(this).parent().parent().hide();
		$('.pop_background').hide();
	});