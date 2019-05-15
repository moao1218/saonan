
var DATE_DELIMITER="/";       //日期分隔符
Date.prototype.add = function(milliseconds){
    var m = this.getTime() + milliseconds;
    return new Date(m);
};
Date.prototype.addSeconds = function(second){
    return this.add(second * 1000);
};
Date.prototype.addMinutes = function(minute){
    return this.addSeconds(minute*60);
};
Date.prototype.addHours = function(hour){
    return this.addMinutes(60*hour);
};

Date.prototype.addDays = function(day){
    return this.addHours(day * 24);
};

Date.isLeepYear = function(year){
    return (year % 4 == 0 && year % 100 != 0)
};

Date.daysInMonth = function(year,month){
    if(month == 2){
        if(year % 4 == 0 && year % 100 != 0)
            return 29;
        else
            return 28;
    }
    else if((month <= 7 && month % 2 == 1) || (month > 7 && month % 2 == 0))
        return 31;
    else
        return 30;
};

Date.prototype.addMonth = function(){
    var m = this.getMonth();
    if(m == 11)return new Date(this.getFullYear() + 1,0,this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds());
    
    var daysInNextMonth = Date.daysInMonth(this.getFullYear(),this.getMonth() + 1);
    var day = this.getDate();
    if(day > daysInNextMonth){
        day = daysInNextMonth;
    }
    return new Date(this.getFullYear(),this.getMonth() + 1,day,this.getHours(),this.getMinutes(),this.getSeconds());    
};

Date.prototype.subMonth = function(){
    var m = this.getMonth();
    if(m == 0)return new Date(this.getFullYear() -1,12,this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds());
    var day = this.getDate();
    var daysInPreviousMonth = Date.daysInMonth(this.getFullYear(),this.getMonth());
    if(day > daysInPreviousMonth){
        day = daysInPreviousMonth;
    }
    return new Date(this.getFullYear(),this.getMonth() - 1,day,this.getHours(),this.getMinutes(),this.getSeconds());
};

Date.prototype.addMonths = function(addMonth){
    var result = this;
    if(addMonth > 0){
        while(addMonth > 0){
            result = result.addMonth();
            addMonth -- ;
        }
    }else if(addMonth < 0){
        while(addMonth < 0){
            result = result.subMonth();
            addMonth ++ ;
        }
    }
    return result;
};

Date.prototype.addYears = function(year){
    return new Date(this.getFullYear() + year,this.getMonth(),this.getDate(),this.getHours(),this.getMinutes(),this.getSeconds());
};

/**
 * 增加支持日期为yyyy-MM-dd hh:mm:ss 转换为正确日期 
 */
Date.format = function(dateText){
	return  new Date(Date.parse(dateText.replace(/-/g, "/"))); 
}

/**   
 * 对Date的扩展，将 Date 转化为指定格式的String   
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符   
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
 * eg:   
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04   
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04   
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04   
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18   
 */  
Date.prototype.pattern=function(fmt) {
    var o = {     
    "M+" : this.getMonth()+1, //月份     
    "d+" : this.getDate(), //日     
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时     
    "H+" : this.getHours(), //小时     
    "m+" : this.getMinutes(), //分     
    "s+" : this.getSeconds(), //秒     
    "q+" : Math.floor((this.getMonth()+3)/3), //季度     
    "S" : this.getMilliseconds() //毫秒     
    };     
    var week = {     
    "0" : "/u65e5",     
    "1" : "/u4e00",     
    "2" : "/u4e8c",     
    "3" : "/u4e09",     
    "4" : "/u56db",     
    "5" : "/u4e94",     
    "6" : "/u516d"    
    };     
    if(/(y+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));     
    }     
    if(/(E+)/.test(fmt)){     
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);     
    }     
    for(var k in o){     
        if(new RegExp("("+ k +")").test(fmt)){     
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
        }     
    }     
    return fmt;     
}


// 得到下n个年
function getNextYearFullDate(strDate, intCount) {
	var tempDate = new Date(strDate);
	if (intCount == null) {
		intCount = 1;
	}
	tempDate.setFullYear(tempDate.getFullYear() + intCount);
	var strReturn = convertFullDateToString(tempDate);
	return strReturn;
}

// huabg 计算天数差的函数，通用
function DateDiff(sDate1, sDate2) { // sDate1和sDate2是2002/12/18格式
	var aDate, sDate,eDate, iDays;
	aDate = sDate1.split("/")
	sDate = new Date(aDate[0] ,aDate[1] -1, aDate[2]);  
	aDate = sDate2.split("/");
	eDate = new Date(aDate[0] ,aDate[1] -1, aDate[2]); 
	iDays = parseInt(Math.abs(eDate - sDate) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数
	return iDays;
}
// 比较两个日期字符串
// date1=date2则返回0 , date1>date2则返回1 , date1<date2则返回-1
function compareFullDate(date1, date2) {
	var strValue1 = date1.split(DATE_DELIMITER);
	var date1Temp = new Date(strValue1[0], parseInt(strValue1[1], 10) - 1,
			parseInt(strValue1[2], 10));

	var strValue2 = date2.split(DATE_DELIMITER);
	var date2Temp = new Date(strValue2[0], parseInt(strValue2[1], 10) - 1,
			parseInt(strValue2[2], 10));

	if (date1Temp.getTime() == date2Temp.getTime())
		return 0;
	else if (date1Temp.getTime() > date2Temp.getTime())
		return 1;
	else
		return -1;
}
/**
 * 日期处理函数
 */
function getNextDateFullDate(strDate, intCount) {
	var tempDate = new Date(strDate);
	if (intCount == null) {
		intCount = 1;
	}
	var nextDateInMS = tempDate.getTime() + (intCount * 24 * 60 * 60 * 1000);
	var strReturn = convertFullDateToString(new Date(nextDateInMS));
	return strReturn;
}
// 得到日期的字符串表达形式，传入参数为Date类型
// 如果不传，则默认为当天
function convertFullDateToString(date) {
	if (date == null) {
		date = new Date();
	}
	var strDate = date.pattern("yyyy/MM/dd");
	return strDate;
}

//获取月龄
function getAgeInMonth(startDate,endDate){
	var number = 0;   
	var yearToMonth = (endDate.getFullYear() - startDate.getFullYear()) * 12;      
    number += yearToMonth;      
    var monthToMonth = endDate.getMonth() - startDate.getMonth();      
    number += monthToMonth; 
    if(endDate.getDate()<startDate.getDate()){
    	number--;
    }
	return number;
}

//获取年龄  不满周岁的按周岁算 e.g.几个月大的是一岁
function getAgeInYear(startDate,endDate){
	var number = endDate.getFullYear() - startDate.getFullYear()+1;      
    if(endDate.getMonth()<startDate.getMonth()){
    	number--;
    }else if(endDate.getMonth()==startDate.getMonth()){
        if(endDate.getDate()<startDate.getDate()){
    		number--;
   		}
    }
	return number;
}

function getAgeInDayfunction(startDate,endDate){
	var number =parseInt(Math.abs(startDate  -  endDate)  /  1000  /  60  /  60  /24)   
	return number;
}

//
function getNextMonthFullDate(strDate, intCount) {
	var tempDate = new Date(strDate);
	if (intCount == null) {
		intCount = 1;
	}
	var nextDateInMS = tempDate.addMonths(intCount);
	var strReturn = convertFullDateToString(new Date(nextDateInMS));
	return strReturn;
}