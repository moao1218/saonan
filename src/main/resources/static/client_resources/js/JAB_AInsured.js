//标志位，根据此标志判断页面中被保险人数变化时，是否需要将实际的被保险人数量赋值到peoplecount中，
//进入页面当peoplecount和实际的被保险人数相等时， 需要赋值。
$(function(){
	var lastProcessbar = $("#lastProcessbar").val();
	var peoplecount = $('#peoplecount').val(); //前一页填写的投保人数
	//如果是从确认页面上一步操作回到基本信息页面，投被保人关系无需赋默认值，以客户所填为准
	//如果是正常投保流程跳转，没有上一步操作，从intro跳转input
	//如果applyRelation隐藏为空，说明是首次进入input页面，赋默认值
	if(peoplecount==1&&$("#relation").val()==''){
	//遍历selector标签
		 $("#relation").val("01");
		 $("#relation").siblings("span").text("本人");
	 }

	 //投保人数大于1或者是数据库中总被保险人数量大于1，且上年保单为团单时展示添加上年保单被保险人按钮
	 //去掉投保人数判断，上年保单为团单即展示添加上年保单被保险人按钮
	 if($("#oldcontractno").val()!= "")
	 {
		$("#oldOrderInsureds_btn").show();
	 }
	 
	setInsuredTableHead();//TODO
	 if($("#entryId").val()!="" && $("#seckillcode").val() ==""){
		getEntryInsured();
	}
	 //根据城市代码判断省代码
	 for(var i=0;i<cityNews.length;i++){
		 city=cityNews[i];
		 if(city[1] == $("#areacode").val()){
			$("#provinceCode").val(city[0]);
			break;
		 }
	 }
	//单人定额方案保费大于150元，显示发票寄送信息和送单地址
	 if(parseFloat($("#unitpremium").val())>=150.00){
		 showInvoiceDivNew($("#unitpremium").val()); 
	 }else{
		 showInvoiceDivNew($("#sumpremium").val()); 
	 }
	 $(".closedialog").click(function(){
		closedialog(".dialog");
//		$('#input_applyName').focus();
	 });
	 //护照说明
		$('.shuoming_btn').click(function(e){
			var of = $(this).offset();
			var w = $(this).width();
			$('.shuoming').css({'top':of.top,'left':of.left+w+10}).fadeIn();
			e.stopPropagation();
		});
		$(document).click(function(){
			if(!$(this).is('.shuoming') || !$(this).is('.shuoming_btn')){
				$('.shuoming').fadeOut('fast');	
			}	
		});
});






function setApplyNameToSendname(){
	if($.trim($('#input_applyName').val())!=""&&checkApplyName("input_applyName")){
		if($.trim($('#input_sendName').val())==""&&$('#input_applyName').val()!=$('#input_applyName').attr("data-value")){
			$('#input_sendName').val($('#input_applyName').val());
		}
		$('#invoice').html($('#input_applyName').val());
		if($.trim($('#input_invoiceTile').val())==""&&$('#input_applyName').val()!=$('#input_applyName').attr("data-value")){
			$('#input_invoiceTile').val($('#input_applyName').val());
		}
	}
}

function setApplyMobileToSend(){
	if($.trim($('#input_applyMobile').val())!=""&&checkApplyMobile("input_applyMobile")){
		if($.trim($('#input_sendMobile').val())==""){
			$('#input_sendMobile').val($('#input_applyMobile').val());
			//$('#postmobile').val($('#input_applyMobile').val());
			var iswebservice = $("#iswebservice").val();
			if(iswebservice!=""){//已经有值
				var otherflag = iswebservice.substring(0,1);
				$("#iswebservice").val(otherflag+"1");
			}else{//空，没有值，初次赋值
				$("#iswebservice").val("01");
			}
		}
	}
}

function setApplyMobile(){
//	if($.trim($('#input_applyMobile').val())!=""){
			//$('#applyMobile').val($('#input_applyMobile').val());
//	}
}

function setPostMobile(){
//	if($.trim($('#input_sendMobile').val())!=""){
			//$('#postmobile').val($('#input_sendMobile').val());
//	}
}

function setNationality(){
	if('01|02|04|17'.indexOf($.trim($('#input_applyIndentifyType').val()))>-1)
	{
		$("#nationalityTitle").hide();
		$("#nationalityInput").hide();
		$("#input_applyCountryName").val("中国");
		$("#input_applyCountryCode").val("CHN");
		$("#input_applyIsResident").val("A");
		$("#applyIsResidentSelectSpan").html("居民");
	}
	else
	{
		$("#nationalityTitle").show();
		$("#nationalityInput").show();
		if($.trim($('#input_applyCountryName').val())=="")
			$('#input_applyCountryName').val("中国");
		if($.trim($('#input_applyCountryCode').val())=="")
			$("#input_applyCountryCode").val("CHN");
		if($.trim($('#input_applyIsResident').val())=="")
			$('#input_applyIsResident').val("A");
		if($.trim($("#applyIsResidentSelectSpan").html())=="")
			$("#applyIsResidentSelectSpan").html("居民");
	}
}

/**
 * 判断文件格式;
 * @return
 */
function filechange(){
	var wj = $("#drwj").val();
	var tab = document.getElementById('sc');
	var stuffix=wj.substr(wj.indexOf(".")+1,wj.length).toLowerCase();

	if(stuffix!='xls'){
		var url = '/eproperty/views/';
		if($("#productcode").val()!="EJQ_Z"){
			url+='EB/';
		}else{
			url+='EA/';
		}
		url+=$("#productcode").val()+'/model.xls';
		var message = '尊敬的用户，请您使用我们提供的<a class="winAboutLink" href="'+url+'">名单模板</a>的格式来上传被保险人信息。';
		var m9=encodeURI(encodeURI(message));
		closedialog(".daoru");	
		showTipsWindown(message);
		tab.disabled=true;
	}else{
		tab.disabled=false;
		//在文本框中显示文件名字：
		$('#showpath').show();
		var fileNames = new Array();
		fileNames = wj.split('\\');
		var fileName = fileNames.pop();
		var li = '<li><a href="javascript:" onclick="deleteSelectedFile();">删除</a>' + fileName +'</li>'; 
		$('#showpath').html(li);
	}
}

/**
 * 清空选择上传的文件
 */
function deleteSelectedFile(){
	$('#showpath').html("");
	$('#showpath').hide();
	$('#drwj').replaceWith('<input style = "display: block;position:absolute; left:16px; _left:0px; top:0px; width:70px; overflow:hidden; opacity:0; height:23px; filter:Alpha(Opacity=0); font-size:15px;" type = "file" id = "drwj" name = "drwj" onkeydown = "return false;" onpaste = "return false;" onchange = "filechange()" />');
	var tabx = document.getElementById('sc');
	//兼容Ie10
	if(tabx) tabx.disabled=true;
}


//***************************excel 导入相关********************************************
/**
 * 文件上传;
 * @return
 */

function submitImpExcel(){
//	//执行上传文件操作的函数
	var jsonData ={"sessionid":$("#sessionid").val(),
				  "productcode":$("#productcode").val(),
				  "riskcode":$("#riskcode").val(),
				  "startdate":$("#startdate").val(),
				  "items":$("#items").val()
				 };	
	if($("#productcode").val()=="EAJ"||$("#productcode").val()=="EAJ_S"||$("#productcode").val()=="EAG_V"){
		jsonData.isgrantvisa= $("#isgrantvisa").val();	
	}
	// 如果存在未保存的被保险人，还要把该被保险人的信息传到后台，以便保存或者删除
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
	var insuredid = lastTR.attr("id") ;
	if(lastTR.attr("flag") =="0"){
		jsonData.insuredid= insuredid;
		jsonData.insuredname= $("#input_insuredName"+insuredid).val();
		jsonData.identifytype= $("#input_identifytype"+insuredid).val();
		jsonData.identifynumber= $("#input_identifyNumber"+insuredid).val();
		jsonData.birthday= $("#input_insuredBirthday"+insuredid).val();
		jsonData.iscommoninsuredflag= $("#iscommoninsuredflag"+insuredid).val();
		jsonData.insuredflag= "1";
		jsonData.flag= "0";
	}

	$.ajaxFileUpload({
		//处理文件上传操作的服务器端地址(可以传参数)
		url:'/eproperty/importInsuredNew.do',
		//是否启用安全提交,默认为false
		secureuri:false,
        //文件选择框的id属性
		fileElementId:'drwj',
		//服务器返回的格式,可以是json或xml等
		dataType:'json',
//		contentType:"text/html; charset=utf-8",
		data:jsonData,
				complete:function(data){
					    data = jQuery.parseJSON(data.responseText);
						var success = data.success;
						var err = data.err;
						trErrContent = '';  //清零错误信息。
						//清空 file里的内容;
						$('#drwj').replaceWith('<input style = "display: block;position:absolute; left:16px; _left:0px; top:0px; width:70px; overflow:hidden; height:23px; opacity:0; filter:Alpha(Opacity=0); font-size:15px;" type = "file" id = "drwj" name = "drwj" onkeydown = "return false;" onpaste = "return false;" onchange = "filechange()" />');
						closedialog("#inputProcessing");
						if(success != null){
							$('#insuredPersonInfo').css("display","inline-block");
							$('#insuredPersonList').css("display","inline-block");
							$('#loading').css('display','inline-block');
							$("#peoplecount").val( data.itemcount);
							getSelectedPage('import');
							var firstInsured = data.firstInsured;
							//投保人信息为空的情况下，将第一条数据的记录赋值到投保人域中
							setImportApplyMsg(firstInsured);
						}else{
							var type = typeof(err);
							if(type == 'object'){
								var errCount =err.errCountType;
								if(errCount != null){
								var url = '/eproperty/views/';
								if($("#productcode").val()!="EJQ_Z"){
									url+='EB/';
								}else{
									url+='EA/';
								}
								url+=$("#productcode").val()+'/model.xls';
									err='尊敬的客户，您导入的文件包含了20条以上的错误输入，请您按照我们的<a class=\"winAboutLink\" href="'+url+'">列表模板</a>文件检查您的文件，修订后重新上传。'
									showTipsWindown(err);
									return;
								}else{								
									errData(err);
									$('#loading').css('display','none');
									$('#saveToList').attr('disabled',false);
									var content = trErrContent;
									$('#errInfo').html(content);
									popPosition(".daoruerr");
								}
							}
							else{
								var url = '/eproperty/views/';
								if($("#productcode").val()!="EJQ_Z"){
									url+='EB/';
								}else{
									url+='EA/';
								}
								url+=$("#productcode").val()+'/model.xls';
								if(err =='validModel'){
									err='尊敬的用户，请您使用我们提供的<a class="winAboutLink" href="'+url+'">名单模板</a>的格式来上传被保险人信息。';
								}
								if(err == 'validateLineToLarge'){
									err='尊敬的客户，您导入的文件包含了20条以上的错误输入，请您按照我们的<a class=\"winAboutLink\" href="'+url+'">列表模板</a>文件检查您的文件，修订后重新上传。';
								}
								if(err == 'nullFile'){
									err = '系统未检测到您的被保险人信息，请您核对后重新上传文件。';
								}
								if(err == 'overrangeInsuredcount'){
									err = '本产品单次投保，被保险人人数上限为300人!';
								}
								if(err == 'childOverrangeInsuredcount'){
									err = '本产品单次投保，被保险人人数上限为300人!';
								}
								if(err == 'roomOverrangeInsuredcount'){
									err = '本产品单次投保，被保险人人数上限为300人!';
								}
								if(err == 'oldOverrangeInsuredcount'){
									err = '本产品单次投保，被保险人人数上限为300人!';
								}
								$('#loading').css('display','none');
								$('#saveToList').attr('disabled',false);
								showTipsWindown(err);
							}
						}
				}
			});
}
//*************************end  导入excel***************************


