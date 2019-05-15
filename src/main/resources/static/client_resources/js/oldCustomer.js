var reg4="[`~!@#%$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*&;—|{}【】‘’；：”“'\"。，、？《》+\\\\]";


function goQuick(){
	var falseFlag = "";
	var insuredName = "";
	var identifyNumber = "";
	var rand ="";
	var randName ="";
	var productorCode ="";
	falseFlag 	= $("#falseFlag").val();
	insuredName 	= $("#insuredName_old").val();
	identifyNumber	= $("#identifyNumber_old").val();
	rand 			= $("#rand_old").val();
	randName		= $("#randName_old").val();
	productorCode   = $("#productcode").val();
	if(falseFlag=="1")
	{
		return false;
	}
	if(undefined == productorCode){
		productorCode ="";
	}
	if(""== insuredName){
		$("#NameErrorTR").show();
		$("#NameErrorSpan").html("请输入被保险人姓名");
		$("#insuredName_old").addClass("erText");
		return false;
	}else if(!checkInsuredName("insuredName_old")){
		return false;
	}
	if("" == identifyNumber){
		$("#NumberErrorTR").show();
		$("#NumberErrorSpan").html("请输入被保险人证件号码");
		$("#identifyNumber_old").addClass("erText");
		return false;
	}else if(!checkIdNumber("identifyNumber_old")){
		return false;
	}
	
if("" ==  rand){
		$("#RandErrorTR").show();
		$("#RandErrorSpan").html("请输入验证码");
		$("#rand_old").addClass("erText");
		return false;
	}
	$.ajax({
		type:'post',
//		contentType:'application/x-www-form-urlencoded;charset=utf-8',
		data:'insuredName='+insuredName+'&idNumber='+identifyNumber+'&productCode='+productorCode+'&rand='+rand+'&randName='+randName+'&next='+Math.random(),
		url:'/eproperty/oldCustomerInsure/getProposalnoByInsuredAndProductCode.do',
//		dataType:'json',
		async:false,
		success:function(data){
			var rand = data.rand;
			var result = data.result;
			if("randWrong" == rand){
				$("#RandErrorTR").show();
				$("#RandErrorSpan").html("验证码错误，请重新输入");
				$("#rand_old").addClass("erText");
				chengeRand('randImage_old');
				return false;
			}
			else
			{
				/*0--查询失败--尊敬的用户，非常抱歉未能查询到该保单。<br/>请您核对所填信息是否与保单所列信息一致或尝试输入其他查询条件。
				1--查询成功--productCode,proposalNo
				2--待续保保单止期大于等于最大可起保日期--您的保单暂时不能续保，如有疑问请拨打4001234567-2！
				3--地区不支持客货车网上投保--对不起，您所选的地区暂时不支持客车/货车【具体值跟单确定】网上投保。<br/>如有疑问请咨询4001234567-2。
				4--地区不支持网上投保--对不起，您的投保地区暂时不支持网上投保！*/
				if("1"==result)
				{
					closeDialogMove('.P_first');
					$("#productCode_oldCoutomer").val(data.productCode);
					$("#proposalNo_oldCustomer").val(data.proposalNo);
					$("#identifyNumber_oldCustomer").val(data.identifyNumber);
					$("#oldCustomerForm").attr("action","/eproperty/oldCustomerInsure/gotoContinueInsure.do");				
					$("#oldCustomerForm").submit();
					$("#productCode_oldCoutomer").val("");
					$("#proposalNo_oldCustomer").val("");
					$("#identifyNumber_oldCustomer").val("");
				}
				else 
				{
					$('#falseFlag').val("1");
					$("#chaXunFalse").html('<td colspan="2"></td>');
					if("0"==result)
					{
						$("#chaXunFalse").html('<td colspan="2" style="*padding-top:5px;"><p> <i class="i_wrong"></i>尊敬的用户，非常抱歉未能查询到该保单。<br/>请您核对所填信息是否与保单所列信息一致或尝试输入其他查询条件。</p></td>');
					}
					else if("2"==result)
					{
						$("#chaXunFalse").html('<td colspan="2"><p> <i class="i_wrong"></i>您的保单暂时不能续保，如有疑问请拨打4001234567-2。</p></td>');
					}
					else if("3"==result)
					{
						$("#chaXunFalse").html('<td colspan="2"><p> <i class="i_wrong"></i>对不起，您所选的地区暂时不支持'+data.YEJ_flag+'网上投保。<br/>如有疑问请咨询4001234567-2。</p></td>');
					}
					else if("4"==result)
					{
						$("#chaXunFalse").html('<td colspan="2"><p> <i class="i_wrong"></i>对不起，您的投保地区暂时不支持网上投保！</p></td>');
					}else if("5"==result)
					{
						$("#chaXunFalse").html('<td colspan="2"><p> <i class="i_wrong"></i>对不起，您所投保地区的产品已售罄。</p></td>');
					}
					$("#chaXunFalse").show();
					chengeRand('randImage_old');
					return false;
				}
			}
		},
		err:function(){
		}
	});
}

