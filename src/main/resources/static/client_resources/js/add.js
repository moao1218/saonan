//保障方案，问号详情
$(document).ready(function() {
	//保障方案问号切换，及隐藏
	
	$(".plan-tdt").click(function(){
		//$('.plan')
		//alert(1);
		$(this).toggleClass("plan-disa");
		$(this).parent('.plan-tds').next().children('.plan-tda').toggle();	
	});
	//经济，舒适豪华，选择
	
	$('.plan-mb').click(function(){		
		$(this).addClass('dny-mb').siblings('.plan-mb').removeClass('dny-mb');
		})
	
	//02填写信息-01未登录-单人或多人（1）经济舒适豪华，选择
	$(".ptb").click(function(){
		$('.insu-cha').removeClass("insu-ptb");
		$('.insu-cha').addClass("insu-ptc");
		$(this).addClass("insu-ptb");		
	});
	$(".ptc").click(function(){
		$('.insu-cha').removeClass("insu-ptb");
		$('.insu-cha').addClass("insu-ptc");
		$(this).addClass("insu-ptb");		
	});
	$(".ptd").click(function(){
		$('.insu-cha').removeClass("insu-ptb");
		$('.insu-cha').addClass("insu-ptc");
		$(this).addClass("insu-ptb");		
	});
	//02填写信息-01未登录-单人或多人（1）经济鼠标滑过的效果
	$(".insu-cha").mouseover(function(){
		$(this).next().toggleClass("plan-dis");
	});
	$(".insu-cha").mouseout(function(){
		$(this).next().toggleClass("plan-dis");
	});/*2014-11-3*/
	/*$(".ptc").mouseover(function(){
		$('.emic-dtal1').toggleClass("plan-dis");
	});
	$(".ptc").mouseout(function(){
		$('.emic-dtal1').toggleClass("plan-dis");
	});
	$(".ptd").mouseover(function(){
		$('.emic-dtal2').toggleClass("plan-dis");
	});
	$(".ptd").mouseout(function(){
		$('.emic-dtal2').toggleClass("plan-dis");
	});*/
	//保障方案问号，切换，效果，主要是IE6
	$(".plan-tdb").mouseover(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tdb").mouseout(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tdc").mouseover(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tdc").mouseout(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tdd").mouseover(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tdd").mouseout(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tde").mouseover(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tde").mouseout(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tdi").mouseover(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	$(".plan-tdi").mouseout(function(){
		$(this).children().toggleClass("plan-que");
		$(this).children(".plan-tdt").toggleClass("plan-tdta");
	});
	
	
		//数量减少操作 
	/*$(".add").click(function(){ 
	var t =$(this).siblings(".text_box"); 
	
	if (parseInt(t.val())==0){ 
	t.val(parseInt(0)); 
	} 
	else{ 
	t.val(parseInt(t.val())-1); 
	} 
	}); 
	//数量增加操作 
	$(".reduce").click(function(){ 
	var t =$(this).siblings(".text_box"); 
	t.val(parseInt(t.val())+1) 
	
	});*/
	//日期弹框-delete-1209
/*	$(".st-inp").blur(function(){
		$('.con-ic1').removeClass("none");
		$('.con-ic1').addClass("bloc");	
	});
	$(".st-inp").focus(function(){
		$('.con-ic1').removeClass("bloc");
		$('.con-ic1').addClass("none");	
	});
	
	$(".peo-inp").blur(function(){
		$('.con-ic2').removeClass("bloc");
		$('.con-ic2').addClass("none");
		$('.con-ic').removeClass("none");
		$('.con-ic').addClass("bloc");
	//	$('.peo-num').css('margin-top','14px');	
	});
	$(".peo-inp").focus(function(){
	//	$('.peo-num').css('margin-top','14px');	
		$num =$('.peo-inp').val;
		if($num==0&&$num>299){
			$('.con-ic').removeClass("none");
			$('.con-ic').addClass("bloc");
		}else{
			$('.con-ic').removeClass("bloc");
			$('.con-ic').addClass("none");
			$('.con-ic2').removeClass("none");
			$('.con-ic2').addClass("bloc");	
		}	
	});*/
	$('.sex-clic').click(function(){
		$('.chek-sex').css('display','block');
		$(this).addClass('add-sexbg');
	});
	/*$('.info-cil ,.info-cil1').click(function(){
		$(this).parents('tr').find('td').siblings().children('div').toggleClass("none");
	});
	$('.info-cil2').click(function(){
		$(this).parents('tr').remove();
	});*/
	$(".add1").click(function(){
   $(this).parent().prev().append(function(n){
      return '<tr><td>1</td><td align="center"><div class="w115"><span class="plan-nam  adddiv"><input type="text" class="please_input2" value="请输入被保险人姓名"></span></div></td><td><div class="selectDiv select select1"><span class="sle-span1">港澳居民来往内地通行证</span><ul class="w179"><li>港澳居民来往内地通行证2</li><li>居民身份证</li></ul></div></td><td><div class=" pr_div inp-text1"><span class="inp-paln140 adddiv"><input type="text" class="please_input2" value="请输入证件号"></span> <div class="caution"><div class="ff" style="display:none;">证件号会关系到索赔，请您仔细填写</div> </div></div></td><td><div class="selectDiv select select_90"><!--出错红框add-sexbg--><span class="sle-span1">男</span><ul><li>男</li><li>女</li></ul></div></td><td align="center"><div class="pr_div time112"><span class="textBirthday2 textBirthday21 adddiv"><input type="text" value="1991/11/11"/ ></span></div></td><td><div class="selectDiv select select_90"><!--出错红框add-sexbg--><span class="sle-span1">2份</span><ul><li>3份</li><li>4份</li></ul></div></td> <td class="statement"><div class="info-chek"><span class="inputSpan active"></span></div></td><td class="delBorser"><a href="javascript:;">保存</a> <a>/</a>  <a href="#">删除</a></td></tr>';
    });
  });
$(".add2").click(function(){
   $(this).parent().prev().append(function(n){
      return '<tr><td>1</td><td align="center"><div class=" inp-text"><span class="inp-paln1 addname"><input type="text" value="请输入被保险人姓名"/ class="please_input2 input-ple input-ple1 make"></span></div></td><td><div class="selectDiv select select1"><span class="sle-span1">港澳居民来往内地通行证</span><ul class="w179"><li>港澳居民来往内地通行证2</li><li>居民身份证</li></ul></div></td><td><div class="inp-text pr_div"><span class="inp-paln1 adddiv"><input type="text" value="请输入证件号码"/ class="please_input2 input-ple input-ple1"></span><div class="caution"><div class="ff" style="display:none;">证件号会关系到索赔，请您仔细填写</div><div class="erroInput" style="display:none;">请输入正确的时间</div><!---错误提示----></div></div></td><td><div class="selectDiv select select_90"><!--出错红框add-sexbg--><span class="sle-span1">男</span><ul><li>男</li><li>女</li></ul></div></td><td align="center"><div class="pr_div time112"><span class="textBirthday2 textBirthday21 adddiv"><input type="text" value="1991/11/11"/ ></span></div></td><td><div class="selectDiv select select_90"><!--出错红框add-sexbg--><span class="sle-span1">2份</span><ul><li>3份</li><li>4份</li></ul></div></td><td class="delBorser"><a href="javascript:;">保存</a> <a>/</a>  <a href="#">删除</a></td></tr>';
    });
  });  
});

$('.adddiv input').focus(function(){
	$(this).parent().next('.caution').find(".ff").fadeIn();
});
$('.adddiv input').blur(function(){
	$(this).parent().next('.caution').find(".ff").hide();
});

$('.adddiv input').blur(function(){
	$(this).parent().next('.caution').find(".erroInput").fadeIn();
	$(this).parent().addClass("errorText2");
});
$('.adddiv input').focus(function(){
	$(this).parent().next('.caution').find(".erroInput").hide();
	$(this).parent().removeClass("errorText2");
});

$('.addname input').blur(function(){
	$(this).parent().next('.caution').find(".erroInput").fadeIn();
	$(this).parent().parent().addClass("errorText2");
});
$('.addname input').focus(function(){
	$(this).parent().next('.caution').find(".erroInput").hide();
	$(this).parent().parent().removeClass("errorText2");
});


/*一年期交通综合意外险*/
$(".plan-s").mouseover(function(){
	$(".plan-s").children().toggleClass("plan-que");
	$(".plan-s").children(".plan-co").toggleClass("plan-tdta");
});
$(".plan-s").mouseout(function(){
	$(".plan-s").children().toggleClass("plan-que");
	$(".plan-s").children(".plan-co").toggleClass("plan-tdta");
});
$(".plan-co").click(function(){
	$(this).toggleClass("plan-disa");
	$(this).parent('.plan-tds').next().next().next().next().children('.plan-tda').toggle();	
});
$('.info-cil').click(function(){
	$('.pop_modify').show();
	$(".background").show();
	$('.preTitle').addClass('modiy_pr');
});
$(".pop_modify .close").click(function(){
	 $(".pop_modify").hide();
	 $(".background").hide();
	 $('.preTitle').removeClass('modiy_pr');
	 $('.preTitle').hide();
	});
//提示框
$('.prompt_f input').focus(function(){
	$(this).parents('dd,li').append(function(n){
	  return '<div class="point"><span class="left"></span><span class="con">请核对您的信息哦!</span><span class="right"></span></div>';
	  });
	  $(this).parents('dd,li').find('.point').fadeIn();
});
$('.prompt_f input').blur(function(){
	$(this).parent().siblings(".point").hide().remove();
});
$('.prompt_f1 input').focus(function(){
	$(this).parents('dd,li').append(function(n){
	  return '<div class="point"><span class="left"></span><span class="con">日期的选择将会影响到保险期间和保费金额，请核对下哦!</span><span class="right"></span></div>';
	  });
	  $(this).parents('dd,li').find('.point').fadeIn();
});
$('.prompt_f1 input').blur(function(){
	$(this).parent().siblings(".point").hide().remove();
});
$('.prompt_f2 input').focus(function(){
	$(this).parents('dd,li').append(function(n){
	  return '<div class="point"><span class="left"></span><span class="con">请填写真实有效手机号，方便我们及时为您提供优质服务</span><span class="right"></span></div>';
	  });
	  $(this).parents('dd,li').find('.point').fadeIn();
});
$('.prompt_f2 input').blur(function(){
	$(this).parent().siblings(".point").hide().remove();
});
$('.prompt_f3 input').focus(function(){
	$(this).parents('dd,li').append(function(n){
	  return '<div class="point"><span class="left"></span><span class="con">请填写真实有效邮箱，方便我们及时为您提供优质服务</span><span class="right"></span></div>';
	  });
	  $(this).parents('dd,li').find('.point').fadeIn();
});
$('.prompt_f3 input').blur(function(){
	$(this).parent().siblings(".point").hide().remove();
});
//普通框错误提示
$(".card input").bind('blur',function(){
	$(this).parents('dd,li').append(function(n){
	  return '<div class="errorLook"><span class="left"></span><span class="con">请输入正确的信息</span><span class="right"></span></div>';
	  });
	  $(this).parent().addClass(' errorText1');
	});
$(".card input").bind('focus',function(){
	$(this).parent().siblings(".errorLook").remove();
	$(this).parent().removeClass(' errorText1');
	});
//时间框错误提示
$(".cardtime input").bind('blur',function(){
	$(this).parents('dd,li').append(function(n){
	  return '<div class="errorLook"><span class="left"></span><span class="con">日期的选择将会影响到保险期间和保费金额，请核对下哦!</span><span class="right"></span></div>';
	  });
	  $(this).parent().addClass(' errortime');
	});
$(".cardtime input").bind('focus',function(){
	$(this).parent().siblings(".errorLook").remove();
	$(this).parent().removeClass(' errortime');
	});
$('.info-cil2').click(function(){
	$(".prompt_delete").show();
	$(".background").show();
});
//关闭弹出框
$(".close").click(function(){
	 $(this).parent().parent().hide();
	 $(".background").hide();
	});