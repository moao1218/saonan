

//登陆成功后,顶部显示状态更新
var beforeLogonT = '<span id="vtop"><span>您好，欢迎来到人保！</span><span>[ <a href="javascript:newLogin();">登录</a> ] </span><span>[ <a href="/ecenter/views/ecenterClub/loginRegisterNew/register.jsp">免费注册</a> ] </span></span>';
var afterLogonT = '<span>&nbsp;<a href="#" onclick="exitSSO();">[退出]</a></span>';
var beforeLogonR = '';
var afterLogonR = '';

var vtop = window.parent.document.getElementById("vtop");//头部;
var vright = window.parent.document.getElementById("vright");//头部右侧;
function loginSuccessChangeTop(uname,nickname) {
	if(vtop != null){
		//vtop.style.display = 'inline-block';
		if(document.getElementById('addPlanFrame')){
			document.getElementById('addPlanFrame').contentWindow.document.getElementById('entryID').value=uname; 
		}
		 vtop.style.width = '100%';
		if(nickname !=""){
			vtop.innerHTML = '<span>您好，' + (nickname.length > 30 ? (nickname.substring(0,30) + '..'):nickname) + '&nbsp;&nbsp;</span>' + afterLogonT;
			//vtop.innerHTML = '<span class="welcome" style="display:inline-block;height:29px;line-height:29px;vertical-align:middle;">您好，' + (nickname.length > 30 ? (nickname.substring(0,30) + '..'):nickname) + '&nbsp;&nbsp;</span>' + afterLogonT;
		}else{
			vtop.innerHTML = '<span>您好，' + (uname.length > 30 ? (uname.substring(0,30) + '..'):uname)+ '&nbsp;&nbsp;</span>' + afterLogonT;
			//vtop.innerHTML = '<span class="welcome" style="display:inline-block;height:29px;line-height:29px;vertical-align:middle;">您好，' + (uname.length > 30 ? (uname.substring(0,30) + '..'):uname)+ '&nbsp;&nbsp;</span>' + afterLogonT;
		}
	}

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
	$("#entryId").val(data.entryId);
	$("#zentryId").val(data.entryId);
	setTimeout(function (){
		closePopLogin();
	}, 300);
	addentryId(data.nickName,data.entryId);
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