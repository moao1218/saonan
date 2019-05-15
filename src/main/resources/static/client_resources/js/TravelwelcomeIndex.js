String.prototype.endWith=function(endStr){
  var d=this.length-endStr.length;
  return (d>=0&&this.lastIndexOf(endStr)==d)
}

try{
	$(document).ready(function(){
		if(window.location.href.indexOf("/idprovider/") < 0) {
			checkLogin();
		}
	});
}catch(e){}

//获取元素对象;
var docEle = function() {
    return (document.getElementById(arguments[0]) || false);
}

//检查是否登录
var logSucData;
function checkLogin(logType, isAsync, sucData) {
	logSucData = sucData;
	if(undefined == isAsync) {
		isAsync = true;
	}
	var flag = "";
	$.ajax({
		url:'/newecenter/privacy/getPrivacy.do?n=' + Math.random(),
		type:'post',
		dateType:'json',
		async : isAsync, 
		contentType:'application/x-www-form-urlencoded;charset=utf-8',
		success:function(data){
			var entryId = data.eid;
			if(null == data || null == entryId || '' == entryId) {
				showNoData();
				flag = "noLogon";
			}else {//数据是空的
				var nickName = data.nickName;
				var privacyAuth = data.privacyAuth;
				if("0" == privacyAuth) {
					showTopLoginState(entryId, nickName , "0", logType);
					if($(".for_member").length > 0) {
						showYsqyInfoBox(logType);
					}else {
						if("popLogin" == logType) {
							try{
								doLoginSuccess(logSucData);
							}catch(e){}
						}
					}
				}else {
					showTopLoginState(entryId, nickName, "1", logType);
					if("popLogin" == logType) {
						try{
							doLoginSuccess(logSucData);
						}catch(e){}
					}
				}
				flag = "logon";
			}		   
		},   
		error:function(){
			flag = "noLogon";
		}   
	});
	return flag;
}

function showTopLoginState(entryId, nickName, privacyAuth, logType){
	if(document.getElementById("entryId") != null){
		document.getElementById("entryId").value = entryId;
	}
	if("@".indexOf(entryId) == -1) {
		if(entryId.length >= 4){
			if(entryId.substring(0,4) == "sina"){
				entryId = "新浪微博用户";
			}
		} if(entryId.length >= 2) {
			if(entryId.substring(0,2) =="qq"){
				entryId = "腾讯用户";
			}
		}
	}
	if (null != nickName && "" != nickName) {
		if(nickName.length > 30) {
			nickName = nickName.substring(0, 30);
		}
		showTopLoginName(nickName,privacyAuth);
	} else {
		if(entryId.length > 30) {
			entryId = entryId.substring(0, 30);
		}
		showTopLoginName(entryId,privacyAuth);
	}
	if(undefined == logType) {
		loginSuccessForOther(entryId,nickName);
	}
}

function showTopLoginName(name,privacyAuth) {
	if($(".top_login_state").length > 0) {//新样式
		var liwuGif = "";
		//if(window.location.pathname == '/'){
			liwuGif = '<img src="/images/liwu_sm.gif" style="vertical-align: middle;top: -3px;position: relative;cursor: pointer;" onclick="window.open(\'/newecenter/benefit/goBenefitDetails.do\')">';
		//}
		var topHtml = '<span>您好，' + name+  liwuGif + '</span><span>&nbsp;<a href="#" onclick="exitSSO();">退出</a></span>';
		$(".top_login_state").html(topHtml);		
		if("1" == privacyAuth) {
			addYsqyTop();
		}
		if($(".car-login-win").length > 0) {
			ecenterOrderNum(name);
		}
	}else {
		if($(".for_member").length > 0) {
			var topHtml = '<span style="margin-right: 6px;" class="userLogin">您好，' + name +'</span><span style="margin-right: 6px;">&nbsp;<a href="#" onclick="exitSSO();">[退出]</a></span>' +
						'<span style="margin-right: 3px;">&nbsp;|&nbsp;<a href="/newecenter/" rel="nofollow">会员中心</a>&nbsp;|</span>' +
						'<span style="margin-right: 6px;"><a href="javascript:void(0)" onclick="javascript:addToFavorite(this);" class="with_icon heart">收藏本站</a></span>';
			$(".for_member").html(topHtml);		
			if("1" == privacyAuth) {
				addYsqyTop();
			}
		}
		if($(".member_entry").length > 0) {
			$("#entryidHeadClub").text(name);
			try{
				rightEcenterClubOrder();
			}catch(e){}
		}
	}
}

function addYsqyTop() {
	if($(".for_member>.yscq_btn").length == 0) {
		$(".for_member").append('<span class="yscq_btn"><a href="#" onclick="showCloseYsqyBox();">关闭隐私政策</a></span>');
	}
	if($(".top_login_state>.yscq_btn").length == 0) {
		$(".top_login_state").append('<span class="yscq_btn"><a href="#" onclick="showCloseYsqyBox();">关闭隐私政策</a></span>');
	}
}

function showNoData() {
	if($(".top_login_state").length > 0) {//新样式
		$(".top_login_state").html('<span>您好，欢迎来人保</span><a href="javascript:newLogin();" target="_blank">请登录</a><a href="/idprovider/api/register/toRegister" rel="nofollow">免费注册</a>');
	}else {
		$(".for_member").html('<span style="margin-right: 6px;">您好，欢迎来到人保！</span><span style="margin-right: 6px;">[ <a href="javascript:newLogin();">登录</a> ]</span><span style="margin-right: 6px;">[ <a href="/idprovider/api/register/toRegister" rel="nofollow">免费注册</a> ]&nbsp;</span><span style="margin-right: 3px;">|&nbsp;<a href="/newecenter/" rel="nofollow">会员中心</a>&nbsp;|</span><span style="margin-right: 6px;"><a href="javascript:void(0)" onclick="javascript:addToFavorite(this);" class="with_icon heart">收藏本站</a>&nbsp;</span>');
		var winLoca = window.location.href;
		if(! winLoca.endWith("fuwu/") && winLoca.indexOf("fuwu") > 0 ) {
			if(!(winLoca.indexOf("chaxunbaoxiantiaokuan")>-1 || winLoca.indexOf("changjianwenti")>-1 || winLoca.indexOf("chaxunzhongjiang")>-1 || winLoca.indexOf("tjmsm")>-1|| winLoca.indexOf("dianzibaodan")>-1|| winLoca.indexOf("EInvoiceQuery")>-1)) {
				var webIp=window.location.protocol+"//"+document.location.host;
				window.location.href = webIp + "/fuwu/";
			}	
		}
	}
}

