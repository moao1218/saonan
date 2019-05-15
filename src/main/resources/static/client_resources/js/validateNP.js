/**
 * 页面公共校验方法
 */

/***************************************通用变量开始************************/
var reg4 = "[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘’；：”“'\"。，、？《》+0-9\\\\]";
var regexStr = /((^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(10|12|0?[13578])(\/)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(11|0?[469])(\/)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(\/)(0?2)(\/)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(\/)(0?2)(\/)(29)$)|(^([3579][26]00)(\/)(0?2)(\/)(29)$)|(^([1][89][0][48])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][0][48])(\/)(0?2)(\/)(29)$)|(^([1][89][2468][048])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][2468][048])(\/)(0?2)(\/)(29)$)|(^([1][89][13579][26])(\/)(0?2)(\/)(29)$)|(^([2-9][0-9][13579][26])(\/)(0?2)(\/)(29)$))/;
var reg5 = "[`~!@#%$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*&;|{}【】‘’；：”“'\"。，、？《》+0-9\\\\_]";//增加下划线的校验
var reg7 = "[`~!@#%$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*&;—|{}【】‘’；：”“'\"。，、？《》+\\\\]";
var reg8 = "[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘’；：”“'\"。，、？《》+0-9\\\\]";
var reg9 = "^[a-zA-Z0-9\u4e00-\u9fa5.#\\-()、（）]*$";//家庭地址校验
var flightReg="^[a-zA-Z0-9]*$";
var flightDepartCityRegForHaiNan="^[a-zA-Z0-9\u4e00-\u9fa5.\\-\\s]*$";
var flightDepartCityReg="^[a-zA-Z0-9\u4e00-\u9fa5.\\-]*$";
var hotellocationReg="^[a-zA-Z0-9\u4e00-\u9fa5.‘’\\s\\-]*$";
var companynameReg="^[a-zA-Z\u4e00-\u9fa5\\(\\)（）\\-·]*$";
var companyIdentifynumReg="^[a-zA-Z0-9\\(\\)（）\\-]*$";
var companyLicensenumReg="^[0-9]*$";
var housePetsTypeReg="^[\u4e00-\u9fa5/]*$";
var housePetsCountReg="^[123/]*$";
var addressZY="^([A-Z]|[a-z]|[0-9]|[\u4e00-\u9fa5/]|-|#)*$";
var wgrReg="^[a-zA-Z0-9]{15}$";
/***************************************通用变量结束************************/


/***************************************calc页面开始************************/
//旅行人数校验后计算保费
function checkTravelNumCal(id,minInsured,maxInsured){
	if(checkTravelNumber(id,minInsured,maxInsured)){
		calculateFee("sync");
	}else{
		return false;
	}
}

//旅行人数效验 需要修改
function checkTravelNumber(id,minInsured,maxInsured) {
	var minInsured = document.getElementById("MININSURED").value;
	var maxInsured = document.getElementById("MAXINSURED").value;
	if ($.trim($('#' + id).val()) == '') {
		if($("#riskcode").val()=="EJQ")
			showValidateResultNew(id, "请输入投保人数");
		else
			showValidateResultNew(id, "请输入旅行人数");
		return false;
	}
	if (isNaN($.trim($('#' + id).val()))) {
		showValidateResultNew(id, "请您输入有效数字");
		return false;
	}
	var personNo = parseInt($.trim($('#' + id).val()), 10);
	// if (personNo < 1 || personNo > 300) {
	var productcode = $("#productcode").val();
	if (personNo < minInsured || personNo > maxInsured) {
		if(productcode == "EAK_U"){
			showValidateResultNew('childcount', "本产品单次投保被保险人上限为"+maxInsured+"人且不能为"+parseInt(minInsured-1)+"人，请您重新输入");
			return false;
		}
		else{
			showValidateResultNew(id, "本产品单次投保被保险人上限为"+maxInsured+"人且不能为"+parseInt(minInsured-1)+"人，请您重新输入");
			return false;
		}
	}
	if(productcode == "EAK_U"){
		var childNo=parseInt( $.trim($('#childcount').val()),10);
		if(!checkChildAndItems(childNo)){
			var $alltype = $('.alltype').find('ul li');
			$alltype.removeClass();
			$('.rec').hide();
			return false;
		}
		if(personNo<childNo){
			$("#premiumStr").html(0);
			showValidateResultNew(id,"");
			showValidateResultNew('childcount', "未成年人人数不能超过被保险人总人数，请您重新输入");
			return false;
		}
	}
	// 定义正则表达式部分,判断输入的内容是否为数字
	var value = $('#' + id).val();
	var reg = /^\d+$/;
	if (value.constructor === String) {
		var re = value.match(reg);
		if (re != null) {
		} else {
			$("#premiumStr").html(0);
			showValidateResultNew(id, "请您输入有效数字");
			return false;
		}
	}
	$('#' + id).val(personNo);
	showValidateResultNew(id, "");
	return true;
}

function checkStartDate(str) {
	var minStartdate = $("#MINSTARTDATE").val();
	if("JBM_S"==$("#productcode").val()&&((null!=$("#oldproposalno").val()&&""!=$("#oldproposalno").val()&&undefined!=$("#oldproposalno").val())
			||(null!=$("#oldorderid").val()&&""!=$("#oldorderid").val()&&undefined!=$("#oldorderid").val()))){
		minStartdate = $("#continueminstartdate").val();
	}
	var maxStartdate =$("#MAXSTARTDATE").val();
	var inputDate = $('#startdate').val();
	var defaultdate = $('#defaultdate').val();
	var oldproposalno =$("#oldproposalno").val();
	//获取当天日期  年月日  yyyy/MM/dd
	var mydate = new Date().pattern("yyyy/MM/dd");
	/**地震险宁波特别更新T+7投保**/
	if(("JAB_A"==$("#productcode").val()&&$("#areacode").val()=="33020000")
			&&((oldproposalno=="" || oldproposalno==null || oldproposalno == undefined) 
					|| 
				(oldproposalno!="" && oldproposalno!=null && oldproposalno!=undefined && $('#oldenddate').val() != "" && $('#oldenddate').val() < mydate))){
		var Tplus7=convertFullDateToString((new Date($("#MINSTARTDATE").val())).addDays(6));
		minStartdate=Tplus7;
		defaultdate=Tplus7;
	}
	if("YEM"==$("#riskcode").val() && parseInt($("#input_insuranceperiod").val())>30){
		 minStartdate =$("#MINSTARTDATEOTHER").val();
		 defaultdate = $('#MINSTARTDATEOTHER').val();
	}
	if($("#riskcode").val() == "EDD" || $("#productcode").val() == "SEZJ"
		|| $("#productcode").val() == "LEF"|| $("#productcode").val() == "JAB_A"
		|| $("#productcode").val() == "EDD_X" || $("#productcode").val() == "JBD_B" 
		|| $("#productcode").val() == "JCA"|| $("#productcode").val() == "JCO"|| $("#productcode").val() == "EDD_R"
		|| "ZXF" == $("#productcode").val() || "YXL" == $("#productcode").val() || "YEHKM" == $("#productcode").val()
		|| "ECK" == $("#productcode").val()	|| "JTE_Y" == $("#productcode").val() || "JTE_D" == $("#productcode").val()
		||"ECR" == $("#productcode").val()||"EAL_L" == $("#productcode").val()||"WAF_N" == $("#productcode").val()
		||"JBM_S" == $("#productcode").val()||"EAJ_G" == $("#productcode").val()||"EAJ_Y" == $("#productcode").val()
		||"LXL" == $("#productcode").val()||"ZFO" == $("#productcode").val()||"EJQ_H" == $("#productcode").val()){
		var reg0 = /\d{8}$/;
		if (reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$("#startdate").val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			inputDate = $('#startdate').val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/");
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/");
			}
			$("#startdate").val(inputDate);
		}
	}
	if (inputDate == '') {
		$("#_my97DP").hide();
		if($("#productcode").val() == "JCA"||$("#productcode").val() == "EAK_G"||$("#riskcode").val() == "EDD"||$("#productcode").val() == "JAB_A" || $("#productcode").val() == "JBD_B" ){
			showTipsWindown("请输入保障起始日期");
		}else if($("#productcode").val() == "SEZJ"){
			showTipsWindown("保障起始日期不能为空");
		}else if("ECK" == $("#productcode").val()	){
			showTipsWindown("请输入保障起始日期");
		}else if("ECR" == $("#productcode").val()){
			showTipsWindown("请输入航班起飞日期");
		}else if("YEHKM" == $("#productcode").val() && $("#items").val().substring(0,3)=="YEH"){
			showTipsWindown("请输入航班起飞日期");
		}
		else{
			showTipsWindown("请输入起始日期");
		}
		if("JBM_S" == $("#productcode").val()){
			$('#startdate').removeClass("WdateFmtErr");
		}
		$('#startdate').val(defaultdate);
		$('#enddate').val($('#defaultdate').val());
		return false;
	}
	if (!(regexStr.test(inputDate)) && inputDate != '') {
		$("#_my97DP").hide();
		if($("#riskcode").val() == "EDD"||$("#productcode").val() == "JCA"){
			showTipsWindown("请输入正确的起始日期");
		}else{
			showTipsWindown("请输入正确的日期");
		}
		$('#startdate').val(defaultdate);
		$('#enddate').val(defaultdate);
		$('#startdate').removeClass("WdateFmtErr");
		return false;
	}
	if ((new Date(inputDate.replace(/-/g,"\/")))<(new Date(minStartdate.replace(/-/g,"\/"))) || (new Date(inputDate.replace(/-/g,"\/")))>(new Date(maxStartdate.replace(/-/g,"\/")))) {
		$("#_my97DP").hide();
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "LDT"
				|| $("#riskcode").val() == "EFF"
				|| $("#riskcode").val() == "EFG"
				|| $("#productcode").val() == "EJQ_Z"
				|| $("#riskcode").val() == "EFFEFG"
				|| $("#productcode").val() == "JCA"|| $("#productcode").val() == "EAA"
				|| $("#productcode").val() == "JBM_S") {
			showTipsWindown("起始日期不正确，请重新输入！");
		} else if($("#productcode").val() == "EAK_G"||$("#riskcode").val() == "EDD"|| $("#productcode").val() == "SEZJ"
			||$("#productcode").val() == "LEF"||$("#productcode").val() == "JAB_A"
			|| $("#productcode").val() == "EDD_X"  || $("#productcode").val() == "JBD_B"
			|| $("#productcode").val() == "ZXF"|| $("#productcode").val() == "JCO"
			|| "YXL" == $("#productcode").val() || "ECK" == $("#productcode").val()
			|| "YEHKM" == $("#productcode").val()|| "JTE_Y" == $("#productcode").val()
			|| "JTE_D" == $("#productcode").val()|| "EAL_L" == $("#productcode").val()
			|| "WAF_N" == $("#productcode").val()|| "EAJ_G" == $("#productcode").val()
			||"EAJ_Y" == $("#productcode").val()||$("#productcode").val() == "LXL"||$("#productcode").val() == "ZFO"){
			showTipsWindown("保障起始日期不正确，请重新输入！");
		}else if($("#productcode").val() == "ECR"){
			showTipsWindown("航班起飞日期不正确，请重新输入！");
		}
		else {
			showTipsWindown("旅行起始日期不正确，请重新输入！");
		}
		$('#startdate').val(defaultdate);
		$('#enddate').val(defaultdate);
		if("JBM_S" == $("#productcode").val() || "EAJ_G" == $("#productcode").val()){
			$('#startdate').removeClass("WdateFmtErr");
		}
		return false;
	}
	// 部分险种投保期限是固定的，无需进行checkDayBwtween校验
	if (null==str&& $("#productcode").val() != "JCA"&& $("#riskcode").val() != "ZKK" && $("#riskcode").val() != "LDT" && $("#productcode").val != "EFFEFG" && $("#productcode").val() == "JBD_B" ) {
		if(!checkDayBetween()){
			return false;
		}
	}
	if(($("#riskcode").val() == "EDD"|| $("#productcode").val() == "SEZJ"|| $("#productcode").val() == "JBM_S"
		|| $("#productcode").val() == "EDD_X"|| $("#productcode").val() == "EAJ_G") && $('#startdate').attr("class")!=null){
		var classname = $('#startdate').attr("class");
		$('#startdate').attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}

function checkSKStartDate(){
	var minStartdate =$("#MINSTARTDATE").val();
	var maxStartdate =$("#MAXSTARTDATE").val();
	var inputDate = $('#startdate').val();
	var defaultdate = $('#defaultdate').val();
	var periodno = $("#periodno").val();
	if (inputDate < minStartdate || inputDate > maxStartdate) {
		$("#_my97DP").hide();
		showTipsWindown("起始日期不正确，请重新输入！");
		$('#startdate').val(defaultdate);
		var enddate = getNextDateFullDate(defaultdate, periodno-1);
		$('#enddate').val(enddate);
		return false;
	}else{
		var enddate = getNextDateFullDate(inputDate, periodno-1);
		$('#enddate').val(enddate);
	}
	return true;
}
function checkDateOrder(id) {
	// 校验日期格式
	var inputDate = $('#startdate').val();
	var inputDate_ = $('#enddate').val();
	var now = $('#defaultdate').val();	
	var minStartdate =$("#MINSTARTDATE").val();
	var maxStartdate =$("#MAXSTARTDATE").val();
	var array = new Array();
	array = inputDate.split("/");
	if($("#productcode").val() == "EAJ_Y" ){
		var reg0 = /\d{8}$/;
		if (reg0.test(inputDate_)) {
			$("#_my97DP").hide();
			$("#enddate").val(inputDate.toString().substring(0,4)+"/"+inputDate_.toString().substring(4,6)+"/"+inputDate_.toString().substring(6,8));
			var classname = $('#enddate').attr("class");
			$('#enddate').attr("class",classname.replace(/WdateFmtErr/g,""));
		} else if(inputDate_.length == 10&&inputDate_.indexOf("/")==-1){
			if(inputDate_.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate_ = inputDate_.replace(/-/g, "/");
			}
			else if(inputDate_.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate_ = inputDate_.replace(/\./g, "/");
			}
			$("#enddate").val(inputDate_);
			var classname = $('#enddate').attr("class");
			$('#enddate').attr("class",classname.replace(/WdateFmtErr/g,""));
		}
	}
	if (array[1] < 10 && array[1].length == 1 || array[2] < 10
			&& array[2].length == 1) {
		showTipsWindown("请输入正确的日期");
		$('#startdate').val($('#defaultdate').val());
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#productcode").val() == "EFFEFG"
				|| $("#riskcode").val() == "YEJ"
				|| $("#productcode").val()=="EFG_M"
				|| $("#productcode").val()=="JBD_B") {
			showEndDate('startdate');
		} else {
			$('#enddate').val($('#defaultdate').val());
		}
		return false;
	}
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if (!(regexStr.test($('#' + id).val()))) {
		if ($('#' + id).val() != '') {
			$("#_my97DP").hide();
			showTipsWindown("请输入正确的日期");
			$('#startdate').val($('#defaultdate').val());

			if ($("#riskcode").val() == "ZKK"
					|| $("#productcode").val() == "EJQ_H"
					|| $("#riskcode").val() == "LCB"
					|| $("#productcode").val() == "EFFEFG"
					|| $("#riskcode").val() == "YEJ"
					|| $("#productcode").val() == "EFG_M"
					|| $("#productcode").val()=="JBD_B") {
				showEndDate('startdate');
			} else {
				$('#enddate').val($('#defaultdate').val());
			}
			return false;
		}
	}
	if ($("#startdate").val() == "") {
		$("#_my97DP").hide();
		if ($("#riskcode").val() == "YEH") {
			showTipsWindown("请输入航班起飞日期");
		} else {
			showTipsWindown("请输入起始日期");
		}
		$('#startdate').val($('#defaultdate').val());
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "EFF"
				|| $("#riskcode").val() == "EFG"
				|| $("#riskcode").val() == "EFFEFG"
				|| $("#productcode").val()=="JBD_B") {
			showEndDate('startdate');
		} else {
			$('#enddate').val($('#defaultdate').val());
		}
		return false;
	}
	var sDate = now.split("/");
	var startDate = (parseInt(sDate[0]) + 1).toString() + '/12/31';
	if (inputDate < minStartdate || inputDate > maxStartdate) {
		$("#_my97DP").hide();
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "LDT"
				|| $("#productcode").val() == "EJQ_Z"
				|| $("#productcode").val() == "EFFEFG"
				|| $("#productcode").val() == "EFG_M"
				|| $("#productcode").val()=="JBD_B") {
			showTipsWindown("起始日期不正确，请重新输入！");
		} else if ($("#riskcode").val() == "YEH") {

			showTipsWindown("航班起飞日期不正确，请重新输入！");
		} else {
			showTipsWindown("旅行起始日期不正确，请重新输入！");
		}
		$('#startdate').val($('#defaultdate').val());
		if ($("#riskcode").val() == "ZKK" || $("#productcode").val() == "EJQ_H"
				|| $("#riskcode").val() == "LCB"
				|| $("#riskcode").val() == "EFF"
				|| $("#riskcode").val() == "EFG"
				|| $("#productcode").val() == "EFFEFG"
				|| $("#productcode").val()=="JBD_B") {
			showEndDate('startdate');
		} else {
			$('#enddate').val($('#defaultdate').val());
		}
		return false;
	}
	showValidateResult(id, "");
	return true;
}

function setEndDate() {
	if (checkStartDate()) {
		maxday=parseInt($("#MAXRISKPERIOD").val())-1;
		new WdatePicker({
					minDate : "#F{$dp.$D(\'startdate\')}",
					isShowToday : false,
					isShowClear :false,
					maxDate : "#F{$dp.$D(\'startdate\',{d:maxday})}",
					dateFmt : 'yyyy/MM/dd'
				});
	} else {
		return false;
	}
}
/***************************************calc页面结束************************/

/***************************************info页面开始************************/
// 被保险人姓名效验
function checkInsuredName(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 30) {
		if("EAL_L" == $("#productcode").val()){
			showValidateResultNew(id, "被保险人姓名过长");
		}else{
			showValidateResultBtm(id, "被保险人姓名过长");
		}
		return false;
	}
	if(",YXL,ECK,JTE_S,WAF_N,JBM_S,EDD_R,EAJ_Y,EAJ_G,LXL,ZFO,EJQ_H".indexOf($("#productcode").val())<0||"例：李明/LIMING"!=$("#" + id).val()){
		if (($("#" + id).val()).match(reg4) || ($("#" + id).val()).toString().indexOf("_") > -1) {
			if("EAL_L" == $("#productcode").val()){
				showValidateResultNew(id, "请输入正确的名字");
			}else{
			showValidateResultBtm(id, "请输入正确的名字");
			}
			return false;	
		}
	}
	showValidateResultBtm(id, "");
	return true;
}
// 被保险人姓名效验
function checkLAYInsuredName(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultBtm(id, "被保险人姓名过长");
		return false;
	}
	if (($("#" + id).val()).match(reg8)
			|| ($("#" + id).val()).toString().indexOf("-") > -1) {
		showValidateResultBtm(id, "请输入正确的名字 ");
		return false;
	}
	showValidateResultBtm(id, "");
	return true;
}
//被保险人姓名拼音
function checkInsuredeNamePY(id){
	$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	$('.preTitle').removeAttr("style");
	var reg=/^[ A-Za-z]*$/;
	if ($.trim($("#"+id).val() )== ""){
	}
	if(!(reg.test($("#"+id).val()))){
		if("EAL_L" == $("#productcode").val()){
		showValidateResultNew(id,"请填写正确的姓名拼音");
		}else{
		showValidateResultBtm(id,"请填写正确的姓名拼音");
		}
		
		return false;
	}
	if(pcbytes($("#"+id).val())>20){
		showValidateResultBtm(id,"被保险人姓名拼音过长");
		return false;
	}
	showValidateResultBtm(id,"");
	return true;
}
function checkApplyNameJMA(id){
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
		
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultNew(id, "投保人姓名过长");
		return false;
	}	
	if (($("#" + id).val()).match(reg4)
			|| ($("#" + id).val()).toString().indexOf("_") > -1) {
		showValidateResultNew(id, "请输入正确的姓名");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}
// 投保人姓名效验
function checkApplyName(id) {
	var productcode = $("#productcode").val();
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 80) {
		if("EAC_S"==productcode||"EAC_L"==productcode){
			showValidateResultNew(id, "投保人名称过长");
		}else{
			showValidateResultNew(id, "投保人姓名过长");
		}
		return false;
	}
	if ( $("#riskcode").val()=="EAC"  && (pcbytes($("#" + id).val()) == 0 || $.trim($("#" + id).val())=="请输入投保人")) {
			//showValidateResultNew(id, "投保人名称不能为空");
		return false;
	}
	if (($("#" + id).val()).match(reg5)) {
		if("EAC_S"==productcode||"EAC_L"==productcode){
			showValidateResultNew(id, "请输入正确的投保人");
		}else if("JMA"==productcode){
			showValidateResultNew(id, "请输入正确的姓名");
		}else{
			showValidateResultNew(id, "请输入正确的名字");
		}
		return false;
	}
	
//	showValidateResultNew(id, "");
	return true;
}

//投保人身份证号码效验
function checkApplyNumber(id) {
	ApplyentityNumChange(id);
	var productcode = $("#productcode").val();
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	}
	if(!("EAC_S"==productcode||"EAC_L"==productcode)){
		if (pcbytes($("#" + id).val()) > 18) {
			showValidateResultNew(id, "投保人证件号码过长");
			return false;
		}
	}
	if ($('#input_applyIndentifyType').val() == "99"
			|| $('#input_applyIndentifyType').val() == "31") {
		if ($("#riskcode").val() == "YEJ") {// YEJ证件为组织机构时，证件号码长度为9位，-不占位
			var b = ($("#" + id).val()).replace(/-/g, "");
			var regExp = /^[0-9a-zA-Z-]+$/;
			if (pcbytes(b) > 9) {
				showValidateResultNew(id, "投保人证件号码过长");
				return false;
			}
			if (regExp.test($("#" + id).val())) {
				showValidateResultNew(id, "");
			} else {
				showValidateResultNew(id, "请输入正确的证件号");
				return false;
			}
		}else if("EAC_S"==productcode||"EAC_L"==productcode){
			if (pcbytes($("#" + id).val()) > 20) {
				showValidateResultLEFBtm(id, "组织机构代码过长");
				return false;
			}
			if(!($("#" + id).val()).match(companyIdentifynumReg)&& $("#"+id).val() != "请输入证件号码"){
				showValidateResultNew(id, "请输入正确的组织机构代码");
				return false;
			}
		}

		if (($("#" + id).val()).match(reg7)) {
			showValidateResultNew(id, "请输入正确的证件号");
			return false;
		}
	} else if ($('#input_applyIndentifyType').val() == "33"){
		if (pcbytes($("#" + id).val()) > 15) {
			if("EAC_S"==productcode||"EAC_L"==productcode){
				showValidateResultNew(id, "税务登记证号码过长");
			}else{
				showValidateResultLEFBtm(id, "税务登记证号码过长");
			}	
			return false;
		}
		if(!($("#" + id).val()).match(companyLicensenumReg)&& $("#"+id).val() != "请输入证件号码"){
			showValidateResultNew(id, "请输入正确的税务登记证号码");
			return false;
		}
	} else if ($('#input_applyIndentifyType').val() == "34"){
		if (pcbytes($("#" + id).val()) > 30) {
			showValidateResultLEFBtm(id, "营业执照号码过长");
			return false;
		}
		if(!($("#" + id).val()).match(companyLicensenumReg)&& $("#"+id).val() != "请输入证件号码"){
			showValidateResultNew(id, "请输入正确的营业执照号码");
			return false;
		}
	} else if($('#input_applyIndentifyType').val() == "16" && $("#" + id).val() !="" && $("#" + id).val() !="请输入证件号码" ){
		if(!($("#" + id).val()).match(wgrReg)){
			showValidateResultNew(id, "请输入正确的证件号");
			return false;
		}
		
	} else if (($("#" + id).val()).match(reg7)) {
		showValidateResultNew(id, "请输入正确的证件号");
		return false;
	}
	if (($('#input_applyIndentifyType').val() == "01"||$('#input_applyIndentifyType').val() == "02" || $('#input_applyIndentifyType').val() == "17")
			&& $('#input_applyIdentifyNumber').val() != ""
				&& $('#input_applyIdentifyNumber').val() != "请输入证件号码") {
		var identiyId = $("#input_applyIdentifyNumber").val();
		var msg = isCardID(identiyId);
		if (msg == "true") {

		} else {
			if("请输入正确的身份证号码" == msg && "01" != $('#input_applyIndentifyType').val() ){
				showValidateResultNew(id, "请输入正确的证件号");
			}else{
				showValidateResultNew(id, msg);
			}
			
			return false;
		}
	}
	
	if("EAC_S"!=productcode && "EAC_L"!=productcode){
		if(!checkApplyIdentifyNumberSex()){
			return false;
		}
	}
	showValidateResultNew(id, "");
	return true;
}

