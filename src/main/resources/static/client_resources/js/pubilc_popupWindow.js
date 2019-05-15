
function changeLogin() {
	var $scrollTop = $(window).scrollTop();
	// 遮罩层
	var newMask = document.createElement("div");
	newMask.id = "mask";
	newMask.style.position = "fixed";
	newMask.style.zIndex = "99999";
	_scrollWidth = Math.max(document.body.scrollWidth,
			document.documentElement.scrollWidth);
	_scrollHeight = Math.max(document.body.clientHeight,
			document.documentElement.clientHeight);
	_scrollHeight = Math.max(_scrollHeight, window.screen.availHeight);
	newMask.style.filter = "alpha(opacity=50)";
	newMask.style.opacity = "0.5";
	newMask.style.width = '100%';
	newMask.style.height = '100%';
	newMask.style.top = "0px";
	newMask.style.left = "0px";
	newMask.style.background = "#000";
	document.body.appendChild(newMask);
	var divLogin = document.createElement("div");
	divLogin.id = "divLogin";
	divLogin.style.position = "fixed";
	divLogin.style.left = "50%";
	divLogin.style.top = "6%";
	divLogin.style.width = "440px";
	divLogin.style.marginLeft = "-216px";
	divLogin.style.height = "522px";
	divLogin.style.zIndex = "100000";
	var ifra = document.createElement("iframe");
	ifra.id = "loginIframe";
	ifra.setAttribute("allowtransparency", "true");
	ifra.setAttribute("frameBorder", 0);
	ifra.setAttribute("scrolling", "no");
	ifra.style.width = "100%";
	ifra.src = "/idprovider/views/PopupWindowLogin.html";
	ifra.style.height = "100%";
	ifra.style.backgroundColor = "transparent";
	divLogin.appendChild(ifra);
	document.body.appendChild(divLogin);
}

function openPopWindowWithUrl(iframeSrc) {
	var $scrollTop = $(window).scrollTop();
	// 遮罩层
	var newMask = document.createElement("div");
	newMask.id = "mask";
	newMask.style.position = "fixed";
	newMask.style.zIndex = "99999";
	_scrollWidth = Math.max(document.body.scrollWidth,
			document.documentElement.scrollWidth);
	_scrollHeight = Math.max(document.body.clientHeight,
			document.documentElement.clientHeight);
	_scrollHeight = Math.max(_scrollHeight, window.screen.availHeight);
	newMask.style.filter = "alpha(opacity=50)";
	newMask.style.opacity = "0.5";
	newMask.style.width = '100%';
	newMask.style.height = '100%';
	newMask.style.top = "0px";
	newMask.style.left = "0px";
	newMask.style.background = "#000";
	document.body.appendChild(newMask);
	var divLogin = document.createElement("div");
	divLogin.id = "divLogin";
	divLogin.style.position = "fixed";
	divLogin.style.left = "50%";
	divLogin.style.top = "6%";
	divLogin.style.width = "440px";
	divLogin.style.marginLeft = "-216px";
	divLogin.style.height = "522px";
	divLogin.style.zIndex = "100000";
	var ifra = document.createElement("iframe");
	ifra.id = "loginIframe";
	ifra.setAttribute("allowtransparency", "true");
	ifra.setAttribute("frameBorder", 0);
	ifra.setAttribute("scrolling", "no");
	ifra.style.width = "100%";
	ifra.src = iframeSrc;
	ifra.style.height = "100%";
	ifra.style.backgroundColor = "transparent";
	divLogin.appendChild(ifra);
	document.body.appendChild(divLogin);
}

