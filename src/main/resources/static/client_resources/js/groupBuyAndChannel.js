$(function() {
	 //通过注册邮件链接过来的参数
	 //登录前先判断是否已经登录
	 if(document.getElementById("entryId")){
		  var entryId = document.getElementById("entryId").value==null?"":document.getElementById("entryId").value;
		  var channleType = getQueryString('channleType')==null?"":getQueryString('channleType');
			  if(entryId==""&&channleType!=""&&channleType=="emailToLand"){ 
			      changeLogin(1);
			  }
		 
		 //通过非会员邮件链接过来的参数
		  var byEmail = getQueryString('byEmail')==null?"":getQueryString('byEmail');
		 if(byEmail!=""&&byEmail=="byEmail"){
		      //调用注册的方法
		      changeLogin(2);openlogin_div(2);
		 }
	 }
	 document.getElementById("channelType").value = getQueryString('channelType')==null?"":getQueryString('channelType');
	 document.getElementById("channelCode").value = getQueryString('channelCode')==null?"":getQueryString('channelCode');
	 
	 if(getQueryString('channelweb')!=null&&getQueryString('channelweb')!=""){
		 if(getQueryString('channelweb')=="out"){
			 
			 $("#travelSelect>option[value=11]").attr("selected","true");
			 $("#visiteCity").show();
			  
			 var travelSelect=$("#travelSelect").val();
			 var riskCode=$("#select_riskCode").val();
			 
			 if(travelSelect==01){//境内旅行	
				 $("#productCode").val(riskCode);//产品代码
				 $("#riskCode").val(riskCode.split("_")[0]);   //险种代码
			 }else{              //境外旅行
				 if("EAK_U"==riskCode){
					 $("#productCode").val("EAJ");//产品代码
					 $("#riskCode").val("EAJ");   //险种代码
				 }else if("EAJ_S"==riskCode){
					 $("#productCode").val("EAJ_S");//产品代码
					 $("#riskCode").val("EAJ");   //险种代码
				 }else if("EAG_T"==riskCode){
					 $("#productCode").val("EAG_V");//产品代码
					 $("#riskCode").val("EAG");   //险种代码
				 }
			 }
		 }
	 }
	 
	 
	if(getQueryString('cmpid')!=null&&getQueryString('cmpid')!=""){
		document.getElementById("cmpid").value = getQueryString('cmpid');
	}else if(document.getElementById("cmpidForZ").value!=null){
		  document.getElementById("cmpid").value = document.getElementById("cmpidForZ").value;
	}
	if(document.getElementById("groupBuyId").value!="null"&&document.getElementById("groupBuyId").value!=""){

		if(document.getElementById("cityCode").value == "44710000"){
			document.getElementById("cityCode").value = "44060000";
		}
		var areacode=document.getElementById("cityCode").value;
		var valname = document.getElementById("city_Name").value;
		var flag=document.getElementById("flag").value;
		if(flag!="11"){	//非车坐席链接不锁定城市 add by panyong 20130307
			$(".proCityQuery_feiche").val(valname);
			$("#city_input_feiche1").val(valname);
			$(".proCityQuery_feiche").attr("disabled",true);
			$("#city_input_feiche1").attr("disabled",true);
			$('#areacode').val(areacode);
		}
	}	
});



function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
 

