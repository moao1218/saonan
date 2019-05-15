/**
 * 
 */
function popPosition(dom){
				//关闭“日期控件”：
				$("#_my97DP").hide();
				var width = $(dom).width();
				var height = $(dom).height();
				var _scrollHeight = $(document).scrollTop();
				var	_windowHeight = $(window).height();
				var	_windowWidth = $(window).width();
				var	_popupHeight = $(dom).height();
				var docH = $(document).height();
				var docw = $(document).width();
				var	_popupWeight =$(dom).width();
				var	_posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight;
                var	_posiLeft = (_windowWidth - _popupWeight)/2;
                //alert(_posiLeft)
				$("body").append("<div class=mask></div>");
				// 判断 如果 是IE6  加 ifname
				if($.browser.msie && $.browser.version=="6.0"){
					  $("body").append('<iframe frameborder="0" src="" scrolling=no  style="  filter:alpha(opacity=20); position:absolute;left:0px;top:0px;width:100%;z-index:1;background:#fff;" class=tt></iframe>');
					   $(".tt").height(docH + "px");
				   //$("body").find("select").hide();
				   if(dom=='#paySuccessShow'){
					   $(dom).css({"left":_posiLeft+(width/2),"top":_posiTop,"position":"absolute"}).show();
				   }else
				    $(dom).css({"left":_posiLeft+(width/2),"top":_posiTop,"position":"absolute","margin-left":-(width/2)}).show();	
				  }  
				else {
					if(dom.indexOf("popDivNew")==-1 && dom.indexOf("popConfirm")==-1){//新的弹层样式不需要再加偏移数据，目前只有EDD、LAY产品适用
						$(dom).css({"margin-left":-_popupWeight/2,"margin-top":-_popupHeight/2}).show();	
					}else{
						$(dom).show();
					}
					
				}
				$(dom).focus();
				//遮罩层高度
				$(".mask").height(docH + "px") ;
				$(".mask").css({"opacity":"0.5","z-index":"1009"}) ;
				
};

