
var riskCode=$("#riskcode").val();
var productCode=$("#productcode").val();

var spageName="";
var sprop1="";
var sprop2="";
var sproducts="";
var seVar1="";
var schannel="";
/**测试环境添加代码**/
var trkPageName="";
var trkChannel="";
var trkProp1="";
var trkProp2="";
var trkstepCName="首页";
var trkProducts="";
var trkproductCName = "";
/**测试环境添加代码end**/
 function setSarameters(){
	if("EAJ"==productCode)
	  {	  	
	  	spageName="选购保险:旅游保险:境外自助游";
	  	sprop1="选购保险:旅游保险";
	  	sprop2="选购保险:旅游保险:境外自助游";
	  	sproducts =";e-四海逍遥游保险";
	  	seVar1="选购保险:旅游保险:境外自助游";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:旅游保险:e-四海逍遥游保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-四海逍遥游保险";
		trkProducts="旅游保险;e-四海逍遥游保险";
		trkproductCName = "e-四海逍遥游保险";
	  }
	  else if("EAJ_S"==productCode) 
	  {
	  	spageName="选购保险:旅游保险:欧洲旅游";
	  	sprop1="选购保险:旅游保险";
	  	sprop2="选购保险:旅游保险:欧洲旅游";
	  	sproducts ="";
	  	seVar1="选购保险:旅游保险:欧洲旅游";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:旅游保险:欧洲旅游保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:欧洲旅游保险";
		trkProducts="旅游保险;欧洲旅游保险";
		trkproductCName = "欧洲旅游保险";
	  }
	  else if("EAG_T"==productCode)
	  { 
	  	spageName="选购保险:旅游保险:境内商务出行";
	  	sprop1="选购保险:旅游保险";
	  	sprop2="选购保险:旅游保险:境内商务出行";
	  	sproducts =";e-神州商务行保险";
	  	seVar1="选购保险:旅游保险:境内商务出行";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:旅游保险:e-神州商务行保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-神州商务行保险";
		trkProducts="旅游保险;e-神州商务行保险";
		trkproductCName = "e-神州商务行保险";
	  }
	  else if("EAG_V"==productCode){
	  	spageName="选购保险:旅游保险:境外商务出行";
	  	sprop1="选购保险:旅游保险";
	  	sprop2="选购保险:旅游保险:境外商务出行";
	  	sproducts =";e-四海商务行保险";
	  	seVar1="选购保险:旅游保险:境外商务出行";
	  	schannel="选购保险";
	  
	  	
	  	trkPageName="非车险:旅游保险:e-四海商务行保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-四海商务行保险";
		trkProducts="旅游保险;e-四海商务行保险";
		trkproductCName = "e-四海商务行保险";
	  }
	  else if("EAK_U"==productCode){//神州逍遥游;
	  	spageName="选购保险:旅游保险:境内自助游";
	  	sprop1="选购保险:旅游保险";
	  	sprop2="选购保险:旅游保险:境内自助游";
	  	sproducts =";e-神州逍遥游保险";
	  	seVar1="选购保险:旅游保险:境内自助游";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:旅游保险:e-神州逍遥游保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-神州逍遥游保险";
		trkProducts="旅游保险;e-神州逍遥游保险";
		trkproductCName = "e-神州逍遥游保险";
	  }
	  else if("EFF"==riskCode|| "EFG"==riskCode){
	  	if("EFG_M"==productCode){
	  		spageName="非车险:意外险:雾霾险:产品首页";
	  	sprop1="非车险:意外险";
	  	sprop2="非车险:意外险:雾霾险";
	  	sproducts =";雾霾险";
	  	seVar1="非车险:意外险:雾霾险:产品首页";
	  	}
	  	else
	  	{
	  		spageName="选购保险:意外保险:人身意外险";
	  	sprop1="非车险:人身意外保险";
	  	sprop2="选购保险:意外保险:人身意外险";
	  	sproducts =";选购保险:意外保险:人身意外险";
	  	seVar1="选购保险:意外保险:人身意外险";
	  	
	  	trkPageName="非车险:意外保险:人身意外险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:人身意外险";
		trkProducts="意外保险;人身意外险";
		trkproductCName = "人身意外险";
	  	
	  	}
	  	schannel="选购保险";
	  }
	  else if("ZKK_R"==productCode){
	  	spageName="选购保险:家庭保险:监护人责任险";
	  	sprop1="选购保险:家庭保险";
	  	sprop2="选购保险:家庭保险:监护人责任险";
	  	sproducts =";监护人责任保险";
	  	seVar1="选购保险:家庭保险:监护人责任险";
	  	schannel="选购保险";
	 }
	 else if("ZKK_W"==productCode){
	 	spageName="选购保险:家庭保险:宠物责任险";
	  	sprop1="选购保险:家庭保险";
	  	sprop2="选购保险:家庭保险:宠物责任险";
	  	sproducts =";宠物责任保险";
	  	seVar1="选购保险:家庭保险:宠物责任险";
	  	schannel="选购保险";
	 	
	  }
	  else if("YEJ"==riskCode){
	  	spageName="选购保险:行李保险:国内公路随车行李保险";
	  	sprop1="选购保险:行李保险";
	  	sprop2="选购保险:行李保险:国内公路随车行李保险";
	  	sproducts =";国内公路随车行李保险";
	  	seVar1="选购保险:行李保险:国内公路随车行李保险";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:行李保险:国内公路随车行李保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:行李保险";
		trkProp2="非车险:行李保险:国内公路随车行李保险";
		trkProducts="行李保险;国内公路随车行李保险";
		trkproductCName = "国内公路随车行李保险";
	  }
	  else if("YEH"==riskCode){
	  	spageName="选购保险:行李保险:国内航空旅客行李保险";
	  	sprop1="选购保险:行李保险";
	  	sprop2="选购保险:行李保险:国内航空旅客行李保险";
	  	sproducts =";国内航空旅客行李保险";
	  	seVar1="选购保险:行李保险:国内航空旅客行李保险";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:行李保险:国内航空旅客行李保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:行李保险";
		trkProp2="非车险:行李保险:国内航空旅客行李保险";
		trkProducts="行李保险;国内航空旅客行李保险";
		trkproductCName = "国内航空旅客行李保险";
	  }
	  else if("JBS"==riskCode){
	  	spageName="选购保险:旅游保险:航空延误损失综合保险";
	  	sprop1="选购保险:旅游保险";
	  	sprop2="选购保险:旅游保险:航空延误损失综合保险";
	  	sproducts =";航空延误损失综合保险";
	  	seVar1="选购保险:旅游保险:航空延误损失综合保险";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:旅游保险:航空延误损失综合保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:航空延误损失综合保险";
		trkProducts="旅游保险;航空延误损失综合保险";
		trkproductCName = "航空延误损失综合保险";
	  }
	   else if("EDD_J"==productCode){
	   	spageName="非车险:意外保险:驾乘综合意外险:产品首页";
	  	sprop1="非车险:意外保险";
	  	sprop2="非车险:意外保险:驾乘综合意外险";
	  	sproducts =";驾乘综合意外险";
	  	seVar1="非车险:意外保险:驾乘综合意外险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:意外保险:驾乘综合意外险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:驾乘综合意外险";
		trkProducts="意外保险;驾乘综合意外险";
		trkproductCName = "驾乘综合意外险";
	  }
	  else if("EDD_Z"==productCode){
	  	
	  	spageName="非车险:意外保险:交通综合年度意外险:产品首页";
	  	sprop1="非车险:意外保险";
	  	sprop2="非车险:意外保险:交通综合年度意外险";
	  	sproducts =";交通综合年度意外险";
	  	seVar1="非车险:意外保险:交通综合年度意外险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:意外保险:交通综合年度意外险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:交通综合年度意外险";
		trkProducts="意外保险;交通综合年度意外险";
		trkproductCName = "交通综合年度意外险";
	  }
	  else if("LAY_N"==productCode){
	  	
	  	spageName="非车险:旅游保险:北美旅游险:产品首页";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:北美旅游险";
	  	sproducts =";北美旅游险";
	  	seVar1="非车险:旅游保险:北美旅游险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:北美旅游险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:北美旅游险";
		trkProducts="旅游保险;北美旅游险";
		trkproductCName = "北美旅游险";
	  }else if("LAY_G"==productCode){
	  	
	  	spageName="非车险:旅游保险:港澳台旅游险:产品首页";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:港澳台旅游险";
	  	sproducts =";港澳台旅游险";
	  	seVar1="非车险:旅游保险:港澳台旅游险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:港澳台旅游险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:港澳台旅游险";
		trkProducts="旅游保险;港澳台旅游险";
		trkproductCName = "港澳台旅游险";
	  }else if("LAY_J"==productCode){
	  	
	  	spageName="非车险:旅游保险:日韩旅游险:产品首页";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:日韩旅游险";
	  	sproducts =";日韩旅游险";
	  	seVar1="非车险:旅游保险:日韩旅游险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:日韩旅游险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:日韩旅游险";
		trkProducts="旅游保险;日韩旅游险";
		trkproductCName = "日韩旅游险";
	  }
	  else if("LAY_A"==productCode){
	  	
	  	spageName="非车险:旅游保险:澳新旅游险:产品首页";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:澳新旅游险";
	  	sproducts =";澳新旅游险";
	  	seVar1="非车险:旅游保险:澳新旅游险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:澳新旅游险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:澳新旅游险";
		trkProducts="旅游保险;澳新旅游险";
		trkproductCName = "澳新旅游险";
	  }
	  
	  else if("EJQ_Z"==productCode){
	  	spageName="非车险:意外保险:交通工具意外险:产品首页";
	  	sprop1="非车险:意外保险";
	  	sprop2="非车险:意外保险:交通工具意外险";
	  	sproducts =";交通工具意外险";
	  	seVar1="非车险:意外保险:交通工具意外险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:意外保险:交通工具意外险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:交通工具意外险";
		trkProducts="意外保险;交通工具意外险";
		trkproductCName = "交通工具意外险";
	  }
	  
	  else if("EAK_G"==productCode)
	  { 
	  	spageName="选购保险:旅游保险:国内高原游";
	  	sprop1="选购保险:旅游保险";
	  	sprop2="选购保险:旅游保险:国内高原游";
	  	sproducts =";e-国内高原游";
	  	seVar1="选购保险:旅游保险:国内高原游";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:旅游保险:e-国内高原险保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-国内高原险保险";
		trkProducts="旅游保险;e-国内高原险保险";
		trkproductCName = "e-国内高原险保险";
	  }
	  else if("EAK_X"==productCode){//神州自驾游;
	  	spageName="非车险:旅游保险:e-神州自驾游保险:产品首页";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:e-神州自驾游保险";
	  	sproducts =";e-神州自驾游保险";
	  	seVar1="非车险:旅游保险:e-神州自驾游保险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:e-神州自驾游保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:e-神州自驾游保险";
		trkProducts="旅游保险;e-神州自驾游保险";
		trkproductCName = "e-神州自驾游保险";
	  }
	  else if("EJQ_H"==productCode){
	  	spageName="选购保险:意外保险:航空意外年度险";
	  	sprop1="选购保险:意外保险";
	  	sprop2="选购保险:意外保险:航空意外年度险";
	  	sproducts =";航空旅客意外伤害年度保险";
	  	seVar1="选购保险:意外保险:航空意外年度险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:意外保险:航空旅客意外伤害年度保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:航空旅客意外伤害年度保险";
		trkProducts="意外保险;航空旅客意外伤害年度保险";
		trkproductCName = "航空旅客意外伤害年度保险";
	  }
	  else if("JAB_A"==productCode){
	  	spageName="选购保险:家庭保险:家庭财产综合保险";
	  	sprop1="选购保险:家庭保险";
	  	sprop2="选购保险:家庭保险:家庭财产综合保险";
	  	sproducts =";家庭财产综合保险";
	  	seVar1="选购保险:家庭保险:家庭财产综合保险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:家庭保险:家庭财产综合保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:家庭财产综合保险";
		trkProducts="家庭保险;家庭财产综合保险";
		trkproductCName = "家庭财产综合保险";
		
	  }
	  else if("LDT_E"==productCode){
	  	spageName="非车险:家庭保险:美满e家组合险:产品首页";
	  	sprop1="非车险:家庭保险";
	  	sprop2="非车险:家庭保险:美满e家组合险";
	  	sproducts =";美满e家组合险";
	  	seVar1="非车险:家庭保险:美满e家组合险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:家庭保险:美满e家组合险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:美满e家组合险";
		trkProducts="家庭保险;美满e家组合险";
		trkproductCName = "美满e家组合险";
	  }
	  else if("EFFEFG"==productCode){
	  	spageName="选购保险:意外保险:人身意外险";
	  	sprop1="选购保险:意外保险";
	  	sprop2="选购保险:意外保险:人身意外险";
	  	sproducts =";人身意外险";
	  	seVar1="选购保险:意外保险:人身意外险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:意外保险:人身意外险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:人身意外险";
		trkProducts="意外保险;人身意外险";
		trkproductCName = "人身意外险";
	  }
	  else if("SEZJ"==productCode){
		  	spageName="非车险:人身保险:未成年人重大疾病保险:产品首页";
		  	sprop1="非车险:人身保险";
		  	sprop2="非车险:人身保险:未成年人重大疾病保险";
		  	sproducts =";未成年人重大疾病保险";
		  	seVar1="非车险:人身保险:未成年人重大疾病保险:产品首页";
		  	schannel="非车险";
		  	
		  	trkPageName="非车险:人身保险:未成年人重大疾病保险:产品首页";
			trkChannel="非车险";
			trkProp1="非车险:人身保险";
			trkProp2="非车险:人身保险:未成年人重大疾病保险";
			trkProducts="人身保险;未成年人重大疾病保险";
			trkproductCName = "未成年人重大疾病保险";
		  }
	 else if("ZKF"==productCode){
	  	spageName="选购保险:家庭保险:监护人责任险";
	  	sprop1="选购保险:家庭保险";
	  	sprop2="选购保险:家庭保险:监护人责任险";
	  	sproducts =";监护人责任保险";
	  	seVar1="选购保险:家庭保险:监护人责任险";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:家庭保险:监护人责任保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:监护人责任保险";
		trkProducts="家庭保险;监护人责任保险";
		trkproductCName = "监护人责任保险";
		
	 }
	 else if("ZAF"==productCode){
	 	spageName="选购保险:家庭保险:宠物责任险";
	  	sprop1="选购保险:家庭保险";
	  	sprop2="选购保险:家庭保险:宠物责任险";
	  	sproducts =";宠物责任保险";
	  	seVar1="选购保险:家庭保险:宠物责任险";
	  	schannel="选购保险";
	  	
	  	trkPageName="非车险:家庭保险:宠物责任险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:宠物责任险";
		trkProducts="家庭保险;宠物责任险";
		trkproductCName = "宠物责任险";
		
	 	
	  }else if("LEF"==productCode){
		 	spageName="选购保险:企业保险:创业保";
		  	sprop1="选购保险:企业保险";
		  	sprop2="选购保险:企业保险:创业保";
		  	sproducts =";创业保";
		  	seVar1="选购保险:企业保险:创业保";
		  	schannel="选购保险";
		  	
		  	trkPageName="非车险:企业保险:创业保:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:企业保险";
		trkProp2="非车险:企业保险:创业保";
		trkProducts="企业保险;创业保";
		trkproductCName = "创业保";
		 	
	  }else if("JBD_B"==productCode){
		 	spageName="选购保险:家庭保险:个人账户资金安全保险";
		  	sprop1="选购保险:家庭保险";
		  	sprop2="选购保险:家庭保险:个人账户资金安全保险";
		  	sproducts =";个人账户资金安全保险";
		  	seVar1="选购保险:家庭保险:个人账户资金安全保险";
		  	schannel="选购保险";
		  	
		  	trkPageName="非车险:家庭保险:个人账户资金安全保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:个人账户资金安全保险";
		trkProducts="家庭保险;个人账户资金安全保险";
		trkproductCName = "个人账户资金安全保险";
	  }else if("BWSJ" == productCode){
	  		spageName="非车险:人身保险:百万身价惠民两全保险:产品首页";
		  	sprop1="非车险:人身保险";
		  	sprop2="非车险:人身保险:百万身价惠民两全保险";
		  	sproducts =";百万身价惠民两全保险";
		  	seVar1="非车险:人身保险:百万身价惠民两全保险:产品首页";
		  	schannel="非车险";
		  	
		  	trkPageName="非车险:人身保险:百万身价惠民两全保险:产品首页";
			trkChannel="非车险";
			trkProp1="非车险:人身保险";
			trkProp2="非车险:人身保险:百万身价惠民两全保险";
			trkProducts="人身保险;百万身价惠民两全保险";
			trkproductCName = "百万身价惠民两全保险";
	  }
	  else if("LAY_H"==productCode){
	  	
	  	spageName="非车险:旅游保险:海南旅游保险:产品首页";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:海南旅游保险";
	  	sproducts =";海南旅游保险";
	  	seVar1="非车险:旅游保险:海南旅游保险:产品首页";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:海南旅游保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:海南旅游保险";
		trkProducts="旅游保险;海南旅游保险";
		trkproductCName = "海南旅游保险";
	  }
	  else if("JMA"==productCode){
		  	
		  	spageName="非车险:家庭保险:储金型家庭综合保险:产品首页";
		  	sprop1="非车险:家庭保险";
		  	sprop2="非车险:家庭保险:储金型家庭综合保险";
		  	sproducts =";储金型家庭综合保险";
		  	seVar1="非车险:家庭保险:储金型家庭综合保险:产品首页";
		  	schannel="非车险";
		  	
		  	trkPageName="非车险:家庭保险:储金型家庭综合保险:产品首页";
			trkChannel="非车险";
			trkProp1="非车险:家庭保险";
			trkProp2="非车险:家庭保险:储金型家庭综合保险";
			trkProducts="家庭保险;储金型家庭综合保险";
			trkproductCName = "储金型家庭综合保险";
	  }else if("JCA"==productCode){
		  	
		  	spageName="非车险:家庭保险:四川省城乡居民住房地震保险:产品首页";
		  	sprop1="非车险:家庭保险";
		  	sprop2="非车险:家庭保险:四川省城乡居民住房地震保险";
		  	sproducts =";四川省城乡居民住房地震保险";
		  	seVar1="非车险:家庭保险:四川省城乡居民住房地震保险:产品首页";
		  	schannel="非车险";
		  	
		  	trkPageName="非车险:家庭保险:四川省城乡居民住房地震保险:产品首页";
			trkChannel="非车险";
			trkProp1="非车险:家庭保险";
			trkProp2="非车险:家庭保险:四川省城乡居民住房地震保险";
			trkProducts="家庭保险;四川省城乡居民住房地震保险";
			trkproductCName = "四川省城乡居民住房地震保险";
	}else if("JCO"==productCode){
		  	
		  	spageName="非车险:家庭保险:城乡居民住宅地震巨灾保险:产品首页";
		  	sprop1="非车险:家庭保险";
		  	sprop2="非车险:家庭保险:城乡居民住宅地震巨灾保险";
		  	sproducts =";城乡居民住宅地震巨灾保险";
		  	seVar1="非车险:家庭保险:城乡居民住宅地震巨灾保险:产品首页";
		  	schannel="非车险";
		  	
		  	trkPageName="非车险:家庭保险:城乡居民住宅地震巨灾保险:产品首页";
			trkChannel="非车险";
			trkProp1="非车险:家庭保险";
			trkProp2="非车险:家庭保险:城乡居民住宅地震巨灾保险";
			trkProducts="家庭保险;城乡居民住宅地震巨灾保险";
			trkproductCName = "城乡居民住宅地震巨灾保险";
	}else if("YXL"==riskCode){
		  	spageName="非车险:行李保险:随人行李定期保险";
		  	sprop1="非车险:行李保险";
		  	sprop2="非车险:行李保险:随人行李定期保险";
		  	sproducts =";随人行李定期保险";
		  	seVar1="非车险:行李保险:随人行李定期保险";
		  	schannel="非车险";
		  	
		  	trkPageName="非车险:行李保险:随人行李定期保险:产品首页";
			trkChannel="非车险";
			trkProp1="非车险:行李保险";
			trkProp2="非车险:行李保险:随人行李定期保险";
			trkProducts="行李保险;随人行李定期保险";
			trkproductCName = "随人行李定期保险";
	}else if("ECK"==productCode){
				spageName="非车险:意外保险:中老年人骨折保险:产品首页";
			  	sprop1="非车险:意外保险";
			  	sprop2="非车险:意外保险:中老年人骨折保险";
			  	sproducts =";中老年人骨折保险";
			  	seVar1="非车险:意外保险:中老年人骨折保险:产品首页";
			  	schannel="非车险";
			  	
			  	trkPageName="非车险:意外保险:中老年人骨折保险:产品首页";
				trkChannel="非车险";
				trkProp1="非车险:意外保险";
				trkProp2="非车险:意外保险:中老年人骨折保险";
				trkProducts="意外保险;中老年人骨折保险";
				trkproductCName = "中老年人骨折保险";
	}else if("YEHKM"==productCode){
	  	spageName="非车险:行李保险:航空旅客行李保险";
	  	sprop1="非车险:行李保险";
	  	sprop2="非车险:行李保险:航空旅客行李保险";
	  	sproducts =";航空旅客行李保险";
	  	seVar1="非车险:行李保险:航空旅客行李保险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:行李保险:航空旅客行李保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:行李保险";
		trkProp2="非车险:行李保险:航空旅客行李保险";
		trkProducts="行李保险;航空旅客行李保险";
		trkproductCName = "航空旅客行李保险";
	}else if("EAL_L"==productCode){
	  	spageName="非车险:意外保险:境外留学生意外险";
	  	sprop1="非车险:意外保险";
	  	sprop2="非车险:意外保险:境外留学生意外险";
	  	sproducts =";境外留学生意外险";
	  	seVar1="非车险:意外保险:境外留学生意外险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:意外保险:境外留学生意外险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:境外留学生意外险";
		trkProducts="意外保险;境外留学生意外险";
		trkproductCName = "境外留学生意外险";
	}else if("JTE_S"==productCode){
	  	spageName="非车险:家庭保险：碎屏安心保";
	  	sprop1="非车险:家庭保险";
	  	sprop2="非车险:家庭保险:碎屏安心保";
	  	sproducts =";碎屏安心保";
	  	seVar1="非车险:家庭保险:碎屏安心保";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:家庭保险:碎屏安心保:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:碎屏安心保";
		trkProducts="家庭保险;碎屏安心保";
		trkproductCName = "碎屏安心保";
	}else if("WAF_N"==productCode){
		spageName="非车险:意外保险：女性特定疾病保险";
	  	sprop1="非车险:意外保险";
	  	sprop2="非车险:意外保险:女性特定疾病保险";
	  	sproducts =";女性特定疾病保险";
	  	seVar1="非车险:意外保险:女性特定疾病保险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:意外保险:女性特定疾病保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:意外保险";
		trkProp2="非车险:意外保险:女性特定疾病保险";
		trkProducts="意外保险;女性特定疾病保险";
		trkproductCName = "女性特定疾病保险";
	}else if("JBM_S"==productCode){
		spageName="非车险:家庭保险：管道破裂及水渍险";
	  	sprop1="非车险:家庭保险";
	  	sprop2="非车险:家庭保险:管道破裂及水渍险";
	  	sproducts =";管道破裂及水渍险";
	  	seVar1="非车险:家庭保险:管道破裂及水渍险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:家庭保险:管道破裂及水渍险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:管道破裂及水渍险";
		trkProducts="家庭保险;管道破裂及水渍险";
		trkproductCName = "管道破裂及水渍险";
	}else if("EAJ_G"==productCode){
		spageName="非车险:旅游保险：港澳台旅游保险";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:港澳台旅游保险";
	  	sproducts =";港澳台旅游保险";
	  	seVar1="非车险:旅游保险:港澳台旅游保险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:港澳台旅游保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:港澳台旅游保险";
		trkProducts="旅游保险;港澳台旅游保险";
		trkproductCName = "港澳台旅游保险";
	}else if("EAJ_Y"==productCode){
		spageName="非车险:旅游保险：东南亚旅游保险";
	  	sprop1="非车险:旅游保险";
	  	sprop2="非车险:旅游保险:东南亚旅游保险";
	  	sproducts =";东南亚旅游保险";
	  	seVar1="非车险:旅游保险:东南亚旅游保险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:旅游保险:东南亚旅游保险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:旅游保险";
		trkProp2="非车险:旅游保险:东南亚旅游保险";
		trkProducts="旅游保险;东南亚旅游保险";
		trkproductCName = "东南亚旅游保险";
	}else if("LXL"==productCode){
		spageName="非车险:企业保险：金福保";
	  	sprop1="非车险:企业保险";
	  	sprop2="非车险:企业保险:金福保";
	  	sproducts =";东南亚旅游保险";
	  	seVar1="非车险:企业保险:金福保";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:企业保险:金福保:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:企业保险";
		trkProp2="非车险:企业保险:金福保";
		trkProducts="企业保险;金福保";
		trkproductCName = "金福保";
	}else if("ZFO"==productCode){
		spageName="非车险:家庭保险：家庭成员责任险";
	  	sprop1="非车险:家庭保险";
	  	sprop2="非车险:家庭保险:家庭成员责任险";
	  	sproducts =";家庭成员责任保";
	  	seVar1="非车险:家庭保险:家庭成员责任险";
	  	schannel="非车险";
	  	
	  	trkPageName="非车险:家庭保险:家庭成员责任险:产品首页";
		trkChannel="非车险";
		trkProp1="非车险:家庭保险";
		trkProp2="非车险:家庭保险:家庭成员责任险";
		trkProducts="家庭保险;家庭成员责任险";
		trkproductCName = "家庭成员责任险";
	}
	
	
}

/* You may give each page an identifying name, server, and channel on
the next lines. */
setSarameters()
//添加insight监测代码js引用
//$(document).onload(function(){
$(window).load(function(){ 
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

//s.pageName=spageName
//s.server=""
//s.channel=schannel
//s.pageType=""
//s.prop1=sprop1
//s.prop2=sprop2
//s.prop3=""
//s.prop4=""
//s.prop5=""
/* Conversion Variables */
//s.campaign=""
//s.state=""
//s.zip=""
//s.events="event8"
//s.products=sproducts
//s.purchaseID=""
//s.eVar1=seVar1
//s.eVar2=""
//s.eVar3=""
//s.eVar4=""
//s.eVar5=""
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
//var s_code=s.t();if(s_code)document.write(s_code)
//if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-');


/* 实现Web Dissector电子商务 JavaScript API接口 */
			
 /* (function(){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = (location.protocol == 'https:' ? 'https://ssl.' : 'http://static.') + 'gridsumdissector.com/js/Clients/GWD-000333-54424A/gs.js';
            var firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(s, firstScript);
  })();*/