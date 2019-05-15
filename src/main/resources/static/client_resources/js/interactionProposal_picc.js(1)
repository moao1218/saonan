function trkInteraction_banner(response) {
    try {
        var bannerUrl1 = "";
        var bannerUrl2 = "";
        var bannerUrl3 = "";
        var bannerUrl4 = "";
        if (response.indexOf('responseType:"0') > -1) {
            trkRecommendProducts(response);
            bannerUrl1 = response.split('FIRST:"')[1].split('"')[0];
            bannerUrl2 = response.split('DAA:"')[1].split('"')[0];
            bannerUrl3 = response.split('JAB_A:"')[1].split('"')[0];
            bannerUrl4 = response.split('LAY_J:"')[1].split('"')[0];
            var ist_sk = s_picc.Util.cookieRead("ist_sk");
			s_picc.Util.cookieWrite("ist_sk", "");
        } else {
            bannerUrl1 = response.split("pos1:\"")[1].split("\"")[0];
            bannerUrl2 = response.split("pos2:\"")[1].split("\"")[0];
            bannerUrl3 = response.split("pos3:\"")[1].split("\"")[0];
            bannerUrl4 = response.split("pos4:\"")[1].split("\"")[0];
        }
        changeHomeTopBanner(bannerUrl1, 0);
        changeHomeTopBanner(bannerUrl2, 1);
        changeHomeTopBanner(bannerUrl3, 2);
        changeHomeTopBanner(bannerUrl4, 3)
    } catch(e) {
        _printDebugInfo(e)
    }
}
function trkInteraction_banner2(response) {
    try {
        trkRecommendProducts2(response);
        var prod = "";
        var bannerUrl = "";
        for (var i = 0; i < posLength; i++) {
            prod = response.split('prod' + (i + 1) + ':"')[1].split('"')[0];
            bannerUrl = "http://" + prod.split("http://")[1];
            changeShopBanner(bannerUrl, "chanpin" + (i + 1))
        }
    } catch(e) {
        _printDebugInfo(e)
    }
}
function trkInteraction_product(response) {
    try {
        if (response.indexOf('responseType:"0') > -1) {
            trkRecommendProducts(response);
            var defaultKeys = response.split('defaultKeys:"')[1].split('"')[0];
            var defaultOrders = defaultKeys.split("|");  
            var products = {};
            products.JAB_A = response.split('JAB_A:"')[1].split('"')[0];
            products.DAA = response.split('DAA:"')[1].split('"')[0];
            products.FIRST = response.split('FIRST:"')[1].split('"')[0];
            products.LAY_J = response.split('LAY_J:"')[1].split('"')[0];
            var prodRegx = s_picc.Util.cookieRead("ist_regx");
            trkRecommendProductCode(prodRegx, "ist_prod");
            var weightCode = trkMaxWeightCode(maxCodeLength);
            var keys = new Array();
            keys[0] = "FIRST";
            for (var c = 0; c < weightCode.length; c++) {
                keys[c + 1] = weightCode[c];
            }
            for (var k = 0; k < keys.length; k++) {
                keys[k] = (keys[k] && products[keys[k]]) ? keys[k] : "None"
            }
            for (var i = 1; i < keys.length; i++) {
                if (i < keys.length - 1) {
                    if (keys[i] == "None") {
                        for (var j = i + 1; j < keys.length; j++) {
                            if (keys[j] != "None") {
                                keys[i] = keys[j];
                                keys[j] = "None";
                                break
                            }
                            if (j == keys.length - 1 && keys[j] == "None") {
                                keys[i] = getDefaultCode(keys, defaultOrders, products)
                            }
                        }
                    }
                } else {
                    if (keys[i] == "None") {
                        keys[i] = getDefaultCode(keys, defaultOrders, products)
                    }
                }
            }
            var banner = {};
            for (var len = 0; len < keys.length; len++) {
                banner["pos" + (len + 1)] = products[keys[len]];
            }
            changeHomeTopBanner(banner.pos1, 0);
            changeHomeTopBanner(banner.pos2, 1);
            changeHomeTopBanner(banner.pos3, 2);
            changeHomeTopBanner(banner.pos4, 3)
        }
    } catch(e) {
        _printDebugInfo(e)
    }
}
function trkInteraction_product2(response) {
    try {
        if (response.indexOf('responseType:"0') > -1) {
            trkRecommendProducts2(response);
            var defaultKeys = response.split('defaultKeys:"')[1].split('"')[0];
            var defaultOrders = defaultKeys.split("|");
            var adPosNumber = parseInt(response.split('adPosNumber:"')[1].split('"')[0]);
            var products = getUrlOfProducts(response);
            var prodRegx = s_picc.Util.cookieRead("ist_regx2");
            trkRecommendProductCode(prodRegx, "ist_prod2");
            var weightCode = trkMaxWeightCode(adPosNumber, "ist_prod2");
            var keys = new Array();
            for (var c = 0; c < weightCode.length; c++) {
                keys[c] = weightCode[c]
            }
            for (var k = 0; k < keys.length; k++) {
                keys[k] = (keys[k] && products[keys[k]]) ? keys[k] : "None"
            }
            keys = getTopProducts(keys, defaultOrders, products, weightCode);
            var banner = {};
            for (var len = 0; len < keys.length; len++) {
                changeShopBanner(products[keys[len]], "chanpin" + (len + 1))
            }
        }
    } catch(e) {
        _printDebugInfo(e)
    }
}
function trkRecommendProducts(response) {
    try {
        if (response.indexOf('responseType:"0') > -1) {
            var products = {};
            products.JAB_A = response.split('JAB_A:"')[1].split('"')[0];
            products.DAA = response.split('DAA:"')[1].split('"')[0];
            products.FIRST = response.split('FIRST:"')[1].split('"')[0];
            products.LAY_J = response.split('LAY_J:"')[1].split('"')[0];
            var prodRegx = "JAB_A|DAA|FIRST|LAY_J";
            s_picc.Util.cookieWrite("ist_regx", prodRegx);
            trkRecommendProductCode(prodRegx, "ist_prod")
        }
    } catch(e) {
        _printDebugInfo(e)
    }
}
function trkRecommendProducts2(response) {
    try {
        if (response.indexOf('responseType:"0') > -1) {
            var products = getUrlOfProducts(response);
            var prodRegx = "";
            for (prod in products) {
                prodRegx = prodRegx ? prodRegx + "|" + prod: prod
            }
            s_picc.Util.cookieWrite("ist_regx2", prodRegx);
            trkRecommendProductCode(prodRegx, "ist_prod2")
        }
    } catch(e) {
        _printDebugInfo(e)
    }
}
function trkMaxWeightCode(maxCodeLength, prodKey) {
    prodKey = prodKey ? prodKey: "ist_prod";
    var codeArray = "";
    var weightArray = new Array();
    try {
        var code = localData_fx.get("code");
        if (code) {
            var temp = "";
            codeArray = code.split("::");
            for (var len = 0; len < codeArray.length; len++) {
                weightArray[len] = localData_fx.get(codeArray[len]);
                if (!weightArray[len] || isNaN(weightArray[len])) {
                    weightArray[len] = 0
                }
            }
            for (var i = 0; i < weightArray.length; i++) {
                for (var j = i + 1; j < weightArray.length; j++) {
                    if (parseInt(weightArray[i]) < parseInt(weightArray[j])) {
                        temp = weightArray[i];
                        weightArray[i] = weightArray[j];
                        weightArray[j] = temp;
                        temp = codeArray[i];
                        codeArray[i] = codeArray[j];
                        codeArray[j] = temp
                    } else if (parseInt(weightArray[i]) == parseInt(weightArray[j])) {
                        if (codeArray[j] == s_picc.Util.cookieRead(prodKey)) {
                            temp = weightArray[i];
                            weightArray[i] = weightArray[j];
                            weightArray[j] = temp;
                            temp = codeArray[i];
                            codeArray[i] = codeArray[j];
                            codeArray[j] = temp
                        }
                    }
                }
            }
        }
        if (!codeArray) {
            codeArray = new Array();
            for (var i = 0; i < maxCodeLength; i++) {
                codeArray[i] = "None"
            }
        } else if (codeArray.length < maxCodeLength) {
            for (var j = 0; j < maxCodeLength; j++) {
                if (codeArray.length < maxCodeLength) {
                    codeArray[codeArray.length] = "None"
                }
            }
        }
    } catch(e) {
        _printDebugInfo(e)
    }
    return codeArray
}
function getTopProducts(keys, defaultOrders, products, weightCode) {
    try {
        for (var i = 0; i < keys.length; i++) {
            if (i < keys.length - 1) {
                if (keys[i] == "None") {
                    for (var j = i + 1; j < keys.length; j++) {
                        if (keys[j] != "None") {
                            keys[i] = keys[j];
                            keys[j] = "None";
                            break
                        }
                        if (j == keys.length - 1 && keys[j] == "None") {
                            keys[i] = getDefaultCode2(keys, defaultOrders, products)
                        }
                    }
                }
            } else {
                if (keys[i] == "None") {
                    keys[i] = getDefaultCode2(keys, defaultOrders, products)
                }
            }
        }
    } catch(e) {
        _printDebugInfo(e)
    }
    return keys
}
function getUrlOfProducts(response) {
    var products = {};
    try {
        if (response) {
            var prodNumber = response.split('prodNumber:"')[1].split('"')[0];
            var defaultKeys = response.split('defaultKeys:"')[1].split('"')[0];
            var defaultOrders = defaultKeys.split("|");
            if (prodNumber && !isNaN(prodNumber)) {
                prodNumber = parseInt(prodNumber);
                for (var i = 0; i < prodNumber; i++) {
                    var prod = response.split('prod' + (i + 1) + ':"')[1].split('"')[0];
                    productCode = prod.split(":")[0];
                    productUrl = "http://" + prod.split("http://")[1];
                    products[productCode] = productUrl
                }
            }
        }
    } catch(e) {
        _printDebugInfo(e)
    }
    return products
}
function getDefaultCode(keys, defaultOrders, products) {
    var defaultCode = "None";
    try {
        var exp = "";
        for (var i = 1; i < keys.length; i++) {
            keys[i] = keys[i] ? keys[i] : "None";
            exp = (i == 1) ? keys[i] : exp + "|" + keys[i]
        }
        var regx = new RegExp(exp);
        for (var j = 0; j < defaultOrders.length; j++) {
            var code = defaultOrders[j];
            if (products[code] && !regx.exec(code)) {
                return code
            }
        }
    } catch(e) {
        _printDebugInfo(e)
    }
    return defaultCode
}
function getDefaultCode2(keys, defaultOrders, products) {
    var defaultCode = "None";
    try {
        var exp = "";
        for (var i = 0; i < keys.length; i++) {
            keys[i] = keys[i] ? keys[i] : "None";
            exp = (i == 0) ? keys[i] : exp + "|" + keys[i]
        }
        var regx = new RegExp(exp);
        for (var j = 0; j < defaultOrders.length; j++) {
            var code = defaultOrders[j];
            if (products[code] && !regx.exec(code)) {
                return code
            }
        }
    } catch(e) {
        _printDebugInfo(e)
    }
    return defaultCode
}

