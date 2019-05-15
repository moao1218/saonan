
   var cities = new Array();
   var proSel = "";
   var citySel_1 = "";
   
  //城市选择--通过省份选过来的
  function changeCity(provObj)
  {  
    if(proSel!=""){
    proSel.removeClass("selected");
    }
    proSel = provObj;
    provObj.addClass("selected");
    var proCodeVal =  provObj.parent().val(); 
    
    var cityLi = $(".provinceCity_feiche .city li"); //cities[i][2], cities[i][1]
    cityLi.remove();
  
    var LiStr ="";
    for(i=0;i<cities.length;i++){
	  	if(proCodeVal == cities[i][0]){
	  		 if("BWSJ"==$("#productcode").val()){
	  		 	 LiStr =LiStr+'<li comvalue="'+cities[i][0]+'" value="'+cities[i][1]+'"><a href="javascript:">'+cities[i][2]+'</a></li>';
	  		 }else{
	  	   	 LiStr =LiStr+'<li value="'+cities[i][1]+'"><a href="####">'+cities[i][2]+'</a></li>';
	  		 }
	  	}
	}
    if(LiStr!=""){
    	$(".provinceCity_feiche .city ul").append(LiStr);
    	
    }
    $(".provinceCity_feiche .city li").delegate("a","click",function(){
    	clkIndex2=$("body").find(".proCityQuery_feiche .city").index(this);
    	if(citySel_1!=""){
   		   citySel_1.removeClass("selected");
   	    }
   	    citySel_1 = $(this);
        $(this).addClass("selected");					   
		var v=$(this).html();
		$("body").find(".proCityQuery_feiche").eq(clkIndex).val(v);
		
		$(".provinceCity_feiche").hide();
			aboutIframe();
			 //删除热点城市的红色
   	    $(".provinceCity_feiche .city0").find(".selected").removeClass("selected");
		if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
			$("#mailareacode").val($(this).parents().eq(0).attr("value"));
		}else{
			$("#areacode").val($(this).parents().eq(0).attr("value"));
			var productCode = $("#productcode").val();
			//电子发票展示控制
			if("EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode|| ("JBD_B" == productCode&&$("#salemode").val()!="05")||"JBM_S" == productCode){
				showInvoiceDivNew($("#sumpremium").val());
			}
			if("BWSJ"==$("#productcode").val()){
		    	$("#comcode").val($(this).parents().eq(0).attr("comvalue"));
		    }
			if("EJQ_S"==$("#productcode").val()|| ("JBD_B" == productCode && $("#salemode").val()=="05")){
				getComCodesByAreaCode();
			}
			//规范归属机构展示控制
			checkMakeComCode();
			if(",YXL,".indexOf(productCode)>-1){
				toggleCombo("combo_C","1");
			}
			if(",YEHKM,".indexOf(productCode)>-1){
				uploadCombo("cityChange");
			}
			if(",WAF_N,".indexOf(productCode)>-1){
				calculateFee("sync");
			}
		}
		//增加机构和区
		areaLinkage(clkIndex);
		//JMA给房屋所在城市 投保方案名称 赋值
		if("JMA" == $("#productcode").val()){
			getItemdata();
			setJMACity(this);
		}
	});
     	aboutIframe();
     	
     
  }
  