function loginSuccessForOther(entryId,nickName){
	try{addentryId(nickName,entryId);}catch(e){}
	try{
		var hostport=document.location.href;
		if(hostport.indexOf("ecar")>=0){
			checkLoginEntryId();
		}
	}catch(e){}
}


//首页SSO退出
function exitSSO(flag){
	var webIp=window.location.protocol+"//"+document.location.host;
	var webAddrOut=webIp+"/idprovider/logout";
	if("noConsole" != flag) {
		if(!confirm('您确认退出吗？')){
			return false;
		}
	}
	var dataArray = {"token":''};
	$.ajax({
		url:webAddrOut,
		type:"GET",
		data:dataArray,
		dataType:"jsonp",
		success:function(){},
		error:function(){},
		complete: function(){
			clearTicketEcashier();
			var winLoca = window.location.href;
			if(winLoca.indexOf("fuwu") > 0){
				window.location.href = webIp + "/fuwu/" ;
			}else {
				if(typeof beforeCloseYsqy == 'function') {
					beforeCloseYsqy();
					return false;
				}
				window.location.reload();
			}
			
		 }
	});
	
}
//清除 收银台的cookie
function clearTicketEcashier() {
	$.ajax({ 
		url : 'https://www.epicc.com.cn/ecashier/ssoclear?rand=' + Math.random(), 
		async : false, 
		cache : false, 
		timeout: 1000,
		type : "GET", 
		dataType : 'jsonp',
		jsonp:'callback',
		success : function (){ 
		},
		error: function() {
	    },
	    complete: function(){
		}
	}); 
}
//首页登录
function newLogin(){
 	var location = window.location.href;
 	var ting = "" ;
 	if(location.indexOf("https")>-1) {
 		ting ="http://www.epicc.com.cn/idprovider/views/login.jsp?h="+location;
 	}else {
	 	ting ="/idprovider/views/login.jsp?h="+location;
 	}
 	window.location.href=ting;
}

function addToFavorite(obj) {
	var url = window.location.href;
	var title = "PICC人保财险官网";
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("360se") > -1) {
		alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏");
	}else if (ua.indexOf("msie 8") > -1) {
		window.external.addFavorite(url, title); //IE8
	}else if (document.all) {
		try {
			window.external.addFavorite(url, title);
		} catch (e) {
			alert('您的浏览器不支持,请按 Ctrl+D 手动收藏');
		}
	}else if (window.sidebar) {
		obj.href = url;
		window.sidebar.addPanel(title, url, "");
	}else {
		alert('您的浏览器不支持,请按 Ctrl+D 手动收藏');
	}
} 

