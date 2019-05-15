$(document).ready(function() {
	//TODO kgqq 测试代码 start
	//setSessionInfo();
	//TODO kgqq 测试代码 end
	var productcode = $("#productcode").val();
	//新流程中info页面的计算保费不从这里调用,类似JBS的需要在页面拆分items的产品也不从这里调用
	if($("#processbar").val() == "Info" || productcode=="JBS" || productcode=="LAY_N"|| productcode=="LAY_G"
		|| productcode=="LAY_A"|| productcode=="LAY_J" || productcode == "LAY_H"
		|| productcode=="EAG_G"|| productcode=="LEF"|| productcode=="SEZJ"|| productcode=="BWSJ"|| productcode=="LDT_E"
		||"05"==$("#salemode").val() || productcode=="EAL_L"|| productcode=="JTE_S"|| productcode=="WAF_N"|| productcode=="EAJ_G"){
//		flushLoginTicket(); 
	}else{
//		flushLoginTicket("cal");
		calculateFee("sync");
	}
	if("EAG_G"==$('#productcode').val()){
		hideLogin();
	}
//	$(".clear_liangwang").delegate("a","click",function(){
	$(".clear_liangwang a").live("click",function(){
		close_LoginDivNew();
	});
})

//关闭弹出层;
function close_LoginDivNew(){
	var processbar = $('#processbar').val();
	var productcode = $('#productcode').val();
    //投保信息页面未登录状态下关闭登陆弹层，将常用被保险人框置为不选中状态
    if(processbar=="Input"&&$("#entryId").val()==""){
				$("#ifcommonInsured").attr("checked",false);
				$("#changyongflag").val("0");
     }
    //使用优惠券时未登录状态下关闭登陆弹层，将使用优惠券框置为不选中状态
    if($("#entryId").val()==""){
	    if(processbar=="Intro"&&(productcode=="ZKK_R"||productcode=="ZKK_W")){
	    	$("#isCouponV_check").attr("checked",false)
	    }else if(processbar=="Calc"&&(productcode=="EJQ_Z"||productcode=="JAB_A")||processbar=="Info"&&productcode=="EAK_X"||processbar=="Info"&&productcode=="EAK_G"){
			$("#CouponV").toggleClass('active');
			$("#couponKu").hide();
	    }
    }
}

// 页面暂存数据提交
function saveZproposal() {
	var dataStr = '';
	$.ajax( {
		url : "/eproperty/member/saveTemp.do",
		type : "post",
		data : $("#form").serialize(),
		async : true,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			var result = data.result;
			if (result == "success") {
				if($('#processbar').val()=="Input"){
					$('#prpzinsuredinsuredId').val(data.insuredid);
					$('input[name="applyInfo.insuredid"]').val("1");
					//存在被监护人信息回写id
					if($('#pupilnum').length>0){
						var pupilnum = $('#pupilnum').text();
						$.each(data.pupilList, function(i, item){
							var j= i+1;
							$('#pupilInsuredid'+j).val(item.insuredid);
							if(j==pupilnum)
								return false;
							else 
								return true;
	 					});
					}
				}
				if($("#showKeepFlag").val() == 0){
						var beforLoginPremium = encodeURI($("#benchmarkPremium").val() );
						var sumpremium;
						if($("#processbar").val()!="Input"){
							sumpremium=$("#sumpremium").val();
						}else{
							if($("#validateSumpremium").val()!=0&&$("#validateSumpremium").val()!="" && typeof($("#validateSumpremium").val()) != "undefined" )
						    	sumpremium=$("#validateSumpremium").val();
						    else
						    	sumpremium=$("#sumpremium").val();
						}
						if (sumpremium == "") sumpremium = 0;
						var m53 = encodeURI(sumpremium);
						if (m53 == "") {
							m53 = 0;
						}
						var pointPos = 0;
						var productCode =$("#productcode").val();
						if("EAK_U"==productCode || "EAJ_S"==productCode || "EAJ"==productCode || "ZKK_R"==productCode || "ZKK_W"==productCode
								|| "EAK_X"==productCode|| "ZAF"==productCode|| "ZKF"==productCode){
							pointPos = 2;
						}
						if("EAG_T"==productCode||"EAG_V"==productCode){
							$("#zancunYuan").html(Math.ceil(beforLoginPremium).toFixed(pointPos) + "元");
						}else{
							$("#zancunYuan").html(parseFloat(beforLoginPremium).toFixed(pointPos) + "元");
						}
						$("#zancunYuannew").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");//新样式中的保费
						showKeep2MSG(m53);
						$("#showKeepFlag").val(1);
						$("#zancunFlag").val("1");
				}else{
					addLoginImg();//暂存对勾
					showKeepMSG();
					$("#zancunFlag").val("1");
				}
			}else{
				//弹出登录注册层
				beforeLogin();
				changeLogin();
				afterLogin();
			}
		},
		error : function(data, textStatus) {	},
	complete : function(data, textStatus) { 		}
	});
}