//根据身份证号码验证性别
function checkApplyIdentifyNumberSex() {
	if (($('#input_applyIndentifyType').val() == "01" || $('#input_applyIndentifyType').val() == "02" || $('#input_applyIndentifyType').val() == "17")
			&& $('#input_applyIdentifyNumber').val() != ""
				&& $('#input_applyIdentifyNumber').val() != "请输入证件号码") {
		var identiyId = $("#input_applyIdentifyNumber").val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sId = $('#input_applyIdentifyNumber').val();
			var sSex = 1;
			if (sId.length == 15) {
				sSex = sId.substring(14, 15) % 2;
			} else if (sId.length == 18) {
				sSex = sId.substring(14, 17) % 2;
			}
			var sex = $("#input_applySexmType").val();// 性别 ;
			if (sSex == 0) {
				sSex = 2;
			}
			if (sSex != sex) {
				if("01" == $('#input_applyIndentifyType').val()){
					showValidateResultNew("sexSel", "请确认信息与身份证一致");
				}else{
					showValidateResultNew("sexSel", "请确认信息与证件一致");
				}
				return false;
			} else {
				showValidateResultNew("sexSel", "");
				return true;
			}
		} else {
			showValidateResultNew("sexSel", "");
			if("01" != $('#input_applyIndentifyType').val() && "请输入正确的身份证号码"==msg){
				showValidateResultNew("input_applyIdentifyNumber", "请输入正确的证件号");
			}else{
				showValidateResultNew("input_applyIdentifyNumber", msg);
			}
			
			return false;
		}
	}
	showValidateResultNew("sexSel", "");
	return true;
}

//投保人手机效验
function checkApplyMobile(id) {
	if($("#oldproposalno").val()!="" || $("#oldorderid").val()!=""){
		if( $("#iswebservice").val()!="" && $("#iswebservice").val()!=undefined){
			var iswebservice=$("#iswebservice").val();
			if(id=="input_applyMobile"&&iswebservice.substring(0,1)=="0"){//如果是投保人手机号，没有修改则跳过校验
				return true;
			}else if(id=="input_sendMobile"&&iswebservice.substring(1,2)=="0"){//如果是保单寄送手机号，没有修改则跳过校验
				return true;
			}
		}else if( $("#iswebservice").val()==""||$("#iswebservice").val()=="00"){//没有修改的情况下，直接跳过，不用校验	
			return true;
		}
	}
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if (""==$.trim($("#" + id).val()) || '例：13519854122'==$.trim($("#" + id).val())) {
		if($("#productcode").val() == "JMA"){
			showValidateResultNew(id, "手机号码不能为空");
			return false;
		}
	} else {
		var strMobile = $("#" + id).val();
		mobile_Flag = false;
		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
		if("JCO"==$("#productcode").val()){
			reg0 = /^1[3|4|5|7|8]\d{9}$/;
		}
		if (reg0.test(strMobile)) {
			mobile_Flag = true;
		} else {
			mobile_Flag = false;
		}
		if (mobile_Flag) {
			showValidateResultNew(id, "");
			return true;
		} else {
			showValidateResultNew(id, "请输入正确的手机号码");
			return false;
		}
	}
	return true;
}

function checkZipCode(id){
	var reg = /^[1-9]\d{5}(?!\d)/;
	var zipcode = $("#"+id).val();
	if($.trim($("#" + id).val()) == ""){
		showValidateResultNew(id, "邮编不能为空");
		return false;
	}else if(!reg.test(zipcode)){
		showValidateResultNew(id, "请输入正确的邮编");
		return false;
	}else{
		showValidateResultNew(id, "");
		return true;
	}
}

//投保人邮箱效验
function checkApplyEmail(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	
	if ( $("#riskcode").val()=="EAC"  && (pcbytes($("#" + id).val()) == 0 || $.trim($("#" + id).val())=="请输入邮箱")) {
		return false;
}
	
	if ($.trim($("#" + id).val()) == "") {
	} else {
		var email = $("#" + id).val();
		var email_Flag = false;
		// email.search(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/)
		// != -1
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		email_Flag = reg.test(email);
		if(pcbytes(email)>50){
			showValidateResultNew(id, "邮箱地址过长");
			return false;
		} else if (!email_Flag ) {
			showValidateResultNew(id, "请输入正确的邮箱地址");
			return false;
			
		} else {
			showValidateResultNew(id, "");
			return true;
		}
	}
}

//被保险人！！身份证号码效验
function checkIdentifyNumber(insuredid) {
	InsuredidentityNumChange(insuredid);
	var id = "input_identifyNumber" + insuredid;
	var replace_idno=($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '');
	if($("#" + id).val() != replace_idno){
		$("#" + id).val(replace_idno);
	}
	if (pcbytes($("#" + id).val()) > 18) {
		showValidateResultBtm(id, "请输入正确的证件号");
		return false;
	}
	if ($('#input_identifytype'+insuredid).val() == "99" || $('#input_identifytype'+insuredid).val() == "31") {
		if ($("#riskcode").val() == "YEJ") {// YEJ证件为组织机构时，证件号码长度为9位，-不占位
			var b = ($("#" + id).val()).replace(/-/g, "");
			var regExp = /^[0-9a-zA-Z-]+$/;
			if (pcbytes(b) > 9) {
				showValidateResultBtm(id, "请输入正确的证件号");
				return false;
			}
			if (regExp.test($("#" + id).val())) {
				showValidateResultBtm(id, "");
			} else {
				showValidateResultBtm(id, "请输入正确的证件号");
				return false;
			}
		}

		if (($("#" + id).val()).match(reg7)) {
			showValidateResultBtm(id, "请输入正确的证件号");
			return false;
		}
	} else if($('#input_identifytype'+insuredid).val() == "16" && $("#"+id).val()!="" && $("#"+id).val()!="请输入证件号码"){
		if(!($("#"+id).val()).match(wgrReg)){
			showValidateResultBtm(id, "请输入正确的证件号");
			return false;
		}
		
	} else if (($("#" + id).val()).match(reg7)) {
		if("01" == $("#input_identifytype"+insuredid).val()){
			showValidateResultBtm(id, "请输入正确的身份证号码");
		}else{
			showValidateResultBtm(id, "请输入正确的证件号");
		}
		return false;
	}
	if (($("#input_identifytype"+insuredid).val() == "01" || $("#input_identifytype"+insuredid).val() == "02" || $("#input_identifytype"+insuredid).val() == "17") && $('#input_identifyNumber'+insuredid).val() != "" && $('#input_identifyNumber'+insuredid).val() !="请输入证件号码") {
		var identiyId = $("#"+id).val();
		var msg = isCardID(identiyId);
		if("ZXF" != $("#productcode").val()){
			if (msg == "true") {
				checkInsuredBirthday(insuredid);
			} else {
				if("请输入正确的身份证号码" == msg && "01" != $("#input_identifytype"+insuredid).val()){
					showValidateResultBtm(id, "请输入正确的证件号");
				}else{
					showValidateResultBtm(id, msg);
				}
				return false;
			}
		}else{
			if (msg == "true") {
				
			} else {
				if("请输入正确的身份证号码" == msg && "01" != $("#input_identifytype"+insuredid).val()){
					showValidateResultBtm(id, "请输入正确的证件号");
				}else{
					showValidateResultBtm(id, msg);
				}
				
				return false;
			}
		}
	}
//	EJQ_Z不需要验证性别  ZXF 不需要验证性别和
	if("ZXF" != $("#productcode").val()){
		if("JBD_B" == $("#productcode").val()){
			checkIdentifyNumberSex();
		}else if("ZFO" == $("#productcode").val()){
			checkIdentifyNumberSex(insuredid);
		}else if ("EAJ_Y" == $("#productcode").val()||"EAJ_G" == $("#productcode").val()||"JTE_Y" == $("#productcode").val()){
			checkIdentifyNumberSex(insuredid);
			checkInsuredBirthday(insuredid);
		}else{
			checkInsuredBirthday(insuredid);
		}
	}
	
	showValidateResultBtm(id, "");
	return true;
}

function cleanInvalidBirthday(id){
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		$('#' + id).val("");
	}
	if(",ECK,YXL,YEHKM,EAJ_G,EAJ_Y,ECR,EDD_R".indexOf($("#productcode").val())>-1){
		var minInsuredage=$("#MININSUREDAGE").val();
		var maxInsuredage=$("#MAXINSUREDAGE").val();
		var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
		var maxInsuredageUnit=maxInsuredage.charAt(maxInsuredage.length - 1);
		minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
		maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
		if("ECR"!=$("#productcode").val()&&"EDD_R"!=$("#productcode").val()){
			var maxOldInsuredage=$("#MAXOLDINSUREDAGE").val();
			var maxOldInsuredageUnit=maxOldInsuredage.charAt(maxOldInsuredage.length - 1);
			maxOldInsuredage=maxOldInsuredage.substr(0,maxOldInsuredage.length-1);
			var oldProposalNo = $("#oldproposalno").val();
		}
		if("ECK"==$("#productcode").val() && ""!=oldProposalNo && undefined!=oldProposalNo){
			maxInsuredage = maxOldInsuredage;
			maxInsuredageUnit=maxOldInsuredageUnit;
		}
		var startdate = $('#startdate').val();
		var birthday = $.trim($('#'+id).val());
		if(!chkBirthdayNew(maxInsuredage, minInsuredage,maxInsuredageUnit,minInsuredageUnit, startdate, birthday)){
			$('#' + id).val("");
		}
	}
}

// 被保险人出生日期与身份证号效验
function checkInsuredBirthday(insuredid) {
	var id = "input_insuredBirthday"+insuredid;
	if(insuredid == "" && $("#productcode").val() == 'LDT_E'){
		var minInsuredage=$("#MININSUREDAGE_HOMERISK").val();
		var maxInsuredage=$("#MAXINSUREDAGE_HOMERISK").val();
	}else{
		var minInsuredage=$("#MININSUREDAGE").val();
		var maxInsuredage=$("#MAXINSUREDAGE").val();
	}
	var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
	var maxInsuredageUnit=maxInsuredage.charAt(maxInsuredage.length - 1);
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	
	var maxOldInsuredage=$("#MAXOLDINSUREDAGE").val();
	var maxOldInsuredageUnit=maxOldInsuredage.charAt(maxOldInsuredage.length - 1);
	maxOldInsuredage=maxOldInsuredage.substr(0,maxOldInsuredage.length-1);
	var oldProposalNo = $("#oldproposalno").val();
	if("ECK"==$("#productcode").val() && ""!=oldProposalNo && undefined!=oldProposalNo){
		maxInsuredage = maxOldInsuredage;
		maxInsuredageUnit=maxOldInsuredageUnit;
	}
	if($("#riskcode").val()!="LAY" && $("#productcode").val()!="LDT_E"){
		hideTipsNew(id);
	}
	//EDD生日格式转换
	var inputDateBefore = $('#' + id).val();
	if($("#riskcode").val() == "EDD"  || $("#productcode").val() == "EAJ_G" ||$("#productcode").val() == "EAJ_Y"||$("#productcode").val() == "LXL"||$("#productcode").val() == "EJQ_H"){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + id).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + id).val(inputDate);
		}
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		if("EAL_L" == $('#productcode').val()){
			showValidateResultNew(id, "请输入正确的日期");
		}else{
		showValidateResultBtm(id, "请输入正确的日期");
		}
		if($("#riskcode").val() == "EDD" ){
			$('#' + id).val(inputDateBefore);
		}
		//$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	if ($.trim($('#input_insuredBirthday').val()) == '') {
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#input_insuredBirthday'+insuredid).val());
	var riskcode = $("#riskcode").val();
	// if (riskcode == "EAJ" || riskcode == "EAK") {
	if (!chkBirthdayNew(maxInsuredage, minInsuredage,maxInsuredageUnit,minInsuredageUnit, startdate, birthday)) {
			var tips= "年龄必须在" + minInsuredage;
			if ("M"==minInsuredageUnit) {
				tips += "个月";
			}if ("D"==minInsuredageUnit) {
				tips += "天";
			}
			tips = tips + "至" + maxInsuredage + "周岁之间";
			if(",ECK,YXL,YEHKM,EAJ_G,EAJ_Y".indexOf($("#productcode").val())>-1){
				$("#_my97DP").hide();
			}
			if("EAL_L" == $('#productcode').val()){
				showValidateResultNew(id, tips);
			}else{
				showValidateResultBtm(id, tips);
			}
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (($('#input_identifytype'+insuredid).val() == "01" || $('#input_identifytype'+insuredid).val() == "02" || $('#input_identifytype'+insuredid).val() == "17") && $('#input_identifyNumber'+insuredid).val() != ""&& $('#input_identifyNumber'+insuredid).val() != "请输入证件号码") {
		var sId = $('#input_identifyNumber'+insuredid).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+id).val();
		if (sBirthday != birthday) {
			if("EAL_L" == $("#productcode").val()){
				if("01" == $('#input_identifytype'+insuredid).val()){
					showValidateResultNew(id, "请确认信息与身份证一致");
				}else{
					showValidateResultNew(id, "请确认信息与证件一致");
				}
			}else{
				if("01" == $('#input_identifytype'+insuredid).val()){
					showValidateResultBtm(id, "请确认信息与身份证一致");
				}else{
					showValidateResultBtm(id, "请确认信息与证件一致");
				}
			}			
			return false;
		}else{
			showValidateResultBtm(id, "");
			if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
				var classname = $('#' + id).attr("class");
				$('#' + id).attr("class",classname);
			}
			return true;
		}
	}
	showValidateResultBtm(id, "");
	if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
		var classname = $('#' + id).attr("class");
		$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}
//被保险人出生日期与身份证号效验
function checkInsuredBirthdayForEAA(birthId,identifyId,typeId) {
	
	if($("#riskcode").val()!="LAY"){
		hideTipsNew(birthId);
	}
	//EDD生日格式转换
	var inputDateBefore = $('#' + birthId).val();
	if($("#riskcode").val() == "EDD" || $("#riskcode").val() == "EAA"){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + birthId).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + birthId).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + birthId).val(inputDate);
		}
	}
	if("EDD_R" == $("#productcode").val()){
		var startdate = $('#startdate').val();
		var birthday = $.trim($('#input_insuredBirthday').val());
		var minInsuredage=$("#MININSUREDAGE").val();
		var maxInsuredage=$("#MAXINSUREDAGE").val();
		var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
		var maxInsuredageUnit=maxInsuredage.charAt(maxInsuredage.length - 1);
		minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
		maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
			if ( !chkBirthdayNew(maxInsuredage, minInsuredage,maxInsuredageUnit,minInsuredageUnit, startdate, birthday)) {
				var tips= "年龄必须在" + minInsuredage;
				if ("M"==minInsuredageUnit) {
					tips += "个月";
				}if ("D"==minInsuredageUnit) {
					tips += "天";
				}
				tips = tips + "至" + maxInsuredage + "周岁之间";
				if(",ECK,YXL,YEHKM,EDD_R".indexOf($("#productcode").val())>-1){
					$("#_my97DP").hide();
				}
				if("EAL_L" == $('#productcode').val()){
					showValidateResultNew(birthId, tips);
				}else{
					showValidateResultBtm(birthId, tips);
				}
				return false;
		}
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + birthId).val())) && $('#' + birthId).val() != '') {
		showValidateResultBtm(birthId, "请输入正确的日期");
		if($("#riskcode").val() == "EDD" ){
			$('#' + birthId).val(inputDateBefore);
		}
		//$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#'+birthId).val());
	var riskcode = $("#riskcode").val();
	
	// 判断输入的出生日期是否与身份证一致
	if (($('#'+typeId).val() == "01" || $('#'+typeId).val() == "02" || $('#'+typeId).val() == "17") && $('#'+identifyId).val() != ""&& $('#'+identifyId).val() != "请输入证件号码") {
		var sId = $('#'+identifyId).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+birthId).val();
		if (sBirthday != birthday) {
			if("01" == $('#'+typeId).val()){
				showValidateResultBtm(birthId, "请确认信息与身份证一致");
			}else{
				showValidateResultBtm(birthId, "请确认信息与证件一致");
			}
			
			return false;
		}else{
			showValidateResultBtm(birthId, "");
			if($("#riskcode").val() == "EDD" && $('#' + birthId).attr("class")!=null){
				var classname = $('#' + birthId).attr("class");
				$('#' + birthId).attr("class",classname);
			}
			return true;
		}
	}
	showValidateResultBtm(birthId, "");
	if($("#riskcode").val() == "EDD" && $('#' + birthId).attr("class")!=null){
		var classname = $('#' + birthId).attr("class");
		$('#' + birthId).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}
function checkInsuredBirthdayForEAL(insuredid) {
	var id = "input_insuredBirthday"+insuredid;
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
	var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
	var maxInsuredageUnit=maxInsuredage.charAt(maxInsuredage.length - 1);
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	
	var maxOldInsuredage=$("#MAXOLDINSUREDAGE").val();
	var maxOldInsuredageUnit=maxOldInsuredage.charAt(maxOldInsuredage.length - 1);
	maxOldInsuredage=maxOldInsuredage.substr(0,maxOldInsuredage.length-1);
	var oldProposalNo = $("#oldproposalno").val();
	if("ECK"==$("#productcode").val() && ""!=oldProposalNo && undefined!=oldProposalNo){
		maxInsuredage = maxOldInsuredage;
		maxInsuredageUnit=maxOldInsuredageUnit;
	}
	if($("#riskcode").val()!="LAY"){
		hideTipsNew(id);
	}
	//EDD生日格式转换
	var inputDateBefore = $('#' + id).val();
	if($("#riskcode").val() == "EDD" ){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + id).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + id).val(inputDate);
		}
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		if("EAL_L" == $('#productcode').val()){
			showValidateResultNew(id, "请输入正确的日期");
		}else{
		showValidateResultBtm(id, "请输入正确的日期");
		}
		if($("#riskcode").val() == "EDD" ){
			$('#' + id).val(inputDateBefore);
		}
		//$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	if ($.trim($('#input_insuredBirthday').val()) == '') {
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#input_insuredBirthday'+insuredid).val());
	var riskcode = $("#riskcode").val();
	// if (riskcode == "EAJ" || riskcode == "EAK") {
	if (!chkBirthdayNewForEAL(maxInsuredage, minInsuredage,maxInsuredageUnit,minInsuredageUnit, startdate, birthday)) {
			var tips= "年龄必须在" + minInsuredage;
			if ("M"==minInsuredageUnit) {
				tips += "个月";
			}if ("D"==minInsuredageUnit) {
				tips += "天";
			}
			tips = tips + "至" + maxInsuredage + "周岁之间";
			if(",ECK,YXL,YEHKM".indexOf($("#productcode").val())>-1){
				$("#_my97DP").hide();
			}
			if("EAL_L" == $('#productcode').val()){
				showValidateResultNew(id, tips);
			}else{
				showValidateResultBtm(id, tips);
			}
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (($('#input_identifytype'+insuredid).val() == "01" || $('#input_identifytype'+insuredid).val() == "02" || $('#input_identifytype'+insuredid).val() == "17") && $('#input_identifyNumber'+insuredid).val() != ""&& $('#input_identifyNumber'+insuredid).val() != "请输入证件号码") {
		var sId = $('#input_identifyNumber'+insuredid).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+id).val();
		if (sBirthday != birthday) {
			if("EAL_L" == $("#productcode").val()){
				if("01" == $('#input_identifytype'+insuredid).val()){
					showValidateResultNew(id, "请确认信息与身份证一致");
				}else{
					showValidateResultNew(id, "请确认信息与证件一致");
				}
			}else{
				if("01" == $('#input_identifytype'+insuredid).val()){
					showValidateResultBtm(id, "请确认信息与身份证一致");
				}else{
					showValidateResultBtm(id, "请确认信息与证件一致");
				}
			}			
			return false;
		}else{
			showValidateResultBtm(id, "");
			if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
				var classname = $('#' + id).attr("class");
				$('#' + id).attr("class",classname);
			}
			return true;
		}
	}
	showValidateResultBtm(id, "");
	if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
		var classname = $('#' + id).attr("class");
		$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}
//投吧人出生日期与身份证号效验
function checkApplyBirthdayForEAA(birthId,identifyId,typeId) {
	var minInsuredage=$("#MININSUREDAGE").val();
	var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	if($("#riskcode").val()!="LAY"){
		hideTipsNew(birthId);
	}
	//EDD生日格式转换
	var inputDateBefore = $('#' + birthId).val();
	if($("#riskcode").val() == "EDD" ){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + birthId).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + birthId).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + birthId).val(inputDate);
		}
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + birthId).val())) && $('#' + birthId).val() != '') {
		if("JTE_Y" == $("#productcode").val()||"ECR" == $("#productcode").val()){
			showValidateResultNew(birthId, "请输入正确的日期");
		}else{
			showValidateResultBtm(birthId, "请输入正确的日期");
		}
		if($("#riskcode").val() == "EDD" ){
			$('#' + birthId).val(inputDateBefore);
		}
		//$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#'+birthId).val());
	var riskcode = $("#riskcode").val();
	// if (riskcode == "EAJ" || riskcode == "EAK") {
	if (!chkBirthdayNewForEAA(minInsuredage,minInsuredageUnit, startdate, birthday)) {
			var tips= "年龄必须大于" ;
			tips = tips +  minInsuredage + "周岁";
			if("JTE_Y" == $("#productcode").val()||"ECR" == $("#productcode").val()){
				showValidateResultNew(birthId, tips);
			}else{
			showValidateResultBtm(birthId, tips);
			}
			return false;
	}	
	// 判断输入的出生日期是否与身份证一致
	if (($('#'+typeId).val() == "01" || $('#'+typeId).val() == "02" || $('#'+typeId).val() == "17" ) && $('#'+identifyId).val() != ""&& $('#'+identifyId).val() != "请输入证件号码") {
		var sId = $('#'+identifyId).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+birthId).val();
		if (sBirthday != birthday) {
			if("JTE_Y" == $("#productcode").val()){
				if("01" == $('#'+typeId).val()){
					showValidateResultNew(birthId, "请确认信息与身份证一致");
				}else{
					showValidateResultNew(birthId, "请确认信息与证件一致");
				}
			}else{
				if("01" == $('#'+typeId).val()){
					showValidateResultBtm(birthId, "请确认信息与身份证一致");
				}else{
					showValidateResultBtm(birthId, "请确认信息与证件一致");
				}
			
			}
			return false;
		}else{
			showValidateResultBtm(birthId, "");
			if($("#riskcode").val() == "EDD" && $('#' + birthId).attr("class")!=null){
				var classname = $('#' + birthId).attr("class");
				$('#' + birthId).attr("class",classname);
			}
			return true;
		}
	}
	showValidateResultBtm(birthId, "");
	if($("#riskcode").val() == "EDD" && $('#' + birthId).attr("class")!=null){
		var classname = $('#' + birthId).attr("class");
		$('#' + birthId).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}


// 限定被保险人年龄
function chkBirthday(topDate, bottomDate, startdate, birthday) {
	var _birthDate = new Date(birthday);
	if (isNaN(_birthDate)) {
		birthday = birthday.replace(/-/g, "/");
		_birthDate = new Date(birthday);
	}
	var _currentDate = new Date(startdate);
	// 允许最大年
	var tmpTopDate = new Date(getNextYearFullDate(_currentDate, -topDate));
	// 允许最小年
	var tmpBottomDate = new Date(getNextYearFullDate(_currentDate, -bottomDate));
	if (_birthDate <= tmpTopDate || _birthDate > tmpBottomDate) {
		return false;
	}
	return true;
}

//根据身份证号码验证性别
function checkIdentifyNumberSex(insuredid) {
	var id="input_insuredsex"+insuredid;
	if (($('#input_identifytype'+insuredid).val() == "01" || $('#input_identifytype'+insuredid).val() == "02" ||$('#input_identifytype'+insuredid).val() == "17")
			&& $('#input_identifyNumber'+insuredid).val() != ""
				&&$('#input_identifyNumber'+insuredid).val() != "请输入证件号码") {
		var identiyId = $("#input_identifyNumber"+insuredid).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sId = identiyId;
			var sSex = 1;
			if (sId.length == 15) {
				sSex = sId.substring(14, 15) % 2;
			} else if (sId.length == 18) {
				sSex = sId.substring(14, 17) % 2;
			}
			var sex = $("#input_insuredsex"+insuredid).val();// 性别 ;
			if (sSex == 0) {
				sSex = 2;
			}
			if (sSex != sex) {
				if("01" == $('#input_identifytype'+insuredid).val()){
					showValidateResultBtm(id, "请确认信息与身份证一致");
				}else{
					showValidateResultBtm(id, "请确认信息与证件一致");
				}
				
//				rollToPos("sexf");
				return false;
			} else {
				showValidateResultBtm(id, "");
				return true;
			}
		} else {
				if("EAL_L" == $("#productcode").val()){
					showValidateResultNew(id, "");
					if("01" != $('#input_identifytype'+insuredid).val() && "请输入正确的身份证号码" == msg){
						showValidateResultNew("input_identifyNumber"+insuredid, "请输入正确的证件号");
					}else{
						showValidateResultNew("input_identifyNumber"+insuredid, msg);
					}
					
				}else{
					showValidateResultBtm(id, "");
					if("01" != $('#input_identifytype'+insuredid).val() && "请输入正确的身份证号码" == msg){
						showValidateResultBtm("input_identifyNumber"+insuredid, "请输入正确的证件号");
					}else{
						showValidateResultBtm("input_identifyNumber"+insuredid, msg);
					}
				}
			
			return true;
		}
	}
	showValidateResultBtm(id, "");
	return true;
}
/***********发票寄送***********/
//发票收件人校验
function checkSendName(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultNew(id, "收件人姓名过长");
		return false;
	}
	if (($("#" + id).val()).match(reg5)) {// 放开对'-'和'()'的校验
		showValidateResultNew(id, "请填写正确的收件人姓名");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}

