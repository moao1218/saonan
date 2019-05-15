window.history.go(1);
$(document).ready(function(){
	var processbar = $('#processbar').val();
//	分步骤的个性自动执行方法
	if( processbar == "Calc"){
		var maxprocessbar = $('#maxprocessbar').val();
			$('#startdateTips').css("display","block");
		//优惠券
		if($("#couponcode").val()==""){
		    checkPCoupon();
		}else if($("#couponcode").val()!=""){
		    checkPCouponBack();
		}
		//登陆状态
		checkEntryId('Calc');
		// 初始化默认的投保单终止日期，以及终止日期的日历控件范围，起始日期是从后台取的值。
		if($("#items").val() != ""){
			selectItems('item_'+$('#extensioninfo').val());
		}else{
			selectItems('item_t');
		}
		//邮件续保  发送邮件过后几天才续保的情况 将时间修改正确
		if($("#MINSTARTDATE").val() > $("#startdate").val()){
			$("#startdate").val($("#MINSTARTDATE").val());
			setEndDateforEDD();
			$("#defaultdate").val($("#MINSTARTDATE").val());
		}
		getRate();
		setEndDateforEDD();
		//TODO 对自由选择型赋值
		 checkMakeComCode();
	}else if( processbar == "Info"){
		showInlineTips("input_identifyNumber");
		showInlineTips("input_insuredName");
		showInlineTips("houseaddress");
		showInlineTips("recommendcode");
		showInlineTips("input_applyName");
		showInlineTips("input_sendJAddress");
		showInlineTips("input_applyIdentifyNumber");
		$('#step2').show();
		$('#step1').hide();
		$('#step3').hide();
		$('#step4').hide();
		calculateFee();
		checkEntryId('Info');
		//投保人非中国居民时展示国籍居民选择框
		setNationality();
		//获取国籍名称
		getNationalityCnameByCode();
		if($("#entryId").val()!=""){
			showrecommendcode();	
		}
	}else if(processbar == "Continue")
	{
		$('#step3').show();
		$('#step2').hide();
		$('#step1').hide();
		$('#step4').hide();
		checkEntryId('Continue');
		// 初始化默认的投保单终止日期，以及终止日期的日历控件范围，起始日期是从后台取的值。
		if($("#items").val() != ""){	
			$("#fangAn").val($("#items").val());
		}
		//投保人非中国居民时展示国籍居民选择框
		setNationalityConfirm();
		//获取国籍名称
		getNationalityCnameByCode();
	}
	
	/**
	 * 当为谷歌浏览器时关闭浏览器事件
	 */
	var explorer = window.navigator.userAgent ;
	if(explorer.indexOf("Chrome") >= 0||explorer.indexOf("Safari") >= 0){
		$('#dialog_title').css({'border-radius':'6px','background':'rgb(234,234,234)','border-bottom-left-radius':'0','border-bottom-right-radius':'0','width':'420px','margin-left':'1px'});
		$('#dialog_title>ul>li.dia_middle').css('width','420px');
	}

});


/* 右侧浮动开始 */
function rightfloat() {
	var divH = $("#rightFloat").height();
	var _height = $(window).height() - divH - 4;
	var _width = $(window).width();
	var _right = (_width - 1000) / 2 - 32;
	$("#rightFloat").css({
		"right" : _right
	});
}
// 首先将#back-to-top隐藏
$(".a_title").hide();
// 当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
$(function() {
	$(window).scroll(function() {
		rightfloat();
		if ($(window).scrollTop() > 300) {
			$(".a_title").fadeIn(100);
		} else {
			$(".a_title").fadeOut(100);
		}
	});
	// 当点击跳转链接后，回到页面顶部位置
	$(".a_title").click(function() {
		$("html,body").animate({
			scrollTop : 0
		}, 500);
		return false;
	});
});
$(window).resize(function() {
	rightfloat();
});
$(window).ready(function() {
	rightfloat();
	$('.btnCompare').click(function() {
		rightfloat();
	});
	var _width = $(window).width();
	var _right = (_width - 1000) / 2 - 32;
	$(".rightFloat_pro").css({
		"right" : _right
	});
});

/* 文本框文字点击失去开始 */
jQuery.focusblur = function(focusid) {
	var focusblurid = $(focusid);
	var defval = focusblurid.val();
	focusblurid.focus(function() {
		var thisval = $(this).val();
		if (thisval == defval) {
			$(this).val("");
			$(this).css("color", "#333");
		}
	});
	focusblurid.blur(function() {
		var thisval = $(this).val();
		if (thisval == "") {
			$(this).val(defval);
			$(this).css("color", "#999");
		}
	});
};
// 下面是调用方法
$.focusblur(".please_input");


// 提示框和错误框
$('.papers').focus(
		function() {
			var s = $(this).offset();
			$(this).parents('.texts').removeClass('errorText').next('.caution').find('.ff').show().next('.erroInput').hide();
			$('.ff').fadeIn();
			$('.erroInput').hide();
			$('.caution').css({
				'left' : s.left,
				'top' : s.top - 59
			});

		});
$('.papers').blur(
		function() {
			$(this).parents('.texts').addClass('errorText').next('.caution')
					.find('.ff').hide().next('.erroInput').show();
			$('.ff').hide();
			$('.erroInput').show();
		});

function showQustionmark(id) {
		$("#"+id).toggleClass("addasty");
		$("#"+id).parents("tr").siblings().find(".padd_lef40").find('a').removeClass("addasty");
		$("#"+id).parents("tr").next().find("td.hasBackgd").toggle();
		$("#"+id).parents('tr').next('.question_tr').find('td').toggle();
		$("#"+id).parents('tr').next('.question_tr').siblings('.question_tr').find('td').hide();
}




