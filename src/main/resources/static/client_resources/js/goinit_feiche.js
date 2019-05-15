$(document).ready(function(){
	//根据链接地址生成二维码
	if($('#productcode').val()!='JCA'){ //地震险产品首页由于此函数加载缓慢，屏蔽之
		getQRcode();
	}
	
	//初始化该产品是否可以进行引流
	isgotoVmeng();
	
	/**获取着陆页面热销产品近3个月的保单量*/
	var productCodes = $('#productCodes').val();
	if(productCodes!=null&&productCodes!=""){
		$.ajax({
			url:'/eproperty/displayInfo/getPolicyNum.do',
			data:{
				productCodes:productCodes
	           },
			type:'post',
			dataType:'json',
			async:false,
			success:function(data){
				var strs=productCodes.split(",");
				for(var i=0;i<strs.length;i++){
					var code = strs[i];
					 $("#num"+code).html(data[code]);	  
					if(code==$('#productcode').val())
					 $("#productNums").html(data[code]);	
				}
			},
			err:function(){
			}
		});
	}
	/**客户评价 待客户经理系统客户评价配置功能上线后打开,动态从数据库获取评价内容*/
	var flag = getCommentCount();
	if(flag=="1"){
		getSelectedPageComment("first");
	}
	if("BWSJ" != $("#productcode").val()){//百万寿险不需要
		/*产品对比*/
		getRisks();//获取所有险种类别信息赋值到险种类别下拉框
		getProductByRisk();//根据险种类别获取产品赋值到产品名称下拉框
		getCompareProductInfo();
		//点赞次数初始化
		setfaqclick();
	}
	if($("#productcode").val() =="ECK"||$("#productcode").val() =="EJQ_Z"||$("#productcode").val() =="YXL"){
		if(GetQueryString("salemode")=="06"){
			$("#salemode").val("06");
		}	
	}
});

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null){
    	 return  unescape(r[2]);
     } 
     return null;
}
function getcookies(id){
	//获取cookie字符串
	var strCookie=document.cookie;
	//将多cookie切割为多个名/值对
	var arrCookie=strCookie.split("; ");
	var sumclick=0;
	//遍历cookie数组，处理每个cookie对
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		//找到名称为userId的cookie，并返回它的值
		if(id==arr[0]){
			sumclick=arr[1];
			break;
		}
	} 
	return sumclick;
}

function changeclass(id){
	var ID="#"+id;
	if($(ID).hasClass("praise no")){
		$(ID).removeClass("praise no");
		$(ID).addClass("praise");
		var sum = getcookies(id);
		sum=parseInt(sum)+1;
		//ajax调用 将数据库中的值加1---
		var urlPath = "/eproperty/displayInfo/addPraiseNum.do";
		$.ajax({
					url : urlPath,
					type : "post",
					data : {questionid:id},
					async : true,
					dataType : "json",
					success : function(data, textStatus) {
					},
					error : function(data, textStatus) {
					},
					complete : function(data, textStatus) { 
					},
					beforeSend : function(data, textStatus) {
					}
				});
		////////////////////////
		$(ID).html("赞("+sum+")");
		//设置两个cookie
		var d= new Date();
		d.setHours(d.getHours() + (24 * 30)); //保存一个月
		document.cookie=id+"="+sum+";expires=" + d.toGMTString();
		document.cookie=id+"click=true;expires=" + d.toGMTString();
	}
	else
		return false;
}
function setfaqclick(){
	var productcode = $("#productcode").val();
	$.ajax({
		type:'post',
		async:false,
		data:'productcode=' + productcode,
		url:'/eproperty/comment/queryFaqs.do',
		success:function(data){
			var success = data.result;
			var err = data.err;
			if(success == 'success'){
				var jsonOb=data.faqs;
				var faqOb = eval("("+jsonOb+")");
				for(var i=0;i<faqOb.length;i++){
					var arr=faqOb[i].questionid;
					var num=faqOb[i].sumclicktimes;
					document.cookie=arr+"="+num;
					var isclick = getcookies(arr+"click");
					if("true"==isclick){
						$("#"+arr).removeClass("praise no");
						$("#"+arr).addClass("praise");
						
					}
					$("#"+arr).html("赞("+num+")");	
				}
			}else{
				; 
			}
		},
		err:function(){
			;
		}
	});
}

function getCommentCount(){
	var productcode = $("#productcode").val();
	var flag = "1";
	$.ajax({
		type:'post',
		async:false,
		data:'productcode=' + productcode + '&next=' + Math.random(),
		url:'/eproperty/comment/queryCommentCount.do',
		success:function(data){
			var success = data.result;
			var err = data.err;
			if(success == 'success'){
				$("#customer_comment").css("display","inline-block"); 
				$("#prompt_score").css("display","inline-block");
				$("#prompt_star").css("display","inline-block");
				$("#prompt_comment").css("display","inline-block");
				$("#commentcount").val(data.commentCount);
				$("#commentNum").html(data.commentCount);
				$("#productevaluationscore").html(data.productevaluationscore);
				$("#productScore").html(data.productevaluationscore);
				$("#productStar").width(getStarWidth(data.productevaluationscore));
				$("#productsupport").html("("+data.productsupport+"分)");
				$("#productsupportStar").width(getStarWidth(data.productsupport));
				$("#proposalexperience").html("("+data.proposalexperience+"分)");
				$("#proposalexperienceStar").width(getStarWidth(data.proposalexperience));
				$("#customerquality").html("("+data.customerquality+"分)");
				$("#customerqualityStar").width(getStarWidth(data.customerquality));
				//买家印象
//				$('#fixedlabel').css("display","none");
				$.each(data.geEvaluationLabelList, function(i,item){
//					$('#fixedlabel').css("display","none");
					var dd = displaylabel(item);
					$('#commentlabel').append(dd);
				});
			}else{
				flag = "0";
				//不显示客户评价模块
				$("#customer_comment").css("display","none"); 
				$("#prompt_score").css("display","none"); 
				$("#prompt_star").css("display","none"); 
				$("#prompt_comment").css("display","none"); 
				
			}
		},
		err:function(){
			flag = "0";
			var m12=encodeURI(encodeURI('服务器故障，请稍后重试！'));
		}
	});
	return flag;
}