//街道详细信息
function checkSendAddress(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var specialStr = "['%;]|(<.*>)";
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultTextarea(id, "街道地址信息过长");
		return false;
	}
	if (($("#" + id).val()).match(specialStr)) {
		showValidateResultTextarea(id, "输入的信息含非法字符");
		return false;
	}
	showValidateResultTextarea(id, "");
	return true;
}

//邮编校验
function checkPostCode(id){
if($("#"+id).val()=="")
{
	return ;
}
if($("#"+id).val()!=""){
	var postcode = $("#"+id).val();
	if(postcode.length<6 ){
		if("BWSJ" == $("#productcode").val()){
			showValidateResultNew(id,'请输入正确的邮政编码!');
		}else{
			showValidateResultNew(id,'请填写正确的邮政编码');
		}
		return false;
	}
	var flag = true;
	for(var i=0;i<postcode.length;i++)
	{
	   var item = parseInt(postcode.charAt(i));
	   if(item<0 ||item>9 ||isNaN(item))
	   {	
	      	
	     flag = false;
	     break;
	   }
	}
	if(!flag){
		if("BWSJ" == $("#productcode").val()){
			showValidateResultNew(id,'请输入正确的邮政编码!');
		}else{
			showValidateResultNew(id,'请填写正确的邮政编码');
		}		
		return false;
	}
}
showValidateResultNew(id,'');
return true;
}

//发票抬头验证
function checkInvoiceTile(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultNew(id, "发票抬头过长");
		return false;
	}
//	if (($("#" + id).val()).match(reg5)) {// 放开对'-'和'()'的校验
//		showValidateResultNew(id, "请输入正确的发票抬头");
//		return false;
//	}
	showValidateResultNew(id, "");
	return true;
}
/********整体校验********/

function checkApply(){
	
	if($("#riskcode").val() == "LEF"||$("#riskcode").val() == "LXL"){
		if ($.trim($("#propertycityname").val()) == ""){
			rollToPos("propertycityname");
			showValidateResultNew("propertycityname", "财产地址不能为空");
			return false;
		}
		
		if ($.trim($("#input_houseaddress").val()) == "" || $.trim($("#input_houseaddress").val()) =="请精确到门牌号，请勿重复录入省市，省市内容如需修改，请返回修改房屋所在城市。"){
			rollToPos("input_houseaddress");
			if($("#riskcode").val() == "LXL"){
				showValidateResultTextarea("input_houseaddress", "街道地址信息不能为空");
			}else{
				showValidateResultTextarea("input_houseaddress", "财产详细地址不能为空");
			}
			return false;
		}
	}
	
	if($("#riskcode").val() == "JCA"){
		
		if ($.trim($("#input_houseaddress").val()) == "" || $.trim($("#input_houseaddress").val()) =="请精确到门牌号"){
			rollToPos("input_houseaddress");
			showValidateResultTextarea("input_houseaddress", "房屋详细地址不能为空");
			return false;
		}
	}
	if($("#productcode").val() == "ZFO"){
		if ($.trim($("#input_insuredaddress").val()) == ""){
			rollToPos("input_insuredaddress");
			showValidateResultBtm("input_insuredaddress", "家庭地址不能为空");
			return false;
		}
		if(!checkHouseAddress("input_insuredaddress")){
			rollToPos("input_insuredaddress");
			return false;
		}
	}
	
	if ($.trim($("#input_applyName").val()) == ""||$.trim($("#input_applyName").val())=="请输入投保人姓名" ||$.trim($("#input_applyName").val())=="请输入姓名" || $.trim($("#input_applyName").val())=="请输入投保人" || $.trim($("#input_applyName").val())=="例：李明/LIMING"){
		rollToPos("input_applyName");
		if("JBD_B"==$("#productcode").val()){
			showValidateResultNew("input_applyName", "请输入投保人姓名");
		}else if("JMA"==$("#productcode").val()){
			showValidateResultNew("input_applyName", "姓名不能为空");
		} else{
			showValidateResultNew("input_applyName", "投保人姓名不能为空");
		}
		
		return false;
	}
	
	if($("#riskcode").val() == "EAC"){
		if ($.trim($("#input_applyIndentifyType").val()) == ""){
			showValidateResultNew("input_applyIdentifyNumber", "请选择证件类型并填写证件号码");
			return false;
		}
	}
	if($("#riskcode").val() != "EAC" &&  $("#riskcode").val() != "JMA"){
		//国籍验证    applyIsResidentSelectSpan
		if ($.trim($("#input_applyCountryName").val()) == ""||$.trim($("#input_applyCountryCode").val()) == ""){
			rollToPos("input_applyCountryName");
			showValidateResultNew("input_applyCountryName", "投保人国家和地区不能为空");
			return false;
		}
	}
	
	if ($.trim($("#input_applyIdentifyNumber").val()) == ""||$.trim($("#input_applyIdentifyNumber").val()) == "请输入证件号码"){
		
		rollToPos("input_applyIdentifyNumber");
		if("JBD_B"==$("#productcode").val()){
			showValidateResultNew("input_applyIdentifyNumber", "请输入证件号码");
		}else if("EAC" == $("#riskcode").val()){
			showValidateResultNew("input_applyIdentifyNumber", "请输入证件号码");
		}else{
			showValidateResultNew("input_applyIdentifyNumber", "证件号码不能为空");
		}
		return false;
	}
	
	if($("#productcode").val() == "ZFO"){
		if ($.trim($("#input_applyBirthday").val()) == ""){
			rollToPos("input_applyBirthday");
			showValidateResultNew("input_applyBirthday", "出生日期不能为空");
			return false;
		}
		if(!checkApplyBirthday('input_applyBirthday','input_applyIdentifyNumber','input_applyIndentifyType')){
			rollToPos("input_applyBirthday");
			return false;
		}
	}
	
	if($("#riskcode").val() != "EAC" && $("#riskcode").val() != "JMA" && $("#ifflag").val() != "yes"&& $("#productcode").val() != "JTE_Y"){
		if("LDT_E"!=$("#productcode").val()&&($.trim($("#cityname").val()) == ""||$("#areacode").val()==""||$("#comcode").val()=="")){
			rollToPos("cityname");
			if("JCO" == $("#productcode").val()){
				showValidateResultNew("cityname", "房屋所在城市不能为空");
			}else{
				showValidateResultNew("cityname", "常住省市不能为空");
			}
			return false;
		}
	}
	
	if($("#riskcode").val() == "JMA"){
		if($.trim($("#cityname").val()) == "" || $.trim($("#areacode").val())==""){
			rollToPos("cityname");
			showValidateResultNew("cityname", "房屋所在城市不能为空");
			return false;
		}
		if( !$("#active").hasClass("active")){
			if("" == $.trim($("#certificates_end").val())){
				showValidateResultNew("active","请选择证件有效期");
				return false;
			}
		}
	}
	
	if ($.trim($("#input_applyMobile").val()) == ""||$("#input_applyMobile").val()=="例：13519854122"){
		rollToPos("input_applyMobile");
		showValidateResultNew("input_applyMobile", "手机号码不能为空");
		return false;
	}
	if (($.trim($("#input_applyEmail").val()) == "" && $("#riskcode").val() != "JMA") || $.trim($("#input_applyEmail").val()) == "例：ABC@sina.com"){
		rollToPos("input_applyEmail");
		showValidateResultNew("input_applyEmail", "邮箱地址不能为空");
		return false;
	}
	if($("#riskcode").val() == "LXL"){
		if(!checkHouseAddress("input_houseaddress")){
			rollToPos("input_houseaddress");
			return false;
		}
	}
	if($("#riskcode").val() == "JMA"){
		if(!checkspinner("spinner")){
			rollToPos("spinner");
			return false;
		}
		if(!checkHouseAddress("input_houseaddress")){
			rollToPos("input_houseaddress");
			return false;
		}
		if(!checkApplyNameJMA("input_applyName")){
			rollToPos("input_applyName");
			return false;
		}
		if(!checkage("input_applyAge")){
			rollToPos("input_applyAge");
			return false;
		}
		if(!checkApplyNumber("input_applyIdentifyNumber")){
			rollToPos("input_applyIdentifyNumber");
			return false;
		}
		if(!checkApplyMobile("input_applyMobile")){
			rollToPos("input_applyMobile");
			return false;
		}
		if(!checkAddress("address")){
			rollToPos("address");
			return false;
		}
		if(!checkApplyEmail("input_applyEmail")){
			rollToPos("input_applyEmail");
			return false;
		}
		
//		if(!checkHouseAddress("input_sendJAddress")){
//			rollToPos("input_sendJAddress");
//			return false;
//		}
//		if ($.trim($("#address").val()) == ""||$.trim($("#address").val()) == ""){
//			rollToPos("address");
//			showValidateResultNew("address", "您的地址录入有误");
//			return false;
//		}
//		
//		if (!checkApplyEmail("input_applyEmail")){
//			rollToPos("input_applyEmail");
//			return false;
//		}
//		if ($.trim($("#input_houseaddress").val()) == "" || $.trim($("#input_houseaddress").val()) =="请精确到门牌号"){
//			rollToPos("input_houseaddress");
//			showValidateResultTextarea("input_houseaddress", "保险保险标的地址不能为空");
//			return false;
//		}
		
	}
	
	if($("#riskcode").val() != "EAC"){
		if($("#eflag").val()=="010"||$("#eflag").val()=="100"||$("#eflag").val()=="120"|| $("#eflag").val()=="110" ||$("#isgrantvisa").val()=="1"){
			if ($.trim($("#input_sendName").val()) == ""){
				rollToPos("input_sendName");
				showValidateResultNew("input_sendName", "收件人姓名不能为空");
				return false;
			}
			
			if ($.trim($("#mailcityname").val()) == ""||$.trim($("#mailareacode").val()) == ""){
				rollToPos("mailcityname");
				showValidateResultNew("mailcityname", "邮件寄送省市不能为空");
				return false;
			}
			
			
			if ($.trim($("#input_sendJAddress").val()) == ""||$.trim($("#input_sendJAddress").val()) == "请精确到门牌号"){
				rollToPos("input_sendJAddress");
				showValidateResultTextarea("input_sendJAddress", "详细地址不能为空");
				return false;
			}
			
			if ($.trim($("#input_sendPost").val()) == ""){
				rollToPos("input_sendPost");
				showValidateResultNew("input_sendPost", "邮政编码不能为空");
				return false;
			}
			if ($.trim($("#input_sendMobile").val()) == ""){
				rollToPos("input_sendMobile");
				showValidateResultNew("input_sendMobile", "手机号码不能为空");
				return false;
			}
			if($("#eflag").val()!="100"){
				if ($.trim($("#input_invoiceTile").val()) == ""){
	//				$("#input_invoiceTile").focus();			
					rollToPos("input_invoiceTile");
					showValidateResultNew("input_invoiceTile", "发票抬头不能为空");
					return false;
				}
			}
			if(!checkSendAddress("input_sendJAddress")){
				rollToPos("input_sendJAddress");
				return false;
			}	
			if(!checkPostCode("input_sendPost")){// 邮政编码
				rollToPos("input_sendPost");
				return false;
			}
			if($("#oldproposalno").val()!=""){
				if(!checkApplyMobile("input_sendMobile")){// 手机号码
					rollToPos("input_sendMobile");
					return false;
				}
			}else{
				if(!checkApplyMobile("input_sendMobile")){// 手机号码
					rollToPos("input_sendMobile");
					return false;
				}
			}
			if(!checkSendName("input_sendName")){
				rollToPos("input_sendName");
				return false;
			}	
			//注释掉发票抬头验证
//			if($("#eflag").val()!="100"){
//				if(!checkInvoiceTile("input_invoiceTile")){
//					rollToPos("input_invoiceTile");
//					return false;
//				}	
//			}
			//电子发票，电子保单时需要填写发票抬头
			
		}else if($("#eflag").val()=="020"){
			if ($.trim($("#input_invoiceTile").val()) == ""){
				rollToPos("input_invoiceTile");
				showValidateResultNew("input_invoiceTile", "发票抬头不能为空");
				return false;
			}
//			if(!checkInvoiceTile("input_invoiceTile")){
//				rollToPos("input_invoiceTile");
//				return false;
//			}	
		}
		if(!checkApplyName("input_applyName")){
			rollToPos("input_applyName");
			return false;
		}
		if(!checkApplyIdentifyNumberSex()){
			rollToPos("input_applyName");
			return false;
		}
		
		if(!checkApplyNumber("input_applyIdentifyNumber")){
			rollToPos("input_applyIdentifyNumber");
			return false;
		}
		if($("#oldproposalno").val()!=""){
			if(!checkApplyMobile("input_applyMobile")){
				rollToPos("input_applyMobile");
				return false;
			}
		}else{
			if(!checkApplyMobile("input_applyMobile")){
				rollToPos("input_applyMobile");
				return false;
			}
		}
		if(!checkApplyEmail("input_applyEmail")){
			rollToPos("input_applyEmail");
			return false;
		}
		
		if($("input:radio[name=fp][checked]").val()=="1"||$("input:radio[name=fp][checked]").val()=="3"){
			if(!checkSendAddress("input_sendJAddress")){
				rollToPos("input_sendJAddress");
				return false;
			}	
			
			if(!checkSendName("input_sendName")){
				rollToPos("input_sendName");
				return false;
			}	
			//注释掉发票抬头验证
//			if(!checkInvoiceTile("input_invoiceTile")){
//				rollToPos("input_invoiceTile");
//				return false;
//			}	
		}	
	}
	
	return true;
}