//显示保费
function displayPremium(premiumdata) {
	var processbar = $("#processbar").val();
	var couponcode = $("#couponcode").val();
	if (processbar == "Calc") {
		var entryId = $("#entryId").val();
		for ( var i = 0; i < premiumdata.length; i++) {
			var label = premiumdata[i].labelname;
			if (label != "sumPremium") {
				$("#unitpremium").val((premiumdata[i].premium).toFixed(2));
			} else {
//				// 总价显示
				var premium = premiumdata[i].premium.toFixed(2);
				var benchmarkPremium = premiumdata[i].benchmarkPremium.toFixed(2);
				var memberPremium = premiumdata[i].memberPremium.toFixed(2);
				var couponPremium = premiumdata[i].couponPremium.toFixed(2);
				var discountFee = 0;
				$("#benchmarkPremium").val(benchmarkPremium);
				if ("" != entryId) {
					$("#sumpremium").val(premium);
					$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+premium+"</em>元");
					discountFee = benchmarkPremium-memberPremium;
					$("#premiumDelete").html("<del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
					$("#entryDiv1").hide();
					if(""!=couponcode&&0!=couponPremium){
						$("#sumpremium").val(couponPremium);
						$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+couponPremium+"</em>元");
						discountFee = benchmarkPremium-couponPremium;
						$("#premiumDelete").html("<del>会员价："+memberPremium+"元 </del><del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
						$("#entryDiv1").hide();
					}
				} else {
					var salmode= $("#salemode").val();
					//如果是邮件续保
					if (salmode=="03"&&salemode!=""||salmode=="04") {
						$("#premiumStr").html(premium);
						$("#sumpremium").val(benchmarkPremium);
						$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+premium+"</em>元");
						discountFee = premium-memberPremium;
						$("#premiumDelete").html("<del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
						$("#entryDiv1").show();
						$("#discountFee").html(discountFee.toFixed(2));
						$("#premiumDelete").hide();
					}else{
						$("#premiumStr").html(benchmarkPremium);
						$("#sumpremium").val(benchmarkPremium);
						$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+couponPremium+"</em>元");
						discountFee = benchmarkPremium-memberPremium;
						$("#premiumDelete").html("<del>会员价："+memberPremium+"元 </del><del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
						$("#entryDiv1").show();
						$("#discountFee").html(discountFee.toFixed(2));
					}
				}
			}
		}
	} else if (processbar == "Info") {
		// alert("info 页面算完保费回写");
		$("#sumpremium").val(premiumdata.premium);
		$("#benchmarkPremium").val(premiumdata.benchmarkPremium);
		$("#sumpremium_up").html((premiumdata.premium).toFixed(2));
		$("#premium_btm").text((premiumdata.premium).toFixed(2)+"元");
		$("#unitpremium").val((premiumdata.premium));
		showInvoiceDivNew($("#sumpremium").val());
	} else if(processbar =="Continue")
	{
		var entryId = $("#entryId").val();
		var items = $("#items").val();
		for(var i=0; i<premiumdata.length;i++){
			var label = premiumdata[i].labelname;
			if(label != "sumPremium"){
				var oldplancode = premiumdata[i].oldPlanCode;
				var label_2 = oldplancode.substr(2,3);
				$("#"+label_2+"Fee").text(premiumdata[i].benchmarkPremium);
				$("#"+label_2+"YuanFee").text(premiumdata[i].originPremium+'元');
				if(items == label_2){
					$("#unitpremium").val(premiumdata[i].premium);
				}
			}else {
				// 总价显示
				var benchmarkpremium = premiumdata[i].benchmarkPremium;
				var premium = premiumdata[i].premium;
				$("#yuanFee").text(premiumdata[i].originPremium + "元");
				$("#Fee").text(premiumdata[i].premium + "元");
				//总保费
				$("#sumpremium").val(premium);
				//标准保费
				$("#benchmarkPremium").val(benchmarkpremium);
				//保费合计
				$("#premiumStr").html(benchmarkpremium);
				//续保保费
				$("#continuePremiumStr").html(premium);
				//节省保费
				$("#saveMoney").html(parseFloat(benchmarkpremium)-parseFloat(premium));
			}
		}
		//变更选中套餐的样式
		$("#fangAn").val($("#items").val());
	}
}

function goInfo(str) {
	$("#focusFlag").val("0");
	if($.trim($("#cityname").val()) == ""||$("#areacode").val()==""){
		rollToPos("cityname");
		showValidateResultNew("cityname", "请选择您所在的城市");
		return false;
	} 
	
	if (!checkStartDate()) {
		return false;
	}
	if (!checkDateOrder('startdate')) {
		return false;
	}
	if ($("#items").val() == ""||$('#extensioninfo').val()== ""||$('#travelcountryname').val()=='') {
		showTipsWindown("请您选择一款投保方案");
		return false;
	}
	if($('#extensioninfo').val()=='f'&&!checkAllAmount()){
		rollToPos("famount1");
		return false;
	}
	if ($("#premiumStr").html() == "0") {
		showTipsWindown("系统正在计算保费请稍后");
		return false;
	}
	//验证归属机构是否符合规则，modify by yuejuxia
	if(!checkMakeComCode()){
		return false;
	}
	//验证归属机构是否符合规则end
	$("#form").attr("action", "/eproperty/japroposal/infoProposal.do");
	gridOther();
	$("#form").submit();
}

function getItem(str){
	if($("#processbar").val()=='Calc'||$("#processbar").val()=='Continue'){
		$("#items").val(str);
		checkTravelNumCal('peoplecount');
	}
	
}

function addentryId(){
	setSessionInfo($("#entryId").val());
	var processbar = $("#processbar").val();
	var zancunFlag = $("#zancunFlag").val();
	if(processbar == "Calc"){
		//Intro
		coupCkeckBox();//优惠券展示
		$("#entryDiv1").hide();
		calculateFee("sync");//TODO Fisher
		//zancunFlag 表示是否需要暂存，初始为1，登陆之后，暂存完成的时候改成1，暂存继续投保时，暂存单里的entryid与现在登录的entryid不一致时为0，第一次点击登录时为2
		if(zancunFlag=="0"){
			checkStartDateForInterim('y');
			//优惠券
		    if($("#couponcode").val()==""){
		    	checkPCoupon();
		    }else if($("#couponcode").val()!=""){
		    	checkPCouponBack();
		    }
		}else if(zancunFlag=="1"){
		}else if(zancunFlag=="2"){
			//alert("ceshi");
			easaveZproposal();
		}
	}else if(processbar =="Info"){
//		alert("info");
		// Info 页面登陆后的操作  常用被保险人相关操作---需要修改
		$("#perplecountHeaderMsg1").css("display","none");
		$("#entryInsuredMsg").css("display","");
		showrecommendcode();
		setInsuredTableHead();
		checkEditTRSaved();
		getEntryInsured();	
		calculateFee();
		if(zancunFlag!="0" && zancunFlag!="1"){
			jasaveZproposal();
		}
	}
	callEcenter("eproperty");
}