function chengeRand(id){
	var randName = parseInt(Math.random()*10000);
	$("#randName_old").val(randName);
	$("#"+id).attr("src","/eproperty/CreateImage?randName="+$("#randName_old").val());
}

function toInsure(){
	var riskVal = $('input[name="risk"]:checked').val().split(";");
	var procuctCode = riskVal[0];
	var proposalNo = riskVal[1];
//	alert(proposalNo);
//	alert(procuctCode);
	$("#productCode_oldCoutomer").val(procuctCode);
	$("#proposalNo_oldCustomer").val(proposalNo);
	
	if(procuctCode =="EJQ_Z" || procuctCode == "EJQ_H" || procuctCode == "EFF" || procuctCode == "EFG"){
		$("#oldCustomerForm").attr("action","/eproperty/oldCustomerInsure/gotoContinueInsure.do");
	}else{
		$("#oldCustomerForm").attr("action","/eproperty/"+procuctCode+".do");
	}
	
	$("#oldCustomerForm").submit();
	$("#productCode_oldCoutomer").val("");
	$("#proposalNo_oldCustomer").val("");
	return false ;
}


/**
 * @author xiBei
 * @param procuctCode 产品代码
 * @returns    产品名称
 * */
function getRiskCName(procuctCode){
	var S = "";
	if("EAJ" == procuctCode){
		S ="全球旅游保险";
	}else if("EAJ_S" == procuctCode){
		S="欧洲旅游保险";
	}else if("EAK_X" == procuctCode ){
		S ="国内自驾游保险";
	}else if("EAK_U" == procuctCode ){
		S ="国内旅游保险";
	}else if("EAK_G" == procuctCode ){
		S ="国内高原游保险";
	}else if("JBS" == procuctCode ){
		S ="航空延误损失综合保险";
	}else if("EAG_T" == procuctCode ){
		S ="国内商务出行保险";
	}else if("EAG_V" == procuctCode ){
		S ="境外商务出行保险";
	}else if("EJQ_H" == procuctCode ){
		S ="航空意外年度险";
	}else if("EJQ_Z" == procuctCode ){
		S ="交通工具意外险";
	}else if("EFF" == procuctCode || "EFG" == procuctCode){
		S ="人身意外险";
	}else if("LDT_E" == procuctCode ){
		S ="美满e家组合保险";
	}else if("LCB" == procuctCode ){
		S ="e-人居两旺险";
	}else if("ZKK_R" == procuctCode ){
		S ="监护人责任险";
	}else if("ZKK_W" == procuctCode ){
		S ="宠物责任险";
	}else if("YEJ" == procuctCode ){
		S ="国内公路随车行李保险";
	}else if("YEH" == procuctCode ){
		S ="国内航空旅客行李保险";
	}else if("ZKF" == procuctCode ){
		S ="监护人责任保险";
	}else if("ZAF" == procuctCode ){
		S ="宠物责任保险";
	}
	return S;
}