//服务中心的跳转
function redirectToLogin(flag){
	if(flag  ==  '13'){   
		window.location.href  =  "/fuwu/chaxunzhongjiang/";
		return;
	}
	if(flag  ==  '14'){   
		window.location.href  =  "/fuwu/changjianwenti/";
		return;
	}
	if(flag  ==  '15'){   
		window.location.href  =  "/fuwu/chaxunbaoxiantiaokuan/";
		return;
	}
	if(flag  ==  '19'){   
		window.location.href  =  "/fuwu/EInvoiceQuery/";
		return;
	}
	if(flag  ==  '2'){   
		window.location.href  =  "/fuwu/dianzibaodan/";
		return;
	}
	$.ajax({
			url:'/newecenter/privacy/getPrivacy.do?n=' + Math.random(),
			type:'post',
			dateType:'json',
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			success:function(data){
				var claimIndexUrl = "/fuwu/chexianbaodanlipei/";
				var downloadUrl = "/fuwu/dianzibaodan/";
				var loginUrl = "/idprovider/views/login.jsp?h=/fuwu/chexianbaodanlipei/";
				var loginUrldownload = "/idprovider/views/login.jsp?h=/fuwu/dianzibaodan/";
				var policyurl = "/sy/";
				var loginpolicyurl = "/idprovider/views/login.jsp?h=/sy/";
				var claimurl ="/khfw/bzzx/lpfw/";
				var loginclaimurl = "/idprovider/views/login.jsp?h=/khfw/bzzx/lpfw/";
				
				var studentPolicy = "/khfw/xzdzbd/xsyebxbdcx/";
				var loginstudent = "/idprovider/views/login.jsp?h=/khfw/xzdzbd/xsyebxbdcx/";
				var xuniPolicy = "/khfw/xzdzbd/xnccssbx/";
				var loginxuniPolicy = "/idprovider/views/login.jsp?h=/khfw/xzdzbd/xnccssbx/";
				var  loginzhRecord  =  "/idprovider/views/login.jsp?h=/newecenter/#order/topay";   
				var  loginblNewCarOnBand  =  "/idprovider/views/login.jsp?h=/newecenter/#member/newcarno";   
				var  loginsearchProgress="/idprovider/views/login.jsp?h=/newecenter/#member/deliverySchedule";   
				var  zhRecord  =  "/newecenter/#order/topay";   
				var  newCarOnBand  =  "/newecenter/#member/newcarno";   
				var  searchProgress="/newecenter/#member/deliverySchedule";   
				var  claimProgress="/ecenter/insuringAndClaims/PolicyClaimCheck/policyClaimNewIndex/getPolicyPage?clickMenu=4";   
				var  loginclaimProgress="/idprovider/views/login.jsp?h=/ecenter/insuringAndClaims/PolicyClaimCheck/policyClaimNewIndex/getPolicyPage?clickMenu=4"; 
				
				var yyshensuUrl="/fuwu/yiyishensu/";
				var loginyyshensuUrl="/idprovider/views/login.jsp?h=/fuwu/yiyishensu/";
				
				var onlinetousuUrl="/fuwu/zaixiantousu/";
				var loginonlinetousuUrl="/idprovider/views/login.jsp?h=/fuwu/zaixiantousu/";
				
				var illegalQuery="/newecenter/#member/peccancy";
				var loginillegalQuery="/idprovider/views/login.jsp?h=/newecenter/#member/peccancy";
				
				var claimAppealStatus="/fuwu/lpsxzt/";
				var loginclaimAppealStatus="/idprovider/views/login.jsp?h=/fuwu/lpsxzt/";
				
				var claimAppealResult="/fuwu/lpsxjg/";
				var loginclaimAppealResult="/idprovider/views/login.jsp?h=/fuwu/lpsxjg/";
				
				var eInvoiceQueryUrl="/fuwu/EInvoiceQuery/";
				var logineInvoiceQueryUrl="/idprovider/views/login.jsp?h=/fuwu/EInvoiceQuery/";
				var loginecarInsurancefirst="/idprovider/views/login.jsp?h=/newecenter/#member/carAdditionalInsurance";
				var carInsurancefirst="/newecenter/#member/carAdditionalInsurance";
				var bjdqdianzibaodanxiazai = "/bjdqdianzibaodanxiazai/";
				var loginbjdqdianzibaodanxiazai = "/idprovider/views/login.jsp?h=/bjdqdianzibaodanxiazai/";
				var findUnPay="/newecenter/#member/findUnpay";
				var loginFindUnPay="/idprovider/views/login.jsp?h=/newecenter/#member/findUnpay";
				var gjjzgy="http://tidl.zuzuche.com/?pnid=D17830829";
				var nogjjzgy="/idprovider/views/login.jsp?h=http://tidl.zuzuche.com/?pnid=D17830829";
                var loginecarService="/idprovider/views/login.jsp?h=/fuwu/nuocheservice/";
                var carService="/fuwu/nuocheservice/";
                var noCarOnlineClaim="/newecenter/#member/noCarOnlineClaim";
                var noCarOnlineClaimNone="/idprovider/views/login.jsp?h=/newecenter/#member/noCarOnlineClaim"
				if(data == null|| data.eid == null || data.eid == ''){
					if(flag  ==  '1'){
						openNewWindow(loginUrl);   
					}else  if(flag  ==  '2'){
						openNewWindow(loginUrldownload);
					}else  if(flag  ==  '3'){   
						window.location.href  =  loginpolicyurl;   
					}else  if(flag  ==  '4'){   
						window.location.href  =  loginclaimurl;   
					}else  if(flag  ==  '5'){   
						window.location.href  =  loginstudent;   
					}else  if(flag  ==  '6'){   
						window.location.href  =  loginxuniPolicy;   
					}else  if(flag  ==  '7'){   
					    window.location.href  =  loginzhRecord;   
					}else  if(flag  ==  '8'){   
					    window.location.href  =  loginblNewCarOnBand;   
					}else  if(flag  ==  '9'){   
					    window.location.href  =  loginsearchProgress;   
					}else  if(flag  ==  '10'){   
					    window.location.href  =  loginclaimProgress;   
					}else  if(flag  ==  '11'){   
					    window.location.href  =  loginyyshensuUrl;   
					}else  if(flag  ==  '12'){   
					    window.location.href  =  loginonlinetousuUrl;   
					}else if(flag  ==  '16'){
						window.location.href  =  loginillegalQuery;   
					}else if(flag  ==  '17'){
						window.location.href  =  loginclaimAppealStatus;   
					}else if(flag  ==  '18'){
						window.location.href  =  loginclaimAppealResult;   
					}else if(flag  ==  '19'){
						openNewWindow(logineInvoiceQueryUrl);
					}else if(flag  ==  '20'){   
					    window.location.href  =  loginecarInsurancefirst;   
					}else if(flag  ==  '21'){
						window.location.href  =  loginbjdqdianzibaodanxiazai;
					}else if(flag  ==  '22'){
						window.location.href  =  loginFindUnPay;
					}else if(flag  ==  'gjjzgy'){
                        window.location.href  =  nogjjzgy;
                    }else if(flag  ==  '23'){
                        window.location.href  =  loginecarService;
                    }else if(flag  ==  '24'){
						window.location.href  =  noCarOnlineClaimNone;
                    }
				}else{   
					if(flag  ==  '1'){   
						openNewWindow(claimIndexUrl);
					}else  if(flag  ==  '2'){
						openNewWindow(downloadUrl);  
					}else  if(flag  ==  '3'){   
						window.location.href  =  policyurl;   
					}else  if(flag  ==  '4'){   
						window.location.href  =  claimurl;   
					}else  if(flag  ==  '5'){   
						window.location.href  =  studentPolicy;   
					}else  if(flag  ==  '6'){   
						window.location.href  =  xuniPolicy;   
					}else  if(flag  ==  '7'){   
						window.location.href  =  zhRecord;   
					}else  if(flag  ==  '8'){   
						window.location.href  =  newCarOnBand;   
					}else  if(flag  ==  '9'){   
						window.location.href  =  searchProgress;   
					}else  if(flag  ==  '10'){   
					    window.location.href  =  claimProgress;   
					}else  if(flag  ==  '11'){   
					    window.location.href  =  yyshensuUrl;   
					}else  if(flag  ==  '12'){   
					    window.location.href  =  onlinetousuUrl;   
					}else if(flag  ==  '16'){
						window.location.href  =  illegalQuery;   
					}else if(flag  ==  '17'){
						window.location.href  =  claimAppealStatus;   
					}else if(flag  ==  '18'){
						window.location.href  =  claimAppealResult;   
					}else if(flag  ==  '19'){
						openNewWindow(eInvoiceQueryUrl);  
					}else if(flag  ==  '20'){   
					    window.location.href  =  carInsurancefirst;   
					}else if(flag  ==  '21'){
						window.location.href  =  bjdqdianzibaodanxiazai;
					}else if(flag  ==  '22'){
						window.location.href  =  findUnPay;
					}else if(flag  ==  'gjjzgy'){
                        window.location.href  =  gjjzgy;
                    }else if(flag  ==  '23'){
                        window.location.href  =  carService;
                    }else if(flag  ==  '24'){
						window.location.href  =  noCarOnlineClaim;
                    }
				}   
				   
				},   
				error:function(){}   
	});
}

function openNewWindow(url) {
	if(isFuWu()) {
		window.location.href = url;
	}else {
		window.open(url);
	}
}

function isFuWu() {
	var winLoca = window.location.href;
	if(winLoca.indexOf("fuwu") > 0 ) {
		return true;
	}
	return false;
}

function showCloseYsqyBox() {
	var mask = '<div id="ysqyMask"></div>';
	if($("body").find("#ysqyBox").length == 0) {
		$("body").append(getColseYsqyBox());
	}
	if($("body").find("#ysqyMask").length == 0) {
		$("body").append(mask);
	}
	$("#ysqyMask").show();
	$("#ysqyBox").show();
}