function checkRelation() {
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
	var idno=lastTR.attr('id');
	if($("#productcode").val()=='JAB_A' || $("#productcode").val()=='JBD_B' || 'EAA'==$("#productcode").val()|| 'EDD_R'==$("#productcode").val()  || 'JTE_S'==$("#productcode").val()|| 'WAF_N'==$("#productcode").val()|| 'JBM_S' == $("#productcode").val()|| 'ZFO' == $("#productcode").val()){
		idno="";
	}
	if($("#productcode").val()=='JCA' ){
		idno="1";
	}
	if('EAL_L' == $("#productcode").val()){
		if(trsNum<1){
			idno="";
		}
	}
	var peoplecount=$('#peoplecount').val();
	if (peoplecount<=1) {// 单人的情况
		if ($('#relation').val() == "01") {// 如果是“本人”，则校验投、被保险人姓名、证件类型、证件号是否全部一致，不一致提示错误
			if ($('#productcode').val() == 'EJQ_H'
					|| $('#productcode').val() == 'EJQ_Z'|| $('#productcode').val() == 'LEF'
					|| $('#productcode').val() == 'EFFEFG'|| $('#productcode').val() == 'JAB_A'|| $('#productcode').val() == 'ZXF'
					|| $('#riskcode').val() == 'LAY' || 'YXL'==$("#productcode").val()|| 'ECK'==$("#productcode").val()
					|| 'YEHKM'==$("#productcode").val() || 'EAL_L'==$("#productcode").val() || 'JTE_S'==$("#productcode").val()
					|| 'WAF_N'==$("#productcode").val() || 'JBM_S' == $("#productcode").val()) {
				if ($('#input_insuredName'+idno).val() != $('#input_applyName').val()
						|| $('#input_applyIndentifyType').val() != $('#input_identifytype'+idno).val()
						|| $('#input_identifyNumber'+idno).val() != $('#input_applyIdentifyNumber').val()
				) {
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
				if('EAL_L'==$("#productcode").val() && $('#input_applySexmType').val() != $('#input_insuredSexmType'+idno).val()){
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
			}else if('ZFO' == $("#productcode").val()){
				if ($('#input_insuredName').val() != $('#input_applyName')
						.val()
						|| $('#input_applyIndentifyType').val() != $('#input_identifytype').val()
						|| $('#input_identifyNumber').val() != $('#input_applyIdentifyNumber').val()
						|| $('#input_insuredBirthday').val() != $('#input_applyBirthday').val()
						|| $('#input_insuredsex').val() != $('#input_applySexmType').val()) {
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
			} else if($('#productcode').val() == 'JCA'){
				if ($('#input_insuredName'+idno).val() != $('#input_applyName')
						.val()
						|| $('#input_applyIndentifyType').val() != $(
								'#input_identifytype'+idno).val()
						|| $('#input_identifyNumber'+idno).val() != $(
								'#input_applyIdentifyNumber').val()
						|| $('#input_insuredsex'+idno).val() != $(
								'#input_applySexmType').val()
						|| $('#input_insuredPhonenumber'+idno).val() != $(
								'#input_applyMobile').val()) {
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
			}else if('EAA'==$("#productcode").val()){
				if ($('#input_insuredName'+idno).val() != $('#input_applyName').val()
						|| $('#input_applyIndentifyType').val() != $('#input_identifytype'+idno).val()
						|| $('#input_identifyNumber'+idno).val() != $('#input_applyIdentifyNumber').val()
						|| $('#input_insuredSexmType').val()!=$('#input_applySexmType').val()	
				) {
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
			}else if($('#productcode').val() == 'JTE_Y'){
				if ($('#input_insuredName'+idno).val() != $('#input_applyName')
						.val()
						|| $('#input_applyIndentifyType').val() != $(
								'#input_identifytype'+idno).val()
						|| $('#input_identifyNumber'+idno).val() != $(
								'#input_applyIdentifyNumber').val()
						|| $('#input_insuredsex'+idno).val() != $(
								'#input_applySexmType').val()
						|| $('#input_insuredBirthday'+idno).val() != $(
								'#input_applyBirthday').val()) {
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
			}else if($('#productcode').val() == 'EDD_R'){
				if ($('#input_insuredName'+idno).val() != $('#input_applyName')
						.val()
						|| $('#input_applyIndentifyType').val() != $(
								'#input_identifytype'+idno).val()
						|| $('#input_identifyNumber'+idno).val() != $(
								'#input_applyIdentifyNumber').val()
						|| $('#input_insuredBirthday'+idno).val() != $(
								'#input_applyBirthday').val()) {
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
			}else {
				if ($('#input_insuredName'+idno).val() != $('#input_applyName')
						.val()
						|| $('#input_applyIndentifyType').val() != $(
								'#input_identifytype'+idno).val()
						|| $('#input_identifyNumber'+idno).val() != $(
								'#input_applyIdentifyNumber').val()
						|| $('#input_insuredsex'+idno).val() != $(
								'#input_applySexmType').val()) {
					rollToPos("relationSpan");
					hideTips("relation");
					showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
					return false;
				}
			}
		} else {// 如果不是“本人”，则校验证件类型与证件号若一致，则提示错误
			if ($('#input_applyIndentifyType').val() == $('#input_identifytype'+idno).val()
					&& $('#input_identifyNumber'+idno).val() == $('#input_applyIdentifyNumber').val()) {
				rollToPos("relationSpan");
				hideTips("relation");
				showValidateResultNew("relationSpan", "您填写的被保险人与投保人的证件信息一致，两者的关系应为本人，请您修改。");
				return false;
			}
		}

	} else {//多人情况
		if($('#relation').val()=="01"||$('#relation').val()=="10"){
			rollToPos("relationSpan");
			hideTips("relation");
			showValidateResultNew("relationSpan", "投保人关系填写错误");
			return false;
		}
	}
	if($('#productcode').val() == 'JCA'){
		hideTipsNew('relationSpan');
	}
	showValidateResultNew("relationSpan", "");
	return true;
}

function checkRelationSingle() {
	if ($('#relation').val() == "01") {// 如果是“本人”，则校验投、被保险人姓名、证件类型、证件号是否全部一致，不一致提示错误
		if("JCO" == $("#productcode").val()||"ECR" == $("#productcode").val()){
			if ($('#input_insuredName').val() != $('#input_applyName').val()
					|| $('#input_applyIndentifyType').val() != $('#input_identifytype').val()
					|| $('#input_identifyNumber').val() != $('#input_applyIdentifyNumber').val()
					) {
				rollToPos("relationSpan");
				hideTips("relation");
				showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
				return false;
			}
			
		}else{
			if ($('#prpzinsured_insuredname').val() != $('#input_applyName').val()
					|| $('#input_applyIndentifyType').val() != $('#prpzinsured_identifytype').val()
					|| $('#prpzinsured_identifynumber').val() != $('#input_applyIdentifyNumber').val()
					|| $('#prpzinsured_sex').val() != $('#input_applySexmType').val()) {
				rollToPos("relationSpan");
				hideTips("relation");
				showValidateResultNew("relationSpan", "投保人与被保险人关系为本人时所填信息需一致");
				return false;
			}
			
		}
	} else {// 如果不是“本人”，则校验证件类型与证件号若一致，则提示错误
		if("JCO" == $("#productcode").val()||"ECR" == $("#productcode").val()){
			if ($('#input_applyIndentifyType').val() == $('#input_identifytype').val()
					&& $('#input_identifyNumber').val() == $('#input_applyIdentifyNumber').val()) {
				rollToPos("relationSpan");
				hideTips("relation");
				showValidateResultNew("relationSpan", "您填写的被保险人与投保人的证件信息一致，两者的关系应为本人，请您修改。");
				return false;
			}
		}else{
			if ($('#input_applyIndentifyType').val() == $('#prpzinsured_identifytype').val()
					&& $('#prpzinsured_identifynumber').val() == $('#input_applyIdentifyNumber').val()) {
				rollToPos("relationSpan");
				hideTips("relation");
				showValidateResultNew("relationSpan", "您填写的被保险人与投保人的证件信息一致，两者的关系应为本人，请您修改。");
				return false;
			}
		}

	}
	return true;
}

function checkInsuredEJQZ(){
	//判断最后一条是否有效
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;	
	if(trsNum<=0){
		showTipsWindown("请输入被保险人信息");
		return false;
	}
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
	if(lastTR.attr("flag") =="0"){
		var insuredid=lastTR.attr("id");
		if(",YXL,ECK,EJQ_H".indexOf($("#productcode").val())>-1){
			if ($.trim($("#input_insuredName"+insuredid).val()) == "" || $.trim($("#input_insuredName"+insuredid).val()) == "请输入被保险人姓名" || $.trim($("#input_insuredName"+insuredid).val()) == "例：李明/LIMING"){
				showValidateResultBtm("input_insuredName"+insuredid, "被保险人姓名不能为空");
				rollToPos("input_insuredName"+insuredid);
				return false;
			}
		}else{
			if ($.trim($("#input_insuredName"+insuredid).val()) == "" || $.trim($("#input_insuredName"+insuredid).val()) == "请输入被保险人姓名" ){
				showValidateResultBtm("input_insuredName"+insuredid, "被保险人姓名不能为空");
				rollToPos("input_insuredName"+insuredid);
				return false;
			}
		}
		if ($.trim($("#input_identifyNumber"+insuredid).val()) == ""||$.trim($("#input_identifyNumber"+insuredid).val()) == "请输入证件号码"){
			showValidateResultBtm("input_identifyNumber"+insuredid, "证件号码不能为空");
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if ($.trim($("#input_insuredBirthday"+insuredid).val()) == ""){
			showValidateResultBtm("input_insuredBirthday"+insuredid, "被保险人出生日期不能为空");
			rollToPos("input_insuredBirthday"+insuredid);
			return false;
		}
		if(!checkInsuredName("input_insuredName"+insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkInsuredBirthday(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkIdentifyNumber(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if($("#peoplecount").val()==0){
			$("#peoplecount").val("1");
		}
	}
	
	return true;
}


function checkInsuredEAKX(){
	//判断最后一条是否有效
	var trsNum = $('#insertInsuredJSP>tbody>tr').length;	
	if(trsNum<=0){
		showTipsWindown("请输入被保险人信息");
		return false;
	}
	var lastTR = $("#insertInsuredJSP>tbody").find("tr:eq("+(trsNum-1)+")");
	if(lastTR.attr("flag") =="0"){
		var insuredid=lastTR.attr("id");
		if ($.trim($("#input_insuredName"+insuredid).val()) == "" || $.trim($("#input_insuredName"+insuredid).val()) == "请输入被保险人姓名" ){
			showValidateResultBtm("input_insuredName"+insuredid, "被保险人姓名不能为空");
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if ($.trim($("#input_identifyNumber"+insuredid).val()) == ""||$.trim($("#input_identifyNumber"+insuredid).val()) == "请输入证件号码"){
			showValidateResultBtm("input_identifyNumber"+insuredid, "证件号码不能为空");
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if ($.trim($("#input_insuredBirthday"+insuredid).val()) == ""){
			showValidateResultBtm("input_insuredBirthday"+insuredid, "被保险人出生日期不能为空");
			rollToPos("input_insuredBirthday"+insuredid);
			return false;
		}
		if(!checkInsuredName("input_insuredName"+insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkInsuredBirthday(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkIdentifyNumber(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkIdentifyNumberSex(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if($("#peoplecount").val()==0){
			$("#peoplecount").val("1");
		}
	}

	return true;
}
function checkInsuredJCA(){
		var insuredid='1';
		if ($.trim($("#input_insuredName"+insuredid).val()) == "" || $.trim($("#input_insuredName"+insuredid).val()) == "请输入被保险人姓名" ){
			showValidateResultBtm("input_insuredName"+insuredid, "被保险人姓名不能为空");
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if ($.trim($("#input_identifyNumber"+insuredid).val()) == ""||$.trim($("#input_identifyNumber"+insuredid).val()) == "请输入证件号码"){
			showValidateResultBtm("input_identifyNumber"+insuredid, "证件号码不能为空");
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if ($.trim($("#input_insuredBirthday"+insuredid).val()) == ""){
			showValidateResultBtm("input_insuredBirthday"+insuredid, "被保险人出生日期不能为空");
			rollToPos("input_insuredBirthday"+insuredid);
			return false;
		}
		if($.trim($("#input_insuredPhonenumber"+insuredid).val()) == ""){
			showValidateResultBtm("input_insuredPhonenumber"+insuredid, "被保险人手机号码不能为空");
			rollToPos("input_insuredPhonenumber"+insuredid);
			return false;
		}
		if(!checkInsuredName("input_insuredName"+insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkInsuredBirthday(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkIdentifyNumber(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkIdentifyNumberSex(insuredid)){
			rollToPos("input_insuredName"+insuredid);
			return false;
		}
		if(!checkInsuredMobile("input_insuredPhonenumber"+insuredid)){
			rollToPos("input_insuredPhonenumber"+insuredid);
			return false;
		}
		if($("#peoplecount").val()==0){
			$("#peoplecount").val("1");
		}

	return true;
}
/***************************************info页面结束************************/

/***************************************通用方法开始*************************/
function pcbytes(str) {
	if (typeof (str) != 'string') {
		str = str.value;
	}
	var len = 0;
	for ( var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 127) {
			len++;
		}
		len++;
	}
	return len;
}

// 身份证校验
function isCardID(idcard){
	var Errors=new Array(
	"true",
	"请输入正确的身份证号码",
	"请输入正确的身份证号码",
	"请输入正确的身份证号码",
	"请输入正确的身份证号码"
	);
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var retflag=false;
	var idcard,Y,JYM;
	var S,M;
	var idcard_array = new Array();
	idcard=idcard.toUpperCase();
	idcard_array = idcard.split("");
	// 地区检验
	if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4];
	// 身份号码位数及格式检验
	switch(idcard.length){
	case 15:
	if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 
	100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
	ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
	} else {
	ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
	}
	if(ereg.test(idcard)) 
	return Errors[0];
	else 
	{
	 return Errors[2];
	}
	break;
	case 18:
	// 18位身份号码检测
	// 出生日期的合法性检查
	// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
	// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
	if ( parseInt(idcard.substr(6,4)) %400 == 0 || (parseInt(idcard.substr(6,4)) % 100 != 0 && 
	parseInt(idcard.substr(6,4))%4 == 0 )){
	ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
	// 闰年出生日期的合法性正则表达式
	} else {
	ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
	// 平年出生日期的合法性正则表达式
	}
	if(ereg.test(idcard)){// 测试出生日期的合法性
	// 计算校验位
	S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
	+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
	+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
	+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
	+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
	+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
	+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
	+ parseInt(idcard_array[7]) * 1 
	+ parseInt(idcard_array[8]) * 6
	+ parseInt(idcard_array[9]) * 3 ;
	Y = S % 11;
	M = "F";
	JYM = "10X98765432";
	M = JYM.substr(Y,1);// 判断校验位
	if(M == idcard_array[17]) return Errors[0]; // 检测ID的校验位
	else return Errors[3];
	}
	else return Errors[2];
	break;
	default:
	return Errors[1];
	break;
	}
}

//当输入起始时间或者结束时间后自动那个判断是否在182天内
function checkDayBetween() {
	var dayBetween1 = getDayBetweenNew() ;
	var defaultdate = $('#defaultdate').val();
	var maxRiskperiod = $('#MAXRISKPERIOD').val();
	var minRiskperiod = $('#MINRISKPERIOD').val();
	if(minRiskperiod != "" && maxRiskperiod != ""){
		if (dayBetween1 > maxRiskperiod) {
			$("#_my97DP").hide();
			var tips="尊敬的客户，本产品保障期间为"+minRiskperiod+"-"+maxRiskperiod+"天，请您在期间内进行选择。";
			showTipsWindown(tips);
			$('#startdate').val(defaultdate);
			$('#enddate').val(defaultdate);
			calculateFee();
			return false;
		}else{
			$("#allDay").text(dayBetween1);
		}
	}
	return true;
}

function checkDayBetweenPB() {
	var dayBetween1 = getDayBetweenNew() ;
	var defaultdate = $('#defaultdate').val();
	var maxRiskperiod = $('#MAXRISKPERIOD').val();
	var minRiskperiod = $('#MINRISKPERIOD').val();
	if(minRiskperiod != "" && maxRiskperiod != ""){
		if (dayBetween1 > maxRiskperiod) {
			$("#_my97DP").hide();
			var tips="尊敬的客户，本产品保障期间为"+minRiskperiod+"-"+maxRiskperiod+"天，请您在期间内进行选择。";
			showTipsWindown(tips);
			$('#startdate').val(defaultdate);
			$('#enddate').val(defaultdate);
			calculateFee();
			return false;
		}else{
			$("#allDay").text(dayBetween1);
		}
	}
	return true;
}
//得到起始日期与终止日期的时间差
function getDayBetweenNew() {
	if ($('#enddate').val() == "") {
		if($('#productcode').val()=="EAK_G")
			showTipsWindown("请输入结束日期");
		$('#enddate').val($('#startdate').val());
	}
	if ($('#startdate').val() == "") {
		return false;
	}
	var sDate = $('#startdate').val().split("/");
	var startDate = new Date(sDate[0], sDate[1] - 1, sDate[2]);
	var eDate = $('#enddate').val().split("/");
	var endDate = new Date(eDate[0], eDate[1] - 1, eDate[2]);
	if (endDate < startDate) {
		$('#enddate').val($('#startdate').val());
		endDate = startDate;
	}
	return parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24) + 1;

}

//若未登录，但暂存表中有会员编号，提示登录；如登录会员编号与暂存表中会员编号不一致，提示重新登录
	function checkEntryId(processbar) {
	var productcode = $("#productcode").val();
	var couponvalidate = false;//是否可以使用优惠券
	if($("#interimNoflag").val() == "1"){//是从暂存流程进来的  如果entryId没有值  谈登陆框
		if ($("#entryId").val() == "") {
			// 弹出登录注册层
			changeLogin();
			$("#userName").val($("#zentryId").val());
			$("#userName").attr("readOnly", true);
			$("#userName").attr("style","color:#808080");
			if (processbar == "Input") {
				// 页面右侧保费应显示为原价，重新计算保费
//				calculateFee();
			}
			$("#zancunFlag").val("0");
		}
	}
	if ($("#zentryId").val() != "") {
		if ($("#entryId").val() != $("#zentryId").val()) {
			if ($("#entryId").val() != "") {
				exitSSO();
			}else{
				// 弹出登录注册层
				changeLogin();
				$("#userName").val($("#zentryId").val());
				$("#userName").attr("readOnly", true);
				$("#userName").attr("style","color:#808080");
				if (processbar == "Input") {
					// 页面右侧保费应显示为原价，重新计算保费
//					calculateFee();
				}
				$("#zancunFlag").val("0");
			}
		}else{
			if(processbar == "Intro"||processbar == "Continue"||processbar == "Calc"){
				checkStartDateForInterim('y');
			}
			//优惠券
			if(processbar == "Calc"&&"EJQ_Z"==productcode
					||processbar == "Calc"&&"EAK_X"==productcode
					||processbar == "Calc"&&"EAK_G"==productcode){
					couponvalidate = true;
			}
			if(couponvalidate){
			    if($("#couponcode").val()==""){
			    	checkPCoupon();
			    }else if($("#couponcode").val()!=""){
			    	$("#PCoupon_Ck").show();
			    	$("#msg_msg").html("(每次支付只能使用一张优惠券)");
			    	$("#CouponV").addClass("active");
			    	checkPCouponBack();
			    }
			}
		}
	}
}

/**************从个人中心继续投保,若已过暂存单的生效日期,跳转到intro页面,页面加载时校验是否已过生效日期********************/
function checkStartDateForInterim(showTips){
	//对日期的校验
	 var now = new Date();
	 var productCode = $("#productcode").val();
	 var  tomo;
	 if("LAY_N"==productCode||"LAY_G"==productCode||"LAY_A"==productCode||"LAY_J"==productCode){
	 	var t4flag = $("#t4flag").val();
	 	if(t4flag=="1"){
			tomo = new   Date((now/1000+86400*4)*1000);
	 	}else if(t4flag == "0"){
			tomo = new   Date((now/1000+86400*1)*1000);
	 	}
	 }else{ 
	 	    tomo = new   Date((now/1000+86400*1)*1000);
	 }
	 var year = tomo.getFullYear();
	 var month = tomo.getMonth()+1;
	 var date = tomo.getDate();
	 month = (month<10)?"0"+month:month;
	 date = (date<10)?"0"+date:date;
	 var tomorrow = year+"/"+month+"/"+date;
	
	 // 对起保日期的校验
	 var sDate = $('#startdate').val();
	 if(sDate<tomorrow){
		 if(showTips == "y"){
		 	if("LAY_N"==productCode||"LAY_G"==productCode||"LAY_A"==productCode||"LAY_J"==productCode){
				 showTipsWindown("保障起始日期已变化，请确认投保信息。");
		 	}else{
				 showTipsWindown("您的暂存单起保日期已过期，目前已经将起保日期调整为最早可生效日期！");
		 	}
		 }
		
		$('#startdate').val(tomorrow);
		//在输入域输入格式错误的时间，失去焦点时校验时间，并赋默认值，B版本默认值是暂存表的值，需要重新给默认值赋值-hhj
		if("EAK_G"==productCode){
			$('#defaultdate').val(tomorrow);
		}
		//航意险，需要设置结束日期
		if("EJQ_H"==productCode){
			showEndDate('startdate');
		}
		if("LAY_N"==productCode||"LAY_G"==productCode||"LAY_A"==productCode||"LAY_J"==productCode){
			var days = 1;			
			var eDate = $('#startdate').val();
			var endDate = new Date(eDate);
		}else{
			//获取起保时间与明天的时间差
			var differ = (new Date(tomorrow)).getTime() - (new Date(sDate)).getTime();
			var days = Math.floor(differ/(24*3600*1000));
			var eDate = $('#enddate').val();
			var endDate = new Date(eDate);
		}
		//设置终保日期
		endDate.setDate(endDate.getDate()+days);
		$('#enddate').val(endDate.getFullYear()+"/"+((endDate.getMonth()+1)<10?"0"+(endDate.getMonth()+1):(endDate.getMonth()+1))+"/"+(endDate.getDate()<10?"0"+endDate.getDate():endDate.getDate()));
	}
}

function checkPost(){
	//电子发票不开保单
	if($('#eflag').val()=='000'){
		if($.trim($("#input_sendJAddress").val()) != ""&&!checkSendAddress("input_sendJAddress")){
			$("#input_sendJAddress").val("");
		}	
		if($.trim($("#input_sendPost").val()) != ""&&!checkPostCode("input_sendPost")){// 邮政编码
			$("#input_sendPost").val("");
		}
		if($.trim($("#input_sendMobile").val()) != ""&&!checkApplyMobile("input_sendMobile")){// 手机号码
			$("#input_sendMobile").val("");
		}
		if($.trim($("#input_sendName").val()) != ""&&!checkSendName("input_sendName")){
			$("#input_sendName").val("");
		}	
		if($.trim($("#input_invoiceTile").val()) != ""&&!checkInvoiceTile("input_invoiceTile")){
			$("#input_invoiceTile").val("");
		}	
	}
	//电子发票电子保单
	if($('#eflag').val()=='020'){
		if($.trim($("#input_sendJAddress").val()) != ""&&!checkSendAddress("input_sendJAddress")){
			$("#input_sendJAddress").val("");
		}	
		if($.trim($("#input_sendPost").val()) != ""&&!checkPostCode("input_sendPost")){// 邮政编码
			$("#input_sendPost").val("");
		}
		if($.trim($("#input_sendMobile").val()) != ""&&!checkApplyMobile("input_sendMobile")){// 手机号码
			$("#input_sendMobile").val("");
		}
		if($.trim($("#input_sendName").val()) != ""&&!checkSendName("input_sendName")){
			$("#input_sendName").val("");
		}
	}
	if($.trim($("#input_sendJAddress").val()) == "请精确到门牌号"){
		$("#input_sendJAddress").val("");
	}
	
}

function clearApplyMoblie(){
	//针对续保，用户点击带*的电话，则直接清空由用户进行修改
	var oldOrderId = $("#oldorderid").val();
	if(($("#oldproposalno").val()!="" || ""!=oldOrderId) && ($("#iswebservice").val()==''||$("#iswebservice").val().substring(0,1)=='0')){
		$("#input_applyMobile").val("");
		//$("#applyMobile").val("");
	}
	//设置修改电话的标识位
	if($("#oldproposalno").val()!="" || ""!=oldOrderId){
		setIswebservice("applyMobile");
	}
}

function clearSendMobile(){
	var oldOrderId=$("#oldorderid").val();
	if((""!=$("#oldproposalno").val() || ""!=oldOrderId) && ($("#iswebservice").val()==''||$("#iswebservice").val().substring(1,2)=='0')){
		$("#input_sendMobile").val("");
		//$("#postmobile").val("");
	}
	//设置修改电话的标识位
	if(""!=$("#oldproposalno").val() || ""!=oldOrderId){
		setIswebservice("sendMobile");
	}
}

function setIswebservice(str)
{
	var iswebservice = $("#iswebservice").val();
	if(iswebservice!=""){//已经有值
		var otherflag = "";
		if(str=="applyMobile"){
			otherflag = iswebservice.substring(1,2);
			$("#iswebservice").val("1"+otherflag);
		}else if(str=="sendMobile"){
			otherflag = iswebservice.substring(0,1);
			$("#iswebservice").val(otherflag+"1");
		}
	}else{//空，没有值，初次赋值
		if(str=="applyMobile"){
			$("#iswebservice").val("10");
		}else if(str=="sendMobile"){
			$("#iswebservice").val("01");
		}
	}
//	alert("iswebservice="+$("#iswebservice").val());
}

/***************************************通用方法结束*************************/

/**************************北美游校验方法开始*************************/
function checkHtotellocation(no){
	var id="hotellocation" + no;
	$("#hotellocation" + no).val(($("#hotellocation" + no).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if (pcbytes($("#hotellocation" + no).val()) > 80) {
		showValidateResult(id, "酒店名称太长，请重新填写");
		return false;
	}
	if (($("#" + id).val()).match(reg5)) {
		showValidateResult(id, "请填写正确的收件人姓名");
		return false;
	}
	showValidateResult(id, "");
	return true;
}

//保存航班信息校验
function saveFlightCheck(serialno){
	if($("#flightno"+serialno).val()==""){
		showValidateResultBtm("flightno"+serialno, "航班号不能为空");
		return false;
	}
	if($("#home"+serialno).val()==""){
		showValidateResultBtm("home"+serialno, "航班出发地不能为空");
		return false;
	}
	if($("#departdate"+serialno).val()==""){
		showValidateResultBtm("departdate"+serialno, "预计出发日期不能为空");
		return false;
	}
	if(!checkFlightno("flightno"+serialno)){
		return false;
	}
	//如果为海南游，出发地允许包含空格 现在改为支持所有产品
		if(!checkFlightDepartCityForHaiNan("home"+serialno)){
			return false;
		}
	
	if(!checkDepartdate("departdate"+serialno)){
		return false;
	}
	return true;
}

//航班信息校验 
function saveModifyFlightCheck(){
	if($("#modify_flightno").val()==""){
		showValidateResultNew("modify_flightno", "航班号不能为空");
		return false;
	}
	if($("#modify_departcity").val()==""){
		showValidateResultNew("modify_departcity", "航班出发地不能为空");
		return false;
	}
	if($("#modify_departdate").val()==""){
		showValidateResultNew("modify_departdate", "预计出发日期不能为空");
		return false;
	}
	if(!checkFlightnoModify("modify_flightno")){
		return false;
	}
	if($("#productcode").val() == "LAY_H"){
		if(!checkFlightDepartCityModifyForHaiNan("modify_departcity")){
			return false;
		}
	}else{
		if(!checkFlightDepartCityModify("modify_departcity")){
			return false;
		}
	}
	
	if(!checkDepartdateModify("modify_departdate")){
		return false;
	}
	return true;
}

function saveHotelCheck(serialno){
	if($("#hotellocation"+serialno).val()==""){
		showValidateResultBtm("hotellocation"+serialno, "入住城市不能为空");
		return false;
	}
	if($("#hotelname"+serialno).val()==""){
		showValidateResultBtm("hotelname"+serialno, "酒店名称不能为空");
		return false;
	}
	if($("#checkindate"+serialno).val()==""){
		showValidateResultBtm("checkindate"+serialno, "入住日期不能为空");
		return false;
	}
	if($("#checkoutdate"+serialno).val()==""){
		showValidateResultBtm("checkoutdate"+serialno, "离店日期不能为空");
		return false;
	}
	if(!checkHotellocation("hotellocation"+serialno)){
		return false;
	}
	if(!checkHotelname("hotelname"+serialno)){
		return false;
	}
	if(!checkCheckindate(serialno)){
		return false;
	}
	if(!checkCheckoutdate(serialno)){
		return false;
	}
	return true;
}

function saveModifyHotelCheck(){
	if($("#modify_hotellocation").val()==""){
		showValidateResultNew("modify_hotellocation", "入住城市不能为空");
		return false;
	}
	if($("#modify_hotelname").val()==""){
		showValidateResultNew("modify_hotelname", "酒店名称不能为空");
		return false;
	}
	if($("#modify_checkindate").val()==""){
		showValidateResultNew("modify_checkindate", "入住日期不能为空");
		return false;
	}
	if($("#modify_checkoutdate").val()==""){
		showValidateResultNew("modify_checkoutdate", "离店日期不能为空");
		return false;
	}
	if(!checkHotellocationModify("modify_hotellocation")){
		return false;
	}
	if(!checkHotelnameModify("modify_hotelname")){
		return false;
	}
	if(!checkCheckindateModify()){
		return false;
	}
	if(!checkCheckoutdateModify()){
		return false;
	}
	return true;
}

//航班号码校验
function checkFlightno(id){
	var flightno=$("#"+id).val();
	if(pcbytes(flightno) > 10){
		showValidateResultBtm(id, "航班号太长，请重新填写");
		return false;
	}
	if(!(flightno).match(flightReg)&&flightno!=""){
		showValidateResultBtm(id, "航班号为数字或字母");
		return false;
	}
	showValidateResultBtm(id, "");
	return true;
}

function checkFlightnoModify(id){
	var flightno=$("#"+id).val();
	if(pcbytes(flightno) > 10){
		showValidateResultNew(id, "航班号太长，请重新填写");
		return false;
	}
	if(!(flightno).match(flightReg)&&flightno!=""){
		showValidateResultNew(id, "航班号为数字或字母");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}

//航班出发地校验
function checkFlightDepartCity(id){
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var home=$("#"+id).val();
	if(pcbytes(home) > 80){
		showValidateResultBtm(id, "航班出发地太长，请重新填写");
		return false;
	}
	if(!(home).match(flightDepartCityReg)&&home!=""){
		showValidateResultBtm(id, "请输入正确的航班出发地");
		return false;
	}
	showValidateResultBtm(id, "");
	return true;
}
/**
 * @description 航班出发地校验
 * @param id
 * @returns {Boolean}
 */
function checkFlightDepartCityForHaiNan(id){
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var home=$("#"+id).val();
	if(pcbytes(home) > 80){
		showValidateResultBtm(id, "航班出发地太长，请重新填写");
		return false;
	}
	if(!(home).match(flightDepartCityRegForHaiNan)&&home!=""){
		showValidateResultBtm(id, "请输入正确的航班出发地");
		return false;
	}
	showValidateResultBtm(id, "");
	return true;
}
function checkFlightDepartCityModify(id){
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var home=$("#"+id).val();
	if(pcbytes(home) > 80){
		showValidateResultNew(id, "航班出发地太长，请重新填写");
		return false;
	}
	if(!(home).match(flightDepartCityRegForHaiNan)&&home!=""){
		showValidateResultNew(id, "请输入正确的航班出发地");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}
/**
 * @description 海南游 修改航班信息模块 验证航班出发地 
 * @param id
 * @returns {Boolean}
 */
function checkFlightDepartCityModifyForHaiNan(id){
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var home=$("#"+id).val();
	if(pcbytes(home) > 80){
		showValidateResultNew(id, "航班出发地太长，请重新填写");
		return false;
	}
	if(!(home).match(flightDepartCityRegForHaiNan)&&home!=""){
		showValidateResultNew(id, "请输入正确的航班出发地");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}
//航班出发日期校验
function checkDepartdate(id){
	var inputDate =$("#"+id).val();
	var startdate = $('#startdate').val();
	var enddate = $('#enddate').val();
	if (!(regexStr.test(inputDate))) {
		$("#_my97DP").hide();
		showValidateResultBtm(id,"请输入正确的日期");
		$('#'+id).val(defaultdate);
		return false;
	}
	if (inputDate < startdate) {
		$("#_my97DP").hide();
		showValidateResultBtm(id,"预计出发日期不在保障日期范围内");
		return false;
	}
	if (inputDate > enddate) {
		$("#_my97DP").hide();
		showValidateResultBtm(id,"预计出发日期不在保障日期范围内");
		return false;
	}
	showValidateResultBtm(id,"");
	return true;
}

function checkDepartdateModify(id){
	var inputDate =$("#"+id).val();
	var startdate = $('#startdate').val();
	var enddate = $('#enddate').val();
	if (!(regexStr.test(inputDate))) {
		$("#_my97DP").hide();
		showValidateResultNew(id,"请输入正确的日期");
		$('#'+id).val(defaultdate);
		return false;
	}
	if (inputDate < startdate) {
		$("#_my97DP").hide();
		showValidateResultNew(id,"预计出发日期不在保障日期范围内");
		return false;
	}
	if (inputDate > enddate) {
		$("#_my97DP").hide();
		showValidateResultNew(id,"预计出发日期不在保障日期范围内");
		return false;
	}
	showValidateResultNew(id,"");
	return true;
}

//酒店所在地校验
function checkHotellocation(id){
	var hotellocation=$("#"+id).val();
	if(pcbytes(hotellocation) > 80){
		showValidateResultBtm(id, "入住城市太长，请重新输入");
		return false;
	}
	if(!(hotellocation).match(hotellocationReg)&&hotellocation!=""){
		showValidateResultBtm(id, "请输入正确的城市名称");
		return false;
	}
	showValidateResultBtm(id, "");
	return true;
}

function checkHotellocationModify(id){
	var hotellocation=$("#"+id).val();
	if(pcbytes(hotellocation) > 80){
		showValidateResultNew(id, "入住城市太长，请重新输入");
		return false;
	}
	if(!(hotellocation).match(hotellocationReg)&&hotellocation!=""){
		showValidateResultNew(id, "请输入正确的城市名称");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}

//酒店所在地校验
function checkHotelname(id){
	var hotelname=$("#"+id).val();
	if(pcbytes(hotelname) > 80){
		showValidateResultBtm(id, "酒店名称太长，请重新输入");
		return false;
	}
	if(!(hotelname).match(hotellocationReg)&&hotelname!=""){
		showValidateResultBtm(id, "请输入正确的酒店名称");
		return false;
	}
	showValidateResultBtm(id, "");
	return true;
}

function checkHotelnameModify(id){
	var hotelname=$("#"+id).val();
	if(pcbytes(hotelname) > 80){
		showValidateResultNew(id, "酒店名称太长，请重新输入");
		return false;
	}
	if(!(hotelname).match(hotellocationReg)&&hotelname!=""){
		showValidateResultNew(id, "请输入正确的酒店名称");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}

//入住日期校验
function checkCheckindate(serialno){
	var id="checkindate"+serialno;
	var inputDate =$("#"+id).val();
	var startdate = $('#startdate').val();
	var enddate = $('#enddate').val();
	if (!(regexStr.test(inputDate))) {
		$("#_my97DP").hide();
		showValidateResultBtm(id,"请输入正确的入住日期");
		$('#'+id).val("");
		return false;
	}
	if (inputDate < startdate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultBtm(id,"入住日期不在保障日期范围内");
		return false;
	}
	if (inputDate > enddate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultBtm(id,"入住日期不在保障日期范围内");
		return false;
	}
	if($("#checkoutdate"+serialno).val()!=""){
		checkCheckoutdate(serialno);
	}
	showValidateResultBtm(id,"");
	return true;
}

function checkCheckindateModify(){
	var id="modify_checkindate";
	var inputDate =$("#"+id).val();
	var startdate = $('#startdate').val();
	var enddate = $('#enddate').val();
	if (!(regexStr.test(inputDate))) {
		$("#_my97DP").hide();
		showValidateResultNew(id,"请输入正确的入住日期");
		$('#'+id).val("");
		return false;
	}
	if (inputDate < startdate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultNew(id,"入住日期不在保障日期范围内");
		return false;
	}
	if (inputDate > enddate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultNew(id,"入住日期不在保障日期范围内");
		return false;
	}
	if($("#modify_checkoutdate").val()!=""){
		checkCheckoutdateModify();
	}
	showValidateResultNew(id,"");
	return true;
}

//离店日期校验
function checkCheckoutdate(serialno){
	var id="checkoutdate"+serialno;
	var inputDate =$("#"+id).val();
	var checkindate =$("#checkindate"+serialno).val();
	var startdate = $('#startdate').val();
	var enddate = $('#enddate').val();
	if (!(regexStr.test(inputDate))) {
		$("#_my97DP").hide();
		showValidateResultBtm(id,"请输入正确的离店日期");
		$('#'+id).val("");
		return false;
	}
	if (inputDate < startdate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultBtm(id,"离店日期不在保障日期范围内");
		return false;
	}
	if (inputDate == checkindate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultBtm(id,"入住日期与离店日期不可为同一天");
		return false;
	}
	if (inputDate < checkindate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultBtm(id,"离店日期不在保障日期范围内");
		return false;
	}
	if (inputDate > enddate) {
		$("#_my97DP").hide();
		showValidateResultBtm(id,"离店日期不在保障日期范围内");
		return false;
	}
	showValidateResultBtm(id,"");
	return true;
}

function checkCheckoutdateModify(){
	var id="modify_checkoutdate";
	var inputDate =$("#"+id).val();
	var checkindate =$("#modify_checkindate").val();
	var startdate = $('#startdate').val();
	var enddate = $('#enddate').val();
	if (!(regexStr.test(inputDate))) {
		$("#_my97DP").hide();
		showValidateResultNew(id,"请输入正确的离店日期");
		$('#'+id).val("");
		return false;
	}
	if (inputDate < startdate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultNew(id,"离店日期不在保障日期范围内");
		return false;
	}
	if (inputDate == checkindate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultNew(id,"入住日期与离店日期不可为同一天");
		return false;
	}
	if (inputDate < checkindate) {
		$("#_my97DP").hide();
		$("#"+id).val("");
		showValidateResultNew(id,"离店日期不在保障日期范围内");
		return false;
	}
	if (inputDate > enddate) {
		$("#_my97DP").hide();
		showValidateResultNew(id,"离店日期不在保障日期范围内");
		return false;
	}
	showValidateResultNew(id,"");
	return true;
}

/**************************北美游校验方法结束*************************/

/**********************被保险人谈曾校验开始**********************/
// 被保险人身份证号码效验
function checkIdentifyNumberModified(){
	var id="modify_identifyNumber";
	$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#"+id).val()) == ""){
	}
	if(pcbytes($("#"+id).val())>18){
		showValidateResultNew(id,"请输入正确的证件号码");
		return false;
	}else if("16"==$("#modify_insuredIndentifyType").val() && $("#"+id).val() != ""){
		if(!($("#"+id).val()).match(wgrReg)){
			showValidateResultNew(id,"请输入正确的证件号");
			return false;
		}
	}else if(($("#"+id).val()).match(reg7)) {
		showValidateResultNew(id,"请输入正确的证件号");
		return false;
		}
	
	if(("01"==$("#modify_insuredIndentifyType").val() || "02"==$("#modify_insuredIndentifyType").val() || "17"==$("#modify_insuredIndentifyType").val())&&$('#modify_identifyNumber').val()!=""){
		$('#modify_identifyNumber').val($('#modify_identifyNumber').val().toUpperCase());
		var identiyId=$("#modify_identifyNumber").val();
		var msg=isCardID(identiyId);
		if("ZXF" != $('#productcode').val() ){
			if(msg=="true"){
				
			}else{
				if(msg=="请输入正确的身份证号码" && "01"!=$("#modify_insuredIndentifyType").val()){
					showValidateResultNew(id,"请输入正确的证件号码");
				}else{
					showValidateResultNew(id,msg);
				}
				return false;
			}
		}
	}
	if("ZXF" != $('#productcode').val() ){
		// 判断输入的出生日期是否与身份证一致
		if(("01"==$('#modify_insuredIndentifyType').val() || "02"==$('#modify_insuredIndentifyType').val() || "17"==$('#modify_insuredIndentifyType').val()) && $('#modify_identifyNumber').val()!=""){
			var sId=$('#modify_identifyNumber').val();
			var sBirthday;
			if(sId.length==15){
				sBirthday="19"+sId.substr(6,2)+"/"+sId.substr(8,2)+"/"+sId.substr(10,2);
			}else{
				sBirthday=sId.substr(6,4)+"/"+sId.substr(10,2)+"/"+sId.substr(12,2);
			}
			var birthday=$('#modify_insuredBirthday').val();
			
			if(sBirthday!=birthday){
				if("01"==$('#modify_insuredIndentifyType').val()){
					showValidateResultNew("modify_insuredBirthday", "请确认信息与身份证一致");
				}else{
					showValidateResultNew("modify_insuredBirthday", "请确认信息与证件一致");
				}
				return false ;
			}
		}
		showValidateResultNew("modify_insuredBirthday","");
		checkIdentifyNumberSexModified();
	}
	showValidateResultNew(id,"");
	return true;
}
/**
 * @description 验证被保险任证件号码，无性别
 * @author yuejuxia
 */
function checkIdentifyNumberModifiedWithoutSex(){
	var id="modify_identifyNumber";
	$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#"+id).val()) == ""){
	}
	if(pcbytes($("#"+id).val())>18){
		showValidateResultNew(id,"请输入正确的证件号码");
		return false;
	}else if(($("#"+id).val()).match(reg7)) {
		showValidateResultNew(id,"请输入正确的证件号");
		return false;
		}
	if("16"==$("#modify_insuredIndentifyType").val()&& $("#"+id).val()!=""){
		if(!($("#"+id).val()).match(wgrReg)){
			showValidateResultNew(id,"请输入正确的证件号");
			return false;
		}
	}
	if(("01"==$("#modify_insuredIndentifyType").val() || "02"==$("#modify_insuredIndentifyType").val() || "17"==$("#modify_insuredIndentifyType").val())&&$('#modify_identifyNumber').val()!=""){
		var identiyId=$("#modify_identifyNumber").val();
		var msg=isCardID(identiyId);
		if(msg=="true"){
			
		}else{
			if(msg=="请输入正确的身份证号码" && "01"!=$("#modify_insuredIndentifyType").val()){
				showValidateResultNew(id,"请输入正确的证件号码");
			}else{
				showValidateResultNew(id,msg);
			}
			return false;
		}
	}
	// 判断输入的出生日期是否与身份证一致
	if(("01"==$('#modify_insuredIndentifyType').val() || "02"==$('#modify_insuredIndentifyType').val() || "17"==$('#modify_insuredIndentifyType').val()) && $('#modify_identifyNumber').val()!=""){
		var sId=$('#modify_identifyNumber').val();
		var sBirthday;
		if(sId.length==15){
			sBirthday="19"+sId.substr(6,2)+"/"+sId.substr(8,2)+"/"+sId.substr(10,2);
		}else{
			sBirthday=sId.substr(6,4)+"/"+sId.substr(10,2)+"/"+sId.substr(12,2);
		}
		var birthday=$('#modify_insuredBirthday').val();
		if(sBirthday!=birthday){
			if("01"==$('#modify_insuredIndentifyType').val()){
				showValidateResultNew("modify_insuredBirthday", "请确认信息与身份证一致");
			}else{
				showValidateResultNew("modify_insuredBirthday", "请确认信息与证件一致");
			}
			
			return false ;
		}
	}
	showValidateResultNew("modify_insuredBirthday","");
	showValidateResultNew(id,"");
	return true;
}
// 判断输入的出生日期是否与身份证一致
function checkIdentifyNumberSexModified(){
	if(("01"==$('#modify_insuredIndentifyType').val() || "02"==$('#modify_insuredIndentifyType').val() || "17"==$('#modify_insuredIndentifyType').val())&&$('#modify_identifyNumber').val()!=""){
		var identiyId=$("#modify_identifyNumber").val();
		var msg=isCardID(identiyId);
		if(msg=="true"){
			// 根据身份证校验出生日期
			var sId=$('#modify_identifyNumber').val();
			var sSex=1;
			if(sId.length==15){   
	        	sSex=sId.substring(14,15)%2;
		    }else if(sId.length ==18){   
		       sSex=sId.substring(14,17)%2;
		    }
			var sex=$("#modify_sexm").val();// 性别 ;
		    if(sSex==0){
		    	sSex=2;
		    }
			if(sSex!=sex){
				if("01"==$('#modify_insuredIndentifyType').val()){
					showValidateResultNew("sexModify", "请确认性别与身份证一致");
				}else{
					showValidateResultNew("sexModify", "请确认性别与证件一致");
				}
				
				return false ;
			}else{
				showValidateResultNew("sexModify", "");
				return true;
			}
		}else{
			showValidateResultNew("sexModify", "");
			if("01"==$('#modify_insuredIndentifyType').val()){
				showValidateResultNew("sexModify", "请确认性别与身份证一致");
			}else{
				showValidateResultNew("sexModify", "请确认性别与证件一致");
			}
			
			return true;
		}
	}
		showValidateResultNew("sexModify", "");
		return true;
}

//出生日期修改效验
function  checkInsuredBirthdayModified(id) {
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	
	var maxOldInsuredage=$("#MAXOLDINSUREDAGE").val();
	var maxOldInsuredageUnit=maxOldInsuredage.charAt(maxOldInsuredage.length - 1);
	maxOldInsuredage=maxOldInsuredage.substr(0,maxOldInsuredage.length-1);
	var oldProposalNo = $("#oldproposalno").val();
	if("ECK"==$("#productcode").val() && ""!=oldProposalNo && undefined!=oldProposalNo){
		maxInsuredage = maxOldInsuredage;
	}
	
	hideTips('modify_insuredBirthday');
	//EDD生日格式转换
	var inputDateBefore = $('#' + id).val();//记录原始输入值，如果转换后格式还不对，就换回原来的输入值
	if($("#riskcode").val() == "EDD" ||$("#productcode").val()=="EJQ_H"){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + id).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/");
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/");
			}
			$('#' + id).val(inputDate);
		}
	}
	
	// 校验日期格式c
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultNew(id, "请输入正确的日期");
		if($("#riskcode").val() == "EDD" )
			$('#' + id).val(inputDateBefore);
		$("#_my97DP").hide();
		return false;
	}
	if ($.trim($('#modify_insuredBirthday').val()) == '') {
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#modify_insuredBirthday').val());
	if (!chkBirthday(maxInsuredage, minInsuredage, startdate, birthday)) {
			var tips="年龄必须在"+minInsuredage+"至"+maxInsuredage+"周岁之间";
			if($('#productcode').val()=='EAG_T')
				tips="年龄必须在<br>"+minInsuredage+"至"+maxInsuredage+"周岁之间";
			showValidateResultNew(id, tips);
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (("01" == $('#modify_insuredIndentifyType').val() || "02" == $('#modify_insuredIndentifyType').val() || "17" == $('#modify_insuredIndentifyType').val())
			&& $('#modify_identifyNumber').val() != "") {
		var sId = $('#modify_identifyNumber').val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/"
					+ sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/"
					+ sId.substr(12, 2);
		}
		var birthday = $('#modify_insuredBirthday').val();
		if (sBirthday != birthday) {
			if("01" == $('#modify_insuredIndentifyType').val()){
				showValidateResultNew(id, "请确认信息与身份证一致");
			}else{
				showValidateResultNew(id, "请确认信息与证件一致");
			}
			return false;
		}else{
			showValidateResultNew(id, "");
			if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
				var classname = $('#' + id).attr("class");
				$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
			}
			return true;
		}
	}
	showValidateResultNew(id, "");
	if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
		var classname = $('#' + id).attr("class");
		$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}

// 被保险人姓名效验
function checkModifyInsuredName(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultNew(id, "被保险人姓名过长");
		return false;
	}
	if (($("#" + id).val()).match(reg4)
			|| ($("#" + id).val()).toString().indexOf("-") > -1) {
		if($("#riskcode").val()=='LAY'){
			showValidateResultNew(id, "请输入正确的名字");
		}else{
			showValidateResultNew(id, "请输入正确的姓名");
		}
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}

function checkModifyInsuredeNamePY(id){
	$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var reg=/^[ A-Za-z]*$/;
	if ($.trim($("#"+id).val() )== ""){
	}
	if(!(reg.test($("#"+id).val()))){
		showValidateResultNew(id,"请填写正确的姓名拼音");
		return false;
	}
	if(pcbytes($("#"+id).val())>20){
		showValidateResultNew(id,"被保险人姓名拼音过长");
		return false;
	}
	showValidateResultNew(id,"");
	return true;
}
/**********************被保险人谈曾校验结束**********************/

function setEndDateforEDD(){
	/*if (checkStartDate()) {*/
		var startDate = "startdate";
	var d=$("#"+startDate).val();
	var start = new Date(d.toString().substring(0,4)+"/"+d.toString().substring(5,7)+"/"+d.toString().substring(8,10));
	//var start = new Date(d.toString().substring(0,4)+"/"+d.toString().substring(5,7)+"/"+d.toString().substring(8,10));
	
	if($("#productcode").val() == "JMA"){//储金型 3 年
		start.setFullYear(start.getFullYear() + 3);
	}else{
		start.setFullYear(start.getFullYear() + 1);
	}
	
	start.setDate(start.getDate()-1);
	var year=start.getFullYear();
	var month=start.getMonth()+1;
	if(month<10){
		month="0"+month;
	}
	var day=start.getDate();
	if(day<10){
		day="0"+day;
	}	
	//起保时间非数字不对终保时间做修改
	if($("#riskcode").val() =="JMA" && (isNaN(year) || isNaN(month) || isNaN(day))){
		return false;
	}
	$("#endYear").html(year);
	$("#endMonth").html(month);
	$("#endDay").html(day);
	$("#enddatestr").html(year+"年"+month+"月"+day+"日");
	$("#enddate").val(year+"/"+month+"/"+day);
	if($("#riskcode").val()=="JMA"){
		setTdDate();
	}
	return true;
	/*} else {
		return false;
	}*/
}

/***************健康险校验开始*******************/
function checkInsuredHeight(id){
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) != "") {
		var height = $("#" + id).val();
		flag = false;
		var reg0 = /^([1-9]|[1-9]\d{1}|[1]\d{2}|2[0-4]\d|250)$/;
		if (!reg0.test(height)) {
			showValidateResultHealth(id, "请您正确输入身高 ");
			return false;
		}
	}
	showValidateResultHealth(id, "");
	return true;
}

function checkInsuredWeight(id){
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) != "") {
		var weight = $("#" + id).val();
		flag = false;
		var reg0 = /^([1-9]|[1-9]\d{1}|[1]\d{2}|200)$/;
		if (!reg0.test(weight)) {
			showValidateResultHealth(id, "请您正确输入体重");
			return false;
		}
	}
		showValidateResultHealth(id, "");
		return true;
}

function checkHeightandWeight(){
	var height=parseInt($("#input_insuredheight").val());
	var weight=parseInt($("#input_insuredweight").val());
	var birthday=new Date($("#input_insuredBirthday").val());
	var startdate=new Date($("#startdate").val());
	var sex=$("#input_insuredsex").val();
	var ageinday=getAgeInDayfunction(birthday,startdate);
	var age=getAgeInYear(birthday,startdate);
	var month=getAgeInMonth(birthday,startdate);
	var h=0;
	var w=0;
	if(age<2){//小于等于一岁
   		h=50+month*2.4;
	}else{
		h=age*7+70;
	}
	if(height>=h*1.3||height<=h*0.7){
		return false;
	}
	var wo=3.5;if(sex=='2'){wo=3;}
	if(ageinday<=180){
		w=wo+month*0.7;
	}else if(ageinday>180&&age<2){
		w=wo+4.2+(month-6)*0.7;
	}else{
		w=age*2+8;
	}
	if(weight>=w*1.3||weight<=w*0.7){
		return false;
	}
	return true;
}

// 被保险人出生日期与身份证号效验
function checkInsuredBirthdayHealth(id) {
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
//	var minInsuredageUnit=minInsuredage.substr(-1);
//	var maxInsuredageUnit=maxInsuredage.substr(-1);
	var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
	var maxInsuredageUnit=maxInsuredage.charAt(maxInsuredage.length - 1);
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	var inputDateBefore = $('#' + id).val();
	var reg0 = /\d{8}$/;
	var inputDate = $('#' + id).val();
	if (inputDate.length == 8&&reg0.test(inputDate)) {
		$("#_my97DP").hide();
		$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
		//inputDate = $('#' + id).val();
	} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
		if(inputDate.indexOf("-")!=-1){
			$("#_my97DP").hide();
			inputDate = inputDate.replace(/-/g, "/")
		}
		else if(inputDate.indexOf(".")!=-1){
			$("#_my97DP").hide();
			inputDate = inputDate.replace(/\./g, "/")
		}
		$('#' + id).val(inputDate);
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultNew(id, "请输入正确的日期");
		$('#' + id).val(inputDateBefore);
		$("#_my97DP").hide();
		return false;
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#'+id).val());
	if (!chkBirthdayNew(maxInsuredage, minInsuredage,maxInsuredageUnit,minInsuredageUnit, startdate, birthday)) {
			var tips= "年龄必须在" + minInsuredage;
			if ("M"==minInsuredageUnit) {
				tips += "个月";
			}if ("D"==minInsuredageUnit) {
				tips += "天";
			}
			tips = tips + "至" + maxInsuredage + "周岁之间";
			showValidateResultNew(id, tips);
			return false;
	}
	if("JCO" != $("#productcode").val()&&"ECR" != $("#productcode").val()){ 
		setInsuredAgeHealth(); 
		}

	// 判断输入的出生日期是否与身份证一致
	if ($('#input_identifytype').val() == "01" && $('#input_identifyNumber').val() != ""&& $('#input_identifyNumber').val() != "请输入证件号码") {
		var sId = $('#input_identifyNumber').val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+id).val();
		if (sBirthday != birthday) {
			showValidateResultNew(id, "请确认信息与身份证一致");
			return false;
		}else{
			showValidateResultNew(id, "");
			if($('#' + id).attr("class")!=null){
				var classname = $('#' + id).attr("class");
				$('#' + id).attr("class",classname);
			}
			return true;
		}
	}
	showValidateResultNew(id, "");
	if($('#' + id).attr("class")!=null){
		var classname = $('#' + id).attr("class");
		$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}

function chkBirthdayNew(topDate, bottomDate,topUnit,bottomUnit,startdate, birthday) {
	var _birthDate = new Date(birthday);
	if (isNaN(_birthDate)) {
		birthday = birthday.replace(/-/g, "/");
		_birthDate = new Date(birthday);
	}
	/*if("ZFO"==$("#productcode").val()){
		var _currentDate = new Date();
	}else {
	}*/
	var _currentDate = new Date(startdate);
	// 允许最大年
	var tmpTopDate = null;
	if(topUnit=="Y"){
		tmpTopDate=new Date(getNextYearFullDate(_currentDate, -topDate));
	}else if(topUnit=="D"){
		tmpTopDate=new Date(getNextDateFullDate(_currentDate, -topDate));
	}
	// 允许最小年
	var tmpBottomDate =null;
	if(bottomUnit=="Y"){
		tmpBottomDate=new Date(getNextYearFullDate(_currentDate, -bottomDate));
	}else if(bottomUnit=="D"){
		tmpBottomDate=new Date(getNextDateFullDate(_currentDate, -bottomDate));
	}else if(bottomUnit=="M"){
		tmpBottomDate=new Date(getNextMonthFullDate(_currentDate, -bottomDate));
	}
	if("ECR"==$("#productcode").val()||"EDD_R"==$("#productcode").val()){
		if (_birthDate < tmpTopDate || _birthDate > tmpBottomDate) {
			return false;
		}
	}else {
		if (_birthDate <= tmpTopDate || _birthDate > tmpBottomDate) {
			return false;
		}
	}
	return true;
}

function chkBirthdayNewForEAA(bottomDate,bottomUnit,startdate, birthday) {
	var _birthDate = new Date(birthday);
	if (isNaN(_birthDate)) {
		birthday = birthday.replace(/-/g, "/");
		_birthDate = new Date(birthday);
	}
	var _currentDate = new Date(startdate);
	// 允许最小年
	var tmpBottomDate =null;
	if(bottomUnit=="Y"){
		tmpBottomDate=new Date(getNextYearFullDate(_currentDate, -bottomDate));
	}else if(bottomUnit=="D"){
		tmpBottomDate=new Date(getNextDateFullDate(_currentDate, -bottomDate));
	}else if(bottomUnit=="M"){
		tmpBottomDate=new Date(getNextMonthFullDate(_currentDate, -bottomDate));
	}
	if (_birthDate > tmpBottomDate) {
		return false;
	}
	return true;
}
function chkBirthdayNewForEAL(topDate, bottomDate,topUnit,bottomUnit,startdate, birthday) {
	var _birthDate = new Date(birthday);
	if (isNaN(_birthDate)) {
		birthday = birthday.replace(/-/g, "/");
		_birthDate = new Date(birthday);
	}
	var _currentDate = new Date(startdate);
	// 允许最大年
	var tmpTopDate = null;
	if(topUnit=="Y"){
		tmpTopDate=new Date(getNextYearFullDate(_currentDate, -topDate));
	}else if(topUnit=="D"){
		tmpTopDate=new Date(getNextDateFullDate(_currentDate, -topDate));
	}
	// 允许最小年
	var tmpBottomDate =null;
	if(bottomUnit=="Y"){
		tmpBottomDate=new Date(getNextYearFullDate(_currentDate, -bottomDate));
	}else if(bottomUnit=="D"){
		tmpBottomDate=new Date(getNextDateFullDate(_currentDate, -bottomDate));
	}else if(bottomUnit=="M"){
		tmpBottomDate=new Date(getNextMonthFullDate(_currentDate, -bottomDate));
	}
	if (_birthDate <= tmpTopDate || _birthDate > tmpBottomDate) {
		return false;
	}
	return true;
}
// 被保险人姓名效验
function checkInsuredNameHealth(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultNew(id, "被保险人姓名过长");
		return false;
	}
	if (($("#" + id).val()).match(reg4)
			|| ($("#" + id).val()).toString().indexOf("_") > -1) {
		showValidateResultNew(id, "请输入正确的名字");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}

//
function checkIdentifyNumberHealth(id) {
	var replace_idno=($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '');
	if($("#" + id).val() != replace_idno){
		$("#" + id).val(replace_idno);
	}
	if (pcbytes($("#" + id).val()) > 18) {
		showValidateResultNew(id, "请输入正确的证件号码");
		return false;
	}
	if (($("#" + id).val()).match(reg7)) {
		if($("#input_identifytype").val() == "01"){
			showValidateResultNew(id, "请输入正确的身份证号码");
		}else{
			showValidateResultNew(id, "请输入正确的证件号码");
		}
		return false;
	}
	if($("#input_identifytype").val() == "16" && $("#" + id).val() !=""){
		if(!($("#" + id).val()).match(wgrReg)){
			showValidateResultNew(id, "请输入正确的证件号码");
			return false;
		}
	}
	if ($("#input_identifytype").val() == "01" && $('#'+id).val() != "" && $('#'+id).val() !="请输入证件号码") {
		var msg = isCardID($("#"+id).val());
		if (msg != "true") {
			showValidateResultNew(id, msg);
			return false;
		}
	}

	checkIdentifyNumberSex();
	if($("#input_insuredBirthday").val()!=""){
		checkInsuredBirthdayHealth("input_insuredBirthday");
	}
	showValidateResultNew(id, "");
	return true;
}

//根据身份证号码验证性别
function checkIdentifyNumberSexHealth(id) {
	if ($('#input_identifytype').val() == "01"
			&& $('#input_identifyNumber').val() != ""
				&&$('#input_identifyNumber').val() != "请输入证件号码") {
		var identiyId = $("#input_identifyNumber").val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sId = identiyId;
			var sSex = 1;
			if (sId.length == 15) {
				sSex = sId.substring(14, 15) % 2;
			} else if (sId.length == 18) {
				sSex = sId.substring(14, 17) % 2;
			}
			var sex = $("#input_insuredsex").val();// 性别 ;
			if (sSex == 0) {
				sSex = 2;
			}
			if (sSex != sex) {
				showValidateResultNew(id, "请确认信息与身份证一致");
//				rollToPos("sexf");
				return false;
			} else {
				showValidateResultNew(id, "");
				return true;
			}
		} else {
			showValidateResultNew(id, "");
			showValidateResultNew("input_identifyNumber", msg);
			return true;
		}
	}
	showValidateResultBtm(id, "");
	return true;
}

//街道详细信息
function checkSendAddressHealth(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var specialStr = "['%;]|(<.*>)";
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultNew(id, "街道地址信息过长");
		return false;
	}
	if (($("#" + id).val()).match(specialStr)) {
		showValidateResultNew(id, "输入的信息含非法字符");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}
////////////////健康险 投保确认页面投保人信息校验//////////////////////////////

// 投保人姓名效验
function checkApplyNameforHealth(id) {
	
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
		showValidateResultHealthConfirm(id, "投保人姓名不能为空");
		return false;
	}
	if (pcbytes($("#" + id).val()) > 60) {
		showValidateResultHealthConfirm(id, "投保人姓名过长");
		return false;
	}
	if (($("#" + id).val()).match(reg5)) {
		showValidateResultHealthConfirm(id, "请输入正确的名字");
		return false;
	}
	showValidateResultHealthConfirm(id, "");
	return true;
}

//投保人身份证号码效验
function checkApplyNumberforHealth(id) {
	var replace_idno=($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '');
	if($("#" + id).val() != replace_idno){
		$("#" + id).val(replace_idno);
	}
	if (pcbytes($("#" + id).val()) > 18) {
		showValidateResultHealthConfirm(id, "投保人证件号码过长");
		return false;
	}
	var msg = isCardID($("#" + id).val());
		if (msg == "true") {
			;
		} else {
			showValidateResultHealthConfirm(id, msg);
			return false;
		}
	//checkApplyIdentifyNumberSex();
		//setIdentifySexandBirthday();
	showValidateResultHealthConfirm(id, "");
	return true;
}


//投保人手机效验
function checkApplyMobileforHealth(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
		showValidateResultHealthConfirm(id, "投保人手机号不能为空");
		return false;
	} else {
		var strMobile = $("#" + id).val();
		mobile_Flag = false;
		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
		if (reg0.test(strMobile)) {
			mobile_Flag = true;
		} else {
			mobile_Flag = false;
		}
		if (mobile_Flag) {
			showValidateResultHealthConfirm(id, "");
			return true;
		} else {
			showValidateResultHealthConfirm(id, "请输入正确的手机号码");
			return false;
		}
	}
	return true;
}


//投保人邮箱效验
function checkApplyEmailforHealth(id) {
	
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
		showValidateResultHealthConfirm(id, "投保人邮箱不能为空");
		return false;
	} else {
		var email = $("#" + id).val();
		var email_Flag = false;
		// email.search(/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/)
		// != -1
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		email_Flag = reg.test(email);
		if (email_Flag) {
			showValidateResultHealthConfirm(id, "");
			return true;
		} else {
			showValidateResultHealthConfirm(id, "请输入正确的邮箱地址");
			return false;
		}
	}
}
//投保人地址
function checkApplyAddressforHealth(id) {
	
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var specialStr = "['%;]|(<.*>)";
	if ($.trim($("#" + id).val()) == "") {
		showValidateResultHealthConfirm(id, "联系地址信息不能为空");
		return false;
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultHealthConfirm(id, "联系地址信息过长");
		return false;
	}
	if (($("#" + id).val()).match(specialStr)) {
		showValidateResultHealthConfirm(id, "输入的信息含非法字符");
		return false;
	}
	showValidateResultHealthConfirm(id, "");
	return true;
}

/***************健康险校验结束*******************/
/******************创业保开始********************/
function checkCCBCount(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
		checkAlert(id,'请输入购买份数');
		return false;
	}
	if (!$("#" + id).val().match("^[0-9]*$")) {
		checkAlert(id,'请您输入有效数字');
		return false;
	}else{		
		value=parseInt(value);
		$("#" + id).val(value);
	}
	if(value<1||value>300){
		checkAlert(id,'购买份数上限为300份且不能为0');
		return false;
	}
	return true;
}

function checkGUZCount(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
		checkAlert(id,'请输入投保人数');
		return false;
	}
	if (!$("#" + id).val().match("^[0-9]*$")) {
		checkAlert(id,'请您输入有效数字');
		return false;
	}else{		
		value=parseInt(value);
		$("#" + id).val(value);
	}
	if(value<1||value>300){
		var itemAmount = $("#GUZSelectSpan").html();
		itemAmount = itemAmount.substring(0,itemAmount.length-1);
		if("0"==itemAmount&&0==value){
			
		}else{
			checkAlert(id,'投保人人数上限为300人且不能为0');
			return false;
		}
	}
	return true;
}

function checkYWJCount(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
		checkAlert(id,'请输入投保人数');
		return false;
	}
	if (!$("#" + id).val().match("^[0-9]*$")) {
		checkAlert(id,'请您输入有效数字');
		return false;
	}else{		
		value=parseInt(value);
		$("#" + id).val(value);
	}
	if(value<5||value>300){
		var itemAmount = $("#YWJSelectSpan").html();
		itemAmount = itemAmount.substring(0,itemAmount.length-1);
		if("0"==itemAmount&&0==value){
			
		}else{
			checkAlert(id,'投保人人数上限为300人且不能小于5人');
			return false;
		}
	}
	return true;
}

function checkJTYCount(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
		checkAlert(id,'请输入投保人数');
		return false;
	}
	if (!$("#" + id).val().match("^[0-9]*$")) {
		checkAlert(id,'请您输入有效数字');
		return false;
	}else{		
		value=parseInt(value);
		$("#" + id).val(value);
	}
	if(value<1||value>300){
		var itemAmount = $("#JTYSelectSpan").html();
		itemAmount = itemAmount.substring(0,itemAmount.length-1);
		if("0"==itemAmount&&0==value){
			
		}else{
			checkAlert(id,'投保人人数上限为300人且不能为0');
			return false;
		}
	}
	return true;
}

function checkCompanyName(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
//		showValidateResultLEFBtm(id, "企业名称或企业所属人姓名不能为空");
//		return false;
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultLEFBtm(id, "企业名称或企业所属人姓名过长");
		return false;
	}
	if (!$("#" + id).val().match(companynameReg)) {
		showValidateResultLEFBtm(id, "请输入正确的企业名称或企业所属人姓名");
		return false;
	}
	showValidateResultLEFBtm(id, "");
	return true;
}

function checkCompanyQuantity(id){
	var value=($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
		if($("#input_industry").val()=="I66"){
//			showValidateResultLEFBtm(id, "请输入投保房间数");
		}else if($("#input_industry").val()=="H65"){
//			showValidateResultLEFBtm(id, "请输入投保营业面积");
		}
		//为空时添加去除样式
		$("#"+id).parent().removeClass('errorText');
		$("#error_"+id).remove();
		return false;
	}
	if (pcbytes($("#" + id).val()) > 3||!$("#" + id).val().match("^[0-9]*$")) {
		showValidateResultLEFBtm(id, "请输入有效数字");
		return false;
	}
	value=parseInt(value);
	if($("#input_industry").val()=="I66"){
		if(value<1||value>100){
			showValidateResultLEFBtm(id, "本产品投保房间数量上限为100间且不能为0间");
			return false;
		}
	}else if($("#input_industry").val()=="H65"||$("#input_industry").val()=="H63"){
		if(value<1||value>500){
			showValidateResultLEFBtm(id, "本产品投保营业面积上限为500平米且不能为0平米");
			return false;
		}
	}
	showValidateResultLEFBtm(id, "");
	return true;
}

function checkCompanyIdentifynumber(id){
	InsuredidentityNumChangeForLEF();
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
//		showValidateResultLEFBtm(id, "证件号码不能为空");
		showValidateResultLEFBtm(id, "");//作用在于调用了去掉tip
		return false;
	}
	if (pcbytes($("#" + id).val()) > 20) {
		showValidateResultLEFBtm(id, "证件号码过长");
		return false;
	}
	if (!($("#" + id).val()).match(companyIdentifynumReg)&& $("#"+id).val() != "请输入证件号码") {
		if($('#input_companyIndentifyType').val() == "01"){
			showValidateResultLEFBtm(id, "请输入正确的身份证号码");
		}else{
			showValidateResultLEFBtm(id, "请输入正确的证件号码");
		}
		return false;
	}
	if ($('#input_companyIndentifyType').val() == "01"
			&& $("#"+id).val() != ""
				&& $("#"+id).val() != "请输入证件号码") {
		var identiyId = $("#"+id).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
		} else {
			showValidateResultLEFBtm(id, "请输入正确的身份证号码");
			return false;
		}
	}
	showValidateResultLEFBtm(id, "");
	return true;
}

function checkCompanyLisencenumber(id){
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
//		showValidateResultLEFBtm(id, "营业执照号码不能为空");
//		return false;
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultLEFBtm(id, "营业执照号码过长");
		return false;
	}
	if ($("#" + id).val()!=""&&!($("#" + id).val()).match(flightReg)) {
		showValidateResultLEFBtm(id, "请输入正确的营业执照号码");
		return false;
	}
	showValidateResultLEFBtm(id, "");
	return true;
}


function checkCompanyPhonenumber(id){
	var productcode = $("#productcode").val();
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
		
			showValidateResultLEFBtm(id, "");//作用在于调用了去掉tip
		
		return false;
	} else {
		var strMobile = $("#" + id).val();
		mobile_Flag = false;
		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
		var reg1 = /^(0\d{2,3})-\d{7,8}(-(\d{1,}))?$/;
		if (reg0.test(strMobile)) {
			mobile_Flag = true;
		} else {
			mobile_Flag = false;
		}
		if (mobile_Flag) {
			if("EAC_S"==productcode||"EAC_L"==productcode){
//				showValidateResultNew(id, "");
			}else{
				showValidateResultLEFBtm(id, "");
			}
			return true;
		} else {
			//新增校验座机号规则
			if(reg1.test(strMobile)){
				if("EAC_S"==productcode||"EAC_L"==productcode){
					showValidateResultNew(id, "");
				}else{
					showValidateResultLEFBtm(id, "");
				}
				return true;
			}else{
				if("EAC_S"==productcode||"EAC_L"==productcode){
					showValidateResultNew(id, "请输入正确的联系电话");
				}else{
					showValidateResultLEFBtm(id, "请输入正确的联系电话");
				}
				return false;
			}
		}
	}
}

//街道详细信息
function checkHouseAddress(id) {
	var productcode = $("#productcode").val();
	var title = "街道地址";
	if("LBB"==productcode || "ZFO"==productcode){
		title = "家庭住址";
	}else if("JMA" == productcode){
		if("address" == id){
			title = "联系地址";
		}else{
			title = "街道地址";
		}
		
	}else if("JCO" == productcode){
		if("input_applyAddress"==id){
			title = "投保人地址";
		}
	}
	if(null == $("#" + id).val() || "" == $("#" + id).val() || undefined == $("#" + id).val() 
			|| "请精确到门牌号，请勿重复录入省市，省市内容如需修改，请返回修改房屋所在城市。" == $("#" + id).val()){
		/*$("#" + id).val($("#" + id).val());*/
		showValidateResultTextarea(id, "");
		return true;
	}else{
		$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	}
	var specialStr = "['%;]|(<.*>)";
	if ($.trim($("#" + id).val()) == ""&&"LEF" != productcode&&"JCO" != productcode&&"LXL" != productcode&&"LBB" != productcode &&"ZFO" != productcode) {
		if("JMA" == productcode && "address" == id ){
			showValidateResultNew(id, title+"不能为空");
		}/*else if("ZFO" == productcode){
			showValidateResultBtm(id, title+"不能为空");
		}*/else{
			showValidateResultTextarea(id, title+"不能为空");
		}
		return false;
	}
	if("input_insuredaddress"==id&&"JCO" == productcode){
		if (pcbytes($("#" + id).val()) > 120) {
/*			if("JMA" == productcode && "address" == id){
				showValidateResultNew(id, title+"信息过长");
			}else{
*/			showValidateResultTextarea(id, title+"信息过长");
			return false;
		}
	}else if("input_applyAddress"==id&&"JCO" == productcode){
		if (pcbytes($("#" + id).val()) > 120) {
			showValidateResultTextarea(id, title+"信息过长");
			return false;
		}
	}else{
		if (pcbytes($("#" + id).val()) > 80) {
			if("ZFO" == productcode){
				showValidateResultBtm(id, title+"信息过长");
			}else{
				showValidateResultTextarea(id, title+"信息过长");
			}
			return false;
		}
	}
	if("LXL" == productcode){
		var patternString = "^[a-zA-Z0-9\u4e00-\u9fa5.#\\-()、（）]*$";
		if (!($("#" + id).val()).match(patternString)) {
				showValidateResultTextarea(id, "请输入正确的"+title);
			return false;
		}
	}
	if("ZFO"==productcode){
		var patternString = "^[a-zA-Z0-9\u4e00-\u9fa5#\\-]*$";
		if (!($("#" + id).val()).match(patternString)) {
			showValidateResultBtm(id, "请输入正确的"+title);
			return false;
		}
	}
	if (($("#" + id).val()).match(specialStr)) {
		if("JMA" == productcode && "address" == id){
			showValidateResultNew(id, "请输入正确的"+title);
		}else{
			showValidateResultTextarea(id, "请输入正确的"+title);
		}
		return false;
	}else if("JMA" == productcode && "address" == id && $("#" + id).val().match(/@|\*/)){
		showValidateResultNew(id, "请输入正确的"+title);
		return false;
	}
	
	if("JMA" == productcode){
		showValidateResultNew(id, "");
	}else{
		showValidateResultTextarea(id, "");
	}
	return true;
}

function checkIdentifyRisktypeModified(){
	var id="modify_risktype";
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if(($("#GUZPremium").val()==""&&$("#" + id).val().substr(0,1)=="1")||($("#YWJPremium").val()==""&&$("#" + id).val().substr(1,1)=="1")||($("#JTYPremium").val()==""&&$("#" + id).val().substr(2,1)=="1")){
		showValidateResultNew(id, "请输入正确的险种");
		return false;
	}
	return true;
}

function checkIdentifyRisktype(insuredid){
	var id="input_risktype"+insuredid;
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if(($("#GUZPremium").val()==""&&$("#" + id).val().substr(0,1)=="1")||($("#YWJPremium").val()==""&&$("#" + id).val().substr(1,1)=="1")||($("#JTYPremium").val()==""&&$("#" + id).val().substr(2,1)=="1")){
		showValidateResultNew(id, "请输入正确的险种");
		return false;
	}
	return true;
}
/******************创业保结束********************/
/*****************百万身价寿险*******************************/
//校验生日
function checkBirthday(){
	var id = "birthday";
	var errortipid = "identifynumber";
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	//EDD生日格式转换
	var inputDateBefore = $('#' + id).val();
	if($("#riskcode").val() == "BWS" ){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + id).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + id).val(inputDate);
		}
	}
	// 校验日期格式
	if($.trim($('#' + id).val()) == ''){
		showValidateResultNew(id, "出生日期不能为空");
		$("#_my97DP").hide();
		return false;
	}
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultNew(id, "请输入正确的日期");
		$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#' + id).val());
	if (!chkBirthday(maxInsuredage, minInsuredage, startdate, birthday)) {
		$("#_my97DP").hide();
			var tips="被保险人年龄需在"+minInsuredage+"-"+maxInsuredage+"周岁之间";
			showValidateResultNew(errortipid, tips);//生气校验出错，是在证件号码上面显示错误信息
			return false;
	}
	showValidateResultNew(errortipid, "");
	return true;
}
//街道详细信息
function checkSendAddressforBWSJ(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var specialStr = "['%;]|(<.*>)";
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultNew(id, "保单寄送地址信息过长");
		return false;
	}
	if (($("#" + id).val()).match(specialStr)) {
		showValidateResultNew(id, "请输入正确的保单寄送地址信息");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}

/*****************中怡页面嵌套合作产品-开始*******************************/
//公司投保人代码校验
function checkCompanyCode(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 16) {
		showValidateResultNew(id, "公司代码信息过长");
		return false;
	}
	if (!($("#" + id).val()).match(companyLicensenumReg)) {  //gaoyinghao update
		showValidateResultNew(id, "请输入正确的公司代码");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}
//中怡被保险人姓名效验 gaoyinghao add
function checkInsuredNameZY(id) {
	var direction = "";
	var productcode = $("#productcode").val();
	if("EDD_X"==productcode){
		direction = "bottom";
	}else{
		direction = "right";
	}
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultWithDirection(id,direction, "被保险人姓名过长");
		return false;
	}
	if (($("#" + id).val()).match(reg4)
			|| ($("#" + id).val()).toString().indexOf("_") > -1) {
		showValidateResultWithDirection(id,direction, "请输入正确的被保险人姓名");
		return false;
	}
	showValidateResultWithDirection(id,direction, "");
	return true;
}