function get_age(clkIndex) {
	var cityUrl = '/eproperty/js/city/city.json';
	if($("#productcode").val()=="JCO"){
		cityUrl='/eproperty/js/city/JCOcity.json';
	}else if("EAK_G"==$("#productcode").val() || "EAK_U"==$("#productcode").val() ){
		cityUrl='/eproperty/js/city/EAKcity.json';
	}else if("LEF"==$("#productcode").val() || "LXL"==$("#productcode").val() ){
		cityUrl='/eproperty/js/city/LEFCity.json';
	}
	$.ajax({
		type:'get',
		url:cityUrl,
		dataType:'json',
		success:function(data){
			var linkerName=$("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id");
			var txt ="";
			if(linkerName=="cityname"){
				txt=$.trim($('#cityname').val().toLowerCase());
			}else if(linkerName=="mailcityname"){
				txt=$.trim($('#mailcityname').val().toLowerCase());
			}
			if(txt.length==0){
				return;
			}
			var citys = new Array();
			$.each(data, function(i,item){
				var itemid = item.proid;
				var itemname = item.proname;
				var itemval = item.citys;
				$.each(itemval, function(j, val){
					if(txt.length == 1){
						if(val.citypinyin.indexOf(txt) == 0 || val.cityname.indexOf(txt)==0 || val.pinyinhead.indexOf(txt)==0){
							var city = new Array();
							var valid = val.cityid;
							var valname = val.cityname;
							var valpinyin = val.citypinyin;
							
			
							city.push(itemid=='hot'?'':itemid);
							city.push(valid);
							city.push(valname);
							city.push(valpinyin);
							citys.push(city);
						}
					}else{
						if(val.citypinyin.indexOf(txt) >= 0 || val.cityname.indexOf(txt)>=0 || val.pinyinhead.indexOf(txt)>=0){
							var city = new Array();
							var valid = val.cityid;
							var valname = val.cityname;
							var valpinyin = val.citypinyin;
							
			
							city.push(itemid=='hot'?'':itemid);
							city.push(valid);
							city.push(valname);
							city.push(valpinyin);
							citys.push(city);
						}
					}
				});
			});
			
			show_age(citys,clkIndex);
			aboutIframe();
		}
	});
	aboutIframe();
}
   
   
function show_age(var_age,clkIndex) {
	$("#age_div_>table>tbody").html('');

	var html ="";
	for(var i = 0; i < var_age.length; i++){

	    html = html+"<li value='"+var_age[i][1]+"'><a href='javascript:'>"+var_age[i][2]+"("+var_age[i][3] +")</a></li>";
	}
	if(html=="" || html==null){
		$("#dimCityQuery_feiche").hide();
	    $("#dimCityQuery_feiche ul").html("");
		return false;
	}else{
		$("#dimCityQuery_feiche ul").html(html).find("li:first").addClass("current");
	};
	
	var proCityQuery_feiche=$("body").find(".proCityQuery_feiche").eq(clkIndex);
	var o=proCityQuery_feiche.offset();
	var l=o.left;
	var t=o.top;
	var h=proCityQuery_feiche.height();
	

	if($("#sizeType").val().substring(0,3)=="300"){
		$("#dimCityQuery_feiche").css("top",h+t).css("left",l).css("margin-top","3px").css("z-index",100000).show();
	
	}
		
	
	if($(".proCityQuery_feiche").eq(clkIndex).val()==""){
			$("#dimCityQuery_feiche").hide();  
				
	}
	$(document).click(function(){
		$("#dimCityQuery_feiche").hide();   
	});
		aboutIframe();
}

function getComCodeInfoByAreaCode() {
	if ("Info"==$("#processbar").val()||"Input"==$("#processbar").val()) {
		var areacode = $("#areacode").val();
		var productcode = $("#productcode").val();
		var data = 'areacode=' + areacode;
		$.ajax({
			type : 'post',
			url : '/eproperty/eaproposal/getComcode.do',
			data : data,
			success : function(data) {
				if (data != null) {
					//老流程采用原有select下拉选择域
					if($("#seckillcode").length>0&&""!=$("#seckillcode").val()
							&&("EAJ"==productcode||"EAJ_S"==productcode||"EAK_U"==productcode)){
						$('#cityCom').html($('#cityname').val());
						if(data.count==1){
							var comcodess = data.comcodes[0].split(",");
							$("#comCodeSelect").append("<option value="+comcodess[1]+" selected>"+comcodess[0]+"</option>");
							$('#comCity').css("display","none");
							$('#comCons').css("display","none");
						}else if(data.count>1){
							$('#comCity').css("display","");
							$('#comCons').css("display","");
							$("#comCodeSelect").empty();
							$.each(data.comcodes, function(i, item){
								var comcodess =item.split(",");
								var companyName = comcodess[0].length > 12?comcodess[0].substring(0,12)+ '..':comcodess[0];
								if(($("#areacode").val()=="50000000"&&comcodess[1]=="50017900")
									||($("#areacode").val()=="21020000"&&comcodess[1]=="21022400")){
									$("#comCodeSelect").append("<option value="+comcodess[1]+" selected>"+companyName+"</option>");
								}else{
									$("#comCodeSelect").append("<option value="+comcodess[1]+">"+companyName+"</option>");
								}
							});
						}
					}
					else{
						if(data.count==1){
							var comcodess = data.comcodes[0].split(",");
							$("#comcode").val(comcodess[1]);
							$('#comcodeSelect').css("display","none");
							hideTipsNew('comcode');
						}else if(data.count>1){
							var htmlStr="";
							$.each(data.comcodes, function(i, item){
								var comcodess =item.split(",");
								var companyName = comcodess[0].length > 12?comcodess[0].substring(0,12)+ '..':comcodess[0];
								if(i==0){
									$('#comcodeSelect').children("span").html(companyName);
									$("#comcode").val(comcodess[1]);
								}
								htmlStr+='<li strValue=\"'+comcodess[1]+'\">'+comcodess[0]+'</li>';
							});
							$('#comcodeSelect').children("ul").html(htmlStr);
							$('#comcodeSelect').css("display","");
							showTipsNew('comcode',''); // 您的保单将由您选择的人保分公司为您提供后援服务。  分公司提示
							if($("#areacode").val()=="50000000"){
								$('#comcodeSelect').children("span").html("重庆分公司");
								$("#comcode").val("50017900");
							}else if($("#areacode").val()=="21020000"){
								$('#comcodeSelect').children("span").html("长海县");
								$("#comcode").val("21022400");
							}
						}
					}
				}
			},
			err : function() {
			}
		});
	}
}

