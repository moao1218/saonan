/**
 * B版流程，INIT页面所需
 */
/** **通用变量开始***** */
var regexStr = /((^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(10|12|0?[13578])(\/)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(11|0?[469])(\/)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(0?2)(\/)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(\/)(0?2)(\/)(29)$)|(^([3579][26]00)(\/)(0?2)(\/)(29)$)|(^([1][89][0][48])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][0][48])(\/)(0?2)(\/)(29)$)|(^([1][89][2468][048])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][2468][048])(\/)(0?2)(\/)(29)$)|(^([1][89][13579][26])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][13579][26])(\/)(0?2)(\/)(29)$))/;
/** **通用变量结束***** */

// 保障方案问号切换，及隐藏
$(document).ready(
		function() {
			
			var today = new Date();
			if("EAK_G"==$("#productcode").val()){
				today.setDate(today.getDate() + 3);
			}else{
				today.setDate(today.getDate() + 1);
			}
			
			var todayStr = today.getFullYear() + "/"
					+ ("0" + (today.getMonth() + 1)).slice(-2) + "/"
					+ ("0" + today.getDate()).slice(-2);
			$("#startdate").val(todayStr);
			//如果已经退出登录  把entryid制空
			if("EFFEFG" == $("#productcode").val()){
				checkloginFirst();
			}
			if($("#riskcode").val() == "EDD"){
				setEndDateforEDD();
			}
			if($("#riskcode").val() == "BWS"){
				setdateForBWSJ(todayStr);//
			}else if ($("#productcode").val() == "JBD_B") {
				setEndDateforEDD();
			}
			else
				$("#enddate").val(todayStr);
			//个人中心登录改造，将算费提前，需要根据产品代码做判断				
		   if($("#riskcode").val() != "LAY"&&$("#riskcode").val()!="JAB"&&$("#riskcode").val()!="LEF"&&$("#riskcode").val()!="LDT"
			   &&$("#riskcode").val()!="JMA"&&$("#riskcode").val()!="JCO"&&$("#riskcode").val()!="YXL"&&$("#riskcode").val()!="JBD"&&$("#riskcode").val()!="ECK"&&$("#productcode").val()!="YEHKM"
			   &&$("#productcode").val()!="EAL_L"&&$("#productcode").val()!="JTE_S"&&$("#productcode").val()!="WAF_N"&&$("#productcode").val()!="LXL")
		   {
			   calculateFee("init");
		   }
		   if("JBD_B"==$("#productcode").val()){
				getCalculateDataForJBD_B();
			}
			$(".plan-tdtb").click(function() {
				$('.plan-tdab').toggleClass("plan-dis");
				$('.plan-tdtb').toggleClass("plan-disa");
			});
			$(".plan-tdtc").click(function() {
				$('.plan-tdac').toggleClass("plan-dis");
				$('.plan-tdtc').toggleClass("plan-disa");
			});
			$(".plan-tdtd").click(function() {
				$('.plan-tdad').toggleClass("plan-dis");
				$('.plan-tdtd').toggleClass("plan-disa");
			});
			$(".plan-tdte").click(function() {
				$('.plan-tdae').toggleClass("plan-dis");
				$('.plan-tdte').toggleClass("plan-disa");
			});
			$(".plan-tdti").click(function() {
				$('.plan-tdai').toggleClass("plan-dis");
				$('.plan-tdti').toggleClass("plan-disa");
			});
			//EAK_G 新添加 一个保障方案
			$(".plan-tdtj").click(function() {
				$('.plan-tdaj').toggleClass("plan-dis");
				$('.plan-tdtj').toggleClass("plan-disa");
			});
			$(".plan-tdth").click(function() {
				$('.plan-tdah').toggleClass("plan-dis");
				$('.plan-tdth').toggleClass("plan-disa");
			});
			$(".plan-tdtl").click(function() {
				$('.plan-tdal').toggleClass("plan-dis");
				$('.plan-tdtl').toggleClass("plan-disa");
			});
			$(".plan-tdtm").click(function() {
				$('.plan-tdam').toggleClass("plan-dis");
				$('.plan-tdtm').toggleClass("plan-disa");
			});
			$(".plan-tdtn").click(function() {
				$('.plan-tdan').toggleClass("plan-dis");
				$('.plan-tdtn').toggleClass("plan-disa");
			});
			$(".plan-tdtk").click(function() {
				$('.plan-tdak').toggleClass("plan-dis");
				$('.plan-tdtk').toggleClass("plan-disa");
			});
			$(".plan-tdtg").click(function() {
				$('.plan-tdag').toggleClass("plan-dis");
				$('.plan-tdtg').toggleClass("plan-disa");
			});
			$(".plan-tdtf").click(function() {
				$('.plan-tdaf').toggleClass("plan-dis");
				$('.plan-tdtf').toggleClass("plan-disa");
			});
			
			//首页选方案产品 初始化算费--防止页面刷新保费、方案不一致
			var productcode = $("#productcode").val();
			if(productcode == "EAK_X"){//国内自驾游
				setItems('BS');
			}else if(productcode == "EAK_G"){//高原游
				setItemsForEAJD('GT');
			}else if(productcode == "EFFEFG"){//人身意外
				setItemsEFFEFG('EFF0000001');
			}
			
			var explorer = window.navigator.userAgent ;
		if(explorer.indexOf("Safari") >= 0){
			$('#dialog_title').css({'border-radius':'6px','background':'rgb(234,234,234)','border-bottom-left-radius':'0','border-bottom-right-radius':'0','width':'420px','margin-left':'1px'});
			$('#dialog_title>ul>li.dia_middle').css('width','420px');
		}
		if(explorer.indexOf("Chrome") >= 0){
			window.onunload = function(){
				var n = window.event.screenX - window.screenLeft;   
				  var b = n > document.documentElement.scrollWidth-20;
				  if(b && window.event.clientY < 0 || window.event.altKey)   
				  {// 是关闭而非刷新
				  // saveZproposal("sendEmail");
				  	if($("#productcode").val()=="EAK_G"){
					  sendEmail();
				  	}
					  return;
				  }
				}
			$('#dialog_title').css({'border-radius':'6px','background':'rgb(234,234,234)','border-bottom-left-radius':'0','border-bottom-right-radius':'0','width':'420px','margin-left':'1px'});
			$('#dialog_title>ul>li.dia_middle').css('width','420px');
		}
		var ua = navigator.userAgent; 
		if (ua.indexOf("Windows NT 5.1")==-1){
				window.onbeforeunload = function(){
					if($("#productcode").val()=="EAK_G"){
					  sendEmail();
				  	}
				}
				
				$(window).data('beforeunload',window.onbeforeunload); 
			      //remove||re-assign onbeforeunload on hover 
			    $('a[href^="javascript:"]')
			      .hover( 
			             function(){window.onbeforeunload=null;},
			             function(){window.onbeforeunload=$(window).data('beforeunload');}
			            );
			    
			    
		}else{
	/**
	 * 一般浏览器关闭事件
	 */
			$(window).unload(function(){
					if($("#productcode").val()=="EAK_G"){
					  sendEmail();
				  	}
				});
		}
		}
	);
	