//页面跳转及其效验
function goCalc(str){
	queryUseCoupons();
	if(str=="back"){
		checkPost();
		cleanInlineTips("input_insuredName");
		cleanInlineTips("input_identifyNumber");
		cleanInlineTips("input_applyName");
		cleanInlineTips("input_sendJAddress");
		cleanInlineTips("input_applyIdentifyNumber");
	}
	$("#form").attr("action","/eproperty/japroposal/calcProposal.do");
	gridOther();
	$("#form").submit();
}


//批量上传之后，如果投保人信息为空,
//(1)当前有效被保险人数量>1且投被保人关系为‘其他’，向投保人表单项中赋值为列表中第一个被保险人信息
//(2)当前有效被保险人数量=1且投被保人关系为‘本人’，向投保人表单项中赋值为列表中第一个被保险人信息
function setImportApplyMsg(data){
	var peoplecount = $('#peoplecount').val();//有效的被保险人个数
	var relation = $("#relation").val();//当前的投被保人关系
	if((peoplecount==1&&relation=='01')||(peoplecount>1&&relation=='99')){
		//当前仅当投保人姓名，投保人证件号码都为空的情况下，执行该动作
		if(($('#input_applyName').val()==""||$('#input_applyName').val()=="请输入投保人姓名")&&($('#input_applyIdentifyNumber').val()==""||$('#input_applyIdentifyNumber').val()=="请输入证件号码")){
			//性别
//			var sex=data.sex;
//			var entryId = $("#entryId").val();
//			if(entryId==""){
//				setSex(sex);
//			}
		    //投保人姓名
			$('#input_applyName').val(data.insuredname);
			$("#input_applyName").css("color","#333");
			if($("#eflag").val()=="010"||$("#eflag").val()=="110"||$("#eflag").val()=="120"||$("#isgrantvisa").val()=="1"){
				$('#input_sendName').val(data.insuredname);
				$('#input_invoiceTile').val(data.insuredname);
			}
			if($("#eflag").val()=="100"){
				$('#input_sendName').val(data.insuredname);
			}
			if($("#eflag").val()=="020"){
				$('#input_invoiceTile').val(data.insuredname);
			}
			//证件类型，证件号码
			var indentifyType=$("#input_insuredIndentifyType").val();
			$("#applyIdSelectSpan").html(getindentifyType(data.identifytype));
			$("#input_applyIndentifyType").val(data.identifytype);
			setNationality();
			$('#input_applyIdentifyNumber').val(data.identifynumber);
			$("#input_applyIdentifyNumber").css("color","#333");
			showValidateResultNew("input_applyIdentifyNumber","");		
		}
	}
}

function removeNameAtrr(insuredid){
		//去掉输入框的name，保证往后台传值的正确
	$("#insuredId"+insuredid).removeAttr("name");
	$("#input_insuredName"+insuredid).removeAttr("name");
	$("#input_identifytype"+insuredid).removeAttr("name");
	$("#input_identifyNumber"+insuredid).removeAttr("name");
	$("#input_insuredBirthday"+insuredid).removeAttr("name");
	$("#iscommoninsuredflag"+insuredid).removeAttr("name");
	$('.preTitle').removeAttr("style");
}
//保存投保单
function saveProposal() {
	if(!checkPageIsLogin()){
		return false;
	}
	$("#focusFlag").val("0");

	if(!checkInsuredJABA()){
		return false;
	}
	//添加房屋地址校验
	if($("#citynameText").text()==""){
		showValidateResultTextarea("citynameText", "房屋所在城市不能为空");
		return false;
	}
	//房屋地址
	if(""==$.trim($("#houseaddress").val())||"请精确到门牌号，请勿重复录入省市，省市内容如需修改，请返回上级页面修改房屋所在城市。"==$.trim($('#houseaddress').val())){
		rollToPos("houseaddress");
		showValidateResultTextarea("houseaddress", "街道地址信息不能为空");
		return false;
	}
	if(!checkJABAHouseAddress('houseaddress')){
		rollToPos("houseaddress");
		return false;
	}
	if (!checkApplyJABA()) {
		return false;
	}
	if (!checkRelation()) {
		return false;
	}
	checkPost();
	cleanPost();
	if ($("#checkbox_id").attr("class")!="inputSpan active") {
		showTipsWindown("请认真阅读投保声明、退保说明、免责说明、保险条款并确认");
		return false;
	} 
	$("#form").attr("action", "/eproperty/japroposal/generateProposal.do");
	gridOther();
	$("#form").submit();
	$('#processing').css("display", "inline-block");
	popPosition(".confirmProcessing");
}

//根据登录情况，初始化被保险人列表的thead
function setInsuredTableHead(){
	var entryid=$("#entryId").val();
	$("#insuredTitleTR2").find("th").remove();
	if(entryid != ""){
		$("#insuredTitleTR1").find("td").attr("colspan","4");
		$("#insuredTitleTR2").append('<th width="305">姓名</th><th width="310">证件类型</th><th width="308">证件号码</th><th class="delBorser" width="70">保存为常用<br>被保险人</th>');
		$("#commoninsuredTD").show();
	}else{
		$("#insuredTitleTR1").find("td").attr("colspan","3");
		$("#insuredTitleTR2").append('<th width="330">姓名</th><th width="330">证件类型</th><th class="delBorser" width="340">证件号码</th>');
		$("#commoninsuredTD").hide();
	}
}

//判断是不是默认的空被保险人
function checkDefaultInsured(insuredid){
	var isDefaultName= $.trim($("#input_insuredName"+insuredid).val()) == ""  || $.trim($("#input_insuredName"+insuredid).val()) == "请输入被保险人姓名"  ;
	var isDefaultIDType = $.trim($("#input_identifytype"+insuredid).val()) == "01" ;
	var isDefaultIDNo = $.trim($("#input_identifyNumber"+insuredid).val()) == "" || $.trim($("#input_identifyNumber"+insuredid).val()) == "请输入证件号码" ;
	return isDefaultName && isDefaultIDType && isDefaultIDNo ;
}