//将登录信息放到session
function setSessionInfo(entryId){
	//TODO kgqq 测试代码 start
	entryId = "chenyingtj2";
	//TODO kgqq 测试代码 end
	$.ajax({
		url:"/eproperty/member/setSessionInfo.do",
		async: false,
		type:"post",
		data : "entryId="+ entryId,
		success:function(data){
		}
	});
}
	
//流程改版后的页面暂存数据提交 EA
function easaveZproposal() {
	var dataStr = '';
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
	var insuredid = lastTR.attr("id");
	if(lastTR.attr("flag") =="0"){
		cleanInlineTips("input_insuredName"+insuredid);
		try{cleanInlineTips("input_insuredEname"+insuredid);}catch(e){}
		cleanInlineTips("input_identifyNumber"+insuredid);
	}
		cleanInlineTips("input_applyName"); 
		cleanInlineTips("input_sendJAddress");
		cleanInlineTips("input_houseaddress"); 
		cleanInlineTips("input_applyIdentifyNumber");
		cleanInlineTips("input_companyname");
		cleanInlineTips("input_companyIdentifyNumber");
		cleanInlineTips("input_companyLicenseNumber");
		cleanInlineTips("input_companyPhonenumber");
	$.ajax( {
		url : "/eproperty/member/easaveTemp.do",
		type : "post",
		data : $("#form").serialize(),
		async : true,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			var result = data.result;
			if (result == "success") {
				if($('#processbar').val()=="Info"){
					//alert("Info页面暂存之后做后续处理");
					/*$('#prpzinsuredinsuredId').val(data.insuredid);
					$('input[name="applyInfo.insuredid"]').val("1");*/
				}
				if($("#showKeepFlag").val() == 0){
						var beforLoginPremium = encodeURI($("#benchmarkPremium").val() );
						var sumpremium;
						if($("#processbar").val()!="Info"){
							sumpremium=$("#sumpremium").val();
						}else{
							if($("#validateSumpremium").val()!=0&&$("#validateSumpremium").val()!="" && typeof($("#validateSumpremium").val()) != "undefined" )
						    	sumpremium=$("#validateSumpremium").val();
						    else
						    	sumpremium=$("#sumpremium").val();
						}
						if (sumpremium == "") sumpremium = 0;
						var m53 = encodeURI(window.parseFloat(sumpremium).toFixed(2));
						if (m53 == "") {
							m53 = 0;
						}
							$("#zancunYuannew").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");//新样式中的保费
							$("#zancunYuan").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");
							
						showKeep2MSG(m53);
						$("#showKeepFlag").val(1);
						$("#zancunFlag").val("1");
				}else{
					addLoginImg();//暂存对勾
					showKeepMSG();
					$("#zancunFlag").val("1");
				}
			}else{
				//弹出登录注册层
				beforeLogin();
				changeLogin();
				afterLogin();
			}
		},
		error : function(data, textStatus) {
			// ajax 失败后执行
		// ////alert("失败了");
	},
	complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
			// ajax 无论成功失败都执行
		//显示提示的’请输入‘ 等等消息
		showInlineTips("input_insuredName"+insuredid);
		try{showInlineTips("input_insuredEname"+insuredid);}catch(e){}
		showInlineTips("input_identifyNumber"+insuredid);
		showInlineTips("input_applyName"); 
		showInlineTips("input_sendJAddress"); 
		showInlineTips("input_houseaddress"); 
		showInlineTips("input_applyIdentifyNumber");
		showInlineTips("input_companyname");
		showInlineTips("input_companyIdentifyNumber");
		showInlineTips("input_companyLicenseNumber");
		showInlineTips("input_companyPhonenumber");
		}
	});
}