function changeShopBanner(bannerUrl, li) {
    try {
        var ajax = ajaxGetMethod(bannerUrl);
        if (ajax) {
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    var response = ajax.responseText;
                    var replaceContent = response.split("<li>")[1].split("</li>")[0];
                    var replaceLi = document.getElementById(li);
                    if (replaceLi) {
                        replaceLi.innerHTML = replaceContent;
                        var anchords = replaceLi.getElementsByTagName("a");
                        if (anchords && anchords[0]) {
							var sym = anchords[0].href.indexOf("?") > -1 ? "&" : "?";
                            anchords[0].href = anchords[0].href + sym + "intid=shop-top-" + li;
                        }
                        var div = document.getElementById("experienceId");
                        div.style.display = ""
                    }
                }
            }
            ajax.send()
        }
    } catch(e) {
        _printDebugInfo(e)
    }
}

function changeHomeTopBanner(bannerUrl, index) {
    try {
        var ajax = ajaxGetMethod(bannerUrl);
        if (ajax) {
            ajax.onreadystatechange = function() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    var response = ajax.responseText;
					if(response && response.split('one><imgsrc=')[1]
								&& response.split('two><imgsrc=')[1]
								&& response.split('three>')[1]){
						response = response.replace(/\"/g, "");
						response = response.replace(/ /g, "");
						var splitContent = response.split('one><imgsrc=')[1].split('/>')[0];
						var bgUrl = splitContent.split("alt=")[0];
						var bgAlt = splitContent.split("alt=")[1];
						var splitContent2 = response.split('two><imgsrc=')[1].split('/>')[0];
						var imageUrl = splitContent2.split("alt=")[0];
						var imageAlt = splitContent2.split("alt=")[1];
						var destUrl = response.split('three>')[1].split('</')[0];
						var sym = destUrl.indexOf("?") > -1 ? "&" : "?";
						destUrl = destUrl + sym + "intid=home-top-chanpin" + (index + 1);
						var uls = document.getElementsByTagName("ul");
						for (var i = 0; i < uls.length; i++) {
							var ul = uls[i];
							var className = ul.getAttribute("class");
							if (!className) {
								className = ul.getAttribute("className")
							}
							var c = 0;
							if (className == "slide_bg") {
								var lis = ul.childNodes;
								for (var i = 0; i < lis.length; i++) {
									var li = lis[i];
									if (li.nodeName == "LI") {
										if (index == c++) {
											li.style.backgroundImage = "url(" + bgUrl + ")";
											break
										}
									}
								}
								break
							}
						}
						var divs = document.getElementsByTagName("div");
						for (var i = 0; i < divs.length; i++) {
							var div = divs[i];
							var className = div.getAttribute("class");
							if (!className) {
								className = div.getAttribute("className")
							}
							var c = 0;
							if (className == "img_wrapper") {
								var aLinks = div.childNodes;
								for (var i = 0; i < aLinks.length; i++) {
									var aLink = aLinks[i];
									if (aLink.href) {
										if (index == c++) {
											aLink.href = destUrl;
											var img = aLink.childNodes[0];
											if (img) {
												img.src = imageUrl;
												img.alt = imageAlt;
												break
											}
										}
									}
								}
								break
							}
						}
					}
                }
            }
            ajax.send()
		}
	} catch(e) {
		_printDebugInfo(e)
	}
}

