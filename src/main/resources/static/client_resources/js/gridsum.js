/**国双监控代码**/
//险类名称
var riskCName="";
//产品名称
var productCName="";
//操作步骤
var stepCName = "";
$(function(){
	var productcode = $("#productcode").val();
	var processbar = $("#processbar").val();
	if("Intro"==processbar||"Calc"==processbar){
		stepCName="方案报价";
	}else if("Input"==processbar||"Info"==processbar){
		//流程改造的产品，国双监测代码“填写投保信息”改为“投保确认”
		if("EJQ_Z"==productcode||"EAK_X"==productcode||"EAK_G"==productcode
		   ||"LAY_N"==productcode||"LAY_G"==productcode||"LAY_J"==productcode||"LAY_A"==productcode||"JAB_A"==productcode
		   ||"EFFEFG"==productcode||"LAY_H"==productcode||"EAL_L"==productcode||"JTE_S"==productcode||"WAF_N"==productcode||"JBM_S"==productcode||"EAJ_G"==productcode||"EAJ_Y"==productcode){
			stepCName="投保确认";
		}else{
	        stepCName="填写投保信息";
		}
	}else if("Confirm"==processbar){
		stepCName="投保确认";
	}
	//产品名称，险种名称
	if("YEJ"==productcode){
		riskCName="行李保险";
		productCName="国内公路随车行李保险";
	}
	else if("YEH"==productcode){
		riskCName="行李保险";
		productCName="国内航空旅客行李保险";
	}
	else if("ZKF"==productcode){
		riskCName="家庭保险";
		productCName="监护人责任保险";
	}
	else if("ZAF"==productcode){
		riskCName="家庭保险";
		productCName="宠物责任保险";
	}
	else if("LCB"==productcode){
		riskCName="家庭保险";
		productCName="e-人居两旺保险";
	}
	else if("LDT"==productcode){
		riskCName="家庭保险";
		productCName="家庭财产综合保险";
	}
	else if("EFFEFG"==productcode){
		riskCName="意外保险";
		productCName="人身意外保险";
	}
	else if("EJQ_Z"==productcode){
		riskCName="意外保险";
		productCName="交通工具意外保险";
	}
	else if("EJQ_H"==productcode){
		riskCName="意外保险";
		productCName="航空意外年度保险";
		
	}
	else if("EAG_V"==productcode){
		riskCName="旅游保险";
		productCName="境外商务出行保险";
	}
	else if("EAJ_S"==productcode){
		riskCName="旅游保险";
		productCName="欧洲旅游保险";
	}
	else if("EAJ"==productcode){
		riskCName="旅游保险";
		productCName="全球旅游保险";
	}
	else if("EAG_T"==productcode){
		riskCName="旅游保险";
		productCName="国内商务出行保险";
	}
	else if("JBS"==productcode){
		riskCName="旅游保险";
		productCName="航空延误损失综合保险";
	}
	else if("EAK_G"==productcode){
		riskCName="旅游保险";
		productCName="高原游保险";
	}
	else if("EAK_U"==productcode){
		riskCName="旅游保险";
		productCName="国内旅游保险";
	}
	else if("EAK_X"==productcode){
		riskCName="旅游保险";
		productCName="国内自驾游保险";
	}
	else if("LAY_N"==productcode){
		riskCName="旅游保险";
		productCName="北美旅游保险";
	}else if("LAY_G"==productcode){
		riskCName="旅游保险";
		productCName="港澳台旅游保险";
	}else if("LAY_J"==productcode){
		riskCName="旅游保险";
		productCName="日韩旅游保险";
	}else if("LAY_A"==productcode){
		riskCName="旅游保险";
		productCName="澳新旅游保险";
	}else if("JAB_A"==productcode){
		riskCName="家庭保险";
		productCName="家庭财产综合保险";
		
	}else if("JBD_B"==productcode){
		riskCName="家庭保险";
		productCName="个人账户资金安全保险";
	}else if("JMA"==productcode){
		riskCName="家庭保险";
		productCName="储金型家庭综合保险";
	}else if("LDT_E"==productcode){
		riskCName="家庭保险";
		productCName="美满e家组合险";
	}else if("BWSJ" == productcode){
			riskCName="人身保险";
			productCName="百万身价惠民两全保险";
	  }else if("SEZJ"==productcode){
	  		riskCName="人身保险";
			productCName="未成年人重大疾病保险";
	}else if("LAY_H"==productcode){
		riskCName="旅游保险";
		productCName="海南旅游保险";
	}else if("JCA"==productcode){
		riskCName="家庭保险";
		productCName="四川省城乡居民住房地震保险";
	}else if("JCO"==productcode){
		riskCName="家庭保险";
		productCName="城乡居民住宅地震巨灾保险";
	}else if("YXL"==productcode){
		riskCName="行李保险";
		productCName="随人行李定期保险";
	}else if("ECK"==productcode){
		riskCName="意外保险";
		productCName="中老年人骨折保险";
	}else if("YEHKM"==productcode){
		riskCName="行李保险";
		productCName="航空旅客行李保险";
	}else if("EAL_L"==productcode){
		riskCName="意外保险";
		productCName="境外留学生意外险";
	}else if("JTE_S"==productcode){
		riskCName="家庭保险";
		productCName="碎屏安心保";
	}else if("WAF_N"==productcode){
		riskCName="意外保险";
		productCName="女性特定疾病保险";
	}else if("JBM_S"==productcode){
		riskCName="家庭保险";
		productCName="管道破裂及水渍险";
	}else if("EAJ_G"==productcode){
		riskCName="旅游保险";
		productCName="港澳台旅游保险";
	}else if("EAJ_Y"==productcode){
		riskCName="旅游保险";
		productCName="东南亚旅游保险";
	}else if("LXL"==productcode){
		riskCName="企业保险";
		productCName="金福保";
	}else if("ZFO"==productcode){
		riskCName="家庭保险";
		productCName="家庭成员责任险";
	}
	
});
//首页监控
function gridIndex(){
	if (window._gsTracker) {
		try{
			_gsTracker.trackEvent(riskCName,productCName,"申请投保");
		}catch(e){}
    }
}

//除首页以外的其他页面监控
function gridOther(){
	if (window._gsTracker) {
        _gsTracker.trackEvent(riskCName,productCName,stepCName);
    }
    //insigth监测代码
    try {
	 insightPage();
	} catch (e) {
 		;
	}
}