//车险用
function openPopWindowForCheXian(loginType){
	var $scrollTop = $(window).scrollTop();
	//遮罩层
	var newMask = document.createElement("div");
    newMask.id = "mask";
    newMask.style.position = "fixed";
    newMask.style.zIndex = "99999";
    if(loginType != 1) {
    	 newMask.className = "login_mask";
    }
    _scrollWidth = Math.max(document.body.scrollWidth,document.documentElement.scrollWidth);
	_scrollHeight = Math.max(document.body.clientHeight,document.documentElement.clientHeight);
	_scrollHeight = Math.max(_scrollHeight, window.screen.availHeight);
	newMask.style.width = '100%';
	newMask.style.height = '100%';
	newMask.style.top = "0px";
	newMask.style.left = "0px";
	newMask.style.background = "#000";
	newMask.style.filter = "alpha(opacity=50)";
	newMask.style.opacity = "0.5";
	document.body.appendChild(newMask);
	var divLogin = document.createElement("div");
	divLogin.id = "divLogin";
	divLogin.style.position = "fixed";
	divLogin.style.left = "50%";
	divLogin.style.top = "6%";
    var ifra = document.createElement("iframe");
	ifra.id = "loginIframe";
	ifra.style.backgroundColor = "transparent";
	ifra.setAttribute("allowtransparency", "true");
	ifra.setAttribute("frameBorder", 0);
	ifra.setAttribute("scrolling", "no");
	ifra.style.width = "100%";
	if(loginType == 1){
		divLogin.style.width = "440px";
		divLogin.style.marginLeft = "-216px";
		divLogin.style.height = "522px";
		divLogin.style.zIndex = "100000";
		ifra.src = "/idprovider/views/PopupWindowLogin.html";
		ifra.style.height = "100%";
	}else {
	    divLogin.style.width = "436px";
	    divLogin.style.marginLeft = "-218px";
	    divLogin.style.zIndex="100000";
		if(loginType==2){
			ifra.src="/ecenter/views/ecenterClub/loginRegisterNew/support/TravelwelcomeRegister.jsp";
			ifra.style.height = "625px";
		}else if(loginType==3){
			ifra.src="/ecenter/views/ecenterClub/loginRegisterNew/support/TravelwelcomeLoginIntegralOrderPromptnew.jsp";
			ifra.style.height = "200px";
		}else if(loginType==4){
			ifra.src="/ecenter/views/ecenterClub/loginRegisterNew/support/TravelwelcomeLoginIntegralOrder.jsp";
			ifra.style.height = "474px";
		}else if(loginType==5){
			ifra.src="/ecenter/views/ecenterClub/loginRegisterNew/support/TravelwelcomeGjZhuCeIntegralOrderPrompt.jsp";
			ifra.style.height = "200px";
		}else if(loginType==6){
			ifra.src="/ecenter/views/ecenterClub/loginRegisterNew/support/TravelwelcomeLoginIntegralOrderPrompt.jsp";
			ifra.style.height = "220px";
		}
	}
	divLogin.appendChild(ifra);
	document.body.appendChild(divLogin);
}

function IETester(userAgent) {
	var UA = userAgent || navigator.userAgent;
	if (/msie/i.test(UA)) {
		return UA.match(/msie (\d+\.\d+)/i)[1];
	} else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
		return UA.match(/rv:(\d+\.\d+)/)[1];
	}
	return false;
}

//关闭弹层
function closePopLogin() {
	try {
		var hostport=window.parent.location.href; 
		if (hostport.indexOf("continue") >= 0 || hostport.indexOf("questionnaire") >= 0 || hostport.indexOf("carOffer") >= 0 || hostport.indexOf("inputInformation") >= 0 || hostport.indexOf("fillInInformation") >= 0) {   
			window.parent.closeBox();
		}
	} catch (e) {
	}
	try {
		if (IETester()) {
			window.parent.document.getElementById("mask").removeNode(true);
			window.parent.document.getElementById("divLogin").removeNode(true);
			window.parent.document.getElementById("loginIframe").removeNode(true);
		} else {
			window.parent.document.getElementById("mask").remove();
			window.parent.document.getElementById("divLogin").remove();
			window.parent.document.getElementById("maskIframe").remove();
		}
	} catch (e) {
	}
}