//把常用被保险人的信息赋值到空被保险人TR
function setEntryInsuredTODefaultInsured(insuredid,entryInsuredid){
	$("#input_insuredName"+insuredid).val($("#"+entryInsuredid+"_name").val());
	showValidateResultBtm("input_insuredName"+insuredid, "");
	$("#input_insuredName"+insuredid).parent("div").parent("td").attr("title",$("#"+entryInsuredid+"_name").val());
	$("#input_insuredName"+insuredid).css("color", "rgb(51, 51, 51)");
	setApplyFromInsuredName(insuredid);
	//这里判断一下 常用被保险人的证件类型是否符合此页面的证件类型选择
	var idtype = $("#"+entryInsuredid+"_indentifyType").val() ;
	var idno = 	$("#"+entryInsuredid+"_indentifyNo").val();
	var idgroup = $.parseJSON($("#idgroupJSON").val()) ;
	var flag = false;
	$(idgroup).each(function(i,item){
		if(idtype == idgroup[i].codecode){
			flag = true ;
		}
	});
	if(!flag){
		idtype="01";
		var idno ="";
	}
	//selectIdentifyTypeLi(idtype,insuredid);
	$("#input_identifytype"+insuredid).val(idtype);
	$("#insuredIdSelectSpan"+insuredid).html(getindentifyType(idtype));
	setApplyFromInsuredIdType(insuredid); 
	
	$("#input_identifyNumber"+insuredid).val(idno);
	showValidateResultBtm("input_identifyNumber"+insuredid, "");
	$("#input_identifyNumber"+insuredid).parent("div").parent("td").attr("title",idno);
	$("#input_identifyNumber"+insuredid).css("color", "rgb(51, 51, 51)");
	setApplyFromInsuredId(insuredid); 
	
	$("#input_insuredBirthday"+insuredid).val($("#"+entryInsuredid+"_birthday").val());
	showValidateResultBtm("input_insuredBirthday"+insuredid, "");
	$("#input_insuredBirthday"+insuredid).parent("div").parent("td").attr("title",$("#"+entryInsuredid+"_birthday").val());
	$("#setiscommoninsuredflag"+insuredid).addClass("active");
	$("#iscommoninsuredflag"+insuredid).val("1");
	$("#"+entryInsuredid).siblings("span").removeClass("active");
	if($("#"+entryInsuredid).hasClass("active")){
		$("#"+entryInsuredid).removeClass("active");
	}else{
		$("#"+entryInsuredid).addClass("active");
	}
	maxViewHide("input_identifyNumber");
}

//保存有效被保险人之前的校验
function checkInsuredJABA(){
	if ($.trim($("#input_insuredName").val()) == "" || $.trim($("#input_insuredName").val()) == "请输入被保险人姓名" ){
		rollToPos("input_insuredName");
		showValidateResultBtm("input_insuredName", "请输入被保险人姓名");
		return false;
	}
	if ($.trim($("#input_identifyNumber").val()) == ""||$.trim($("#input_identifyNumber").val()) == "请输入证件号码"){
		rollToPos("input_identifyNumber");
		showValidateResultBtm("input_identifyNumber", "请输入证件号码");
		return false;
	}

	if(!checkInsuredName("input_insuredName")){
		rollToPos("input_insuredName");
		return false;
	}
	if(!checkIdentifyNumberJABA('input_identifyNumber')){
		rollToPos("input_identifyNumber");
		return false;
	}
	return true;
}


function selectItems(id){
	$(".span_add").removeClass("one_span");
	$("#"+id).addClass("one_span");
	$(".interest_start td").removeClass("xuanzhong_bak");
	$("#item_t").parent().removeClass("xuanzhong_bak");
	$('#extensioninfo').val(id.substr(id.length-1,1));
	if($(".one_changcolr span").hasClass("one_span")){
		$(".one_changcolr").addClass("xuanzhong_bak");
		$(".editmask").show();
		calculateFee();
	}else if($(".two_changcolr span").hasClass("one_span")){
		$(".two_changcolr").addClass("xuanzhong_bak");
		$(".editmask").show();
		calculateFee();
	}else if($(".third_changcolr span").hasClass("one_span")){
		$(".third_changcolr").addClass("xuanzhong_bak");
		$(".editmask").hide();
		checkAllAmount();
	}
	
	
}

function showSideTip(id,msg){
	hideSideTip(id);
	$("#clauseTable").find(".biancheck").css('z-index','9');
	$('#'+id).parents('span').append('<div class="free_prompt"  id="JABtip_'+id+'"><div class="top"></div><div class="con">'+msg+'</div><div class="bottom"></div></div>');
	$('#'+id).parent('.biancheck').css('z-index','9999');
}

function showValidateResultSide(id,msg){
	hideSideTip(id);
	$("#"+id).parent().addClass('card_65');
	$('#'+id).parents('span').append('<div class="free_card" id="JABerror_'+id+'"><div class="top"></div><div class="con">'+msg+'</div><div class="bottom"></div></div>');
	disableInput(id);
	$('#'+id).parent('.biancheck').css('z-index','9999');
	$("#premiumStr").html('0.00');
	$("#discountFee").html('0.00');
}

function hideSideTip(id){

	if($("#JABtip_"+id).length>0){
		$("#JABtip_"+id).parent('.biancheck').css('z-index','9');
		$("#JABtip_"+id).remove();
	}
	if($("#JABerror_"+id).length>0){
		$("#JABerror_"+id).parent('.biancheck').css('z-index','9');
		$("#JABerror_"+id).remove();
	}
}