//新流程删除一行
function deleteRow(insuredid){
	if('EAK_G'==$("#productcode").val()||'EDD_Z'==$("#productcode").val()||'EDD_J'==$("#productcode").val()||'LEF'==$("#productcode").val()){
		closeDelWindow();
	}
	checkEditTRSaved();
	var sessionid = $('#sessionid').val();
	$.ajax({
	type:'post',
	url:'/eproperty/deleteInsured.do',
	data:'sessionid=' + sessionid + '&insuredid=' + insuredid,
	success:function(data){
			if(data.result!=null){
				var itemcount = parseInt($('#peoplecount').val());
				$('#peoplecount').val(itemcount-1);
				//显示当前页
				getSelectedPage('delete');
			}else{
				showTipsWindown('删除错误，请检验数据！');
			}
		},
	    err:function(){
			showTipsWindown('删除错误，请检验数据！');
		}
	});
}

//*********************************以下为导入出错时的显示**********************
/**
* 出错内容;
*/
function errData(data){
	//非空信息;
	var errNull = data.errNull;
	if(errNull != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '没有输入内容。' +'</font>' + '</strong><br />错误行：' + errNull.errRow + ';<br />';
	}
	
	//长度;
	var errLong = data.errLong;
	if(errLong != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '输入的内容过长。' +'</font>' + '</strong><br />错误行：' + errLong.errRow + ';<br />';
	}
	//特殊字符;
	var errCharacters = data.errCharacters;
	if(errCharacters != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '包含非法字符。' +'</font>' + '</strong><br />错误行：' + errCharacters.errRow + ';<br />';
	}
	//被保人姓名;
	var errNumbers = data.errNumbers;
	if(errNumbers != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '输入正确的名字。' +'</font>' + '</strong><br />错误行：' + errNumbers.errRow + ';<br />';
	}
	//年龄;
	var errAge = data.errAge;
	if(errAge != null){
		trErrContent = trErrContent + '<strong>出错类别：'+ '<font color=#ff3333>'  + '被保险人出生日期填写的格式不正确。' +'</font>' + '</strong><br />错误行：' + errAge.errRow + ';<br />';
	}
	//年龄格式；
	var errAgeForm = data.errAgeForm;
	if(errAgeForm != null){
		var minInsuredage=$("#MININSUREDAGE").val();
		var maxInsuredage=$("#MAXINSUREDAGE").val();
		minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
		maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
		trErrContent = trErrContent + '<strong>出错类别：'+ '<font color=#ff3333>'  +  '年龄必须在'+minInsuredage+'个月至'+maxInsuredage+'周岁之间' +'</font>' + '</strong><br />错误行：' + errAgeForm.errRow + ';<br />';
	}
	//身份证;
	var errIdCard = data.errIdCard;
	if(errIdCard != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '身份证证件号码不正确。' +'</font>' + '</strong><br />错误行：' + errIdCard.errRow + ';<br />';
	}
	//证件重复;
	var errIdentify = data.errIdentify;
	if(errIdentify != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '证件号码重复。' +'</font>' + '</strong><br />错误行：' + errIdentify.errRow + ';<br />';
	}
	//证件类型
	var errIdentifyType=data.errIdentifyType;
	if(errIdentifyType != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '证件类型须为护照'  +'</font>' + '</strong><br />错误行：' + errIdentifyType.errRow + ';<br />';
	}
	var errBusinessdetail=data.errBusinessdetail;
	if(errBusinessdetail != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '旅行目的不正确'  +'</font>' + '</strong><br />错误行：' + errBusinessdetail.errRow + ';<br />';
	}
	//投保份数不正确;
	var errInsuredQuantity = data.errInsuredQuantity;
	if(errInsuredQuantity != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '投保份数不正确。' +'</font>' + '</strong><br />错误行：' + errInsuredQuantity.errRow + ';<br />';
	}
	//险种不正确;
	var errInsuredRisktype = data.errInsuredRisktype;
	if(errInsuredRisktype != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '险种不正确。' +'</font>' + '</strong><br />错误行：' + errInsuredQuantity.errRow + ';<br />';
	}
	//黑名单
	var errBlackList = data.errBlackList;
	if(errBlackList != null){
		trErrContent = trErrContent + '<strong>出错类别：' + '<font color=#ff3333>' + '被保险人不满足投保要求' +'</font>' + '</strong><br />错误行：' + errBlackList.errRow + ';<br />';
	}
//	alert(trErrContent);
	trErr = 'null';
}
//*******************  end    ****************************************************
//当输入被保险人正确的身份证号码时自动给出生日期和性别赋值
function setIdentifySexandBirthday(insuredid){
	if(($('#input_identifytype'+insuredid).val()=="01"||$('#input_identifytype'+insuredid).val()=="02" || $('#input_identifytype'+insuredid).val()=="17")&& $('#input_identifyNumber'+insuredid).val()!=""){
		var identiyId=$('#input_identifyNumber'+insuredid).val();
		var msg=isCardID(identiyId);
		if(msg=="true"){
			//根据身份证校验出生日期
			var sId=$('#input_identifyNumber'+insuredid).val();
			var sBirthday;
			if(sId.length==15){
				sBirthday="19"+sId.substr(6,2)+"/"+sId.substr(8,2)+"/"+sId.substr(10,2);
			}else{
				sBirthday=sId.substr(6,4)+"/"+sId.substr(10,2)+"/"+sId.substr(12,2);
			}
			$('#input_insuredBirthday'+insuredid).val(sBirthday);
			//给性别赋值
			var sSex=1;
			if(sId.length==15){
	        	sSex=sId.substring(14,15)%2;
		    }else if(sId.length ==18){   
		       sSex=sId.substring(14,17)%2;
		    }
		    if(sSex==0){
		    	sSex=2;
		    }
		    if(sSex==2){
		    	$('#insuredSexSelectSpan'+insuredid).text("女");
		    }else{
		    	$('#insuredSexSelectSpan'+insuredid).text("男");
		    }
		    $('#input_insuredsex'+insuredid).val(sSex);
		}
	}
}


//当输入正确的投保人身份证号码时自动给性别赋值
function setApplyIdentifySexand(){
	if(($('#input_applyIndentifyType').val()=="01"||$('#input_applyIndentifyType').val()=="02"|| $('#input_applyIndentifyType').val()=="17" )&&$('#input_applyIdentifyNumber').val()!=""){
		var identiyId=$("#input_applyIdentifyNumber").val();
		var msg=isCardID(identiyId);
		if(msg=="true"){
			//根据身份证校验出生日期
			var sId=$('#input_applyIdentifyNumber').val();
			var sSex=1;
			if(sId.length==15){   
	        	sSex=sId.substring(14,15)%2;
		    }else if(sId.length ==18){   
		       sSex=sId.substring(14,17)%2;
		    }
		    if(sSex==0){
		    	sSex=2;
		    }
		    $("#input_applySexmType").val(sSex);
		    if(sSex==2&&$("#sexSel").attr("class").replace(/[ ]/g,"")=='sexfl'){
		    	toggleSex();
		    }else if(sSex==1&&$("#sexSel").attr("class").replace(/[ ]/g,"")!='sexfl'){
		    	toggleSex();
		    }
		}
	}
}


//当输入正确的身份证号码时自动给出生日期和性别赋值
function setIdentifySexandBirthdayModified(){
	if(($('#modify_insuredIndentifyType').val()=="01"||$('#modify_insuredIndentifyType').val()=="02"|| $('#modify_insuredIndentifyType').val()=="17")&&$('#modify_identifyNumber').val()!=""){
		var identiyId=$("#modify_identifyNumber").val();
		var msg=isCardID(identiyId);
		if(msg=="true"){
			//根据身份证校验出生日期
			var sId=$('#modify_identifyNumber').val();
			var sBirthday;
			if(sId.length==15){
				sBirthday="19"+sId.substr(6,2)+"/"+sId.substr(8,2)+"/"+sId.substr(10,2);
			}else{
				sBirthday=sId.substr(6,4)+"/"+sId.substr(10,2)+"/"+sId.substr(12,2);
			}
			$('#modify_insuredBirthday').val(sBirthday);
			var sSex=1;
			if(sId.length==15){   
	        	sSex=sId.substring(14,15)%2;
		    }else if(sId.length ==18){   
		       sSex=sId.substring(14,17)%2;
		    }
		    if(sSex==0){
		    	sSex=2;
		    }
		    var sex=$('input[name="modifyPrpzinsured.sex"][value="'+sSex+'"]' ).attr("checked",true);//性别 ;
		}
	}
}


