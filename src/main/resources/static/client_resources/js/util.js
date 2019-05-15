//	function  setStartDateForDayBetween(){
////		var date = $("#date").val();
////		alert(date);
//		WdatePicker({minDate:'#F{$dp.$D(\'date\')}',startDate:date,alwaysUseStartDate:true,isShowToday:false,maxDate:'2013-12-%ld',doubleCalendar:false,
//		 	dateFmt:'yyyy/MM/dd',onpicked:calculationFee});
//		
//	}
	//控制值输入数字
     
function onlynum(txt) {
		   $(txt).keydown(
			function(event) {
				//alert(event.keyCode);
			 if(!((event.keyCode>95 && event.keyCode<107 )||   // 根据键值判断
			   (event.keyCode>47 && event.keyCode<58) || event.keyCode==110  
			   || event.keyCode==8 || event.keyCode==46 || event.keyCode==9 
			   || (event.keyCode>36 && event.keyCode<41) )) {
			  return false;
			 }
		//	 if(){
				//$(this).val($(this).val().replace(/[^0-9]/g,''));
			 //}
			}
		   );

	$(txt).keyup(
		function(event) {
			 
		var num = $(this).position();
		var val1 = "";
		var val2 = "";
		//alert($(this).position());
		val1 = $(this).val().substr(0,num).replace(/[^0-9]/g,'');
		val2 = $(this).val().substr(num,$(this).val().length).replace(/[^0-9]/g,'');
		$(this).val(val1+val2);
		$(this).position(val1.length);

		}
	 );
 }
//tools通过与被保险人关系的代码获得得名称
 function getApplyIdentity(Str){
	 	var StrCname = "其他";
		if(Str == ""){
			return StrCname;
		}else if("01"==Str){
			StrCname = "本人";
		}else if("10"==Str){
			StrCname = "配偶";
		}else if("11"==Str){
			StrCname = "丈夫";
		}else if("12"==Str){
			StrCname = "妻子";
		}else if("20"==Str){
			StrCname = "儿子";
		}else if("30"==Str){
			StrCname = "女儿";
		}else if("40"==Str){
			StrCname = "子女";
		}else if("50"==Str){
			StrCname = "父母";
		}else if("51"==Str){
			StrCname = "父亲";
		}else if("52"==Str){
			StrCname = "母亲";
		}else if("80"==Str){
			StrCname = "单位";
		}
		return StrCname;
 }