function resumeCharaterCookie(){
	try{
		var currentCookie = document.cookie;  
		var cookieArr = currentCookie.split("; ");
		for(var j = 0;j < cookieArr.length;j++){
			var kv2 = cookieArr[j].split("=");
			if(kv2[1].indexOf("%") == 0 && kv2[0] != "ist_geo"){
				var decodeValue = decodeURI(kv2[1]);
				document.cookie = kv2[0] + '=' + decodeValue + ";path=/";
			}
		}
	} catch(e) {
		_printDebugInfo(e)
	}
}

function processCharaterCookies(domain){
	try{
		var currentCookie = document.cookie;  
		var cookieArr = currentCookie.split("; ");  
		for(var i = 0;i < cookieArr.length;i++){  
			var kv = cookieArr[i].split("=");  
			if(/.*[\u4e00-\u9fa5].*/.test(kv[1])){ 
				var encodeValue = encodeURI(kv[1]);  
				document.cookie = kv[0] + '=' + encodeValue + ";path=/" + domain ? "domain=" + domain : "";
			}  
		}
	}catch(e){
		_printDebugInfo(e);
	}
}

function processCharaterCookiesRespon(cbFunction){
	try{
		var response = '{responseType:"0",length:"3",prodNumber:"25",adPosNumber:"3",defaultKeys:"DAA|EAJ|JAB_A|EAK_X|EAG_V|EAK_U|LDT_E|EAJ_S|EFFEFG|EAJ_D|EJQ_Z|JBS|EJQ_H|YEJ|LAY_N|ZKF|JBD_B|EAK_G|EAG_T|LAY_G|LAY_A|LAY_J|ZAF|LEF|YEH",prod1:"DAA:http://www.epicc.com.cn/kpzym/wsscsgcp/qcbx/",prod2:"EAJ:http://www.epicc.com.cn/kpzym/wsscsgcp/qqlybx/",prod3:"JAB_A:http://www.epicc.com.cn/kpzym/wsscsgcp/jtcczhbx/",prod4:"EAK_X:http://www.epicc.com.cn/kpzym/wsscsgcp/gnzjybx/",prod5:"EAG_V:http://www.epicc.com.cn/kpzym/wsscsgcp/jwswcxbx/",prod6:"EAK_U:http://www.epicc.com.cn/kpzym/wsscsgcp/gnlybx/",prod7:"LDT_E:http://www.epicc.com.cn/kpzym/wsscsgcp/mmejzhbx/",prod8:"EAJ_S:http://www.epicc.com.cn/kpzym/wsscsgcp/ozlybx/",prod9:"EFFEFG:http://www.epicc.com.cn/kpzym/wsscsgcp/rsywbx/",prod10:"EAJ_D:http://www.epicc.com.cn/kpzym/wsscsgcp/dnylybx/",prod11:"EJQ_Z:http://www.epicc.com.cn/kpzym/wsscsgcp/jtgjywx/",prod12:"JBS:http://www.epicc.com.cn/kpzym/wsscsgcp/hkywsszhbx/",prod13:"EJQ_H:http://www.epicc.com.cn/kpzym/wsscsgcp/hkywndbx/",prod14:"YEJ:http://www.epicc.com.cn/kpzym/wsscsgcp/scxlx/",prod15:"LAY_N:http://www.epicc.com.cn/kpzym/wsscsgcp/bmlybx/",prod16:"ZKF:http://www.epicc.com.cn/kpzym/wsscsgcp/jhrzrx/",prod17:"JBD_B:http://www.epicc.com.cn/kpzym/wsscsgcp/grzhzjaqbx/",prod18:"EAK_G:http://www.epicc.com.cn/kpzym/wsscsgcp/gngyybx/",prod19:"EAG_T:http://www.epicc.com.cn/kpzym/wsscsgcp/gnswcxbx/",prod20:"LAY_G:http://www.epicc.com.cn/kpzym/wsscsgcp/gatlybx/",prod21:"LAY_A:http://www.epicc.com.cn/kpzym/wsscsgcp/axlybx/",prod22:"LAY_J:http://www.epicc.com.cn/kpzym/wsscsgcp/rhlybx/",prod23:"ZAF:http://www.epicc.com.cn/kpzym/wsscsgcp/cwzrx/",prod24:"LEF:http://www.epicc.com.cn/kpzym/wsscsgcp/cyb/",prod25:"YEH:http://www.epicc.com.cn/kpzym/wsscsgcp/hkxlx/"}';
		resumeCharaterCookie();
		window[cbFunction](response);
	}catch(e){
		_printDebugInfo(e);
	}
}