//流程改版后的页面暂存数据提交 EA
function LAYsaveZproposal() {
	if($('#processbar').val()=="Info" && !unsavedInsuredCheck()){
		return false;
	}
	var dataStr = '';
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
	if(lastTR.attr("flag") =="0"){
		var insuredid = lastTR.attr("id");
		cleanInlineTips("input_insuredName"+insuredid);
		cleanInlineTips("input_identifyNumber"+insuredid);
	}
		cleanInlineTips("input_applyName"); 
		cleanInlineTips("input_sendJAddress"); 
		cleanInlineTips("input_applyIdentifyNumber");
	$.ajax( {
		url : "/eproperty/member/easaveTemp.do",
		type : "post",
		data : $("#form").serialize(),
		async : true,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			var result = data.result;
			if (result == "success") {
				if($('#processbar').val()=="Info"){
					//alert("Info页面暂存之后做后续处理");
					/*$('#prpzinsuredinsuredId').val(data.insuredid);
					$('input[name="applyInfo.insuredid"]').val("1");*/
				}
				if($("#showKeepFlag").val() == 0){
						var beforLoginPremium = encodeURI($("#benchmarkPremium").val() );
						var sumpremium;
						sumpremium=$("#sumpremium").val();
						if (sumpremium == "") sumpremium = 0;
						var m53 = encodeURI(window.parseFloat(sumpremium).toFixed(2));
						if (m53 == "") {
							m53 = 0;
						}
						$("#zancunYuan").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");
						$("#zancunYuannew").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");//新样式中的保费
						showKeep2MSG(m53);
						$("#showKeepFlag").val(1);
						$("#zancunFlag").val("1");
				}else{
					addLoginImg();//暂存对勾
					showKeepMSG();
					$("#zancunFlag").val("1");
					if("EAL_L"==$("#productcode").val()){
						$("#prpzinsuredinsuredId").val(data.insuredid);
					}
				}
			}else{
				//弹出登录注册层
				beforeLogin();
				changeLogin();
				afterLogin();
			}
		},
		error : function(data, textStatus) {
			// ajax 失败后执行
		// ////alert("失败了");
	},
	complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
			// ajax 无论成功失败都执行
		//显示提示的’请输入‘ 等等消息
		showInlineTips("input_insuredName"+insuredid);
		showInlineTips("input_identifyNumber"+insuredid);
		showInlineTips("input_applyName"); 
		showInlineTips("input_sendJAddress"); 
		showInlineTips("input_applyIdentifyNumber");
		}
	});
}

function LAYlogin(){
	if(!unsavedInsuredCheck()){
		return false;
	}
	beforeLogin();
	changeLogin(1);
}
function beforeLogin(){
	$("#zancunFlag").val("2");
	$("#showKeepFlag").val(0);
}
function afterLogin(){
	$("#login_popwin").css('height','auto');
}