//被保险人！！身份证号码效验
function checkIdentifyNumberSingle(id) {
	 InsuredidentityNumChangeForSingle();
	var direction = "";
	var productcode = $("#productcode").val();
	if("EDD_X"==productcode){
		direction = "bottom";
	}else{
		direction = "right";
	}
	var replace_idno=($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '');
	if($("#" + id).val() != replace_idno){
		$("#" + id).val(replace_idno);
	}
	if($("#" + id).val() == ""){
	}
	if (pcbytes($("#" + id).val()) > 18) {
		showValidateResultWithDirection(id,direction, "请输入正确的证件号码");
		return false;
	}
	if (($("#" + id).val()).match(reg7)) {
		if($("#prpzinsured_identifytype").val() == "01"){   //gaoyinghao update
			showValidateResultWithDirection(id,direction, "请输入正确的身份证号码");
		}else{
			showValidateResultWithDirection(id,direction, "请输入正确的证件号");
		}
		return false;
	}
	if($("#prpzinsured_identifytype").val() == "16" && $("#" + id).val()!="" && $("#" + id).val()!="请输入证件号码"){
		if(!($("#" + id).val()).match(wgrReg)){
			showValidateResultWithDirection(id,direction, "请输入正确的证件号码");
			return false;
		}
	}
	if (($("#prpzinsured_identifytype").val() == "01" || $("#prpzinsured_identifytype").val() == "02" || $("#prpzinsured_identifytype").val() == "17") && $('#prpzinsured_identifynumber').val() != "" && $('#prpzinsured_identifynumber').val() !="请输入证件号码" && $('#identifynumber').val() != "") {
		var identiyId = $("#"+id).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			checkInsuredBirthdaySingle("prpzinsured_birthday");
			if("EDD_X"==productcode){
				checkInsuredSexSingle("prpzinsured_sex");
			}
		} else {
			if($("#prpzinsured_identifytype").val() != "01" && "请输入正确的身份证号码" == msg){
				showValidateResultWithDirection(id,direction, "请输入正确的证件号");
			}else{
				showValidateResultWithDirection(id,direction, msg);
			}
			
			return false;
		}
	}
	showValidateResultWithDirection(id,direction, "");
	return true;
}