var oldAreacode;
var $scrollTop = 0, topArr = [], bottomArr = [];
function newpopPosition(dom){
	//关闭“日期控件”：
	$("#_my97DP").hide();
	$("body").append("<div class=mask></div>");
	var clausetitle = $("#clausetitleid li").length;
	//ajax查询退保说明、免责说明、保险条款  开始
	var productcode = $("#productcode").val();
	var areacode = $("#areacode").val();
	//clausetitle保险条款目录是空的  说明第一次点开弹框
	if(clausetitle == 0){
		var url = "/eproduct/detailsexplain/getDetailsExplains.do";
		$.ajax({
			url : url,
			type : "post",
			//xhrFields:{withCredentials:true},
			data:{"productcode":productcode,"areacode":areacode},
			async : false,
			/*beforeSend: function(xhr) {
	                xhrFields:{withCredentials:true};
	               },*/
			success : function(data) {
				oldAreacode = areacode;
				$("#disclaimerid").html(data.disclaimerexplain);
				$("#retreatsid").html(data.retreatsexplain);
				$("#clausetitleid").html(data.clausetitle);
				$("#clauseexplainid").html(data.clauseexplain);
				$("#tbsmid").html(data.insurancepolicy);
				$(".tbsm-bottom input").click(function () {
				    if($(this).hasClass('active')){
				    	if ($("#checkbox_id").attr("class")!="inputSpan active") {
				    		$("#checkbox_id").toggleClass('active');
				    	}
				    	
				        $(".tbsm-pop").css({"left":"-100%"});
				        $(".mask").hide();
				        $("#conBox").stop().animate({
					        scrollTop: $("#f0-a").position().top + $scrollTop
					    }, 400);
				    }
				});
				$(".tbsm-close").click(function(){
					 $(".tbsm-pop").css({"left":"-100%"});
				     $(".mask").hide();
				     $("#conBox").stop().animate({
					        scrollTop: $("#f0-a").position().top + $scrollTop
					    }, 400);
				})
				$(".tbsm-nav-sub li").click(function () {
				    navCli('b', this)
				});
				$(".tbsm-nav li").click(function () {
				    navCli('a', this)
				});
				$(".tbsm-close-btn").click(function(){
				    $(".tbsm-tips").hide();
				});
				$("#conBox").scroll(function () {
				    $scrollTop = $("#conBox").scrollTop();
				    throttle({
				        fn: scrollFloating(),
				        delay: 50,
				        mustRunDelay: 50
				    });
				});
				setTimeout(function(){
					topArr = [];bottomArr = [];
					 var $navItem = $(".tbsm-nav").children();
			            var $subItem = $(".tbsm-nav-sub").children();
			            for (var i = 1; i < $navItem.length; i++) {
			                topArr.push($("#f" + i+'-a').position().top)
			            }
			            for (var j = 0; j < $subItem.length; j++) {
			                bottomArr.push($("#f" + j+'-b').position().top);
			            }
				},20)
			}
		});
	}
	//如果areacode变了   就只查询一个退保说明
	if(areacode != oldAreacode){
		var url = "/eproduct/detailsexplain/getDetailsExplains.do";
		$.ajax({
			url : url,
			type : "post",
			//xhrFields:{withCredentials:true},
			data:{"productcode":productcode,"areacode":areacode},
			async : false,
			/*beforeSend: function(xhr) {
	                xhrFields:{withCredentials:true};
	               },*/
			success : function(data) {
				oldAreacode = areacode;
				$("#tbsmid").html(data.insurancepolicy);
				$("#retreatsid").html(data.retreatsexplain);
				$(".tbsm-bottom input").click(function () {
				    if($(this).hasClass('active')){
				    	if ($("#checkbox_id").attr("class")!="inputSpan active") {
				    		$("#checkbox_id").toggleClass('active');
				    	}
				        $(".tbsm-pop").css({"left":"-100%"});
				        $(".mask").hide();
				        $("#conBox").stop().animate({
					        scrollTop: $("#f0-a").position().top + $scrollTop
					    }, 400);
				    }
				});
				$(".tbsm-close").click(function(){
					 $(".tbsm-pop").css({"left":"-100%"});
				     $(".mask").hide();
				     $("#conBox").stop().animate({
					        scrollTop: $("#f0-a").position().top + $scrollTop
					    }, 400);
				})
				$(".tbsm-nav-sub li").click(function () {
				    navCli('b', this)
				});
				$(".tbsm-nav li").click(function () {
				    navCli('a', this)
				});
				$(".tbsm-close-btn").click(function(){
				    $(".tbsm-tips").hide();
				});
				$("#conBox").scroll(function () {
				    $scrollTop = $("#conBox").scrollTop();
				    throttle({
				        fn: scrollFloating(),
				        delay: 50,
				        mustRunDelay: 50
				    });
				});
				setTimeout(function(){
					topArr = [];bottomArr = [];
					 var $navItem = $(".tbsm-nav").children();
			            var $subItem = $(".tbsm-nav-sub").children();
			            for (var i = 1; i < $navItem.length; i++) {
			                topArr.push($("#f" + i+'-a').position().top)
			            }
			            for (var j = 0; j < $subItem.length; j++) {
			                bottomArr.push($("#f" + j+'-b').position().top);
			            }
				},20)
			}
		});
	}
	closeDeclarationMsg();
	$(".tbsm-pop").css({"top":$(document).height()/2+150})
	$(dom).css({"left":"50%"});
	$(dom).focus();
	
	/*$(".tbsm-pop").css({"top":$(window).scrollTop()})
	$(dom).css({"left":"50%"});
	$(dom).focus();*/
};

//关闭层
function closedialog(dom){
   	// 判断 如果 是IE6  加 ifname
	if($.browser.msie && $.browser.version=="6.0"){ 
		 parent.closeWindow();
		 $("body").find("select").show();
	} 
    $(dom).hide();
	$(".mask").remove();
}


function closeBox(){
	var hostport=document.location.host;
	if(($("#interimNoflag").val()=="1" && $("#entryId").val()=="") ||
			($("#entryId").val()!=$("#zentryId").val()&&$("#zentryId").val()!=""&&$("#entryId").val()!="")){
		var urlPath = "/eproperty/member/getProductIndexUrl.do";
		var dataString = "productcode="+$("#productcode").val();
		$.ajax({
			url : urlPath,
			type : "post",
			data : dataString,
			datatype : 'json',
			async :  false,
			success : function(rateData, textStatus) {
				location.href = "http://"+hostport+rateData.result;
			},
			error : function(data, textStatus) {
				location.href = "http://"+hostport;
			}
		});
	}
}