function getColseYsqyBox() {
	var box = '<div class="lay-cancelauthorization" id="ysqyBox">' +
					'<i class="close-cancelauthorization" onclick="hideYsqyBox();"></i>' +
					'<h4 class="h4-cancelauthorization">温馨提示</h4>' +
					'<p class="b-cancelauthorization">尊敬的客户您好！</p>' +
					'<p class="p-cancelauthorization">关闭授权会退出登录不能使用官网功能及服务</p>' +
					'<div class="btnbox-cancelauthorization">' +
						'<a href="javascript:;" onclick="hideYsqyBox();" class="btn-cancelauthorization btn-cancelauthorization-lg">继续授权</a>' +
						'<a href="javascript:;" onclick="cancleYsqy();" class="btn-cancelauthorization btn-cancelauthorization-sm">关闭授权</a>' +
					'</div>' +
				'</div>'
	return box;
}
var privacybtn=0;
var mouseoutagree=true;
function setYsqyHtmlBindEvents() {
	var mask = '<div id="ysqyMask"></div>';
	if($("body").find("#privacyInfoBox").length == 0) {
		$("body").append(getYsqyInfoBox());
		$(".privacy-box-txt").scroll(function() {
			$(".ysqy_lay_tip_corner").fadeOut();
			if(scrollBottom($(this))){
				$('#agreeAndAuthBtn').addClass('privacy-btn-agree');
			}
		});
		$('.ysqy-lay-close').on({					
			mouseover : function(){
				$(this).addClass('rotate')				
			},mouseout : function(){
				$(this).removeClass('rotate')				
			} 				
		});
		$('.privacy-btn-cancel,.ysqy-lay-close').on('click',function() {
			if($(this).hasClass('privacy-btn-cancel')){
				if(privacybtn==0){
					$('.lay_tip_streamer').css({left:'-1000px',opacity:'1'});
					$('.lay_tip_streamer').animate({left:'0'},400);
					privacybtn=1;
					tce=setTimeout(function(){privacybtn=0;fade();},5000);
				}else{
					return false
				}
			}else{
				hideYsqyInfoBox();
			}
		});
		$('.lay_tip_streamer').mouseover(function(){
			if($('.lay_tip_streamer').css('opacity')=='0'){
				$('.lay_tip_streamer').css({left:'-1000px',opacity:'1'});
				mouseoutagree=false;
			}else{
				clearTimeout(tce);
				privacybtn=1;
				mouseoutagree=true;
				setTimeout(function(){privacybtn=0;},5000);
				$('.lay_tip_streamer').stop().css({left:'0',opacity:'1'});
		}}).mouseout(function() {
			if(mouseoutagree){
				privacybtn=1;
				tce=setTimeout(function(){privacybtn=0;fade();},5000);
			}
		});
	}
	if($("body").find("#ysqyMask").length == 0) {
		$("body").append(mask);
	}
}


function showYsqyInfoBox(option) {
	setYsqyHtmlBindEvents();
	if('0' == option) {
		$(".ysqy-lay-close").attr("value","0");
		$(".ysqy_lay_tip_corner").fadeIn();
		$(".privacy-btn-box").show();
		$(".privacy-box-txt").css({"height": "456px"});
	}else if('1' == option) {
		$(".ysqy-lay-close").attr("value","1");
		$(".ysqy_lay_tip_corner").hide();
		$(".privacy-btn-box").hide();
		$(".privacy-box-txt").css({"height": "526px"});
	}else if('login' == option) {
		$(".ysqy-lay-close").attr("value","login");
		$(".ysqy_lay_tip_corner").fadeIn();
		$(".privacy-btn-box").show();
		$(".privacy-box-txt").css({"height": "456px"});
	}else if('popLogin' == option) {
		$(".ysqy-lay-close").attr("value","popLogin");
		$(".ysqy_lay_tip_corner").fadeIn();
		$(".privacy-btn-box").show();
		$(".privacy-box-txt").css({"height": "456px"});
	}else {
		$(".ysqy-lay-close").attr("value","2");
		$(".ysqy_lay_tip_corner").fadeIn();
		$(".privacy-btn-box").show();
		$(".privacy-box-txt").css({"height": "456px"});
	}
	$("#ysqyMask").show();
	$("#privacyInfoBox").show();
	$(".privacy-box-txt").scrollTop(0);
}

function fade(){
	$('.lay_tip_streamer').animate({left:'0',opacity:'0'},1500);
	privacybtn=1;
	setTimeout(function() {
		privacybtn=0;
	},1500);
}

function scrollBottom(e){
	var viewHeight =e.height()+parseInt(e.css('padding-top'))+parseInt(e.css('padding-bottom'));
	var contentHeight =e.get(0).scrollHeight;
    var scrollHeight =e.scrollTop();
    if(contentHeight - viewHeight <= scrollHeight) { 
       	return true
    }else{
       	return false
    }
}