function getSelectedPageComment(arg){
	var productcode = $("#productcode").val();
	var itemcount = $("#commentcount").val();
	// ----begin:获取分页的总页数max：
	var max = 1;
	if (parseInt(itemcount)%8 > 0){
		max = parseInt(parseInt(itemcount)/8) + 1;  //分页数
	}else{
		max = parseInt(parseInt(itemcount)/8);  //分页数
	}
	// ----end: 获取分页的总页数max：
	var pageNo;            //当前被选中显示的页号；
	var current1 = 1;      //显示在页码条的最左边的页码号
	var current6 = 6;      //显示在页码条的省略号前的页码号
	var currentPage = 0;   //当前高亮显示的页码位置；
	// ----begin: 获取将要显示的页号：
	if(!isNaN(arg)){
		var selectedPage = "page_" + parseInt(arg);
		pageNo = parseInt($("#"+selectedPage).html());
	}else if($.trim(arg)=="forward"){
		pageNo = parseInt($('#pageNo').val())+1;
	}else if($.trim(arg)=="back"){
		pageNo = parseInt($('#pageNo').val())-1;
	}else if($.trim(arg)=="first"){  //页码条点击“第一页”之后 总是显示第一页。
		pageNo = 1;
	}else if($.trim(arg)=="end"){  //页码条点击“第一页”之后 总是显示第一页。
		pageNo = max;
	}else{
		pageNo = "";
	}
	// ----end: 获取将要显示的页号：
	
	// ----begin: 设置将要显示在页码条控件中的首页号、尾页号、高亮位置：
	if(max>=9){
		if(pageNo == max){
			current7 = max-1;
			current1 =  max-7;
			currentPage = 9;
		}else if(pageNo<=4){
			current1 = 1;
			current7 = 7;
			currentPage = pageNo;
		}else if(pageNo>=(max-3)){
			current1 = max-7;
			current7 = max-1;
			currentPage = 8-(max-pageNo);
		}else{
			current1 = pageNo-3;
			current7 = pageNo+3;
			currentPage = 4;
		}
	}else if(max==8){
		current1 = 1;
		current7 = 7;
		if(pageNo==max){
			currentPage = 9;
		} else{
			currentPage = pageNo;
		}
	}
	// ----end: 设置将要显示在页码条控件中的首页号、尾页号、高亮位置：
	$.ajax({
		type:'post',
		async:false,
		data:'pageNo=' + pageNo + '&productcode=' + productcode + '&next=' + Math.random(),
		url:'/eproperty/comment/queryComment.do',
		success:function(data){
			var success = data.result;
			var err = data.err;
			if(success != 'null'){
				//----begin:重新设置页码条：
				var selectedPageitem = "";
				if (parseInt(max)>1){//当有多个分页时显示页码条：
					$('#paging').css("display","inline-block");
					$('#page_first').css("display","inline-block"); //显示“第一页”按钮。
					if (parseInt(max)<8){
						for(var i=1; i<=8; i++){
							var pageitem = "page_" + i;
							if(i<=max){
								$("#"+pageitem).css("display","inline-block"); 
							}else{
								$("#"+pageitem).css("display","none"); 
							}
							$("#"+pageitem).removeClass("thisclass");
						}
						$('#page_9').css("display","none");  //如果max<8,最后一个页码格一定要隐藏。
						if(!isNaN(pageNo)){
							selectedPageitem = "page_" + pageNo; 
							$("#"+selectedPageitem).addClass("thisclass");
						}
					}else{                            // max>=8
						for(var i=1; i<=7; i++){
							var pageitem = "page_" + i;
							$("#"+pageitem).css("display","inline-block");
							$("#"+pageitem).html(current1+i-1);
							$("#"+pageitem).removeClass("thisclass");
						}
						$('#page_8').html("...");
						$('#page_8').removeClass("thisclass");
						if(max==8){
							$('#page_8').css("display","none");
						}else{  //如果   max>8 && pageNo>=max-4的时候，也需要隐藏"省略号"
							if(pageNo>=max-4){
								$('#page_8').css("display","none");
							}else{
								$('#page_8').css("display","inline-block");
							}
						}
						$('#page_9').html(max);
						$('#page_9').removeClass("thisclass");
						$('#page_9').css("display","inline-block");
						selectedPageitem = "page_" + currentPage;
						$("#"+selectedPageitem).addClass("thisclass");
					}
					   //----begin:处理分页条的“上一页”和“下一页”
					if(parseInt(pageNo)>1){
						$('#page_back').css("display","inline-block");
					}else{
						$('#page_back').css("display","none");
					}
						
					if(parseInt(pageNo)<max){
						$('#page_forward').css("display","inline-block");
					}else{
						$('#page_forward').css("display","none");
					}
					  //---end:处理分页条的“上一页”和“下一页”
				}else{//只有一页时不显示页码条：
					$('#paging').css("display","none");
				}
				
				//----end:重新设置页码条.
				
				$('#insertCommentJSP').empty();
				$.each(data.commentList, function(i, item){
					var itemNum = (pageNo-1)*8 + i + 1;
					var li = displayComment(item, itemNum);
					$('#insertCommentJSP').append(li);
				});
		
				if($('#insertCommentJSP').children().length > 0){
					$('#insuredList').css('display', 'block');
				}
				//如果调用ajax成功就重新设置pageNo：
				$("#pageNo").val(pageNo);

				if(itemcount>0){
					//显示被保险人列表：
//					$('#insuredPersonInfo').css("display","inline-block");
//					$('#insuredPersonList').css("display","inline-block");
				}else{
					//隐藏被保险人列表：
//					$('#insuredPersonInfo').css("display","none");
//					$('#insuredPersonList').css("display","none");
				}
			}else{
//				var errRow = data.errRow;//出错行;
//				var errContent = data.errContent;//出错内容;
//				var type = typeof(err);
//				if(type == 'object'){
//					errData(err);
//
//					$('#loading').css('display','none');
//					$('#saveToList').attr('disabled',false);
//					$('#sc').attr('disabled',false);
//				}else{
//					$('#loading').css('display','none');
//					$('#saveToList').attr('disabled',false);
//					$('#sc').attr('disabled',false);
//					
//					var m11=encodeURI(encodeURI(err));
//				}
			}
		},
		err:function(){
//			$('#loading').css('display','none');
//			$('#saveToList').attr('disabled',false);
//			$('#sc').attr('disabled',false);
//			
//			$("#windownbg").remove();
//			$("#windown-box").fadeOut("slow",function(){$(this).remove();});
			var m12=encodeURI(encodeURI('服务器故障，请稍后重试！'));
		}
	});
}