//显示终保时间
function showEndDate(date,flag){
	var riskCode = $("#riskcode").val();
	var startDate=date.toString();
	var d=$("#"+startDate).val();
	var start = new Date(d.toString().substring(0,4)+"/"+d.toString().substring(5,7)+"/"+d.toString().substring(8,10));
	if(flag=="EFF0003"||flag=="EFG0004" || flag == "EFF0000001" || flag == "EFG0000001"){
		//半年
		start.setMonth(start.getMonth() + 6);
		$("#totalMonth").html("6");
	}else if("EAA330000d"==flag){
		start.setDate(start.getDate()+7);
		$("#totalMonth").html("<i> 7</i>天");
	}else if("EAA330000e"==flag){
		//一年
		start.setFullYear(start.getFullYear() + 1);
		$("#totalMonth").html("<i>1</i>年");
	}else if(flag=="LCB"){
		//保险期间通过页面选择
		if($('input:radio[name=inputPeriod][checked]').val()=="1"){
			//一年
			start.setFullYear(start.getFullYear() + 1);
		}else if($('input:radio[name=inputPeriod][checked]').val()=="2"){
			//二年
			start.setFullYear(start.getFullYear() + 2);
		}else{
			//三年
			start.setFullYear(start.getFullYear() + 3);
		}
		$("#periodno").val($('input:radio[name=inputPeriod][checked]').val());
//		alert($("#periodno").val());
	}else if(flag =="JBS"){
		if($('input:radio[name=inputPeriod][checked]').val()=="12"){
			//一年
			start.setFullYear(start.getFullYear() + 1);
		}else if($('input:radio[name=inputPeriod][checked]').val()=="1"){
			start.setMonth(start.getMonth() + 1);
		}
	}else if(flag=="ZFX4400001"){
		start.setDate(start.getDate()+1);
	}else if("YXL" == flag){
		var dayStr = $("#input_period").val();
		var dayUnit = dayStr.substr(dayStr.length-1,dayStr.length);
		var dayValue = dayStr.substr(0,dayStr.length-1);
		if("Y"==dayUnit){
			start.setFullYear(start.getFullYear() + 1);
			$("#totalMonthStr").html("24时止&nbsp;&nbsp;&nbsp;共<i> 1 </i>年");
		}else{
			start.setDate(start.getDate() + parseInt(dayValue));
			$("#totalMonthStr").html("24时止&nbsp;&nbsp;&nbsp;共<i> "+dayValue+" </i>天");
		}
	}else if("YEHKM" == flag){
		if("YEM"==riskCode){
			var dayValue = $("#input_insuranceperiod").val();
//			var dayUnit = dayStr.substr(dayStr.length-1,dayStr.length);
//			var dayValue = dayStr.substr(0,dayStr.length-1);
			start.setDate(start.getDate() + parseInt(dayValue));
		}else{
			start.setMonth(start.getMonth() + 2);
		}
	}else if("JTE330000c"==flag){
		start.setDate(start.getDate()+7);
		$("#totalMonth").html("<i> 7</i>天");
		$("#totalMonth_up").html("7天");
	}else if("JTE330000b"==flag){
		//一年
		start.setFullYear(start.getFullYear() + 1);
		$("#totalMonth").html("<i>1</i>年");
		$("#totalMonth_up").html("1年");
	}else if("EAL_L" == flag){
		var monthValue = $("#insuranceperiod").val();
		start.setMonth(start.getMonth() + parseInt(monthValue));
		$("#totalMonthStr").html(monthValue);
	}else if("ECR3300002"==flag){
		start.setDate(start.getDate()+3);
	}else if("EAJ_G" == flag){
		var dayValue = $("#insuranceperiod").val();
		start.setDate(start.getDate() + parseInt(dayValue));
		$("#totalMonth").html(dayValue);
	}else{
		//一年
		var toYear = $("#newInsuranceperiod").val();
		if(toYear!= null && toYear!= "" && toYear!=undefined){
			toYear = toYear.substring(0,toYear.length-1);
			$("#showYear").text(toYear);
		}else{
			toYear = 1;
		}
		start.setFullYear(start.getFullYear() + parseInt(toYear));
		$("#totalMonth").html("12");
	}
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
	$("#enddate").val(year+"/"+month+"/"+day);
}


/**
 * 获取性别;
 * @param sexcode 性别代码:1:男2:女
 * @return
 */
function getSexName(sexcode){
	if($.trim(sexcode) == '1'){
		return '男';
	}else if($.trim(sexcode) == '2'){
		return '女';
	}else{
		return '';
	}
}

