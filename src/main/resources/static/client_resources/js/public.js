/*
 * Create by wangqi at 20160612
 */
$(function(){
	$(".js-input").keyup(function(){
		placeholder($(this));
	}).blur(function(){
		if($(this).val() == "" || $(this).val() == null){
			placeholder($(this));
			$(this).parents(".input-item").addClass("error");
			return false;
		}else{
			$(this).parents(".input-item").removeClass("error");
		}
	});
	
	//登录页面和登录弹层tab切换
	$(".login-tab-list").children("li").click(function(){
		var $this = $(this),
			$index = $this.index();
		if(!$this.hasClass("current")){
			$this.addClass("current").siblings().removeClass("current");
			$(".form-box").children("form").addClass("hide").eq($index).removeClass("hide");
		}
	});
	//获取验证码
	$(".get-captcha-btn").click(function(){
		getCodeCountDown($(this),"重发验证码","后重新获取");
	});
	//发送短信动态密码
	$(".send-sms-btn").click(function(){
		getCodeCountDown($(this),"重发动态密码","后重新发送");
	});
	
	//注册页面
	$(".ques-btn").click(function(){
		$(this).toggleClass("checked");
		$(this).parents(".input-bar").siblings(".recommendcode-box").toggle();
	})
	$("#telephoneNum").focus(function(){
		$(this).siblings(".phone-hint").show();
	}).blur(function(){
		$(this).siblings(".phone-hint").hide();
	});
	$(".login-dialog-close").click(function(){
		closeDialog(".rl-mask",$(this).parent(".rl-dialog"));
	})
	
	setHeight();
})
//发送验证码
function getCodeCountDown(ele,txt1,txt2) {
	var delay = 60, trigger = ele, revert = txt1; //todo: do something to send validate code to cellphone.        
	$(trigger).attr({
		"disabled": true
	}).val(delay + "s" + txt2).addClass("disabled");
	if ($(trigger).hasClass("active")) {
		$(trigger).removeClass("active");
	}
	var counter = setInterval(function() {
		$(trigger).val($(trigger).val().replace(delay, --delay));
		if (delay == 0) {
			window.clearInterval(counter);
			$(trigger).val(revert).removeAttr("disabled").removeClass("disabled");
		}
	}, 1000);
}
//模拟placeholder
var placeholder = function(el) {
	var $this = el,
		$val = $this.val();
	if ($val === "" || $val === null) {
		$this.siblings(".placeholder").show();
	} else {
		$this.siblings(".placeholder").hide();
	}
}
//关闭弹层
function closeDialog(mask,dialog){
	$(mask).hide();
	dialog.hide();
}
function setHeight(){
	$("body").addClass("hauto");
	var $winH = $(window).height();	
	var $bodyH = $(document.body).height();
	if($bodyH > $winH){
		$(".rl-mask").height($bodyH);
	}else{
		$("body").removeClass("hauto");
		$(".rl-mask").height($winH+200);
	}
}
function dropDownMenu(el, H) {
	$(el).click(function() {
		var $select = $(this);
		var $selectMenu = $select.find("ul:first");
		if ($selectMenu.css("display") === "none") {
			$selectMenu.show();
			if ($selectMenu.height() > H) {
				$selectMenu.css({
					height: H,
					overflowY: "scroll"
				});
			};
			$select.css("z-index", "999");
			$selectMenu.hover(function() {},
				function() {
					$selectMenu.hide();
					$select.css("z-index", "1");
				});
			$select.hover(function() {},
				function() {
					$selectMenu.hide();
					$select.css("z-index", "1");
				});
			$selectMenu.find("li").mouseenter(function() {
				$selectMenu.find("li").click(function() {
					if ($(this).text() === $select.children("input").val()) {
						$selectMenu.hide();
						return false;
					} else {
						$select.children("input").val($(this).text());
					}
					$selectMenu.fadeOut("fast");
				});
			});
		} else {
			$selectMenu.hide();
		}
	});
}