$(document).ready(function(){
	if($("#entryId").val()!=""){
		$("#msg_msg").html("(每次支付只能使用一张优惠券)");
	}
});

/*查询该产品是否可以使用优惠卷以决定是否展示优惠卷模块*/
function checkPCoupon(){
	$.ajax({
		type:"post", 
        url:"/eproperty/discountCard/isCouponAvailability.do",
        async:false,
        data:{
			productcode:$("#productcode").val()
        },
        success:function (data){
    	   if(data=="1"){
    		   $("#PCoupon_Ck").show();
    	   }else if(data=="0"){
    		   $("#PCoupon_Ck").hide();
    	   }
        },	
        error:function (data) {
        	alert("ajax访问异常1");
        }
	});
}

/*回显时查询该产品是否可以使用优惠卷*/
function checkPCouponBack(){
	$.ajax({
		type:"post", 
        url:"/eproperty/discountCard/isCouponAvailability.do",
        dataType:"html",
        async:false,
        data:{
			productcode:$("#productcode").val()
        },
        success:function (data){
    	   if(data=="0"){
    		   $("#couponcode").val("");
    			$("#couponBase").val("");
    			$("#couponAmount").val("");
    			if($("#checkMSG").text()==""){
    				$("#checkMSG").html('亲爱的客户，因系统升级，您原有的优惠券暂时无法使用，请联系我们的  <a href="http://www.epicc.com.cn/kefu/" target="_Blank" style="color:blue">客服专员</a>为您提供满意的解决方案。');
    			}else{
    				$("#checkMSG").html($("#checkMSG").text()+'<br>亲爱的客户，因系统升级，您原有的优惠券暂时无法使用，请联系我们的  <a href="http://www.epicc.com.cn/kefu/" target="_Blank" style="color:blue">客服专员</a>为您提供满意的解决方案。');
    			}
    			popPosition('#popDiv');
    	   }else if(data=="1"){
		    	$("#PCoupon_Ck").show();
		    	$("#msg_msg").html("(每次支付只能使用一张优惠券)");
		    	if("ZKK_R"==$("#productcode").val()||"ZKK_W"==$("#productcode").val()){
		    		$("#isCouponV_check").attr("checked",true);
		    	}else{
					$("#CouponV").addClass("active");
		    	}
    		   //回显时验证优惠卷状态
    		   yanzhengCpBack($("#couponcode").val(),$("#productcode").val());
    	   }
        },	
        error:function (data) {
        	alert("ajax访问异常2");
        }
	});
}
//勾选使用优惠卷但未登录时提示登录
function CouponV_check(){
	showValidateResultCo("couponNo","");
	showValidateResultCo("couponMi","");
    showValidateResultCo_N("shiyongBtn","");
    //是否勾选使用优惠券标志位
    var isUseCoupon = false;
	if("ZKK_R"==$("#productcode").val()||"ZKK_W"==$("#productcode").val()){
		if($("#isCouponV_check").is(":checked")){
			isUseCoupon = true;
		}
	}else{
		$("#CouponV").toggleClass('active');	
		if($("#CouponV").hasClass("active")){
			isUseCoupon = true;
		}
	}
    
	if(isUseCoupon){
		if($("#entryId").val()==""){
			$("#showKeepFlag").val(0);
		    beforeLogin();changeLogin(1);
		}else{
			if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
				$("#coupon").show();
			}
			$("#couponKu").show();
			$("#msg_msg").html("(每次支付只能使用一张优惠券)");
		}
	}else{
		if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
			$("#coupon").hide();
		}
		$("#couponKu").hide();
		$("#couponNo").val("");
		$("#couponMi").val("");
		//if($("#coupon_Feebiaoshi").val()=="1"){
			//$("#coupon_Feebiaoshi").val("0");
		$("#couponcode").val("");
			$("#couponM").hide();
			calculateFee();
		//}
	}
	bindKill();
}
function coupCkeckBox(){
	$("#msg_msg").html("(每次支付只能使用一张优惠券)");
    //是否勾选使用优惠券标志位
    var isUseCoupon = false;
	if("ZKK_R"==$("#productcode").val()||"ZKK_W"==$("#productcode").val()){
		if($("#isCouponV_check").is(":checked")){
			isUseCoupon = true;
		}
	}else{
		if($("#CouponV").hasClass("active")){
			isUseCoupon = true;
		}
	}
	if(isUseCoupon){
		if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
			$("#coupon").show();
		}
		if("JAB_A"!=$("#productcode").val()||$("#couponcode").val()==""){
			$("#couponKu").show();
		}
	}
}
//验证优惠卷是否可以使用
function yanzhengCp(id){
//	showValidateResultCo("couponNo","");
//	showValidateResultCo("couponMi","");
	showValidateResultCo_N(id,"");
	var couponNo = ($("#couponNo").val()).toUpperCase();
	var couponMi = ($("#couponMi").val()).toUpperCase();
//	var productcode =$("#productcode").val();
	if(couponNo==""){
		msg = "优惠券号码不能为空";
		showValidateResultCo("couponNo",msg);
		return false;
	}else{
		if(!checkCoup("couponNo"))
			return false;;
	}
	if(couponMi==""){
		msg = "优惠券密码不能为空";
		showValidateResultCo("couponMi",msg);
		return false;
	}else{
		if(!checkCoupMima("couponMi"))
			return false;;
	}
	
	$.ajax({
		type:"post", 
        url:"/eproperty/discountCard/checkValidateAndGetDiscout.do",
        dataType:"json",
        contentType:'application/x-www-form-urlencoded;charset=utf-8',
        async:false,
        data:{
			couponcodeid:couponNo,
			password:couponMi/*,*/
//			productcode:productcode
       	},
       	success:function (data){
    	   var validate = data.validate;
    	   var couponcode = data.couponcode;
    	   var discountamount = data.discountamount;
    	   var discountbase = data.discountbase;
    	   if("1"==validate){
    		   $("#couponTi").html(couponcode);
    		   $("#couponDis").html((parseInt(discountamount))/10);
    		   $("#couponAm").html(discountbase);
    			if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
    				$("#coupon").show();
    			}
    		   $("#couponKu").hide();//优惠券输入域隐藏
    		   $("#couponM").show();//优惠卷使用成功域展示
    		   if($("#productcode").val()=="JAB_A"){
	    		   $("#coupon_Feebiaoshi").val("1");
	    		   $("#coupon_dis").val(discountamount);
	    		   $("#coupon_am").val(discountbase);
    		   }
    		   $("#couponcode").val(couponcode);
    			calculateFee();
    		   showValidateResultCo_N(id,"");
    		   return true;
    	   }else{
    		    var msg = "优惠券不正确或已被使用";
    		    showValidateResultCo_N(id,msg);
    			return false;
    	   }
       	},	
       	error:function (data) {
        	alert("ajax访问异常3");
       	}
	});
}