//ajax获取session里的entryId
function getEnetryIdInsession(){
		var url = "/eproperty/member/getSessionInfo.do";
		$.ajax({
			url : url,
			async : false,
			type : "get",
			success : function(data, textStatus) {
				$("#entryId").val(data.entryId);
			}
		});
}
function sendEmail() 
	{
	}

//EAK_X新流程，向TD赋值时间
function setTdDate(){
	$('#td_daybetween').html(getDayBetweenNew()+'天');
	var v=$('#startdate').val().split('/');
	var startStr=v[0]+'年'+v[1]+'月'+v[2]+'日0时起</br>';
	v=$('#enddate').val().split('/');
	var endStr=v[0]+'年'+v[1]+'月'+v[2]+'日24时止';
	$('#td_date').html(startStr+endStr);
	//JCO产品新增可选保险期限
	if("JCO" == $("#productcode").val()){
		var toYear = $("#showYear").text();
		$('#manyYear').html(toYear+"年");
	}
}

//根据起保日期以及被保险人出生日期计算被保险人年龄
function setAge(startdate,birthday){
	var startMonth=startdate.substring(5, 7);
	var startDay=startdate.substring(8,10);
	var strBirthdayMonth=birthday.substring(5,7);
	var strBirthdayDay=birthday.substring(8,10);
	var j = 0;
    if(parseInt(startMonth+startDay,10)<parseInt(strBirthdayMonth+strBirthdayDay,10))
  	   j = 1;
    var age = parseInt(startdate.substring(0, 4),10)-parseInt(birthday.substring(0,4),10)-j;	    
	return age;
}

//被保险人姓名 放大镜
function maxViewShow(id){
	var thisobj = $("#"+id);
	var _this=$(thisobj).val();
	$('.preTitle').text(_this);
	var s=$(thisobj).offset();
	$(thisobj).bind('input propertychange', function() {
		if($(thisobj).val()==""||$(thisobj).val()==$(thisobj).attr("data-value")){
			$('.preTitle').hide();
		}else{
			$('.preTitle').css({'display':"block",'left':s.left,'top':s.top-46});
			$('.preTitle').text($(thisobj).val());
		}
		
	});
}

function maxViewHide(id){
	$('.preTitle').hide();
}


//新版投保流程中日期提示语显示方法
function showstartDateTips(){
	if("LEF" == $("#productcode").val()){
		if($('#maxprocessbar').val()=='Calc'|| $('#maxprocessbar').val()=='Continue'){
			$('#startdateTips').show();
			$('#startdateTips').delay(4000).fadeOut();
				//setTimeout( function(){$( '#startdateTips' ).fadeOut();}, ( 4 * 1000 ) );
			}
	}else{
		setTimeout( function(){$( '#startdateTips' ).fadeOut();}, ( 4 * 1000 ) ); 
	}
}

function InputMethodChange(id) {
	 $("#"+id).val($("#"+id).val().toUpperCase());
	 $('.preTitle').hide();
}
function InsuredidentityNumChange(idno){
	if(($("#input_identifytype"+idno).val() == "01" || $("#input_identifytype"+idno).val() == "02" || $("#input_identifytype"+idno).val() == "17") && $('#input_identifyNumber'+idno).val() != "" && $('#input_identifyNumber'+idno).val() !="请输入证件号码"){
		$('#input_identifyNumber'+idno).val($('#input_identifyNumber'+idno).val().toUpperCase())
		$('.preTitle').hide();
	}
}
function InsuredidentityNumChangeForSingle(){
	if("EDD_X" == $("#productcode").val()||"LBB" == $("#productcode").val()){
		if(($("#prpzinsured_identifytype").val() == "01" || $("#prpzinsured_identifytype").val() == "02" || $("#prpzinsured_identifytype").val() == "17") && $('#prpzinsured_identifynumber').val() != "" && $('#prpzinsured_identifynumber').val() !="请输入证件号码"){
			$('#prpzinsured_identifynumber').val($('#prpzinsured_identifynumber').val().toUpperCase())
		}
	}else{
		if(($("#input_identifytype").val() == "01" || $("#input_identifytype").val() == "02" || $("#input_identifytype").val() == "17") && $('#input_identifyNumber').val() != "" && $('#input_identifyNumber').val() !="请输入证件号码"){
			$('#input_identifyNumber').val($('#input_identifyNumber').val().toUpperCase())
		}
	}
}
function InsuredidentityNumChangeForLBB(identifyTypeId,id){
	if("LBB" == $("#productcode").val()){
		if(($("#"+identifyTypeId).val() == "01" || $("#"+identifyTypeId).val() == "02" || $("#"+identifyTypeId).val() == "17" ) && $('#'+id).val() != "" && $('#'+id).val() !="请输入证件号码"){
			$('#'+id).val($('#'+id).val().toUpperCase())
		}
}
}
function InsuredidentityNumChangeForLEF(){
	if(($("#input_companyIndentifyType").val() == "01"||$("#input_companyIndentifyType").val() == "02" || $("#input_companyIndentifyType").val() == "17" ) && $('#input_companyIdentifyNumber').val() != "" && $('#input_companyIdentifyNumber').val() !="请输入证件号码"){
		$('#input_companyIdentifyNumber').val($('#input_companyIdentifyNumber').val().toUpperCase())
	}
}
function ApplyentityNumChange(id){
	if(($("#input_applyIndentifyType").val() == "01" || $("#input_applyIndentifyType").val() == "02" || $("#input_applyIndentifyType").val() == "17") && $('#input_applyIdentifyNumber').val() != "" && $('#input_applyIdentifyNumber').val() !="请输入证件号码"){
		$('#input_applyIdentifyNumber').val($('#input_applyIdentifyNumber').val().toUpperCase())
	}
}
 //证件类型转化
