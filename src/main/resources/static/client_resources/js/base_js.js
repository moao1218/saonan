// JavaScript Document

/*
 * 显示提示
 */
function showValidateResult(id,msg){
//	if($("#error_"+id).length>0){
//		$("#error_"+id).remove();
//	}
	if(msg!=""){
//		$("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
		$("#"+id).parents().addClass('errorText').after("<div class='errorLook'><span class='left'></span> <span class='con'>"+msg+"</span><span class='right'></span></div>");
//		nextAll('.errorLook').css('display','inline-block').fadeIn();
	}
}

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
	$("html,body").animate({scrollTop:0},500);
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
//	var _width=$(window).width();
//	var _right=(_width-1000)/2-32;	
//	$(".rightFloat_pro").css({"right":_right});
	/*if($("#processbar").length>0 && $("#processbar").val()== "Info" && $("#accounttype").length>0 && $("#accounttype").val()!=""){
		s_picc.pageName="非车险:V盟支付";
		s_picc.t();
	}	*/
	});	

	 /*模拟下拉列表框开始 */
	 //ul的id必须是"ul_"加上要赋值的id名字
	 //li的value用strValue代替
	 $(".select").click(function(){
		 var thisinput=$(this); 
		 var thisul=$(this).find("ul");
		 var firstRelation = $("#relation").val();
		 if(thisul.css("display")=="none"){ 
		 if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })}; 
		 thisul.fadeIn("100"); 
		 thisinput.css("z-index","999"); 