//tools通过与被保险人关系的代码获得得名称
 function getApplyIdentityNum(Str){
	 var StrCname = "99";
	 if(Str == ""){
		 return StrCname;
	 }else if("本人"==Str){
		 StrCname = "01";
	 }else if("配偶"==Str){
		 StrCname = "10";
	 }else if("丈夫"==Str){
		 StrCname = "11";
	 }else if("妻子"==Str){
		 StrCname = "12";
	 }else if("儿子"==Str){
		 StrCname = "20";
	 }else if("女儿"==Str){
		 StrCname = "30";
	 }else if("子女"==Str){
		 StrCname = "40";
	 }else if("父母"==Str){
		 StrCname = "50";
	 }else if("父亲"==Str){
		 StrCname = "51";
	 }else if("母亲"==Str){
		 StrCname = "52";
	 }else if("单位"==Str){
		 StrCname = "80";
	 }
	 return StrCname;
 }
 //tools通过与被保险人关系的代码获得得名称
 function getindentifyType(Str){
		var identityName = "其他";
 		identityName = getNameOrCode(Str,2);
		return identityName;
 }
 //tools通过与被保险人关系的代码获得得名称
 function getindentifyTypeNum(Str){
	 var identityCode = "99";
	 identityCode = getNameOrCode(Str,1);
	 return identityCode;
 }
 
 //保险向被保险人列表给输入域赋值
 function setInsured(){
 	var checkFalg=false;
 	$.each($("input:radio[name=insureds]"), function(i, item){
		var checkFalg1=$(item).attr("checked");
		if(checkFalg1){
			checkFalg=checkFalg1;
		}
	});
//	alert(checkFalg);
 	if(checkFalg){
 		var insuredid=$("input:radio[name=insureds][checked]").val();
		$("#input_insuredName").val($("#"+insuredid+"_name").val());
		if($("#input_insuredBirthday").length>0){
			$("#input_insuredBirthday").val($("#"+insuredid+"_birthday").val().replace(/-/g,"/"));
		}
	 	//被保人证件类型
		if($("#input_insuredIndentifyType option[value="+$("#"+insuredid+"_indentifyType").val()+"]").length>0){
			 $("#input_insuredIndentifyType>option[value="+$("#"+insuredid+"_indentifyType").val()+"]").attr("selected","true");
			 $("#input_identifyNumber").val($("#"+insuredid+"_indentifyNo").val());
		}else{
			$("#input_insuredIndentifyType option[index='0']").attr("selected","true");
			 $("#input_identifyNumber").val("");
		}
		//被保险人性别
			$("input:radio[name='prpzinsured.sex'][value="+$("#"+insuredid+"_sex").val()+"]").attr("checked","true");
			if("YEJ"!=$("#productCode").val()){
				setApplyMsg();
				setApplySex();
			}
 	}
	$("#insureds_div").hide();
	$(".mask").remove();
	$("#input_insuredIndentifyType").show();
	$("#input_applyIdentity").show();
	$("#input_applyIndentifyType").show();
	$("#input_sendQAddress").show();
	var countWard = $('#businessSite').val();
	$('#health1').show();
	if(countWard=='2')$('#health2').show();
	if(countWard=='3'){$('#health2').show();$('#health3').show();}
 }



//zkk险被保险人列表显示
function getEntryInsuredForZKK(){
	var entryId =$("#entryId").val();
	var productCode = $("#productCode").val();
	 var data='UIAction=getInsuredsDiv&entryId='+$("#entryId").val()+"&productCode="+productCode;
	    $.ajax({
			type:'post',
			url:'/EbsWeb/EAJ.do',
			data:data,
			dataType:'html',
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			success:function(data){
				//alert(data);
				if(data!=""){
//					var lis=new Array();
//					lis=data.split("</li>");
//					var lisSixze=lis.length;
//					if(lisSixze>13){
//						$("#insureds_ul").css("height","313px");
//						$("#insureds_ul").css("overflow-y","scroll");
//					}
					$("#insureds_ul").html(data);
					$("#insureds_link").show();
					//给保费赋值
				}
				
			},
			err:function(){
			}
		});
}
//信息确认页面修改投保信息
function modifyApplymsg(){
	var couponsType = $("#couponsType").val();
    if(null != couponsType && couponsType != "" && couponsType != undefined){
    	showTipsWindown("保单信息变更，请重新选择优惠券。");
    	queryUseCoupons();
    	calculateFee();
    }
	if($("#confirm_modify").text()=="保存"){
		if(saveApplyMsg()){
			$(".editTbrWrap").find(".texCnt").css("display","inline-block").next(".formCnt").hide();
			$("#confirm_modify").text("修改");
			//投保人非中国居民时展示国籍居民选择框
			setNationalityConfirm();
			//获取国籍名称
			getNationalityCnameByCode();
			//针对YEJ电子发票投保确认页做修改
			if($("#productcode").val()=="YEJ"||$("#productcode").val()=="ZKF"||$("#productcode").val()=="ZAF"){
				calculateFee();
			}
			
		}
	}else{
			$(".editTbrWrap").find(".texCnt").hide().next(".formCnt").css("display","inline-block");
			$("#confirm_modify").text("保存");
			//投保人非中国居民时展示国籍居民选择框
			setNationalityConfirm();
			//获取国籍名称
			getNationalityCnameByCode();
		}
}
function saveApplyMsg(){
	if(!saveApplyMsgDown()){
		if($("#confirm_modify").text()=="修改"){
		modifyApplymsg();
		}
		return false;
	}
	if(!checkApplyEmail('confirm_applyEmail')){
		return false;
	}
	return true;
}