function getBusinessdetailType(Str){
	 var businessdetail = "旅游";
	 if("01"==Str){
		 businessdetail = "旅游";
	 }else if("03"==Str){
		 businessdetail = "探亲访友";
	 }else if("99"==Str){
		 businessdetail = "其他";
	 }else if("02"==Str){
		 businessdetail = "公务";
	 }else if("04"==Str){
		 businessdetail = "商务";
	 } 
	 return businessdetail;
}
 
 //调整MASK高度
function maskHeightAdjust(){
	$('#mask').height($(document).height());
//	try{
//	 	_scrollHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
//		_scrollHeight = Math.max(_scrollHeight,window.screen.availHeight); 
//		$('#mask').height(_scrollHeight);
//	}catch(e){}
}
//公共方法提取，将关闭修改被保险人弹层的公共方法从产品js中提到公共js中-0803
function closeModify(){
	$("#pop_modify").hide();
	$(".background").hide();
	$("#_my97DP").hide();
}
//修改被保险人信息，时间控件的位置
function setcalenderPosition(){
	/*if ($("#productcode").val()=="EFFEFG"||$("#riskcode").val()=="EDD"){
		$("#_my97DP").css("top","305px");
	}else{
		$("#_my97DP").css("top","352px");
	}
	$("#_my97DP").css("position","fixed");*/
	
}
function setcalenderZindex(){
	$("#_my97DP").css("z-index","998");
	
}


//勾选框
function checkBoxClick(){
	
	if ($("#checkbox_id").attr("class")!="inputSpan active") {
//		showTipsWindown("请认真阅读投保声明、退保说明、免责说明、保险条款并确认");
		newShowInsureStatement();
	}else{
		$("#checkbox_id").toggleClass('active');
	}
}
var $scrollTop = 0, topArr = [], bottomArr = [];


function scrollFloating() {
    var _h = $("#conBox").height();
    var _top = $("#conBox").scrollTop();
    var _hh = $("#conBox .tbsm-con-box").outerHeight()-10;
    if (_top + _h >= _hh) {
        $(".tbsm-bottom input").addClass("active");
        $(".tbsm-tips").hide();
    }
    var $scrollTop = $("#conBox").scrollTop();
    if ($scrollTop < topArr[0]) {
        operateCurrent(".f0-a");
    } else if (topArr[0] <= $scrollTop  && $scrollTop < topArr[1]) {
        operateCurrent(".f1-a");
    } else if (topArr[1] <= $scrollTop && $scrollTop < topArr[2]) {
        operateCurrent(".f2-a");
    } else {
        operateCurrent(".f3-a");
        for(var k = 0; k<bottomArr.length ;k++) {
            if ( bottomArr[k] <=  $scrollTop) {
                operateCurrent(".f" + k + "-b");
            }
        }
    }
    if( $scrollTop >= topArr[2]){
        $(".tbsm-nav-sub").show();
    }else{
        $(".tbsm-nav-sub").hide();
    }
}
function throttle(opt) {
    var timer = null;
    var t_start;
    var fn = opt.fn,
        context = opt.context,
        delay = opt.delay || 100,
        mustRunDelay = opt.mustRunDelay;
    return function () {
        var args = arguments, t_curr = +new Date();
        context = context || this;
        clearTimeout(timer);
        if (!t_start) {
            t_start = t_curr;
        }
        if (mustRunDelay && t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args);
            t_start = t_curr;
        }
        else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}
