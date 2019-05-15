var $$ = function(func){  
    if (document.addEventListener) {  
        window.addEventListener("load", func, false);  
    }  
    else if (document.attachEvent) {  
        window.attachEvent("onload", func);  
    }  
}  
  
$$(function(){  
	showValiResult();  
})  	
function showValiResult(){
	if($('#validateResult').val()!=''&&$('#validateResult').val()!=null){
		rollToPos("resultspan");
	}
}

//滚动屏幕到指定位置
function rollToPos(id){
	var element = document.getElementById(id);
	element.scrollIntoView(true); 
}

//点击显示错误文本框
function showValidateResult(id,msg){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
	if(msg!=""){
		if($("#focusFlag").val()=="0"){
			$("#focusFlag").val("1");
//			$("#"+id).blur().focus().blur();
//			event.srcElement && event.srcElement.hideFocus=true; 
			hideTips(id);
		}
		if($.browser.msie && $.browser.version=="6.0"){
			if(id=="confirm_applyEmail"||id=="confirm_applyIdentifyNumber"||id=="confirm_applySex"){
				$("#"+id).parent().after("<span class='wrong_msg msg' id='error_"+id+"' style='min-width:120px;z-index:999;background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:20px; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) left no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1; color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
			}else{
				$("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='min-width:120px;z-index:999;background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
			}
		} else{
			if("YEH"==$("#productcode").val())//将最小值改为80 ，没有勾选确认的错误提示框就和文字大小一样了，但是会影响确认页面的错误提示，导致折行，现在改为与原来一样的设置
				$("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='min-width:120px;z-index:999;background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
			else
			    $("#"+id).after("<span class='wrong_msg msg' id='error_"+id+"' style='min-width:120px;z-index:999;background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:auto; line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
			}
		
		
//		if($("#focusFlag").val()=="0"){
//			$("#focusFlag").val("1");
//			$("#"+id).focus();
//			$("#"+id).blur();
//		}

		
	}
}

function showValidateLongResult(id,msg){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
	if(msg!=""){
		if($("#focusFlag").val()=="0"){
			$("#focusFlag").val("1");
//			$("#"+id).blur().focus().blur();
//			event.srcElement && event.srcElement.hideFocus=true; 
			hideTips(id);
		}
		$("#"+id).after("&nbsp;&nbsp;&nbsp;<span class='wrong_msg msg' id='error_"+id+"' style='background:#fffdef;text-indent:0px;border:#f3e4d1 1px solid; color:#636363;display:inline-block;margin-left:2px;padding:0px 4px;height:auto; width:340px;line-height:20px; position:absolute;cursor:default;'><font style='background:url(/eproperty/css/theme/images/ico_wrong.png) 0px 0px no-repeat; text-indent:0px; display:block; _display:inline; _zoom:1;color:#F00; text-decoration:none;font-size:12px'>" +msg +"</font></span>");
		
	}
}

function showValidateResultNoblank(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		$("#"+id).parent('span').css('position','relative');
		$("#"+id).parent().addClass('errorText');
		var w=$("#"+id).width();
		$("#"+id).parent().append('<div class="errorTip active" style="background:0"  id="error_'+id+'"><div class="errorInfoHead"></div><div class="errorInfo">'+msg +'</div><div class="errorInfoFoot"></div></div>');
		$('#error_'+id).css({'position':'absolute','top':0,'left':w-6,'width':500,'height':32,'z-index':999});
	}
}

//用这个方法时，里面的msg可以增加<br>标签
function showValidateResultBR(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		$("#"+id).parent('span').css('position','relative');
		$("#"+id).parent().addClass('errorText');
		var w=$("#"+id).width();
		$("#"+id).parent().append('<div class="pointBle" id="error_'+id+'"><span class="left"></span><span class="con">'+msg +'</span><span class="right"></span></div>');
		$('#error_'+id).css({'position':'absolute','top':0,'left':w+20,'width':183,'height':32,'z-index':999});
	}
}
/**
 * 
 * @param {}
 *            field: 校验域对象
 * @param {}
 *            msg: 显示的信息
 * @param {}
 *            showField: 控制是否显示对号图片
 * @param {}
 *            type :判断是用id或者name进行错误信息定位,参数固定为"id"或者"name"
 */
function showValidateResultForLDT_E(field, msg, showField, type) {
	var error_id;
	var create_div;
	var element = getElementPos(field.id);
	if (type == "id") {
		error_id = "#error_" + field.id;
		create_div = "<div id='error_"
				+ field.id
				+ "' style='margin-left:1px;background:#F8F8F8;border:1px #e3e3e3;padding:0;margin-bottom:0px;position:absolute;text-align: left; top:"
				+ (element.y + 20)
				+ "px;left:"
				+ (element.x)
				+ "px;line-height:1px;z-index:1001;'><iframe name=\"ifrm_div\" id=\"ifrm_div\" frameborder=\"0\" scrolling=\"no\" style = 'position:absolute;width:158px; height:19px;z-index:1000;margin-left:0px;' ></iframe></div>";
	} else {
		error_id = "#error_" + field.name;
		create_div = "<div id='error_"
				+ field.name
				+ "' style='margin-left:1px;background:#F8F8F8;border:1px #e3e3e3; padding:0;position:absolute;text-align: left; top:"
				+ (element.y + 20)
				+ "px;left:"
				+ (element.x)
				+ "px;line-height:1px;z-index:1001;'><iframe name=\"ifrm_div\" id=\"ifrm_div\" frameborder=\"0\" scrolling=\"no\" style = 'FILTER:alpha(opacity=0);position:absolute;width:158px; height:19px;z-index:1000;margin-left:0px;' ></iframe></div>";
	}
	if ($(error_id).length <= 0) {
		$(create_div).css("color", "red").appendTo($(field).parent());
	}
	if (msg == "") {
		if (field.value != "") {
			$(error_id).remove();
			// msg="<img style='float:left; margin-top:2px;'
			// src='/EbsWeb/images/gou.gif'/>";
			if (showField == false)
				$(msg).remove();
		}
	} else {
		msg = "<div style = ' z-index:1002;margin-left:0px;position:relative;height:18px;border:1px solid #E3E3E3;padding:0 5px 0 21px;margin-bottom:0px;width:130px; background:#fffdef url(/eproperty/css/LDTDtheme/styles/insuredNew/theme/images/ico_wrong.png) left center no-repeat;'><span style='position:absolute;z-index:1;border:1px #e3e3e3;padding-right:5px;line-height:18px;color:#F00;white-space: nowrap;'>"
				+ msg + "</span></div>";
	}
	// if(type == "id"){
	// $(error_id).parent().remove();
	// }
	$(error_id).css("margin-top", "5px");
	$(error_id).html($(error_id).html() + msg);
}

/**
 * 
 * @param {}
 *            field: 校验域对象
 * @param {}
 *            msg: 显示的信息
 * @param {}
 *            showField: 控制是否显示对号图片
 * @param {}
 *            type :判断是用id或者name进行错误信息定位,参数固定为"id"或者"name"
 */
//点击显示错误文本框(新流程)

function showValidateResultNew(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		if(id=="sexSel"||id=="sexModify"||id=="insuredSexSel"||id=="sexSelinsured"||id=="sexSelapply"||id=="sexSel_"){
			if("LAY"!=$("#riskcode").val()&&"SEZJ"!=$("#productcode").val()&&"EAA"!=$("#productcode").val()&&"ECR"!=$("#productcode").val()&&"EAL"!=$("#riskcode").val()&&"EDD_R"!=$("#productcode").val()){
				$("#"+id).after("<div class='errorTip active fl'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
			}else{
				$("#"+id).after("<div class='errorLook fl'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
			}
			
		}else{
			//邮件续保样式和其他区别开
			if("EMAIL"!=$("#riskcode").val()&&"LAY"!=$("#riskcode").val()&&"SEZJ"!=$("#productcode").val()&&"BWSJ"!=$("#productcode").val()){
				if("LBB"==$("#productcode").val()&& id=="prpzinsured_quantity"){
					$("#"+id).parent().addClass('errorAddress');
					$("#"+id).parent().after("<div class='errorTip active' style='margin:0;position:absolute; top:8px; left:486px;'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
				}else{
					if("relationSpan"==id&&("YEHKM"==$("#productcode").val()||"ZFO"==$("#productcode").val())){
						$("#"+id).parent().addClass('errorRelation');		
					}else{
						$("#"+id).parent().addClass('errorText');
					}
					 if("roomcount"==id&&"JAU"==$("#riskcode").val()){
					 		$("#roomcounttext").after("<div class='errorTip active'  style='margin-left:5px;' id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
					 }else if("EAC"==$("#riskcode").val()){
						 if(id=="input_applyCountryName"){//国家和地区为空校验
							 if($("#error_"+id).length>0){
								$("#error_"+id).remove();
							 }
							$("#"+id).parent().next().after('<div class="errorLook" id="error_'+id+'" style="display: inline-block;"><span class="left"></span> <span class="con">'+msg+'</span><span class="right"></span></div>');
						 }else{
							$("#"+id).parent().after('<div class="errorLook" id="error_'+id+'" style="display: inline-block;"><span class="left"></span> <span class="con">'+msg+'</span><span class="right"></span></div>');
						 }
						
					 }else if("EAA"==$("#productcode").val()){
							$("#"+id).parent().removeClass("errorText").addClass('errorText1');
							//$("#"+id).parent().addClass('errorText');
						 	$("#error_"+id).remove();
							if(id=="input_applyCountryName"){//国家和地区为空校验
								$("#"+id).parent().next().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
							}else{
								$("#"+id).parent().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
							}
							
					 }else if("EDD_R"==$("#productcode").val()){
							$("#"+id).parent().removeClass("errorText").addClass('errorText1');
							$("#error_"+id).remove();
							if(id=="input_applyCountryName"){//国家和地区为空校验
								$("#"+id).parent().next().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
							}else{
								$("#"+id).parent().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
							}
							
					 }else if("JTE_Y"==$("#productcode").val()){
						 if(id=="input_applyCountryName"){//国家和地区为空校验
							 if($("#error_"+id).length>0){
								$("#error_"+id).remove();
							 }
							 $("#"+id).parent().next().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>'); 
						 }else{
							 $("#"+id).parent().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>'); 
						 }
							
					 }else if("EAL_L"==$("#productcode").val()){
						 if(id=="input_applyCountryName"){//国家和地区为空校验
							 if($("#error_"+id).length>0){
								$("#error_"+id).remove();
							 }
							 $("#"+id).parent().next().after('<div class="errorLook" style="display:block" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
						 }else{
							 $("#"+id).parent().after('<div class="errorLook" style="display:block" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
						 }
						 
					 }else if("JCO"==$("#productcode").val() && "cityname"==id){
						 $("#"+id).parent().next().after("<div class='errorTip active'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
					 }else if("JCO"==$("#productcode").val() && "input_identifyNumber"==id){
						 $("#"+id).parent().append("<div class='caution' id='error_"+id+"' style='top:31px'><div class='erroInput'>" +msg +"</div></div>");
					 }else if(("YXL"==$("#productcode").val()||"YEHKM"==$("#productcode").val())&&"cityname"==id){
						 $("#"+id).parent().after("<div class='errorTip active'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
					 }else if("YEHKM"==$("#productcode").val()&&"p_agreedate"==id){
						 $("#"+id).parent().parent().append("<div class='errorTip active'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
					 }else if("ECK"==$("#productcode").val()&&"input_applyName"==id){
						 $("#"+id).parent().after("<div class='errorTip active ' style='position:relative;' id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
					 }else if ("ECR"==$("#productcode").val()&&id=="startdate"){
						 $("#"+id).parent().removeClass("errorText").addClass('errorText1');
						 $("#"+id).parent().next().after('<div class="errorLook" style="display:block;" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
					 }else if("ECR"==$("#productcode").val()){
						 if(id=="input_applyCountryName"){//国家和地区为空校验
							 if($("#error_"+id).length>0){
								$("#error_"+id).remove();
							 }
							 $("#"+id).parent().removeClass("errorText").addClass('errorText1');
							 $("#"+id).parent().next().after('<div class="errorLook" style="display:block;" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
						 }else{
							 $("#"+id).parent().removeClass("errorText").addClass('errorText1');
							 $("#"+id).parent().after('<div class="errorLook" style="display:block;" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
						 }
					 }else if("EAJ_Y"==$("#productcode").val()&&"input_applyName"==id){
						 $("#"+id).parent().after("<div class='errorTip active ' style='position:relative;' id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
					 }else{
						 if(id=="input_applyCountryName"){//国家和地区为空校验
							 if($("#error_"+id).length>0){
								$("#error_"+id).remove();
							 }
							 $("#"+id).parent().next().after("<div class='errorTip active'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
						 }else{
							 $("#"+id).parent().after("<div class='errorTip active'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
						 }
					 	
					 }
				}
			}else{
				if("BWSJ"==$("#productcode").val()&& (id=="unitpremium"||id=="insuredincome")){
					$("#"+id).parent().addClass('errorText');
					$("#"+id).parent().next().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
			
				}else if("BWSJ"==$("#productcode").val()&& id=="birthday"){
					$("#"+id).parent().addClass('errortime');
					$("#"+id).parent().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
			
				}else if("BWSJ"==$("#productcode").val()&& id=="cityname"){
					$("#"+id).parent().addClass('errorAddress');
					$("#"+id).parent().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
				}else if("LAY"==$("#riskcode").val()&& id=="cityname"){
					$("#"+id).parent().addClass('errorAddress');
					$("#"+id).parent().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
				}else if("LAY"==$("#riskcode").val()&& id=="applyIsResidentSelectSpan"){
					$("#"+id).parent().prev().addClass('errorAddress');
					$("#"+id).parent().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
				//邮件续保样式和其他区别开
				}else if("EMAIL"==$("#riskcode").val()){
					//
					$("#"+id).parent().addClass('errorText');
					$("#"+id).after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
				}else{
					if(id!="input_applyCountryName"){//国家和地区为空校验
						$("#"+id).parent().addClass('errorText');
						$("#"+id).parent().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
					}else{
					    if($("#error_"+id).length>0){
							$("#error_"+id).remove();
						}
						$("#"+id).parent().addClass('errorText');
						$("#"+id).parent().next().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
					}
				}
			}
			
		}
		//if(id=="input_applyCountryName"){//国家和地区为空校验
			//if($("#error_"+id).length>0){
				//$("#"+id).parent().removeClass('errorText').removeClass('errorSex').removeClass('errortime').removeClass('errorAddress').removeClass('overCue').removeClass('overCueTw').removeClass('errorText1').removeClass("errorRelation");
				//$("#error_"+id).remove();
			//}
			//$("#"+id).parent().addClass('errorText');
			//$("#"+id).parent().next().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
		//}
	}
}

//元素定位，根据浏览器据对定位
function getElementPos(elementId) {
	var ua = navigator.userAgent.toLowerCase();
	var isOpera = (ua.indexOf('opera') != -1);
	var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
	var el = document.getElementById(elementId);
	if (el.parentNode === null || el.style.display == 'none') {
		return false;
	}
	var parent = null;
	var pos = [];
	var box;
	if (el.getBoundingClientRect) // IE
	{
		box = el.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop,
				document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft,
				document.body.scrollLeft);
		return {
			x : box.left + scrollLeft,
			y : box.top + scrollTop
		};
	} else if (document.getBoxObjectFor) // gecko
	{
		box = document.getBoxObjectFor(el);
		var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth)
				: 0;
		var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth)
				: 0;
		pos = [ box.x - borderLeft, box.y - borderTop ];
	} else // safari & opera
	{
		pos = [ el.offsetLeft, el.offsetTop ];
		parent = el.offsetParent;
		if (parent != el) {
			while (parent) {
				pos[0] += parent.offsetLeft;
				pos[1] += parent.offsetTop;
				parent = parent.offsetParent;
			}
		}
		if (ua.indexOf('opera') != -1
				|| (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
			pos[0] -= document.body.offsetLeft;
			pos[1] -= document.body.offsetTop;
		}
	}
	if (el.parentNode) {
		parent = el.parentNode;
	} else {
		parent = null;
	}
	while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account
																				// for
																				// any
																				// scrolled
																				// ancestors
		pos[0] -= parent.scrollLeft;
		pos[1] -= parent.scrollTop;
		if (parent.parentNode) {
			parent = parent.parentNode;
		} else {
			parent = null;
		}
	}
	return {
		x : pos[0],
		y : pos[1]
	};
}

function showTipsWindown(msg){
	//	隐藏日期控件：
	$("#_my97DP").hide();
	var productcode = $("#productcode").val();
	var processBar =  $("#processbar").val();
	if("EDD_Z"==productcode||"EDD_J"==productcode||"LAY_A"==productcode||"LAY_G"==productcode||"LAY_J"==productcode||"LAY_N"==productcode||"LAY_H"==productcode
	||"JAB_A"==productcode||"JBD_B"==productcode||"LDT_E"==productcode||"EAK_X"==productcode||"LEF"==productcode||"EAK_G"==productcode
	||("EJQ_Z"==productcode && "Continue" != processBar)||"LBB"==productcode||"JAB_Z"==productcode||"JAU"==productcode||"JBV"==productcode
	||"JBW"==productcode||"JCA"==productcode||"ZXF"==productcode||"YXL"==productcode||("EFFEFG"==productcode && "Continue" != processBar)||"EAC_S"==productcode
	||"EAC_L"==productcode || "JMA"==productcode||"EAA"==productcode||"JCO"==productcode
	||"ECK"==productcode||"YEHKM"==productcode||"JTE_Y"==productcode||"JTE_D"==productcode||"ECR"==productcode||"EAL_L"==productcode||"JTE_S"==productcode
	||"WAF_N"==productcode||"JBM_S"==productcode||"EDD_R"==productcode||"EAJ_Y"==productcode||"EAJ_G"==productcode||"LXL"==productcode||"ZFO"==productcode
	||("EJQ_H"==productcode && "Continue" != processBar)){
		if(msg.length>20){
			$("#checkMSGNew").html(msg);
			popPosition('#popDivNew');
		}else{
			$("#checkMSGNewshort").html(msg);
			popPosition('#popDivNewshort');
		}
		if("EDD_R"==productcode){
			$(".mask").css("z-index","1000002") ;
		}else{
		$(".mask").css("z-index","1010") ;
		}
	}else{
		$("#checkMSG").html(msg);
		popPosition('#popDiv');
	}
}
//静态链接弹出层
function showTipsHelpWindown(title,context){
	helpdialog(title,context);
//	if(title.length>=25)title=title.substring(0,25)+'..';
//	$("#title").html(title);
//	$("#context").html(context);
//	$("#help").show();
//	$("#bg").show();
//	$("#bg").css("z-index","10000");
//	$("#help").css("z-index","10001");
//	if($.browser.msie && $.browser.version=="6.0"){ 
//		$("body").find("select").hide();
//	} 
//	var docH = $(document).height();
//	
//    $("#bg").width($(document).width());
//	$("#bg").height(docH + "px") ;
}
function showCheckPersonMsg(){
	popPosition('#checkPersonDiv');
	$(".mask").css("z-index","10000");
}
function closeTipCheckMSG(){
	$("#oldProposalInsureds_div_new").hide();//新的上一年被保险人样式
	$("#popDivNewshort").hide();
	$("#popDivNew").hide();
	$("#loginDivnew").hide();//保存报价至个人中心新的弹层样式
	$("#successDivnew").hide();//保存至个人中心带保费弹层新样式
	$("#popDiv").hide();
	$(".mask,.tt").remove();
	//如果LDT_E产品绑定了相关事件，那么移除该事件：
	$("#checkMSGConfirm").unbind("click",function(){
		modifyInsuredPersonForSubmit();
	});

	if($.browser.msie && $.browser.version=="6.0"){ 
		$("body").find("select").show();
	} 
	if($("#select_102").length>0){
		   $("#select_102").hide();
	   }
	//为组合险加的
	if($("#sureSubmit").val()!=""){
		$("#sureSubmit").attr("disabled",false);
	}
	var areaCode = $("#areaCode").val();
	var productCode = $("#productCode").val();
//	if(areaCode=="11000000"){
//		var riskCode = $("#riskCode").val();
//		var hostport=document.location.host;
//		 if($("#productCode").val()=="EFG"||$("#productCode").val()=="EFF"||riskCode=="EFF"||riskCode=="EFG"){
//	    	   location.href = "http://"+hostport+"/xgbx/rsbx/rsywx/";
//	       }else if($("#productCode").val()=="EAJ"){
//	    	   location.href = "http://"+hostport+"/xgbx/lybx/jwzzyx/";
//	       }else if($("#productCode").val()=="EAG_V"){
//	    	   location.href = "http://"+hostport+"/xgbx/lybx/jwswcxx/";
//	       }else if($("#productCode").val()=="EAG_T"){
//	    	   location.href = "http://"+hostport+"/xgbx/lybx/jnswcxx/";
//	       }else if($("#productCode").val()=="EAK_X"){
//	    	   location.href = "http://"+hostport+"/xgbx/lybx/jnzjy/";
//	       }else if($("#productCode").val()=="EAK_U"){
//	    	   location.href = "http://"+hostport+"/xgbx/lybx/jnzzy/";
//	       }else if($("#productCode").val()=="EJQ_H"){
//	    	   location.href = "http://"+hostport+"/xgbx/rsbx/hkywndx/";
//	       }else if($("#productCode").val()=="EJQ_Z"){
//	    	   location.href = "http://"+hostport+"/xgbx/rsbx/jtgjywx/";
//	       }
//	}
}
function closeTipHelpCheckMSG(){
	$("#help").hide();
	$(".mask,.tt").remove();
	if($.browser.msie && $.browser.version=="6.0"){ 
		$("body").find("select").show();
	} 
	if($("#select_102").length>0){
		   $("#select_102").hide();
	   }
}
function showKeepMSG(){
	$(".succes").html();
	var productCode =$("#productcode").val();
	if("LEF"==productCode || "LAY_A"==productCode
			|| "EAK_X"==productCode || "EDD_J"==productCode || "EDD_Z"==productCode || "EAK_G"==productCode
			|| ("EJQ_Z"==productCode && "Continue" != $("#processbar").val())|| "LAY_G"==productCode|| "LAY_J"==productCode || "LAY_H"==productCode 
			|| "LAY_N"==productCode || "LAY_H"==productCode || "JAB_A"==productCode|| "LDT_E" == productCode ||  "YXL" == productCode  ||  "ECK" == productCode ||  "YEHKM" == productCode
			|| ("EFFEFG" == productCode && "Continue" != $("#processbar").val()) || "JBD_B" == productCode || "JMA" == productCode|| "JCO" == productCode|| "JTE_D" == productCode
			||"EAL_L"==productCode||"JTE_S"==productCode||"WAF_N"==productCode||"JBM_S"==productCode||"EAJ_Y"==productCode||"EAJ_G"==productCode||"LXL"==productCode||"ZFO"==productCode
			||"EJQ_H"==productCode){
		popPosition('#loginDivnew');
	}else{
		popPosition('#loginDiv');
	}
	$(".mask").css("z-index","10000");
}
function showKeep2MSG(msg){
	var pointPos = 0;
	var productCode =$("#productcode").val();
	if("EAK_U"==productCode || "EAJ_S"==productCode || "EAJ"==productCode 
			|| "ZKK_R"==productCode || "ZKK_W"==productCode|| "LEF"==productCode|| "JAB_A"==productCode|| "LAY_A"==productCode
			|| "EAK_X"==productCode || "EDD_J"==productCode || "EDD_Z"==productCode || "EAK_G"==productCode
			|| "ZAF"==productCode|| "ZKF"==productCode|| "EJQ_Z"==productCode|| "LAY_G"==productCode
			|| "LAY_J"==productCode|| "LAY_H"==productCode || "LAY_N"==productCode || "JBD_B" == productCode 
			|| "LDT_E" == productCode || "EFFEFG" == productCode||"JCO"==productCode||"YXL"==productCode
			||"ECK"==productCode || "JTE_D"==productCode || "YEHKM"==productCode||"EAL_L"==productCode||"JTE_S"==productCode
			||"WAF_N"==productCode||"JBM_S"==productCode||"EAJ_Y"==productCode||"EAJ_G"==productCode||"LXL"==productCode||"ZFO"==productCode
			||"EJQ_H"==productCode){
		pointPos = 2;
	}
	if("LEF"==productCode || "LAY_A"==productCode
			|| "EAK_X"==productCode || "EDD_J"==productCode || "EDD_Z"==productCode || "EAK_G"==productCode
			|| ("EJQ_Z"==productCode && "Continue" != $("#processbar").val())
			|| "LAY_G"==productCode|| "LAY_J"==productCode|| "LAY_H"==productCode
			|| "LAY_N"==productCode || "JAB_A"==productCode|| "LDT_E" == productCode
			||"JCO"==productCode ||"YXL"==productCode||"ECK"==productCode
			|| ("EFFEFG" == productCode && "Continue" != $("#processbar").val())
			|| "JBD_B" == productCode || "JTE_D"==productCode ||"YEHKM"==productCode
			||"EAL_L"==productCode||"JTE_S"==productCode||"WAF_N"==productCode
			||"JBM_S"==productCode||"EAJ_G"==productCode||"EAJ_Y"==productCode
			||"LXL"==productCode||"ZFO"==productCode||"EJQ_H"==productCode){
		$("#disZpricenew").html(parseFloat(msg).toFixed(pointPos));
		if("LDT_E" == productCode && $("#extensioninfo").val() != ""){
			$("#premiumname").html("车险客户特惠价为");
		}
		popPosition('#successDivnew');
	}else{
		$("#disZprice").html(parseFloat(msg).toFixed(pointPos));
		popPosition('#successDiv');
	}
	
	$(".mask").css("z-index","10000");
}
function showPayTipsWindown(msg){
	$("#bank").html(msg); 
	popPosition("#payShow");
	$(".mask").css("z-index","10000");
}
//关闭弹出层
function closeWindow(dom){
	   $('#'+dom).hide();
	   $(".mask,.tt").remove();
	   $("body").find("select").show();
	   if($("#select_102").length>0){
		   $("#select_102").hide();
	   }
	   if($("#Jxianqu").length>0){
		   if($("#count").val()==1 || $("#count").val()==2){
				$("#Jxianqu").hide();
			}
	   }
	   
	}
function closeWindowById(id){
   $('#'+id).hide();
   $(".mask,.tt").remove();
}
function showInsuredMSG(){
	$("#_my97DP").hide();
	popPosition('#insuredMSG');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/public/InsuredMSG.html','430','200','','','true','');
}

function showBeneficiaryMSG(){
	$("#_my97DP").hide();
	popPosition('#beneficiaryMSG');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('/eproperty/cssb/insuredNew/E/public/showBeneficiaryMSG.html','430','200','','','true','');
}

function showChinaResidentsMSG(){
	$("#_my97DP").hide();
	popPosition('#chinaResidentsMSG');
	$(".mask").css("z-index","1010") ;
}

function showWardVocation(){
	popPosition('#wardVocation');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/public/showWardVocation.html','430','200','','','true','');
}
function showAccidentTreatMSG(){
	$("#_my97DP").hide();
	popPosition("#accidentTreat");
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/public/showAccidentTreatMSG.html','430','200','','','true','');
}
function showAccidentHarmMSG(){
	$("#_my97DP").hide();
	popPosition('#accidentHarm');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/public/showAccidentHarmMSG.html','430','200','','','true','');
}

function showPolicyholderMSG(){
	$("#_my97DP").hide();
	popPosition('#policyholderMSG');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/public/showPolicyholderMSG.html','430','200','','','true','');

}
function showBaozhangEAJMSG(){
	$("#_my97DP").hide();
	popPosition('#baozhangEAJ');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/EAJ/baozhang.html','550','451','','','true','');

}
function showBaozhangEAJ_SMSG(){
	$("#_my97DP").hide();
	popPosition('#baozhangEAJ_S');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/EAJ/baozhang.html','550','451','','','true','');

}
function showBaoZhangEAG_TMSG(){
	$("#_my97DP").hide();
	popPosition('#EAG_TBaozhang');
	$(".mask").css("z-index","1010") ;
	//tipsWindown('','url:post?/EbsWeb/insuredNew/E/EAG_T/showBaoZhangEAG_TMSG.html','550','451','','','true','');

}
function showBaozhangEAG_VMSG(){
	$("#_my97DP").hide();
	popPosition('#baozhangEAG_V');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/EAG_V/showBaozhangEAG_VMSG.html','550','451','','','true','');

}
function showBaozhangEAK_UMSG(){
	$("#_my97DP").hide();
	popPosition('#baozhangEAK_U');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/EAK_U/EAK_Ubaozhang.html','550','451','','','true','');

}
function change(){
	$("#applyIdentity").val($("#input_applyIdentity").val());
}
function showTips(id,msg){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
	if(id=="relation"&&($("#productcode").val()!='EFG_M')){
		if(!($("#riskcode").val()=="ZKK"||$("#riskcode").val()=="LCB")){
			if(""==$("#seckillcode").val()){
				//先删除，防止一直追加提示信息
				hideTips(id);
				$("#"+id).after("<span class='msg' flagTip='flagTip' id='tip_"+id+"' style='cursor:default;'><font style='font-size:12px;color:#838383'>"+"如为多人投保，请参看<a href=\"#this\" onclick=\"popPosition('#applyHelp');\"  style=\"color:red\">填写说明</a>"+"</font></span>");
			}
		}
	}else if(id=="relation"&&($("#productcode").val()=='EFG_M')){
		hideTips(id);
	}else{
		if(msg=='财产地址需与房产证（精确到门牌号）<br>或购房合同中的房屋地址一致')
	
			$("#"+id).after("<span class='msg' flagTip='flagTip' id='tip_"+id+"' style='cursor:default;height:40px'><font style='font-size:12px;color:#838383'>"+msg+"</font></span>");
		else
			$("#"+id).after("<span class='msg' flagTip='flagTip' id='tip_"+id+"' style='cursor:default;'><font style='font-size:12px;color:#838383'>"+msg+"</font></span>");
	}
}
function showTipsNew(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		if(id=="cityname"&&$("#comcodeSelect").is(":visible")){
		}else{
			if("LBB"==$("#productcode").val()){
				if("prpzinsured_phonenumber"==id){
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block; left:460px;top:8px; width:380px;'> <span class='left'></span> <font class='con' style='display:block;float:left;'>"+msg+"</font> <span class='right'></span> </div>");
				}else if("prpzinsured_birthday"==id){
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block; left:460px;top:8px; width:184px;'> <span class='left'></span> <font class='con' style='display:block;float:left;'>"+msg+"</font> <span class='right'></span> </div>");
				}else if("prpzinsured_email"==id){
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block; left:460px;top:8px; width:283px;'> <span class='left'></span> <font class='con' style='display:block;float:left;'>"+msg+"</font> <span class='right'></span> </div>");
				}else if("prpzinsured_quantity"==id){
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block; left:478px;top:8px; width:134px;'> <span class='left'></span> <font class='con' style='display:block;float:left;'>"+msg+"</font> <span class='right'></span> </div>");
				}else if("housePetsType"==id){
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block; left:460px;top:8px; width:414px;'> <span class='left'></span> <font class='con' style='display:block;float:left;'>"+msg+"</font> <span class='right'></span> </div>");
				}else if("housePetsCount"==id){
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block; left:460px;top:8px; width:422px;'> <span class='left'></span> <font class='con' style='display:block;float:left;'>"+msg+"</font> <span class='right'></span> </div>");
				}
				
			}else if("BWSJ"==$("#productcode").val()&& (id=="unitpremium"||id=="insuredincome")){
				$("#"+id).parent().next().after("<div class='point' id='tip_"+id+"'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");		
			}else if("JAB_Z"==$("#productcode").val()){
				if("phonenumber"==id){
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block; left:460px;top:8px; width:380px;'> <span class='left'></span> <font class='con' style='display:block;float:left;'>"+msg+"</font> <span class='right'></span> </div>");
				}
			}else if("JBD_B"==$("#productcode").val()||"YXL"==$("#productcode").val()||"YEHKM"==$("#productcode").val()){
				$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			}else if("EAC_L"==$("#productcode").val() || "EAC_S"==$("#productcode").val()){
				$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			}else if("eMail"==$("#eMailcode").val() ){
				$("#"+id).after("<div class='point' id='tip_"+id+"'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			}else if("JCO"==$("#productcode").val() ){
				if("amount" == id){
					$("#"+id).parent().after("<div class='point2' id='tip_"+id+"' style='height: auto;position: relative;top:-16px;'><span class='left' style='height:68px;'></span><span class='con' style='height:66px;width: 460px;line-height:22px;'>"+msg+"</span><span class='right' style='height:68px;'></span></div>");
				}else{
					$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
				}
			}else if("ECR"==$("#productcode").val()&&"startdate"==id){
				$("#"+id).parent().next().after("<div class='point' id='tip_"+id+"'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			}
			else{
				
				$("#"+id).parent().after("<div class='point' id='tip_"+id+"'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
				
			}
		}
	}
	//$("#"+id).parent().next('.point').fadeIn();
}

//需要绝对定位的提示框，防止换行
function showTipsNewAbsPos(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		var of=$("#"+id).offset();
		var w=$("#"+id).width();
		$("#"+id).parent("span").css('position','relative');
		if(("JAU"==$("#productcode").val()|| "JBW"==$("#productcode").val())&&id=='certificateno'){
			$("#"+id).parent("span").append("<div class='point' id='tip_"+id+"'> <span class='newleft'></span> <span class='newcon'>"+"请输入您预订的航班号，多航班号的情况请填写<br>第一个航段的航班号，需为大写字母与数字的组合"+"</span></div>");
		}
		else {
			$("#"+id).parent("span").append("<div class='point' id='tip_"+id+"'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
		}
		//$('.point').css({'top':of.top-90,'left':of.left+w+15,'z-index':9});
	}
	//$("#"+id).parent().next('.point').fadeIn();
}

//function showTipsNewAbsPos(id,msg){
//	hideTipsNew(id);
//	if(msg!=""){
//		var of=$("#"+id).offset();
//		var w=$("#"+id).width()
//		$("#"+id).parent().after("<div class='point' id='tip_"+id+"'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
//		$('.point').css({'top':of.top-90,'left':of.left+w+15});
//	}
//	//$("#"+id).parent().next('.point').fadeIn();
//}

function showTipsNew_birthyDay(id,msg){
	hideTipsNew_birthyDay(id);
	if(msg!=""){
		var of=$("#"+id).offset();
		var w=$("#"+id).width();
		var h=$("#"+id).height();
		
		if($("#riskcode").val()=="LAY"){
			$("#"+id).parent().after("<div class='point LAYbirthday' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':'0px','left':'117px','z-index':9,'width':'177px'});
		}else if($("#riskcode").val()=="LEF"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top-68-h,'left':of.left+w+35,'z-index':9,'width':'185px'});	
		}else if($("#riskcode").val()=="LBB"){
			if(id.indexOf("pupils")>-1){
				$("#"+id).after("<div class='point' id='tip_"+id+"'style='display:block;width:189px'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			}else if(id.indexOf("domestics")>-1){
				$("#"+id).after("<div class='point' id='tip_"+id+"'style='display:block;width:197px'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			}
		}else if($("#productcode").val()=="EDD_X"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='display:block;width:189px;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({  'position':'absolute','display':'block','top':'0px','left':'115px','z-index':9,'width':'185px'});
		}else if($("#productcode").val()=="LDT_E"){
			$("#"+id).parent().after("<div class='point LAYbirthday' id='tip_"+id+"' style='display:block;width:185px;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({  'position':'absolute','display':'block','top':'0px','left':'141px','z-index':9,'width':'181px'});
		}else if($("#productcode").val()=="EAC_L"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top,'left':of.left+w+30,'z-index':9,'width':'185px'});
		}else if($("#productcode").val()=="EAC_S"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top,'left':of.left+w+30,'z-index':9,'width':'185px'});

		}else if($("#productcode").val()=="JCA"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top-68-h,'left':of.left+w+8,'z-index':9,'width':'185px'});
		}else if($("#productcode").val()=="WAF_N"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top-68-h,'left':of.left+w+8,'z-index':9,'width':'185px'});
		}else if($("#productcode").val()=="EAJ_G"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top-58-h,'left':of.left+w+8,'z-index':9,'width':'185px'});
		}else if($("#productcode").val()=="ZFO"){
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top-68-h,'left':of.left+w+11,'z-index':9,'width':'185px'});
		}else{
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top-68-h,'left':of.left+w+8,'z-index':9,'width':'185px'});
		}
	}
}

function showLAYbirthyDayTip(no,msg){
	var id="input_insuredBirthday"+no;
//	if($("#"+id).length>0){
//		return;
//	}
	hideTipsNew_birthyDay(id);
	if(msg!=""){
		var of=$("#"+id).offset();
		var w=$("#"+id).width();
		var h=$("#"+id).height();
		
		if($("#riskcode").val()=="LAY"){
			$("#"+id).parent().after("<div class='point LAYbirthday' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':'0px','left':'117px','z-index':9,'width':'177px'});
		}else{
			$("#"+id).parent().after("<div class='point' id='tip_"+id+"' style='position:absolute;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
			$('.point').css({'display':'block','top':of.top-68-h,'left':of.left+w+8,'z-index':9,'width':'185px'});
		}
	}
}

function hideTipsNew_birthyDay(id){
	if($("#tip_"+id).length>0){
		$("#tip_"+id).remove();
	}
	if($("#error_"+id).length>0){
		if("BWSJ"==$("#productcode").val()&& id=="birthday"){
			$("#"+id).parent().removeClass('errortime');
		}else{
			$("#"+id).parent().removeClass('errorText').removeClass('overCueTw');
			}
		$("#error_"+id).remove();
	}
	$.each($(".point"), function(i, item){
		$(item).remove();
	});

}
function showLongTips(id,msg){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
	$("#"+id).after("<span class='msg' flagTip='flagTip' id='tip_"+id+"' style='width:300px;height:auto;'><font style='font-size:12px;color:#838383'>"+msg+"</font></span>");
}
function hideTipsNew(id){
	if($("#tip_"+id).length>0){
		if("LAY"==$("#riskcode").val()){
			$("#tip_"+id).parent().removeClass('z-index99');
		}
		$("#tip_"+id).remove();
	}
	if($("#error_"+id).length>0){
		$("#"+id).parent().removeClass('errorText').removeClass('errorSex').removeClass('errortime').removeClass('errorAddress').removeClass('overCue').removeClass('overCueTw').removeClass('errorText1').removeClass("errorRelation");
		$("#error_"+id).remove();
	}
	if(id == "input_houseaddress"){
		$("#"+id).removeClass("errorText");
	}
//	$.each($(".point"), function(i, item){
//		$(item).remove();
//	});
}
function hideTips(id){
	if($("#tip_"+id).length>0){
		
		$("#tip_"+id).hide();
		 $.each($("span[flagTip]"), function(i, item){
				$(item).remove();
			});
	}
}
/*******************************LCB页面的问号解释页面********************************************/

// 被保险人信息 信息展示
function showInsuredLCBMSG(){
	popPosition('#showInsuredLCB');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showInsuredLCBMSG.html','430','200','','','true','');
}

// 保险财产地址信息 信息展示
function showPropertyAddressLCBMSG(){
	$("#_my97DP").hide();
	popPosition('#showPropertyAddressLCB');
	$(".mask").css("z-index","1010");
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showPropertyAdderssLCBMSG.html','430','200','','','true','');
}

//LDT_E的保险财产地址信息 信息展示
function showPropertyAddressLDT_EMSG(){
	$("#_my97DP").hide();
	popPosition('#showPropertyAddressLDT_E');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showPropertyAdderssLDT_EMSG.html','430','200','','','true','');
}

// 投保人信息展示
function showApplyLCBMSG(){
	$("#_my97DP").hide();
	popPosition('#showApplyLCB');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showApplyLCBMSG.html','430','200','','','true','');
}

// 保障权益问号解释1-12
function showLCBMSG1(){
	$("#_my97DP").hide();
	popPosition('#LCBMSG1');
	$(".mask").css("z-index","1010") ;
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG1.html','430','200','','','true','');
}
function showLCBMSG2(){
	popPosition('#LCBMSG2');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG2.html','430','200','','','true','');
}
function showLCBMSG3(){
	popPosition('#LCBMSG3');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG3.html','430','200','','','true','');
}
function showLCBMSG4(){
	popPosition('#LCBMSG4');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG4.html','430','200','','','true','');
}
function showLCBMSG5(){
	popPosition('#LCBMSG5');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG5.html','430','200','','','true','');
}
function showLCBMSG6(){
	popPosition('#LCBMSG6');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG6.html','430','200','','','true','');
}
function showLCBMSG7(){
	popPosition('#LCBMSG7');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG7.html','430','200','','','true','');
}
function showLCBMSG8(){
	popPosition('#LCBMSG8');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG8.html','430','200','','','true','');
}
function showLCBMSG9(){
	popPosition('#LCBMSG9');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG9.html','430','200','','','true','');
}
function showLCBMSG10(){
	popPosition('#LCBMSG10');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG10.html','430','200','','','true','');
}
function showLCBMSG11(){
	popPosition('#LCBMSG11');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG11.html','430','200','','','true','');
}
function showLCBMSG12(){
	popPosition('#LCBMSG12');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/L/public/showLCBMSG12.html','430','200','','','true','');
}
/*******************************LCB页面的问号解释页面END********************************************/
/*******************************ZKK_W页面的问号解释页面********************************************/
function showPersonAllduty(){
	popPosition('#personAllDuty');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showPersonAllduty.html','430','200','','','true','');
}
function showPersonAlldutyZKKR(){
	popPosition('#personAllDutyZKKR');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showPersonAlldutyZKKR.html','430','200','','','true','');
}
function showPetduty(){
	popPosition('#petDuty');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showPetduty.html','430','200','','','true','');
}
function showPolicyholderZKK_WMSG(){
	popPosition('#policyHolder');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showPolicyholderZKK_WMSG.html','430','200','','','true','');
}
function showPolicyholderZKK_RMSG(){
	popPosition('#policyHolder');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showPolicyholderZKK_WMSG.html','430','200','','','true','');
}
function showPolicyZKK_WMSG(){
	popPosition('#plicyZKK_W');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showPolicyZKK_WMSG.html','430','200','','','true','');
}
function showAccidentduty(){
	popPosition('#acidentdaty');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showAccidentduty.html','430','200','','','true','');
}
function showAddupduty(){
	popPosition('#addupduty');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showAddupduty.html','430','200','','','true','');
}
function showWardZKK_RMSG(){
	popPosition('#wardZKK_R');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showWardZKK_RMSG.html','430','200','','','true','');
}
function showPupilZKK_RMSG(){
	popPosition('#pupilZKK');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showPupilZKK_RMSG.html','430','200','','','true','');
}
function showWardDutyZKK_RMSG(){
	popPosition('#wardDutyZKK_R');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/Z/public/showWardDutyZKK_RMSG.html','430','200','','','true','');
}
/*******************************ZKK_W页面的问号解释页面END********************************************/
/*******************************EAK_X页面的问号解释页面START********************************************/
function showGuaranteeExplain(){
	popPosition('#baozhangEAK_X');
//	tipsWindown('','url:post?/EbsWeb/insuredNew/E/EAK_X/showGuaranteeExplain.html','550','451','','','true','');

}

function showDeclarationMsg(msg){
	$("#checkDeclarationMsg").html(msg);
	popPosition('#declarationMsgshort');
//	$(".mask").css("z-index","1010") ;
}
function closeDeclarationMsg(){
	$("#declarationMsgshort").hide();
}
/*******************************EAK_X页面的问号解释页面END********************************************/
/*******************************Public InsureStatement(投保声明)解释页面START********************************************/
function newShowInsureStatement(index){
	var timer = null;
	clearTimeout(timer);
	if($.browser.msie && $.browser.version=="8.0"){
		showDeclarationMsg("正在加载数据,请稍后。。。");
	}
	$("#BJspecial").hide();
	$("#SCspecial").hide();
	if($("#areacode").val()!=""){
		if($("#areacode").val()=="11000000"){
			$("#BJspecial").show();
		}else if($("#areacode").val().substring(0,2)=="51"){
			$("#SCspecial").show();
		}
	}
/*	newpopPosition('#newInsureStatement');
*/	
	timer = setTimeout(function(){
		newpopPosition('#newInsureStatement');
		$("#conBox").stop().animate({
	        scrollTop: $("#f" + index + '-' + "a").position().top + $scrollTop
	    }, 400);
	},5)
	//popPosition('#newInsureStatement');
	//tipsWindown('','url:post?/EbsWeb/insuredNew/public/showInsureStatement.html','550','451','','','true','');
}


function showInsureStatement(){
	$("#BJspecial").hide();
	$("#SCspecial").hide();
	if($("#areacode").val()!=""){
		if($("#areacode").val()=="11000000"){
			$("#BJspecial").show();
		}else if($("#areacode").val().substring(0,2)=="51"){
			$("#SCspecial").show();
		}
	}
	
	popPosition('#insureStatement');
	//tipsWindown('','url:post?/EbsWeb/insuredNew/public/showInsureStatement.html','550','451','','','true','');
}


/*******************************Public InsureStatement(投保声明)解释页面END**********************************************/
/*******************************Public InsureStatement都市白领职业解释START********************************************/
function showZhiYeMSG(){
	tipsWindown('','url:post?/EbsWeb/insuredNew/E/public/showZhiYeMSG.html','430','200','','','true','');
}
/*******************************Public InsureStatement都市白领职业解释END**********************************************/
function showValidateResultTextarea(id,msg){
	hideTipsTextarea(id);
	if(msg!=""){
//		removeClass('errorText')
		$("#"+id).addClass('errorText');
		if("LBB"==$("#productcode").val()){
			$("#"+id).parent().after("<div class='errorTip active'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
		}else{
			$("#"+id).after("<div class='errorTip active'  id='error_"+id+"'><div class='inner'>" +msg +"</div></div>");
		}
	}
}
function hideTipsTextarea(id){
	if($("#tip_"+id).length>0){
		$("#tip_"+id).remove();
	}
	if($("#error_"+id).length>0){
		$("#"+id).removeClass('errorText');
		$("#error_"+id).remove();
	}
	$.each($(".point"), function(i, item){
		$(item).remove();
	});
}

function showTipsTextarea(id,msg){
	hideTipsTextarea(id);
	if(msg!=""){
		if("JCO" == $("#productcode").val()){
			$("#"+id).after("<div class='point' id='tip_"+id+"' style='display:block;'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");
		}else{
			$("#"+id).after("<div class='point' id='tip_"+id+"'> <span class='left'></span> <span class='con'>"+msg+"</span> <span class='right'></span> </div>");		
		}
	}
}
function showTipsBtm(id,msg){
	hideTipsNew(id);
	if(msg!=""){
			var idDoc=$("#"+id);
			var s=idDoc.offset();
			var idParent=idDoc.parent();
			 if("YXL"==$("#productcode").val() && $("input[id^='input_identifyNumber']")){
				 idParent.after("<div class='caution' id='tip_"+id+"'> <div class='ff' style='width:193px;height:15px;padding:10px;line-height:20px;text-align:left;'>"+msg+"</div></div>");
			}else if("JTE_S"==$("#productcode").val() && "input_standard"==id){
				idParent.after('<p class="add_class9" id="tip_'+id+'">'+msg+'<span class="point_to2"></span></p>');
			}else{
				idParent.after("<div class='caution' id='tip_"+id+"'> <div class='ff' >"+msg+"</div></div>");
			}
			
			if($("#riskcode").val()=="LAY"){
				idParent.parent().addClass('z-index99');
			}else if($("#riskcode").val()=="EDD"||$("#productcode").val()=="LDT_E"||$("#productcode").val()=="EAJ_Y"){
			//EDD 不需要设置位置 
			}else if($("#productcode").val()=="JAB_A"){ 
				$("#tip_"+id).css({'left':60, 'top':40});
			}else if($("#productcode").val()=="EAC_L"){
				$("#tip_"+id).css({'left':s.left-2, 'top':s.top+26});
			}else if($("#productcode").val()=="EAC_S"){
				$("#tip_"+id).css({'left':s.left-2, 'top':s.top+26});
			}else if($("#productcode").val()=="JCA"){
				$("#tip_"+id).css({'left':s.left, 'top':s.top-57});
			}else if("JTE_S"==$("#productcode").val()){
				if("input_standard"==id){
					$("#tip_"+id).css({'left':s.left+129, 'top':s.top-53});
				}else{
					$("#tip_"+id).css({'left':s.left-8, 'top':s.top-59});
				}
			}else if("WAF_N"==$("#productcode").val()){
				$("#tip_"+id).css({'left':s.left-8, 'top':s.top-60});
			}else if("JBM_S"==$("#productcode").val()){
				$("#tip_"+id).css({'left':s.left-210, 'top':s.top-390});
			}else if("EAJ_G"==$("#productcode").val()){
				$("#tip_"+id).css({'left':s.left-40, 'top':s.top-62});
			}
			else{
				$("#tip_"+id).css({'left':s.left, 'top':s.top-59});
			}
	}
}

function showTipsBtm138(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		var idParent=$("#"+id).parent();
		idParent.after("<div class='caution' id='tip_"+id+"'> <div class='ff' >"+msg+"</div></div>");
		if("LAY"==$("#riskcode").val()){
			idParent.parent().addClass('z-index99');
		}
		$("#tip_"+id).children().css("width", "138");
		
	}
}


function showValidateResultBtm(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		hideInlineTips(id);
	}
	if(msg!=""){
			var s= $("#"+id).offset();
			$("#"+id).parent().addClass('errorText');
			if(id.indexOf("input_insuredsex")>-1){
				$("#"+id).parent().removeClass("errorText").addClass('errorSex');
				if("JBD_B" == $('#productcode').val()) {
					var sn = $('#sexSelectDIV').offset();
					$("#"+id).parent().after("<div class='' id='error_"+id+"'> <div style='padding-right:0;margin-left: 83px;' class='chek-sex' >"+msg+"</div></div>");
					if($("#entryId").val()==""||$("#entryId").val()==null){
						$("#error_"+id).css({'width':155});
					}else{
						$("#error_"+id).css({'width':249,'position':'absolute','top':'41px','left':'-51px'});
					}

				}else{
					$("#"+id).parent().after("<div  class='' id='error_"+id+"'> <div class='chek-sex' >"+msg+"</div></div>");
				}
			}else{
				if("JCO" == $("#productcode").val()&&"input_insuredaddress" == id){
					$("#"+id).after("<div class='caution' id='error_"+id+"'> <div class='erroInput' >"+msg+"</div></div>");
				}else if("JCO" == $("#productcode").val()&&"input_insuredPhonenumber" == id){
					$("#"+id).parent().after("<div class='caution' id='error_"+id+"'> <div class='erroInput' style='width:158px;'>"+msg+"</div></div>");
				}else if("JTE_S"==$("#productcode").val()){
					var styleEvery="";
					if("input_remark"==id){
						styleEvery = "style='line-height: 22px; width: 265px; text-align: left; height: auto; padding: 4px;'";
					}else if("input_standard"==id){
						styleEvery = "style='width: 275px;'";
					}else if("input_subjectname"==id){
						styleEvery = "style='width: 314px;'";
					}else if("input_insuredName"==id){
						styleEvery = "style='width: 205px;'";
					}else if("input_identifyNumber"==id){
						styleEvery = "style='width: 160px;'";
					}else if("input_insuredBirthday"==id){
						styleEvery = "style='width: 155px;'";
					}
					$("#"+id).parent().after("<div class='caution' id='error_"+id+"'> <div class='erroInput' " + styleEvery + " >"+msg+"</div></div>");
				}else{
					$("#"+id).parent().after("<div class='caution' id='error_"+id+"'> <div class='erroInput' >"+msg+"</div></div>");
				}
				if("EDD_Z,EDD_J,LEF,EAJ_Y".indexOf($('#productcode').val())>-1&&id.indexOf("input_insuredBirthday")>-1){
					$("#error_"+id).css({'left':s.left, 'top':s.top-55});
				}else if("EAJ_G,EJQ_H".indexOf($('#productcode').val())>-1){
					$("#error_"+id).css({'left':s.left-5, 'top':s.top-57});
				}else if("LAY_N,EDD_Z,EDD_J,LAY_A,LAY_G,LAY_J,EDD_X,LAY_H,EAJ_Y,EJQ_H".indexOf($('#productcode').val())==-1){
					if("LEF" == $('#productcode').val()&&id.indexOf("risktype")>-1){
						$("#error_"+id).children().first().css({'width':'190px'});
					}else if("LBB" == $('#productcode').val()){
						if(id.indexOf("insuredname")>-1){
							$("#error_"+id).children().first().css({'width':'188px'});
						}else if(id.indexOf("identifynumber")>-1){
							$("#error_"+id).children().first().css({'width':'178px'});
						}
						$("#error_"+id).css({'left':s.left, 'top':s.top+33});
					}else if("JAB_A" == $('#productcode').val()){
//						$("#error_"+id).css({'left':s.left-2, 'top':s.top-57});
						//不需要设置
					}else if("JBD_B" == $('#productcode').val()) {
						var browser = getBrowserInfo() ;
						//alert(browser); 
						var verinfo = (browser+"").replace(/[^0-9.]/ig,""); 
						if(verinfo == "25.0"){
							$(".caution").css({'left':'inital', 'top':'inital'});
							$(".caution").addClass("caution1");
						}else{
//							$("#error_"+id).css({'left':'45px', 'top':'40px'});
							$("#error_"+id).css({'left':s.left-2});

						}
						
						
						
					}else if("LDT_E" == $('#productcode').val()) {
						//不需要设置
					}else if("EFFEFG" == $('#productcode').val()){
						$("#"+id).parent().removeClass("errorText").addClass('overCue');
						if(id.indexOf("input_insuredBirthday")>-1){
							$("#"+id).parent().removeClass("errorText").addClass('overCueTw');
						}
						$("#error_"+id).css({'left':s.left-2, 'top':s.top-58});
						
					}else if("EAC_S" == $('#productcode').val()||"EAC_L" == $('#productcode').val()){
						$("#error_"+id).css({'left':s.left-2, 'top':s.top+33});
					}else if("JCA" == $('#productcode').val()){
						$("#error_"+id).css({'left':s.left, 'top':s.top-56});
					}else if("EAA" == $('#productcode').val()){
						$("#"+id).parent().removeClass("errorText").addClass('errorText1');
						$("#error_"+id).remove();
						$("#"+id).parent().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
					
					}else if("EDD_R" == $('#productcode').val()){
						if("input_insuredBirthday" == id){//ie浏览器死活不展示做了分支之后好了，两段代码一样，不知道什么原因
							$("#"+id).parent().removeClass("errorText").addClass('errorText1');
							$("#error_"+id).remove();
							$("#"+id).parent().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
						}else{
							$("#"+id).parent().removeClass("errorText").addClass('errorText1');
							$("#error_"+id).remove();
							$("#"+id).parent().after('<div class="errorLook" id="error_'+id+'"><span class="left"></span><span class="con">'+msg+'</span><span class="right"></span></div>');
						}
					
					}else if("JTE_D" == $('#productcode').val()||"ECR" == $('#productcode').val()){
						$("#error_"+id).css({'left':s.left-2, 'top':s.top-59});
					}else if ("EAL_L" == $('#productcode').val()){
						if(id == "modify_sex"){
							$("#error_"+id).css({'left':'350px', 'top':'240px'});
						}else{
							$("#error_"+id).css({'left':'206px', 'top':'17px'});
						}
					}else if("JTE_S" == $('#productcode').val()){
						if("input_insuredName"==id || "input_insuredBirthday"==id){
							$("#error_"+id).css({'left':s.left, 'top':s.top-59});
						}else if("input_identifyNumber"==id){
							$("#error_"+id).css({'left':s.left-8, 'top':s.top-60});
						}else{
							$("#error_"+id).css({'left':s.left-10, 'top':s.top-60});
						}
					}else if("WAF_N" == $('#productcode').val()&&"input_identifyNumber"==id){
						$("#error_"+id).css({'left':s.left-8, 'top':s.top-60});
					}else if("JBM_S" == $('#productcode').val()){
						$("#error_"+id).css({'left':s.left-176, 'top':s.top-389});
					}else if("ZFO" == $('#productcode').val()){
						if(id=="input_insuredaddress"){
							$("#error_"+id).css({'left':s.left+3.5, 'top':s.top-60});
						}else {
							$("#error_"+id).css({'left':s.left-15.5, 'top':s.top-60});
						}
					}else {
						$("#error_"+id).css({'left':s.left, 'top':s.top-59});
					}
				}else if("LAY_N,LAY_A,LAY_G,LAY_J,LAY_H".indexOf($('#productcode').val())>-1){
					$("#error_"+id).css({'top':'31px'});
				}else if("EDD_X".indexOf($('#productcode').val())>-1){
					if(id.indexOf("insuredname")>-1){
						$("#error_"+id).css({'left':s.left-176, 'top':s.top-756});
					}else if(id.indexOf("identifynumber")>-1){
						$("#error_"+id).css({'left':s.left-626, 'top':s.top-756});
					}else if(id.indexOf("birthday")>-1){
						$("#error_"+id).css({'top':s.top-758});
					}else if(id.indexOf("prpzinsured_sex")>-1){
						$("#"+id).parent().removeClass("errorText").addClass('errorSex');
						console.log(s.top)
						s= $("#insuredSexSelectSpan").offset();
						$("#error_"+id).css({'left':s.left-10, 'top':s.top-59});
					}
				}
			}

	}
	maxViewHide(id);
}

function showEndDateTips(){
	$("#enddateTips").show(); 
}
function hideEndDateTips(){
	$("#enddateTips").hide(); 
}


function showStartDateTips(){
	if("YEHKM" == $("#productcode").val() && ($("#items").val()).substring(0,3)=="YEH"){
		$("#startdateTips").children('.con').text("请输入航班起飞始日期");
	}else{
		$("#startdateTips").children('.con').text("请输入保障起始日期");
	}
	$("#startdateTips").show(); 

}
function hideStartDateTips(){
	$("#startdateTips").hide(); 
}

function showPeoplecountTips(){
	$("#peoplecountTips").show(); 
}
function hidePeoplecountTips(){
	$("#peoplecountTips").hide(); 
}


//显示输入框内的提示
function showInlineTips(id){
   var defval = $("#"+id).attr("data-value");
   var thisval = $("#"+id).val();
   if(thisval=="" || thisval == defval){
	   $("#"+id).val(defval);
	   if("YEH" != $("#productcode").val()){
		   $("#"+id).css("color","#999");
	   }else{
		   $("#"+id).css("color","#D6D6D6");
	   }
   }
}

//清除输入框内的提示
function cleanInlineTips(id){
   var defval = $("#"+id).attr("data-value");
   var thisval = $("#"+id).val();
   if(thisval==defval){
	   $("#"+id).val("");
	   $("#"+id).css("color","#333");
   }
}

//隐藏输入框内的提示
function hideInlineTips(id){
   var defval = $("#"+id).attr("data-value");
   var thisval = $("#"+id).val();
   if(thisval==defval){
	   $("#"+id).val("");
	   $("#"+id).css("color","#333");
   }
}

//财产地址优化需求给街道信息赋值
function showCityNameSpan(id,provinceName,cityName){
	var el = $("#"+id);
	var areacode = $("#areacode").val();
	var cityNameSpanText = "";
	if(areacode == "11000000" || areacode == "12000000" || areacode == "50000000" || areacode == "31000000"){
		cityNameSpanText = cityName+"市";
	}else {
		cityNameSpanText = provinceName+"省"+cityName+"市";
	}
	el.text(cityNameSpanText);
	var width = el.width()+4;
	$("#houseaddress").css({"text-indent":width});
	showInlineTips("houseaddress");
	if("JBM_S"==$("#productcode").val()){
		checkJBMMHouseAddress("houseaddress");
	}else if ("JAB_A"==$("#productcode").val()) {
		checkJABAHouseAddress("houseaddress");
	}else if ("LDT_E"==$("#productcode").val()) {
		checkLDTEHouseAddress("houseaddress");
	}else if ("LEF"==$("#productcode").val() || "LXL"==$("#productcode").val()) {
		checkHouseAddress("houseaddress");
	}
}

/*******************************JBS页面的问号********************************************/
function showJBSMSG1(){
	popPosition('#JBSMSG1');
}
function showJBSMSG2(){
	popPosition('#JBSMSG2');
}
function showJBSMSG3(){
	popPosition('#JBSMSG3');
}

function hideLAYDate(){
	if(!$("#_my97DP").is(":visible")){
		$.each($(".LAYbirthday"), function(i, item){
			$(item).remove();
		});
	}
}

/****************************健康险**************************/
function showValidateResultHealth(id,msg){
	hideTipsNew(id);
	if(msg!=""){
		$("#"+id).parent().addClass('errorText');
		$("#"+id).parent().next().after("<div class='errorLook'  id='error_"+id+"'><span class='left'></span><span class='con'>" +msg +"</span><span class='right'></span></div>");
	}
}
//确认页面的错误提示
function showValidateResultHealthConfirm(id,msg){
	//去掉提示信息
	if($("#"+id).parent().next('.caution').find(".ff")!=null){
		$("#"+id).parent().next('.caution').find(".ff").remove();
	}
	//去掉一开始的错误信息
	if($("#"+id).parent().next('.caution').find(".erroInput")!=null){
		$("#"+id).parent().next('.caution').find(".erroInput").remove();
		$("#"+id).parent().removeClass("errorText");
	}
	//显示信的错误信息
	if(msg!=""){
				$("#"+id).parent().next('.caution').append(function(n){ return '<div class="erroInput">'+msg+'</div>'; });
				$("#"+id).parent().addClass("errorText");
	}
}
function showTipsNewforHealthConfirm(id,msg){
	//去掉错误信息提示框
	if($("#"+id).parent().next('.caution').find(".erroInput")!=null){
		$("#"+id).parent().next('.caution').find(".erroInput").remove();
		$("#"+id).parent().removeClass("errorText");
	}
	//
	if(msg!=""){
		$("#"+id).parent().next('.caution').append(function(n){
			  return '<div class="ff">'+msg+'</div> ';
			  });
	}
	//$("#"+id).parent().next('.point').fadeIn();
}

function showTipsLEFBtm(id,msg){
	hideTipsNew(id);
	if(msg!=""){
			var idDoc=$("#"+id);
			var s=idDoc.offset();
			var idParent=idDoc.parent();
			if("input_companyPhonenumber"==id){
				idDoc.after("<div class='caution' id='tip_"+id+"'> <div class='ff phoneNumTip' >"+msg+"</div></div>");
			}else{
				idDoc.after("<div class='caution' id='tip_"+id+"'> <div class='ff' >"+msg+"</div></div>");
			}
	}
}

function showValidateResultLEFBtm(id,msg){
	hideTipsNew(id);
	if(msg!=""){
			hideInlineTips(id);
			var s=$("#"+id).offset();
			$("#"+id).parent().addClass('errorText');
			if(id.indexOf("input_insuredsex")>-1){
				$("#"+id).removeClass("errorText").addClass('errorSex');
				$("#"+id).after("<div class='' id='error_"+id+"'> <div class='chek-sex' >"+msg+"</div></div>");
			}else if(id.indexOf("input_industryUnit")>-1){//错误提示过长
				$("#"+id).after("<div class='caution'  id='error_"+id+"'> <div class='erroInput' style='width:271px' >"+msg+"</div></div>");
			}else if(id.indexOf("input_companyname")>-1){//错误提示过长
				$("#"+id).after("<div class='caution'  id='error_"+id+"'> <div class='erroInput' style='width:218px' >"+msg+"</div></div>");
			}else if(id.indexOf("risktype")>-1){//错误提示过长
				$("#"+id).after("<div class='caution'  id='error_"+id+"'> <div class='erroInput' style='width:190px; left:0px' >"+msg+"</div></div>");
			}			
			else{
				$("#"+id).after("<div class='caution' id='error_"+id+"'> <div class='erroInput' >"+msg+"</div></div>");
			}
	}
}
//聚焦时清除错误信息
function cleanContryNameError(id){
	if($("#sameinsurantflag").val()!="1"){
		//$("#"+id).parent().removeClass('errorText');
		if($("#"+id).parent().hasClass('errorText')){
			$("#"+id).parent().removeClass('errorText');
		}
		if($("#"+id).parent().hasClass('errorText1')){
			$("#"+id).parent().removeClass('errorText1');
		}
		
		if($("#error_"+id)){
			$("#error_"+id).hide();
		}
	}	
}
//点击显示错误文本,新增方位参数
function showValidateResultWithDirection(id,direction,msg){
	if("right"==direction){
		showValidateResultNew(id,msg);
	}else if("bottom"==direction){
		showValidateResultBtm(id,msg);
	}
}
/**
 * @description 去掉错误提示
 * @param id
 */
function hideValidateResultWithBtm(id){
	$("#"+id).parent().removeClass('errorText').removeClass('errorText1');
	$("#error_" + id).remove();
}

/***********************************营改增中，创业保和随车行李险选择组织机构并且选择开具发票弹出弹层start********************************************/
/**
 * @title showInvoiceRatePop
 * @description 营改增中，创业保和随车行李险，如果选择组织机构并且选择开具发票，需要弹出弹层提示用户
 * 				判断是否需要弹出弹层，如果true弹出，false不弹出。
 * @author yuejuxia
 */
function showInvoiceRatePop(){
	if(invoiceRatePopVali()){
		$("#popShadow").show();
		$("#popLayer").show();
	}
}
/**
 * @title showInvoiceRatePop
 * @description 关闭弹层
 * @author yuejuxia 
 */
function closeInvoiceRatePop(){
	$("#popShadow").hide();
	$("#popLayer").hide();
}
/***********************************营改增中，创业保和随车行李险选择组织机构并且选择开具发票弹出弹层end********************************************/


/*******************************赠送活动start********************************************/
function showValidateResultGift(id,msg){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
	if(msg!=""){
		$("#"+id).parent().append("<span id='error_"+id+"' class='validation-name validation'>*"+msg+"</span>");
	}
}
function hideValidateResultGift(id){
	$("#error_" + id).remove();
}
/*******************************赠送活动end********************************************/

//-----------------------V盟引流js------------------------------//
//提示V盟引流自然用户注册微店主弹窗错误信息
function showVUserRegisterTips(id,msg){
	hideVUserRegisterTips(id);
	if(msg!=""){
		$("#tip_"+id).text(msg);
		$("#tip_"+id).show();
	}
}

//隐藏V盟引流自然用户注册微店主弹窗错误信息
function hideVUserRegisterTips(id){
	$("#tip_"+id).text("");
	$("#tip_"+id).hide();
}


//---------------------------V盟引流注册弹窗中校验----------------------------//
//校验注册用户姓名
function checkVUsername(id){
	if ($.trim($("#" + id).val()) == "") {
		showVUserRegisterTips(id, "");
		return false;
	}else {
		var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
		if($("#"+id).val() != value){
			$("#" + id).val(value);
		}
		if (pcbytes($("#" + id).val()) > 30) {
			showVUserRegisterTips(id, "您的姓名过长");
			return false;
		}
		if("请填写您的真实姓名"!=$("#" + id).val()){
			if (($("#" + id).val()).match(reg4) || ($("#" + id).val()).toString().indexOf("_") > -1) {
				showVUserRegisterTips(id, "请输入正确的姓名");
				return false;
			}
		}
	}
	showVUserRegisterTips(id, "");
	return true;
}

//校验注册用户身份证号码
function checkVUsernumber(id){
	var identiyId = $("#"+id).val();
	if("" == identiyId){
		showVUserRegisterTips(id,"");
		return false;
	}else{
		var msg = isCardID(identiyId);
		if (msg == "true") {
			identiyId = identiyId.toUpperCase();
			$("#"+id).val(identiyId);
		} else {
			if("请输入正确的身份证号码" == msg){
				showVUserRegisterTips(id, "请输入正确的证件号");
			}else{
				showVUserRegisterTips(id, msg);
			}
			return false;
		}
	}
	showVUserRegisterTips(id, "");
	return true;
}

//校验注册用户团购id
function checkVUsergroupid(id){
	if ("" == $.trim($("#" + id).val()) || "补充团购ID，领取佣金" == $.trim($("#" + id).val())) {
		/*showVUserRegisterTips(id, "请填写您的团购id");
		return false;*/
		$("#" + id).val("");
	}else {
		var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
		if($("#"+id).val() != value){
			$("#" + id).val(value);
		}
		if("补充团购ID，领取佣金"!=$("#" + id).val()){
			if (!$("#" + id).val().match(flightReg)) {
				showVUserRegisterTips(id, "请输入正确的团购id");
				return false;
			}
		}
	}
	showVUserRegisterTips(id, "");
	return true;
}