//		 thisul.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");}) 
//		 thisinput.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");})
		 thisul.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");thisul.css({height:"auto","overflow-y":"hidden" });}) 
		 thisinput.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");thisul.css({height:"auto","overflow-y":"hidden" });})
		 thisul.find("li").unbind('click');
		 thisul.find("li").click(function(){
			 var liVar=$(this).attr("strValue");
			//if(liVar.length==1){liVar="0"+liVar;}
			var aul=thisinput.children("ul").attr("id").substr(3);
			if(aul=="comcode"){
				var companyName = $(this).text().length > 12?$(this).text().substring(0,12)+ '..':$(this).text();
				thisinput.children("span").text(companyName);thisul.fadeOut("100"); 
			}else{
				thisinput.children("span").text($(this).text());thisul.fadeOut("100");
			}
			$("#"+aul).val(liVar);
			if("JCO" == $("#productcode").val()&&"propertyqaddress"==aul){
				$("#propertyqaddressname").val($(this).text());
			}
			if(aul=="input_applyIndentifyType"){
				if("EDD_R" == $('#productcode').val()&&$("#input_applyBirthday").val()!=""){
					setIdentifySexandBirthdayEDDR('apply');
					checkApplyBirthdayForEDDR('input_applyBirthday','input_applyIdentifyNumber','input_applyIndentifyType');
					checkApplyNumber('input_applyIdentifyNumber');setNationality();
					
				}else if("ZFO"==$('#productcode').val()){
					checkApplyNumber('input_applyIdentifyNumber');
					if(liVar!='01'&& liVar!='02'){
						checkApplyBirthday('input_applyBirthday','input_applyIdentifyNumber','input_applyIndentifyType');
					}
					setApplyIdentifySexand();
					setIdentifySexandBirthdayZFO('apply');
					setNationality();
				}else{
					setApplyIdentifySexand();checkApplyNumber('input_applyIdentifyNumber');setNationality();
				}
				if("LEF"==$('#productcode').val()){
					showInvoiceRatePop();
				}
			}else if(aul=="input_identifytype"&&"JAB_A"!=$('#productcode').val()&&"EAL_L"!=$('#productcode').val()&&"JTE_S"!=$('#productcode').val()&&"WAF_N"!=$('#productcode').val()&&"ZFO"!=$('#productcode').val()){
				if("ECR"==$('#productcode').val()){
					setIdentifySex();setIdentifyBirthday();setApplyMsg();
				}else if("EDD_R" == $('#productcode').val()){
					setIdentifyBirthday();checkInsuredBirthdayForEAA('input_insuredBirthday','input_identifyNumber','input_identifytype');checkIdentifyNumberForSingleInsured();setApplyMsg();
				}else if("JCO"==$('#productcode').val()){
					checkIdentifyNumberForSingleInsured();setIdentifyBirthday();checkInsuredBirthdayForEAA('input_insuredBirthday','input_identifyNumber','input_identifytype');checkIdentifyNumberForSingleInsured();setApplyMsg();
				}
				else{
				checkIdentifyNumberSexHealth("insuredSexSel");checkIdentifyNumberHealth('input_identifyNumber');
				}
			}else if(aul=='input_identifytype'&&"JAB_A"==$('#productcode').val()){
				checkIdentifyNumberJABA('input_identifyNumber');setApplyMsg();
			}else if(aul=="modify_insuredIndentifyType"){
				setIdentifySexandBirthday("modify_insuredIndentifyType");checkIdentifyNumberModified("modify_insuredIndentifyType");
			}else if(aul=="compare_risktype"){
				$("#"+aul).val($(this).attr("c"));
				getProductByRisk();
				$("#fixed_risk").removeClass('grayfont');
				$('#fixed_productcode').html('选择产品');
				$("#fixed_productcode").addClass('grayfont');
				$('#compare_productcode').val('');
				if(!$("#submitCompare").hasClass("addInputBj")){
					$("#submitCompare").addClass('addInputBj');
				}
			}/*else if("relation"==aul && "EAL_L"!= $('#productcode').val()&& "EJQ_Z"!= $('#productcode').val()){
				changeRelation('${prpbcode.codecode}');hideTipsNew('relationSpan');
			}else if("relation"==aul && "EAL_L"== $('#productcode').val()){
				changeRelation(firstRelation);hideTipsNew('relationSpan');
			}*/else if("YEHKM"==$('#productcode').val()&&("luggage_count"==aul||"bl_count"==aul)){
				calculateFee("sync");
			}else if("EAL_L"==$('#productcode').val()&&("insuranceperiod"==aul)){
				checkStartDate();showEndDate("startdate","EAL_L");calculateFee("1");
			}else if("EAJ_G"==$('#productcode').val()&&("insuranceperiod"==aul)){
				checkStartDate();showEndDate("startdate","EAJ_G");setTdDate();calculateFee("1");
			}else if("EAL_L"==$('#productcode').val()&&("input_identifytype"==aul)){
				setInsuredIdentifySexand();setIdentifySexandBirthday('');checkInsuredBirthdayEAL();checkIdentifyNumber_("input_identifyNumber");checkInsuredIdentifyNumberSex_();setApplyMsg();
			}else if(("JTE_S"==$('#productcode').val() || "WAF_N"==$('#productcode').val() || "ZFO"==$('#productcode').val()) && ("input_identifytype"==aul)){
				selectIdentifyTypeLi(liVar);setIdentifyBirthday();checkIdentifyNumberForSingleInsured();setApplyMsg();maxViewHide('input_identifyNumber');
			}else if(aul=="compare_productcode"){
				$("#submitCompare").removeClass('addInputBj');
				var compare_productcode = $(this).attr("c");
				$("#"+aul).val(compare_productcode);
				var compareProductes = $("#compareProductes").val();
				var compareProductArr = compareProductes.split(",");
				var flag="0";
				for(var i=0;i<compareProductArr.length;i++){
					if(compare_productcode==compareProductArr[i]){
						flag="1";
						break;
					}
				}
				if(flag=="1"){
//					showTipsWindown("该产品已加入对比！");
				}else{
					if(compareProductes==''){
						$("#compareProductes").val(compare_productcode);
					}else{
						$("#compareProductes").val(compareProductes+','+compare_productcode);
					}
				}
				if($("#fixed_productcode").hasClass('grayfont')){
					$("#fixed_productcode").removeClass('grayfont');
				}
			}
		 }); 
			
		 } 
		 else{ 
		 thisul.fadeOut("fast"); 

		 } 
		 })