//当点击需要纸质保单的时候 给收件人、发票抬头赋值
function baseInsuredNameSetSendName(){
	if($("#isgrantvisa").val()!="1"){
		if($("input:radio[name=fp][value=1]").attr("checked")=="checked"){
			$("#eflag").val("010");
		}else if($("input:radio[name=fp][value=3]").attr("checked")=="checked"){
			$("#eflag").val("110");
		}else if($("input:radio[name=fp][value=2]").attr("checked")=="checked"){
			$("#eflag").val("000");
		}
	}
	//针对新疆奎屯市做的更改
	if($('#areacode').val()=="65400000"){
		$('#sendAddress').hide();
	}
	if($.trim($('#input_applyName').val())!=""&&$('#input_sendName').val()==""&&checkApplyName("input_applyName")){
		$('#input_sendName').val($('#input_applyName').val());
	}
	if($.trim($('#input_applyName').val())!=""&&$('#input_invoiceTile').val()==""&&checkApplyName("input_applyName")){
		$('#input_invoiceTile').val($('#input_applyName').val());
	}
	if($.trim($('#input_sendJAddress').val())==""||$.trim($('#input_sendJAddress').val())=="请精确到门牌号"){
		$('#input_sendJAddress').val("请精确到门牌号");
		$('#input_sendJAddress').css("color","#808080");
	}
	//input_sendMobile  checkApplyMobile()
	if($("#oldproposalno").val()!=""||$("#oldorderid").val()!=""){
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyMobile("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
			var iswebservice = $("#iswebservice").val();
			if(iswebservice!=""){//已经有值
				var otherflag = iswebservice.substring(0,1);
				$("#iswebservice").val(otherflag+"1");
			}else{//空，没有值，初次赋值
				$("#iswebservice").val("01");
			}
			//$('#postmobile').val($('#applyMobile').val());
		}
	}else{
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyName("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
		}
	}
	
}

// 当点击需要纸质保单和发票的时候清空收件人、发票抬头、街道
function ClearStreetandAddress(){
	// 还原下拉框内的初始值
	$("#input_sendQAddress>option[index='0']").attr("selected","false");
	if($.trim($('#input_sendJAddress').val())!=""){
		$('#input_sendJAddress').val("");
	}
	if($.trim($('#input_sendName').val())!=""){
		$('#input_sendName').val("");
	}
	if($.trim($('#input_invoiceTile').val())!=""){
		$('#input_invoiceTile').val("");
	}
}


function clearDefalut(id){
	if($.trim($('#'+id).val())=="请精确到门牌号"){
		$('#'+id).val("");
		$('#'+id).css("color","black");
	}
}

//联动设置投保人关系
function setRelation(){
	var peoplecount = parseInt($("#peoplecount").val());
	// 如果当前被保险人数大于1，则将投被保人关系修改为其他
	var lastProcessbar = $("#lastProcessbar").val();
	var relation = $("#relation").val();// 当前的投被保人关系
	if (peoplecount > 1) {
		// 当添加列表为大于等于2，将“本人”与“配偶”两项删除，作不可选处理。且关系为“本人”或“配偶”时，关系自动修改为“其他”。
		if (relation == '01' || relation == '10') {
			$("#relation").val("99");
			$("#relationSpan").html("其他");
		}
		$("#ul_relation li[title=\"本人\"]").detach();
		$("#ul_relation li[title=\"配偶\"]").detach();
	}
	// 如果当前仅有一个有效被保险人，将本人，配偶选项还原
	else {
		var flag = true;
		// 先判断下拉列表中是否已经包含本人和配偶
		// 当删除列表为1，将“本人”与“配偶”项恢复为可用，并将关系值改为“本人”
		$("#ul_relation li").each(function (i,item){
		    //多人时，删除本人和配偶选项
		    if($(item).text().indexOf('本人')>-1||$(item).text().indexOf('配偶')>-1){
		    	flag = false;
			}
		});
		if (flag) {
			$("#ul_relation").append("<li title=\"本人\" strvalue='01' onclick=\"hideTipsNew(\'relationSpan\');\">本人</li>");
			$("#ul_relation").append("<li title=\"配偶\" strvalue='10' onclick=\"hideTipsNew(\'relationSpan\');\">配偶</li>");
		}
		// 如果是从确认页面上一步操作回到基本信息页面，投被保人关系无需赋默认值，以客户所填为准
		// 续保转入以续保带出为准
		if(''==$("#oldproposalno").val()&&''==$("#oldorderid").val()) {
			if (relation == '99') {
				$("#relation").val("01");
				$("#relationSpan").html("本人");
			}
		}
	}

}

/**
 * 添加按钮之后设置人数提示
 */
function setPeoplsCountMessage(itemcount,peoplecount){
	var message = '';
	if(itemcount<peoplecount){
		$("#peopleCountMessage").attr("class","msg");
		message = '还需添加'+'<font id="personNos_add" style="font-size:12px;color:red">'+(peoplecount-itemcount)+'</font>'+'位被保险人';
	}else if(itemcount==peoplecount){
		$("#peopleCountMessage").attr("class","");
//		message = '已符合原报价人数，可以继续添加';
	}else{	
		$("#peopleCountMessage").attr("class","msg");
		message = '您已更改人数，请注意新报价';
	}
	$("#peopleCountMessage").html(message);
}
	

//显示送单地址和发票
function showInvoiceDiv(obj){
	//如果需要签证则必须显示和发票
	if($("#isgrantvisa").val()=='1'){
		$('#epolicy').hide();
		$('#inv_tit').show();
		$('#inv_stt').show();
		//隐藏选项
		$('#jisongSelect').hide();
		$('#jisong01').hide();
		//下面三个是对自动带出投保人信息的值赋到发票里
		if($("#sendName").val()==""){
			$('#input_sendName').val($('#input_applyName').val());
			$('#invoice').html($('#input_applyName').val());
			$('#input_invoiceTile').val($('#input_applyName').val());
		}
		$("#eflag").val()=='111';
	}else if(parseFloat(obj)>=150.00 && $('#riskcode').val()!="EDD"){
		if($('#productcode').val() == "EAK_G")
		 	$('#epolicy').show();//高原游只支持电子保单
		 else
		 	$('#epolicy').hide();
		 $('#inv_tit').show();
		 $('#inv_stt').show();
		 $('#jisong01').hide();
		 setInvoiceSend($('#eflag').val());
	 }else{
		 //发票送单处理赋值为默认值。
		 $('#epolicy').show();
		 if ( $("#eflag").val()=='') {
			 $("#eflag").val('000');
		}
		 $('#inv_tit').hide();
		 $('#inv_stt').hide();
		 $('#jisong01').hide();
	}
}
/**
 * @description 显示送单地址和发票
 * 				如果有签证，默认填写寄送地址，无选择寄送方式
 * 				否则，保费大于150可以寄送纸质保单和纸质发票
 * @param obj
 */
function showInvoiceDivNew(obj){
	var areaCode = $("#areacode").val();
	var invoiceflag="";
	var input_applyName = $("#input_applyName").val();

	 $.ajax({
		 url      : "/eproperty/findEffAreaCode.do",
		 async	  : false,
		 type	  : 'post',
		 dataType : 'json',
		 data	  : 'areaCode=' + areaCode,
		 success  : function(data){
			 invoiceflag=data.result;
		 }
	 });
	//如果需要签证则必须显示和发票
	if($("#isgrantvisa").val()=='1'){
		$('#epolicy').hide();
		$('#inv_tit').show();
		$('#inv_stt').show();
		$('#showWen_fa').hide();
		//隐藏选项
		$('#jisongSelect').hide();
		//下面三个是对自动带出投保人信息的值赋到发票里
		if($("#sendName").val()==""){
			$('#input_sendName').val($('#input_applyName').val());
			$('#invoice').html($('#input_applyName').val());
			$('#input_invoiceTile').val($('#input_applyName').val());
		}
		$("#eflag").val()=='111';
	}else if($('#riskcode').val()!="EDD"){
			//添加城市管控 2016.10.21 只有北京 和贵州等地区显示可以开具电子普票
			 if (invoiceflag=="success"&&!(input_applyName.indexOf("公司")!=-1 && pcbytes(input_applyName)>=12)) {
				 	$('#epolicy').show();
					$('#inv_tit').show();
					$('#inv_stt').show();
					$('#showWen_fa').hide();
					$('#showWen').hide();
					$('#jisong01').hide();
					if ($("#eflag").val()=='020' ) {
						$("#checkbox_pic").addClass('active');
						$('#input_invoiceTiledl').show();
						if ($("#input_invoiceTile").val()=='1') {
							$("#input_invoiceTileSpan").text("投保人");
						}else if ($("#input_invoiceTile").val()=='2') {
							$("#input_invoiceTileSpan").text("被保险人");
						}
					}else if ($("#eflag").val()=='000' ) {
						$("#input_invoiceTiledl").hide();
						 setInvoiceSendNew('1','0');
						 if($("#checkbox_pic").hasClass("active")){
							 $("#checkbox_pic").toggleClass('active');
						 }
						$('#eflag').val("000");
						$("#input_invoiceTile").val("");
					}
					if ($("#eflag").val()=='120' ) {
						$("#checkbox_pic").addClass('active');
						setInvoiceSendNew('0','1');
						$('#input_invoiceTiledl').show();
						if ($("#input_invoiceTile").val()=='1') {
							$("#input_invoiceTileSpan").text("投保人");
						}else if ($("#input_invoiceTile").val()=='2') {
							$("#input_invoiceTileSpan").text("被保险人");
						}
					}
				 	setInvoiceSendNew('0',$("#eflag").val().substring(0,1));
				 	$('#input_pupiao').show();
				 	$('#showWen_pic').show();
			 }else{
				 	setInvoiceSendNew('1','0');
				 	setInvoiceSendNew('0',$("#eflag").val().substring(0,1));
				 	$('#input_pupiao').hide();
					$('#epolicy').show();
					$('#jisong01').hide();
					$('#inv_tit').show();
					$('#inv_stt').show();
					$('#showWen_fa').hide();
					$('#showWen').show();
					$('#showWen_pic').hide();
					 if($("#checkbox_pic").hasClass("active")){
						 $("#checkbox_pic").toggleClass('active');//隐藏对号
						 $("#input_invoiceTile").val("1");
						 $("#input_invoiceTileSpan").text("投保人");
					 }
					
			 }
	 }else{
		 //添加城市管控 2016.10.21 只有北京 和贵州等地区显示可以开具电子普票
		 var cityname_pic=$('#cityname').val();
		  if (invoiceflag=="success"&&!(input_applyName.indexOf("公司")!=-1 && pcbytes(input_applyName)>=12)) {
			//发票送单处理赋值为默认值。
			 $('#epolicy').show();
			 if ( $("#eflag").val()=='') {
				 $("#eflag").val('000');
			}
			 $('#inv_tit').show();
			 $('#inv_stt').show();
			 $('#jisongSelect').hide();
			 $('#jisong01').hide();
			 $('#showWen_fa').show();
			 $('#ZC_pic').hide();
			 $('#showWen').hide();
			 if ($("#eflag").val()=='020') {
					$("#checkbox_pic").addClass('active');
					$('#input_invoiceTiledl').show();
					if ($("#input_invoiceTile").val()=='1') {
						$("#input_invoiceTileSpan").text("投保人");
					}else if ($("#input_invoiceTile").val()=='2') {
						$("#input_invoiceTileSpan").text("被保险人");
					}
				}
			 setSendMsgDefault();
			 setInvoiceSendNew('0','0');
		}else{
			 //发票送单处理赋值为默认值。
			 $('#epolicy').show();
			 $("#eflag").val('000');
			 $('#inv_tit').hide();
			 $('#inv_stt').hide();
			 $('#jisong01').hide();
			 setSendMsgDefault();
			 if($("#checkbox_pic").hasClass("active")){
				 $("#checkbox_pic").toggleClass('active');//隐藏对号
				 $("#input_invoiceTile").val("1");
				 $("#input_invoiceTileSpan").text("投保人");
			 }
		}
		
	}
}