//弹层拖拽
function dialogMove(obj,dom){
	var productcode= $("#productcode").val();
	var randName = parseInt(Math.random()*10000);
	var result = "success";
	//支持登陆的产品要强制登陆
	//jumpingid :0、默认值    1、进入正常投保流程     2、进入老客户续保流程
	$("#jumpingid").val("2");
	if(!checkPageIsLogin()){
		return ;
	}
	//*****start 验证澳新游是否登录，如果未登录需要登录后才能进入老客户续保流程  2016/7/14 需求陈昊 修改者岳聚霞
	/*if(productcode.indexOf("LAY_A")>-1){
//		jumpingid :0、默认值    1、进入正常投保流程     2、进入老客户续保流程
			$("#jumpingid").val("2");	
		$.ajax({
			type:'post',
			url:'/eproperty/member/confirmLogin.do',
			async:false,
			success:function(data){
					result = data.result;
			}
		});//end ajax
		if("notLogin"==result){
			changeLogin();
			return ;
			
		}
	}//end if lay_a
*/	
	//*****end 验证澳新游是否登录，如果未登录需要登录后才能进入老客户续保流程  2016/7/14
	
	$("#randName_old").val(randName);
	$("#randImage_old").attr("src","/eproperty/CreateImage?randName="+$("#randName_old").val());
	$('body').append('<div class="mask" id="xbmask"></div>');
	var domL = ($(window).width() - $(dom).width())/2;
	var domT = $(window).scrollTop() + ($(window).height()/2-$(dom).height()/2);
	$(dom).css({'left':domL,'top':domT}).fadeIn();
	$('.mask').height($(document).height()).animate({opacity:0.5});
	
	if('undefined' == typeof(document.body.style.maxHeight)){ //IE6加iframe遮罩select
		$("body").append('<iframe frameborder="0" class="ie6_iframe"></iframe>');
		$('.ie6_iframe').height($(document).height());
	}
	//窗体move
	$(obj).mousedown(function(event){
		var isMove = true;
		var abs_x = event.pageX - $(dom).offset().left;
		var abs_y = event.pageY - $(dom).offset().top;
		$(document).mousemove(function(event) {
			if (isMove) {
				var oD = $(obj).parents(dom);
				oD.css({
					'left': event.pageX - abs_x,
					'top': event.pageY - abs_y
				});
			}
		}).mouseup(function() {
			isMove = false;
		});
	});
	if("EJQ_Z"==productcode)
	{
		$("#info").html('<td colspan="2" class="center2">为您带入往期订单信息，快速完成投保，另享更多优惠！</td>');
	}
	else if("ZKK_W"==productcode||"ZKK_R"==productcode||"JBS"==productcode)
	{
		$("#info").html('<td colspan="2" class="center2">为您带入往期订单信息，快速完成投保！</td>');
	}
	else if("EJQ_H"==productcode)
	{
		$("#info").html('<td colspan="2" class="center2">为您带入往期订单信息，快速完成投保，另享更多优惠!</td>');
	}
	else if("EAK_X"==productcode)
	{
		$("#info").html('<td colspan="2"><p style=" margin-left: 139px; color:#474747; margin-top: 0px;">为您带入往期订单信息，快速完成投保！</p></td>');
	}
	else
	{
		$("#info").html('<td colspan="2" style="text-align:center"><p style="color:#474747;*padding-top:5px;">为您带入往期订单信息，快速完成投保！</p></td>');
	}
}

//弹层关闭
function closeDialogMove(dom){
	$("#insuredName_old").removeClass("erText");
	$("#identifyNumber_old").removeClass("erText");
	$("#NameErrorTR").hide();
	$("#NumberErrorTR").hide();
	$("#RandErrorTR").hide();
	$("#chaXunFalse").hide();
	$("#insuredName_old").val("");
	$("#identifyNumber_old").val("");
	$("#rand_old").val("");
	$(dom).fadeOut();
	$('#xbmask').animate({opacity:0},function(){
		$('#xbmask').remove();	
	});
	if('undefined' == typeof(document.body.style.maxHeight)){
		$('.ie6_iframe').remove();
	}	
}


function checkInsuredName(id){
	$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#"+id).val()) == ""){		
	}
	if(pcbytes($("#"+id).val())>30){
		$("#NameErrorTR").show();
		$("#NameErrorSpan").html("被保险人姓名过长");
		$("#"+id).addClass("erText");
		return false;
	}
	if(($("#"+id).val()).match(reg4)||($("#"+id).val()).toString().indexOf("-")>-1) {
		$("#NameErrorTR").show();
		$("#NameErrorSpan").html("请输入正确的被保险人姓名");
		$("#"+id).addClass("erText");
		return false;				
	}
	$("#NameErrorTR").hide();
	$("#"+id).removeClass("erText");
	return true;
}

function checkIdNumber(id){
	var reg = /^([0-9]|[A-Za-z]|[\u4E00-\u9FA5]|[(]|[)]|[（]|[）]|[-]|[·]|[_])*$/;
	if(!$("#"+id).val().match(reg)){
		$("#NumberErrorTR").show();
		$("#NumberErrorSpan").html("请输入正确的证件号码");
		$("#"+id).addClass("erText");
		return false;
	}
	$("#"+id).removeClass("erText");
	$("#NumberErrorTR").hide();
	return true;
}

function pcbytes(str){
	if(typeof(str)!='string'){
		str = str.value;
	}
	var len = 0;
	for(var i = 0; i < str.length; i++){
		if(str.charCodeAt(i) > 127){
			len++;
		}
		len++;
	}
	return len;
}

function randBlur(id){
	$("#"+id).removeClass("erText");
	$("#RandErrorTR").hide();
}

function changeFalseFlag()
{
	$("#chaXunFalse").hide();
	$("#falseFlag").val("0");
}

function closeError(id)
{
	if(id=="insuredName_old")
	{
		$("#NameErrorTR").hide();
	}
	else if(id=="identifyNumber_old")
	{
		$("#NumberErrorTR").hide();
	}
	else if(id=="rand_old")
	{
		$("#RandErrorTR").hide();
	}
}