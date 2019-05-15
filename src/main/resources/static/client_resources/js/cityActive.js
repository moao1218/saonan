var cities = new Array();
var ipArea ;
var clkIndex;
var mailAreaCodeO;
//获取城市
$(document).ready(function(){
	if($("#productcode").val()=="EFG_M"){
		$("body").find(".proCityQuery_feiche").eq(0).val("北京");
		document.getElementById("cityname").setAttribute("readonly",true ,0);
	}
	var jsonFile='/eproperty/js/city/city.json';
	if("LEF"==$("#productcode").val() || "LXL"==$("#productcode").val() ){
//		jsonFile='/eproperty/js/city/GDnFJ.json';
		jsonFile='/eproperty/js/city/LEFCity.json';
	}
	if($("#productcode").val()=="BWSJ"){
		jsonFile='/eproperty/js/city/lifecity.json';
	}
	if($("#productcode").val()=="JMA"){
		jsonFile='/eproperty/js/city/JMACity.json';
	}
	if($("#productcode").val()=="ZXF"){
		jsonFile='/eproperty/js/city/ZXFCity.json';
	}
	if($("#productcode").val()=="JCO"){
		jsonFile='/eproperty/js/city/JCOcity.json';
	}
	if($("#productcode").val()=="EDD_R"){
		jsonFile='/eproperty/js/city/EDD_Rcity.json';
	}
	if("EAK_G"==$("#productcode").val() || "EAK_U"==$("#productcode").val() ){
		jsonFile='/eproperty/js/city/EAKcity.json';
	}
	if($("#productcode").val()=="EJQ_S"){
		jsonFile='/eproperty/js/city/EJQ_Scity.json';
	}
	if($("#productcode").val()=="JBD_B"){
		jsonFile='/eproperty/js/city/JBD_Bcity.json';
	}
	$.ajax({
		type:'get',
		url:jsonFile,
		dataType:'json',
		success:function(data){
			var txt = $.trim($('#cityname').val().toLowerCase());
			var citys = new Array();
			$.each(data, function(i,item){
				var itemid = item.proid;
				var itemname = item.proname;
				var itemval = item.citys;
				$.each(itemval, function(j, val){
						var city = new Array();
						var valid = val.cityid;
						var valname = val.cityname;
						var valpinyin = val.citypinyin;	
						city.push(itemid=='hot'?'':itemid);
						city.push(valid);
						city.push(valname);
						city.push(valpinyin);
						citys.push(city);
						if($("#productcode").val()=="JAB_A" || $("#productcode").val()=="LDT_E" || $("#productcode").val()=="JBM_S"){
							if(valname == txt){
								showCityNameSpan("citynameSpan",itemname,valname);
								showInlineTips("houseaddress");
							}
						}
				});
			});
			
				for(var i = 0; i < citys.length; i++){
				cities[i]=[citys[i][0], citys[i][1], citys[i][2]];
				}
		}
	});
	
	
	
	
	var pro_index=1;
$("#pre_arrow").mousedown(function(){ 

    if(pro_index!=1){
    	$("#next_arrow").addClass("can");
    	for(i=0;i<12;i++){
    	    var nextIndex = i+(pro_index-1)*12;
    	    var preIndex = i+(pro_index-2)*12;
    	    $(".province").find("li").eq(nextIndex).hide();
    	    $(".province").find("li").eq(preIndex).show(); 	  	    
    	}
    	pro_index = pro_index-1;
    	if(pro_index==1){
    		$(this).removeClass("can");
    	}
    }
});
$("#next_arrow").mousedown(function(){ 
		
	if(pro_index!=3){
		
    	$("#pre_arrow").addClass("can"); 	    
    	for(i=0;i<12;i++){
    	    var nextIndex = i+(pro_index)*12;

    	    var preIndex = i+(pro_index-1)*12;
    	    $(".province").find("li").eq(nextIndex).show();
    	    $(".province").find("li").eq(preIndex).hide(); 	     
    	}
   	     pro_index = pro_index+1;
   	     if(pro_index==3){
   	     	$(this).removeClass("can");
   	     }
    }
});
$(".proCityQuery_feiche").keypress(function(){ 
		
	if(event.keyCode==13) return false;
});

	

	 $("body").delegate(".proCityQuery_feiche","click",function(event){
	    $('.country_control').hide();//隐藏国家控件显示
		//关闭错误提示
		if($("#seckillcode").length>0&&""!=$("#seckillcode").val()){
			showValidateResult("cityname","");
		}
		if($("#productcode").val()=="EFG_M"){
			return;
		}
		if($("#productcode").val()=="EAJ"||$("#productcode").val()=="EAG_V"||$("#productcode").val()=="EAJ_S"||$("#productcode").val()=="EAJ_Y"){
				$("#tt").hide();
				$("#tt_lanxiang").hide();
			}
		if( $("#dimCityQuery_feiche").is(":visible") ){
			return false;
		}
		clkIndex=$("body").find(".proCityQuery_feiche").index(this);

		var o=$(this).offset();
		var l=o.left;
		var t=o.top;
		var h=$(this).outerHeight();
		
		
		//TODO 显示位置
		var z = $(this).css("z-index");
		

		if($("#sizeType").val()=="300"){
				$(".provinceCity_feiche").css("top",t+h-1).css("left",l).css("margin-top","10px").css("z-index",100000).show();
		}
		if("EAL_L" == $("#productcode").val()){	
			$(".provinceCity_feiche").css("top",t+h-95).css("left",l).css("margin-top","10px").css("z-index",100000).show();
		}
		if("EDD_R" == $("#productcode").val()){	
			$(".provinceCity_feiche").css("top",t+h-95).css("left",l).css("margin-top","10px").css("z-index",100000).show();
		}
		$(".provinceCity_feiche").click(function(event){
			event.stopPropagation();
		});
		
		event.stopPropagation();
		$("html").click(function(){
			$(".provinceCity_feiche").hide();
//			if("JMA" == $("#productcode").val()){ 
//				getItemdata(); 
//				setJMACity("#cityname","input"); 
//			}
		});
		aboutIframe();
	});
	 
	  $("body").delegate(".proCitySel","click",function(event){
		$("#dimCityQuery_feiche").hide();
		clkIndex=$("body").find(".proCitySel").index(this);
		$("body").find(".proCityQuery_feiche").eq(clkIndex).trigger("click");
		event.stopPropagation();
		$("html").click(function(){
		$(".provinceCity_feiche").hide();
	
		});		
		aboutIframe();						
	});
	
	var proHeight =110;

	$(document).click(function(){
			$(".provinceCity_feiche").hide();
			if($("#productcode").val()=="EAJ"||$("#productcode").val()=="EAG_V"||$("#productcode").val()=="EAJ_S"||$("#productcode").val()=="LAY_A"||$("#productcode").val()=="LAY_N"||$("#productcode").val()=="LAY_G"||$("#productcode").val()=="LAY_J"||$("#productcode").val()=="EAJ_Y"){
				var activeText = $(document.activeElement).attr('id');
					if(activeText != 'txt'){
						if($('#tt').css('display') == 'block'){
							checkSelect();
							$('#tt').hide();
						}else if($('#age_div_1').css('display') == 'block'){
							checkInputSelect();
							$('#age_div_1').hide();
						}
					}
					if($.trim($('#txt').val()).length == 0){
						$('#businessSite').val('');
					}
			}
					aboutIframe();
	});	
	
	//点击页面上省的标签
	$(".province li").delegate("a","click",function(){
		var v=$(this);
		$("#provinceCode").val($(this).parent().val());
		changeCity(v);
		$(".pre").parent().hide();
		$(".city").show();
		var len = $(".provinceCity_feiche .city li").length;
	    var a=len%4;
		if(a>0){
		   len =len-a+4;
	    }
	    proHeight=110+(len/4-4)*20;
	    //--------------end
		if(proHeight>110){
			$(".provinceCity_feiche .con").css("height",proHeight);
		}else{
			$(".provinceCity_feiche .con").css("height","110");
		}
		$(".provinceCity_feiche").find(".tabs").find("li").removeClass("current");
		if("EDD_R" == $("#productcode").val()||"ZXF" == $("#productcode").val()){
			$(".provinceCity_feiche").find(".tabs").find("li").eq(1).addClass("current");
		}else{
			$(".provinceCity_feiche").find(".tabs").find("li").eq(2).addClass("current");
		}
		aboutIframe();
		
	});
	 
	//热门城市选择
	var citySel_0 ="";
    $(".provinceCity_feiche .city0 li").delegate("a","click",function(){
        if(citySel_0!=""){
   		   citySel_0.removeClass("selected");
   	    }
   	    citySel_0 = $(this);
        $(this).addClass("selected");					   
		var v=$(this).html();
		$("body").find(".proCityQuery_feiche").eq( clkIndex ).val( v );
		
		$(".provinceCity_feiche").hide();
		
		aboutIframe();
		if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
			$("#mailareacode").val($(this).parents().eq(0).attr("value"));
		}else{
			var areaCode = $(this).parents().eq(0).attr("value");
			var provinceCode = "";
			for(var i = 0; i < cities.length; i++){
				if(areaCode==cities[i][1]){
					provinceCode = cities[i][0];
					break;
				}
			}
			$("#areacode").val(areaCode);
			$("#provinceCode").val(provinceCode);
			var productCode = $("#productcode").val();
			//电子发票展示控制
			if("LXL" == productCode || "EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode|| ("JBD_B" == productCode&&$("#salemode").val()!="05")|| "JBM_S" == productCode){
				showInvoiceDivNew($("#sumpremium").val());
			}
			if("EJQ_S" == productCode|| ("JBD_B" == productCode&&$("#salemode").val()=="05")){
				getComCodesByAreaCode();
			}
			//规范归属机构控制
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
		//TODO 需要添加机构和区 
		areaLinkage(clkIndex);
		//JMA给房屋所在城市 投保方案名称 赋值
		if("JMA" == $("#productcode").val()){
			getItemdata();
			setJMACity(this);
		}
	});
     
    //选择tabs,如热门城市，省，市
	$(".provinceCity_feiche").find(".tabs").find("a").click(function(){
		$(".provinceCity_feiche").find(".tabs").find("li").removeClass("current");
		$(this).parent().addClass("current");
		if($(".provinceCity_feiche .tabs .current a").text()=="ː"||$(".provinceCity_feiche .tabs .current a").text()=="市"){
	    	$(".provinceCity_feiche .con").css("height",proHeight);
	    }else{
	    	$(".provinceCity_feiche .con").css("height","110");
	    }
		var tb=$(this).attr("tb");
		$(".provinceCity_feiche").find(".con").children().hide();
		$(".provinceCity_feiche").find(".con").find("."+tb).show();
		aboutIframe();
	});



	var dimCityDiv="<div id='dimCityQuery_feiche'><ul id='dim_ul'></ul></div>";
	$("body").append(dimCityDiv);
	$("body").delegate(".proCityQuery_feiche" , ($.browser.opera ? "keypress" : "keyup") , function(event){ 
		

		if(event.keyCode==32){
			return false;
		}
		clkIndex=$("body").find(".proCityQuery_feiche").index(this);
		//if( $("#dimCityQuery_feiche").is(":visible") ){
			lastKeyPressCode = event.keyCode;
			switch(lastKeyPressCode) {
				case 40:  
					$("#dimCityQuery_feiche").trigger("selNext");
				break;
				case 38: 
					$("#dimCityQuery_feiche").trigger("selPrev");
				break;
				case 13: 
					$("#dimCityQuery_feiche").trigger("enter");
				break;
			
			}
			//return false;
		//}	
	
		$(".provinceCity_feiche").hide();
		var v=$.trim($(this).val());
		var o=$(this).offset();
		var l=o.left;
		var t=o.top;
		var w=$(this).width();
		var h=$(this).height();
		
		get_age(clkIndex);

			aboutIframe();
		
	});
	
	
	

	$("body").delegate("#dimCityQuery_feiche li" , "hover" , function(){ 
		$(this).addClass("current").siblings().removeClass("current")
	},function(){$(this).removeClass("current")});
	

	$("#dimCityQuery_feiche").delegate("" , "selNext" , function(){
				var next=$(this).find("li.current").next();
				if(next.size()>0)  { 
				next.addClass("current").siblings().removeClass("current") 
				}
				else{
					$("#dimCityQuery_feiche li").removeClass("current").first().addClass("current")
			    };
				var v=$(this).find("li.current a").html();
				v=v.split("(");
				$("body").find(".proCityQuery_feiche").eq( clkIndex ).val( $.trim(v[0]) );
				if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
					$("#mailareacode").val($(this).find("li.current").attr("value"));
				}else{
					$("#areacode").val($(this).find("li.current").attr("value"));
				}
				$("#areacode").val($(this).find("li.current").attr("value"));
				var productCode = $("#productcode").val();
				//电子发票展示控制
				if("LXL" == productCode || "EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode|| "JBM_S" == productCode){
					showInvoiceDivNew($("#sumpremium").val());
				}
				//规范归属机构控制
				$("#cityname").blur();
				checkMakeComCode();
				//JMA给房屋所在城市 投保方案名称 赋值 
				if("JMA" == $("#productcode").val()){ 
					getItemdata(); 
					setJMACity($(this).find("li.current")); 
				}
				//TODO
				areaLinkage(clkIndex);
				aboutIframe();
				
	});

	$("#dimCityQuery_feiche").delegate("" , "selPrev" , function(){
			var prev=$(this).find("li.current").prev();
				if(prev.size()>0)  { prev.addClass("current").siblings().removeClass("current") }
				else{ $("#dimCityQuery_feiche li").removeClass("current").last().addClass("current")};
				var v=$(this).find("li.current a").html();
				v=v.split("(");
				$("body").find(".proCityQuery_feiche").eq( clkIndex ).val( $.trim(v[0]) );
				if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
					$("#mailareacode").val($(this).find("li.current").attr("value"));
				}else{
					$("#areacode").val($(this).find("li.current").attr("value"));
				}
				var productCode = $("#productcode").val();
				//电子发票展示控制
				if("LXL" == productCode || "EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode || "JBM_S " == productCode){
					showInvoiceDivNew($("#sumpremium").val());
				}
				//规范归属机构控制
				$("#cityname").blur();
				checkMakeComCode();
				//JMA给房屋所在城市 投保方案名称 赋值 
				if("JMA" == $("#productcode").val()){ 
					getItemdata(); 
					setJMACity($(this).find("li.current")); 
				}
				//TODO
				areaLinkage(clkIndex);
				aboutIframe();
	});
	

	$("#dimCityQuery_feiche").delegate("" , "enter" , function(){
			var cur=$(this).find("li.current");
				if(cur.size()>0)  { 
					cur.find("a").trigger("click");
				};
				aboutIframe();
	});



	$("body").delegate("#dimCityQuery_feiche li a" , "click" , function(){
		var v=$(this).html();
		v=v.split("(");
		$("body").find(".proCityQuery_feiche").eq( clkIndex ).val( $.trim(v[0]) );
		if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
			$("#mailareacode").val($(this).parents().eq(0).attr("value"));
		}else{
			$("#areacode").val($(this).parents().eq(0).attr("value"));
		}
		var productCode = $("#productcode").val();
		//电子发票展示控制
		if("LXL" == productCode || "EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode){
			showInvoiceDivNew($("#sumpremium").val());
		}
		//规范归属机构控制
		$("#cityname").blur();
		checkMakeComCode();
		//JMA给房屋所在城市 投保方案名称 赋值 
		if("JMA" == $("#productcode").val()){ 
			getItemdata(); 
			setJMACity(this);  
		}
		areaLinkage(clkIndex);
		$("#dimCityQuery_feiche").hide();
		//选择常用地址，如果产品为YXL，需要刷新方案信息
		if(",YXL,".indexOf(productCode)>-1){
			toggleCombo("combo_C","1");
		}
		if(",YEHKM,".indexOf(productCode)>-1){
			uploadCombo("cityChange");
		}
		if(",WAF_N,".indexOf(productCode)>-1){
			calculateFee("sync");
		}
		if(",EJQ_S,JBD_B,".indexOf(productCode)>-1){
			getComCodesByAreaCode();
		}
		aboutIframe();
		
	});
	

	 $("body").delegate(".proCityQuery_feiche","blur",function(event){	
	 	var exitFlag=false;
	 	var areaCode="";
	 	var cityStr="";
	 	mailAreaCodeO = $("#mailareacode").val();
 		if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
 			cityStr=$("#mailcityname").val();
		}else{
			cityStr=$("#cityname").val();
 		}
	 	$("#cityname").val()
	 	for(var i = 0; i < cities.length; i++){
				if(cities[i][2]==cityStr){
					areaCode=cities[i][1];
					exitFlag=true;
					break;
				}
		}
	 	if(!exitFlag){
	 		if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
					$("#mailcityname").val("");
					$("#mailareacode").val("");
					$("#input_sendQAddress").val("");
					$('#addressQSelect').hide();
			}else{
				$("#cityname").val("");
				$("#areacode").val("");
				$("#comcode").val("");
				$('#comcodeSelect').hide();
				if ("JCO"==$("#productcode").val()) {
					$('#countySelect').hide();
					$('#cityname1').val("");
				}
	 		}
	 	}else{
			if($("body").find(".proCityQuery_feiche").eq(clkIndex).attr("id")=="mailcityname"){
				$("#mailareacode").val(areaCode);
			}else{
				$("#areacode").val(areaCode);
			}
			//当输入汉字城市，城市存在且产品代码是YXL时，刷新页面方案
			var productCode = $("#productcode").val();
			if(",YXL,".indexOf(productCode)>-1){
				toggleCombo("combo_C","1");
			}
			if(",YEHKM,".indexOf(productCode)>-1){
				uploadCombo("cityChange");
			}
			if(",EJQ_S,JBD_B,".indexOf(productCode)>-1){
				getComCodesByAreaCode();
			}
			areaLinkage(clkIndex);
	 	}
	 	aboutIframe();
	 });
	 $(window).resize(function() {
	 	
	 	var o=$("body").find(".proCityQuery_feiche").offset();
		    var l=o.left;
	     	var t=o.top;
		    var h=$("body").find(".proCityQuery_feiche").outerHeight();
	    
		  	if($("#sizeType").val()=="300"){
		  		$(".provinceCity_feiche").css("top",t+h-1).css("left",l).css("margin-top","10px").css("z-index",100000);
//		    $(".provinceCity_feiche").css("top","auto").css("left","auto").css("margin-top","5px").css("z-index",100000).show();
			}
		  
				if($("#sizeType").val().substring(0,3)=="300"){
					$("#dimCityQuery_feiche").css("top",h+t).css("left",l).css("margin-top","3px").css("z-index",100000);
						aboutIframe();
						
				}
					
	
				if($(".proCityQuery_feiche").val()==""){
						$("#dimCityQuery_feiche").hide();  
							
				}
			if($("#productcode").val()=="EAJ"||$("#productcode").val()=="EAG_V"||$("#productcode").val()=="EAJ_S"||$("#productcode").val()=="EAJ_Y"){
				changeCountry();
			}
	});
	 //getAreacodeByIP
	 if(""==$("#areacode").val()&&$("#productcode").val()!="LEF"&&$("#productcode").val()!="BWSJ"){
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
						 if("LXL" == productCode || "EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode){
								showInvoiceDivNew($("#sumpremium").val());
							}
						 
						 //规范归属机构展示控制
						 if($("#areacode").val() != ""){
							 getComCodeInfoByAreaCode();
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
function changeCountry(){
			var o=$("#txt").offset();
		    var l=o.left;
	     	var t=o.top;
		    var h=$("#txt").height();
			$("#tt_lanxiang").css("position","absolute").css("top",t+h-1).css("left",l).css("margin-top","10px").css("z-index",100000);
			$("#tt").css("position","absolute").css("top",t+h-1).css("left",l).css("margin-top","10px");
			aboutIframe();
	}
function aboutIframe(){
		var o=$("body").find(".proCityQuery_feiche").offset();
		    var l=o.left;
	     	var t=o.top;
		    var h=$("body").find(".proCityQuery_feiche").outerHeight();
	if($(".provinceCity_feiche").css("display")!="none"){

				if($("#tt_iframe").length>0){
					
						$("#tt_iframe").css("top",t+h-1).css("left",l).css("margin-top","10px").css("position","absolute").css("z-index","1").show();
						$("#tt_iframe").css("height",$(".provinceCity_feiche").css("height")).show();
				
					}
			}else if($("#dimCityQuery_feiche").css("display")!="none"){

				if($("#tt_iframe").length>0){
						$("#tt_iframe").css("top",t+h-1).css("left",l).css("margin-top","10px").css("position","absolute").css("z-index","1").show();
						$("#tt_iframe").css("height",$("#dimCityQuery_feiche").css("height")).show();
				
					}
			}else if(($("#tt").length>0)&&($("#tt_lanxiang").css("display")!="none"||$("#tt").css("display")!="none")){

				changeCountryIfrme();
			}else{
					if($("#tt_iframe").length>0){
					$("#tt_iframe").hide();
				}
				
			}
	
	
}
function changeCountryIfrme(){
			var o=$("#txt").offset();
		    var l=o.left;
	     	var t=o.top;
		    var h=$("#txt").height();
	if($("#tt_lanxiang").css("display")!="none"){
				if($("#tt_iframe").length>0){
						$("#tt_iframe").css("top",t+h-1).css("left",l).css("margin-top","10px").css("position","absolute").css("z-index","1").show();
						$("#tt_iframe").css("height",$("#tt_lanxiang").css("height")).show();
				
					}
			}
			 if($("#tt").css("display")!="none"){
				if($("#tt_iframe").length>0){
				      //  alert(121212121)
						$("#tt_iframe").css("top",t+h-1).css("left",l).css("margin-top","10px").css("position","absolute").css("z-index","1").show();
					//	var k = $("#tt_iframe").offset();
					//	alert(k.top)
						$("#tt_iframe").css("height",$("#tt").css("height")).show();
					//	var s = $("#tt_iframe").offset();
					//	alert(s.top)
				
					}
			}
	
}

function bodyClickEvent_feiche(){
	
			$(".provinceCity_feiche").hide();
			if($("#productcode").val()=="EAJ"||$("#productcode").val()=="EAG_V"||$("#productcode").val()=="EAJ_S"||$("#productcode").val()=="EAJ_Y"){
				var activeText = $(document.activeElement).attr('id');
					if(activeText != 'txt'){
						if($('#tt').css('display') == 'block'){
							checkSelect();
							$('#tt').hide();
						}else if($('#age_div_1').css('display') == 'block'){
							checkInputSelect();
							$('#age_div_1').hide();
						}
					
					}

					if($.trim($('#txt').val()).length == 0){
						$('#businessSite').val('');
					}
				
			}
			
			
						
	
}