/** ******方法定义********** */
	function sendEmail() 
	{
		if("EAK_G"==$("#productcode").val()&&""!=$("#entryid").val()){
			$.ajax( {
			url : "/eproperty/member/eakgCloseSaveTemp.do",
			type : "post",
			data : $("#form").serialize(),
			async : false,
			beforeSend : function(data, textStatus) {// ajax 调用前执行
			},
			success : function(data, textStatus) {
				var result = data.result;
				if (result == "success") {
					;
				}else{
					//弹出登录注册层
					;
				}
			},
			error : function(data, textStatus) {
				// ajax 失败后执行
			// ////alert("失败了");
		},
		complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
				;
			}
		});
		}
	}
function checkStartDate(str) {
	
	var minStartdate = getIframeValue("MINSTARTDATE");
	var maxStartdate = getIframeValue("MAXSTARTDATE");
	var inputDate = $('#startdate').val();
	var defaultdate = getIframeValue("MINSTARTDATE");
	if($("#riskcode").val() == "EDD" ){
		var reg0 = /\d{8}$/;
		if (reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$("#startdate").val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			inputDate = $('#startdate').val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/");
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/");
			}
			$("#startdate").val(inputDate);
		}
	}
	
	if (inputDate == '') {
		$("#_my97DP").hide();
		if($("#productcode").val() == "EAK_G"||$("#productcode").val() == "EDD_J"||$("#productcode").val() == "EDD_Z" || $("#productcode").val() == "JBD_B")
			showDateError("请输入保障起始日期");
		else
			showDateError("请输入起始日期");
		$('#startdate').val(defaultdate);
		$('#enddate').val(defaultdate);
		return false;
	}
	if (!(regexStr.test(inputDate)) && inputDate != '') {
		$("#_my97DP").hide();
		if($("#productcode").val() == "EDD_J"||$("#productcode").val() == "EDD_Z")
			showDateError("您的日期输入有误");
		else
			showDateError("请输入正确的日期");
		$('#startdate').val(defaultdate);
		$('#enddate').val(defaultdate);
		return false;
	}
	if (inputDate < minStartdate || inputDate > maxStartdate) {
		$("#_my97DP").hide();
		if ($("#riskcode").val() == "ZKK" || $("#productCode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "LDT"
				|| $("#riskcode").val() == "EFF"
				|| $("#riskcode").val() == "EFG"
				|| $("#productCode").val() == "EJQ_Z"
				|| $("#riskcode").val() == "EFFEFG") {
			showDateError("起始日期不正确，请重新输入！");
		}else if($("#productcode").val() == "EAK_G"||$("#productcode").val() == "EDD_J"||$("#productcode").val() == "EDD_Z"||$("#productcode").val() == "JBD_B") {
			showDateError("保障起始日期不正确，请重新输入！ ");
		}
		else {
			showDateError("旅行起始日期不正确，请重新输入！");
		}
		$('#startdate').val(defaultdate);
		$('#enddate').val(defaultdate);
		return false;
	}
	// 部分险种投保期限是固定的，无需进行checkDayBwtween校验
	if (null == str && $("#riskcode").val() != "ZKK"  && $("#riskcode").val() != "EDD"
			&& $("#riskcode").val() != "LDT" && $("#productCode").val() != "EFFEFG" && $("#productCode").val() != "JBD_B") {
		if (!checkDayBetween()) {
			return false;
		}
	}
	showDateError("");
	if($("#riskcode").val() == "EDD" && $('#startdate').attr("class")!=null){
		var classname = $('#startdate').attr("class");
		$('#startdate').attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}

function checkDayBetween() {
	var dayBetween1 = getDayBetweenNew();
	var defaultdate = getIframeValue("MINSTARTDATE");
	var maxRiskperiod = getIframeValue("MAXRISKPERIOD");
	var minRiskperiod = getIframeValue("MINRISKPERIOD");
	if (minRiskperiod != "" && maxRiskperiod != "") {
		if (dayBetween1 > maxRiskperiod) {
			$("#_my97DP").hide();
			var tips = "本产品保障期间" + minRiskperiod + "-" + maxRiskperiod
					+ "天，请在期间内重新选择。";
			showDateError(tips);
			$('#startdate').val(defaultdate);
			$('#enddate').val(defaultdate);
			return false;
		} else {
			// TODO
			if((regexStr.test($('#enddate').val()))){
				$("#allDay").text(dayBetween1);
			}
			if($("#productcode").val() == "EAK_X"){
				if((regexStr.test($('#enddate').val()))){
				$("#allDay2").text(dayBetween1);
				}
			}
		}
	}
	return true;
}

function getDayBetweenNew() {
	
	if ($('#enddate').val() == "") {
		/*if($('#productcode').val()=="EAK_G")
			showDateError("请输入结束日期");*///跟需求确认与自驾游保持一致
		$('#enddate').val($('#startdate').val());
	}/*
	if ($('#enddate').val() == "") {
		$('#enddate').val($('#startdate').val());
	}*/
	if ($('#startdate').val() == "" || $('#startdate').val()==undefined) {
		return false;
	}
	var sDate = $('#startdate').val().split("/");
	var startDate = new Date(sDate[0], sDate[1] - 1, sDate[2]);
	var eDate = $('#enddate').val().split("/");
	var endDate = new Date(eDate[0], eDate[1] - 1, eDate[2]);
	if (endDate < startDate) {
		$('#enddate').val($('#startdate').val());
		endDate = startDate;
	}
	return parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24) + 1;

}

