
/**测试环境添加代码**/
var trkPageName="";
var trkChannel="";
var trkProp1="";
var trkProp2="";
var trkProducts="";
var trkstepCName="首页";
var trkproductCName = "";//前面五个是规定的参数，这个参数用于函数调用时的参数
var trkoldcustomer= "";
var productcodeInsght = $("#productcode").val();
/**测试环境添加代码end**/
function setInsightMeters(){
	
	var processbarInsght = $("#processbar").val();
	if("Intro"==processbarInsght||"Calc"==processbarInsght){
		if("SEZJ" == productcodeInsght){
			trkstepCName = "保费试算";
		}else{
			trkstepCName = "报价";
		}
	}else if("Input"==processbarInsght||"Info"==processbarInsght){
	        trkstepCName = "信息填写";
	}else if("Confirm"==processbarInsght){
		trkstepCName = "投保确认";
	}else if("Survey" == processbarInsght){
		if("BWSJ"==productcodeInsght){
			trkstepCName = "健康告知";
		}else if("SEZJ"==productcodeInsght){
			trkstepCName = "投保告知";
		}
		
	}else if("Continue" == processbarInsght){
		if("EJQ_Z"==productcodeInsght||"EFFEFG"==productcodeInsght||"EJQ_H"==productcodeInsght){
			trkstepCName = "投保确认页";//eja_z  effefg
		}
	}
	if($("#oldproposalno").val()!=''){
	
		trkoldcustomer = "老客户";
		
	}
	if("YEH"==productcodeInsght){
		trkPageName="非车险:行李保险:国内航空旅客行李保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:行李保险";
		trkProp2="非车险:行李保险:国内航空旅客行李保险";
		trkProducts="行李保险;国内航空旅客行李保险";
		trkproductCName = "国内航空旅客行李保险";
	}else if ("YEJ" == productcodeInsght) {
		trkPageName="非车险:行李保险:国内公路随车行李保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:行李保险";
		trkProp2="非车险:行李保险:国内公路随车行李保险";
		trkProducts="行李保险;国内公路随车行李保险";
		trkproductCName = "国内公路随车行李保险";
	} 
	else if("ZKF"==productcodeInsght){
		trkPageName="非车险:家庭保险:监护人责任保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:监护人责任保险";
		trkProducts="家庭保险;监护人责任保险";
		trkproductCName = "监护人责任保险";
	}
	else if("ZAF"==productcodeInsght){
		trkPageName="非车险:家庭保险:宠物责任险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:宠物责任险";
		trkProducts="家庭保险;宠物责任险";
		trkproductCName = "宠物责任险";
	}
	else if("EFFEFG"==productcodeInsght){
		trkPageName="非车险:意外保险:人身意外险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:人身意外险";
		trkProducts="意外保险;人身意外险";
		trkproductCName = "人身意外险";
	}
	else if("EJQ_Z"==productcodeInsght){
		trkPageName="非车险:意外保险:交通工具意外险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:交通工具意外险";
		trkProducts="意外保险;交通工具意外险";
		trkproductCName = "交通工具意外险";
	}
	else if("EJQ_H"==productcodeInsght){
		trkPageName="非车险:意外保险:航空旅客意外伤害年度保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:航空旅客意外伤害年度保险";
		trkProducts="意外保险;航空旅客意外伤害年度保险";
		trkproductCName = "航空旅客意外伤害年度保险";
	}
	else if("EAG_V"==productcodeInsght){
		trkPageName="非车险:旅游保险:e-四海商务行保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-四海商务行保险";
		trkProducts="旅游保险;e-四海商务行保险";
		trkproductCName = "e-四海商务行保险";
	}
	else if("EAJ_S"==productcodeInsght){
	  	trkPageName="非车险:旅游保险:欧洲旅游保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:欧洲旅游保险";
		trkProducts="旅游保险;欧洲旅游保险";
		trkproductCName = "欧洲旅游保险";
	}
	else if("EAJ"==productcodeInsght){
		trkPageName="非车险:旅游保险:e-四海逍遥游保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-四海逍遥游保险";
		trkProducts="旅游保险;e-四海逍遥游保险";
		trkproductCName = "e-四海逍遥游保险";
	}
	else if("EAG_T"==productcodeInsght){
		trkPageName="非车险:旅游保险:e-神州商务行保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-神州商务行保险";
		trkProducts="旅游保险;e-神州商务行保险";
		trkproductCName = "e-神州商务行保险";
	}
	else if("JBS"==productcodeInsght){
		trkPageName="非车险:旅游保险:航空延误损失综合保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:航空延误损失综合保险";
		trkProducts="旅游保险;航空延误损失综合保险";
		trkproductCName = "航空延误损失综合保险";
	}
	else if("EAK_G"==productcodeInsght){
		trkPageName="非车险:旅游保险:e-国内高原险保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-国内高原险保险";
		trkProducts="旅游保险;e-国内高原险保险";
		trkproductCName = "e-国内高原险保险";
	}
	else if("EAK_U"==productcodeInsght){
		trkPageName="非车险:旅游保险:e-神州逍遥游保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-神州逍遥游保险";
		trkProducts="旅游保险;e-神州逍遥游保险";
		trkproductCName = "e-神州逍遥游保险";
	}
	else if("EAK_X"==productcodeInsght){
		trkPageName="非车险:旅游保险:e-神州自驾游保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-神州自驾游保险";
		trkProducts="旅游保险;e-神州自驾游保险";
		trkproductCName = "e-神州自驾游保险";
	}
	else if("LAY_N"==productcodeInsght){
		trkPageName="非车险:旅游保险:北美旅游险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:北美旅游险";
		trkProducts="旅游保险;北美旅游险";
		trkproductCName = "北美旅游险";
	}else if("LAY_J"==productcodeInsght){
		trkPageName="非车险:旅游保险:日韩旅游险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:日韩旅游险";
		trkProducts="旅游保险;日韩旅游险";
		trkproductCName = "日韩旅游险";
	}else if("LAY_A"==productcodeInsght){
		trkPageName="非车险:旅游保险:澳新旅游险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:澳新旅游险";
		trkProducts="旅游保险;澳新旅游险";
		trkproductCName = "澳新旅游险";
	}else if("LAY_G"==productcodeInsght){
		trkPageName="非车险:旅游保险:港澳台旅游险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:港澳台旅游险";
		trkProducts="旅游保险;港澳台旅游险";
		trkproductCName = "港澳台旅游险";
	}else if("JAB_A"==productcodeInsght){
		trkPageName="非车险:家庭保险:家庭财产综合保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:家庭财产综合保险";
		trkProducts="家庭保险;家庭财产综合保险";
		trkproductCName = "家庭财产综合保险";
		
	}else if("LDT_E"==productcodeInsght){
		trkPageName="非车险:家庭保险:美满e家组合险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:美满e家组合险";
		trkProducts="家庭保险;美满e家组合险";
		trkproductCName = "美满e家组合险";
	}else if("BWSJ" == productcodeInsght){
		  	trkPageName="非车险:人身保险:百万身价惠民两全保险:"+trkoldcustomer+trkstepCName;
			trkChannel="非车险";
			trkProp1="非车险:人身保险";
			trkProp2="非车险:人身保险:百万身价惠民两全保险";
			trkProducts="人身保险;百万身价惠民两全保险";
			trkproductCName = "百万身价惠民两全保险";
	  }else if("SEZJ"==productcodeInsght){
			trkPageName="非车险:人身保险:未成年人重大疾病保险:"+trkoldcustomer+trkstepCName;
			trkChannel="非车险";
			trkProp1="非车险:人身保险";
			trkProp2="非车险:人身保险:未成年人重大疾病保险";
			trkProducts="人身保险;未成年人重大疾病保险";
			trkproductCName = "未成年人重大疾病保险";
	}else if("LEF"==productcodeInsght){
			trkPageName="非车险:企业保险:创业保:"+trkoldcustomer+trkstepCName;
			trkChannel="非车险";
			trkProp1="非车险:企业保险";
			trkProp2="非车险:企业保险:创业保";
			trkProducts="企业保险;创业保";
			trkproductCName = "创业保";
	}else if("LXL"==productcodeInsght){
		trkPageName="非车险:企业保险:金福保:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:企业保险";
		trkProp2="非车险:企业保险:金福保";
		trkProducts="企业保险;金福保";
		trkproductCName = "金福保";
	}else if ("EDD_J" == productcodeInsght) {
			trkPageName="非车险:意外保险:驾乘综合意外险:"+trkoldcustomer+trkstepCName;
			trkChannel="非车险";
			trkProp1="非车险:意外保险";
			trkProp2="非车险:意外保险:驾乘综合意外险";
			trkProducts="意外保险;驾乘综合意外险";
			trkproductCName = "驾乘综合意外险";
	} else if ("EDD_Z" == productcodeInsght) {
			trkPageName="非车险:意外保险:交通综合年度意外险:"+trkoldcustomer+trkstepCName;
			trkChannel="非车险";
			trkProp1="非车险:意外保险";
			trkProp2="非车险:意外保险:交通综合年度意外险";
			trkProducts="意外保险;交通综合年度意外险";
			trkproductCName = "交通综合年度意外险";
	}else if ("JBD_B" == productcodeInsght) {
		trkPageName="非车险:家庭保险:个人账户资金安全保险:"+trkoldcustomer+trkstepCName;
			trkChannel="非车险";
			trkProp1="非车险:家庭保险";
			trkProp2="非车险:家庭保险:个人账户资金安全保险";
			trkProducts="家庭保险;个人账户资金安全保险";
			trkproductCName = "个人账户资金安全保险";
	}else if ("JMA" == productcodeInsght) {
		trkPageName="非车险:家庭保险:储金型家庭综合保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:储金型家庭综合保险";
		trkProducts="家庭保险;储金型家庭综合保险";
		trkproductCName = "储金型家庭综合保险";
	}else if ("LAY_H" == productcodeInsght) {
		trkPageName="非车险:旅游保险:海南旅游保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:海南旅游保险";
		trkProducts="旅游保险;海南旅游保险";
		trkproductCName = "海南旅游保险";
	} else if("JCA" == (productcodeInsght)){
		trkPageName="非车险:家庭保险:四川省城乡居民住房地震保险"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险 ";
		trkProp2="非车险:家庭保险:四川省城乡居民住房地震保险";
		trkProducts="家庭保险;四川省城乡居民住房地震保险";
		trkproductCName="四川省城乡居民住房地震保险";
	} else if ("JCO" == productcodeInsght) {
		trkPageName="非车险:家庭保险:城乡居民住宅地震巨灾保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:城乡居民住宅地震巨灾保险";
		trkProducts="家庭保险;城乡居民住宅地震巨灾保险";
		trkproductCName = "城乡居民住宅地震巨灾保险";
	} else if ("YXL" == productcodeInsght) {
		trkPageName="非车险:行李保险:随人行李定期保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:行李保险";
		trkProp2="非车险:行李保险:随人行李定期保险";
		trkProducts="行李保险;随人行李定期保险";
		trkproductCName = "随人行李定期保险";
	} else if("ECK"==productcodeInsght){
		trkPageName="非车险:意外保险:中老年人骨折保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:中老年人骨折保险";
		trkProducts="意外保险;中老年人骨折保险";
		trkproductCName = "中老年人骨折保险";
	} else if("YEHKM"==productcodeInsght){
		trkPageName="非车险:行李保险:航空旅客行李保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:行李保险";
		trkProp2="非车险:行李保险:航空旅客行李保险";
		trkProducts="行李保险;航空旅客行李保险";
		trkproductCName = "航空旅客行李保险";
	}else if("EAL_L"==productcodeInsght){
		trkPageName="非车险:意外保险:境外留学生意外险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:境外留学生意外险";
		trkProducts="意外保险;境外留学生意外险";
		trkproductCName = "境外留学生意外险";
	}else if("JTE_S"==productcodeInsght){
		trkPageName="非车险:家庭保险:碎屏安心保:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:碎屏安心保";
		trkProducts="家庭保险;碎屏安心保";
		trkproductCName = "碎屏安心保";
	}else if("WAF_N"==productcodeInsght){
		trkPageName="非车险:意外保险:女性特定疾病保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:女性特定疾病保险";
		trkProducts="意外保险;女性特定疾病保险";
		trkproductCName = "女性特定疾病保险";
	}else if("JBM_S"==productcodeInsght){
		trkPageName="非车险:家庭保险:管道破裂及水渍险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:管道破裂及水渍险";
		trkProducts="家庭保险;管道破裂及水渍险";
		trkproductCName = "管道破裂及水渍险";
	}else if("EAJ_G"==productcodeInsght){
		trkPageName="非车险:旅游保险:港澳台旅游保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:港澳台旅游保险";
		trkProducts="旅游保险;港澳台旅游保险";
		trkproductCName = "港澳台旅游保险";
	}else if("EAJ_Y"==productcodeInsght){
		trkPageName="非车险:旅游保险:亚洲旅游保险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:亚洲旅游保险";
		trkProducts="旅游保险;亚洲旅游保险";
		trkproductCName = "亚洲旅游保险";
	}
	else if("ZFO"==productcodeInsght){
		trkPageName="非车险:家庭保险:家庭成员责任险:"+trkoldcustomer+trkstepCName;
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:家庭成员责任险";
		trkProducts="家庭保险;家庭成员责任险";
		trkproductCName = "家庭成员责任险";
	}
}
//除首页以外的其他页面监控
function insightPage(){
	  //最外层加一个判断，是否是测试环境--------------------------------------
    /////////////////////////////////////////////////////////////////
    var flag="true";//变量为true标示是测试环境
	var user_url = window.location.toString();
	/*if(user_url.indexOf("http://www.epicc.com.cn") > -1||user_url.indexOf("11.201.1.18") > -1||user_url.indexOf("99.3") > -1
   		||user_url.indexOf("99.4") > -1||user_url.indexOf("62.3") > -1||user_url.indexOf("62.4") > -1){
		flag = "false";
	}*/
    if("true"== flag){
    	//var productcode = $("#productcode").val();
	    if(trkstepCName == "报价"){
	    	var items = $("#items").val();
	    	var extensioninfo = $("#extensioninfo").val();
	    	var itemsCName = "";
	    	if(productcodeInsght == "ZAF"|| productcodeInsght == "ZKF"){
		    	if(items == "ZAF0000001"||items == "ZKF000000m"){
		    		itemsCName = "套餐一";
		    	}else if(items == "ZAF0000002"||items == "ZKF000000n"){
		    		itemsCName = "套餐二";
		    	}else if(items == "ZAF0000003"||items == "ZKF000000o"){
		    		itemsCName = "套餐三";
		    	}else if(items == "ZKF000000p"){
		    		itemsCName = "套餐四";
		    	}
	    	}else if(productcodeInsght == "JMA"){
		    	if(items == "JMA0000002"){
		    		itemsCName = "A类地区";
		    	}else if(items == "JMA0000002"){
		    		itemsCName = "B类地区";
		    	}else if(items == "JMA0000002"){
		    		itemsCName = "C类地区";
		    	}
	    	}else if(productcodeInsght == "JAB_A"){
		    	if(extensioninfo == "t"){
		    		itemsCName = "经济型";
		    	}else if(extensioninfo == "u"){
		    		itemsCName = "豪华型";
		    	}else if(extensioninfo == "f"){
		    		itemsCName = "自由定制";
		    	}
	    	}else if(productcodeInsght == "LDT_E"){
	    		if($("#peopCheck").hasClass('active')){
	    			itemsCName += "家庭财产保险,";
	    		}
	    		if($("#responCheck").hasClass('active')){
	    			itemsCName += "责任保险,";
	    		}
	    		if($("#homeCheck").hasClass('active')){
	    			itemsCName += "人身险,";
	    		}
	    		if(itemsCName !=""){
	    			var length = itemsCName.length;
	    			itemsCName = itemsCName.substring(0,length-1);
	    		}
	    	}else if(productcodeInsght == "YEH"){
	    		if(items == "0000006"){
		    		itemsCName = "2000元";
		    	}else if(items == "0000007"){
		    		itemsCName = "3000元";
		    	}else if(items == "0000008"){
		    		itemsCName = "5000元";
		    	}else if(items == "0000009"){
		    		itemsCName = "10000元";
		    	}
	    	}else if(productcodeInsght == "YEJ"){
	    		itemsCName=$("#"+items+"btn").parent().find("b").eq(0).html();	
	    	}else if(productcodeInsght == "EJQ_H"){
	    		if(items == "020"){
		    		itemsCName = "套餐一";
		    	}else if(items == "040"){
		    		itemsCName = "套餐二";
		    	}else if(items == "060"){
		    		itemsCName = "套餐三";
		    	}else if(items == "080"){
		    		itemsCName = "套餐四";
		    	}else if(items == "100"){
		    		itemsCName = "套餐五";
		    	}else if(items == "150"){
		    		itemsCName = "套餐六";
		    	}else if(items == "200"){
		    		itemsCName = "套餐七";
		    	}
	    	}else if(productcodeInsght == "EJQ_Z"){	    		
		    		itemsCName = items+"万";
	    	}else if(productcodeInsght == "EFFEFG"){
	    		if(items=="EFF0000001"){
		    		itemsCName = "顺心保A款（半年）";
		    	}else if(items=="EFF0000002"){
		    		itemsCName = "顺心保B款（一年）";
		    	}else if(items=="EFG0000001"){
		    		itemsCName = "舒心保A款（半年）";
		    	}else if(items=="EFG0000002"){
		    		itemsCName = "舒心保B款（一年）";
		    	}else if(items=="EFG0000003"){
		    		itemsCName = "舒心保C款（一年）";
		    	}
	    	}else if(productcodeInsght == "LAY_G"||productcodeInsght == "LAY_N"	    	
	    	||productcodeInsght == "LAY_A"||productcodeInsght == "LAY_J"||productcodeInsght == "LAY_H"){
	    		var itemsJson = JSON.parse($("#items").val());
		    	$.each(itemsJson,function(key,value){
					if(key == "choosePlan"){
						if(value=="A"){
							itemsCName ="跟团游,基础型";
						}else if(value=="B"){
							itemsCName ="跟团游,豪华型";
						}else if(value=="C"){
							itemsCName ="自由行,基础型";
						}else if(value=="D"){
							itemsCName ="自由行,豪华型";
						}else if(value=="E"){
							itemsCName ="自选型,自由组合";
						}
					}
		    	});
	    	}else if(productcodeInsght == "EAK_U"||productcodeInsght == "EAG_T"||productcodeInsght == "EAJ"
	    	||productcodeInsght == "EAG_V"||productcodeInsght == "EAJ_S"||productcodeInsght == "EDD_J"||productcodeInsght == "EDD_Z"){
	    		if(items == "BM"||items=="P"||items=="E"||items=="I"||items=="13"||items=="08"){
	    			itemsCName = "经济型";
	    		}else if(items =="BN"||items=="Q"||items=="F"||items=="J"||items=="14"||items=="09"){
	    			itemsCName = "舒适型";
	    		}else if(items =="BO"||items=="R"||items=="G"||items=="K"||items=="23"||items=="22"){
	    			itemsCName = "豪华型";
	    		}else if(items =="H"||items=="L"){
	    			itemsCName = "至尊型";
	    		}
	    	}else if("YXL" == productcodeInsght){
	    		var itemsJson = JSON.parse($("#items").val());
		    	$.each(itemsJson,function(key,value){
					if(key == "insurancecategory"){
						if(value=="A"){
							itemsCName ="至尊保障";
						}else if(value=="B"){
							itemsCName ="优选保障";
						}else if(value=="C"){
							itemsCName ="经济保障";
						}
					}
		    	});
	    	}else if("YEHKM" == productcodeInsght){
	    		var riskCode = $("#riskcode").val();
	    		var inOutSide = $("#inoutside").val();
	    		var itemsCNameStr = "";
		    	if("YEM" == riskCode){
		    		itemsCNameStr = "定期,";
		    	}else{
		    		itemsCNameStr = "单次,";
		    	}
		    	if("02" == inOutSide){
		    		itemsCNameStr += "境外";
		    	}else{
		    		itemsCNameStr += "境内";
		    	}
		    	itemsCName = itemsCNameStr;
	    	}else if("JBM_S" == productcodeInsght){
	    		if(items=="JBM0001351"){
		    		itemsCName = "经济型";
		    	}else if(items=="JBM0001352"){
		    		itemsCName = "舒适型";
		    	}
	    	}else if("EAL_L" == productcodeInsght){
	    		var itemsJson = JSON.parse($("#items").val());
		    	$.each(itemsJson,function(key,value){
					if("choosePlan" == key){
						if(value=="A"){
							itemsCName ="经济型";
						}else if(value=="B"){
							itemsCName ="豪华型";
						}else if(value=="C"){
							itemsCName ="私人订制";
						}
					}
		    	});
	    	}else if("JTE_S" == productcodeInsght){
	    		var itemsJson = JSON.parse($("#items").val());
		    	$.each(itemsJson,function(key,value){
					if("choosePlan" == key){
						if(value=="A"){
							itemsCName ="普惠版";
						}else if(value=="B"){
							itemsCName ="尊享版";
						}
					}
		    	});
	    	}
	    	if(productcodeInsght !="JBS"){
	    		trkInsurancePlan(trkproductCName+":"+itemsCName);
	    	}
	    }else if(trkstepCName == "信息填写"){
	    	var items = $("#items").val();
	    	var extensioninfo = $("#extensioninfo").val();
	    	var itemsCName = "";
	    	var applyName = $("#input_applyName").val();
	    	//获取证件类型
	    	var applyIDType = "";
	    	if(productcodeInsght == "ZAF"|| productcodeInsght == "ZKF"|| productcodeInsght == "YEH"
	    			||productcodeInsght=="EAK_U"||productcodeInsght=="EAG_T"||productcodeInsght=="JBS"||productcodeInsght=="EAJ"
	    			||productcodeInsght=="EAG_V"||productcodeInsght == "EAJ_S"|| productcodeInsght == "YEJ"){
	    		applyIDType = $("#input_applyIndentifyType option:selected").text();
	    	}else if(productcodeInsght == "JAB_A"||productcodeInsght == "LDT_E"||productcodeInsght == "EFFEFG"
	    			||productcodeInsght == "EJQ_Z"||productcodeInsght == "LAY_G"||productcodeInsght == "EAK_G"||productcodeInsght == "EAK_X"
	    			||productcodeInsght == "LAY_N"||productcodeInsght == "LAY_A"||productcodeInsght == "LAY_J"
	    			||productcodeInsght == "EDD_J"||productcodeInsght == "EDD_Z"||productcodeInsght == "LEF"||productcodeInsght == "LXL"||productcodeInsght == "JBD_B"
	    			||productcodeInsght == "LAY_H" || "YXL" == productcodeInsght || "ECK" == productcodeInsght || "JCO" == productcodeInsght 
	    			|| "JCA" == productcodeInsght || "YEHKM" == productcodeInsght || "EAL_L" == productcodeInsght || "JTE_S" == productcodeInsght
	    			|| "WAF_N" == productcodeInsght || "ZFO" == productcodeInsght ||"EJQ_H" == productcodeInsght){
	    	    applyIDType  = $("#applyIdSelectSpan").text();
	    	}else if(productcodeInsght=="BWSJ"||productcodeInsght=="SEZJ"){
	    		applyIDType = "身份证"
	    	}
	    	var applyID = $("#input_applyIdentifyNumber").val();
	    	var applyMobile = $("#input_applyMobile").val();
	    	var applyMail = $("#input_applyEmail").val();
	    	if(productcodeInsght=="BWSJ"){//百万身价的获取与其他不同
	    		applyID = $("#identifynumber").val();
	    		applyMobile = $("#phonenumber").val();
	    		applyMail = $("#email").val();
	    	}
	    	var appIdentifyInfo = applyIDType+":"+applyID;
	    	
	    	var applyCountryName = "";
	    	var applyIsResident = "";
	    	if(applyIDType == "护照"){
	    		applyCountryName = $("#input_applyCountryName").val();
	    		if(productcodeInsght == "ZAF"|| productcodeInsght == "ZKF"|| productcodeInsght == "YEH"
	    				||productcodeInsght=="EAK_U"||productcodeInsght=="EAG_T"||productcodeInsght=="JBS"||productcodeInsght=="EAJ"
	    				||productcodeInsght=="EAG_V"||productcodeInsght == "EAJ_S"|| productcodeInsght == "YEJ"){
	    			applyIsResident = $("#input_applyIsResident option:selected").text();
		    	}else if(productcodeInsght == "JAB_A"||productcodeInsght == "LDT_E"||productcodeInsght == "EFFEFG"
		    			||productcodeInsght == "EJQ_Z"||productcodeInsght == "LAY_G"||productcodeInsght == "EAK_G"||productcodeInsght == "EAK_X"
		    			||productcodeInsght == "LAY_N"||productcodeInsght == "LAY_A"||productcodeInsght == "LAY_J"
		    			||productcodeInsght == "EDD_J"||productcodeInsght == "EDD_Z"||productcodeInsght == "LEF"||productcodeInsght == "LXL"||productcodeInsght == "JBD_B"
		    			||productcodeInsght == "LAY_H" || "YXL" == productcodeInsght || "ECK" == productcodeInsght || "JCO" == productcodeInsght 
		    			|| "JCA" == productcodeInsght || "YEHKM" == productcodeInsght|| "EAL_L" == productcodeInsght || "JTE_S" == productcodeInsght || "ZFO" == productcodeInsght
		    			||"EJQ_H" == productcodeInsght){
		    	    applyIsResident  = $("#applyIsResidentSelectSpan").text();
		    	}
		    	appIdentifyInfo = appIdentifyInfo+":"+applyCountryName+":"+applyIsResident;
	    	}
	    	if(productcodeInsght == "EFFEFG"||productcodeInsght == "EAK_X"||productcodeInsght == "EAK_G"||productcodeInsght == "ZFO"){
	    		if(items == "EFF0000001"){
		    		itemsCName = "顺心保A款(半年)";
		    	}else if(items == "EFF0000002"){
		    		itemsCName = "顺心保B款(一年)";
		    	}else if(items == "EFG0000001"){
		    		itemsCName = "舒心保A款(半年)";
		    	}else if(items == "EFG0000002"){
		    		itemsCName = "舒心保B款(一年)";
		    	}else if(items == "EFG0000003"){
		    		itemsCName = "舒心保C款(一年)";
		    	}else if(items == "BS"||items=="13"||items=="08"){
		    		itemsCName = "经济型";
		    	}else if(items == "BT"||items == "GT"||items == "DA"||items=="14"||items=="09"){
		    		itemsCName = "舒适型";
		    	}else if(items == "BU"||items == "GU"||items == "DB"||items=="23"||items=="22"){
		    		itemsCName = "豪华型";
		    	}else if(items=="ZFO000001b"){
		    		itemsCName = "国内享乐";
		    	}else if(items=="ZFO000001a"){
		    		itemsCName = "国内高端";
		    	}else if(items=="ZFO000001c"){
		    		itemsCName = "短期海外";
		    	}else if(items=="ZFO000001d"){
		    		itemsCName = "全球保障";
		    	}
		    	if(productcodeInsght == "EFFEFG"){		    		
		    		trkTravelInsurance("意外保险:"+itemsCName, applyName+","+appIdentifyInfo+","+applyMobile+","+applyMail);
		    	}else if(productcodeInsght == "EAK_X"||productcodeInsght == "EAK_G"
		    	||productcodeInsght == "EDD_J"||productcodeInsght == "EDD_Z"||productcodeInsght == "ZFO"){
		    		trkTravelInsurance(trkproductCName+":"+itemsCName, applyName+","+appIdentifyInfo+","+applyMobile+","+applyMail);
		    	}
	    	}else{
	    		trkSubmitOrder(applyName+","+appIdentifyInfo+","+applyMobile+","+applyMail);
	    	}
	    }else if(trkstepCName == "投保确认"){
	    	;
	    }
	   
    }
}

setInsightMeters();
//$(function(){

//});
$(document).ready(function(){
try {
	s_picc.pageName=trkPageName;
	s_picc.channel=trkChannel;
	s_picc.prop1=trkProp1;
	s_picc.prop2=trkProp2;
	s_picc.products=trkProducts;
	s_picc.t();
} catch (e) {
 ;
}
});
// document.write("<script language='javascript' type='text/javascript' src='/eproperty/js/scode.js'></script>");