//性别
//		$('.sex').click(function(){
//			$(this).toggleClass('girl');	
//		});
//		$('.inputSpan').click(function(){
//			$(this).toggleClass('active');
//			if($(this).hasClass('active')){
//				$(this).find('input[type="checkbox"]').attr("checked","true");
//			}
//			else{
//				$(this).find('input').attr("checked","false");
//			}
//		});
		
		//提示框和错误框
		$('.papers').focus(function()
		{	
			var s=$(this).offset();
			$(this).parents('.texts').removeClass('errorText').next('.caution').find('.ff').show().next('.erroInput').hide();
			$('.ff').fadeIn();
			$('.erroInput').hide();
			$('.caution').css({'left':s.left, 'top':s.top-59});
			
		});
		$('.papers').blur(function(){
			$(this).parents('.texts').addClass('errorText').next('.caution').find('.ff').hide().next('.erroInput').show();
			$('.ff').hide();
			$('.erroInput').show();
		});
		
//		$('.addressText').focus(function(){
//			$(this).parents('.textAddress').nextAll('.Newpoint').fadeIn();
//		});
//		$('.addressText').blur(function(){
//			$(this).parents('.textAddress').nextAll('.Newpoint').hide();
//		});
//		
//		$('.mobile').focus(function(){
//			$(this).parents('.texts').next().fadeIn();
//		});
//		$('.mobile').blur(function(){
//			$(this).parents('.texts').next().hide();
//		});
//		
//		$('.Email').focus(function(){
//			$(this).parents('.texts').next().fadeIn();
//		});
//		$('.Email').blur(function(){
//			$(this).parents('.texts').next().hide();
//		});
//		$('.card input').blur(function(){
//			$(this).parent().addClass(' errorText').nextAll('.errorLook').css('display','inline-block').fadeIn();
//		});
//		$('.card input').focus(function(){
//			$(this).parent().removeClass(' errorText').nextAll('.errorLook').css('display','none').hide();
//		});
//		$('.please_textarea').focus(function(){
//			$(this).removeClass(' errorText').nextAll('.errorLook').css('display','none').hide();
//		});
//		$('.please_textarea').blur(function(){
//			$(this).addClass(' errorText').nextAll('.errorLook').css('display','inline-block').fadeIn();
//		});
		$('.inputSpan_red').click(function(){
			$(this).toggleClass('active');
		});
		