(function(win, doc) {
	var interactionIncludeScript = doc.getElementById('interactionProposalScript');
	if (interactionIncludeScript) {
		var url = interactionIncludeScript.src.replace("campaign_f/nl/interactionProposal_picc.js", "interaction/");
		var params = interactionIncludeScript.src.split("?", 2);
		if (params.length == 2) params = params[1].split("&");
		else {
			var env = "nmsOfferEnvProd";
			if (win.interactionEnv) env = win.interactionEnv;
			params = ["env=" + env];
			url += "?env=" + encodeURIComponent(env);
		}
		// env param. default is "nmsOfferEnvProd"
		var isEnvSet = false;
		var cbFunction = "";
		for (var i = 0; i < params.length; i++) {
			if (params[i].indexOf("env=") == 0) {
				isEnvSet = true;
			}
			if (params[i].indexOf("cb=") == 0) {
				cbFunction = params[i].split("cb=")[1].split("&")[0];
				break;
			}
		}
		if (!isEnvSet) {
			var env = "nmsOfferEnvProd";
			if (win.interactionEnv) env = win.interactionEnv;
			url += "&env=" + encodeURIComponent(env);
		}
		// ctx param. default is, for all divs with an id like "i_SPC"
		// ctx=i_SPC1:SPC1,i_SPC2:SPC2
		var isCtxSet = false;
		for (var i = 0; i < params.length; i++) {
			if (params[i].indexOf("ctx=") == 0) {
				isCtxSet = true;
				break;
			}
		}
		if (!isCtxSet) {
			var ctx = "";
			if (win.interactionDivs) { // First case: try to read from interactionDivs
				var isFirst = true;
				for (var prop in win.interactionDivs) {
					var space = win.interactionDivs[prop].space;
					var divCtx = win.interactionDivs[prop].ctx;
					var divCategories = win.interactionDivs[prop].categories;
					var divThemes = win.interactionDivs[prop].themes;
					var divOrder = win.interactionDivs[prop].order;
					if (!isFirst) ctx += ";";
					ctx += prop + ":" + space;
					if (divCategories || divThemes) ctx += "$" + (divCategories ? divCategories: "") + "$" + (divThemes ? divThemes: "");
					if (divOrder) ctx += "_" + divOrder;
					if (divCtx) ctx += ":" + divCtx;
					isFirst = false;
				}
			} else { // Second case: default: find divs like i_SPC
				var divs = doc.getElementsByTagName("div");
				var isFirst = true;
				for (var i = 0; i < divs.length; i++) {
					if (divs[i].id.indexOf("i_") == 0) {
						if (!isFirst) ctx += ";";
						ctx += divs[i].id + ":" + divs[i].id.substring(2);
						isFirst = false;
					}
				}
			}
			url += "&ctx=" + encodeURIComponent(ctx);
		}
		// Global ctx, i.e. ctx for all divs in the page
		if (win.interactionGlobalCtx) url += "&gctx=" + encodeURIComponent(win.interactionGlobalCtx);
		// Target
		if (win.interactionTarget) url += "&t=" + encodeURIComponent(win.interactionTarget);
		// Categories
		if (win.interactionCategories) url += "&c=" + encodeURIComponent(win.interactionCategories);
		// Themes
		if (win.interactionThemes) url += "&th=" + encodeURIComponent(win.interactionThemes);
		// Offer
		if (win.interactionOffer) url += "&o=" + encodeURIComponent(win.interactionOffer);
		url += "&z=" + encodeURIComponent(Math.random().toString());

		processCharaterCookies();
		processCharaterCookies(".epicc.com.cn");
		var ajax = false;
		if (window.XMLHttpRequest) {
			ajax = new XMLHttpRequest();
			if (ajax.overrideMimeType) {
				ajax.overrideMimeType("text/xml");
			}
		} else if (window.ActiveXObject) {
			try {
				ajax = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					ajax = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {}
			}
		}
		var postStr = "&request=2";
		ajax = ajaxPostMethod(url);
		if(ajax){
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4 && ajax.status == 200) {
					if (ajax.responseText.indexOf(cbFunction) > -1) {
						var retResponse = ajax.responseText.split("'")[1].split("'")[0];
						resumeCharaterCookie();
						window[cbFunction](retResponse);
					}
				} 
			} 
		}
		if(document.location.pathname == "/shop/"){
			processCharaterCookiesRespon(cbFunction);
			trkIstDimention("prop66", document.cookie);
		} else {
			ajax.send(postStr);
		}
		
	}  
} (window, document));