function setApplyMsgNoBirthday(){
	if(checkInsuredName("input_insuredName")&&$('#input_applyName').val()==""){
		$('#input_applyName').val($('#input_insuredName').val());
		if($("#isGrantVisa").val()=="1"||$("input:radio[name=fp][checked]").val()=="1"||$("input:radio[name=fp][checked]").val()=="3"){
			$('#input_sendName').val($('#input_applyName').val());
			$('#invoice').html($('#input_applyName').val());
			$('#input_invoiceTile').val($('#input_applyName').val());
		}
	}
	if(checkIdentifyNumberNoBirthday("input_identifyNumber")&&$('#input_applyIdentifyNumber').val()==""){
		var indentifyType=$("#input_insuredIndentifyType").val();
		 $("#input_applyIndentifyType>option[value="+indentifyType+"]").attr("selected","true");
		$('#input_applyIdentifyNumber').val($('#input_identifyNumber').val());
		showValidateResult("input_applyIdentifyNumber","");
	}
}


//常用被保险人标志位
function setcommoninsuredflag(){
	//未登录状态下
	if($("#entryId").val()==""){
		beforeLogin();changeLogin(1);
		$("#changyongflag").val("1");
		$(".pop_close").bind("click",function(){
			$("#ifcommonInsured").attr("checked",false)
			$("#changyongflag").val("0");
		});
	}else{
		//登陆状态下
		//勾选，则赋值为1，否则，为0
		var ifcommonInsured=document.getElementById("ifcommonInsured");
		if(ifcommonInsured.checked){
			$("#iscommoninsuredflag").val("1");
		}else{
			$("#iscommoninsuredflag").val("0");
		}
	}
}


//校验未成年人同一保险期限内的有效的意外身故责任保额是否超过10W
 function checkChildAccidentalDeathAmount(){
	 	var accidentalflag = false;
	 	var message = '';
		var emailUrl = "/eproperty/checkChildAccidentalDeathAmount.do";
		$.ajax({
			url : emailUrl,
			async : false,
			type : "post",
			data :$("#form").serialize(),
			success : function(data, textStatus) { 
				var result = data.result;
				if("success"==result){
					accidentalflag = true;
				}else if("false"==result){
					message = data.message;
				}else if("checkPlancode"==result){
					message = data.plancodes;
				}
			},
			error : function(data,textStatus){
			}
		});
		if(accidentalflag) return "success";
		else return message;
 }
 
 function showChildInsuredMsg(){
		$("#_my97DP").hide();
		popPosition('#childInsuredMSG');
		$(".mask").css("z-index","1010") ;
		if(obj="nochangebutton"){
			
		}
}
 
//登陆后改变常用被保险人相关, 显示”保存为常用被保险人"勾选     selectType 为空时，返回checkbox选择常用被保险人，为1时返回radio选择
 function getEntryInsured( selectType){
 	var entryId =$("#entryId").val();
 	var type="";
 	var data='entryid='+entryId+"&sessionid="+$("#sessionid").val();
// 	//放开隐藏的“保存为常用被保险人”TD
// 	$("input[id^=iscommoninsuredflag]").parent("td").css("display","block");
    $.ajax({
		type:'post',
		url:'/eproperty/queryPrpdentryinsuredsNew.do',
		data:data,
		async:false ,
		success:function(data){
			if(data.prpdentryinsureds!=""){
				var str = "";
				$("#entryInsuredtext").css("display","");
				$("#entryInsuredMsg").empty();
				$.each(data.prpdentryinsureds, function(i, item){
					var insuredname = item.insuredname.length>3?item.insuredname.substring(0,3)+".." :item.insuredname;
					var selectedid = "";
					 if(selectType =="1"){
						var checked=" ";
						if(item.flag=="1"){
							checked=" checked='checked' ";
							selectedid = item.insuredid;
						}
						var html ="<input type=\"radio\" name=\"entryinsured\" id=\"entryinsured"+item.insuredid+"\" onclick=\"selectEntryinsuredSingle('"+item.insuredid+"');\"" 
						+checked +">"+item.insuredname+" &nbsp; &nbsp; &nbsp;"
					}else{
						var html = "<span class='inputSpan_red ' onclick='selectEntryinsured(\""+item.insuredid+"\");' id='"+item.insuredid+"'>"+item.insuredname +"</span>";
					}
					html +="<input type='hidden' id='"+item.insuredid+"_name' value='"+item.insuredname+"'>";
					html +="<input type='hidden' id='"+item.insuredid+"_birthday' value='"+(item.birthdate==null?'':item.birthdate)+"'>";
					html += "<input type='hidden' id='"+item.insuredid+"_sex' value='"+item.sex+"'>";
					html += "<input type='hidden' id='"+item.insuredid+"_indentifyNo' value='"+item.identifynumber+"'>";
					html += "<input type='hidden' id='"+item.insuredid+"_indentifyType' value='"+item.identifytype+"'>";
					$("#entryInsuredMsg").append(html);
					if(selectedid !=""){
						selectEntryinsuredSingle(selectedid);
					}
					// 这里要判断,然后勾选常用被保险人,只能去后台查询一下了
					if(selectType !="1"){
						$.ajax({
							type:'post',
							url:'/eproperty/checkPrpdentryinsuredSelect.do',
							data:'insuredsid='+item.insuredid+'&sessionid='+$("#sessionid").val(),
							success:function(result){
								if(result.selected == true){
									if(checkDefaultInsured("")){
										$("#insuredid").val("1");
										setEntryInsuredTODefaultInsured("",item.insuredid);
									}else{
										$("#"+item.insuredid).addClass("active");
									}
								}
							}
						});
					}
				});
				
				if("0" == data.prpdentryinsureds.length){
					$("#entryInsuredMsg").css("display","none");
				}else{
					$("#entryInsuredMsg").css("display","");
				}
			}else{
				$("#entryInsuredtext").hide();
				$("#entryInsuredMsg").empty();
				$("#entryInsuredMsg").html("添加常用被保险人，投保更便捷。");
				var riskcode = $("#riskcode").val();
				if(riskcode=="ZKK" || riskcode=="LCB"){//无“添加其他保险人”链接，不显示常用被保险人的div
					$("#morePresentation").css("display","none");
					$("#dian_bg").css("display","none");
				}
			}
			$("#perplecountHeaderMsg1").css("display","none");
			$("#entryInsuredMsg").css("display","");
			
		},
		err:function(){
		}
	});
 } 
 

 function setIscommoninsuredflag(insuredid){
 	var thisobj = $("#setiscommoninsuredflag"+insuredid); 
 	var iscommonobj = $("#iscommoninsuredflag"+insuredid);
	var selected ;
 	if(thisobj.attr("class").indexOf("active") >0 ){
 		thisobj.removeClass("active");
 		iscommonobj.val("0");
 	}else{
 		thisobj.addClass("active");
 		iscommonobj.val("1");
 	}
	
 }
 
 function setModifyIscommoninsuredflag(){
 	var thisobj = $("#setModify_iscommoninsuredflag"); 
 	var iscommonobj = $("#modify_iscommoninsuredflag");
	var selected ;
 	if(thisobj.attr("class").indexOf("active") >0 ){
 		thisobj.removeClass("active");
 		iscommonobj.val("0");
 	}else{
 		thisobj.addClass("active");
 		iscommonobj.val("1");
 	}
	
 }
 
//获取上一年订单被保险人列表
 function getOldProposalInsureds(){
 	var oldproposalno =$("#oldproposalno").val();
 	var data='oldproposalno='+oldproposalno;
 	var maxprocessbar = $("#maxprocessbar").val();
 	    $.ajax({
 			type:'post',
 			url:'/eproperty/queryOldProposalInsureds.do',
 			data:data,
 			success:function(data){
 				if(data.oldproposalinsureds!=""){
 					var str = "";
 					$.each(data.oldproposalinsureds, function(i, item){
 						var insuredname = item.insuredname.length>3?item.insuredname.substring(0,2)+".." :item.insuredname;
 						var html = "<li style='height: 80px;line-height: 26px;'><input type='radio' name='oldOrderInsureds' id='oldOrderInsureds_"+item.serialno+"_radio' value='"+item.serialno+"' title='"+item.insuredname +"'/><span>"+insuredname+"</span>";
 						html += "<input type='hidden' id='oldOrderInsureds_"+item.serialno+"_name' value='"+item.insuredname+"'>";
 						html += "<input type='hidden' id='oldOrderInsureds_"+item.serialno+"_ename' value='"+item.insuredename+"'>";
 						html += "<input type='hidden' id='oldOrderInsureds_"+item.serialno+"_birthday' value='"+(item.flag==null?'':item.flag)+"'>";
 						html += "<input type='hidden' id='oldOrderInsureds_"+item.serialno+"_sex' value='"+item.sex+"'>";
 						html += "<input type='hidden' id='oldOrderInsureds_"+item.serialno+"_indentifyNo' value='"+item.identifynumber+"'>";
 						html += "<input type='hidden' id='oldOrderInsureds_"+item.serialno+"_indentifyType' value='"+item.identifytype+"'></li>";
 						$("#oldProposalInsureds_ul").append(html);
 					});
 				}
 			},
 			err:function(){
 			}
 		});
 }