//		$('.jiSong_style .jiSong li').click(function()
//			 {
//				 $(this).addClass('addclass').siblings().removeClass('addclass');
//			});
		/*$('.btnInsure').mouseenter(function(){
			$(this).next().show();
		});
		$('.btnInsure').mouseleave(function(){
			$(this).next().hide();
		});*/
		
		//小问号提示文字
		$('.tit .i_question').click(function(){
			$(this).parent().next('.tiShi').toggle();
			$(this).toggleClass('i_answer');
		});
		/*    JCO开发添加开始             */
		//提示框20160615新改
		$('.prompt_f input').focus(function(){
			  $(this).parents('dd,li').find('.point').fadeIn();
		    $(this).parent().siblings(".errorLook").hide();
		});
		$('.prompt_f input').blur(function(){
			$(this).parent().siblings(".errorLook").fadeIn();
		    $(this).parents('dd,li').find('.point').hide();
		});
		//单选是否整修
		$('.repair font').bind('click',function(){
		    $('.repair').find('.active').removeClass('active').find('input:radio').removeAttr('checked');
		    $(this).addClass('active').find('input:radio').prop('checked','checked');
		    return false;
		});
		$('.icon').click(function(){
		    $(".architecture").toggle();
		    $(this).toggleClass('i_answer');
		});
		/*    JCO开发添加结束             */
		
		
		/*20160920 START*/
		
	    //关闭特别约定弹层
		function closeDialog(){
			$("#background").hide();
	        $(".convention-pop").hide();
		}
		//打开特别约定弹层
		function openDialog(){
			/*$("#background").fadeIn();
	        $(".convention-pop").fadeIn();*/
			$("#background").show();
	        $(".convention-pop").show();
	        if("JTE_D"==$("#productcode").val()){
	        	if($("#zuping").hasClass("active")){
	        		$("#engageContentZiYou").hide();
	        		$("#engageContentZuLin").show();
	        	}else{
	        		$("#engageContentZiYou").show();
	        		$("#engageContentZuLin").hide();
	        	}
	        }
		}
		/*20160920 END*/
		
		
		//邮箱自动提示
		function showEmailList (el) {
		    var str="@";
		    var $inpVal = $(el).val();
//		    $(".passCard span").text($inpVal);
		    var length = $inpVal.length;
		    if($inpVal.substring(length-1).indexOf("@") != -1&&$inpVal.substring(0,length-1).indexOf("@") == -1) {
		    	if("EAL_L" == $("#productcode").val()){
		    		var o=$("#input_applyEmail").offset();
		    		var l=o.left;
		    		var t=o.top;
		    		$(".passCard").css("top",t-55).css("left",l);
		    		showPassCard($inpVal);
			    	$(".passCard").show();
		    	}else{
		    		showPassCard($inpVal);
			    	$(".passCard").show();
		    	}
		    }
		    $(".passCard").find("li").click(function(){
		        var $litxt = $(this).text();
		        $("#input_applyEmail").val($litxt);
		        checkApplyEmail("input_applyEmail");
		        $(".passCard").hide();
		    });
		}
		function showPassCard(str){
			$(".passCard").empty();
			$(".passCard").append("<li><span></span>"+str+'163.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'qq.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'sina.cn'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'126.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'hotmail.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'gmail.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'sohu.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'sogou.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'yahoo.com.cn'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'139.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'189.cn'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'wo.com.cn'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'tom.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'msn.com'+"</li>");
			$(".passCard").append("<li><span></span>"+str+'21cn.com'+"</li>");
		}
		
		/* <li><span></span>163.com</li>
                    <li><span></span>qq.com</li>
                    <li><span></span>sina.cn</li>
                    <li><span></span>126.com</li>
                    <li><span></span>hotmail.com</li>
                    <li><span></span>gmail.com</li>
                    <li><span></span>sohu.com</li>
                    <li><span></span>sogou.com</li>
                    <li><span></span>yahoo.com.cn</li>
                    <li><span></span>139.com</li>
                    <li><span></span>189.cn</li>
                    <li><span></span>wo.com.cn</li>
                    <li><span></span>tom.com</li>
                    <li><span></span>msn.com</li>
                    <li><span></span>21cn.com</li>*/
		
	//优惠券格式EJQ_Z
	/*$(".tol-li .inputSpan").click(function(){
		$(this).toggleClass('active');	
		if($(this).hasClass("active")){
			$(".tol-li .linew-spa").text("(每次支付只能使用一张优惠券)");
			$(".tol-lia").removeClass("none");
		}else{
			$(".tol-li .linew-spa").text("(登录会员，使用优惠券)");
			$(".tol-lia ,.tol-lic").addClass("none");
		}
		//判断是否登陆
		CouponV_check();
	});*/
	
	/*$(".lia-btn").click(function(){
			$(this).parents().find(".tol-lia").addClass("none");			
			var inp_val=$(".post_liap").val();
			$(".get_liap").text(inp_val);
			$(".tol-lic").removeClass("none");
		});*/
		
	/*$(".oth-youh").click(function(){
			$(this).parents().find(".tol-lic").addClass("none");
			$(this).parents(".tol-lic").siblings(".tol-lia").removeClass("none");
			
		});*/