// JavaScript Document
/* 右侧浮动开始*/
function rightfloat(){
	var divH=$("#rightFloat").height();
	var _height=$(window).height()-divH-4;
	var _width=$(window).width();
	var _right=(_width-1000)/2-32;
	$("#rightFloat").css({"right":_right});
	if(_width>=1030){
		$("#rightFloat").css({"right":_right});
		}
	else{
		$("#rightFloat").css({"right":0});
		}
	}
//首先将#back-to-top隐藏
	$(".a_title").hide();
	//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
	$(function () {
	$(window).scroll(function(){
	rightfloat();	
	if ($(window).scrollTop()>300){
	$(".a_title").fadeIn(100);
	}
	else
	{
	$(".a_title").fadeOut(100);
	}
	});
	//当点击跳转链接后，回到页面顶部位置
	$(".a_title").click(function(){
	$("html").animate({scrollTop:0},500);
	return false;
	});
	});
$(window).resize(function(){	
	rightfloat();
	});
$(window).ready(function(){	
	rightfloat();
	$('.btnCompare').click(function(){
		rightfloat();
		});	
	});	