//新流程
//设置邮件寄送显示
function setInvoiceSend(einsuranceflag){
	$("#jisong"+einsuranceflag).addClass('addclass').siblings().removeClass('addclass');
	$('#eflag').val(einsuranceflag);
	if(einsuranceflag=="000"){
		$('#sendAddress').hide();
	}else{
		$('#sendAddress').show();
	}
	//针对新疆奎屯市做的更改
	if($('#areacode').val()=="65400000"){
		$('#sendAddress').hide();
	}
	if($.trim($('#input_applyName').val())!=""&&$('#input_sendName').val()==""&&$('#input_applyName').val()!=$('#input_applyName').attr("data-value")&&checkApplyName("input_applyName")){
		$('#input_sendName').val($('#input_applyName').val());
	}
	if($('#input_invoiceTile').val()=="" && $('#eflag').val() == "020"){
		$('#input_invoiceTile').val("1");
	}else{
		$('#input_invoiceTile').val("");
	}
	//input_sendMobile  checkApplyMobile()
	if($("#oldproposalno").val()!=""||$("#oldorderid").val()!=""){
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyMobile("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
			var iswebservice = $("#iswebservice").val();
			if(iswebservice!=""){//已经有值
				var otherflag = iswebservice.substring(0,1);
				$("#iswebservice").val(otherflag+"1");
			}else{//空，没有值，初次赋值
				$("#iswebservice").val("01");
			}
			//$('#postmobile').val($('#applyMobile').val());
		}
	}else{
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyMobile("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
		}
	}
}
/**
 * @description 如果是电子发票和电子保单，只显示电话和发票抬头
 * 				否则，显示寄送录入域，并且寄送名称和发票抬头填写投保人信息
 * 				寄送电话填写投保人电话
 * @param index
 * @param flag
 */
function setInvoiceSendNew(index,flag){
	$("#jisong"+index + flag).addClass('addclass').siblings().removeClass('addclass');
	var eInsuranceFlag = $('#eflag').val();
	if("0" == index){
		var eInsuranceFlagSub = eInsuranceFlag.substring(1);
		eInsuranceFlag = flag + eInsuranceFlagSub;
	}else if("1" == index){
		var eInsuranceFlagB = eInsuranceFlag.substring(0,1);
		var eInsuranceFlagE = eInsuranceFlag.substring(2);
		eInsuranceFlag = eInsuranceFlagB + flag + eInsuranceFlagE;
	}
	$('#eflag').val(eInsuranceFlag);
	if(eInsuranceFlag=="000"){
		 $('#sendAddress').hide();
		 $("#input_invoiceTiledl").hide();
	}else if(eInsuranceFlag=="020"){
		 $("#input_invoiceTiledl").show();
		 $('#sendAddress').hide();
	}else if(eInsuranceFlag=="100"){
		 $("#input_invoiceTiledl").hide();
		 $('#sendAddress').show();
	}else{
		 $("#input_invoiceTiledl").show();
		 $('#sendAddress').show();
	}
	//针对新疆奎屯市做的更改
	if($('#areacode').val()=="65400000"){
		$('#sendAddress').hide();
	}
	if($.trim($('#input_applyName').val())!=""&&$('#input_sendName').val()==""&&$('#input_applyName').val()!=$('#input_applyName').attr("data-value")&&checkApplyName("input_applyName")){
		$('#input_sendName').val($('#input_applyName').val());
	}
	if($('#input_invoiceTile').val()=="" && $('#eflag').val() == "020"){
		$('#input_invoiceTile').val("1");
	}else if($('#input_invoiceTile').val() !="1" && $('#input_invoiceTile').val() !="2" && $('#eflag').val() == "020"){
		$('#input_invoiceTile').val("");
	}
	if($("#oldproposalno").val()!=""||$("#oldorderid").val()!=""){
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyMobile("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
			var iswebservice = $("#iswebservice").val();
			if(iswebservice!=""){//已经有值
				var otherflag = iswebservice.substring(0,1);
				$("#iswebservice").val(otherflag+"1");
			}else{//空，没有值，初次赋值
				$("#iswebservice").val("01");
			}
			//$('#postmobile').val($('#applyMobile').val());
		}
	}else{
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyMobile("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
		}
	}
}
//点击上一步或者点击分页显示页码时，要保存可编辑TR里的数据，保存成flag为0
function checkEditTRSaved(){
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
	if(lastTR.attr("flag") =="0"){
		saveInsured( lastTR.attr("id"),"0");
	}
}


//点击修改
function modeifyInsured(insuredid){
//	样式变化 
	$("#modifyInsured_"+insuredid).parents("tr").find(".no_edit").hide();
	$("#modifyInsured_"+insuredid).parents("tr").find(".yes_edit").css("display","block");
	$("#setiscommoninsuredflag"+insuredid).css("display","block");
	$("#setiscommoninsuredflag"+insuredid).next("span").hide();
}

//点击保存时flag参数为1，点击上一步或者页码时参数为0,这个参数也表示着存入数据库中的值flag是1或者0,如果点击新增被保险人，insertFlag 传"insert"，如果是点击常用被保险人过来的,传一个entryInsuredid
//新增被保险人来源参数insuredSource：presonCenter表示来源于个人中心，oldOrder表示来源于上年保单
function saveInsured(insuredid,flag,insertFlag,insuredSource){
	//保存有效被保险人之前的校验
	if(flag=="1"){
		if(!saveInsuredCheck(insuredid)){
			return false;
		}
	}
	//	后台数据处理
	var sX="";
	if($("#input_insuredsex"+insuredid).val()!=null){
		sX=$("#input_insuredsex"+insuredid).val();
	}
	var pinyin="";
	if($("#input_insuredEname"+insuredid).val()!=null){
		pinyin=$("#input_insuredEname"+insuredid).val();
	}
	var bDetail="";
	if($("#input_businessdetail"+insuredid).val()!=null){
		bDetail=$("#input_businessdetail"+insuredid).val();
	}
	var quantity="";
	if($("#input_quantity"+insuredid).val()!=null){
		quantity=$("#input_quantity"+insuredid).val();
	}
	var risktype="";
	if($("#input_risktype"+insuredid).val()!=null){
		risktype=$("#input_risktype"+insuredid).val();
	}

	var dataString ="riskcode="+$("#riskcode").val()+"&sessionid="+$("#sessionid").val()+"&insuredid="+insuredid+"&insuredname="+$("#input_insuredName"+insuredid).val()+
	"&identifytype="+$("#input_identifytype"+insuredid).val()+"&identifynumber="+$("#input_identifyNumber"+insuredid).val() +"&flag="+flag+ 
	"&birthday="+$("#input_insuredBirthday"+insuredid).val() +"&items="+$("#items").val()+"&productcode="+$("#productcode").val()+"&startdate="+$("#startdate").val()+
	"&insuredename="+pinyin+"&businessdetail="+bDetail+"&quantity="+quantity+"&risktype="+risktype+
	"&iscommoninsuredflag="+$("#iscommoninsuredflag"+insuredid).val()+"&sex="+sX+"&couponcode="+$("#couponcode").val();
	$.ajax({
		type:'post',
		url:'/eproperty/saveInsured.do',
		data:dataString,
		async:false,
		success:function(data){
			var result = data.result;
			if(result == 'success'){
				//设置itemcount;
				var itemcount = data.itemcount;
				$('#peoplecount').val(itemcount);
				$('#peoplecount_up').html(itemcount);
				$('#peoplecount_btm').text(itemcount+"人");
				setRelation();
				if(flag == "1"){
					//改样式 ，改页面显示的值
					var nameStr=$("#input_insuredName"+insuredid).val().length >4? $("#input_insuredName"+insuredid).val().substring(0,4)+ '..':$("#input_insuredName"+insuredid).val()
					$("#dis_insuredName"+insuredid).html(nameStr);
					$("#dis_insuredName"+insuredid).parent("td").attr("title",$("#input_insuredName"+insuredid).val());
					if($("#input_insuredEname"+insuredid).val!=null){
					$("#dis_insuredEname"+insuredid).html($("#input_insuredEname"+insuredid).val());
					$("#dis_insuredEname"+insuredid).parent("td").attr("title",$("#input_insuredEname"+insuredid).val());
					}
					$("#dis_identifytype"+insuredid).text($("#idSelectDIV"+insuredid).children("span").text());
					$("#dis_identifyNumber"+insuredid).html($("#input_identifyNumber"+insuredid).val());
					$("#dis_identifyNumber"+insuredid).parent("td").attr("title",$("#input_identifyNumber"+insuredid).val());
					$("#dis_insuredBirthday"+insuredid).text($("#input_insuredBirthday"+insuredid).val());
					$("#dis_insuredBirthday"+insuredid).parent("td").attr("title",$("#input_insuredBirthday"+insuredid).val());
					if($("#input_insuredsex"+insuredid).val!=null){
					$("#dis_sex"+insuredid).text(getSexName($("#input_insuredsex"+insuredid).val()));
					$("#dis_sex"+insuredid).parent("td").attr("title",getSexName($("#input_insuredsex"+insuredid).val()));
					}
					if($("#input_businessdetail"+insuredid).val()!=null){
					$("#dis_businessdetail"+insuredid).html(getBusinessdetailType($("#input_businessdetail"+insuredid).val()));
					$("#dis_businessdetail"+insuredid).parent("td").attr("title",getBusinessdetailType($("#input_businessdetail"+insuredid).val()));	
					}
					if($("#input_quantity"+insuredid).val()!=null){
						$("#dis_quantity"+insuredid).html($("#input_quantity"+insuredid).val()+"份");
						$("#dis_quantity"+insuredid).parent("td").attr("title",$("#input_quantity"+insuredid).val()+"份");	
					}
					if($("#input_risktype"+insuredid).val()!=null){
						$("#dis_risktype"+insuredid).html(getRisktypeName($("#input_risktype"+insuredid).val()));
						$("#dis_risktype"+insuredid).parent("td").attr("title",getRisktypeName($("#input_risktype"+insuredid).val()));	
					}
					$("#"+insuredid).attr("flag",flag);
					if($("#iscommoninsuredflag"+insuredid).val() == "1"){
						$("#finshiscommonflag"+insuredid).addClass("finsh");
					}else{
						$("#finshiscommonflag"+insuredid).removeClass("finsh");
					}
					$("#insertInsured_"+insuredid).parents("tr").find(".yes_edit").hide();
					$("#insertInsured_"+insuredid).parents("tr").find(".no_edit").css("display","block");
					$("#setiscommoninsuredflag"+insuredid).hide().next("span").css('display', 'block');

					$("#benchmarkPremium").val(data.benchmarkPremium);
					var sumpremium=data.sumpremium;
					if($('#riskcode').val()=="EDD"){//EDD总保费需要用有效的投保份数加上无效的投保份数然后乘以基础保费
						$('#unitpremium').val(data.unitpremium);
						$('#sumInsuredquantiry').val(data.sumInsuredquantiry);
						$('#invalidInsuredquantiry').val(data.invalidInsuredquantiry);
						//份数修改
						$("#sumquantitystr").html(parseInt($('#sumInsuredquantiry').val())+parseInt($('#invalidInsuredquantiry').val()));
						$("#sumquantitystr2").html((parseInt($('#sumInsuredquantiry').val())+parseInt($('#invalidInsuredquantiry').val()))+"份");
						sumpremium=(data.sumInsuredquantiry+data.invalidInsuredquantiry)*$('#unitpremium').val();
						$('#unitbenchmarkpremium').val(data.unitbenchmarkpremium);
						$('#benchmarkPremium').val((parseInt($('#sumInsuredquantiry').val())+parseInt($('#invalidInsuredquantiry').val()))*$('#unitbenchmarkpremium').val());
					}
					$("#sumpremium").val(sumpremium); 
					$("#sumpremium_up").html(sumpremium.toFixed(2));
					$("#premium_btm").text(sumpremium.toFixed(2)+"元");
					removeNameAtrr(insuredid);
					if($('#riskcode').val()=="LEF"){
						$("#oldcount").val(data.oldcount);
						$("#childcount").val(data.childcount);
						$("#roomcount").val(data.roomcount);
						$("#invalidOldcount").val(data.invalidOldcount);
						$("#invalidChildcount").val(data.invalidChildcount);
						$("#invalidRoomcount").val(data.invalidRoomcount);
						displaySub2Premium();
					}
				}
				//点击“新增被保险人”按钮过来的调用，insertFlag为insert，需要新增一条空记录
				if(insertFlag == "insert"){
					getSelectedPage('insert');
				}else if(insuredSource == "presonCenter"||insuredSource == "oldOrder"){
					addEntryInsuredTOTR(insertFlag,insuredSource);
				}
				showInvoiceDivNew($('#sumpremium').val());
			}else{
				//高原游信息重复，不再弹层标示，直接在证件号码下面按错误提示显示
				if($("#productcode").val() == "EAK_G"){
					var id = "input_identifyNumber" + insuredid;
					if(result == "信息重复请您重新填写")
						showValidateResultBtm(id, result);
					else
						showTipsWindown(result);
				}
				else
					showTipsWindown(result);
			}
		},
		err:function(){
			var m4=encodeURI(encodeURI('数据格式错误，请重新检验！'));
			showTipsWindown('数据格式错误，请重新检验！');
		}
	});
}
 //选择常用被保险人的逻辑，,如果是一行空的被保险人信息，就直接在前台把常用被保险人的信息写到TR里,如果是用户填写过的被保险人，就保存一下再新增
 function selectEntryinsured(entryInsuredid){
 	var entryInsured = $("#"+entryInsuredid);
 	
	setEntryInsuredTODefaultInsured("",entryInsuredid);
	
 	calculateFee();
 }
 //选择上一年保单被保险人的逻辑，先检查是否有未保存的数据，如果没有就保存一条flag为0的被保险人信息。
 function setInsuredForOldOrderInsureds(){
	 //关闭弹层
	 closedialog(".dialog");	
	 	var entryInsuredid = "";
	  	var checkFalg = false;
	  	$.each($("input:radio[name=oldOrderInsureds]"), function(i, item){
	 		var checkFalg1=$(item).attr("checked");
		   		if(checkFalg1){
		   			checkFalg=checkFalg1;
		   		}
	 		});
	  	if(checkFalg){
	  		entryInsuredid = $("input:radio[name=oldOrderInsureds][checked]").val();
	  	}
		var trsNum = $('#insertInsuredJSP>tbody>tr').length;
		var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
		if(lastTR.attr("flag") =="0"){
			//要保存之后再添加常用被保险人
			saveInsured(lastTR.attr("id"),"1",entryInsuredid,"oldOrder");
		}else{
			addEntryInsuredTOTR(entryInsuredid,"oldOrder");
		}
 }