function saveApplyMsg_q(){
	if(!saveApplyMsgDown_q()){
		if($("#confirm_modify_q").text()=="修改"){
		 modifyPolicymsg();
		}
		return false;
	}
	if(!checkApplyEmail('confirm_applyEmail')){
		return false;
	}
	return true;
}

function saveApplyMsgDown(){
	//查询不到国籍时清空输入域
	if($('#searchResultFlag').val()=="0")
	{
		$('#input_applyCountryCode').val('');
		$('#input_applyCountryName').val('');				
	}
	if($("#input_applyCountryName").val()==""){
		if('01|02|04|17'.indexOf($.trim($('#confirm_applyIdentifyType').val()))>-1)
		{
			if($("#error_input_applyCountryName").length>0){
				$("#error_input_applyCountryName").remove();
			}
			$("#confirm_applyNationlityTitle").hide();
			$("#confirm_applyNationlityStr").hide();
			$("#input_applyCountryName").hide();
			$("#input_applyIsResident").hide();
			$('#input_applyCountryName').val("中国");
			$("#input_applyCountryCode").val("CHN");
			$("#input_applyIsResident>option[value='A']").attr("selected","true");
		}
		else
		{
			showValidateResult("input_applyIsResident", "请输入投保人国家和地区");
			return false;
		}
	}else{
		//投保人非中国居民时展示国家和地区居民选择框
		setNationalityConfirm();
		//获取国籍名称
		getNationalityCnameByCode();
	}
	
	if(!checkApplyNumberConfirm("confirm_applyIdentifyNumber")){
		return false;
	}else{
		$("#applyIdentifyNumber").val($("#confirm_applyIdentifyNumber").val());
    	$("#confirm_applyIdentifyNumberStr").html($("#confirm_applyIdentifyNumber").val());

    	$("#applyIdentifyType").val($("#confirm_applyIdentifyType").val());
    	$("#confirm_applyIdentifyTypeStr").html(getindentifyType($("#confirm_applyIdentifyType").val()));
    	
	}
	if($("#productcode").val()!="YEJ"&&$("#productcode").val()!="YEH"&&$("#productcode").val()!="EAK_G"){
		if(!checkRelationConfirm()){
			return false;
		}else{
	    	$("#applyIdentity").val($("#confirm_applyIdentity").val());
	    	$("#confirm_applyIdentityStr").html(getApplyIdentity($("#confirm_applyIdentity").val()));
		}
	}

	if(!checkApplyIdentifyNumberSexConfirm()){
		return false;
	}else{
    	$("#applySex").val($("#confirm_applySex").val());
    	if($("#confirm_applySex").val()=="1"){
	    	$("#confirm_applySexStr").html("男");
    	}else{
    		$("#confirm_applySexStr").html("女");
    	}
	}	
	if(!checkInsuredNameConfirm("confirm_applyName")){
		return false;
	}else{
		$("#applyName").val($("#confirm_applyName").val());
		$("#confirm_applyNameStr").html($("#confirm_applyName").val());
		
	}
	if($("#oldproposalno").val()!=""){
		if(!checkApplyMobileConfirm("confirm_applyMobile")){
			return false;
		}else{
//			$("#applyMobile").val($("#confirm_applyMobile").val());
	    	$("#confirm_applyMobileStr").html($("#confirm_applyMobile").val());
		}
	}else{
		if(!checkApplyMobileConfirm("confirm_applyMobile")){
			return false;
		}else{
			//$("#applyMobile").val($("#confirm_applyMobile").val());
	    	$("#confirm_applyMobileStr").html($("#confirm_applyMobile").val());
		}
	}
	if(!checkApplyEmailConfirm("confirm_applyEmail")){
		return false;
	}else{
			$("#applyEmail").val($("#confirm_applyEmail").val());
    	$("#confirm_applyEmailStr").html($("#confirm_applyEmail").val());
    	
	}
	return true;
}