function getRate(str){
	if($("#areacode").val()==""){
		return false;
	}
	var sync =true;
	if(str =="sync"){
		sync = false;
	}
	var urlPath = "/eproperty/japroposal/getJABRate.do";
	var dataString = "areacode="+$("#areacode").val();
	$.ajax({
				url : urlPath,
				type : "post",
				data : $("#form").serialize(),
				async : sync,
				dataType : "json",
				success : function(data, textStatus) {
					// 赋值费率
					$.each(data,function(key,value){
						$("#"+key).val(value);
					});
					//提示不能投保地震险
					if($("#rate9").val()=='0'){
						//TODO 隐藏相关列,并清空页面数据以及ITEMS和TRAVELWELCOME里面的数据
						$('#amount9TR').hide();
						$('#amount10TR').hide();
						$('#famount9').val('0');
						$('#famount10').val('0');
						var hotelname="";
						for(var a=1;a<=10;a++){
				 			hotelname+=$('#famount'+a).val()+"#";
				 		}
				 		$("#hotelname").val(hotelname);
						if($("#isERateFlag").val()=='Y'){
							$('#eqAeraAlert').show();
						}
					}else{
						$('#amount9TR').show();
						if($("#rate10").val()!='0'){
							$('#amount10TR').show();
						}else{
							$('#amount10TR').hide();
						}
						$('#eqAeraAlert').hide();
					}
					//重新算费
					calculateFee();
					$("#goInputBtn").prop("disabled",false);
				},
				error : function(data, textStatus) {
				},
				complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
					// ajax 无论成功失败都执行
				},
				beforeSend : function(data, textStatus) {// ajax 调用前执行
					$("#goInputBtn").attr("disabled","disabled");
					//清空费率
					if($("#rate9").val()!="0"){
						$("#isERateFlag").val('Y');
					}else{
						$("#isERateFlag").val('N');
					}
					for(var i=0; i<=10; i++){
               			$("#rate"+i).val("0");
            		}
				}
			});
}


//计算保费 如果参数中是“sync”则调用同步方法，否则异步
//计算保费
function calculateFee(str){
	var couponsType = $("#couponsType").val();
    if(null != couponsType && couponsType != "" && couponsType != undefined){
    	showTipsWindown("保单信息变更，请重新选择优惠券。");
    	queryUseCoupons();
    }
	if("Calc"==$("#processbar").val()){
	//TODO 加校验
		var items="";
		var coverage_J="";
		var hotelname="";
		var premium=0;//保费
		var rationType=$('#extensioninfo').val();
	 	if(rationType=="t"){
	 		coverage_J="20#5#2#2#0.5#1#1#1";
	 		items="1#2#3#4#5#6#7#8";
	 	}else if(rationType=="u"){
	 		coverage_J="80#40#20#10#2#5#5#5";	
	 	    items="1#2#3#4#5#6#7#8";
	 	}else if(rationType=="f"){
	 		for(var a=1;a<=10;a++){
	 			if($('#famount'+a).val()!="0"){
	 				items+=(a)+"#";
	 				coverage_J += $('#famount'+a).val()+"#";
	 			}
	 			hotelname+=$('#famount'+a).val()+"#";
	 		}
	 		$("#hotelname").val(hotelname);
	 	}
	 	$("#items").val(items);
	 	$("#travelcountryname").val(coverage_J);
		getFee();
	}else if("Info"==$("#processbar").val()){

		var urlPath = "/eproperty/japroposal/calculate.do";
		$.ajax({
					url : urlPath,
					type : "post",
					data : $("#form").serialize(),
					async : false,
					dataType : "json",
					success : function(data, textStatus) {
						// 显示保费信息
						displayPremium(data);
						// $('#dayBetweenStr').html(dayBetween);
						$("#goInputBtn").prop("disabled",false);
					},
					error : function(data, textStatus) {
					},
					complete : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
						// ajax 无论成功失败都执行
					},
					beforeSend : function(data, textStatus) {// ajax 调用前执行
						$("#goInputBtn").attr("disabled","disabled");
					}
		});
	
	}
	

    
}

function getFee(){
	var amounts="";
	var amountf=0;
	//乘以100000  算完在除以10，避免小数乘法出错
	var rationType=$('#extensioninfo').val();
 	//代表销售方式如：01-正常网销、02-短信续保、03-邮件续保、04-短信邮件公用续保 
 	var salemode=$('#salemode').val();
	var rationType=$('#extensioninfo').val();
	var premium=0;
	for(var i=1;i<=10;i++){
		amounts=$("#"+rationType+"amount"+i).val();
		amountf=$("#rate"+i).val()*100000;
    	premium += parseFloat($("#"+rationType+"amount"+i).val())*($("#rate"+i).val()*100000);
    }
    premium=premium/10;
    var benchmarkPremium=(Math.ceil((premium/0.9)*100)/100).toFixed(2);
   	$("#benchmarkPremium").val((Math.ceil((premium/0.9)*100)/100).toFixed(2));
   	var memberPremium=premium.toFixed(2);
   	var couponPremium=0;
   	if($("#coupon_Feebiaoshi").val()=="1"){
    	var coupon_dis = $("#coupon_dis").val();
    	if(parseFloat($("#coupon_am").val())<=parseFloat(memberPremium)){
    		couponPremium=(Math.ceil(((memberPremium*(coupon_dis/100))*100).toFixed(2))/100).toFixed(2);
    	}
    }
    if($("#entryId").val()!=""){	
    	$("#unitpremium").val(premium.toFixed(2));
    	$("#sumpremium").val(premium.toFixed(2));
	    $("#premiumStr").html((Math.ceil(premium*100)/100).toFixed(2));
		$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+premium.toFixed(2)+"</em>元");;
		var discountFee = parseFloat(benchmarkPremium)-parseFloat(memberPremium);
		$("#premiumDelete").html("<del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
		$("#entryDiv1").hide();
			var couponcode = $("#couponcode").val();
		if(""!=couponcode&&0!=couponPremium){
			$("#sumpremium").val(couponPremium);
			$("#unitpremium").val(couponPremium);
			$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+couponPremium+"</em>元");
			discountFee = benchmarkPremium-couponPremium;
			$("#premiumDelete").html("<del>会员价："+memberPremium+"元 </del><del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
			$("#entryDiv1").hide();
		}
	}else{
	 	$("#unitpremium").val((Math.ceil((premium/0.9)*100)/100).toFixed(2));
	 	$("#sumpremium").val((Math.ceil((premium/0.9)*100)/100).toFixed(2));
		$("#premiumStr").html((Math.ceil((premium/0.9)*100)/100).toFixed(2));
		$("#discountFee").html((Math.ceil((premium/9)*100)/100).toFixed(2));
		$("#entryDiv1").show();	
		$("#premiumStrYuan").hide();
	}
    //如果是邮件续保
    if (salemode=="03"&&""!=salemode||salemode=="04") {
    	var couponcode = $("#couponcode").val();
    	if(""!=couponcode&&0!=couponPremium){
    	 	$("#sumpremium").val(couponPremium);
    		$("#unitpremium").val(couponPremium);
			$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+couponPremium+"</em>元");
			discountFee = benchmarkPremium-couponPremium;
			$("#premiumDelete").html("<del>会员价："+memberPremium+"元 </del><del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
			$("#entryDiv1").hide();
    	 }else{
    	$("#unitpremium").val((Math.ceil((premium)*100)/100).toFixed(2));
	 	$("#sumpremium").val((Math.ceil((premium)*100)/100).toFixed(2));
	 	//合计保费
		$("#premiumStr").html((Math.ceil((premium)*100)/100).toFixed(2));
	 	$("#discountFee").html((Math.ceil((premium/9)*100)/100).toFixed(2));
		$("#premiumDisplay").html("<b>会员价：</b><em id='premiumStr'>"+premium.toFixed(2)+"</em>元");;
		var discountFee = parseFloat(benchmarkPremium)-parseFloat(memberPremium);
		$("#premiumDelete").html("<del>原价："+benchmarkPremium+"元</del>立省<i id='discountFee'>"+discountFee.toFixed(2)+"</i>元");
		$("#entryDiv1").hide();
    	}
	 	
		
//		var entryId= $("#entryId").val();
//		if (entryId!="") {
//			$("#entryDiv1").hide();
//		}else{
//			$("#entryDiv1").show();				
//		}
//		$("#premiumStrYuan").hide();
//		$("#premiumDelete").hide();
	}
}