function getYsqyInfoBox() {
	var box = '<div class="privacy-lay"  id="privacyInfoBox">' 
		+'<div class="privacy-box">'
			+'<i class="ysqy-lay-close"></i>'
			+'<h2 class="privacy-h2">中国人民保险集团隐私政策</h2>'
			+'<p class="ysqy_lay_tip_corner"><span>请下拉滚动条</span><b>阅读</b>全部内容后<br>点击“<b>同意并授权</b>”按钮。</p>'
			+'<div class="privacy-box-txt-box">'
			+'<div class="privacy-box-txt">'
				+'<b>本政策适用于中国人民财产保险股份有限公司（以下简称“人保财险”或“我们”）PC端官方网站（域名为http://www.epicc.com.cn/）、移动端官方网站（域名为http://www.epicc.com.cn/m/）、移动设备客户端（中国人保）、微信公众号（中国人保、各省级分公司官方微信公众号、人保V盟）、微信小程序等网络运营平台（以下统称“网络运营平台”）所提供的各类金融产品及服务，以及其他增值服务（以下统称“我们的产品及服务”），包括但不限于机动车保险、旅游保险、意外保险、家庭保险、行李保险、人身保险、企业保险、保险卡等各类保险产品、增值服务产品及售后服务功能。</b>'
				+'<p class="pt">本政策将帮助您了解以下内容： </p>'
				+'<p>1、我们如何收集和使用您的个人信息 </p>'
				+'<p>2、我们如何使用 Cookie 和同类技术 </p>'
				+'<p>3、我们如何共享或公开披露您的个人信息 </p>'
				+'<p>4、我们如何保护您的个人信息 </p>'
				+'<p>5、您的权利 </p>'
				+'<p>6、我们如何处理未成年人的个人信息 </p>'
				+'<p>7、您的个人信息如何在全球范围转移 </p>'
				+'<p>8、本政策如何更新 </p>'
				+'<p>9、如何联系我们</p>'
				+'<p>10、关键词解释</p>'
				+'<b class="pt">我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守合法、正当、必要的原则，保护您的个人信息。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。 </b>'
				+'<b>请在使用我们的产品及接受服务前，仔细阅读并了解本《隐私政策》。我们努力用通俗易懂、简明扼要的文字表达，并对本政策中与您的权益有重大关系的条款采用加粗方式标注，以提示您注意。</b>'
				+'<b class="pt">一、我们如何收集和使用您的个人信息</b>'
				+'<p class="pt">提供我们的产品及服务的网络运营平台包括核心功能和附加功能，核心功能主要包括保险产品在线销售功能，附加功能主要包括保险推广与服务、用户注册、短信类服务提醒、邮件类服务提醒、保单管理、拇指理赔、承保理赔查询、积分商城、个人设置、电子保单下载、电子发票下载、道路救援、直升机救援、邀请好友、人保头条、营销活动、i驾驶、车辆违章信息查询及主动推送、保险销售从业人员的管理等。我们仅会出于本政策所述的以下目的收集和使用您的个人信息。</p>'
				+'<b class="pt">（一）您使用核心功能须提供并授权我们使用个人信息的情形</b>'
				+'<b class="pt">我们的网络运营平台包括一些核心功能，您需要提供并授权我们保存和使用下列与您有关的信息，才能使用上述这些功能接受服务。如您提供的信息中包含第三方人员信息，默认您已取得第三方授权，同意我司对其相关信息进行使用和共享。如您拒绝提供并授权，则无法使用这些核心功能接受服务。其具体情形主要如下：</b>'
				+'<b class="pt">1.接受保险推广等金融服务</b>'
				+'<p>（1）用户注册</p>'
				+'<p>为完成用户注册，您需要提供个人手机号码、证件类型、证件号码、验证码或准备使用的密码等。</p>'
				+'<p>（2）车险产品投保</p>'
				+'<p>为完成车险在线投保功能，您需要提供所在城市、车牌号码、车辆识别码或车架号、发动机号、初登日期、品牌型号、交强险起止日期、商业险起止日期、投保险种、保险金额、被保险人信息（包括姓名、证件类型、证件号码、性别、生日、手机号码、电子邮箱）、车主信息（包括姓名、证件类型、证件号码、手机号码、电子邮箱）、投保人信息（包括姓名、证件类型、证件号码、手机号码、电子邮箱）、收件人信息（包括姓名、手机号码、保单寄送地址、发票抬头）、会员信息（包括手机号码或邮箱）、车辆贷款信息、燃料类型等。</p>'
				+'<p>（3）非车险产品投保</p>'
				+'<p>为完成非车险产品在线投保功能，您需要提供所在城市、保险方案、生效时间、截止时间、被保险人信息（包括姓名、证件类型、证件号码、性别、出生日期、与投保人关系、手机号码、学校全称、班级）、投保人信息（包括姓名、证件类型、证件号码、手机号码、电子邮箱、性别、职业类别、常驻城市）、投保金额、财产标的、厂牌型号、企业信息（包括企业名称、所属行业、房间数量、营业执照号码、联系电话、财产所在城市、财产标的详细地址）、房屋面积、房间数量、房屋结构等。</p>'
				+'<p>（4）保单管理</p>'
				+'<p>为完成保单管理，您需要提供手机号码、投保人及被保险人姓名、证件类型、证件号码等。</p>'
				+'<p>（5）拇指理赔</p>'
				+'<p>为完成拇指理赔，您需要提供手机号码、投保人及被保险人姓名、证件类型、证件号码、地理位置（位置信息）、银行卡信息、相机（摄像头）、相册（图片库）等。</p>'
				+'<p>（6）承保理赔查询</p>'
				+'<p>为完成承保理赔查询，您需要提供投保人手机号、被保险人姓名、被保险人证件类型、证件号码等。</p>'
				+'<p>（7）积分商城</p>'
				+'<p>为完成积分商城功能，您需要提供积分信息、地理位置（位置信息）等。</p>'
				+'<p>（8）保险推广</p>'
				+'<p>为完成保险推广，您需要保证您提供的姓名、手机号、证件类型、证件号码等。</p>'
				+'<p>（9）车辆违章信息查询及推送</p>'
				+'<p>为完成车辆信息查询及推送功能，根据各地不同的交管政策，您需要提供身份信息、手机号、车牌、车架、发动机号中的一种或多种。</p>'
				+'<b class="pt">2.开展数据分析和研究，改进我们的产品及服务</b>'
				+'<p>为了提升您的产品及服务体验，您需要提供姓名、证件类型、证件号码、手机号码、互动操作、注册时间、代理人考试时间、浏览及搜索记录、设备信息、地理位置（位置信息）、订单信息等，我们将提取您的浏览及搜索偏好、行为习惯等。我们会对上述信息进行统计、分析，用以改善产品并推送适合的金融保险产品。</p>'
				+'<b class="pt">3.保障交易安全所必需的情形</b>'
				+'<p>为提高您使用我们的网络运营平台时系统的安全性，更准确地预防网络安全风险和保护账户安全，您需要提供下述个人信息，包括但不限于：</p>'
				+'<p>（1）终端电脑设备信息：包括但不限于浏览器、相关软件版本、显示器、操作系统等相关信息。</p>'
				+'<p>（2）网站访问浏览信息：包括但不限于访问时间、时长、次数、页面、网络日志等。</p>'
				+'<p>（3）流量来源信息：包括但不限于跳转至官网之前的外部页面、搜索引擎相关信息等。</p>'
				+'<p>（4）个人信息：手机号码、姓名、证件类型、证件号码、会员信息、交易信息等。</p>'
				+'<p>（5）授权合作伙伴取得您授权或依据法律共享的信息。</p>'
				+'<p>如您同意授权提供，则上述信息由我们自动获取，无需您主动录入。</p>'
				+'<b class="pt">（二）您使用附加功能须提供并授权我们使用个人信息的情形</b>'
				+'<p class="pt">为给您提供更丰富更便捷的产品及服务，我们的网络运营平台以下主要附加功能需要使用您的个人信息。如果您拒绝提供并授权，您依然可以使用网络运营平台的核心功能接受服务，但无法获得附加功能对应的相关服务。</p>'	
				+'<p>这些附加业务功能包括但不限于：</p>'
				+'<p>1.	订单支付</p>'
				+'<p>2.	保单查询、电子保单下载</p>'
				+'<p>3.	车险保单配送进度查询</p>'
				+'<p>4.	补录新车车牌号码</p>'
				+'<p>5.	违章查询、罚款代缴纳</p>'
				+'<p>6.	车险承保理赔查询</p>'
				+'<p>7.	私密挪车服务</p>'
				+'<p>8.	车主秘书服务</p>'
				+'<p>9.	车险自助加保</p>'
				+'<p>10.	自助撤单功能</p>'
				+'<p>11.	非车险在线理赔服务</p>'
				+'<p>12.	电子发票信息查询及下载</p>'
				+'<p>13.	政策变更、服务升级</p>'
				+'<p>14.	活动提醒</p>'
				+'<p>15.	道路救援、直升机救援</p>'
				+'<p>16.	邀请好友</p>'
				+'<p>17.	i驾驶</p>'
				+'<p>18.	人保头条、营销活动</p>'
				+'<p>19.	申请积分兑换</p>'
				+'<b class="pt">（三）您授权我们从第三方查询和收集个人信息的情形</b>'
				+'<p class="pt">为通过网络运营平台的上述核心及附加功能向您提供产品及服务，您需要授权我们在法律法规及监管规定允许的范围内，从人保集团内部查询和收集您的投保人及被保险人、车主的姓名、证件类型、证件号码、手机号、邮箱、会员信息（包括姓名、手机号、证件类型、证件号码）等个人信息，从人保金服服务提供方、电子发票服务提供方处查询和收集您的姓名、证件类型、证件号码等个人信息。</p>'
				+'<b class="pt">（四）开启相关设备权限</b>'
				+'<p class="pt">您需要在您的设备中向我们开启设备信息、地理位置（位置信息）、相机（摄像头）、相册（图片库）、传感器、麦克风等访问权限，以收集和使用上述核心及附加功能对应服务所需要的个人信息。您开启这些访问权限即代表您同意提供或授权我们可以收集和使用这些个人信息来实现上述功能，您关闭权限即代表您取消了这些授权，则我们将不再继续收集您的这些个人信息，也无法为您提供与这些授权所对应功能相关的服务。</p>'
				+'<b class="pt">（五）我们在以下情形中收集、使用您的以下个人信息无需征得您的授权同意：</b>'
				+'<b class="pt">1.与国家安全、国防安全直接相关的；</b>'
				+'<b>2.与公共安全、公共卫生、重大公共利益直接相关的；</b>'
				+'<b>3.与犯罪侦查、起诉、审判和判决执行等直接相关的；</b>'
				+'<b>4.依法维护您或其他人的生命、财产等重大合法权益所必需的；</b>'
				+'<b>5.您自行向社会公众公开的；</b>'
				+'<b>6.从合法的新闻报道、政府信息公开等渠道公开披露的信息中收集的；</b>'
				+'<b>7.根据您的要求与我们签订和履行合同所必需的；</b>'
				+'<b>8.用于维护我们所提供的产品及服务的安全稳定运行所必需的，例如发现、处置网络运营平台的故障；</b>'
				+'<b>9.法律法规规定的其他情形。</b>'
				+'<b class="pt">（六）对您个人信息使用的规则</b>'
				+'<p class="pt">1.我们会认真按照本隐私政策的约定使用您的个人信息。当我们要将您的个人信息用于本政策未载明的其它用途时，或将基于特定目的收集而来的信息用于其他目的时，我们会事先征求您的同意。</p>'
				+'<p>2.在收集您的个人信息后，我们有可能通过技术手段对数据进行去标识化处理。经去标识化处理的信息将无法用来重新识别您的身份。根据法律规定，我们有权使用、共享已经去标识化的信息，开展数据分析等商业化应用。</p>'
				+'<p>3.您在使用我们的产品及接受服务时所提供或授权我们查询收集的所有个人信息，将在您使用我们的产品及接受服务期间持续授权我们使用，除非您提交删除申请（法律法规或监管部门另有规定的除外）并得到了我们的响应。</p>'
				+'<p>4.当您使用产品和接受服务的过程中，需要使用手机等设备明确显示您的个人信息时，我们会采用包括匿名、部分信息采用符号替换等方式处理您的信息，以保护您的信息安全。</p>'
				+'<p>5.对于网络运营平台的核心及附加功能所收集的个人敏感信息，我们将采用弹窗或独立授权协议等方式（原则上不影响用户投保流程体验）向您进行告知，并明确告知您拒绝提供或者拒绝同意将带来的影响，例如您将无法使用相应的核心功能或附加功能接受相关服务，以确保您在完全知情的基础上决定是否提供或授权我们查询、收集、共享您的个人敏感信息。</p>'
				+'<b class="pt">二、我们如何使用Cookie和同类技术</b>'
				+'<b class="pt">（一）Cookie的使用</b>'
				+'<p>为确保网站正常运转，我们会在您的计算机或移动设备上存储名为Cookie的小数据文件。Cookie通常包含标识符、站点名称以及一些号码和字符。借助于Cookie，网站能够存储您的历史浏览记录等数据。 </p>'
				+'<p>我们不会将Cookie用于本政策所述目的之外的任何用途。您可以通过每次访问我们的网站时更改用户设置的方式，按照自己的偏好管理或删除Cookie。如果您的浏览器或浏览器插件允许，也可以拒绝我们使用Cookie，但我们的网站必须使用Cookie来防止第三方欺诈的情形除外。此种除外情形下，如果您仍然拒绝我们使用Cookie，可能会妨碍您通过我们的网站接受服务，但不影响正常接受我们通过网站以外途径提供的其他服务。</p>'
				+'<b class="pt">（二）网站信标等技术的使用</b>'
				+'<p>除Cookie外，我们还会在网站上使用网站信标（或称“像素标签”）等其他同类技术。网站信标通常是一种嵌入到网站或电子邮件中的工具，用来收集您的到访记录等数据。这些技术是目前网络服务提供者为改善服务所常用的技术。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开，如果您不希望自己的活动以这种方式为我们所知悉，则可以随时退订我们的电子邮件。 </p>'
				+'<b class="pt">三、我们如何共享或公开披露您的个人信息 </b>'
				+'<b class="pt">（一）共享 </b>'
				+'<p class="pt">我们不会与其它公司、组织和个人共享您的个人信息，但以下情况除外： </p>'
				+'<p class="pt">1.在获取授权同意的情况下共享：获得您的同意后，我们可在人保集团内部或与授权合作伙伴共享您的个人信息。 </p>'
				+'<p>（1）人保集团内部共享：为了给您提供多样化的产品及综合化的服务，强化风险防控，提升客户服务水平和用户体验，我们会将您的个人信息在人保集团内部进行共享。人保集团内部其他成员如要改变本隐私政策声明的个人信息使用目的，将再次征求您的授权同意。除非得到您的明确授权或根据相关法律法规及监管规定要求，我们绝不会在未经您同意的情况下在人保集团内部共享您的个人敏感信息。</p>'
				+'<p>（2）与授权合作伙伴共享：仅为实现本政策第一部分中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与授权合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。</p>'
				+'<p>目前，我们的授权合作伙伴主要包括以下两大类型：保险中介机构、技术服务商。</p>'
				+'<b>我们的授权合作伙伴无权将共享的个人信息用于任何其他用途。除非得到您的明确授权或相关法律法规及监管规定要求，我们绝不会在未经您同意的情况下与授权合作伙伴共享您的个人敏感信息。</b>'
				+'<b>（3）对与我们共享您的个人信息的授权合作伙伴，我们将与其签署严格的保密协议，要求其在合作结束后将您的个人信息交还我们保存，同时删除其保存的相应个人信息副本并允许我们进行核查。对于人保集团内部其他成员，我们也会要求其严格执行人保集团的客户信息保密制度。人保集团内部其他成员和授权合作伙伴将按照本隐私政策规定，并采取有效的保密和安全措施来处理个人信息。</b>'
				+'<p class="pt">2.去标识化处理后共享：根据《网络安全法》等法律规定，无法识别自然人个人身份的信息不属于个人信息。因此，如我们对您的个人信息进行去标识化处理，无法识别特定个人且不能复原的，依法可在人保集团内部或与授权合作伙伴等其他方共享。</p>'
				+'<p class="pt">3.根据法律法规及监管规定要求对外提供或共享：例如，根据网络服务实名制管理要求和金融监管机构相关规定，为保证我们为您提供服务的连续性、真实性及您的合法权益，我们可能需要将上述规定中涉及的个人信息（包括但不限于访问轨迹、个人信息、支付信息等）在业务检查等必要场合提交给政府主管部门或其指定的相关机构进行核验。</p>'
				+'<b class="pt">（二）公开披露 </b>'
				+'<p class="pt">我们不会公开披露您的个人信息，但以下情况除外： </p>'
				+'<p>1.获得您同意后； </p>'
				+'<p>2.根据司法机关、行政机关、监察机关要求或执行法律法规、监管规定而披露。</p>'
				+'<b class="pt">（三）被收购、合并或破产清算的特殊情形</b>'
				+'<p class="pt">如出现我们被收购、合并或破产清算情形，我们会要求收购人、存续公司、破产管理人等接受您个人信息的公司、组织继续受本隐私政策的约束，或者要求其重新获得您的授权同意。 </p>'
				+'<b class="pt">四、我们如何保护您的个人信息</b>'
				+'<p class="pt">（一）我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权的访问、不当公开披露、不当使用、不当修改、损坏或丢失（以下简称“个人信息安全事件”）。我们会采取一切合理可行的措施，保护您的个人信息，如权限控制、隐私保护培训等。 </p>'
				+'<p>（二）我们的信息系统已经通过国家公安部信息系统安全等级测试备案，并获得了由公安部门核准颁发的“国家信息安全等级保护三级认证”，并取得了以下认证：诚信网站、可信网站、认证联盟实名网站。这意味着平台的技术系统安全可靠，数据保护能力得到了官方和专业机构的认可。</p>'
				+'<p>（三）互联网并非绝对安全。电子邮件、即时通讯、社交软件等与其他用户的交流方式无法确定是否完全加密，我们建议您使用此类工具时使用复杂密码，协助我们保护您的账号和个人信息安全。 </p>'
				+'<p>（四）我们将按照《网络安全法》要求开展网络安全风险评估和数据出境安全评估，并按照相关国家标准要求开展个人信息安全影响评估。</p>'
				+'<p>（五）我们将尽力确保您提供或授权我们查询收集的任何个人信息的安全。如果我们的物理防护、技术手段或管理措施遭到破坏，导致个人信息安全事件发生，我们将依法承担相应的法律责任。 </p>'
				+'<p>（六）由于技术水平限制及外界可能存在的各种恶意手段，不排除我们无法控制的个人信息安全事件发生的可能。在发生或者可能发生个人信息安全事件时，我们将立即采取补救措施，并按照规定及时向您和有关主管部门报告。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，在难以逐一告知时，我们会采取合理、有效的方式发布公告。 </p>'
				+'<b class="pt">五、您的权利 </b>'
				+'<p class="pt">按照中国相关法律法规，您对自己的个人信息行使以下权利： </p>' 
				+'<b class="pt">（一）访问您的个人信息</b>'
				+'<p>除账户注册所需的个人信息和保证交易安全所收集的设备信息外，您可以通过以下方式自行访问您的其他个人信息： </p>'
				+'<p>（1）进入“人保V盟”公众号，进入“I微店”栏目后，可访问“我的”，查看个人账户设置。</p>'
				+'<p>（2）使用您的用户名及密码登录官方微信公众号或官网，进入会员中心后，如需查询注册账户中的相关个人信息，可访问个人信息；如需查询投保保险产品中的相关信息，可访问订单管理。</p>'
				+'<b class="pt">（二）更正您的个人信息 </b>'
				+'<p>当您发现您的个人信息有错误时，您有权要求我们做出更正。您可通过如下途径申请更正：</p>'
				+'<p>（1）点击官网在线客服功能，向在线客服人员提出申请。</p>'
				+'<p>（2）点击中国人保或各省分公司官方微信公众号在线客服功能，向在线客服人员提出申请。</p>'
				+'<p>（3）如果您需要修改人保V盟账号相关信息，您可以在账户设置中自行更改。</p>'
				+'<b class="pt">（三）删除您的个人信息 </b>'
				+'<p>当您发现我们违反法律、行政法规的规定或者双方的约定收集、使用、共享或公开披露您个人信息的，有权要求我们删除您的个人信息，申请删除的途径为联系官网/人保V盟的在线客服功能。我们将依据您的要求删除您的个人信息，《保险法》 《反洗钱法》等法律法规、监管规定另有规定的除外。</p>'
				+'<b class="pt">（四） 取消授权或变更授权范围的方式</b>'
				+'<p>您可以通过联系官网/人保V盟/中国人保微信公众号/各省分公司官方微信公众号的在线客服等途径取消授权或变更授权范围。当您取消授权或变更授权范围后，我们将不再查询、收集、共享或公开披露您的相应个人信息。但根据本隐私政策第一部分，您将无法使用相应的业务功能接受服务，同时根据《保险法》《反洗钱法》等法律法规、监管规定我们还将继续保存您的相关个人信息。您取消授权或变更的决定，不会影响此前基于您的授权而开展的个人信息处理。 </p>'
				+'<p>如果您拒绝接受我们给您发送的商业广告，您随时可通过以下方式取消：联系官网/人保V盟/中国人保微信公众号/各省分公司官方微信公众号的在线客服功能或使用短信退订功能，但我们依照法律法规、监管规定或单项服务的服务协议约定发送消息的情形除外。</p>'
				+'<b class="pt">（五）注销账户</b>'
				+'<p>您可以通过联系官网/人保V盟/中国人保微信公众号/各省分公司官方微信公众号的在线客服申请注销此前注册的账户。在您注销账户之后，我们将停止为您提供产品或服务，并依据您的要求删除您的个人信息，《保险法》《反洗钱法》等法律法规、监管规定另有规定的除外。</p>'
				+'<b class="pt">（六）获取个人信息副本 </b>'
				+'<p>您可以通过登录PC端或手机端官网，进入会员中心获得您的个人信息副本。</p>'
				+'<b class="pt">（七）约束信息系统自动决策</b>'
				+'<p>在某些业务功能中，我们可能仅依据信息系统、算法等非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将提供适当的救济方式。 </p>'
				+'<b class="pt">六、我们如何处理未成年人的个人信息</b>'
				+'<p class="pt">我们将根据国家关于未成年人网络保护的法律法规、监管规定处理未成年人的个人信息。如果没有父母或者其他监护人的同意，未成年人不得创建自己的用户账户。</p>'
				+'<p>对于经父母或其他监护人同意而收集未成年人个人信息的情况，我们只会在法律法规、监管规定允许、父母或其他监护人明确同意或者保护未成年人所必要的情况下使用或公开披露其个人信息。</p>'
				+'<p>如果我们发现自己在未事先获得可证实的父母或其他监护人同意的情况下收集了未成年人的个人信息，则会设法尽快删除相关数据，《保险法》《反洗钱法》等法律法规、监管规定另有规定的除外。</p>'
				+'<b class="pt">七、您的个人信息如何在全球范围转移 </b>'
				+'<p class="pt">我们在中华人民共和国境内收集、产生的个人信息和重要数据将在境内存储。如因业务需要，确需向境外提供的，我们将依据法律法规和监管规定的要求履行相关程序，并进行安全评估。</p>'
				+'<b class="pt">八、本政策如何更新 </b>'
				+'<p class="pt">我们的隐私政策将适时更新。未经您同意，我们不会减少您按照本隐私政策所享有的权利。我们会通过软件弹窗方式及时提示您隐私政策更新的情况，若您继续使用网络运营平台相关的功能，即意味着您同意本隐私政策（含更新版本）内容，并且同意我们按照本隐私政策查询、收集、对外共享、公开披露您的相关信息。</p>'
				+'<b class="pt">九、如何联系我们</b>'
				+'<p class="pt">我们设置了个人信息保护的专门部门/专门岗位人员。如果您对本隐私政策有任何疑问或任何相关的投诉、意见，请通过联系官网、分公司微信公众号在线客服或拨打人保V盟联系电话400-1234567转8、95518客户服务热线与我们联系。</p>'
				+'<b class="pt">十、关键词解释</b>'
				+'<p class="pt">人保集团：指中国人民保险集团股份有限公司及其作为控股股东、实际控制人的公司，包括但不限于中国人民保险集团股份有限公司、中国人民财产保险股份有限公司、中国人保资产管理有限公司、中国人民健康保险股份有限公司、中国人民人寿保险股份有限公司、人保投资控股有限公司、人保资本投资管理有限公司、人保金融服务有限公司、人保再保险股份有限公司、中国人民养老保险有限责任公司、中盛国际保险经纪有限责任公司；以及上述公司直接或间接控股的公司，包括但不限于人保汽车保险销售服务有限公司、人保社区保险销售服务有限公司、保互通（北京）有限公司、中美国际保险销售服务有限责任公司、重庆人保小额贷款有限责任公司、人保北方信息中心管理有限公司等。</p>'
				+'<p class="pt">个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。包括个人基本资料、身份信息、生物识别信息、网络身份标识信息、健康生理信息、教育工作信息、财产信息、通信信息、联系人信息、上网记录、常用设备信息、位置信息和其他个人信息。</p>'
				+'<p class="pt">个人敏感信息：指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。包括个人财产信息、健康生理信息、生物识别信息、身份信息、网络身份标识信息和其他信息。</p>'
			+'</div>'
			+'</div>'
			+'<p class="lay_tip_streamer">注册并使用网站功能需同意本授权</p>'
			+'<div class="privacy-btn-box">'
				+'<a href="javascript:;" class="privacy-btn privacy-btn-cancel">取消</a>'
				+'<a href="javascript:;" class="privacy-btn" onclick="agreeAndAuth();" id="agreeAndAuthBtn">同意并授权</a>'
			+'</div>'
		+'</div>'
	+'</div>'
	return box;
}