function saveApplyMsgDown_q(){
	//如果现则了纸质保单
	if($("#einsurancepolicyflag").val()=="110" || $("#einsurancepolicyflag").val()=="100" || $("#einsurancepolicyflag").val()=="120" || $("#einsurancepolicyflag").val()=="010" || $("#einsurancepolicyflag").val()=="111"){
			if(!checkSendNameConfirm("confirm_sendName")){
				return false;
			}else{
				$("#sendName").val($("#confirm_sendName").val());
	    		$("#confirm_sendNameStr").html($("#confirm_sendName").val());
			}
			if($("#einsurancepolicyflag").val()!="100"){
				if($("#invoiceTile").val()!=""){
					if(!checkInvoiceTileConfirm("confirm_invoiceTile")){
					return false;
					}else{
						$("#invoiceTile").val($("#confirm_invoiceTile").val());
						if("YEJ"==$("#productcode").val()){
							var invoiceTitle = $("#confirm_invoiceTile").val();
							var applyInfoName=$("#confirm_applyName").val();
							var prpzinsuredName=$("#prpzinsuredName_tile").val();
							if("0"==invoiceTitle){
								$("#confirm_invoiceTileStr").html("");
							}else if("2"==invoiceTitle){
								$("#confirm_invoiceTileStr").html(prpzinsuredName);
							}else{
								$("#confirm_invoiceTileStr").html(applyInfoName);
							}
						}else{
							$("#confirm_invoiceTileStr").html($("#confirm_invoiceTile").val());
						}
					}
				}
			}
			
			if($("#oldproposalno").val()!=""){
				if(!checkApplyMobileConfirm("confirm_sendMobile")){//校验手机号码
					return false;
				}else{
//					$("#sendMobile").val($("#confirm_sendMobile").val());
					$("#confirm_sendMobileStr").html($("#confirm_sendMobile").val());
				}
			}else{
				if(!checkApplyMobileConfirm("confirm_sendMobile")){//校验手机号码
					return false;
				}else{
					$("#sendMobile").val($("#confirm_sendMobile").val());
					$("#confirm_sendMobileStr").html($("#confirm_sendMobile").val());
				}
			}
			
			if($.trim($("#confirm_sendPost").val())==""){//校验邮编
				showValidateResult("confirm_sendPost","请填写邮政编码");
				return false;
			}else if(!checkPostCode("confirm_sendPost")){
				return false;
			}else{
				$("#sendPost").val($("#confirm_sendPost").val());
				$("#confirm_sendPostStr").html($("#confirm_sendPost").val());
			}
			
			if(!checkSendAddressConfirm("confirm_sendJAddress")){
				return false;
			}else{
				$("#sendQAddress").val($("#confirm_sendQAddress").find("option:selected").text());
		    	$("#confirm_sendAddressStr").html($("#sendSAddress").html()+$("#confirm_sendQAddress").find("option:selected").text()+" "+$("#confirm_sendJAddress").val());
		    	
		    	$("#sendJAddress").val($("#confirm_sendJAddress").val());
		    	$("#confirm_sendJAddressStr").html($("#confirm_sendJAddress").val());
			}
}
	return true;
}