function checkAmount(id){//自由型保额CHECK
	$("#clauseTable").find("div[id^=JABerror_]").remove();
	$("#clauseTable").find("div[id^=JABtip_]").remove();
	$("#clauseTable").find(".biancheck").css('z-index','9');
	if($(".third_changcolr span").hasClass("card_65")){
		$(".third_changcolr span").removeClass("card_65");
	}
	enableInput();
	$("#"+id).val(($("#"+id).val()).replace(/\s+/g,""));
	if($("#"+id).val()!=""){
	 	$("#"+id).val(parseFloat($("#"+id).val()));
	}
	if(isNaN($("#"+id).val())){
		if(id=="famount1"){
			$("#"+id).val("0.5");
		}else{
			$("#"+id).val("0");
		}
		showValidateResultSide(id,"请输入有效数字");
		return false;
	}
	if(($("#"+id).val()*10000)%1000!=0){
		showValidateResultSide(id,"保额需为1000元的整数倍");
		return false;
	}
	if(id=="famount1"){
		if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>500){
			 	showValidateResultSide(id,"保额区间为：0.5~500万元");
				return false;
		}
	 }else if(id=="famount2"&&$("#"+id).val()!="0"){
	 	if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>40){
			showValidateResultSide(id,"保额区间为：0.5~40万元");
			return false;
		}
	}else if(id=="famount3"&&$("#"+id).val()!="0"){
	 	if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>20){
			showValidateResultSide(id,"保额区间为：0.5~20万元");
			return false;
		}
	}else if(id=="famount4"&&$("#"+id).val()!="0"){
		if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>10){
			showValidateResultSide(id,"保额区间为：0.5~10万元");
			return false;
		}
    }else if(id=="famount5"&&$("#"+id).val()!="0"){
    	if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>2){
    		showValidateResultSide(id,"保额区间为：0.5~2万元");
			return false;
    	}
    }else if(id=="famount6"&&$("#"+id).val()!="0"){
		if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>5){
			showValidateResultSide(id,"保额区间为：0.5~5万元");
			return false;
		}
    }else if(id=="famount7"&&$("#"+id).val()!="0"){
		if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>5){
			showValidateResultSide(id,"保额区间为：0.5~5万元");
			return false;
		}
    }else if(id=="famount8"&&$("#"+id).val()!="0"){
		if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>5){
			showValidateResultSide(id,"保额区间为：0.5~5万元");
			return false;
		}
    }else if(id=="famount9"&&$("#"+id).val()!="0"){
		if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>80){
			showValidateResultSide(id,"保额区间为：0.5~80万元");
			return false;
		}
    }else if(id=="famount10"&&$("#"+id).val()!="0"){
		if($("#"+id).val()==""||$("#"+id).val()<0.5||$("#"+id).val()>20){
			showValidateResultSide(id,"保额区间为：0.5~20万元");
			return false;
		}
    }
    var amountZhu=0;
    for(i=1;i<=3;i++){
		amountZhu += parseFloat($("#famount"+i).val()); 
	}
	//总保额校验和附加险保额校验
    for(i=4;i<=10;i++){
    	if(i==5){
    		if($("#famount5").val()>amountZhu/10){
			showValidateResultSide("famount5","保额不能超过主险总保额10%");
			markMainClause();
			return false;
			}
    	}
    	if($("#famount"+i).val()>amountZhu&&i!=9){
    		showValidateResultSide("famount"+i,"保额不能超过主险总保额");
			markMainClause();
			return false;
    	}
    	
    	if(i==9){
	  		var fangwuAmount=parseFloat($("#famount1").val());
			var fangwuTipstr="房屋扩展地震的保额不能超过主险房屋的保额";
			if($('#areacode').val()=="21020000"){
				fangwuAmount=fangwuAmount*0.8;
				fangwuTipstr+="80%";
			}else if($('#areacode').val().substr(0,2)=="15"){
				fangwuAmount=fangwuAmount*0.6;
				fangwuTipstr+="60%";
			}
			if(parseFloat($("#famount9").val())>fangwuAmount){
				$("#famount1").parent().addClass("card_65");
				showValidateResultSide("famount9",fangwuTipstr);
				$("#fmask1").hide();
				return false;
			}
    	}
    	if(i==10){
    		var caichanAmount=parseFloat($("#famount2").val())+parseFloat($("#famount3").val());
			var caichanTipstr="室内财产扩展地震的保额不能超过主险室内财产的保额";
			if($('#areacode').val()=="21020000"){
				caichanAmount=caichanAmount*0.8;
				caichanTipstr+="80%";
			}else if($('#areacode').val().substr(0,2)=="15"){
				caichanAmount=caichanAmount*0.5;
				caichanTipstr+="50%";
			}
			if(parseFloat($("#famount10").val())>caichanAmount){
				$("#famount2").parent().addClass("card_65");
				$("#famount3").parent().addClass("card_65");
				showValidateResultSide("famount10",caichanTipstr);
				$("#fmask2").hide();
				$("#fmask3").hide();
				return false;
			}
    	}
    }
    //投保“附加现金、金银珠宝盗抢保险”的前提是必须投保”附加盗抢险”且其保额超过1万元。
    if(($("#famount4").val()=="0"||$("#famount4").val()<1)&&$("#famount5").val()!=0){
		$("#famount4").parent().addClass('card_65');
		showValidateResultSide('famount5',"请先投保'盗抢造成室内财产损失'并且保额超过1万元");
		$("#fmask4").hide();
		return false;
    }
    calculateFee();
    return true; 
}