function checkDateOrder(id) {
	// 校验日期格式
	var inputDate = $('#startdate').val();
	var defaultdate = getIframeValue("MINSTARTDATE");
	var minStartdate = getIframeValue("MINSTARTDATE");
	var maxStartdate = getIframeValue("MAXSTARTDATE");
	var array = new Array();
	array = inputDate.split("/");
	if (array[1] < 10 && array[1].length == 1 || array[2] < 10
			&& array[2].length == 1) {
		showDateError("请输入正确的日期");
		$('#startdate').val(defaultdate);
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#productcode").val() == "EFFEFG"
				|| $("#riskcode").val() == "YEJ"
				|| $("#productcode").val() == "EFG_M") {
			showEndDate('startdate');
		} else {
			$('#enddate').val(defaultdate);
		}
		return false;
	}
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if (!(regexStr.test($('#' + id).val()))) {
		if ($('#' + id).val() != '') {
			$("#_my97DP").hide();
			showDateError("请输入正确的日期");
			$('#startdate').val(defaultdate);

			if ($("#riskcode").val() == "ZKK"
					|| $("#productcode").val() == "EJQ_H"
					|| $("#riskcode").val() == "LCB"
					|| $("#productcode").val() == "EFFEFG"
					|| $("#riskcode").val() == "YEJ"
					|| $("#productcode").val() == "EFG_M") {
				showEndDate('startdate');
			} else {
				$('#enddate').val($('#defaultdate').val());
			}
			return false;
		}
	}
	if ($("#startdate").val() == "") {
		$("#_my97DP").hide();
		if ($("#riskcode").val() == "YEH") {
			showDateError("请输入航班起飞日期");
		} else {
			showDateError("请输入起始日期");
		}
		$('#startdate').val($('#defaultdate').val());
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "EFF"
				|| $("#riskcode").val() == "EFG"
				|| $("#riskcode").val() == "EFFEFG") {
			showEndDate('startdate');
		} else {
			$('#enddate').val($('#defaultdate').val());
		}
		return false;
	}
	var sDate = defaultdate.split("/");
	var startDate = (parseInt(sDate[0]) + 1).toString() + '/12/31';
	if (inputDate < minStartdate || inputDate > maxStartdate) {
		$("#_my97DP").hide();
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "LDT"
				|| $("#productcode").val() == "EJQ_Z"
				|| $("#productcode").val() == "EFFEFG"
				|| $("#productcode").val() == "EFG_M") {
			showDateError("起始日期不正确，请重新输入！");
		} else if ($("#riskcode").val() == "YEH") {

			showDateError("航班起飞日期不正确，请重新输入！");
		} else {
			showDateError("旅行起始日期不正确，请重新输入！");
		}
		$('#startdate').val($('#defaultdate').val());
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "EFF"
				|| $("#riskcode").val() == "EFG"
				|| $("#productcode").val() == "EFFEFG") {
			showEndDate('startdate');
		} else {
			$('#enddate').val($('#defaultdate').val());
		}
		return false;
	}
	showDateError("");
	return true;
}

function setEndDate() {
	if (checkStartDate()) {
		maxday = parseInt(getIframeValue("MAXRISKPERIOD")) - 1;
		new WdatePicker({
			minDate : "#F{$dp.$D(\'startdate\')}",
			isShowToday : false,
			isShowClear : false,
			maxDate : "#F{$dp.$D(\'startdate\',{d:maxday})}",
			dateFmt : 'yyyy/MM/dd'
		});
	} else {
		return false;
	}
}

function setItems(items) {
	$("#item" + items).addClass('plan-ma').removeClass('plan-mb');
	$("#item" + items).siblings('.plan-ma').removeClass('plan-ma').addClass(
			'plan-mb');
	$('#items').val(items);
	checkTravelNum("peoplecount");
}
function setItemsEFFEFG(items){
	
	$("#item" + items).addClass('tickBoxYes');
	$("#item" + items).siblings('.tickBox').removeClass('tickBoxYes');
	$('#items').val(items);
	$("#riskcode").val(items.substring(0,3));
	checkTravelNum("peoplecount");
}
	
function setItemsEDD(items) {
	$('#items').val(items);
	checkTravelNum("peoplecount");
}

function setItemsForEAJD(items){
	$("#item" + items).addClass('dny-mb').removeClass('dny-mc');
	$("#item" + items).siblings('.dny-mb').removeClass('dny-mb').addClass(
			'dny-mc');
	$('#items').val(items);
	checkTravelNum("peoplecount");
}