/*************************************************以下是多个被保险人的投保部分方法****************************************************************/
//获得被保险人列表第一被保险人的数据给投保人赋值。
function getFirstInsured(){
	var sessionid=$("#sessionid").val();
	 var data='UIAction=getFirstInsured&sessionid='+$("#sessionid").val();
	    $.ajax({
			type:'post',
			url:'/EbsWeb/EAJ.do',
			data:data,
			dataType:'json',
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			success:function(data){
//				alert(data.indentifyType);
//				alert(data.indentifyNo);
//				alert(data.insuredName);
//				alert(data.sex);
	    		var indentifyType=data.indentifyType;
					if($('#input_applyName').val()==""){
						$('#input_applyName').val(data.insuredName);
					}
					if($('#input_applyIdentifyNumber').val()==""&&($("#input_applyIndentifyType option[value="+indentifyType+"]").length>0)){
						//如果证件号码为空或者是证件类型在下拉列表中存在，那么进行带入。
						$("#input_applyIndentifyType>option[value="+indentifyType+"]").attr("selected","true");
						$('#input_applyIdentifyNumber').val(data.indentifyNo);
						var sex=$.trim(data.sex);
						$('input[name="input_applySex"][value="'+sex+'"]' ).attr("checked",'checked');
					}
					
		
			},
			err:function(){
			}
		});
	
	
}
//iframe 自适应高度
function reInitIframe(iframe){
//	 var parIframe = parent.document.getElementById(iframe);
//		parIframe.height = parIframe.contentWindow.document.body.scrollHeight + 0 + "px"; 
//		parIframe.width = parIframe.contentWindow.document.body.scrollWidth + 0 + "px"; 
}
////从暂存邮件过来时
//function closebox(){
//	if($("#zentryId").val()!=""){
//	       if($("#productCode").val()=="EFG"||$("#productCode").val()=="EFF"){
//	          $("#productCode").val("EFFEFG");
//	       }
//	       location.href = "http://11.201.0.40:8020/EbsWeb/"+$("#productCode").val()+".do?";
//	    }
//}

//信息确认页面修改保单及发票寄送地址信息
function modifyPolicymsg() {
	if ($("#confirm_modify_q").text() == "保存") {
		if (saveApplyMsg_q()) {
			$(".editTbrWrap").find(".texCnt_q").css("display", "inline-block").next(".formCnt_q").hide();
			$("#confirm_modify_q").text("修改");
		}
	} else {
		$(".editTbrWrap").find(".texCnt_q").hide().next(".formCnt_q").css("display", "inline-block");
		setSendJAddressWidth();
		$("#confirm_modify_q").text("保存");
	}
}

//动态调整寄送街道地址长度以铺满整个span
function setSendJAddressWidth(){
	var sendAddress_width = $('#confirm_sendAddressStr_edit').width();
	var sendSAddress_width = $('#sendSAddress').width();
	var sendQAddress_width = $('#confirm_sendQAddress').width();
	var sendJAddress_width = sendAddress_width-sendSAddress_width-sendQAddress_width-36;
	$('#confirm_sendJAddress').css('width',sendJAddress_width);
}

function clearChangyong(){
//	$(".insureds").val("0");
	var insureds = document.getElementsByName("insureds");
	   for(var i=0;i<insureds.length;i++) {//循环
		   insureds[i].checked=false; //修改选中状态
	   }
}
//在为隐藏域赋值 function inputToHidden() 中调用
function setChangYong(){
	if($("input[type='checkbox']").is(':checked')){
	var s =$("#changYong_hidden").val();
	var q = "";
	
	var insuredName =$("#input_insuredName").val();
	var sex = $("input:radio[name='prpzinsured.sex'][checked]").val();
	var IdentifyType = $("#input_insuredIndentifyType").val();
	var identifyNumber =$("#input_identifyNumber").val();
	
	var  birthDay ="";
	if($("#input_insuredBirthday").val()!=undefined){
		birthDay =$("#input_insuredBirthday").val();
	}
	var mobile ="";
	var email ="";
	
	q = insuredName +","+sex+","+IdentifyType+","+identifyNumber+","+birthDay+".";
	s +=q; 
	$("#changYong_hidden").val(s);
	$("#saveChangYongRem").val("0");
	}else {
		$("#saveChangYongRem").val("1");
	}
	var count =$("#changYong_XianShi").html();
	count = count-1;
	if(count<0){
		count =0;
	}
	$("#changYong_XianShi").html(count);
}

function showDescription(id){
	if($("#error_"+id).length>0){
		$("#error_"+id).remove();
	}
		if(!($("#riskCode").val()=="ZKK"||$("#riskCode").val()=="LCB")){
			$("#"+id).after("<span class='msg' id='tip_"+id+"' style='cursor:default;'><font style='font-size:12px;color:#838383'>"+"如为多人投保，请参看<a href=\"#this\" onclick=\"popPosition('#applyHelp_New');\"  style=\"color:red\">填写说明</a>"+"</font></span>");
		}
}