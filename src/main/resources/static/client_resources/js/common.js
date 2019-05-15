
/**
 * javascrpit 的replaceAll方法，常用
 */
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}
//.add 
Number.prototype.add = function(arg) {
	return accAdd(arg, this);
};
// .sub 
Number.prototype.sub = function(arg) {
	return Subtr(this, arg);
};
// .mul 
Number.prototype.mul = function(arg) {
	return accMul(arg, this);
};
//.div 
Number.prototype.div = function(arg) {
	return accDiv(this, arg);
};   

Number.prototype.ceil2point = function() {
	return Math.ceil((this.toFixed(4)*100).toFixed(2))/(100) ;
};   

//  加减乘除，不损失精度
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {		r1 = arg1.toString().split(".")[1].length;	} catch (e) {		r1 = 0;	}
	try {		r2 = arg2.toString().split(".")[1].length;	} catch (e) {		r2 = 0;	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1.mul(m) + arg2.mul(m)) / m;
}
function Subtr(arg1, arg2) {
	var r1, r2, m, n;
	try {		r1 = arg1.toString().split(".")[1].length;	} catch (e) {		r1 = 0;	}
	try {		r2 = arg2.toString().split(".")[1].length;	} catch (e) {		r2 = 0;	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1.mul(m) - arg2.mul(m)) / m).toFixed(n);
}
function accMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {		m += s1.split(".")[1].length;	} catch (e) {	}
	try {		m += s2.split(".")[1].length;	} catch (e) {	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
function accDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {		t1 = arg1.toString().split(".")[1].length;	} catch (e) {	}
	try {		t2 = arg2.toString().split(".")[1].length;	} catch (e) {	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2).mul(pow(10, t2 - t1));
	}
}
/**
 * 把回车转化成table的方法
 */
function enterToTab() {
	if (event.keyCode == 13)
		event.keyCode = 9;
}

// 替换字符串函数
function replace(strExpression, strFind, strReplaceWith) {
	var strReturn;
	var re = new RegExp(strFind, "g");
	if (strExpression == null)
		return null;
	strReturn = strExpression.replace(re, strReplaceWith);
	return strReturn;
}

// 去掉字符串头尾空格
function trim(s) {
	var strReturn;
	strReturn = leftTrim(s);
	strReturn = rightTrim(strReturn);
	return strReturn;
}
// 去掉字符串头空格
function leftTrim(strValue) {
	var re = /^\s*/;
	if (strValue == null)
		return null;

	strValue = "" + strValue;
	var strReturn = strValue.replace(re, "");

	return strReturn;
}
// 去掉字符串尾空格
function rightTrim(strValue) {
	var re = /\s*$/;
	if (strValue == null)
		return null;

	var strReturn = strValue.replace(re, "");

	return strReturn;
}

$(function(){
	//营改增判断如果支持多被保险人，则隐藏显示发票
	var input=$("#addInsuredTR_btn").val();
	//提示话语隐藏
	$("#eInvoiceMsg").hide();
	//发票抬头隐藏
	$("#input_invoiceTiledl").hide();
	if(input != null && input != ""){
		$("#invoiceHide").html("");
		$("#eInvoice").hide();
		$("#showWen").show();
	}
	if(input == null || input == ""){
		$("#eInvoice").show();
		$("#showWen").hide();
	}
	if(input ==undefined){
		$("#invoiceHide").html("");
		$("#eInvoice").hide();
		$("#showWen").show();
	}
});