//被保险人出生日期与身份证号效验
function checkInsuredBirthdaySingle(id) {
	var direction = "";
	var productcode = $("#productcode").val();
	if("EDD_X"==productcode){
		direction = "bottom";
	}else{
		direction = "right";
	}
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultWithDirection(id,direction, "请输入正确的日期");
		$("#_my97DP").hide();
		return false;
	}
	if ($.trim($('#prpzinsured_birthday').val()) == '') {
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#prpzinsured_birthday').val());
	var riskcode = $("#riskcode").val();
	if (!chkBirthday(maxInsuredage, minInsuredage, startdate, birthday)) {
			var tips="年龄必须在"+minInsuredage+"至"+maxInsuredage+"周岁之间";
			showValidateResultWithDirection(id,direction, tips);
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (($('#prpzinsured_identifytype').val() == "01" || $('#prpzinsured_identifytype').val() == "02" || $('#prpzinsured_identifytype').val() == "17") && $('#prpzinsured_identifynumber').val() != ""&& $('#prpzinsured_identifynumber').val() != "请输入证件号码") {
		var sId = $('#prpzinsured_identifynumber').val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+id).val();
		if (sBirthday != birthday) {
			if($('#prpzinsured_identifytype').val() == "01"){
				showValidateResultWithDirection(id,direction, "请确认信息与身份证一致");
			}else{
				showValidateResultWithDirection(id,direction, "请确认信息与证件一致");
			}
			
			return false;
		}else{
			showValidateResultWithDirection(id,direction, "");
			return true;
		}
	}
	showValidateResultWithDirection(id,direction, "");
	return true;
}
//被保险人出生日期与身份证号效验
function checkInsuredBirthdaySingleJTE(id,identifyType,identifyNumber) {
	var direction = "bottom";
	var productcode = $("#productcode").val();
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	var reg0 = /\d{8}$/;
	var inputDate = $('#' + id).val();
	if (inputDate.length == 8&&reg0.test(inputDate)) {
		$("#_my97DP").hide();
		$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
		//inputDate = $('#' + id).val();
	} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
		if(inputDate.indexOf("-")!=-1){
			$("#_my97DP").hide();
			inputDate = inputDate.replace(/-/g, "/")
		}
		else if(inputDate.indexOf(".")!=-1){
			$("#_my97DP").hide();
			inputDate = inputDate.replace(/\./g, "/")
		}
		$('#' + id).val(inputDate);
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultWithDirection(id,direction, "请输入正确的日期");
		$("#_my97DP").hide();
		return false;
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#'+id).val());
	var riskcode = $("#riskcode").val();
	if (!chkBirthday(maxInsuredage, minInsuredage, startdate, birthday)&&"ZFO"!=productcode) {
			var tips="年龄必须在"+minInsuredage+"至"+maxInsuredage+"周岁之间";
			showValidateResultWithDirection(id,direction, tips);
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (($('#'+identifyType).val() == "01"||$('#'+identifyType).val() == "02" || $('#'+identifyType).val() == "17") && $('#'+identifyNumber).val() != ""&& $('#'+identifyNumber).val() != "请输入证件号码") {
		var sId = $('#'+identifyNumber).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+id).val();
		if (sBirthday != birthday) {
			if($('#'+identifyType).val() == "01"){
				showValidateResultWithDirection(id,direction, "请确认信息与身份证一致");
			}else{
				showValidateResultWithDirection(id,direction, "请确认信息与证件一致");
			}
			
			return false;
		}else{
			showValidateResultWithDirection(id,direction, "");
			return true;
		}
	}
	showValidateResultWithDirection(id,direction, "");
	return true;
}
//校验中怡责任险LBB监护人及家政服务人员身份证号码
function checkLBBIdentifyNumber(type,id) {
	var identifyNumberId = type+"_"+id+"_identifynumber";
	var identifyTypeId = type+"_"+id+"_identifytype";
	InsuredidentityNumChangeForLBB(identifyTypeId,identifyNumberId);
	var replace_idno=($("#" + identifyNumberId).val()).replace(/(^\s*)|(\s*$)/g, '');
	if($("#" + identifyNumberId).val() != replace_idno){
		$("#" + identifyNumberId).val(replace_idno);
	}
	if (pcbytes($("#" + identifyNumberId).val()) > 18) {
		showValidateResultBtm(identifyNumberId, "请输入正确的证件号码");
		return false;
	}
	if (($("#" + identifyNumberId).val()).match(reg7)) {
		if($("#"+type+"_"+id+"_identifytype").val() == "01"){
			showValidateResultBtm(identifyNumberId, "请输入正确的身份证号码");
		}else{
			showValidateResultBtm(identifyNumberId, "请输入正确的证件号码");
		}
		return false;
	}
	if($("#"+type+"_"+id+"_identifytype").val() == "16" && $("#"+identifyNumberId).val()!="" && $("#"+identifyNumberId).val()!="请输入证件号码"){
		if(!($("#"+identifyNumberId).val()).match(wgrReg)){
			showValidateResultBtm(identifyNumberId, "请输入正确的证件号码");
			return false;
		}
	}
	if (($("#"+type+"_"+id+"_identifytype").val() == "01"||$("#"+type+"_"+id+"_identifytype").val() == "02" || $("#"+type+"_"+id+"_identifytype").val() == "17") && $("#"+type+"_"+id+"_identifynumber").val() != "" && $("#"+type+"_"+id+"_identifynumber").val() !="请输入证件号码") {
		var identiyId = $("#"+identifyNumberId).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			checkLBBBirthday(type,id);
		} else {
			if($("#"+type+"_"+id+"_identifytype").val() != "01" && "请输入正确的身份证号码"==msg){
				showValidateResultBtm(identifyNumberId, "请输入正确的证件");
			}else{
				showValidateResultBtm(identifyNumberId, msg);
			}
			
			return false;
		}
	}
	checkLBBBirthday(type,id);
	showValidateResultBtm(identifyNumberId, "");
	return true;
}

//校验中怡责任险LBB监护人及家政服务人员生日
//type=pupils为监护人，type=domestics为家政服务人员
//id为各自序号，从0开始
function checkLBBBirthday(type,id){
	var minWardage=$("#MINWARDAGE").val();
	var maxWardage=$("#MAXWARDAGE").val();
	var minDomesticage=$("#MINDOMESTICAGE").val();
	var maxDomesticage=$("#MAXDOMESTICAGE").val();
	minWardage=minWardage.substr(0,minWardage.length-1);
	maxWardage=maxWardage.substr(0,maxWardage.length-1);
	minDomesticage=minDomesticage.substr(0,minDomesticage.length-1);
	maxDomesticage=maxDomesticage.substr(0,maxDomesticage.length-1);
	var location = type+"_"+id;
	var birthdayId = location+"_birthday";
	// 校验日期格式
	if (!(regexStr.test($('#' + birthdayId).val())) && $('#' + birthdayId).val() != '') {
		showValidateResultBtm(birthdayId, "请输入正确的日期");
		$("#_my97DP").hide();
		return false;
	}
	if ($.trim($('#' + birthdayId).val()) == '') {
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#' + birthdayId).val());
	if (("pupils"==type&&!chkBirthday(maxWardage, minWardage, startdate, birthday))) {
			var tips="年龄必须在"+minWardage+"至"+maxWardage+"周岁之间";
			showValidateResultBtm(birthdayId, tips);
			return false;
	}else if (("domestics"==type&&!chkBirthday(maxDomesticage, minDomesticage, startdate, birthday))) {
		var tips="年龄必须在"+minDomesticage+"至"+maxDomesticage+"周岁之间";
		showValidateResultBtm(birthdayId, tips);
		return false;
}
	// 判断输入的出生日期是否与身份证一致
	if (($('#'+location+'_identifytype').val() == "01"||$('#'+location+'_identifytype').val() == "02" || $('#'+location+'_identifytype').val() == "17") && $('#'+location+'_identifynumber').val() != ""&& $('#'+location+'_identifynumber').val() != "请输入证件号码") {
		var sId = $('#'+location+'_identifynumber').val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+birthdayId).val();
		if (sBirthday != birthday) {
			if($('#'+location+'_identifytype').val() == "01"){
				showValidateResultBtm(birthdayId, "请确认信息与身份证一致");
			}else{
				showValidateResultBtm(birthdayId, "请确认信息与证件一致");
			}
			
			return false;
		}else{
			showValidateResultBtm(birthdayId, "");
			return true;
		}
	}
	showValidateResultBtm(birthdayId, "");
	return true;
}
/**
 * 手机号规则校验
 * 规则：1.不能为空 2.符合手机号规则
 * @author gaoyinghao
 * @param id
 * @returns {Boolean}
 */