//保存常用/上年保单被保险人为falg为0的被保险人
//新增被保险人来源参数insuredSource：presonCenter表示来源于个人中心，oldOrder表示来源于上年保单
function addEntryInsuredTOTR(entryInsuredid,insuredSource){
	var iscommoninsuredflag = "0";
	if(insuredSource == "presonCenter")
		iscommoninsuredflag = "1";
	else if(insuredSource == "oldOrder")
		entryInsuredid = "oldOrderInsureds_"+entryInsuredid;
		
	//这里判断一下 常用被保险人的证件类型是否符合此页面的证件类型选择
	var idtype = $("#"+entryInsuredid+"_indentifyType").val() ;
	var idno = 	$("#"+entryInsuredid+"_indentifyNo").val();
	var sX="";
	if($("#"+entryInsuredid+"_sex").val()!=null){
		sX=$("#"+entryInsuredid+"_sex").val();
	}
	//oldOrderInsureds_1_ename
	var ename="";
	if($("#"+entryInsuredid+"_ename").val()!=null){
		ename=$("#"+entryInsuredid+"_ename").val();
	}
	var bsDetail="";
	if($("#"+entryInsuredid+"_businessDetail").val()!=null){
		bsDetail=$("#"+entryInsuredid+"_businessDetail").val();
	}
	var quantity="";
	if($("#"+entryInsuredid+"_quantity").val()!=null){
		quantity=$("#"+entryInsuredid+"_quantity").val();
	}
	var idgroup = $.parseJSON($("#idgroupJSON").val()) ;
	var flag = false;
	$(idgroup).each(function(i,item){
		if(idtype == idgroup[i].codecode){
			flag = true ;
		}
	});
	if(!flag){
		idtype="01";
		var idno ="";
	}
	
	var dataString ="riskcode="+$("#riskcode").val()+"&sessionid="+$("#sessionid").val()+"&insuredid=&insuredname="+$("#"+entryInsuredid+"_name").val()+
		"&identifytype="+idtype+"&identifynumber="+ idno +"&flag=0&birthday="+
		$("#"+entryInsuredid+"_birthday").val() +"&items="+$("#items").val()+"&productcode="+$("#productcode").val()+"&startdate="+$("#startdate").val()+
		"&iscommoninsuredflag="+iscommoninsuredflag+"&sex="+sX+"&couponcode="+$("#couponcode").val()+"&insuredename="+ename+"&businessdetail="+bsDetail
		+"&quantity="+quantity;
	$.ajax({
		type:'post',
		url:'/eproperty/saveInsured.do',
		data:dataString,
		success:function(data){
			var result = data.result;
			if(result == 'success'){
				getSelectedPage('entryInsuredInsert');
				if(insuredSource == "presonCenter")
					$("#"+entryInsuredid).addClass("active");
			}else{
				showTipsWindown(result);
			}
		},
		err:function(){
		}
	});
}


/*
 * 点击新增被保险人信息按钮
 */
function addInsuredTR(){
	if( parseInt($("#peoplecount").val()) >= parseInt($("#MAXINSURED").val()) ){
		showTipsWindown("被保险人已经为"+parseInt($("#MAXINSURED").val())+"人了，不能继续添加");
		return false;
	}else{
		//先验证是否有需要保存的无效保险人
		var trsNum = $('#insertInsuredJSP>tbody>tr').length;
		var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
		if(lastTR.attr("flag") =="0"){
			saveInsured(lastTR.attr("id"),"1","insert");
		}else{
			getSelectedPage('insert');
		}
	}
}

//点击投保人性别
function toggleSex(){
	$("#sexSel").toggleClass('girl');
	if($("#sexSel").attr("class").replace(/[ ]/g,"")=='sexfl'){
		$("#input_applySexmType").val("1");
	}else{
		$("#input_applySexmType").val("2");
	}
}

//点击证件类型模拟下拉框
function chooseIdentifyType(insuredid){
		 var thisinput=$("#idSelectDIV"+insuredid); 
		 var thisul=thisinput.find("ul"); 
		 if(thisul.css("display")=="none"){ 
		 if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })}; 
			 thisul.fadeIn("100"); 
			 thisinput.css("z-index","999"); 
			 thisul.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");}) 
			 thisinput.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");}) 
		 } 
		 else{ 
		 	thisul.fadeOut("fast"); 
		 } 
}

//点击性别模拟下拉框
function chooseSex(insuredid){
		 var thisinput=$("#sexSelectDIV"+insuredid); 
		 var thisul=thisinput.find("ul"); 
		 if(thisul.css("display")=="none"){ 
		 if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })}; 
		 thisul.fadeIn("100"); 
		 thisinput.css("z-index","999"); 
		 thisul.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");}) 
		 thisinput.hover(function(){},function(){thisul.fadeOut("100");thisinput.css("z-index","2");}) 
		 } 
		 else{ 
		 thisul.fadeOut("fast");
		 } 
}

//选择证件类型模拟下拉框
function selectIdentifyTypeLi(idgroupCode,insuredid) {
	var thisinput = $("#idSelectDIV"+insuredid);
	var thisul = thisinput.find("ul");
	var thisLi = $("#idgroupLi_" + idgroupCode) ;
	var liVar = thisLi.attr("strValue").toString();
 	thisinput.children("span").text(thisLi.text());
 	thisinput.parent("td").attr("title",thisLi.text());
 	$("#input_identifytype" + insuredid).val(liVar);
	thisul.fadeOut("100");
}

//选择性别模拟下拉框
function selectSexLi(sex,insuredid) {
	var thisinput = $("#sexSelectDIV"+insuredid);
	var thisul = thisinput.find("ul");
 	thisinput.children("span").text(getSexName(sex));
 	$("#input_insuredsex" + insuredid).val(sex);
	thisul.fadeOut("100");
}



//被保险人姓名带入到投保人
function setApplyFromInsuredName(insuredid){
	var relation = $("#relation").val();//当前的投被保人关系
	if (relation == "01" && ( $("#input_applyName").val() == "" || $("#input_applyName").val() == "请输入投保人姓名")&&$("#input_insuredName"+insuredid).val()!=""&&$("#input_insuredName"+insuredid).val()!="请输入被保险人姓名")  {
		$('#input_applyName').val($("#input_insuredName"+insuredid).val());
		$("#input_applyName").css("color","#333");
		setSendByImportInsured($('#input_applyName').val());
	}
}

