s_picc.debugTracking = false
s_picc.charSet = "UTF-8"
s_picc.currencyCode = "CNY"
s_picc.trackDownloadLinks = false
s_picc.trackExternalLinks = true
s_picc.trackInlineStats = false
s_picc.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s_picc.linkInternalFilters = "javascript:,epicc.com.cn"
s_picc.linkLeaveQueryString = false
s_picc.linkTrackVars = "None"
s_picc.linkTrackEvents = "None"
s_picc.codeVersion = "20180614";
s_picc.server = "epicc";
s_picc.fpCookieDomainPeriods = "3";
s_picc.usePlugins = true;
var doPluginsFlag = 0;
var maxCodeLength = 3;
var maxCodeLength2 = 3;
var posLength = 3; // 广告位个数
var istDataObject = {};
var interactionDivs = {};
var interactionTarget = "";
var interactionSearchFlag = false;
var currentUrl = document.location.href;
//if(window.location!= window.top.location){s_picc.t=function(){}}

function s_doPlugins(s_picc) {
    try {
        doPluginsFlag = doPluginsFlag + 1;
        trkBasicInfo();
        //trkIPGeo();
        trkProductCode();
        trkExternalSearch();
        trkInteraction();
        //trkCityIp();
        trkHmCoords();
        trkPageObject();
    } catch (e) {
        _printDebugInfo(e);
    }
}

/**************plugins*****************/
/*
 * Plugin: getElement by attr
 * Description: 根据id或class获取元素，如：e("#id1") 获取id为id1的元素； e(".c1")获取class为c1的元素
 */
function e(item, eType) {
    var delimit = item.substr(0, 1);
    var exp = /\.|#/;
    if (exp.test(delimit)) {
        var attr = item.substr(1);
        if (attr && delimit == "#") {
            return document.getElementById(attr);
        } else if (attr && delimit == ".") {
            eType = eType ? eType : "div";
            return getFirstElementByAttr(eType, "class", attr);
        }
    }
}

/*
 * Plugin: getFirstElementByAttr
 * Description: 根据类型、属性类型、属性名称获取元素，如：getFirstElementByAttr("div", "class","c2")
 */
function getFirstElementByAttr(elementType, attr, attrName) {
    var elems = document.getElementsByTagName(elementType);
    for (var i = 0; i < elems.length; i++) {
        var elemAttrName = elems[i].getAttribute(attr);
        if (attr == "class" && !elemAttrName) {
            elemAttrName = elems[i].getAttribute("className");
        }
        if (elemAttrName == attrName) {
            return elems[i];
        }
    }
}

function ajaxPostMethod(url) {
    var ajax = false;
    try {
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
            if (ajax.overrideMimeType) {
                ajax.overrideMimeType("text/xml")
            }
        } else if (window.ActiveXObject) {
            try {
                ajax = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    ajax = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) { }
            }
        }
        if (document.location.protocol == "https:") {
            url = url.replace("http", "https");
        }
        ajax.open("POST", url, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    } catch (e) {
        _printDebugInfo(e)
    }
    return ajax;
}

function ajaxGetMethod(url) {
    var ajax = false;
    try {
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
            if (ajax.overrideMimeType) {
                ajax.overrideMimeType("text/xml")
            }
        } else if (window.ActiveXObject) {
            try {
                ajax = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    ajax = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) { }
            }
        }
        if (document.location.protocol == "https:") {
            url = url.replace("http", "https");
        }
        ajax.open("GET", url, true);
    } catch (e) {
        _printDebugInfo(e)
    }
    return ajax;
}

function _printDebugInfo(e) {
    if (window.console && window.console.log && e.message) console.log("ist: " + e.stack);
    //if(window.console){var a=1;}
}