function hideYsqyBox() {
	$("#ysqyBox").hide();
	$("#ysqyMask").hide();
}

function hideYsqyInfoBox() {
	$("#privacyInfoBox").hide();
	$("#ysqyMask").hide();
	var code = $(".ysqy-lay-close").attr("value");
	if("0" == code) {
		window.location.href="/";
	}else if("2" == code) {
		cancleYsqy();
	}else if("login" == code || "popLogin" == code){
		exitSSO("noConsole");
	}
}

function cancleYsqy() {
	$.ajax({
		url:'/newecenter/privacy/cancleAuth.do?n=' + Math.random(),
		type:'post',
		dateType:'json',
		contentType:'application/x-www-form-urlencoded;charset=utf-8',
		success:function(data){
			exitSSO("noConsole");
		},   
		error:function(){}   
	});
}

function agreeAndAuth() {
	if($("#agreeAndAuthBtn").hasClass("privacy-btn-agree")){
		var flag = $(".ysqy-lay-close").attr("value");
		if("0" == flag) {
			$(".ysqy-lay-close").attr("value","1");
			hideYsqyInfoBox();
			return;
		}
		if("popLogin" == flag) {
			try{
				doLoginSuccess(logSucData);
			}catch(e){}
		}
		$.ajax({
			url:'/newecenter/privacy/agreeAuth.do?n=' + Math.random(),
			type:'post',
			dateType:'json',
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			success:function(data){
				$("#privacyInfoBox").hide();
				$("#ysqyMask").hide();
				if(window.location.href.indexOf("/idprovider/") < 0) {
					addYsqyTop();
					if(typeof agreeAndAuthAfter == 'function') {
						agreeAndAuthAfter();
					}
				}else {
					submitLogonForm();
				}
			},   
			error:function(){}   
		});
	}
}
function bannerRe(arr) {
	var now=new Date();
	for(var i=0;i<$('.img_wrapper li').size();i++){
		if(arr[i]){
			var start=new Date(arr[i]);
			if(now<start){
				$('.img_wrapper li').eq(i).remove();
				$('.slide_trigger li').eq(i).remove();
				$('.slide_bg li').eq(i).remove();
			}
		}
		
	}
}

//首页右侧待处理任务
function ecenterOrderNum(name){
	$.ajax({
		url : '/newecenter/entry/homePageEcenter.do?next='+Math.random(),
		type : 'post',
		async: true,
		contentType : 'application/x-www-form-urlencoded;charset=utf-8',
		success : function(data) {
			if(data==undefined||data==""){
				data="0,0";
			}
			var nums = data.split(",");
			$("#car_login_name").text(name);
			$("#car_login_insurance").text(nums[0]);
			$("#car_login_nopay").text(nums[1]);
			$(".car-login").hide();
			$(".car-login-win").removeClass("hide");
		},
		error : function() {
		}
	});
}