//被保险人证件类型带入到投保人
function setApplyFromInsuredIdType(insuredid) {
	var relation = $("#relation").val();// 当前的投被保人关系
	if (relation == "01" && checkIdentifyNumberJABA('input_identifyNumber') && 
											($('#input_applyIdentifyNumber').val() == ""||$('#input_applyIdentifyNumber').val() == "请输入证件号码")) {
		var indentifyType = $("#input_identifytype" + insuredid).val();
		$("#input_applyIndentifyType").val(indentifyType);
		$("#applyIdSelectSpan").html($("#insuredIdSelectSpan" + insuredid).html());
		setNationality();
	}
}
//被保险人证件号码带入到投保人
function setApplyFromInsuredId(insuredid) {
	var relation = $("#relation").val();// 当前的投被保人关系
	if (relation == "01" && checkIdentifyNumberJABA('input_identifyNumber')&& 
											($('#input_applyIdentifyNumber').val() == ""||$('#input_applyIdentifyNumber').val() == "请输入证件号码")&&
											$('#input_identifyNumber'+insuredid).val()!=""&&$('#input_identifyNumber'+insuredid).val()!="请输入证件号码") {
		$('#input_applyIdentifyNumber').val($('#input_identifyNumber'+insuredid).val());
		$('#input_applyIdentifyNumber').css("color","#333");
		setApplyIdentifySexand();
	}
}



//勾选框
function checkBoxClick(){
	$("#checkbox_id").toggleClass('active');
}

function setSex(sex){
	 $("#input_applySexmType").val(sex);
	 if(sex==2&&$("#sexSel").attr("class").replace(/[ ]/g,"")=='sexfl'){
	 toggleSex();
	 }else if(sex==1&&$("#sexSel").attr("class").replace(/[ ]/g,"")!='sexfl'){
	 toggleSex();
	 } 
}
//根据证件类型的值取证件类型的汉字名称
 function getindentifyType(Str){
 		var identityName = "其他";
 		identityName = getNameOrCode(Str,2);
		return identityName;
 }
 
 function checkInsureQuota_sim(){
		//判断是否有未保存的被保险人,判断依据是投保信息页面中被保险列表的flag，
		//1.1 有未保存 的，根据出生日期计算年龄，如果不是未成年人，则返回success，
		//如果是未成年人，判断是不是北京地区，不是北京地区，则弹出提示框，
		//是北京地区，调用后台查询该未成年的意外身故累计保额与本产品的所有套餐方案中意外身故保额之和是否超过10万，
		//如果超过10W，则弹出提示框提示该未成年人不能投保，否则，返回可以投保的方案代码，判断当前的方案代码是否在返回的方案代码内，
		//如果在，则直接跳转，否则，则弹出提示框，提醒客户修改投保方案
		//1.2有保存了的被保险人，调用后台查询被保险人列表中是否存在未成年人，不存在，返回success,若存在，判断当前所选的投保方案是否为经济型
		//如果是未成年人，判断是不是北京地区，不是北京地区，则弹出提示框，
		//是北京地区，调用后台查询该未成年的意外身故累计保额与本产品的所有套餐方案中意外身故保额之和是否超过10万，
		//如果超过10W，则弹出提示框提示该未成年人不能投保，否则，返回可以投保的方案代码，判断当前的方案代码是否在返回的方案代码内，
		//如果在，则直接跳转，否则，则弹出提示框，提醒客户修改投保方案
		var quotaflag = true;
		//判断最后一条是否有效
		var trsNum = $('#insertInsuredJSP>tbody>tr').length;
		var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
		if(lastTR.attr("flag") =="0"){
			//页面未保存的
			var insuredBirthday = $("input[name='prpzinsured.birthday']").val();
			var startdate = $("#startdate").val();
			var age = setAge(startdate,insuredBirthday);
			if(parseInt(age)<18){
				//未成年人
				quotaflag = false;
			}
		}
		if(($("#peoplecount").val()>1||lastTR.attr("flag") =="1")&&quotaflag){
			//多人
			var checkUrl = "/eproperty/ifHasChildInsured.do";
			$.ajax({
				url : checkUrl,
				async : false,
				type : "post",
				data :'sessionid=' + $('#sessionid').val(),
				success : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
					var result = data.result;
					if("true"==result){
						//存在未成年被保险人记录
						quotaflag = false;
					}
				},
				error : function(data,textStatus){
				}
			});
			
		}
		if(quotaflag){
			//不是未成年人
			return "success";
		}else{
			//是未成年人,返回economical，调用方法根据返回值执行ajax查询累计保额
		    return "economical";
		}
	}
 
 function checkSavedInsuredAge(){
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq(" + (trsNum - 1) + ")");
	var result = "success";
	if ($("#peoplecount").val() > 1 || lastTR.attr("flag") == "1") {
		var checkUrl = "/eproperty/checkSavedInsuredAge.do";
		$.ajax({
			url : checkUrl,
			async : false,
			type : "post",
			data :$("#form").serialize(),
			success : function(data, textStatus) { // 无论请求成功或失败，请求后都会执行的回调函数
				result = data.result
			},
			error : function(data,textStatus){
			}
		});
	}
	return result;
 }
 
 
//当关系发生变化，并且最终的变化值为“非本人”时，判断页面中的投被保人姓名，证件号码，证件类型三项值是否一致，当且仅当全部一致时，则清空投保人的此三项信息；否则，不做任何变化。
 function changeRelation(listr) {
	if ($('#relation').val() != listr && listr != "01") {
		var trsNum = $('#insertInsuredJSP>tbody>tr').length;
		var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
//		var idno=lastTR.attr('id');
		if ($("#peoplecount").val() == "1"
				&& $("#input_insuredName").val() == $("#input_applyName")
						.val()
				&& $("#input_identifytype").val() == $(
						"#input_applyIndentifyType").val()
				&& $("#input_identifyNumber").val() == $(
						"#input_applyIdentifyNumber").val()) {
			$("#input_applyName").val("");
			showInlineTips("input_applyName");
			$("#input_applyIndentifyType").val("01");
			$("#applyIdSelectSpan").text('身份证');
			setNationality();
			$("#input_applyIdentifyNumber").val("");
			showInlineTips("input_applyIdentifyNumber");
			setSex("1");
			checkApplyIdentifyNumberSex();
		}
	}
}
 
//从被保险人带性别到投保人
function setApplySex(idno) {
	var relation = $("#relation").val();
	var peoplecount = parseInt($('#peoplecount').val()); //投保人数
	if (relation=='01' && checkIdentifyNumberSex(idno)&&(($("#input_identifyNumber"+idno).val()==$("#input_applyIdentifyNumber").val()&&$("#input_identifytype"+idno).val()==$("#input_applyIndentifyType").val())||$("#input_applyIdentifyNumber").val()==""||$("#input_applyIdentifyNumber").val()=="请输入证件号码")) {
		var sex = $("#input_insuredsex"+idno).val();
		if(sex!=null&&sex!=undefined){
			setSex(sex);
			checkApplyIdentifyNumberSex();
		}
	}
}

function setApply(){
	if($("#input_applyName").val()==""||$("#input_applyName").val()=="请输入投保人姓名"){		
		setApplyFromInsuredName("");
	}
	if($("#input_applyIdentifyNumber").val()==""||$("#input_applyIdentifyNumber").val()=="请输入证件号码"){
		setApplyFromInsuredIdType("");
		setApplyFromInsuredId("");
	}
}

//信息带出,单被保险人且关系为'本人'时，或者多被保险人，且关系为'其它'时带入
function setApplyMsg(){
	var idno="";
	var peoplecount = parseInt($('#peoplecount').val()); //投保人数
	var relation = $("#relation").val();//当前的投被保人关系
	if((peoplecount==1&&relation=='01')||(peoplecount>1&&relation=='99'&&"LEF"!=$('#productcode'))){
		if(checkInsuredName("input_insuredName"+idno)&&($('#input_applyName').val()=="请输入投保人姓名"||$('#input_applyName').val()=="")){
			setApplyFromInsuredName(idno);
			$("#error_input_applyName").remove();
			$(".texts").removeClass('errorText');
		}
		if(checkIdentifyNumberJABA('input_identifyNumber')&&($('#input_applyIdentifyNumber').val()=="请输入证件号码"||$('#input_applyIdentifyNumber').val()=="")){
			setApplyFromInsuredIdType(idno);
			//投保人非中国居民时展示国籍居民选择框
			setNationality();
			setApplyFromInsuredId(idno);
			$("#error_input_applyIdentifyNumber").remove();
			$(".texts").removeClass('errorText');
		}
		try {setApplySex(idno);} catch(error) {}
	
	}
}

//当输入正确的身份证号码时自动给出生日期和性别赋值
function setIdentifySexandBirthdayModified(){
	if($('#modify_insuredIndentifyType').val()=="01"&&$('#modify_identifyNumber').val()!=""){
		var identiyId=$("#modify_identifyNumber").val();
		var msg=isCardID(identiyId);
		if(msg=="true"){
			//根据身份证校验出生日期
			var sId=$('#modify_identifyNumber').val();
			var sBirthday;
			if(sId.length==15){
				sBirthday="19"+sId.substr(6,2)+"/"+sId.substr(8,2)+"/"+sId.substr(10,2);
			}else{
				sBirthday=sId.substr(6,4)+"/"+sId.substr(10,2)+"/"+sId.substr(12,2);
			}
			$('#modify_insuredBirthday').val(sBirthday);
			var sSex=1;
			if(sId.length==15){   
	        	sSex=sId.substring(14,15)%2;
		    }else if(sId.length ==18){   
		       sSex=sId.substring(14,17)%2;
		    }
		    if(sSex==0){
		    	sSex=2;
		    }
		    $("#modify_sexm").val(sSex);
		    if(sSex==2&&$("#sexModify").attr("class").replace(/[ ]/g,"")=='sexfl'){
		    	toggleModifySex();
		    }else if(sSex==1&&$("#sexModify").attr("class").replace(/[ ]/g,"")!='sexfl'){
		    	toggleModifySex();
		    }
		}
	}
}

function toggleModifySex(){
	$("#sexModify").toggleClass('girl');
	if($("#sexModify").attr("class").replace(/[ ]/g,"")=='sexfl'){
		$("#modify_sexm").val("1");
	}else{
		$("#modify_sexm").val("2");
	}
}