function loadInteraction(env, space, target, callback) {
    try {
        if (doPluginsFlag == 1) {
            processCharaterCookie();
            interactionDivs["interaction"] = { space: space };
            interactionTarget = target;
            var d = document;
            var srpt = d.createElement("script");
            var l = d.getElementsByTagName('head');
            var p = l && l[0] ? l[0] : '';
            var src = "/campaign_f/nl/interactionProposal_picc.js?env=" + env + "&cb=" + callback;
            srpt.type = "text/javascript";
            srpt.id = "interactionProposalScript";
            srpt.src = src;
            if (p.firstChild) {
                p.insertBefore(srpt, p.lastChild)
            } else {
                p.appendChild(srpt)
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
}

function processCharaterCookie() {
    try {
        var currentCookie = document.cookie;
        var cookieArr = currentCookie.split("; ");
        for (var i = 0; i < cookieArr.length; i++) {
            var kv = cookieArr[i].split("=");
            if (/.*[\u4e00-\u9fa5].*/.test(kv[1])) {
                var encodeValue = encodeURI(kv[1]);
                document.cookie = kv[0] + '=' + encodeValue + ";path=/";
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
}

function trkProductCode() {
    try {
        var prodCode = "";
        if (s_picc.products && s_picc.products.indexOf("车险") == 0) {
            prodCode = "DAA";
        } else {
            var productcode = document.getElementById("productcode");
            if (productcode && productcode.value) {
                prodCode = productcode.value;
            }
        }
        if (prodCode) {
            s_picc.prop27 = prodCode;
            var count = localData_fx.get(prodCode);
            count = (count && !isNaN(count)) ? parseInt(count) + 1 : 1;
            if (s_picc.purchaseId) {
                count = 0;
            }
            localData_fx.set(prodCode, count);
            var code = localData_fx.get("code");
            if (!code) {
                localData_fx.set("code", prodCode);
            } else if (code.indexOf(prodCode) == -1) {
                code = code ? code + "::" + prodCode : prodCode;
                localData_fx.set("code", code);
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
}

function trkRecommendProductCode(prodRegx, prodKey) {
    try {
        var prodCode = "";
        if (s_picc.products && s_picc.products.indexOf("车险") == 0) {
            prodCode = "DAA";
        } else {
            var productcode = document.getElementById("productcode");
            if (productcode && productcode.value) {
                prodCode = productcode.value;
            }
        }
        if (prodCode) {
            prodRegx = prodRegx ? prodRegx : "None";
            var regx = new RegExp(prodRegx);
            var result = regx.exec(prodCode);
            if (result) {
                s_picc.Util.cookieWrite(prodKey, prodCode);
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
}

function trkInteraction() {
    try {
        var pathName = document.location.pathname;
        var code = localData_fx.get("code");
        if (pathName == "/" || pathName == "/cs/") {
            var searchKeyword = s_picc.Util.cookieRead("ist_sk");
            if (searchKeyword) {
                loadInteraction("eshOE6", "eshSPC6_1", searchKeyword, "trkInteraction_banner");
            } else {
                if (code) {
                    loadInteraction("eshOE6", "eshSPC6_1", s_picc.getVID(), "trkInteraction_product");
                } else {
                    loadInteraction("eshOE6", "eshSPC6_1", "default", "trkInteraction_banner");
                }
            }
        } else if (pathName == "/shop/") {
            if (code) {
                loadInteraction("eshOE6", "eshSPC6_1", s_picc.getVID(), "trkInteraction_product2");
            } else {
                loadInteraction("eshOE6", "eshSPC6_1", "default", "trkInteraction_banner2");
            }
        } else {
            var ist_regx = s_picc.Util.cookieRead("ist_regx");
            if (!ist_regx) {
                loadInteraction("eshOE6", "eshSPC6_1", "default", "trkRecommendProducts");
            } else {
                trkRecommendProductCode(ist_regx, "ist_prod");
            }
            var ist_regx2 = s_picc.Util.cookieRead("ist_regx2");
            if (!ist_regx2) {
                loadInteraction("eshOE6", "eshSPC6_1", "default", "trkRecommendProducts2");
            } else {
                trkRecommendProductCode(ist_regx2, "ist_prod2");
            }
        }

    } catch (e) {
        _printDebugInfo(e);
    }
}

function addEvent(node, type, listener) {
    try {
        if (node.addEventListener) {
            node.addEventListener(type, listener, false);
            return true
        } else if (node.attachEvent) {
            node['e' + type + listener] = listener;
            node[type + listener] = function () {
                node['e' + type + listener](window.event)
            };
            node.attachEvent('on' + type, node[type + listener]);
            return true
        }
        return false
    } catch (e) {
        _printDebugInfo(e);
    }
}

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s_picc.getNewRepeat = new Function("d", "cn", ""
    + "var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
    + "'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
    + "=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
    + "-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
    + "ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
s_picc.split = new Function("l", "d", ""
    + "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    + "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s_picc.getVID = new Function(""
    + "var s=this;var c=new Date;c.setTime(c.getTime()+5*365*24*60*60*1000);var a=localData_fx.get('vid');if(!a||a.length<10){a=s.Util.cookieRead('vid');if(!a){var b='abcdef1234567890'.spli"
    + "t('');for(var n=0;n<32;n++){a+=b[Math.round(Math.random()*(b.length"
    + "-1))]}if("
    + "!s.Util.cookieWrite('vid',a,c)){a=''}}localData_fx.set('vid', a);}if(!s.Util.cookieRead('vid'))s.Util.cookieWrite('vid',a,c);return a");
s_picc.getVisitNum = new Function("tp", "c", "c2", ""
    + "var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
    + "if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
    + "me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
    + "c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
    + "'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
    + "t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
    + "e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
    + "ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
    + "s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
    + ";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s_picc.dimo = new Function("m", "y", ""
    + "var d=new Date(y,m+1,0);return d.getDate();");
s_picc.endof = new Function("x", ""
    + "var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
    + "'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
    + "x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
    + "t;");
function _trkMouseClick(clickName) { try { s_picc.prop11 = clickName; s_picc.linkTrackVars = "products,prop11"; s_picc.tl(true, 'o', "trkMouseClick"); s_picc.clearVars() } catch (e) { _printDebugInfo(e) } }
function _trkIdentityInfo(name, mobile, email, certType, certNum) { try { if (name) { s_picc.eVar7 = name } if (mobile) { s_picc.eVar8 = mobile } if (email) { s_picc.eVar9 = email } if (certType) { s_picc.eVar10 = certType } if (certNum) { s_picc.eVar11 = certNum } if (name || mobile || email || certType || certNum) { s_picc.linkTrackVars = "products,eVar7,eVar8,eVar9,eVar10,eVar11"; s_picc.tl(true, 'o', "_trkIdentityInfo"); s_picc.clearVars() } } catch (e) { _printDebugInfo(e) } }
function _trkSubmitOrder(info) { try { if (info) { infoArr = info.split(","); if (infoArr.length > 3) { var certType = ""; var certNum = ""; var certArr = infoArr[1].split(":"); if (certArr.length == 2) { certType = certArr[0]; certNum = certArr[1] } _trkIdentityInfo(infoArr[0], infoArr[2], infoArr[3], certType, certNum) } } } catch (e) { _printDebugInfo(e) } }
function _trkNotInsuranceInfo(insureList) { try { s_picc.prop20 = insureList; s_picc.linkTrackVars = "products,prop20"; s_picc.tl(true, 'o', "_trkNotInsuranceInfo"); s_picc.clearVars() } catch (e) { _printDebugInfo(e) } }
function _trkInsuranceInfo(insureType, insureList) { try { s_picc.prop21 = insureType; s_picc.linkTrackVars = "products,prop21"; s_picc.tl(true, 'o', "_trkInsuranceInfo"); s_picc.clearVars() } catch (e) { _printDebugInfo(e) } }
function _trkPayType(payType) { try { s_picc.prop23 = payType; s_picc.linkTrackVars = "products,prop23"; s_picc.tl(true, 'o', "_trkPayType"); s_picc.clearVars() } catch (e) { _printDebugInfo(e) } }
function _trkInsurancePlan(taocanzuhe) { try { s_picc.prop16 = taocanzuhe; s_picc.linkTrackVars = "products,prop16"; s_picc.tl(true, 'o', "_trkInsurancePlan"); s_picc.clearVars() } catch (e) { _printDebugInfo(e) } }
function _trkTravelInsurance(taocanzuhe, toubaorenxinxi) { if (taocanzuhe && toubaorenxinxi) { infoArr = toubaorenxinxi.split(","); if (infoArr.length > 3) { var certType = ""; var certNum = ""; var certArr = infoArr[1].split(":"); if (certArr.length == 2) { certType = certArr[0]; certNum = certArr[1] } s_picc.eVar7 = infoArr[0]; s_picc.eVar8 = infoArr[2]; s_picc.eVar9 = infoArr[3]; s_picc.eVar10 = certType; s_picc.eVar11 = certNum } s_picc.prop16 = taocanzuhe; s_picc.linkTrackVars = "products,eVar7,eVar8,eVar9,eVar10,eVar11,prop16"; s_picc.tl(true, 'o', "trkTravelInsurance"); s_picc.clearVars() } }


// =============== 控件点击代码 ===============
function _istInvoker(args) {
    try {

        s_picc.clearVarstrkNotInsuranceInfo();
    } catch (e) {
        _printDebugInfo(e);
    }
}

var localData_fx = {
    hname: 'localUserData_fx',
    isLocalStorage: window.localStorage ? true : false,
    dataDom: null,

    initDom: function () { //初始化userData
        if (!this.dataDom) {
            try {
                this.dataDom = document.createElement('input');
                this.dataDom.type = 'hidden';
                this.dataDom.style.display = "none";
                this.dataDom.addBehavior('#default#userData');
                document.body.appendChild(this.dataDom);
                var exDate = new Date();
                exDate = exDate.getDate() + 365;
                this.dataDom.expires = exDate.toUTCString();
            } catch (ex) {
                return false;
            }
        }
        return true;
    },
    set: function (key, value) {
        if (this.isLocalStorage) {
            window.localStorage.setItem(key, value);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.setAttribute(key, value);
                this.dataDom.save(this.hname)
            }
        }
    },
    get: function (key) {
        if (this.isLocalStorage) {
            return window.localStorage.getItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                return this.dataDom.getAttribute(key);
            }
        }
    },
    remove: function (key) {
        if (this.isLocalStorage) {
            localStorage.removeItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                this.dataDom.removeAttribute(key);
                this.dataDom.save(this.hname)
            }
        }
    },
    isSupport: function () {
        return this.isLocalStorage || this.initDom();
    }
}

var hashMap = {
    set: function (key, value) { this[key] = value },
    get: function (key) { return this[key] },
    contains: function (key) { return this.Get(key) == null ? false : true },
    remove: function (key) { delete this[key] }
}


/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s_picc.doPlugins = s_doPlugins
s_picc.visitorNamespace = "picc"
s_picc.trackingServer = "www.epicc.com.cn/sensor"

// =============== 页面流量代码 ===============

//基本流量
function trkBasicInfo() {
    if (!s_picc.visitorID) {
        s_picc.visitorID = s_picc.getVID();
    }
    if (document.referrer) {
        s_picc.referrer = document.referrer.substring(0, 255);
    }
    s_picc.campaign = s_picc.Util.getQueryParam("cmpid");
    s_picc.eVar1 = s_picc.Util.getQueryParam("intid");
    s_picc.eVar2 = s_picc.codeVersion;
    s_picc.eVar3 = s_picc.getNewRepeat(365, 's_getNewRepeat');
    s_picc.eVar5 = document.location.pathname;
    s_picc.eVar12 = trkGroupBuyId();
    s_picc.eVar13 = s_picc.getVisitNum(365);
    s_picc.pageURL = trkCutUrl(); //截取指定长度的url，防止请求总长度超过2048
}

function trkCutUrl() {
    var cutUrl = "";
    try {
        if (currentUrl.length > 150) {
            var cutUrl = currentUrl.substring(0, 150);
            if (s_picc.campaign && cutUrl.indexOf("cmpid=" + s_picc.campaign) == -1) {
                cutUrl = cutUrl.replace(/[&]?cmpid=[^&#]*/, "");
                cutUrl += "&cmpid=" + s_picc.campaign;
            }
            if (s_picc.eVar1 && cutUrl.indexOf("intid=" + s_picc.eVar1) == -1) {
                cutUrl = cutUrl.replace(/[&]?intid=[^&#]*/, "");
                cutUrl += "&intid=" + s_picc.eVar1;
            }
            var id = s_picc.Util.getQueryParam("id");
            if (id && cutUrl.indexOf("?id=" + id) == -1 && cutUrl.indexOf("&id=" + id) == -1) {
                cutUrl = cutUrl.replace(/[&]?id=[^&#]*/, "");
                cutUrl += "&id=" + id;
            }
            var id2 = s_picc.Util.getQueryParam("ID");
            if (id2 && cutUrl.indexOf("?ID=" + id2) == -1 && cutUrl.indexOf("&ID=" + id2) == -1) {
                cutUrl += "&ID=" + id2;
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
    cutUrl = cutUrl ? cutUrl : currentUrl;
    return cutUrl;
}

function trkIPGeo() {
    try {
        var count = 0;
        var city = s_picc.Util.cookieRead("ist_geo");
        if (doPluginsFlag == 1) {
            if (!city && count == 0) {
                if (document.location.host == "www.epicc.com.cn") {
                    var protocol = document.location.protocol;
                    var ipSearchUrl = protocol + "//www.epicc.com.cn/ecar/ipsearch/ipSearch/ipSearch?time=" + new Date().getTime();
                    var ajaxHttp = ajaxGetMethodEship(ipSearchUrl);
                    ajaxHttp.onreadystatechange = function () {
                        if (ajaxHttp && ajaxHttp.readyState == 4 && ajaxHttp.status == 200) {
                            city = ajaxHttp.responseText;
                            if (city && city.length > 1) {
                                s_picc.Util.cookieWrite("ist_geo", city);
                                s_picc.eVar14 = encodeURI(city);
                            }
                        }
                    }
                    ajaxHttp.send();
                    count++;
                }
            } else {
                s_picc.eVar14 = encodeURI(city);
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
}


//获取团购链接id
function trkGroupBuyId() {
    var groupBuyId = s_picc.Util.getQueryParam("ID"); //车险团购链接ID
    if (!groupBuyId) {
        groupBuyId = s_picc.Util.getQueryParam("id"); //非车团购链接id
        if (!groupBuyId) {
            var referrer = document.referrer;
            if (referrer) {
                var regx = /.*[?&]id=([^&#]+).*/;
                var result = referrer.match(regx);
                if (result && result.length > 1) {
                    groupBuyId = result[1];
                }
            }
        }
    }
    return groupBuyId;
}


function trkExternalSearch() {
    try {
        var referrer = document.referrer;
        var seArray = [["www.haosou.com", "q", "haosou"], ["m.haosou.com", "q", "haosou"], ["m.baidu.com", "wd", "baidu"], ["m.baidu.com", "word", "baidu"], ["wap.baidu.com", "wd", "baidu"], ["wap.baidu.com", "word", "baidu"], ["www.sogou.com", "query", "sogou"], ["m.sogou.com", "keyword", "sogou"], ["wap.sogou.com", "keyword", "sogou"], ["www.youdao.com", "q", "youdao"], ["www.zhongsou.com", "w", "zhongsou"], ["p.zhongsou.com", "w", "zhongsou"], ["sg.search.yahoo.com", "p", "yahoo"], ["www.google.com", "q", "google"], ["cn.bing.com", "q", "bing"], ["m.sp.sm.cn", "q", "shenma"]];
        for (var i = 0; i < seArray.length; i++) {
            var seInfo = seArray[i];
            var exp = ".*" + seInfo[0] + ".*[?&]" + seInfo[1] + "=([^&#]+)" + ".*";
            var regx = new RegExp(exp);
            result = regx.exec(referrer);
            if (result && result.length > 1) {
                s_picc.eVar15 = seInfo[0];
                s_picc.eVar16 = seInfo[2];
                s_picc.eVar17 = result[1];
                var encodeSearchKeyword = encodeURI(result[1]).replace(/%/g, "");
                s_picc.Util.cookieWrite("ist_sk", encodeSearchKeyword);
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
}

function trkInternalSearch(keyword) {
    try {
        var encodeKeyword = encodeURI(keyword).replace(/%/g, "");
        s_picc.Util.cookieWrite("ist_sk", encodeKeyword);
        s_picc.eVar18 = keyword;
        s_picc.linkTrackVars = "eVar18";
        s_picc.tl(true, 'o', "trkInternalSearch");

    } catch (e) {
        _printDebugInfo(e);
    }
}


function ajaxGetMethodEship(url) {
    var ajax = false;
    try {
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
            if (ajax.overrideMimeType) {
                ajax.overrideMimeType("text/xml")
            }
        } else if (window.ActiveXObject) {
            try {
                ajax = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    ajax = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) { }
            }
        }
        ajax.open("GET", url, false);
    } catch (e) {
        _printDebugInfo(e)
    }
    return ajax;
}

//获取地理位置和ip（存入cookie）
function trkCityIp() {
    try {
        var count = 0;
        var eshipCookie = s_picc.Util.cookieRead("eship_ip");
        if (doPluginsFlag == 1) {
            if (!eshipCookie && count == 0) {
                if (document.location.host == "www.epicc.com.cn") {
                    var protocol = document.location.protocol;
                    var ipSearchUrl = protocol + "//www.epicc.com.cn/city_ip";
                    var ajaxHttp = ajaxGetMethodEship(ipSearchUrl);
                    var exTime = new Date;
                    exTime.setTime(exTime.getTime() + 24 * 60 * 60 * 1000);
                    ajaxHttp.onreadystatechange = function () {
                        if (ajaxHttp && ajaxHttp.readyState == 4 && ajaxHttp.status == 200) {
                            var obj = ajaxHttp.responseText;
                            if (obj) {
                                var content = obj;
                                var array = content.split("'");
                                content = array[3] + "," + array[7];
                                s_picc.Util.cookieWrite("eship_ip", content, exTime);//存入cookie
                                s_picc.eVar19 = encodeURI(array[7]);
                                s_picc.eVar20 = array[3];
                            }
                        } else {
                            s_picc.eVar19 = ajaxHttp.status + "";//不成功返回状态
                        }
                    }
                    ajaxHttp.send();
                    count++;
                }
            } else {
                var content = eshipCookie;
                var array = content.split(",");
                s_picc.eVar19 = encodeURI(array[1]);
                s_picc.eVar20 = array[0];
            }
        }
    } catch (e) {
        _printDebugInfo(e);
    }
}

//采集点击坐标 start
var continer = document.getElementsByTagName("body")[0];
addEvent(continer, "click", function(evt){
    addMouseClickListener(evt);
});
function addMouseClickListener(evt, type){
 if(evt){
    obj = evt.srcElement || evt.target;
  if(obj){
   var x = evt.pageX || (evt.clientX +(document.documentElement.scrollLeft|| document.body.scrollLeft));//采集点击x轴的坐标
   var y= evt.pageY || (evt.clientY +(document.documentElement.scrollTop|| document.body.scrollTop));//采集点击y轴的坐标
   var scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);//获取页面的总宽
   var borderWidth = Math.round((scrollWidth - 1250)/2); //获取主体部分左右侧的宽
       x=x-borderWidth;
       if(x <= 1250 && x > 0){
          var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
          var hm_clickCoords = x + "," + y+ ","+ scrollHeight+','+document.URL;
          s_picc.Util.cookieWrite('trkHmClickCoords', hm_clickCoords);
       }
  }
 }
}
function trkHmCoords(){
    if(document.referrer!=""){
        var hmClickCoords = s_picc.Util.cookieRead('trkHmClickCoords');
        if(hmClickCoords && hmClickCoords != "0"){
            s_picc.prop4 = hmClickCoords;
            s_picc.Util.cookieWrite('trkHmClickCoords', "0");
        }
    }
}

//采集点击坐标 end
function trkObject(obj, pageName) {
    var oldPageName = s_picc.pageName;
    if (pageName) {
        s_picc.pageName = pageName
    }
    var i = 0;
    var linkTrackVars = new Array();
    for (val in obj) {
        s_picc[val] = obj[val];
        linkTrackVars[i++] = val
    }
    s_picc.linkTrackVars = linkTrackVars.join(",");
    if (obj.events) {
        s_picc.linkTrackEvents = obj.events;
    }
    obj = {};
    s_picc.tl(true, "o", "trkObject");
    s_picc.pageName = oldPageName;
    s_picc.clearVars();
}

function addTrkEvents(event) {
    if (s_picc.events) {
        var myEventArr = event.split(",");
        for (var i = 0; i < myEventArr.length; i++) {
            var flag = true;
            var sEventArr = s_picc.events.split(",");
            for (var j = 0; j < sEventArr.length; j++) {
                if (myEventArr[i] == sEventArr[j]) {
                    flag = false;
                }
            }
            if (flag) {
                s_picc.events = s_picc.events + "," + myEventArr[i];
            }
        }
    } else {
        s_picc.events = event;
    }
}

function trkPageObject() {
    if (window.trkObj) {
        for (val in window.trkObj) {
            if (val != "events") {
                s_picc[val] = window.trkObj[val];
            } else {
                addTrkEvents(window.trkObj[val]);
            }
        }
    }
}