function getProvinceDataByAreaCode() {
	if ("Info"==$("#processbar").val()) {
		var mailareacode = $("#mailareacode").val();
		var data = 'mailareacode=' + mailareacode;
		$.ajax({
			type : 'post',
			url : '/eproperty/eaproposal/getProvinceData.do',
			data : data,
			success : function(data) {
				if (data != null) {
					if(data.count>=1){
						var htmlStr="";
						$.each(data.addressQ, function(i, item){
							var addressQ =item.split(",");
							if(i==0){
								$('#addressQSelect').children("span").html(addressQ[1]);
								$("#input_sendQAddress").val(addressQ[1]);
							}
							htmlStr+='<li strValue=\"'+addressQ[1]+'\">'+addressQ[1]+'</li>';
						});

						$('#addressQSelect').children("ul").html(htmlStr);
						$('#addressQSelect').show();
					}else{
						if("42"==mailareacode.substr(0,2)||"46"==mailareacode.substr(0,2)){
							$("#input_sendQAddress").val("");
						}else{
							$("#input_sendQAddress").val($("#mailcityname").val());
						}
						$('#addressQSelect').hide();
					}
				}
			},
			err : function() {
			}
		});
	}else if($("#seckillcode").length>0&&""!=$("#seckillcode").val()){
		//老流程采用原有select下拉选择域
		var mailareacode = $("#areacode").val();
		var data = 'mailareacode=' + mailareacode;
		$.ajax({
			type : 'post',
			url : '/eproperty/eaproposal/getProvinceData.do',
			data : data,
			success : function(data) {
				if (data != null) {
					if(data.count>=1){
						$("#div_sendAddress").html("<label>收件地址 : </label> <span id='input_sendSAddress' name='input_sendSAddress'></span><select class='type_select' id='input_sendQAddress' name='postqaddress'></select>");
						$("#input_sendSAddress").html($("#cityname").val());
						$.each(data.addressQ, function(i, item){
							var addressQ =item.split(",");
							if(i==0){
								$("#input_sendQAddress").append("<option value="+addressQ[1]+" selected>"+addressQ[1]+"</option>");
							}else{
								$("#input_sendQAddress").append("<option value="+addressQ[1]+" selected>"+addressQ[1]+"</option>");
							}
						});
					}
				}
			},
			err : function() {
			}
		});
	}
}

function areaLinkage(clkIndex){
	if("JAB_A"==$("#productcode").val()){
		getRate('sync');
		if($("#areacode").val()=="33020000"){
			setTplus7day();
		}
		return true;
	}
	var linkerName=$("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id");
	if(linkerName=="cityname"&&"BWSJ"!=$("#productcode").val()){
		getComCodeInfoByAreaCode();
		if("JCO" == $("#productcode").val()){//地震巨灾获取机构的同时也获取区县
			$("#cityname1").val($("#cityname").val());
			showValidateResultNew("cityname", "");
			 getByAreaCode();
			 setJCOAmountInfo();
		 }else if("JBM_S" == $("#productcode").val()){
			 $("#cityname1").text($("#cityname").val());
				showValidateResultNew("cityname", "");
				 getByAreaCode();
		 }
		//抢购流程切换城市时动态更新保单及发票寄送地址
		if($("#seckillcode").length>0&&""!=$("#seckillcode").val()){
			getProvinceDataByAreaCode();
			if("EAJ"==$("#productcode").val()||"EAJ_S"==$("#productcode").val()){
				showInvoiceDiv($("#sumpremium").val());
			}
		}
	}else if(linkerName=="mailcityname"){
		if(mailAreaCodeO != $("#mailareacode").val()){
			getProvinceDataByAreaCode();
		}else{
			$("#input_sendQAddress").val($("#mailcityname").val());
		}
	}
}
function getByAreaCode() {
	if ("Info"==$("#processbar").val()) {
		var propertyareacode = $("#areacode").val();
		var data = 'mailareacode=' + propertyareacode;
		$.ajax({
			type : 'post',
			url : '/eproperty/jdproposal/getProvinceData.do',
			data : data,
			async : false,
			success : function(data) {
				if (data != null) {
					if(data.count>=1){
						var htmlStr="";
						$.each(data.addressQ, function(i, item){
							var addressQ =item.split(",");
							if(i==0){
								$('#countySelect').children("span").html(addressQ[1]);
								if("JCA"==$("#productcode").val()){									
									$("#postqaddress").val(addressQ[1]);
								}else if("JCO" == $("#productcode").val()){
									$("#propertyqaddress").val(addressQ[0]);
									$("#propertyqaddressname").val(addressQ[1]);
								}else{
									$("#propertyqaddress").val(addressQ[1]);
								}
							}
							htmlStr+='<li strValue=\"'+addressQ[0]+'\">'+addressQ[1]+'</li>';
						});

						$('#countySelect').children("ul").html(htmlStr);
						$('#countySelect').show();
					}else{
						$('#countySelect').hide();
						$("#propertyqaddress").val("");
						$("#propertyqaddressname").val("");
					}
				}
			},
			err : function() {
			}
		});
	}
}