function checkMobile(id) {
	if($("#oldproposalno").val()!="" ){
		if( $("#iswebservice").val()!=""){
			var iswebservice=$("#iswebservice").val();
			if(id=="input_applyMobile"&&iswebservice.substring(0,1)=="0"){//如果是投保人手机号，没有修改则跳过校验
				return true;
			}else if(id=="input_sendMobile"&&iswebservice.substring(1,2)=="0"){//如果是保单寄送手机号，没有修改则跳过校验
				return true;
			}
		}else if( $("#iswebservice").val()==""||$("#iswebservice").val()=="00"){//没有修改的情况下，直接跳过，不用校验	
			return true;
		}
	}
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	} else {
		var strMobile = $("#" + id).val();
		mobile_Flag = false;
		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
		if (reg0.test(strMobile) ) {
			mobile_Flag = true;
		} else {
			mobile_Flag = false;
		}
		if (mobile_Flag) {
			showValidateResultNew(id, "");
			return true;
		} else {
			showValidateResultNew(id, "请输入正确的手机号码");
			return false;
		}
	}
	showValidateResultNew(id, "");
	return true;
}
/**
 * 被保人邮箱规则校验
 * 规则：1.不能为空 2.符合邮箱规则
 * @author gaoyinghao
 * @param id
 * @returns {Boolean}
 */
function checkEmailZY(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	} else {
		var email = $("#" + id).val();
		var email_Flag = false;
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		email_Flag = reg.test(email);
		if (email_Flag) {
			showValidateResultNew(id, "");
			return true;
		} else {
			showValidateResultNew(id, "请输入正确的邮箱地址");
			return false;
		}
	}
	showValidateResultNew(id, "");
	return true;
}
/**
 * 宠物类型规则校验
 * 规则：1.不能为空 2.符合“猫/狗/鱼”规则
 * @author linyao
 * @param id
 * @returns {Boolean}
 */
function checkHousePetsType(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	} else {
		var housePetsType = $("#" + id).val();
		if (housePetsType.match(housePetsTypeReg)
				&&housePetsType.lastIndexOf("/")!=(housePetsType.length-1)) {
			if(housePetsType.split("/").length>3){
				showValidateResultNew(id, "宠物类型不能多于三种");
				return false;
			}else{
				showValidateResultNew(id, "");
				return true;
			}
		} else {
			showValidateResultNew(id, "请输入正确的宠物类型");
			return false;
		}
	}
	showValidateResultNew(id, "");
	return true;
}
/**
 * 宠物数量规则校验
 * 规则：1.不能为空 2.符合"3/3/3"规则
 * @author linyao
 * @param id
 * @returns {Boolean}
 */
function checkHousePetsCount(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	} else {
		var housePetsCount = $("#" + id).val();
		if (housePetsCount.match(housePetsCountReg)
				&&housePetsCount.lastIndexOf("/")!=(housePetsCount.length-1)) {
			if(housePetsCount.split("/").length>3){
				showValidateResultNew(id, "宠物数量不能多于三种");
				return false;
			}else{
				showValidateResultNew(id, "");
				return true;
			}
		} else {
			showValidateResultNew(id, "请输入正确的宠物数量");
			return false;
		}
	}
	showValidateResultNew(id, "");
	return true;
}
/**
 * 校验宠物类型、宠物数量是否匹配
 * @author linyao
 * @param id
 * @returns {Boolean}
 */
function checkHousePetsRelation(id) {
	var housePetsType = $("#housePetsType").val();
	var housePetsCount = $("#housePetsCount").val();
	var housePetsTypeList = housePetsType.split("/");
	var housePetsCountList = housePetsCount.split("/");
	if (housePetsType!=""&&checkHousePetsType("housePetsType")
			&&housePetsCount!=""&&checkHousePetsCount("housePetsCount")
			&&housePetsTypeList.length!=housePetsCountList.length){
		showValidateResultNew(id, "宠物类型与宠物数量不相匹配");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}
/**
 * 校验家庭成员数
 * @author linyao
 * @param id
 * @returns {Boolean}
 */
function checkHomemateQuantity(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	} else {
		if ($("#" + id).val().match("^[1-9]*$")) {
			showValidateResultNew(id, "");
			return true;
		} else {
			showValidateResultNew(id, "请您输入有效数字");
			return false;
		}
	}
	showValidateResultNew(id, "");
	return true;
}
/**
 * 中怡家财险财产地址校验
 * @param id
 * @returns {Boolean}
 */
function checkSendAddressZY(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	var specialStr = "";
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 80) {
		showValidateResultNew(id, "保险财产地址信息过长");
		return false;
	}
	if (!($("#" + id).val()).match(addressZY)) {
		showValidateResultNew(id, "保险财产地址不能包括特殊字符");
		return false;
	}
	showValidateResultNew(id, "");
	return true;
}
/*****************中怡页面嵌套合作产品-结束*******************************/
/*****************京东驾乘综合意外险合作产品-开始*******************************/
//校验现金码
function checkCouponcode(id){
	var couponcode = $.trim($("#couponcode").val());
	$("#couponcode").val(couponcode);
	var pattern = /^[0-9A-Za-z]+$/;
	var flag = pattern.test(couponcode);
	if(couponcode!=""){
		if (!flag||couponcode.length!=16) {
			msg = "请输入正确的现金支付码";
			showValidateResultNew(id,msg);
			return false;
		}
	}
	showValidateResultNew(id,"");
	return true;
}
//根据身份证号码验证性别
function checkInsuredSexSingle(id) {
	if (($('#prpzinsured_identifytype').val() == "01"||$('#prpzinsured_identifytype').val() == "02" || $('#prpzinsured_identifytype').val() == "17")
			&& $('#prpzinsured_identifynumber').val() != ""
				&&$('#prpzinsured_identifynumber').val() != "请输入证件号码") {
		var identiyId = $("#prpzinsured_identifynumber").val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sId = identiyId;
			var sSex = 1;
			if (sId.length == 15) {
				sSex = sId.substring(14, 15) % 2;
			} else if (sId.length == 18) {
				sSex = sId.substring(14, 17) % 2;
			}
			var sex = $("#prpzinsured_sex").val();// 性别 ;
			if (sSex == 0) {
				sSex = 2;
			}
			if (sSex != sex) {
				if($('#prpzinsured_identifytype').val() == "01"){
					showValidateResultBtm(id, "请确认信息与身份证一致");
				}else{
					showValidateResultBtm(id, "请确认信息与证件一致");
				}
				return false;
			} else {
				showValidateResultBtm(id, "");
				return true;
			}
		} else {
			if($('#prpzinsured_identifytype').val() != "01" && "请输入正确的身份证号码"==msg){
				showValidateResultBtm("prpzinsured_identifynumber", "请输入正确的证件号");
			}else{
				showValidateResultBtm("prpzinsured_identifynumber", msg);
			}
			
			return true;
		}
	}
	showValidateResultBtm(id, "");
	return true;
}
/*****************京东驾乘综合意外险合作产品-结束*******************************/
/*****************推荐码校验***********************************************/

function checkRecommendedCode(id){
	
}
function checklogin(){
	$.ajax( {
		url : "/eproperty/member/checkEntryid.do",
		type : "post",
		data : $("#form").serialize(),
		async : true,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			if(data.entryId==""){
				$("#recommendcode").blur();
				checkRecommendCode("recommendcode");
				beforeLogin();
				changeLogin(1);
			}else{
				return true;
			}
		}
		});
	
}
function checkRecommendCode(id){
	var result ;
	var regRecommendCode = "[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘’；：”“'\"。，、？《》+\\\\]";
	if($("#" + id).val()!=""&&$("#" + id).val()!="输入朋友的推荐码，赢推荐好礼"){
	//先校验推荐码的字符类型是否合适
		if (($("#" + id).val()).match(regRecommendCode)) {
			showrecommendcodetips(id);
			result= false;
		}
	//再去查推荐码是否存在
	var entryid = $("#entryId").val();
	var recommendcode = $("#recommendcode").val();
	$.ajax( {
		url : "/eproperty/displayInfo/queryrecommendcode.do",
		type : "post",
		data:'entryId=' + entryid + '&recommendcode=' + recommendcode,
		async : false,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			if(data.result=="1"){
				hidrecommendcodetips(id);
				result= true;
			}else{
				showrecommendcodetips(id);
				result= false;
			}
		},
		error : function(data, textStatus) {
			// ajax 失败后执行
			showrecommendcodetips(id);
			result= false;
	}
		});
	//return true;
	}else{
		hidrecommendcodetips(id);
		result= true;
	}
	return result;
}
function hidrecommendcodetips(id){
	$("#"+id).parent('.tit').find('.errorLook1').remove();
	$("#"+id).removeClass(' errorText1');
}
function showrecommendcodetips(id){
	hidrecommendcodetips(id);
	$("#"+id).parents('.tit').append(function(n){
		  return '<div class="errorLook1" style="position:absolute;top: 36px;left: 160px;"><span class="left"></span><span class="con">您输入的推荐码无效，请核实</span><span class="right"></span></div>';
		  });
		  $("#"+id).addClass('errorText1');
}
function checkNatureEntryID(){
	var result = true;
	var entryid = $("#entryId").val();
	var sessionid = $("#sessionid").val();
	$.ajax( {
		url : "/eproperty/displayInfo/queryIsInternalentryId.do",
		type : "post",
		data:'entryId=' + entryid +'&sessionid='+sessionid,
		async : false,
		beforeSend : function(data, textStatus) {// ajax 调用前执行
		},
		success : function(data, textStatus) {
			if(data.result=="0"){
				result= false;
			}else{
				result= true;
			}
		},
		error : function(data, textStatus) {
			// ajax 失败后执行
			result= false;
		}
	});
	return result;
}
function showrecommendcode(){
	/*登录后判断用户是否展示推荐码，
	2017/01/12 接到紧急需求推荐码下架，
	和陈昊确认将此处注掉，如后期推荐码继续上线，放开即可
	修改人 岳聚霞
	2018/01/22 街道需求，放开验证码 需求提出肖楠 ，修改岳聚霞*/
	if(!checkNatureEntryID()){
				$("#recommendcodediv").css('display','none');
			}else{
				$("#recommendcodediv").css('display','true');
			}
}
function cleanPost(){
	//电子发票不开保单
	if($('#eflag').val()=='000'){
		$("#input_sendJAddress").val("");
		$("#input_sendPost").val("");
		$("#input_sendMobile").val("");
		$("#input_sendName").val("");
		$("#input_invoiceTile").val("");
		$("#input_sendQAddress").val("");
	}
	//电子发票电子保单
	if($('#eflag').val()=='020'){
		$("#input_sendJAddress").val("");
		$("#input_sendPost").val("");
		$("#input_sendMobile").val("");
		$("#input_sendName").val("");
	}
	if($("#eflag").val()=="100"){
		$("#input_invoiceTile").val("");
	}
}
/*****************推荐码校验end********************************************/
/*****************规范归属机构start******************************************/
function checkMakeComCode(){
	var flag = true;
	if($("#productcode").val()!="SEZJ"&&$("#productcode").val()!="BWSJ"){//健康险的不走这个流程
		var areaCode = $("#areacode").val();
		if(areaCode != "" && areaCode != undefined){
			$.ajax({
			     url : "/eproperty/displayInfo/checkMakeComCode.do",
			    type : "post",
			dataType : "json",
			    data : "areaCode="+areaCode,
			   async : false,
			 success : function(data){
				 if(data.result != "success"){
					rollToPos("cityname");
					showValidateResultNew("cityname", "该城市信息维护中请拨打400-1234567电话投保");
					$("#comcodeSelect").hide();
					flag = false;
				 }
			 }
			
			});
		}
	}
	return flag;
}
/*****************规范归属机构end********************************************/
//投保人手机效验
function checkInsuredMobile(id) {
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == ""||$.trim($("#" + id).val()) == "请输入被保险人手机号码") {
		if($("#productcode").val() == "JCA"){
			showValidateResultBtm(id, "手机号码不能为空");
			return false;
		}
	} else {
		var strMobile = $("#" + id).val();
		mobile_Flag = false;
		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
		if("JCO"==$("#productcode").val()){
			reg0 = /^1[3|4|5|7|8]\d{9}$/;
		}
		if (reg0.test(strMobile)) {
			mobile_Flag = true;
		} else {
			mobile_Flag = false;
		}
		if (mobile_Flag) {
			showValidateResultBtm(id, "");
			return true;
		} else {
			showValidateResultBtm(id, "请输入正确的手机号码");
			return false;
		}
	}
	showValidateResultBtm(id, "");
	return true;
}
//根据身份证号码验证性别
function checkInsuredIdentifyNumberSex(typeId,numId,sexId,flag) {
	var identifyType = $('#'+typeId).val();
	var identiyId = $("#"+numId).val();
	if ((identifyType=="01" || identifyType=="02" || identifyType=="17") && ""!=identiyId && "请输入证件号码"!=identiyId) {
		//验证是否为身份证
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sSex = 1;
			if (identiyId.length == 15) {
				sSex = identiyId.substring(14, 15) % 2;
			} else if (identiyId.length == 18) {
				sSex = identiyId.substring(14, 17) % 2;
			}
			var sex = $("#"+sexId).val();// 性别 ;
			if (sSex == 0) {
				sSex = 2;
			}
			if (sSex != sex) {
				if(identifyType=="01"){
					showValidateResultNew("sexSel"+flag, "请确认信息与身份证一致");
				}else{
					showValidateResultNew("sexSel"+flag, "请确认信息与证件一致");
				}
				
				return false;
			} else {
				showValidateResultNew("sexSel"+flag, "");
				return true;
			}
		} else {
			showValidateResultNew("sexSel"+flag, "");
			if(identifyType!="01" && "请输入正确的身份证号码"==msg){
				showValidateResultNew(numId, "请输入正确的证件号");
			}else{
				showValidateResultNew(numId, msg);
			}
			return false;
		}
	}
	showValidateResultNew("sexSel"+flag, "");
	return true;
}

/***********************************营改增中，创业保和随车行李险选择组织机构并且选择开具发票弹出弹层start********************************************/
/**
 * @title invoiceRatePopVali
 * @description 营改增中，创业保和随车行李险，如果选择组织机构并且选择开具发票，需要弹出弹层提示用户
 * 				判断是否需要弹出弹层，如果true弹出，false不弹出。
 * @author yuejuxia
 * @returns {Boolean}
 */
function invoiceRatePopVali(){
	var companyType = $("#input_applyIndentifyType").val();
	var eflag = $("#eflag").val();
	if(""!=companyType && undefined!=companyType && ""!=eflag && undefined!=eflag){
		var openInvoice = eflag.substring(1,2);
		if("31"==companyType && "1"==openInvoice){
			return true;
		}
	}
	return false;
}
/**
 * @description 验证发票信息
 * @author wuzhiwei
 * @returns {Boolean}
 */
function checkInvoice(){
	
		if($("#eflag").val()=="010"||$("#eflag").val()=="100"||$("#eflag").val()=="120"|| $("#eflag").val()=="110" ||$("#isgrantvisa").val()=="1"){
			if ($.trim($("#input_sendName").val()) == ""){
				rollToPos("input_sendName");
				showValidateResultNew("input_sendName", "收件人姓名不能为空");
				return false;
			}
			
			if ($.trim($("#mailcityname").val()) == ""||$.trim($("#mailareacode").val()) == ""){
				rollToPos("mailcityname");
				showValidateResultNew("mailcityname", "邮件寄送省市不能为空");
				return false;
			}
			
			
			if ($.trim($("#input_sendJAddress").val()) == ""||$.trim($("#input_sendJAddress").val()) == "请精确到门牌号"){
				rollToPos("input_sendJAddress");
				showValidateResultTextarea("input_sendJAddress", "详细地址不能为空");
				return false;
			}
			
			if ($.trim($("#input_sendPost").val()) == ""){
				rollToPos("input_sendPost");
				showValidateResultNew("input_sendPost", "邮政编码不能为空");
				return false;
			}
			if ($.trim($("#input_sendMobile").val()) == ""){
				rollToPos("input_sendMobile");
				showValidateResultNew("input_sendMobile", "手机号码不能为空");
				return false;
			}
			if($("#eflag").val()!="100"){
				if ($.trim($("#input_invoiceTile").val()) == ""){
	//				$("#input_invoiceTile").focus();			
					rollToPos("input_invoiceTile");
					showValidateResultNew("input_invoiceTile", "发票抬头不能为空");
					return false;
				}
			}
			if(!checkSendAddress("input_sendJAddress")){
				rollToPos("input_sendJAddress");
				return false;
			}	
			if(!checkPostCode("input_sendPost")){// 邮政编码
				rollToPos("input_sendPost");
				return false;
			}
			if($("#oldproposalno").val()!=""){
				if(!checkApplyMobile("input_sendMobile")){// 手机号码
					rollToPos("input_sendMobile");
					return false;
				}
			}else{
				if(!checkApplyMobile("input_sendMobile")){// 手机号码
					rollToPos("input_sendMobile");
					return false;
				}
			}
			if(!checkSendName("input_sendName")){
				rollToPos("input_sendName");
				return false;
			}	
			//注释掉发票抬头验证
//			if($("#eflag").val()!="100"){
//				if(!checkInvoiceTile("input_invoiceTile")){
//					rollToPos("input_invoiceTile");
//					return false;
//				}	
//			}
			//电子发票，电子保单时需要填写发票抬头
			
		}else if($("#eflag").val()=="020"){
			if ($.trim($("#input_invoiceTile").val()) == ""){
				rollToPos("input_invoiceTile");
				showValidateResultNew("input_invoiceTile", "发票抬头不能为空");
				return false;
			}
			if(!checkInvoiceTile("input_invoiceTile")){
				rollToPos("input_invoiceTile");
				return false;
			}	
		}
/**		edit by yuejuxia 国内自驾游不填写投保人邮箱地址时，点击提交订单，验证有问题，但是不会显示提示信息
 * 		查看后发现此处有多余的投保人信息验证
 * if(!checkApplyName("input_applyName")){
			rollToPos("input_applyName");
			return false;
		}
		if(!checkApplyIdentifyNumberSex()){
			rollToPos("input_applyName");
			return false;
		}
		
		if(!checkApplyNumber("input_applyIdentifyNumber")){
			rollToPos("input_applyIdentifyNumber");
			return false;
		}
		if($("#oldproposalno").val()!=""){
			if(!checkApplyMobile("input_applyMobile")){
				rollToPos("input_applyMobile");
				return false;
			}
		}else{
			if(!checkApplyMobile("input_applyMobile")){
				rollToPos("input_applyMobile");
				return false;
			}
		}
		if(!checkApplyEmail("input_applyEmail")){
			rollToPos("input_applyEmail");
			return false;
		}
		*/
		if($("input:radio[name=fp][checked]").val()=="1"||$("input:radio[name=fp][checked]").val()=="3"){
			if(!checkSendAddress("input_sendJAddress")){
				rollToPos("input_sendJAddress");
				return false;
			}	
			
			if(!checkSendName("input_sendName")){
				rollToPos("input_sendName");
				return false;
			}	
			//注释掉发票抬头验证
//			if(!checkInvoiceTile("input_invoiceTile")){
//				rollToPos("input_invoiceTile");
//				return false;
//			}	
		}
		return true;
	
}
/***********************************营改增中，创业保和随车行李险选择组织机构并且选择开具发票弹出弹层end********************************************/
/***********************************航空行李险新增验证start********************************************/
/**
 * @description 校验航班号
 * @param id
 * @returns {Boolean}
 * @author yuejuxia
 */
  function checkcertificateno(id){
	var certificateno = $("#certificateno").val();
	var pattern = /^[0-9A-Za-z]+$/;
	var flag = pattern.test(certificateno);
	if (certificateno==""||certificateno=="请输入您乘坐的航班号"){
		if($("#productcode").val()!="ECR"){
			msg = "请输入您乘坐的航班号";
			showValidateResultNew(id,msg);
			return false;
		}
	}else if (!flag||certificateno.length>6) {
		msg = "请输入正确的航班号";
		showValidateResultNew(id,msg);
		return false;
	}
//	$("#blNo").val($("#certificateno").val());
//    $("#"+id).nextAll().remove();
	return true;	
}
 /**
  * @description 校验目的地
  * @param id
  * @returns {Boolean}
  * @author yuejuxia
  */
 function checkDestination(id){
		$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
		var specialStr = "['%;]";
		var reg4="[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘’；：”“'\"。，、？《》+\\\\]";

		if ($.trim($("#"+id).val()) == ""){
			msg = "请输入您的目的地";
			showValidateResultNew(id,msg);
			return false;
		}
		if(pcbytes($("#"+id).val())>40){
			msg = "目的地信息过长";
			showValidateResultNew(id,msg);
			return false;
		}
		if(($("#"+id).val()).match(reg4)){
			msg = "您输入的目的地有误，请重新输入";
			showValidateResultNew(id,msg);
			return false;
		}
//		$("#"+id).nextAll().remove();
//		$("#endsiteName").val($("#businesssite").val());
		showValidateResultNew(id,"");
		return true;
	}
 function checkCityISNull(){
	 if($.trim($("#cityname").val()) == ""||$("#areacode").val()==""){
			showValidateResultNew("cityname", "请选择您所在的城市");
			return false;
		} 
	 return true;
 }
 
 
//被保人手机效验
 function checkApplyToMobileforHealth(id) {
 	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
 	if ($.trim($("#" + id).val()) == "") {
 		showValidateResultNew(id, "投保人手机号不能为空");
 		return false;
 	} else {
 		var strMobile = $("#" + id).val();
 		mobile_Flag = false;
 		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
 		if (reg0.test(strMobile)) {
 			mobile_Flag = true;
 		} else {
 			mobile_Flag = false;
 		}
 		if (mobile_Flag) {
 			showValidateResultNew(id, "");
 			return true;
 		} else {
 			showValidateResultNew(id, "请输入正确的手机号码");
 			return false;
 		}
 	}
 	return true;
 }
//被保人手机效验
 function checkApplyToMobile(id) {
 	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
 	if ($.trim($("#" + id).val()) == "") {
 	} else {
 		var strMobile = $("#" + id).val();
 		mobile_Flag = false;
 		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
 		if (reg0.test(strMobile)) {
 			mobile_Flag = true;
 		} else {
 			mobile_Flag = false;
 		}
 		if (mobile_Flag) {
 			showValidateResultNew(id, "");
 			return true;
 		} else {
 			showValidateResultNew(id, "请输入正确的手机号码");
 			return false;
 		}
 	}
 	return true;
 }
 /***********************************航空行李险新增验证end********************************************/

 /*******************************赠送活动start********************************************/
  function checkApplyNameGift(id) {
	var value = ($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '') ;
	if($("#"+id).val() != value){
		$("#" + id).val(value);
	}
	if ($.trim($("#" + id).val()) == "") {
	}
	if (pcbytes($("#" + id).val()) > 30) {
		showValidateResultGift(id, "姓名过长");
		return false;
	}
	if (($("#" + id).val()).match(reg4) || ($("#" + id).val()).toString().indexOf("_") > -1) {
		showValidateResultGift(id, "请输入正确的姓名");
		return false;
	}
	showValidateResultGift(id, "");
	return true;
}

//被保险人！！身份证号码效验
function checkIdentifyNumberGift(id) {
	
	var replace_idno=($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, '');
	if($("#" + id).val() != replace_idno){
		$("#" + id).val(replace_idno);
	}
	if (pcbytes($("#" + id).val()) > 18) {
		showValidateResultGift(id, "请输入正确的身份证号码");
		return false;
	}
	if (($("#" + id).val()).match(reg7)) {
		showValidateResultGift(id, "请输入正确的身份证号码");
		return false;
	}
	
	if ($('#'+id).val() != "") {
		var identiyId = $("#"+id).val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			$("#"+id).val($("#"+id).val().toUpperCase());
//			checkIdentifyNumberSex("");
		}else{
			showValidateResultGift(id, msg);
			return false;
		}
	}
	if(!checkBirthdayGift(id)){
		return false;
	}
	showValidateResultGift(id, "");
	return true;
}
//投保人手机效验
function MobileGift(id) {
	
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) != "") {
		var strMobile = $("#" + id).val();
		mobile_Flag = false;
		var reg0 = /^1[3|4|5|6|7|8|9]\d{9}$/;
		if (reg0.test(strMobile)) {
			mobile_Flag = true;
		} else {
			mobile_Flag = false;
		}
		if (mobile_Flag) {
			showValidateResultGift(id, "");
			return true;
		} else {
			showValidateResultGift(id, "请输入正确的手机号码");
			return false;
		}
	}
	return true;
}

