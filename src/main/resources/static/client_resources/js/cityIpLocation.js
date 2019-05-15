 //getAreacodeByIP
$(document).ready(function(){
	 if(""==$("#areacode").val()&&$("#productcode").val()!="LEF"&&$("#productcode").val()!="BWSJ"&&$("#productcode").val()!="LXL"){
		 if($("#groupBuyId").val()==""||$("#flag").val()=="11"){
			 $.ajax({
				 type : 'post',
				 url:'/eproperty/ipSearch/ipSearchMethod.do',
				 dataType:'json',
				 success:function(data){
					 	 ipArea=data.ipArea;
					 	 if(undefined!=ipArea && ""!=ipArea){
					 		cityGet();
					 	 }
				 		 var productCode = $("#productcode").val();
				 		 //电子发票展示控制
				 		 if("EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode){
				 			 showInvoiceDivNew($("#sumpremium").val());
				 		 }
				 		 //规范归属机构展示控制
				 		 if($("#areacode").val() != ""){
				 			 getComCodeInfoByAreaCode_();
				 			 checkMakeComCode();
				 			 if(",YXL,YEHKM,".indexOf(productCode)>-1){
				 				 uploadCombo("cityChange");
				 			 }
				 			 if(",WAF_N,".indexOf(productCode)>-1){
				 				 calculateFee("sync");
				 			 }
				 		 }
					 	
				 },
				 err:function(){
				 },
				 complete:function(){
				 	if($("#productcode").val()=="JAB_A"){
				 		if(""==$("#areacode").val()){
						 	$("#cityname").val('北京');
							$("#areacode").val('11000000');
				 		}
				 		getRate('sync');
				 	}
				 	if("YXL"==$("#productcode").val() && ""==$("#areacode").val()){
					 	$("#cityname").val('北京');
						$("#areacode").val('11000000');
						uploadCombo();
				 	}
				 }
		 	});
		}
	}
});
function cityGet(){
	var city= new Array();
	var city1=new Array();
	for(var i=0;i<cityNews.length;i++){
		city=cityNews[i];
		if(ipArea.indexOf("省")>-1){
	    	city1 = ipArea.split("省"); 
		    if(city1[1].indexOf(city[2])>-1){ 
				$("#cityname").val(city[2]);
				$("#areacode").val(city[1]);
				$("#provinceCode").val(city[0]);
				break;
			}
		}else if(ipArea.indexOf(city[2])>-1){
			$("#cityname").val(city[2]);
			$("#areacode").val(city[1]);
			$("#provinceCode").val(city[0]);
			break;
		}
	}
}