function markMainClause(){
	for(j=1;j<4;j++){
		$("#famount"+j).parent().addClass("card_65");
		$("#fmask"+j).hide();
	}
}

//自由方案输入框出当前出错框外，禁止其它框输入
function disableInput(id){
	for(var i=1;i<=10;i++){
		if("famount"+i!=id){
			$("#fmask"+i).show();
		}
	}
}

function enableInput(){
	$(".editmask").hide();
}

function checkAllAmount(){
	for(var i=1;i<=10;i++){
		if(!checkAmount('famount'+i)){
			return false;
		}
	}
	return true;
}

function hideEqAreaAlert(){
	$('#eqAeraAlert').hide();
}

//身份证校验
function checkIdentifyNumberJABA(id){
	InsuredidentityNumChangeForSingle();
	var replace_idno=($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '');
	if($("#" + id).val() != replace_idno){
		$("#" + id).val(replace_idno);
	}
	if($("#" + id).val() == ""){
	}
	if (pcbytes($("#" + id).val()) > 18) {
		showValidateResultBtm(id, "请输入正确的证件号码");
		return false;
	}
	if (($("#" + id).val()).match(reg7)) {
		if($("#insuredIdentifytype").val() == "01"){
			showValidateResultBtm(id, "请输入正确的身份证号码");
		}else{
			showValidateResultBtm(id, "请输入正确的证件号");
		}
		return false;
	}
	if($("#input_identifytype").val() == "16" && $('#'+id).val() != "" && $('#'+id).val() !="请输入证件号码"){
		if(!($('#'+id).val()).match(wgrReg)){
			showValidateResultBtm(id, "请输入正确的证件号码");
			return false;
		}
	}
	if (($("#input_identifytype").val() == "01"||$("#input_identifytype").val() == "02" || $("#input_identifytype").val() == "17") && $('#'+id).val() != "" && $('#'+id).val() !="请输入证件号码") {
		var msg = isCardID($("#"+id).val());
		if (msg != "true") {
			showValidateResultBtm(id, msg);
			return false;
		}
	}
	showValidateResultBtm(id, "");
	return true;
}

function checkJABAHouseAddress(id) {
	var patternString = "^[a-zA-Z0-9\u4e00-\u9fa5.#\\-()、（）]*$";
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if("请精确到门牌号，请勿重复录入省市，省市内容如需修改，请返回上级页面修改房屋所在城市。" == $("#" + id).val()){
		return true;
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultTextarea(id, "街道地址信息过长");
		return false;
	}
	var houseaddress=$("#" + id).val();
	if (!houseaddress.match(patternString)) {
		showValidateResultTextarea(id, "请输入正确的街道地址");
		return false;
	}
	showValidateResultTextarea(id,"");
	return true;
}


