$(document).ready(function() {
//When page loads...
	$("#div_nationalitySelect .tab_content").hide(); //Hide all content
	
	$("#div_nationalitySelect ul.tabs li:first").addClass("active").show(); //Activate first tab
	
	$("#div_nationalitySelect .tab_content:first").show(); //Show first tab content
	
	//On Click Event
	
	$("ul.tabs li").click(function() {
	
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		
		$(this).addClass("active"); //Add "active" class to selected tab
		
		$(".tab_content").hide(); //Hide all tab content
		
		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		
		$(activeTab).fadeIn(); //Fade in the active ID content
		
		return false;
	
	});
			
	$(".commonNationalityName").click(function(){
		$('#input_applyCountryName').val($(this).text());
		$("#input_applyCountryCode").val($(this).parents().eq(0).attr("nationalityCode"));
		$("#applyIsResidentSelectSpan").parent().prev().removeClass('errorAddress');
		hideNationalityTools();
	})
			
	//$(".nationalityAll a").click(function(){
	$(".nationalityAll a").live("click",function(){
		//$(".nationalityAll").delegate("a","click",function(){
		$('#input_applyCountryName').val($(this).parents().eq(1).children(":first").children(":first").text());
		$("#input_applyCountryCode").val($(this).parents().eq(1).attr("nationalityCode"));
		hideNationalityTools();
	})
	
	$(document).click(function(){
		if($('#searchResultFlag').val()=="0")
		{
			$('#input_applyCountryCode').val('');
			$('#input_applyCountryName').val('');					
		}
		hideNationalityTools();
		var activeText = $(document.activeElement).attr('id');
		if(activeText != 'input_applyCountryName'){
			if($('#div_nationalitySelect').css('display') == 'block'){
				$('#div_nationalitySelect').hide();
			}else if($('#div_nationalityInput').css('display') == 'block'){
				$('#div_nationalityInput').hide();
			}
		}
		else{
			$('#div_nationalitySelect').show();
		}

		if($.trim($('#input_applyCountryName').val()).length == 0){
			$('#input_applyCountryCode').val('');
			$('#input_applyCountryName').val('');
		}
	});	

	$('#input_applyCountryName').bind('keyup',function(e){
		if($.trim($('#input_applyCountryName').val()).length > 0){
			$('#div_nationalitySelect').hide();
			$('#div_nationalityInput_age').show();
			var o=$("#input_applyCountryName").offset();
		    var l=o.left;
	     	var t=o.top;
		    var h=$("#input_applyCountryName").outerHeight();
		    var productcode = $("#productcode").val();
		    if("EAA"==productcode || "JTE_D"==productcode || "ECR"==productcode || "EDD_R"==productcode){//对外合作渠道产品代码
		    	$("#div_nationalityInput").css("position","absolute").css("top",t+h-1-89).css("left",l).css("margin-top","10px").css("z-index",100000).show();
		    }else{
		    	$("#div_nationalityInput").css("position","absolute").css("top",t+h-1).css("left",l).css("margin-top","10px").css("z-index",100000).show();
		    }
		    getNationalityAge();
		}else{
			$('#div_nationalitySelect').show();
			$('#div_nationalityInput_age').hide();
			$("#firstli_nationality").css("display","");
			$("#allli").css("display","");
			$(".tab_content").hide(); //Hide all content
			$("ul.tabs li").removeClass("active"); //Remove any "active" class
			$("ul.tabs li:first").addClass("active").show(); //Activate first tab
			$(".tab_content:first").show(); //Show first tab content
		}
	});
	$('#input_applyCountryName').bind('focus', function(e){
		showValidateResult("input_applyIsResident", "");
		showTipsNew("applyIsResidentSelectSpan","");
		$('#div_nationalitySelect').show();
		$('#div_nationalityInput_age').hide();
		$("#div_nationalitySelect .tab_content").hide(); //Hide all content
		$("#div_nationalitySelect ul.tabs li").removeClass("active"); //Remove any "active" class
		//$("ul.tabs li:first").addClass("active").show(); //Activate first tab
		$("#commonNationality").show();
		$("#firstli_nationality").addClass("active");
		//$(".tab_content:first").show(); //Show first tab content
		var o=$("#input_applyCountryName").offset();
	    var l=o.left;
     	var t=o.top;
	    var h=$("#input_applyCountryName").outerHeight();
		$("#firstli_nationality").css("display","");
		$("#allli").css("display","");
		$("#div_nationalitySelect .tab_content").hide(); //Hide all content
		$("#div_nationalitySelect ul.tabs li").removeClass("active"); //Remove any "active" class
		$("#div_nationalitySelect ul.tabs li:first").addClass("active").show(); //Activate first tab
		$("#div_nationalitySelect .tab_content:first").show(); //Show first tab content
		if("EAA" == $("#productcode").val()||"ECR" == $("#productcode").val()||"EDD_R" == $("#productcode").val()){
			$("#div_nationalitySelect").css("top",t+h-97).css("left",l).css("margin-top","10px").css("z-index",100000);
		}else if("JTE_Y" == $("#productcode").val()){
			$("#div_nationalitySelect").css("top",t+h-97).css("left",l).css("margin-top","10px").css("z-index",100000);
		}else if("JTE_D" == $("#productcode").val()){
			$("#div_nationalitySelect").css("top",t+h-97).css("left",l).css("margin-top","10px").css("z-index",100000);
		}else if("EAL_L" == $("#productcode").val()){
			$("#div_nationalitySelect").css("top",t+h-97).css("left",l).css("margin-top","10px").css("z-index",100000);
		}else if("ZFO" == $("#productcode").val()){
			$("#div_nationalitySelect").css("top",t+h-1).css("left",l).css("margin-top","10px").css("z-index",100000);
			$("#countrytabsDiv").css("width","262px");
		}else{
			$("#div_nationalitySelect").css("top",t+h-1).css("left",l).css("margin-top","10px").css("z-index",100000);
		}
		
	});
});

function hideNationalityTools()
{
	$("#div_nationalitySelect").hide();
	$("#div_nationalityInput").hide();
	$('#searchResultFlag').val("1");
	
}

function test1111(){
	$(".tab_content").hide(); //Hide all content
}