function savePopModify(){
	if(!saveModifyInsuredCheck()){
		return false;
	}
	//	后台数据处理
	var sX="";
	if($("#modify_sexm").val()!=null){
		sX=$("#modify_sexm").val();
	}
	var pinyin="";
	if($("#modify_insuredEname").val()!=null){
		pinyin=$("#modify_insuredEname").val();
	}
	var bDetail="";
	if($("#input_modifybusinessdetail").val()!=null){
		bDetail=$("#input_modifybusinessdetail").val();
	}
	var quantity="";
	if($("#input_modifyquantity").val()!=null){
		quantity=$("#input_modifyquantity").val();
	}
	var risktype="";
	if($("#modify_risktype").val()!=null){
		risktype=$("#modify_risktype").val();
	}
	var insuredid=$('#modify_insuredid').val();
	var dataString ="riskcode="+$("#riskcode").val()+"&sessionid="+$("#sessionid").val()+"&insuredid="+insuredid+"&insuredname="+$("#modify_insuredName").val()+
	"&identifytype="+$("#modify_insuredIndentifyType").val()+"&identifynumber="+$("#modify_identifyNumber").val() +"&flag=1"+ 
	"&birthday="+$("#modify_insuredBirthday").val() +"&items="+$("#items").val()+"&productcode="+$("#productcode").val()+"&startdate="+$("#startdate").val()+
	"&insuredename="+pinyin+"&businessdetail="+bDetail+"&quantity="+quantity+"&risktype="+risktype+
	"&iscommoninsuredflag="+$("#modify_iscommoninsuredflag").val()+"&sex="+sX+"&couponcode="+$("#couponcode").val();
	$.ajax({
		type:'post',
		url:'/eproperty/saveInsured.do',
		data:dataString,
		async:false,
		success:function(data){
			var result = data.result;
			if(result == 'success'){
				//设置itemcount;
				var itemcount = data.itemcount;
				$('#peoplecount').val(itemcount);
				$('#peoplecount_up').html(itemcount);
				$('#peoplecount_btm').text(itemcount+"人");
				//改样式 ，改页面显示的值
				var modifyNameStr =$("#modify_insuredName").val().length>4? $("#modify_insuredName").val().substring(0,4)+ '..':$("#modify_insuredName").val();
				$("#dis_insuredName"+insuredid).html(modifyNameStr);
				$("#dis_insuredName"+insuredid).parent("td").attr("title",$("#modify_insuredName").val());
				if($("#input_insuredEname"+insuredid).val()!=null){
					$("#dis_insuredEname"+insuredid).parent("td").attr("title",pinyin);
					pinyin=pinyin.length > 4?pinyin.substring(0,4)+ '..':pinyin;
					$("#dis_insuredEname"+insuredid).html(pinyin);
				}
				$("#dis_identifytype"+insuredid).text($("#modifyIdSelectSpan").text());
				$("#dis_identifytype"+insuredid).parent("td").attr("title",$("#modifyIdSelectSpan").text());
				$("#input_identifytype"+insuredid).val($("#modify_insuredIndentifyType").val());
				$("#dis_identifyNumber"+insuredid).html($("#modify_identifyNumber").val());
				$("#dis_identifyNumber"+insuredid).parent("td").attr("title",$("#modify_identifyNumber").val());
				$("#dis_insuredBirthday"+insuredid).text($("#modify_insuredBirthday").val());
				$("#dis_insuredBirthday"+insuredid).parent("td").attr("title",$("#modify_insuredBirthday").val());
				if($("#input_insuredsex"+insuredid).val()!=null){
					$("#input_insuredsex"+insuredid).val(sX);//显示值改变，实际值没有改变
				$("#dis_sex"+insuredid).text(getSexName(sX));
				$("#dis_sex"+insuredid).parent("td").attr("title",getSexName(sX));
				}
				if($("#input_businessdetail"+insuredid).val()!=null){
				$("#dis_businessdetail"+insuredid).html(getBusinessdetailType($("#input_modifybusinessdetail").val()));
				$("#dis_businessdetail"+insuredid).parent("td").attr("title",getBusinessdetailType($("#input_modifybusinessdetail").val()));	
				$('#input_businessdetail'+insuredid).val($("#input_modifybusinessdetail").val());
				}
				if($("#input_quantity"+insuredid).val()!=null){
				$("#dis_quantity"+insuredid).html($("#input_modifyquantity").val()+"份");
				$("#dis_quantity"+insuredid).parent("td").attr("title",$("#input_modifyquantity").val()+"份");	
				$("#input_quantity"+insuredid).val($("#input_modifyquantity").val());
				}
				if($("#input_risktype"+insuredid).val()!=null){
					$("#input_risktype" + insuredid).val($("#modify_risktype").val());
					$("#risktype" + insuredid).val(getRisktypeName($("#modify_risktype").val()));
					$("#dis_risktype"+insuredid).html(getRisktypeName($("#modify_risktype").val()));
					$("#dis_risktype"+insuredid).parent("td").attr("title",getRisktypeName($("#modify_risktype").val()));	
				}
				if($("#modify_iscommoninsuredflag").val() == "1"){
					$("#finshiscommonflag"+insuredid).addClass("finsh");
				}else{
					$("#finshiscommonflag"+insuredid).removeClass("finsh");
				}
				$("#iscommoninsuredflag"+insuredid).val($("#modify_iscommoninsuredflag").val());
				$("#insertInsured_"+insuredid).parents("tr").find(".yes_edit").hide();
				$("#insertInsured_"+insuredid).parents("tr").find(".no_edit").css("display","block");
				$("#setiscommoninsuredflag"+insuredid).hide().next("span").css('display', 'block');
				$("#benchmarkPremium").val(data.benchmarkPremium);
				var sumpremium=data.sumpremium;
				if($('#riskcode').val()=="EDD"){//EDD总保费需要用有效的投保份数加上无效的投保份数然后乘以基础保费
					$('#sumInsuredquantiry').val(data.sumInsuredquantiry);
					$('#unitpremium').val(data.unitpremium);
					sumpremium=(data.sumInsuredquantiry+parseInt($('#invalidInsuredquantiry').val()))*$('#unitpremium').val();
					//份数修改
					$("#sumquantitystr").html(parseInt($('#sumInsuredquantiry').val())+parseInt($('#invalidInsuredquantiry').val()));						
					$("#sumquantitystr2").html((parseInt($('#sumInsuredquantiry').val())+parseInt($('#invalidInsuredquantiry').val()))+"份");
					$('#unitbenchmarkpremium').val(data.unitbenchmarkpremium);
					$('#benchmarkPremium').val((parseInt($('#sumInsuredquantiry').val())+parseInt($('#invalidInsuredquantiry').val()))*$('#unitbenchmarkpremium').val());
				}
				$("#sumpremium").val(sumpremium); 
				$("#sumpremium_up").html(sumpremium.toFixed(2));
				$("#premium_btm").text(sumpremium.toFixed(2)+"元");
				removeNameAtrr(insuredid);
				if($('#riskcode').val()=="LEF"){
					//LEF
					$("#oldcount").val(data.oldcount);
					$("#childcount").val(data.childcount);
					$("#roomcount").val(data.roomcount);
					displaySub2Premium();
				}
				showInvoiceDivNew($('#sumpremium').val());
				closeModify();
			}else{
				//高原游信息重复，不再弹层标示，直接在证件号码下面按错误提示显示
				if($("#productcode").val() == "EAK_G"||$("#riskcode").val() == "EDD"){
					var id = "input_identifyNumber" + insuredid;
					if(result == "信息重复请您重新填写"){
						showValidateResultNew("modify_identifyNumber", result);
					}else{
						closeModify();
						showTipsWindown(result);
					}	
				}
				else{
					closeModify();
					showTipsWindown(result);
				}	
			}
		},
		err:function(){
			var m4=encodeURI(encodeURI('数据格式错误，请重新检验！'));
			showTipsWindown('数据格式错误，请重新检验！');
		}
	});
}

//弹出删除窗口
function showDeleteWindow(serialno){
	$("#contentP").text("您确认要删除此条被保险人信息吗？");
	$("#delConfirmBtm").unbind('click');
	$("#delConfirmBtm").click(function () {deleteRow(serialno);});//重新绑定click事件
	$("#delSelectWindow").show();
	$("#background").show();
}
//关闭删除窗口
function closeDelWindow(){
	$("#delSelectWindow").hide();
	$("#background").hide();
}

function chooseModifyIdentifyType(code){
	$("#modify_insuredIndentifyType").val(code);
}
/**
 * 根据投保人，填写寄送信息
 */
function setSendByImportInsured(insuredName){
	 if($("#eflag").val()=="010" ||$("#eflag").val()=="110"||$("#eflag").val()=="120"||$("#isgrantvisa").val()=="1"){
			if($.trim($('#input_sendName').val())==""){	
				$('#input_sendName').val(insuredName);
			}
			if($.trim($('#input_invoiceTile').val())==""){
				$('#input_invoiceTile').val(insuredName);
			}
		}
	 if($("#eflag").val()=="100"){
		 if($.trim($('#input_sendName').val())==""){	
				$('#input_sendName').val(insuredName);
			}
	 }
	if($("#eflag").val()=="020"){
		if($.trim($('#input_invoiceTile').val())==""){	
			$('#input_invoiceTile').val(insuredName);
		}
	}
}
/**
 * 默认情况下
 */
function setSendMsgDefault(){
	if($.trim($('#input_applyName').val())!=""&&$('#input_invoiceTile').val()==""&&$('#input_applyName').val()!=$('#input_applyName').attr("data-value")&&checkApplyName("input_applyName")){
		$('#input_invoiceTile').val($('#input_applyName').val());
	}
	if($("#oldproposalno").val()!=""||$("#oldorderid").val()!=""){
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyMobile("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
			var iswebservice = $("#iswebservice").val();
			if(iswebservice!=""){//已经有值
				var otherflag = iswebservice.substring(0,1);
				$("#iswebservice").val(otherflag+"1");
			}else{//空，没有值，初次赋值
				$("#iswebservice").val("01");
			}
			//$('#postmobile').val($('#applyMobile').val());
		}
	}else{
		if($.trim($('#input_applyMobile').val())!=""&&$('#input_sendMobile').val()==""&&checkApplyMobile("input_applyMobile")){
			$('#input_sendMobile').val($('#input_applyMobile').val());
		}
	}
}
//我要开电子普票勾选框
function checkBoxClick_pic(){
	if($("#checkbox_pic").hasClass("active")){
		 $("#input_invoiceTiledl").hide();
		 setInvoiceSendNew('1','0');
			$("#checkbox_pic").toggleClass('active');
	}else{
		 $("#input_invoiceTiledl").show();	
			setInvoiceSendNew('1','2');
			$("#checkbox_pic").toggleClass('active');
		}
}