//根据被保人身份证号码验证性别 --eal留学生
function checkInsuredIdentifyNumberSex_() {
	if (("01" == $('#input_identifytype').val() || "02" == $('#input_identifytype').val() || "17" == $('#input_identifytype').val())
			&& $('#input_identifyNumber').val() != ""
				&& $('#input_identifyNumber').val() != "请输入证件号码") {
		var identiyId = $("#input_identifyNumber").val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sId = $('#input_identifyNumber').val();
			var sSex = 1;
			if (sId.length == 15) {
				sSex = sId.substring(14, 15) % 2;
			} else if (sId.length == 18) {
				sSex = sId.substring(14, 17) % 2;
			}
			var sex = $("#input_insuredSexmType").val();// 性别 ;
			if (sSex == 0) {
				sSex = 2;
			}
			if (sSex != sex) {
				var errorTipsSex = "请确认信息与证件一致";
				if("01" == $('#input_identifytype').val()){
					errorTipsSex = "请确认信息与身份证一致";
				}
				showValidateResultNew("sexSel_", errorTipsSex);
				return false;
			} else {
				showValidateResultNew("sexSel_", "");
				return true;
			}
		} else {
			showValidateResultNew("sexSel_", "");
			if("01" != $('#input_identifytype').val()  && "请输入正确的身份证号码"==msg){
				showValidateResultNew("input_identifyNumber", "请输入正确的证件号");
			}else{
				showValidateResultNew("input_identifyNumber", msg);
			}
			return false;
		}
	}
	showValidateResultNew("sexSel_", "");
	return true;
}

//投保人身份证号码效验
function checkIdentifyNumber_(id) {
	var productcode = $("#productcode").val();
	$("#" + id).val(($("#" + id).val()).replace(/(^\s*)|(\s*$)/g, ''));
	if ($.trim($("#" + id).val()) == "") {
	}
	if(!("EAC_S"==productcode||"EAC_L"==productcode)){
		if (pcbytes($("#" + id).val()) > 18) {
			showValidateResultNew(id, "被保人证件号码过长");
			return false;
		}
	}
	if ($('#input_identifytype').val() == "99"
			|| $('#input_identifytype').val() == "31") {
		if ($("#riskcode").val() == "YEJ") {// YEJ证件为组织机构时，证件号码长度为9位，-不占位
			var b = ($("#" + id).val()).replace(/-/g, "");
			var regExp = /^[0-9a-zA-Z-]+$/;
			if (pcbytes(b) > 9) {
				showValidateResultNew(id, "投保人证件号码过长");
				return false;
			}
			if (regExp.test($("#" + id).val())) {
				showValidateResultNew(id, "");
			} else {
				showValidateResultNew(id, "请输入正确的证件号");
				return false;
			}
		}if (($("#" + id).val()).match(reg7)) {
			showValidateResultNew(id, "请输入正确的证件号");
			return false;
		}
	} else if($('#input_identifytype').val() == "16" && $("#" + id).val() != "" &&$("#" + id).val() != "请输入证件号码"){
		if(!($("#" + id).val()).match(wgrReg)){
			showValidateResultNew(id, "请输入正确的证件号");
			return false;
		}
		
	} else if ($('#input_identifytype').val() == "33"){
		if (pcbytes($("#" + id).val()) > 15) {
				showValidateResultLEFBtm(id, "税务登记证号码过长");
			return false;
		}
		if(!($("#" + id).val()).match(companyLicensenumReg)&& $("#"+id).val() != "请输入证件号码"){
			showValidateResultNew(id, "请输入正确的税务登记证号码");
			return false;
		}
	} else if ($('#input_applyIndentifyType').val() == "34"){
		if (pcbytes($("#" + id).val()) > 30) {
			showValidateResultLEFBtm(id, "营业执照号码过长");
			return false;
		}
		if(!($("#" + id).val()).match(companyLicensenumReg)&& $("#"+id).val() != "请输入证件号码"){
			showValidateResultNew(id, "请输入正确的营业执照号码");
			return false;
		}
	} else if (($("#" + id).val()).match(reg7)) {
		showValidateResultNew(id, "请输入正确的证件号");
		return false;
	}
	if (("01" == $('#input_identifytype').val() || "02" == $('#input_identifytype').val() || "17" == $('#input_identifytype').val())
			&& $('#input_identifyNumber').val() != "" && $('#input_identifyNumber').val() != "请输入证件号码") {
		var identiyId = $("#input_identifyNumber").val();
		$('#input_identifyNumber').val($('#input_identifyNumber').val().toUpperCase());
		var msg = isCardID(identiyId);
		if (msg == "true") {
				
		
		} else {
			if("01"!=$('#input_identifytype').val() && "请输入正确的身份证号码"==msg){
				showValidateResultNew(id, "请输入正确的证件号");
			}else{
				showValidateResultNew(id, msg);
			}
			return false;
		}
	}
	showValidateResultNew(id, "");
	return true;
}

//被保险人！！身份证号码效验
function checkModifyIdentifyNumber(id) {
		var id="modify_identifyNumber";
		$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
		if ($.trim($("#"+id).val()) == ""){
		}
		if(pcbytes($("#"+id).val())>18){
			showValidateResultBtm(id,"请输入正确的证件号码");
			return false;
		}else if(($("#"+id).val()).match(reg7)) {
			showValidateResultBtm(id,"请输入正确的证件号");
			return false;
			}
		if("16"==$("#modify_insuredIndentifyType").val() && $("#"+id).val() !=""){
			if(!($("#"+id).val()).match(wgrReg)){
				showValidateResultBtm(id,"请输入正确的证件号");
				return false;
			}
		}
		if(("01"==$("#modify_insuredIndentifyType").val() || "02"==$("#modify_insuredIndentifyType").val() || "17"==$("#modify_insuredIndentifyType").val())&&$('#modify_identifyNumber').val()!=""){
			$('#modify_identifyNumber').val($('#modify_identifyNumber').val().toUpperCase());
			var identiyId=$("#modify_identifyNumber").val();
			var msg=isCardID(identiyId);
			if("ZXF" != $('#productcode').val() ){
				if(msg=="true"){
					
				}else{
					if("01"!=$("#modify_insuredIndentifyType").val() && "请输入正确的身份证号码"==msg){
						showValidateResultBtm(id,"请输入正确的证件号");
					}else{
						showValidateResultBtm(id,msg);
					}
					return false;
				}
			}
		}
		if("ZXF" != $('#productcode').val() ){
			// 判断输入的出生日期是否与身份证一致
			if(($('#modify_insuredIndentifyType').val()=="01" || $('#modify_insuredIndentifyType').val()=="02" || $('#modify_insuredIndentifyType').val()=="17")&&
					$('#modify_identifyNumber').val()!=""){
				var sId=$('#modify_identifyNumber').val();
				var sBirthday;
				if(sId.length==15){
					sBirthday="19"+sId.substr(6,2)+"/"+sId.substr(8,2)+"/"+sId.substr(10,2);
				}else{
					sBirthday=sId.substr(6,4)+"/"+sId.substr(10,2)+"/"+sId.substr(12,2);
				}
				var birthday=$('#modify_insuredBirthday').val();
				if(sBirthday!=birthday){
					if($('#modify_insuredIndentifyType').val()=="01"){
						showValidateResultBtm(id, "请确认信息与身份证一致");
					}else{
						showValidateResultBtm(id, "请确认信息与证件一致");
					}
					
					return false ;
				}
			}
			showValidateResultBtm("modify_insuredBirthday","");
			checkIdentifyNumberSexModified();
		}
		showValidateResultNew(id,"");
		return true;
	}

function checkBusinessdetail(id){
	if(($("#" + id).val()).match(reg7)) {
		showValidateResultNew(id, "请输入正确的学校名称");
		return false;
	}else if(pcbytes($("#" + id).val()) > 40){
		showValidateResultNew(id, "留学学校名称在20字以内");
		return false;
	}
	else {
		showValidateResultNew(id, "");
		return true;
	}
}

//校验修改身份证性别  针对eal
function checkModifyIdentifyNumberSex_() {
	if (($('#modify_insuredIndentifyType').val() == "01" || $('#modify_insuredIndentifyType').val() == "02" || $('#modify_insuredIndentifyType').val() == "17")
			&& $('#modify_identifyNumber').val() != ""
				&& $('#modify_identifyNumber').val() != "请输入证件号码") {
		var identiyId = $("#modify_identifyNumber").val();
		var msg = isCardID(identiyId);
		if (msg == "true") {
			// 根据身份证校验出生日期
			var sId = $('#modify_identifyNumber').val();
			var sSex = 1;
			if (sId.length == 15) {
				sSex = sId.substring(14, 15) % 2;
			} else if (sId.length == 18) {
				sSex = sId.substring(14, 17) % 2;
			}
			var sex = $("#modify_sexm").val();// 性别 ;
			if (sSex == 0) {
				sSex = 2;
			}
			if (sSex != sex) {
				if($('#modify_insuredIndentifyType').val() == "01"){
					showValidateResultNew("modify_sex", "请确认信息与身份证一致");
				}else{
					showValidateResultNew("modify_sex", "请确认信息与证件一致");
				}
				return false;
			} else {
				showValidateResultNew("modify_sex", "");
				return true;
			}
		} else {
			showValidateResultNew("modify_sex", "");
			if("01" != $('#modify_insuredIndentifyType').val() && "请输入正确的身份证号码"==msg){
				showValidateResultNew("modify_identifyNumber", "请输入正确的证件号");
			}else{
				showValidateResultNew("modify_identifyNumber", msg);
			}
			
			return false;
		}
	}
	showValidateResultNew("modify_sex", "");
	return true;
}


//被保险人出生日期与身份证号效验
function checkModifyBirthday_(insuredid) {
	var id = "modify_insuredBirthday"+insuredid;
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
	var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
	var maxInsuredageUnit=maxInsuredage.charAt(maxInsuredage.length - 1);
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	
	var maxOldInsuredage=$("#MAXOLDINSUREDAGE").val();
	var maxOldInsuredageUnit=maxOldInsuredage.charAt(maxOldInsuredage.length - 1);
	maxOldInsuredage=maxOldInsuredage.substr(0,maxOldInsuredage.length-1);
	var oldProposalNo = $("#oldproposalno").val();
	if($("#riskcode").val()!="LAY"){
		hideTipsNew(id);
	}
	//EDD生日格式转换
	var inputDateBefore = $('#' + id).val();
	if($("#riskcode").val() == "EDD" ){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + id).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + id).val(inputDate);
		}
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultNew(id, "请输入正确的日期");
		if($("#riskcode").val() == "EDD" ){
			$('#' + id).val(inputDateBefore);
		}
		//$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	if ($.trim($('#modify_insuredBirthday').val()) == '') {
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#modify_insuredBirthday'+insuredid).val());
	var riskcode = $("#riskcode").val();
	// if (riskcode == "EAJ" || riskcode == "EAK") {
	if (!chkBirthdayNew(maxInsuredage, minInsuredage,maxInsuredageUnit,minInsuredageUnit, startdate, birthday)) {
			var tips= "年龄在" + minInsuredage;
			if ("M"==minInsuredageUnit) {
				tips += "个月";
			}if ("D"==minInsuredageUnit) {
				tips += "天";
			}
			tips = tips + "至" + maxInsuredage + "周岁之间";
			if(",ECK,YXL,YEHKM".indexOf($("#productcode").val())>-1){
				$("#_my97DP").hide();
			}
			showValidateResultNew(id, tips);
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (($('#modify_insuredIndentifyType'+insuredid).val() == "01" || $('#modify_insuredIndentifyType'+insuredid).val() == "02" || $('#modify_insuredIndentifyType'+insuredid).val() == "17") && $('#modify_identifyNumber'+insuredid).val() != ""&& $('#modify_identifyNumber'+insuredid).val() != "请输入证件号码") {
		var sId = $('#modify_identifyNumber'+insuredid).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+id).val();
		if (sBirthday != birthday) {
			if($('#modify_insuredIndentifyType'+insuredid).val() == "01"){
				showValidateResultNew(id, "请确认信息与身份证一致");
			}else{
				showValidateResultNew(id, "请确认信息与证件一致");
			}
			
			return false;
		}else{
			showValidateResultNew(id, "");
			if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
				var classname = $('#' + id).attr("class");
				$('#' + id).attr("class",classname);
			}
			return true;
		}
	}
	showValidateResultNew(id, "");
	if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
		var classname = $('#' + id).attr("class");
		$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}
//被保险人出生日期与身份证号效验
function checkModifyBirthday_ForEAL(insuredid) {
	var id = "modify_insuredBirthday"+insuredid;
	var minInsuredage=$("#MININSUREDAGE").val();
	var maxInsuredage=$("#MAXINSUREDAGE").val();
	var minInsuredageUnit=minInsuredage.charAt(minInsuredage.length - 1);
	var maxInsuredageUnit=maxInsuredage.charAt(maxInsuredage.length - 1);
	minInsuredage=minInsuredage.substr(0,minInsuredage.length-1);
	maxInsuredage=maxInsuredage.substr(0,maxInsuredage.length-1);
	
	var maxOldInsuredage=$("#MAXOLDINSUREDAGE").val();
	var maxOldInsuredageUnit=maxOldInsuredage.charAt(maxOldInsuredage.length - 1);
	maxOldInsuredage=maxOldInsuredage.substr(0,maxOldInsuredage.length-1);
	var oldProposalNo = $("#oldproposalno").val();
	if($("#riskcode").val()!="LAY"){
		hideTipsNew(id);
	}
	//EDD生日格式转换
	var inputDateBefore = $('#' + id).val();
	if($("#riskcode").val() == "EDD" ){
		var reg0 = /\d{8}$/;
		var inputDate = $('#' + id).val();
		if (inputDate.length == 8&&reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
			//inputDate = $('#' + id).val();
		} else if(inputDate.length == 10&&inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + id).val(inputDate);
		}
	}
	// 校验日期格式
	if (!(regexStr.test($('#' + id).val())) && $('#' + id).val() != '') {
		showValidateResultNew(id, "请输入正确的日期");
		if($("#riskcode").val() == "EDD" ){
			$('#' + id).val(inputDateBefore);
		}
		//$('#' + id).val("");
		$("#_my97DP").hide();
		return false;
	}
	if ($.trim($('#modify_insuredBirthday').val()) == '') {
	}
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#modify_insuredBirthday'+insuredid).val());
	var riskcode = $("#riskcode").val();
	// if (riskcode == "EAJ" || riskcode == "EAK") {
	if (!chkBirthdayNewForEAL(maxInsuredage, minInsuredage,maxInsuredageUnit,minInsuredageUnit, startdate, birthday)) {
			var tips= "年龄在" + minInsuredage;
			if ("M"==minInsuredageUnit) {
				tips += "个月";
			}if ("D"==minInsuredageUnit) {
				tips += "天";
			}
			tips = tips + "至" + maxInsuredage + "周岁之间";
			if(",ECK,YXL,YEHKM".indexOf($("#productcode").val())>-1){
				$("#_my97DP").hide();
			}
			showValidateResultNew(id, tips);
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (($('#modify_insuredIndentifyType'+insuredid).val() == "01" || $('#modify_insuredIndentifyType'+insuredid).val() == "02" || $('#modify_insuredIndentifyType'+insuredid).val() == "17") && $('#modify_identifyNumber'+insuredid).val() != ""&& $('#modify_identifyNumber'+insuredid).val() != "请输入证件号码") {
		var sId = $('#modify_identifyNumber'+insuredid).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+id).val();
		if (sBirthday != birthday) {
			if($('#modify_insuredIndentifyType'+insuredid).val() == "01"){
				showValidateResultNew(id, "请确认信息与身份证一致");
			}else{
				showValidateResultNew(id, "请确认信息与证件一致");
			}
			
			return false;
		}else{
			showValidateResultNew(id, "");
			if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
				var classname = $('#' + id).attr("class");
				$('#' + id).attr("class",classname);
			}
			return true;
		}
	}
	showValidateResultNew(id, "");
	if($("#riskcode").val() == "EDD" && $('#' + id).attr("class")!=null){
		var classname = $('#' + id).attr("class");
		$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}
//被保险人！！新样式
function checkModifyIdentifyNumber_(id) {
		var id="modify_identifyNumber";
		$("#"+id).val(($("#"+id).val()).replace(/(^\s*)|(\s*$)/g, ''));
		if ($.trim($("#"+id).val()) == ""){
		}
		if(pcbytes($("#"+id).val())>18){
			showValidateResultNew(id,"被保人证件号码过长");	
			return false;
		}else if(($("#"+id).val()).match(reg7)) {
			showValidateResultNew(id,"请输入正确的证件号");
			return false;
			}
		if($("#modify_insuredIndentifyType").val()=="16" && $.trim($("#"+id).val()) != ""){
			if(!($("#"+id).val()).match(wgrReg)){
				showValidateResultNew(id,"请输入正确的证件号");
				return false;
			}
		}
		if(($("#modify_insuredIndentifyType").val()=="01"||$("#modify_insuredIndentifyType").val()=="02" || $("#modify_insuredIndentifyType").val()=="17")&&$('#modify_identifyNumber').val()!=""){
			$('#modify_identifyNumber').val($('#modify_identifyNumber').val().toUpperCase());
			var identiyId=$("#modify_identifyNumber").val();
			var msg=isCardID(identiyId);
			if("ZXF" != $('#productcode').val() ){
				if(msg=="true"){
					
				}else{
					if($("#modify_insuredIndentifyType").val()!="01" && msg=="请输入正确的身份证号码"){
						showValidateResultNew(id,"请输入正确的证件号");
					}else{
						showValidateResultNew(id,msg);
					}
					return false;
				}
			}
		}
		showValidateResultNew(id,"");
		showValidateResultNew("modify_insuredBirthday","");
		return true;
	}

/*******************************赠送活动end********************************************/
/*******************************碎屏险start********************************************/
function checkPayMode(id){
	var payMode = $("#"+id).val();
	if("" != $.trim(payMode)){
		if(payMode.length > 30){
			showValidateResultBtm(id, "请录入正确的信息");
			return false;
		}
		if (payMode.match(reg7)) {
			showValidateResultBtm(id, "请录入正确的信息");
			return false;
		}
	}
	
	showValidateResultBtm(id,"");
	return true;
}
function checkIdentifier(id){
	var identifier = $("#"+id).val();
	if("" != $.trim(identifier)){
		if(identifier.length != 15){
			showValidateResultBtm(id, "请录入正确的信息");
			return false;
		}
		if (identifier.match(reg7)) {
			showValidateResultBtm(id, "请录入正确的信息");
			return false;
		}
	}
	showValidateResultBtm(id,"");
	return true;
}
function checkActivityTime(id,lastActivityDate,latestActivityDate){
	var reg0 = /\d{8}$/;
	var inputDate = $('#' + id).val();
	
	if("" != $.trim(inputDate)){
		var startdate = $("#"+lastActivityDate).val();
	    var enddate = $("#"+latestActivityDate).val();
	    if (inputDate.length==8 && reg0.test(inputDate)) {
			$("#_my97DP").hide();
			$('#' + id).val(inputDate.toString().substring(0,4)+"/"+inputDate.toString().substring(4,6)+"/"+inputDate.toString().substring(6,8));
	    } else if(inputDate.length==10 && inputDate.indexOf("/")==-1){
			if(inputDate.indexOf("-")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/-/g, "/")
			}
			else if(inputDate.indexOf(".")!=-1){
				$("#_my97DP").hide();
				inputDate = inputDate.replace(/\./g, "/")
			}
			$('#' + id).val(inputDate);
		}
	    inputDate = $('#' + id).val();
		if (!(regexStr.test(inputDate))) {
			$("#_my97DP").hide();
			showValidateResultBtm(id,"请选择正确的日期");
			$('#'+id).val("");
			return false;
		}
		if("" != $.trim(startdate)){
			if (inputDate < startdate) {
				$("#_my97DP").hide();
				showValidateResultBtm(id,"本产品只接受新机（发票日期和IMEI官网激活日期距投保日期不超过15日，以官网查询IMEI码激活日期为准）投保，在保险期间内，同一手机只能投保一次。");
				return false;
			}
		}
		if("" != $.trim(enddate)){
			if (inputDate > enddate) {
				$("#_my97DP").hide();
				showValidateResultBtm(id,"本产品只接受新机（发票日期和IMEI官网激活日期距投保日期不超过15日，以官网查询IMEI码激活日期为准）投保，在保险期间内，同一手机只能投保一次。");
				return false;
			}
		}
	}
	
	showValidateResultBtm(id,"");
	if($('#' + id).attr("class")!=null){
		var classname = $('#' + id).attr("class");
		$('#' + id).attr("class",classname.replace(/WdateFmtErr/g,""));
	}
	return true;
}
function checkPhoneMsg(){
	var subject = $("#input_subjectname").val();
	var remark = $("#input_remark").val();
	var standard = $("#input_standard").val();
	if("" == $.trim(subject)){
		rollToPos("input_subjectname");
		showValidateResultBtm("input_subjectname", "手机通讯设备品牌型号不能为空");
		return false;
	}
	if("" == $.trim(remark)){
		rollToPos("input_remark");
		showValidateResultBtm("input_remark", "手机通讯设备购买年份不能为空");
		return false;
	}
	if("" == $.trim(standard)){
		rollToPos("input_standard");
		showValidateResultBtm("input_standard", "手机通讯设备识别码(IMEI码查询方式)不能为空");
		return false;
	}
	if(!checkPayMode("input_subjectname")){
		rollToPos("input_subjectname");
		return false;
	}
	if(!checkIdentifier("input_standard")){
		rollToPos("input_standard");
		return false;
	}
	if(!checkActivityTime("input_remark","lastActivityDate","latestActivityDate")){
		rollToPos("input_remark");
		return false;
	}
	return true;
}

//投保人出生日期与身份证号效验
function checkApplyBirthday(birthId,identifyId,typeId) {
	var minApplydage=$("#MINAPPLYAGE").val();
	var minInsuredageUnit=minApplydage.charAt(minApplydage.length - 1);
	minApplydage=minApplydage.substr(0,minApplydage.length-1);
	var inputDateBefore = $('#' + birthId).val();
	
	var reg0 = /\d{8}$/;
	if (reg0.test(inputDateBefore)) {
		$("#_my97DP").hide();
		$('#' + birthId).val(inputDateBefore.toString().substring(0,4)+"/"+inputDateBefore.toString().substring(4,6)+"/"+inputDateBefore.toString().substring(6,8));
		inputDate = $('#' + birthId).val();
	} else if(inputDateBefore.length == 10&&inputDateBefore.indexOf("/")==-1){
		$("#_my97DP").hide();
		if(inputDateBefore.indexOf("-")!=-1){
			$("#_my97DP").hide();
			inputDateBefore = inputDateBefore.replace(/-/g, "/");
		}
		else if(inputDateBefore.indexOf(".")!=-1){
			$("#_my97DP").hide();
			inputDateBefore = inputDateBefore.replace(/\./g, "/");
		}
		$('#' + birthId).val(inputDateBefore);

	}
	// 校验日期格式
	if (!(regexStr.test($('#' + birthId).val())) && $('#' + birthId).val() != '') {
			showValidateResultNew(birthId, "请输入正确的日期");
		$("#_my97DP").hide();
		return false;
	}
	
	var startdate = $('#startdate').val();
	var birthday = $.trim($('#'+birthId).val());
	var riskcode = $("#riskcode").val();
	if (!chkBirthdayNewForEAA(minApplydage,minInsuredageUnit, startdate, birthday)) {
			var tips= "年龄必须大于" ;
			tips = tips +  minApplydage + "周岁";
				showValidateResultNew(birthId, tips);
			return false;
	}
	// 判断输入的出生日期是否与身份证一致
	if (($('#'+typeId).val() == "01" || $('#'+typeId).val() == "02" || $('#'+typeId).val() == "17") && $('#'+identifyId).val() != ""&& $('#'+identifyId).val() != "请输入证件号码") {
		var sId = $('#'+identifyId).val();
		var sBirthday;
		if (sId.length == 15) {
			sBirthday = "19" + sId.substr(6, 2) + "/" + sId.substr(8, 2) + "/" + sId.substr(10, 2);
		} else {
			sBirthday = sId.substr(6, 4) + "/" + sId.substr(10, 2) + "/" + sId.substr(12, 2);
		}
		var birthday = $('#'+birthId).val();
		if (sBirthday != birthday) {
			if($('#'+typeId).val() == "01"){
				showValidateResultNew(birthId, "请确认信息与身份证一致");
			}else{
				showValidateResultNew(birthId, "请确认信息与证件一致");
			}
				
			return false;
		}else{
			showValidateResultNew(birthId, "");
			return true;
		}
	}
	showValidateResultNew(birthId, "");
	return true;
}
/*******************************碎屏险end********************************************/

//产品名称，产品代码对应关系 ,type=1根据名称获取代码 chenying
function getNameOrCode(codeorname,type){
	var productcode = $("#productcode").val();
	var returnString = "";
	var idgroup = $.parseJSON($("#IdentifyTypeJson").val());
	if(type==1){
		if(("JAB_Z" == productcode || "LBB" == productcode) && codeorname =="回乡证"){
				returnString = "25";
		}else{
			$(idgroup).each(function(i,item){
				if(codeorname == idgroup[i].codecname){
					returnString = idgroup[i].codecode;
				}
			});
		}
	}else{
		if(("JAB_Z" == productcode || "LBB" == productcode) && codeorname =="25"){
			returnString = "回乡证";
		}else{
			$(idgroup).each(function(i,item){
				if(codeorname == idgroup[i].codecode){
					returnString = idgroup[i].codecname;
				}
			});
		}
	}
	return returnString;

}

//清除错误信息
function cleanErrorMsg(id){
	if($("#"+id).parent().hasClass('errorText')){
		$("#"+id).parent().removeClass('errorText');
	}
	if($("#"+id).parent().hasClass('errorText1')){
		$("#"+id).parent().removeClass('errorText1');
	}
	
	if($("#error_"+id)){
		$("#error_"+id).remove();
	}
}