function checkApplyJABA(){
	if ($.trim($("#input_applyName").val()) == ""||$.trim($("#input_applyName").val())=="请输入投保人姓名"){
		rollToPos("input_applyName");
		showValidateResultNew("input_applyName", "投保人姓名不能为空");
		return false;
	}
	if ($.trim($("#input_applyCountryName").val()) == ""||$.trim($("#input_applyCountryCode").val()) == ""){
		rollToPos("input_applyCountryName");
		showValidateResultNew("input_applyCountryName", "投保人国家和地区不能为空");
		return false;
	}
	if ($.trim($("#input_applyIdentifyNumber").val()) == ""||$.trim($("#input_applyIdentifyNumber").val()) == "请输入证件号码"){
		rollToPos("input_applyIdentifyNumber");
		showValidateResultNew("input_applyIdentifyNumber", "证件号码不能为空");
		return false;
	}
	
	if ($.trim($("#input_applyMobile").val()) == ""){
		rollToPos("input_applyMobile");
		showValidateResultNew("input_applyMobile", "手机号码不能为空");
		return false;
	}
	if ($.trim($("#input_applyEmail").val()) == ""){
		rollToPos("input_applyEmail");
		showValidateResultNew("input_applyEmail", "邮箱地址不能为空");
		return false;
	}
	if($("#eflag").val()=="010"||$("#eflag").val()=="100"||$("#eflag").val()=="110"||$("#eflag").val()=="120"||$("#isgrantvisa").val()=="1"){
		if ($.trim($("#input_sendName").val()) == ""){
			rollToPos("input_sendName");
			showValidateResultNew("input_sendName", "收件人姓名不能为空");
			return false;
		}
		
		if ($.trim($("#mailcityname").val()) == ""||$.trim($("#mailareacode").val()) == ""){
			rollToPos("mailcityname");
			showValidateResultNew("mailcityname", "邮件寄送省市不能为空");
			return false;
		}
		
		
		if ($.trim($("#input_sendJAddress").val()) == ""||$.trim($("#input_sendJAddress").val()) == "请精确到门牌号"){
			rollToPos("input_sendJAddress");
			showValidateResultTextarea("input_sendJAddress", "详细地址不能为空");
			return false;
		}
		
		if ($.trim($("#input_sendPost").val()) == ""){
			rollToPos("input_sendPost");
			showValidateResultNew("input_sendPost", "邮政编码不能为空");
			return false;
		}
		if ($.trim($("#input_sendMobile").val()) == ""){
			rollToPos("input_sendMobile");
			showValidateResultNew("input_sendMobile", "手机号码不能为空");
			return false;
		}
		if($("#eflag").val()!="100"){
			if ($.trim($("#input_invoiceTile").val()) == ""){
//				$("#input_invoiceTile").focus();			
				rollToPos("input_invoiceTile");
				showValidateResultNew("input_invoiceTile", "发票抬头不能为空");
				return false;
			}
		}
		
		if(!checkSendAddress("input_sendJAddress")){
			rollToPos("input_sendJAddress");
			return false;
		}	
		if(!checkPostCode("input_sendPost")){// 邮政编码
			rollToPos("input_sendPost");
			return false;
		}
		if($("#oldproposalno").val()!=""){
			if(!checkApplyMobile("input_sendMobile")){// 手机号码
				rollToPos("input_sendMobile");
				return false;
			}
		}else{
			if(!checkApplyMobile("input_sendMobile")){// 手机号码
				rollToPos("input_sendMobile");
				return false;
			}
		}
		if(!checkSendName("input_sendName")){
			rollToPos("input_sendName");
			return false;
		}	
		//注释掉发票抬头验证
//		if($("#eflag").val()!="100"){
//			if(!checkInvoiceTile("input_invoiceTile")){
//				rollToPos("input_invoiceTile");
//				return false;
//			}	
//		}
	//同时为电子保单和电子发票只验证发票抬头
	}else if($("#eflag").val()=="020"){
		if ($.trim($("#input_invoiceTile").val()) == ""){
			rollToPos("input_invoiceTile");
			showValidateResultNew("input_invoiceTile", "发票抬头不能为空");
			return false;
		}
		//注释掉发票抬头验证
//		if(!checkInvoiceTile("input_invoiceTile")){
//			rollToPos("input_invoiceTile");
//			return false;
//		}	
	}
	if(!checkApplyName("input_applyName")){
		rollToPos("input_applyName");
		return false;
	}
	
	if(!checkApplyIdentifyNumberSex()){
		rollToPos("input_applyName");
		return false;
	}
	
	if(!checkApplyNumber("input_applyIdentifyNumber")){
		rollToPos("input_applyIdentifyNumber");
		return false;
	}
	if($("#oldproposalno").val()!=""){
		if(!checkApplyMobile("input_applyMobile")){
			rollToPos("input_applyMobile");
			return false;
		}
	}else{
		if(!checkApplyMobile("input_applyMobile")){
			rollToPos("input_applyMobile");
			return false;
		}
	}
	if(!checkApplyEmail("input_applyEmail")){
		rollToPos("input_applyEmail");
		return false;
	}
	if($("input:radio[name=fp][checked]").val()=="1"||$("input:radio[name=fp][checked]").val()=="3"){
		if(!checkSendAddress("input_sendJAddress")){
			rollToPos("input_sendJAddress");
			return false;
		}	
		
		if(!checkSendName("input_sendName")){
			rollToPos("input_sendName");
			return false;
		}	
		//注释掉发票抬头验证
//		if(!checkInvoiceTile("input_invoiceTile")){
//			rollToPos("input_invoiceTile");
//			return false;
//		}	
		
	}
	return true;
}

//流程改版后的页面暂存数据提交 EA
function jasaveZproposal() {
	var dataStr = '';
	cleanInlineTips("input_insuredName");
	cleanInlineTips("input_identifyNumber");
	cleanInlineTips("houseaddress");
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
						$("#zancunYuan").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");
						$("#zancunYuannew").html(window.parseFloat(beforLoginPremium).toFixed(2) + "元");
						showKeep2MSG(m53);
						$("#showKeepFlag").val(1);
						$("#zancunFlag").val("1");
				}else{
					addLoginImg();//暂存对勾
					showKeepMSG();
					//因为在后台数据已经向前台传递，所以直接添加
					$("#insuredid").val(data.insuredid);
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
		showInlineTips("input_insuredName");
		showInlineTips("input_identifyNumber");
		showInlineTips("houseaddress");
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

function setTplus7day(){
	checkStartDate();
	var minStartdate=new Date($("#MINSTARTDATE").val());
	var startdate=new Date($("#startdate").val());
	var plus7day=minStartdate.addDays(6);
	if(startdate<=plus7day){
		$("#startdate").val(convertFullDateToString(plus7day));
		setEndDateforEDD();
		setTdDate();
	}
}
//点击选择优惠券方法
function setValue(idx) {
	if(null != $("#groupBuyId").val() && $("#groupBuyId").val() != "" && $("#groupBuyId").val() != undefined){
		showTipsWindown("抱歉，团购单不能使用优惠券。");
		return false;
	}
//	var minmium = $("#unitpremium").val();//单份保费
	var hidtype = $("#hiddenTypeid"+idx).val();//优惠券类型
    var couponid = $("#hiddenCouponid"+idx).val();//优惠券id
//    var hiddendiscount = $("#hiddendiscount"+idx).val();//优惠额度
//    var fullSubmium = $("#fullSubId"+idx).html();//满减的  满多少 金额   满1000减10元 的  1000
//    if("t1" == hidtype && (parseFloat(minmium) < 50 || parseFloat(minmium) < parseFloat(hiddendiscount) || parseFloat(minmium) < parseFloat(fullSubmium))){
//    	showTipsWindown("非常抱歉，系统出现异常，请重新选择。");
//    	return false;
//    }
    $("#doUseCoupon").val(couponid);
    $("#couponsType").val(hidtype);
    selectCoupon(idx);
    couponsCalculateFee();
}
//优惠券算费方法
function couponsCalculateFee(){
	var url = "/eproperty/japroposal/couponsCalculate.do";
	$.ajax({
		url : url,
		type : "post",
		data : $("#form").serialize(),
		async : false,
//		dataType : "json",
		success : function(data) {
			var sumpremium = parseFloat(data.premium);
			if(isNaN(sumpremium)){sumpremium=0;}
			$("#sumpremium").val(sumpremium); 
			$("#sumpremium_up").html(sumpremium.toFixed(2));
			$("#premium_btm").html(sumpremium.toFixed(2)+"元");
		}
	});
}