//回显时验证优惠卷状态
function yanzhengCpBack(couponcode,productcode){
	$.ajax({
		type:"post", 
        url:"/eproperty/discountCard/checkValidateAndGetDiscout.do",
        dataType:"json",
        contentType:'application/x-www-form-urlencoded;charset=utf-8',
        async:false,
        data:{
			couponcodeid:couponcode,
			productcode:productcode
       	},
       	success:function (data){
    	   var validate = data.validate;
    	   var couponcode = data.couponcode;
    	   var discountamount = data.discountamount;
    	   var discountbase = data.discountbase;
    	   if("1"==validate){
    		   $("#couponTi").html(couponcode);
    		   $("#couponDis").html((parseInt(discountamount))/10);
    		   $("#couponAm").html(discountbase);
    			if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
    				$("#coupon").show();
    			}
    		   $("#couponKu").hide();//优惠券输入域隐藏
    		   $("#couponM").show();//优惠卷使用成功域展示
    		   if($("#productcode").val()=="JAB_A"){
	    		   $("#coupon_Feebiaoshi").val("1");
	    		   $("#coupon_dis").val(discountamount);
	    		   $("#coupon_am").val(discountbase);
    		   }
    		   $("#couponcode").val(couponcode);
    		  	calculateFee();
    	   }else{
    		   $("#couponcode").val("");
    			$("#couponBase").val("");
    			$("#couponAmount").val("");
    			if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
    				$("#coupon").show();
    			}
    			$("#couponKu").show();//优惠券输入框
    			if($("#checkMSG").text()==""){
    				$("#checkMSG").html("优惠券已被使用或过期失效，请重新填写!");
    			}else{
    				$("#checkMSG").html($("#checkMSG").text()+"<br>优惠券已被使用或过期失效，请重新填写!");
    			}
    			popPosition('#popDiv');
    	   }
       	},	
       	error:function (data) {
        	alert("ajax访问异常4");
       	}
	});
}
//使用其他优惠券
function backChange(){
	$("#couponNo").val("");
	$("#couponMi").val("");
	//$("#coupon_dis").val("");
	//$("#coupon_am").val("");
	//$("#coupon_Feebiaoshi").val("");
	$("#couponcode").val("");
	if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
		$("#coupon").show();
	}
	$("#couponKu").show();//优惠券输入框
	$("#couponM").hide();
	calculateFee();

}
//点击显示错误文本框
function showValidateResultCo(id,msg){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
	var s=$("#"+id).offset();
	if(msg!=""){
		if("ZKK_R"==$("#productcode").val()||"ZKK_W"==$("#productcode").val()){
			if($.browser.msie && $.browser.version=="6.0"){
				if(id=="confirm_applyEmail"||id=="confirm_applyIdentifyNumber"||id=="confirm_applySex"){
					$("#"+id).parent().after("<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:-137px;padding:0px 4px;height:20px; line-height:20px; position:absolute;cursor:default;margin-top: 22px;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) left no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1; color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
				}else{
					$("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:-137px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;margin-top: 22px;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
				}
			} else{
				$("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:-137px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;margin-top: 22px;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
			}
		}else if("EJQ_Z"==$("#productcode").val()){
			$("#"+id).parent().addClass('errorText');
			$("#"+id).after("<div class='caution_error' id='error_"+id+"'> <div class='erroInput' >"+msg+"</div></div>");
			$("#error_"+id).css({'left':s.left, 'top':s.top-65});
		}else if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
			var width = $("#"+id).parent().width();
			$("#"+id).parent().addClass('errorText2');
			$("#"+id).parent().after("<div class='card_ts' id='error_"+id+"' style='width:"+width+"px;'><div class='left'></div><div class='con'>"+msg+"</div><div class='right'></div></div>");
		}else if("JAB_A"==$("#productcode").val()){
			$("#"+id).addClass('needInpcol');
			if(id=="couponNo"){
				$("#"+id).after("<font class='fuDongOne' style=' color:#ff644c; font-size:12px;' id='error_"+id+"'>"+msg+"</font>");
			}else if(id=="couponMi"){
				$("#"+id).after("<font class='fuDongTwo' style=' color:#ff644c; font-size:12px;' id='error_"+id+"'>"+msg+"</font>");
			}
		}
	}else{
		if("EJQ_Z"==$("#productcode").val()){
			$("#"+id).parent().removeClass('errorText');			
		}else if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
			$("#"+id).parent().removeClass('errorText2');
		}else if("JAB_A"==$("#productcode").val()){
			$("#"+id).removeClass('needInpcol');
		}
	}
}
function showValidateResultCo_N(id,msg){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
	var s=$("#"+id).offset();
	if(msg!=""){
		if("ZKK_R"==$("#productcode").val()||"ZKK_W"==$("#productcode").val()){
			if($.browser.msie && $.browser.version=="6.0"){
				if(id=="confirm_applyEmail"||id=="confirm_applyIdentifyNumber"||id=="confirm_applySex"){
					$("#"+id).parent().after("<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:20px; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) left no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1; color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
				}else{
					$("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
				}
			} else{
				$("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
			}
		}else if("EJQ_Z"==$("#productcode").val()){
			$("#"+id).addClass('errorText');
			$("#"+id).after("<div class='caution_total' id='error_"+id+"'> <div class='erroInput' >"+msg+"</div></div>");
			$("#error_"+id).css({'left':s.left+70, 'top':s.top-90});			
		}else if("EAK_X"==$("#productcode").val()||"EAK_G"==$("#productcode").val()){
			var w = $("#"+id).width();
			$("#"+id).parent('.hou').after("<div class='error_look' id='error_"+id+"'><span class='left'></span><span class='con'>"+msg+"</span><span class='right'></span></div>");
		}else if("JAB_A"==$("#productcode").val()){
			$("#"+id).after("<div class='Prompt' id='error"+id+"'><span class='oneP'></span><span class='twoP'>"+msg+"</span><span class='ThreP'></span></div>");
		}
	}
}
function checkCoup(id){
	var couponNo = $("#couponNo").val();
	var pattern = /^[0-9A-Za-z]+$/;
	var flag = pattern.test(couponNo);
	if(couponNo!=""){
		if (!flag||couponNo.length!=11) {
			msg = "请输入正确的号码格式";
			showValidateResultCo(id,msg);
			return false;
		}
	}
	showValidateResultCo(id,"");
	return true;
}

function checkCoupMima(id){
	var couponMima = $("#couponMi").val();
	var pattern = /^[0-9A-Za-z]+$/;
	var flag = pattern.test(couponMima);
	if(couponMima!=""){
		if (!flag||couponMima.length!=6) {
			msg = "请输入正确的密码格式";
			showValidateResultCo(id,msg);
			return false;
		}
	}
	showValidateResultCo(id,"");
	return true;
}

function bindKill(){
	$(".pop_close").bind("click",function(){
    	if("ZKK_R"==$("#productcode").val()||"ZKK_W"==$("#productcode").val()){
    		$("#isCouponV_check").attr("checked",false);
    	}else{
			$("#CouponV").removeClass("active");
    	}
	});
}