function calculateFee(str) {
	if($("#productcode").val() == "EFFEFG"){
		try{
			if(!checkPeoplecount("peoplecount")){
				rollToPos("jrcompare");
				return false;
			}
		}catch(e){}
	}
	var sync = true;
	if (str == "sync") {
		sync = false;
	}
	if (str=='init'||checkDayBetween()) {
		var urlPath = "/eproperty/ebproposal/calculate.do";
		$.ajax({
			url : urlPath,
			type : "post",
			data : $("#form").serialize(),
			async : sync,
			dataType : "json",
			success : function(data, textStatus) {
				// 显示保费信息
				displayPremium(data);
			},
			error : function(data, textStatus) {
			},
			complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
			},
			beforeSend : function(data, textStatus) {// ajax 调用前执行
			}
		});
	} else
		return false;
}
//显示保费
function displayPremium(premiumdata) {
	var processbar = $("#processbar").val();
	var entryId = $("#entryId").val();
	for (var i = 0; i < premiumdata.length; i++) {
		var label = premiumdata[i].labelname;
		if (label != "sumPremium") {
			$("#"+label+"str").text(premiumdata[i].premium.toFixed(2)+"元");		
			$("#unitpremium").val((premiumdata[i].premium).toFixed(2));
		} else {
			
			var premium = premiumdata[i].premium;
			$("#benchmarkPremium").val(
					premiumdata[i].benchmarkPremium.toFixed(2));
			if ("" != entryId) {
				$("#priceTitle").text("会员价 ：");
				$("#priceTitle2").text("会员价 ：");
				$("#premiumStr").html((premiumdata[i].premium).toFixed(2));
				$("#premiumStr2").html((premiumdata[i].premium).toFixed(2));
				$("#sumpremium").val((premiumdata[i].premium).toFixed(2));
				$("#premiumStrYuan").show();
				$("#premiumStrYuan2").show();
				var yuanStr="原价："+ parseFloat(premiumdata[i].benchmarkPremium).toFixed(2) + "元";
				$("#premiumStrYuan").html(yuanStr);
				$("#premiumStrYuan2").html(yuanStr);
				$("#entryDiv1").hide();
				$("#entryDiv2").hide();
				if("EAK_G" == $("#productcode").val())
					$("#suspension").html("国内高原游保险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else if("EDD_J" == $("#productcode").val())
					$("#suspension").html("驾乘综合意外险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else if("EDD_Z" == $("#productcode").val())
					$("#suspension").html("交通综合年度意外险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else if("EFFEFG" == $("#productcode").val())
					$("#suspension").html("人身意外保险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else if("JBD_B" == $("#productcode").val())
					$("#suspension").html("个人账户资金安全保险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else
					$("#suspension").html("&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				
			} else {
				$("#priceTitle").text("保费 ：");
				$("#priceTitle2").text("保费 ：");
				$("#premiumStr").html(
						(premiumdata[i].benchmarkPremium).toFixed(2));
				$("#premiumStr2").html(
						(premiumdata[i].benchmarkPremium).toFixed(2));
				$("#sumpremium").val(
						(premiumdata[i].benchmarkPremium).toFixed(2));
				$("#entryDiv1").show();
				$("#entryDiv2").show();
				$("#premiumStrYuan").hide();
				$("#premiumStrYuan2").hide();
				if("EAK_G" == $("#productcode").val())
					$("#suspension").html("国内高原游保险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].benchmarkPremium.toFixed(2));
				else if("EDD_J" == $("#productcode").val())
					$("#suspension").html("驾乘综合意外险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else if("EDD_Z" == $("#productcode").val())
					$("#suspension").html("交通综合年度意外险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else if("EFFEFG" == $("#productcode").val())
					$("#suspension").html("人身意外保险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else if("JBD_B" == $("#productcode").val())
					$("#suspension").html("个人账户资金安全保险&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].premium.toFixed(2));
				else
					$("#suspension").html("&nbsp; &nbsp;&nbsp; &nbsp;¥"+premiumdata[i].benchmarkPremium.toFixed(2));
			}
			var disFee=parseFloat(premiumdata[i].benchmarkPremium - premiumdata[i].memberPremium).toFixed(2);
			$("#discountFee").html(disFee);
			$("#discountFee2").html(disFee);
			if($("#productcode").val() == "EAK_X"){
				$("#discountFee_").html(premiumdata[i].memberPremium.toFixed(2));
			}
		}
	}
	
}
//显示保费
function displayPremiumForJBD_B(premiumdata) {
	var processbar = $("#processbar").val();
	var entryId = $("#entryId").val();
	var premium = premiumdata.premium;
	$("#benchmarkPremium").val(parseFloat(premiumdata.benchmarkPremium).toFixed(2));
	if ("" != entryId) {
			$("#priceTitle").text("会员价 ：");
			$("#priceTitle2").text("会员价 ：");
			$("#premiumStr").html(parseFloat(premiumdata.memberPremium).toFixed(2));
			$("#premiumStr2").html(parseFloat(premiumdata.memberPremium).toFixed(2));
			$("#sumpremium").val(parseFloat(premiumdata.memberPremium).toFixed(2));
			$("#premiumStrYuan").show();
			$("#premiumStrYuan2").show();
			var yuanStr="原价："+ parseFloat(premiumdata.benchmarkPremium).toFixed(2) + "元";
			$("#premiumStrYuan").html(yuanStr);
			$("#premiumStrYuan2").html(yuanStr);
			$("#entryDiv1").hide();
			$("#entryDiv2").hide();
			$("#suspension").html(parseFloat(premiumdata.memberPremium).toFixed(2));
		} else {
			$("#priceTitle").text("保费 ：");
			$("#priceTitle2").text("保费 ：");
			$("#premiumStr").html(parseFloat(premiumdata.benchmarkPremium).toFixed(2));
			$("#premiumStr2").html(parseFloat(premiumdata.benchmarkPremium).toFixed(2));
			$("#sumpremium").val(parseFloat(premiumdata.benchmarkPremium).toFixed(2));
			$("#discountFee_").html(parseFloat(premiumdata.memberPremium).toFixed(2));	
			$("#entryDiv1").show();
			$("#entryDiv2").show();
			$("#premiumStrYuan").hide();
			$("#premiumStrYuan2").hide();
			$("#suspension").html(parseFloat(premiumdata.benchmarkPremium).toFixed(2));
		}
		var disFee=parseFloat(parseFloat(premiumdata.benchmarkPremium) - parseFloat(premiumdata.memberPremium)).toFixed(2);
		$("#discountFee").html(disFee);
		$("#discountFee2").html(disFee);
}
function checkTravelNum(id){
	if(checkPeoplecount(id)){
		if($("#productcode").val() == "EFFEFG"){
			calculateFee("init");
		}else{
			calculateFee("sync");
		}
		
	}else{
		return false;
	}
}

//人数校验
function checkPeoplecount(id) {
	var minInsured = getIframeValue("MININSURED");
	var maxInsured = getIframeValue("MAXINSURED");
	if ($.trim($('#' + id).val()) == '') {
		if($("#productcode").val() == "EAK_G"||$("#riskcode").val() == "EDD" || $("#productcode").val() == "EFFEFG")
			showPeoplecountError("请输入被保人数 ");
		else
			showPeoplecountError("请输入旅行人数 ");
		return false;
	}
	if (isNaN($.trim($('#' + id).val()))) {
		showPeoplecountError("请您输入有效数字 ");
		return false;
	}
	// 定义正则表达式部分,判断输入的内容是否为数字
	var value = $('#' + id).val();
	var reg = /^\d+$/;
	if (value.constructor === String) {
		var re = value.match(reg);
		if (re != null) {
		} else {
			$("#premiumStr").html(0);
			showPeoplecountError("请您输入有效数字");
			return false;
		}
	}
	var personNo = parseInt($.trim($('#' + id).val()), 10);
	if (personNo < minInsured || personNo > maxInsured) {
		showPeoplecountError("本产品单次投保被保险人上限300人且不能为0人，请您重新输入");
		return false;
	}
	
	$('#' + id).val(personNo);
	hidePeoplecountError();
	return true;
}


// 数量减少操作
function reducePeoplecount() {
	hidePeoplecountError();
	var minpeoplecount=parseInt(getIframeValue("MININSURED"));
	var maxpeoplecount=parseInt(getIframeValue("MAXINSURED"));
	var t = $('#peoplecount').val();
	if (isNaN(parseInt(t)) || t < minpeoplecount || t > maxpeoplecount) {
		t = 1;
	} else if (t == minpeoplecount) {
	} else {
		t = parseInt(t) - 1;
	}
	$('#peoplecount').val(t);
	calculateFee();
}

// 数量增加操作
function addPeoplecount() {
	hidePeoplecountError();
	var minpeoplecount=parseInt(getIframeValue("MININSURED"));
	var maxpeoplecount=parseInt(getIframeValue("MAXINSURED"));
	var t = $('#peoplecount').val();
	if (isNaN(parseInt(t)) || t < minpeoplecount || t > maxpeoplecount)  {
		t = 1;
	} else if (t == maxpeoplecount) {
	} else {
		t = parseInt(t) + 1;
	}
	$('#peoplecount').val(t);
	calculateFee();
}
//人数错误提示
function showPeoplecountError(msg){
	hidePeoplecountTips();
	$("#peoplecountErrorSpan").text(msg);
	$("#peoplecountErrorSpan").show();
}
function hidePeoplecountError(){
	$("#peoplecountErrorSpan").hide();
}

//时间错误提示
function showDateError(msg){
	hideDateError();
	if(msg!=null&&msg!=""){
		$("#periodSpan").text(msg);
		$("#periodSpan").show();
	}

}
function hideDateError(){
	$("#periodSpan").hide();
}
//人数提示
function showPeoplecountTips(){
	hidePeoplecountError();
	$("#peoplecountTipSpan").show();
}
function hidePeoplecountTips(){
	$("#peoplecountTipSpan").hide();
}

/** ********通用方法******* */
function getIframeValue(iframeId) {
	try{
	return document.getElementById("configid").contentWindow.document
	.getElementById(iframeId).value;
	}catch(e){
		setTimeout(function(){},1000);
	}
//	return $("#"+iframeId).val();
}

function addentryId(nickname,entryid){
	setEpropertySessionInfo();
	var entryId=$('#entryId').val();
	if(entryId!=null&&entryId!=""){
			SelectJumpingId();
		if("ECK" == $("#productcode").val() || "LAY_N" == $("#productcode").val() 
				|| "LAY_G" == $("#productcode").val() || "LAY_H" == $("#productcode").val() 
				|| "LAY_J" == $("#productcode").val() || "LDT_E" == $("#productcode").val() 
				|| "EAL_L" == $("#productcode").val() || "LAY_A" == $("#productcode").val()){
			$("#entryDiv2").hide();
		}
	}
//	callEcenter("eproperty");
	if("JBD_B" == $("#productcode").val()){
		calculateFeeForJBD_B($("#amount").val());
	}else{
		try{window.parent.calculateFee();}catch(e){}
	}
	 var unamelt = "";
     if (nickname != 'null' && "" != nickname) {
    	 unamelt = nickname;
     }else{
    	 unamelt = entryid;
     }
	writeVtopSpan(unamelt);
	dialogRemindCoupons();
}

function SelectJumpingId(){
	var jumpingid=$("#jumpingid").val();
	//如果是1则，立即投保
	if (jumpingid=="1") {
		$("#form").attr("action","/eproperty/laproposal/calcProposal.do");	
		$("#form").attr("target", "_blank");
		gridIndex();
		$("#form").submit();
	}
	//如果是2则，老客户续保
	if (jumpingid=="2") {
		dialogMove('.P_first h2','.P_first');
	}
	if(jumpingid=="0"||jumpingid==null||jumpingid==""){
		$("#jumpingid").val("0");
	}
}

function goInfo(){
	if (!checkStartDate()) {
		return false;
	}
	if (!checkDateOrder('startdate')) {
		return false;
	}
	if (!checkPeoplecount("peoplecount")) {
		rollToPos("jrcompare");//需要定位到高一点的位置，否则会被浮条遮住
		return false;
	}
	var form = document.getElementById("form");

	form.target="_blank";
	//添加国双监控代码
	gridIndex();
	form.submit();
}
//将登录信息放到session
function setEpropertySessionInfo(){
	var entryId=$('#entryId').val();
	$.ajax({
		url:"/eproperty/member/setSessionInfo.do",
		async: false,
		type:"post",
		data : "entryId="+ entryId,
		success:function(data){
		}
	});
}

//写页面左上角的登陆信息
function writeVtopSpan(unamelt){
    var vtop = document.getElementById("vtop"); //头部;
    var showname = unamelt;
    if (vtop != null) {
        if (showname.length > 30) {
            showname = showname.substring(0, 30) + '..';
        }
//        vtop.style.width = '100%';
        vtop.innerHTML = '<span class="welcome" style="display:inline-block;vertical-align:middle;">您好，' + showname + '&nbsp;&nbsp;</span>' + afterLogonT;
    }
}
function setEndDateforEDD(){
	//去掉校验起始时间，否则提示语会去掉
		var startDate = "startdate";
	var d=$("#"+startDate).val();
	var start = new Date(d.toString().substring(0,4)+"/"+d.toString().substring(5,7)+"/"+d.toString().substring(8,10));
	//var start = new Date(d.toString().substring(0,4)+"/"+d.toString().substring(5,7)+"/"+d.toString().substring(8,10));
	
	start.setFullYear(start.getFullYear() + 1);
	start.setDate(start.getDate()-1);
	var year=start.getFullYear();
	var month=start.getMonth()+1;
	if(month<10){
		month="0"+month;
	}
	var day=start.getDate();
	if(day<10){
		day="0"+day;
	}	
	
	$("#endYear").html(year);
	$("#endMonth").html(month);
	$("#endDay").html(day);
	
	$("#enddatestr").html(year+"年"+month+"月"+day+"日");
	if($("#productCode").val()=="JBD_B"){
		$("#enddatestr").val(year+"年"+month+"月"+day+"日");
	}
	$("#enddate").val(year+"/"+month+"/"+day);
}
/////////////////////////////百万身价 寿险 相关函数/////////////////////////////////
//百万身价 给起始日期赋值

function setdateForBWSJ(str){
	var start = new Date(str);
	var startstr = start.getFullYear() + "年"
					+ ("0" + (start.getMonth() + 1)).slice(-2) + "月"
					+ ("0" + start.getDate()).slice(-2)+"日";
					
	start.setFullYear(start.getFullYear() + 30);
	start.setDate(start.getDate()-1);
	var year=start.getFullYear();
	var month=start.getMonth()+1;//jsp中，Date.getMonth（)得到的数据是0~11
	if(month<10){
		month="0"+month;
	}
	var day=start.getDate();
	if(day<10){
		day="0"+day;
	}	
	
	$("#endYear").html(year);
	$("#endMonth").html(month);
	$("#endDay").html(day);
	$("#startstr").html(startstr);
	$("#endstr").html(year+"年"+month+"月"+day+"日");
	$("#enddate").val(year+"/"+month+"/"+day);
}
//校验生日
function checkBirthday(){
	var id = "birthday";
	var minInsuredage=getIframeValue("MININSUREDAGE");//$("#MININSUREDAGE").val();
	var maxInsuredage=getIframeValue("MAXINSUREDAGE");//("#MAXINSUREDAGE").val();
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	//EDD生日格式转换
	var inputDateBefore = $('#' + id).val();
	if($("#riskcode").val() == "BWS" ){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + id).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + id).val(inputDate);
		}
	}
	// 校验日期格式
	if($.trim($('#' + id).val()) == ''){
		
		//showValidateResultNew(id, "出生日期不能为空");
		$("#_my97DP").hide();
		return false;
	}
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultNew(id, "请输入正确的日期");
		$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#' + id).val());
	if (!chkBirthday(maxInsuredage, minInsuredage, startdate, birthday)) {
		$("#_my97DP").hide();
			var tips="被保险人年龄需在"+minInsuredage+"-"+maxInsuredage+"周岁之间";
			showValidateResultNew(id, tips);
			return false;
	}
	$("#_my97DP").hide();
	showValidateResultNew(id, "");
	return true;
}
// 限定被保险人年龄
function chkBirthday(topDate, bottomDate, startdate, birthday) {
	var _birthDate = new Date(birthday);
	if (isNaN(_birthDate)) {
		birthday = birthday.replace(/-/g, "/");
		_birthDate = new Date(birthday);
	}
	var _currentDate = new Date(startdate);
	// 允许最大年
	var tmpTopDate = new Date(getNextYearFullDate(_currentDate, -topDate));
	// 允许最小年
	var tmpBottomDate = new Date(getNextYearFullDate(_currentDate, -bottomDate));
	if (_birthDate <= tmpTopDate || _birthDate > tmpBottomDate) {
		return false;
	}
	return true;
}
var floatnum = /^(\d+\.\d{0,2}|\d+)$/ ;
var floatnum1 = /^(\.\d*|\d+\.)$/ ;
var floatnum2 = "^[0-9.]*$";
function checkIncome(id){
	var income = $.trim($('#' + id).val());
	var minRoomCharge = getIframeValue("MININCOME");//document.getElementById("MININCOME").value;
	var maxRoomCharge = getIframeValue("MAXINCOME");//document.getElementById("MAXINCOME").value;
	if (income == "") {
		//showValidateResultNew(id, "年收入不能为空");
		return false;
	}
	if (isNaN(income)) {
		showValidateResultNew(id, "请填写真实准确的年收入信息");
		return false;
	}
	if (!income.match(floatnum2)||floatnum1.test(income)) {//只允许数字和小数点
		showValidateResultNew(id, "请填写真实准确的年收入信息");
		return false;
	}
	if(!floatnum.test(income)){//精确到分
		showValidateResultNew(id, "年收入精确到分即可");
		return false;
	}
	
	income = parseFloat(income);
	minRoomCharge = parseFloat(minRoomCharge);
	maxRoomCharge = parseFloat(maxRoomCharge);
	if (income < minRoomCharge || income > maxRoomCharge) {
		showValidateResultNew(id, "请填写真实准确的年收入信息,范围为范围为1元到100亿元（不包含100亿）之间");//
		return false;
	}
	$('#'+id).val(income.toFixed(2));
	showValidateResultNew(id, "");
	return true;
}
//计算保费
function calculateFeeforBWSJ(str) {
	var sync = true;
	if (str == "sync") {
		sync = false;
	}
	if (str=='init') {
		var urlPath = "/eproperty/hproposal/calculate.do";
		$.ajax({
			url : urlPath,
			type : "post",
			data : $("#form").serialize(),
			async : sync,
			dataType : "json",
			success : function(data, textStatus) {
				// 显示保费信息 直接在这里显示完全
				//premiumUnit.setOriginPremium(expirybenifits);//满期退费
				//premiumUnit.setPremium(sumpremium);//保费
				//premiumUnit.setBenchmarkPremium(amount);//主险保额
				//premiumUnit.setCouponPremium(zjamountafter70);//70岁之后自驾游保额
				//premiumUnit.setMemberPremium(zjamountbefore70);//70之前自驾游保额
				//displayPremium(data);
				$("#amount").html(data.benchmarkPremium+"万元");
				$("#expirybenifits").html((parseFloat(data.originPremium).toFixed(2))+"元");
				$("#zjamountafter70").html(data.couponPremium+" 万元");
				$("#zjamountbefore70").html(data.memberPremium+" 万元");
				if($("#oldcount").val() == 1){
					$("#sum01btm").css("display","block");
					$("#sum05btm").css("display","none");
					$("#sum10btm").css("display","none");
					$("#sum01").html("￥"+ (parseFloat(data.premium).toFixed(2)))
				}else if($("#oldcount").val() == 5){
					$("#sum01btm").css("display","none");
					$("#sum05btm").css("display","block");
					$("#sum10btm").css("display","none");
					$("#sum05").html("￥"+ (parseFloat(data.premium).toFixed(2)))
				}else if($("#oldcount").val() == 10){
					$("#sum01btm").css("display","none");
					$("#sum05btm").css("display","none");
					$("#sum10btm").css("display","block");
					$("#sum10").html("￥"+ (parseFloat(data.premium).toFixed(2)))
				}
				$("#sumpremium").val(data.premium);
				$("items").val(data.labelname);//plancode
				$("#suspension").html("百万身价惠民两全保险&nbsp; &nbsp;&nbsp; &nbsp;¥"+data.premium.toFixed(2));
			},
			error : function(data, textStatus) {
			},
			complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
			},
			beforeSend : function(data, textStatus) {// ajax 调用前执行
			}
		});
	} else
		return false;
}
//改变方案计算保费
function setItemsforBWSJ(id,items) {
	if($("#birthday").val()==""){
		rollToPos('uptobutton');
		showValidateResultNew('birthday', "出生日期不能为空");
		
		return false;
	}else if(!checkBirthday()){
		rollToPos('uptobutton');
		return false;
	}else if($("#unitpremium").val()==""){
		rollToPos('uptobutton');
		showValidateResultNew('unitpremium', "年收入不能为空");
		
		return false;
	}else if(!checkIncome("unitpremium")){
		rollToPos('uptobutton');
		return false;
	}else{
		if("" != id){
			$("#"+id+items).parent().removeClass('hover');
			$("#"+id+items).parent().addClass('addclass');
			$("#"+id+items).parent().siblings().removeClass('addclass');
		}
		
		$('#'+id).val(items);//items  基本保险金额05/10/20；childcount  附加险住院津贴0/50/100； oldcount  几年交清1/5/10
		if(id == "childcount"){
			$("#examount").html(items+"元/天");
		}
		calculateFeeforBWSJ("init");
	}
}
//填写生日后，当年龄高于50周岁时 去掉附件险的选项
function changeExtraAmount(){
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#birthday').val());
	if(birthday!=""){
		if(!chkBirthday(50,0, startdate, birthday)){
		//大于50岁的时候
			$("#childcount0").parent().removeClass('hover');
			$("#childcount0").parent().addClass('addclass');
			$("#childcount0").parent().siblings().removeClass('addclass');
			$("#extraamount").hide();//附加险 div的id
			$("#childcount").val(0);
		}else if(!chkBirthday(60,50, startdate, birthday)){
			$("#extraamount").show();//附加险 div的id
		}
	}
}
function showInsurence(){
	if($("#birthday").val()==""){
		rollToPos('uptobutton');
		$('.productNav .firstchild').click();		
		showValidateResultNew('birthday', "出生日期不能为空");		
		return false;
	}else if(!checkBirthday()){
		rollToPos('uptobutton');
		$('.productNav .firstchild').click();
		return false;
	}else if($("#unitpremium").val()==""){
		rollToPos('uptobutton');
		$('.productNav .firstchild').click();
		showValidateResultNew('unitpremium', "年收入不能为空");
		$('.productNav .firstchild').click();
		return false;
	}else if(!checkIncome("unitpremium")){
		rollToPos('uptobutton');
		$('.productNav .firstchild').click();
	}
	$('.pop_clause,.pop_background').show();
	//$('html,body').addClass('hidden');
	//弹出投保声明框，点击确认 ，打开survey页面
}
function goSurvey(){
	 $(".contrast").fadeOut();
	 $(".pop_background").hide();
	/*if(!checkBirthday()){
		return false;
	}
	if(!checkIncome()){
		return false;
	}*/
	var form = document.getElementById("form");

	form.target="_blank";
	//添加国双监控代码
	//gridIndex();
	form.submit();
}
function closeInsurence(){
	$(".contrast").fadeOut();
	 $(".pop_background").hide();
}
function checkIncomeAndCalc(id){
	if(checkIncome(id)){
		if($("#birthday").val() != ""&&checkBirthday()){
				calculateFeeforBWSJ('init');
		}
	}
}
function checkBirthAndCalc(){
	if(checkBirthday()){
		changeExtraAmount();
		if($("#unitpremium").val()!=""&&checkIncome("unitpremium")){
			calculateFeeforBWSJ('init');
		}
	}
}
var AmountReg = /^([1-9]\d*)$/;
/**
 * @description 显示错误信息
 * @author YUEJUXIA
 * @param id
 * @param msg
 */
function showJBD_BError(id,msg){
	hiddenJBD_BError(id);
	if(msg!=null&&msg!=""){
		$("#"+id).prev().addClass("blur_inp");
		$("#"+id).find(".con").text(msg);
		$("#"+id).show();
		$("#"+id).find("span").show();
	}
}
/**
 * @description 检查保额
 * @author YUEJUXIA
 * @param ele
 * @returns {Boolean}
 */
function checkJBD_BAmount(ele,id){
	//最小保额，单位为万元
	var minAmount = getIframeValue("MINAMOUNT");
	//最大保额，单位为万元
	var maxAmount = getIframeValue("MAXAMOUNT");
	//填入保额
	var value = $(ele).val();
	//保额不为空
	if("" == value || value == "undefine"){
		showJBD_BError(id,'请输入保险金额');
		return false;
	}
	value = parseInt(value);
	//保额为正整数
	if(!AmountReg.test(value)){
		showJBD_BError(id,'请输入正确的保险金额');
		return false;
	}
	//保额小于等于100万,大于等于1万
	if(parseInt(value)<parseInt(minAmount) || parseInt(value)>parseInt(maxAmount)){
		showJBD_BError(id,'请输入正确的保险金额');
		return false;
	}
	//如果保额填写正确，焦点离开时隐藏错误提示
	hiddenJBD_BError(id)
	return true;
}
/**
 * @description 根据id隐藏页面元素
 * @author YUEJUXIA
 * @param id
 */
function hiddenJBD_BError(id){
	$("#"+id).hide();
	$("#"+id).find("span").hide();
	$("#"+id).prev().removeClass("blur_inp");
}
/**
 * @description 离开事件
 * @author YUEJUXIA
 * @param ele
 * @param id
 */
function blurJBD_BAmount(ele,id){
	//如果验证保额符合要求，测算保费
	if(checkJBD_BAmount(ele,id)){
		//根据填写保额设置投保方案
		var amountStr = $(ele).val();
		setItemsJBD_B(amountStr);
		//测算保费
		calculateFeeForJBD_B(parseInt(amountStr)+"");
	}
}
function calculateFeeForJBD_B(amountFlag){
	var calculateJson = $("#calculateBefore").val();
	var dataJson = eval("("+calculateJson+")");
	$.each(dataJson,function(index,element){
		if(amountFlag == element.labelname){
			displayPremiumForJBD_B(element);
		}
	});
}
function getCalculateDataForJBD_B(){
	$.ajax({
		url : "/eproperty/jbproposal/calculateBefore.do",
		type : "post",
		data : $("#form").serialize(),
		async : false,
		success:function(data){
			$("#calculateBefore").val(data);
		}
	});
}
/**
 * 当保额框失去焦点时，去掉提示框
 */
function removeTip(id) {
	$("#" + id).remove();
}
/**
 * 当保额框获取焦点时，提示
 */
function focusJBD_BAmount(){
	$(".div_onesef").removeClass("blur_inp");
	$(".div_onesef").parent().append(function(n){
			  return '<div id="amountSpan" class="pos_absediv pos_size"><span class="anseleft"></span><span class="ansecenter">保额区间1~100万元（注：保额在10万以下时，需为1万元整数倍；10万以上时，需为10万元整数倍）</span><span class="anseright"></span></div>';
			  });
	$(this).parent().siblings(".amountError").hide();
}
/**
 * @description 根据填写保额设置投保方案
 * @author YUEJUXIA
 * @param amountStr
 */
function setItemsJBD_B(amountStr){
	var amount = parseInt(amountStr); 
	if(amount >= 1 && amount <= 5){
		$("#items").val("JBD0000001");
	}
	if(amount >= 6 && amount <= 10){
		$("#items").val("JBD0000002");
	}
	if(amount >= 11 && amount <= 20){
		$("#items").val("JBD0000003");
	}
	if(amount >= 21 && amount <= 30){
		$("#items").val("JBD0000004");
	}
	if(amount >= 31 && amount <= 50){
		$("#items").val("JBD0000005");
	}
	if(amount >= 51 && amount <= 100){
		$("#items").val("JBD0000006");
	}
}
function checkloginFirst(){
	$.ajax( {
		url : "/eproperty/member/checkEntryid.do",
		type : "post",
		data : $("#form").serialize(),
		async : true,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			if(data.entryId==""){
				$("#entryId").val("");
			}else{
				return true;
			}
		}
		});
	
}