//LDT_E Info页面暂存方法
function LDTsaveZproposal(str) {
	var sync =true;
	if(str =="sync"){
		sync = false;
	}
	var dataStr = '';
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;
	for(i=1;i<=trsNum;i++){
		cleanInlineTips("input_insuredName"+i);
		cleanInlineTips("input_identifyNumber"+i);
	}
	cleanInlineTips("input_applyName"); 
	cleanInlineTips("input_sendJAddress"); 
	cleanInlineTips("input_applyIdentifyNumber");
	$.ajax( {
		url : "/eproperty/member/ldtsaveTemp.do",
		type : "post",
		data : $("#form").serialize(),
		async : sync,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			var result = data.result;
			if (result == "success") {
				if($('#processbar').val()=="Info"){
				}
				if($("#showKeepFlag").val() == 0){
						var beforLoginPremium = encodeURI($("#benchmarkPremium").val() );
						var sumpremium;
						sumpremium=$("#sumpremium").val();
						if (sumpremium == "") sumpremium = 0;
						var m53 = encodeURI(window.parseFloat(sumpremium).toFixed(2));
						if (m53 == "") {
							m53 = 0;
						}
						$("#zancunYuan").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");
						$("#zancunYuannew").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");//新样式中的保费
						
						showKeep2MSG(m53);
						$("#showKeepFlag").val(1);
						$("#zancunFlag").val("1");
				}else{
					addLoginImg();//暂存对勾
					showKeepMSG();
					$("#zancunFlag").val("1");
				}
			}else{
				//弹出登录注册层
				beforeLogin();
				changeLogin();
				afterLogin();
			}
		},
		error : function(data, textStatus) {
			// ajax 失败后执行
		// ////alert("失败了");
	},
	complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
			// ajax 无论成功失败都执行
		//显示提示的’请输入‘ 等等消息
		for(i=1;i<=trsNum;i++){
			showInlineTips("input_insuredName"+insuredid);
			showInlineTips("input_identifyNumber"+insuredid);
		}
		showInlineTips("input_applyName"); 
		showInlineTips("input_sendJAddress"); 
		showInlineTips("input_applyIdentifyNumber");
		}
	});
}
/**
 * 登录成功提示信息绿色对勾
 */
function addLoginImg(){
	if($("#loginImg").length>0){
		return;
	}
	//添加登录成功提示的绿色对勾
	$("#loginDivnew").find(".p_4").css({
		"padding-left":"0",
		"width":"208px",
		"background":"none",
		"margin":"0 auto",
		"text-align":"center"
	});
	$("#loginDivnew").find(".p_4").prepend("<img id='loginImg' src='/eproperty/css/theme/images/picc_register_rt.jpg' style='float: left;margin-top:6px;' />");
}
	//关闭弹层 , 如果有需要, 我这边也会调用这个函数
function closePopLogin() {
	var hostport=window.parent.location.href
	var strs=hostport.substring(hostport.length-1);  
	 var strExp=/^[0-9]+$/; 
	if (hostport.indexOf("continue") >= 0) {  
		closeBox();  
	}else{  
		close_LoginDiv();
	}
}
function close_LoginDiv() {
if (IETester()){
	document.getElementById("mask").removeNode(true);
	document.getElementById("divLogin").removeNode(true);
	document.getElementById("loginIframe").removeNode(true);
}else {
	document.getElementById("mask").remove();
	document.getElementById("divLogin").remove();
	document.getElementById("loginIframe").remove();
}
}
//当用户注册或者登陆，改变页面上。提示信息的显示内容
function doLoginSuccess(data){
	if($("#processbar").val() != "Calc"){
		if($('#productcode').val()=="LAY_H"||$('#productcode').val()=="LAY_A"||$('#productcode').val()=="LAY_G"||$('#productcode').val()=="LAY_J"||$('#productcode').val()=="LAY_N"){
			queryUseCoupons();
		}
		if($('#productcode').val()=="EFFEFG" || $('#productcode').val()=="ECK"){
			queryUseCoupons();
		}
		if($('#productcode').val()=="WAF_N"){
			queryUseCoupons();
		}
		if($('#productcode').val()=="JTE_S"){
			queryUseCoupons();
		}
		if($('#productcode').val()=="JAB_A"){
			queryUseCoupons();
		}
		if($('#productcode').val()=="LDT_E"){
			queryUseCoupons();
		}
	}
	$("#entryId").val(data.entryId);
	$("#zentryId").val(data.entryId);
	setTimeout(function (){
		closePopLogin();
	}, 300);
	addentryId();
}
/*校验登陆状态*/
function checkPageIsLogin(){
	
	var isLogin = false;
	var productcode = $('#productcode').val();
	$.ajax({
		url : "/eproperty/member/checkPageIsLogin.do",
		type : "post",
		data : "productcode="+productcode,
		async : false,
		beforeSend : function(data,textStatus){
		},
		success : function(data,textStatus){
			if("success"== data.result){
				isLogin = true;
			}else{
				changeLogin();
				isLogin = false;
			}
		}
	});
	return isLogin;
}