function displayComment(data, serialNum){
	var li = document.createElement('li');
//	$(tr).bind('mousemove', function(){changeBgColor(tr, '0')});
//	$(tr).bind('mouseout', function(){changeBgColor(tr,'1')});
//	$(tr).attr('id', data.sessionid+data.insuredid);
	// 评价人;
	var td1 = document.createElement('span');
	td1.innerHTML = data.evaluationpeople.substring(0,1)+"**评价:";
	// 评价内容;
	var td2 = document.createElement('p');
	td2.className = 'con';
	td2.innerHTML = data.evaluationcontent;
	// 评分；
	var td3 = document.createElement('div');
	var p = document.createElement('p');
	p.innerHTML="<i style='width:"+getStarWidth(data.starscore)+";'></i>";
	var em = document.createElement('em');
//	em.innerHTML = "("+data.starscore+"分)";
	em.innerHTML = "("+parseFloat(data.starscore).toFixed(2)+"分)";
	td3.appendChild(p);
	td3.appendChild(em);
	// 姓名;
	var td4 = document.createElement('p');
	var commentdate = data.evaluationtime1.replace(/\//g,'-');
//	td4.innerHTML = commentdate+" "+data.evaluationtime2;
	td4.innerHTML = commentdate;
	td4.className = 'time';
	
	li.appendChild(td1);
	li.appendChild(td2);
	li.appendChild(td3);
	li.appendChild(td4);
	
	return li;
}

function displaylabel(data){
	var dd = document.createElement('dd');
	var num = 0;
	if(parseInt(data.clicknumber)>=parseInt(data.pagenumber)){
		num = data.clicknumber;
	}else{
		num = data.pagenumber;
	}
	dd.innerHTML = data.labelname+"("+num+")";
	if(data.color=="gray"){
		dd.className="too";
	}
	return dd;
}

function clickCompareProduct(){
	var compare_productcode = $('#compare_productcode').val();
	if(compare_productcode==''){
		showTipsWindown("请选择对比产品！");
		if($.trim($("#checkMSG").html())=="请选择对比产品！"){
			$(".background").css("z-index","10001");
		}else{
			$(".mask").css("z-index","10001") ;
		}
		return;
	}else{
		var isAdd = "0";//是否已经加入到需对比的产品列表中
		var compareProductes = $("#compareProductes").val();
		var productArr = compareProductes.split(",");
		for(var i=0;i<productArr.length;i++){
			if(compare_productcode==productArr[i]){
				isAdd = "1";
				break;
			}
		}
		if(isAdd =="0"){
			if(compareProductes==''){
				$("#compareProductes").val(compare_productcode);
			}else{
				$("#compareProductes").val(compareProductes+','+compare_productcode);
			}
		}
	}
	var comparedProductes = $("#comparedProductes").val();
	var compareProductArr = comparedProductes.split(",");
	var flag="0";
	for(var i=0;i<compareProductArr.length;i++){
		if(compare_productcode==compareProductArr[i]){
			showTipsWindown("该产品已加入对比！");
			if($.trim($("#checkMSG").html())=="该产品已加入对比！"){
				$(".background").css("z-index","10001");
			}else{
				$(".mask").css("z-index","10001") ;
			}
			return;
		}
	}
	getCompareProductInfo();
}

//查询对比产品所有信息，并显示在页面相应位置
function getCompareProductInfo(){
	var compareProductes = $("#compareProductes").val();
	if(compareProductes!=null&&compareProductes!=""){
//		$('.popup').css("display"," list-item");
		var productArr = compareProductes.split(",");
		$('#compareNum').html(productArr.length);
		if(productArr.length>4){
			$('#compareNum').html("4");
//			showTipsWindown("您每次最多只能对比4款产品！");
			showTipsWindown("您每次最多只能对比4款产品！");
			if($.trim($("#checkMSG").html())=="您每次最多只能对比4款产品！"){
				$(".background").css("z-index","10001");
			}else{
				$(".mask").css("z-index","10001") ;
			}
			var newproductes = "";
			for(var i=0;i<4;i++){
				if(i==3){
					newproductes+=productArr[i];
				}else{
					newproductes+=productArr[i]+",";
				}
			}
			$("#compareProductes").val(newproductes);
		}else{
			$.ajax({
				url:'/eproperty/displayInfo/getCompareProductInfo.do',
				data:{
					compareProductes:compareProductes
		           },
				type:'post',
				dataType:'json',
				async:false,
				success:function(data){
					$("#comparedProductes").val(compareProductes);
					//显示产品对比小窗口信息
					diplayCompareWindow(data);
					//显示产品对比基本信息
					displayCompareinfo(data);
					//显示产品对比保障利益信息
					displayBenefitinfo(data);
					//显示其他信息
					displayOtherinfo(data);
				},
				err:function(){
				}
			});
		}
	}else{
		$("#comparedProductes").val("");
		$('#compareNum').html('0');
		$('.com').css("display","none");
		//显示产品对比小窗口信息
		diplayCompareWindow("");
		//显示产品对比基本信息
		displayCompareinfo("");
		//显示产品对比保障利益信息
		displayBenefitinfo("");
		displayOtherinfo("");
		
	}
}

//显示对比产品浮动窗口
function diplayCompareWindow(data){
	$('#compareWindow').empty();
	if(data!=""){
		var productstrs=data.productNames.substring(0,data.productNames.length-1).split("#");
		var imgurls = data.imgurl.substring(0,data.imgurl.length-1).split("#");
		var premiumstrs=data.premium.substring(0,data.premium.length-1).split("#");
		var urlstrs = data.buyurl.split("#");
		var compareProductes = $("#compareProductes").val();
		var productArr = compareProductes.split(",");
		var str = "";
		for(var i=0;i<productstrs.length;i++){
			var div = document.createElement('div');
			div.className = 'compare1 clearfix';
			if(productArr[i]=='YEJ'){
				str = "<a href='"+urlstrs[i]+"' target='_blank'><img src='"+imgurls[i]+"'></a><span><a class='name' href='"+urlstrs[i]+"' target='_blank'>"+productstrs[i]+"</a><br/><font class='fontRed'>￥81.00</font>&nbsp;&nbsp;起"
				+"<p><a href='javascript:deleteProduct(\""+productArr[i]+"\");'></a></p></span>";
			}else if(productArr[i]=='LAY_N'||productArr[i]=='LAY_J'||productArr[i]=='LAY_G'||productArr[i]=='LAY_A'||productArr[i]=='LAY_H'){
				str = "<a href='"+urlstrs[i]+"' target='_blank'><img src='"+imgurls[i]+"'></a><span><a class='name' href='"+urlstrs[i]+"' target='_blank'>"+productstrs[i]+"</a><br/>每天<font class='fontRed'>￥"+premiumstrs[i]+"</font>&nbsp;&nbsp;起"
				+"<p><a href='javascript:deleteProduct(\""+productArr[i]+"\");'></a></p></span>";
			}
			else{
				str = "<a href='"+urlstrs[i]+"' target='_blank'><img src='"+imgurls[i]+"'></a><span><a class='name' href='"+urlstrs[i]+"' target='_blank'>"+productstrs[i]+"</a><br/><font class='fontRed'>￥"+premiumstrs[i]+"</font>&nbsp;&nbsp;起"
				+"<p><a href='javascript:deleteProduct(\""+productArr[i]+"\");'></a></p></span>";
			}
			div.innerHTML = str;
			$('#compareWindow').append(div);
		}
	}
}

//删除某个对比产品
function deleteProduct(productcode){
	var compareProductes = $("#comparedProductes").val();
	var productArr = compareProductes.split(",");
	var newProductcodes="";
	for(var i=0;i<productArr.length;i++){
		if(productcode!=productArr[i]){
			newProductcodes +=productArr[i]+",";
		}
	}
	newProductcodes = newProductcodes.substring(0,newProductcodes.length-1);
	$('#compareProductes').val(newProductcodes);
	if($("#jrcompare").hasClass("btnactive") && productcode==$('#productcode').val()){//清空复选框
		$('#jrcompare').removeClass("btnactive");
	}
	if(newProductcodes==""){//所有产品都删除了
		$('.popup').css("display","none");
	}
	getCompareProductInfo();
	
}

//显示产品对比基本信息
function displayCompareinfo(data){
	$('#compareinfo').empty();
	if(data!=""){
		//产品名称
		var tr1 = document.createElement('tr');
		var productstrs=data.productNames.substring(0,data.productNames.length-1).split("#");
		var compareProductes = $("#compareProductes").val();
		var productArr = compareProductes.split(",");
//		var str1 ='<td width=\"116\" class=\"tit\">产品名称</td>';
		var td1 = document.createElement('td');
		td1.className = 'tit';
		td1.width='116';
		td1.innerHTML = '产品名称';
		tr1.appendChild(td1);
		for(var i=0;i<productstrs.length;i++){
//			str1 = str1+"<td width='170' class='sort'><span>"+productstrs[i]+"</span><a href='javascript:deleteProduct(\""+productArr[i]+"\");' class='delete_a'></a></td>";
			td1 = document.createElement('td');
			td1.className = 'sort';
			td1.width='170';
			td1.innerHTML = "<span>"+productstrs[i]+"</span><a href='javascript:deleteProduct(\""+productArr[i]+"\");' class='delete_a'></a>";
			tr1.appendChild(td1);
		}
		for(var i=productstrs.length;i<4;i++){
//			str1 = str1+"<td width='170' class='sort'></td>";
			td1 = document.createElement('td');
			td1.className = 'sort';
			td1.width='170';
			tr1.appendChild(td1);
		}
//		tr1.innerHTML = str1;
		$('#compareinfo').append(tr1);
		//产品亮点
		var tr2 = document.createElement('tr');
		var strongpointstrs=data.strongpointes.substring(0,data.strongpointes.length-1).split("#");
//		var str2 ="<td class='tit'>产品亮点</td>";
		var td2 = document.createElement('td');
		td2.className = 'tit';
		td2.innerHTML = '产品亮点';
		tr2.appendChild(td2);
		for(var i=0;i<strongpointstrs.length;i++){
//			str2 = str2+"<td>"+strongpointstrs[i]+"</span></td>";
			td2 = document.createElement('td');
			td2.innerHTML = strongpointstrs[i];
			tr2.appendChild(td2);
		}
		for(var i=strongpointstrs.length;i<4;i++){
//			str2 = str2+"<td></td>";
			td2 = document.createElement('td');
			tr2.appendChild(td2);
		}
//		tr2.innerHTML = str2;
		$('#compareinfo').append(tr2);
		//适用人群
		var tr3 = document.createElement('tr');
		var peoplestrs=data.people.substring(0,data.people.length-1).split("#");
//		var str3 ="<td class='tit'>适用人群</td>";
		var td3 = document.createElement('td');
		td3.className = 'tit';
		td3.innerHTML = '适用人群';
		tr3.appendChild(td3);
		for(var i=0;i<peoplestrs.length;i++){
//			str3 = str3+"<td>"+peoplestrs[i]+"</span></td>";
			td3 = document.createElement('td');
			td3.innerHTML = peoplestrs[i];
			tr3.appendChild(td3);
		}
		for(var i=peoplestrs.length;i<4;i++){
//			str3 = str3+"<td></td>";
			td3 = document.createElement('td');
			tr3.appendChild(td3);
		}
//		tr3.innerHTML = str3;
		$('#compareinfo').append(tr3);
		//保障期限
		var tr4 = document.createElement('tr');
		var periodstrs=data.period.substring(0,data.period.length-1).split("#");
//		var str4 ="<td class='tit'>保障期限</td>";
		var td4 = document.createElement('td');
		td4.className = 'tit';
		td4.innerHTML = '保障期限';
		tr4.appendChild(td4);
		for(var i=0;i<periodstrs.length;i++){
//			str4 = str4+"<td>"+periodstrs[i]+"</span></td>";
			td4 = document.createElement('td');
			td4.innerHTML = periodstrs[i];
			tr4.appendChild(td4);
		}
		for(var i=periodstrs.length;i<4;i++){
//			str4 = str4+"<td></td>";
			td4 = document.createElement('td');
			tr4.appendChild(td4);
		}
//		tr4.innerHTML = str4;
		$('#compareinfo').append(tr4);
		
		//保障年龄
		var tr6 = document.createElement('tr');
		var ensureagestrs=data.ensureage.substring(0,data.ensureage.length-1).split("#");
		var td6 = document.createElement('td');
		td6.className = 'tit';
		td6.innerHTML = '保障年龄';
		tr6.appendChild(td6);
		for(var i=0;i<ensureagestrs.length;i++){
			td6 = document.createElement('td');
			td6.innerHTML = ensureagestrs[i];
			tr6.appendChild(td6);
		}
		for(var i=ensureagestrs.length;i<4;i++){
			td6 = document.createElement('td');
			tr6.appendChild(td6);
		}
		$('#compareinfo').append(tr6);
		
		//最高保额
		var tr7 = document.createElement('tr');
		var coveragestrs=data.coverage.substring(0,data.coverage.length-1).split("#");
		var td7 = document.createElement('td');
		td7.className = 'tit';
		td7.innerHTML = '最高保额';
		tr7.appendChild(td7);
		for(var i=0;i<coveragestrs.length;i++){
			td7 = document.createElement('td');
			td7.innerHTML = coveragestrs[i];
			tr7.appendChild(td7);
		}
		for(var i=coveragestrs.length;i<4;i++){
			td7 = document.createElement('td');
			tr7.appendChild(td7);
		}
		$('#compareinfo').append(tr7);
		
		//产品价格
		var tr5 = document.createElement('tr');
		var premiumstrs=data.premium.substring(0,data.premium.length-1).split("#");
		var urlstrs = data.buyurl.split("#");
//		var str5 ="<td class='tit'>产品价格</td>";
		var td5 = document.createElement('td');
		td5.className = 'tit';
		td5.innerHTML = '产品价格';
		tr5.appendChild(td5);
		for(var i=0;i<premiumstrs.length;i++){
			td5 = document.createElement('td');
			if(productArr[i]=='YEJ'){
//				str5 = str5+"<td><p><font>各省市不同价格</font></p><a href='"+urlstrs[i]+"' class='button_a'><img src='/eproperty/css/EAtheme/images/contrast_an2.jpg' width='90' height='30' alt='立即投保' /></a></td>";
				td5.innerHTML = "<p><font>各省市不同价格</font></p><a href='"+urlstrs[i]+"' target='_blank' class='button_a'><img src='/eproperty/css/EAtheme/images/contrast_an2.jpg' width='90' height='30' alt='立即投保' /></a>";
			}else if(productArr[i]=='LAY_N'||productArr[i]=='LAY_J'||productArr[i]=='LAY_G'||productArr[i]=='LAY_A'||productArr[i]=='LAY_H'){
				td5.innerHTML = "<p>每天<font>￥"+premiumstrs[i]+"</font> 起</p><a href='"+urlstrs[i]+"' target='_blank' class='button_a'><img src='/eproperty/css/EAtheme/images/contrast_an2.jpg' width='90' height='30' alt='立即投保' /></a>";
			
			}
			else{
//				str5 = str5+"<td><p><font>￥"+premiumstrs[i]+"</font> 起</p><a href='"+urlstrs[i]+"' class='button_a'><img src='/eproperty/css/EAtheme/images/contrast_an2.jpg' width='90' height='30' alt='立即投保' /></a></td>";
				td5.innerHTML = "<p><font>￥"+premiumstrs[i]+"</font> 起</p><a href='"+urlstrs[i]+"' target='_blank' class='button_a'><img src='/eproperty/css/EAtheme/images/contrast_an2.jpg' width='90' height='30' alt='立即投保' /></a>";
			}
			tr5.appendChild(td5);
		}
		for(var i=premiumstrs.length;i<4;i++){
//			str5 = str5+"<td></td>";
			td5 = document.createElement('td');
			tr5.appendChild(td5);
		}
//		tr5.innerHTML = str5;
		$('#compareinfo').append(tr5);
	}
	
}

//显示保障利益
function displayBenefitinfo(data){
	$('#benefitinfo').empty();
	if(data!="" && data.riskbenefitList!=""){
//		alert(data.riskbenefitList[1]);
//		var aa = data.riskbenefitList[1];
//		alert(aa.benefitkey);
		$.each(data.riskbenefitList, function(i, item){
			var productbenefit = data.productbenefitList[i];
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			td1.className = 'tit';
			td1.width='116';
			td1.innerHTML = item.benefitkey;
			tr.appendChild(td1);
			//各产品的保障利益
			var productstrs=productbenefit.substring(0,productbenefit.length-1).split("#");
			for(var j=0;j<productstrs.length;j++){
				var td = document.createElement('td');
				td.innerHTML = productstrs[j];
				td.width='170';
				tr.appendChild(td);
			}
			for(var j=productstrs.length;j<4;j++){
				var td = document.createElement('td');
				td.width='170';
				tr.appendChild(td);
			}
			$('#benefitinfo').append(tr);
		});
	}
	else{
		//无产品对比信息
	}
}

//显示产品对比的其他信息
function displayOtherinfo(data){
	$('#otherinfo').empty();
	if(data!="" && data.otherinfo!=""){
		var otherinfostrs = data.otherinfo.substring(0,data.otherinfo.length-1).split("#");
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		td1.className = 'tit';
		td1.width='116';
		tr.appendChild(td1);
		for(var i=0;i<otherinfostrs.length;i++){
			var td = document.createElement('td');
			td.innerHTML = otherinfostrs[i];
			td.width='170';
			tr.appendChild(td);
		}
		for(var j=otherinfostrs.length;j<4;j++){
			var td = document.createElement('td');
			td.width='170';
			tr.appendChild(td);
		}
		$('#otherinfo').append(tr);
//		$.each(data.riskbenefitList, function(i, item){
//			var productbenefit = data.productbenefitList[i];
//			var tr = document.createElement('tr');
//			var td1 = document.createElement('td');
//			td1.className = 'tit';
//			td1.width='116';
//			td1.innerHTML = item.benefitkey;
//			tr.appendChild(td1);
//			//各产品的保障利益
//			var productstrs=productbenefit.substring(0,productbenefit.length-1).split("#");
//			for(var j=0;j<productstrs.length;j++){
//				var td = document.createElement('td');
//				td.innerHTML = productstrs[j];
//				td.width='170';
//				tr.appendChild(td);
//			}
//			for(var j=productstrs.length;j<4;j++){
//				var td = document.createElement('td');
//				td.width='170';
//				tr.appendChild(td);
//			}
//			$('#benefitinfo').append(tr);
//		});
	}
	else{
		//无产品对比信息
	}
}

//获得所有险种类别
function getRisks(){
	$.ajax({
		url:'/eproperty/displayInfo/getCompareRiskInfo.do',
		data:{
           },
		type:'post',
		dataType:'json',
		async:false,
		success:function(data){
			if (data != null) {
				var htmlStr="";
				$.each(data.compareRiskList, function(i, item){
//					var risktypeid="";
//					if(item.risktype=="travel"){
//						risktypeid="1";
//					}else if(item.risktype=="accident"){
//						risktypeid="2";
//					}
//					else if(item.risktype=="family"){
//						risktypeid="3";
//					}
//					else if(item.risktype=="luggage"){
//						risktypeid="4";
//					}
					htmlStr+='<li value=\"'+item.risktype+'\"  c=\"'+item.risktype+'\">'+item.riskname+'</li>';
				});
				$('#ul_compare_risktype').html(htmlStr);
			}
		},
		err:function(){
		}
	});
}

//根据险种类别查询对应的产品
function getProductByRisk(){
	var compare_risktype = $("#compare_risktype").val();
//	if(compare_risktype==""){
//		compare_risktype="accident";
//	}
	$.ajax({
		url:'/eproperty/displayInfo/getCompareProductByRisk.do',
		data:{
			risktype:compare_risktype
           },
		type:'post',
		dataType:'json',
		async:false,
		success:function(data){
			if (data != null && data.compareProductbasicList!="") {
				var htmlStr="";
				$.each(data.compareProductbasicList, function(i, item){
					htmlStr+='<li value=\"'+item.productcode+'\" c=\"'+item.productcode+'\">'+item.productname+'</li>';
				});
				$('#ul_compare_productcode').html(htmlStr);
			}
			else{
				$('#fixed_productcode').html('选择产品');
				$('#compare_productcode').val('');
				$('#ul_compare_productcode').html('');
				$("#fixed_productcode").addClass('grayfont');
			}
		},
		err:function(){
		}
	});
}

//勾选或取消“对比产品”复选框
function addCompare(){
	var compareProductes = $("#compareProductes").val();
	var productcode = $("#productcode").val();
	if($("#jrcompare").hasClass("btnactive")){//将取消状态
		var productArr = compareProductes.split(",");
		var newProductcodes="";
		for(var i=0;i<productArr.length;i++){
			if(productcode!=productArr[i]){
				newProductcodes +=productArr[i]+",";
			}
		}
		newProductcodes = newProductcodes.substring(0,newProductcodes.length-1);
		$('#compareProductes').val(newProductcodes);
		getCompareProductInfo();
	}else{//将选中状态
		if(compareProductes.indexOf(productcode)>-1){
//			showTipsWindown("该产品已加入对比！");
		}else{
			if(compareProductes==''){
				$("#compareProductes").val(compareProductes+productcode);
			}else{
				$("#compareProductes").val(compareProductes+','+productcode);
			}
			getCompareProductInfo();
		}
	}
}

//清空所有对比产品
function deleteAllProduct(){
	$('#compareProductes').val("");
	if($("#jrcompare").hasClass("btnactive")){//清空复选框
		$('#jrcompare').removeClass("btnactive");
	}
	$('.popup').css("display","none");
	getCompareProductInfo();
	
	
}

function getStarWidth(score){
	var width = '80%';
	width = score/5*100;
	/*if(score<=0.5){
		width = '10%';
	}else if(score>0.5 && score<=1){
		width = '20%';
	}else if(score>1 && score<=1.5){
		width = '30%';
	}else if(score>1.5 && score<=2){
		width = '40%';
	}else if(score>2 && score<=2.5){
		width = '50%';
	}else if(score>2.5 && score<=3){
		width = '60%';
	}else if(score>3 && score<=3.5){
		width = '70%';
	}else if(score>3.5 && score<=4){
		width = '80%';
	}else if(score>4 && score<=4.5){
		width = '90%';
	}else if(score>4.5 && score<=5){
		width = '100%';
	}*/
//	alert(width);
	return width+'%';
}

function goCalc(el){
//	jumpingid :0、默认值    1、进入正常投保流程     2、进入老客户续保流程
	$("#jumpingid").val("0");
	if(!checkPageIsLogin()){
		return ;
	}
		if($("#productcode").val() == "JBD_B"){
			if(!checkJBD_BAmount($("#amount"),'amountError')){
				return false;
			}
		}
		if($("#productcode").val() == "EFFEFG"){
			if (!checkPeoplecount("peoplecount")) {
				rollToPos("jrcompare");//需要定位到高一点的位置，否则会被浮条遮住
				return false;
			}
		}
		if($("#productcode").val()=="LEF"||$("#productcode").val()=="LXL"){
			$('.pop_background').show();
			if($("#ppNtcSel").hasClass("active")){
				$("#ppNtcSel").removeClass("active");
			}
			$("#popNotice").show();
			rollToPos("popNotice");
			return true;
		}
		/*//*****start 验证澳新游是否登录，如果未登录需要登录后才能进入老客户续保流程  2016/7/14 需求陈昊 修改者岳聚霞
		var result = "success";
		if("LAY_A" == $("#productcode").val()){
	//		jumpingid :0、默认值    1、进入正常投保流程     2、进入老客户续保流程
				$("#jumpingid").val("1");	
				$.ajax({
				type:'post',
				url:'/eproperty/member/confirmLogin.do',
				async:false,
				success:function(data){
						result = data.result;
				}
			});//end ajax
			if($("#groupBuyId").val()!=""){
				result = "success";
			}
			if("notLogin"==result){
				//弹出登录注册层
				changeLogin();
				return;
			}
		}//end if lay_a
		//*****end 验证澳新游是否登录，如果未登录需要登录后才能进入老客户续保流程  2016/7/14
		*/
		//v盟引流处理逻辑
		var isGotoInfo = true;
		//团购链接进入的直接按照正常官网流程走
		if("" == el || null == el || undefined == el){
			if(""==$("#groupBuyId").val() || null==$("#groupBuyId").val() || undefined==$("#groupBuyId").val()){
				var showtype = $("#showtype").val();//是否全国
				if("success" == showtype){
					//调用V盟引流方法
					isGotoInfo = gotoVMengDrainage();
				}
			}
		}else if("vmeng" == el){
			$("#salemode").val("07");
			$("#dzyl").hide();
			$(".vmMask").hide();
			isGotoInfo = true;
		}else if("pc" == el){
			$("#accounttype").val("");
			$("#salemode").val("");
			$("#groupBuyId").val("");
			$("#comcode").val("");
			$("#areacode").val("");
			$("#dzyl").hide();
			$(".vmMask").hide();
			isGotoInfo = true;
		}
		if(isGotoInfo){
			var form = document.getElementById("form");
			form.target="_blank";
			gridIndex();
			form.submit();
		}
}

///////////////////创业保投保声明提前/////////////
function goCalcforLEF(){
	if ($("#ppNtcSel").attr("class")!="inputSpan active") {
		showTipsWindown("请认真阅读投保声明并确认");
		$(".mask").css("z-index","10001") ;
		return false;
	} 
	$("#popNotice").hide();
	$('.pop_background').hide();
	var form = document.getElementById("form");
	form.target="_blank";
	gridIndex();
	form.submit();
}
function toggleppNtcSel(){
	$("#ppNtcSel").toggleClass('active');
}
function closePopnotice(){
	$(".pop_background").hide();
	$("#popNotice").hide();
}
/////////////////////////////////////////
function gotoComment(){
	$("html,body").animate({scrollTop:450},500);
}

function popPosition(dom){
	var width = $(dom).width();
	var height = $(dom).height();
	var _scrollHeight = $(document).scrollTop();
	var	_windowHeight = $(window).height();
	var	_windowWidth = $(window).width();
	var	_popupHeight = $(dom).height();
	var docH = $(document).height();
	var docw = $(document).width();
	var	_popupWeight =$(dom).width();
	var	_posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight;
    var	_posiLeft = (_windowWidth - _popupWeight)/2;
    //alert(_posiLeft)
	$("body").append("<div class=mask></div>");
	// 判断 如果 是IE6  加 ifname
	if($.browser.msie && $.browser.version=="6.0"){ 
	   $("body").find("select").hide();
	    $(dom).css({"left":_posiLeft+(width/2),"top":_posiTop,"position":"absolute","margin-left":-(width/2),"margin-top":-(height/2)}).show();	
	  }  
	else{
		$(dom).css({"margin-left":-_popupWeight/2,"margin-top":-_popupHeight/2}).show();	
		
	}
	$(dom).focus();
	//遮罩层高度
	$(".mask").height(docH + "px") ;
	
};

function startCompare(){
	//点击"开始比较"，页面回到最顶端，直接能看到浮动窗口
	$("html,body").animate({scrollTop:0},500);
	//清空两个下拉框的值
	$('#fixed_risk').html('选择险类');
	$("#fixed_risk").addClass('grayfont');
	$('#compare_risktype').val('');
	$('#fixed_productcode').html('选择产品');
	$("#fixed_productcode").addClass('grayfont');
	$('#compare_productcode').val('');
	$('#ul_compare_productcode').empty();
	
}

function modifyZIndex(){
	$(".background").css("z-index","10000");
}

//生成QRcode的方法。
function getQRcode(){
	var url=window.location.href;//二维码内容
	$('#weixincode').qrcode({
        render: "table", //table方式
        width: 130, //宽度
        height:130, //高度
        text:url
	});
	var number=$('#weixincode tr').length;
	var newlength=4*number>150?3*number:4*number;
	$('#weixincode').html("");
	$('#weixincode').qrcode({
        render: "table", //table方式
        width: newlength, //宽度
        height:newlength, //高度
        text:url
	});
	$('#weixincode').height(newlength).width(newlength);
	$('#weixincode table').height(newlength).width(newlength);
}
function setcalenderZindex(){
	$("#_my97DP").css("z-index","990");
	
}
///////////////////jca start////////////
function closeStep(){
    $("#insure_step1").hide();
    $(".mask").remove();
}
function goJCAInfo(){
	if (!checkGroupBuyId()) {
		//弹出层，提示不能购买
		     $("#insure_step1").show();
		     $('body').append('<div class="mask"></div>');
		     $('.mask').height($(document).height()).animate({opacity:0.5});
		return false;
	}
	form.target="_blank";
	//添加国双监控代码
	gridIndex();
	form.submit();
}
function goJCOInfo(){
	if(!checkPageIsLogin()){
		return ;
	}
	form.target="_blank";
		//添加国双监控代码
		gridIndex();
		form.submit();
}
function checkGroupBuyId(){
	var groupBuyId=$('#groupBuyId').val();
	var result = false;
	$.ajax({
		url:"/eproperty/jcproposal/checkGroupBuyId.do",
		async: false,
		type:"post",
		data : "groupBuyId="+ groupBuyId,
		success:function(data){
			if(data.result){
				result= true;
			}
		}
	});
	
	return result;
}

//v盟引流开关方法
function isgotoVmeng(){
	$.ajax({
		url:"/eproperty/vDrainage/isGotoVmeng.do",
		async: false,
		type:"post",
		data : "productcode="+ $('#productcode').val(),
		success:function(data){
			//定义isgotoVmeng开关隐藏域
			$("#showtype").val(data.result);
			if("success"==$("#showtype").val()){
				//修改登录 为  "登录会员（关联微店出单，请先登陆）"
				$("#entryDiv2").html("登录会员（关联微店出单，请先登录）");
			}
		}
	});
}

//V盟引流方法
function gotoVMengDrainage(){
	var isGotoInfo = true;
	var productcode = $("#productcode").val();
	//首先判断是否登录
	$.ajax({
		url:"/eproperty/vDrainage/getAccountType.do",
		async: false,
		type: "post",
		data: "productcode="+ productcode,
		success: function(data){
			var result = data.result;
			//var accounttype = "2";
			if(result == "success"){
				var accounttype = data.accounttype;
				$("#accounttype").val(accounttype);
				if(null!=data.comcode){
					$("#comcode").val(data.comcode);
					$("#areacode").val(data.areacode);
				}
				if(null != data.groupId && 
						("" == $("#groupBuyId").val() || null == $("#groupBuyId").val() || undefined == $("#groupBuyId").val())){
					$("#groupBuyId").val(data.groupId);
				}
				if("1" == accounttype || "3" == accounttype){
					isGotoInfo = false;
					$("#dzyl").show();
					$(".vmMask").show();
				}
			}else {
				$("#accounttype").val("");
				$("#comcode").val("");
				$("#areacode").val("");
				$("#salemode").val("");
				$("#groupBuyId").val("");
			}
		},
		error: function(){
			//alert("调用接口失败");
			isGotoInfo = true;
		}
	});
	return isGotoInfo;
}
function showSpecialAgreement(){
	$("#special-div").show();
	$(".special-mask").show();
	getLAYSpecialAgreement();
}
function special_close(){
	$("#special-div").hide();
	$(".special-mask").hide();
}
/*特别约定*/
function getLAYSpecialAgreement(){
	$.ajax( {
	url : "/eproperty/laproposal/getLAYSpecialAgreement.do",
	type : "post",
	data : $("#form").serialize(),
	async : false,
	success : function(data, textStatus) {
		$("#special-ul").empty();
		var result = data.result;
		if (result == "success") {
			var liStr = "";
			var engages = data.prpdriskengageList;
			$.each(data.prpdriskengageList,function(index,element){
				liStr = liStr + "<li><p style='font-weight: bold;'>"+element.engagecname+"</p><P>"+element.engagedesc+"</P></li>";
			})
			$("#special-ul").append(liStr);
			$("#special-a").show();
		}
		if(result == "null"){
			$("#special-a").hide();
			$("#special-div").hide();
			$(".special-mask").hide();
		}
	}
	});
}

///////////////////jca end////////////