function navCli(sub, item) {
	var $this = $(item),
    $index = $this.index(),
    h = $("#f" + $index + '-' + sub).position().top + $scrollTop;
	if ($index === 0) {
	    $("#conBox").stop().animate({
	        scrollTop: sub === 'a' ? 0 : h
	    }, 400);
	
	}else {
	    $("#conBox").stop().animate({
	        scrollTop: h
	    }, 400);
	}
}
function operateCurrent(el) {
    $(el).parent("li").siblings("li").removeClass("current");
    $(el).parent("li").addClass("current");
}

//V盟引流自然用户注册微店主弹层
//点击图片关闭注册自然用户微店主弹窗
function closeXxtx(el){
	var el = $(el).parent();
	var id = el.attr("id");
	$("#vusername").val("");
	$("#vusernumber").val("");
	$("#vusergroupid").val("");
	hideVUserRegisterTips("vusername");
	hideVUserRegisterTips("vusernumber");
	hideVUserRegisterTips("vusergroupid");
	$("#"+id).hide();
	$("#background").hide();
}

//弹出注册V盟自然用户微店主弹层
function registerVmeng(){
	$.ajax({
		url: "/eproperty/vDrainage/registerVmeng.do",
		async: false,
		type: "post",
		success: function(data){
			if("success" == data.result){
				var prpdentryinformation = data.prpdentryinformation;
				if("01" == prpdentryinformation.identifytype){
					$("#vusername").val(prpdentryinformation.cname);
					$("#vusername").attr("readonly",true);
					$("#vusernumber").val(prpdentryinformation.identifyno);
					$("#vusernumber").attr("readonly",true);
				}
			}
		},
		error: function(){
			
		}
	});
	$("#xxtx").show();
	$("#background").show();
	showInlineTips("vusername");
	showInlineTips("vusernumber");
	showInlineTips("vusergroupid");
}

//提交用户注册V盟所填信息
function submitVUserInfo(){
	if("" == $("#vusername").val() || "请填写您的真实姓名" == $("#vusername").val()){
		showVUserRegisterTips("vusername","姓名不能为空");
		return false;
	}
	if("" == $("#vusernumber").val() || "请填写您的身份证件号码" == $("#vusernumber").val()){
		showVUserRegisterTips("vusernumber","身份证件号码不能为空");
		return false;
	}
	if(!checkVUsername("vusername")){
		return false;
	}
	if(!checkVUsernumber("vusernumber")){
		return false;
	}
	if("" != $("#vusergroupid").val()){
		if(!checkVUsergroupid("vusergroupid")){
			return false;
		}
	}
	$.ajax({
		url: "/eproperty/vDrainage/submitVUserInfo.do",
		async: false,
		type: "post",
		data: {
				citycode: $("#areacode").val(),
				name: $("#vusername").val(),
				number: $("#vusernumber").val(),
				groupid: $("#vusergroupid").val()
			},
		success: function(data){
			var result = data.result;
			var resultMsg = data.resultMsg;
			result = "success";
			if("success" == result){
				//注册成功
				$("#isRegisterVmeng").val("1");
				$("#xxtx").hide();
				//$("#loginVMImg").attr("src","/eproperty/image/vmeng/login_success.png");
				saveProposal("vmengPay");
				//V盟引流页面基础监测
				var trkObj = {"prop11":"非车险:去微店支付"};
				trkObject(trkObj);
			}else {
				//注册失败
				$("#isRegisterVmeng").val("0");
				$("#loginVMImg").attr("src","/eproperty/image/vmeng/login_fail.png");
				$("#xxtx").hide();
				$("#loginVMResult").text(resultMsg);
				$("#loginVMWindow").show();
			}
			/*alert(resultMsg);*/
		},
		error: function(){
			//注册失败
			$("#xxtx").hide();
			$("#isRegisterVmeng").val("0");
			$("#loginVMImg").attr("src","/eproperty/image/vmeng/login_fail.png");
			$("#loginVMResult").text("系统异常");
			$("#loginVMWindow").show();
		}
	});
}

