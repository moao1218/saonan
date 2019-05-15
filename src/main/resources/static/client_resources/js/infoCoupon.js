     
	$(function(){
		queryUseCoupons();
    });
    function selectCoupon(e) {
        var el = $("#liid"+e);
        var ca = el.attr("class");
      //当前点击红包的样式已经是选中的
        if(ca=="active"){
			el.removeClass("active");
	        $("#doUseCoupon").val("");
	    	$("#couponsType").val("");
        }else{
        	//当前点击红包的样式不是选中的
        	el.addClass("active").siblings().removeClass("active");
			el.parent().siblings("dl").find("dd").removeClass("active");
        }
    }
    function queryUseCoupons(){
    	$("#doUseCoupon").val("");
    	$("#couponsType").val("");
    	var areacode = $("#areacode").val();
    	var productcode = $("#productcode").val();
    	var url = "/eproperty/couponControl/queryDoUseCoupons.do";
    	if(areacode != null && areacode != ""){
    		$("#couponMoney").text("");
    		$.ajax({
        		url : url,
        		type : "post",
        		async: false,
        		data:{"productcode":productcode,"areacode":areacode},
        		success : function(data) {
        			var zkStr = "";
        			var mjStr = "";
        			if(data.status=="1"){
        				var mun = 0;
        				for(var i in data.useCouponList){
        					var strDate = new Date(data.useCouponList[i].starttime);
        					var endDate = new Date(data.useCouponList[i].endtime);
        					var strYear = strDate.getFullYear();
        					var strMonth = strDate.getMonth()+1;
        					var strDay = strDate.getDate();
        					var endYear = endDate.getFullYear();
        					var endMonth = endDate.getMonth()+1;
        					var endDay = endDate.getDate();
        					if(data.useCouponList[i].activitytype=="t2"){
        						zkStr +="<dd onclick='setValue("+mun+")' id='liid"+mun+"'><div class='top'><b class='num'>"+data.useCouponList[i].discount+"</b><span class='unit'>折</span></div><div class='bottom'>有效期："+strYear+"."+strMonth+"."+strDay+"-"+endYear+"."+endMonth+"."+endDay+"</div><input id='coupon"+mun+"' type='hidden' value='"+data.useCouponList[i].productname+"折'><input id='hiddenCouponid"+mun+"' type='hidden' value='"+data.useCouponList[i].sid+"'><input id='hiddenTypeid"+mun+"' type='hidden' value='"+data.useCouponList[i].activitytype+"'><input id='hiddendiscount"+mun+"' type='hidden' value='"+data.useCouponList[i].discount+"'></dd>";
        					}
        					if(data.useCouponList[i].activitytype=="t1"){
        						mjStr +="<dd onclick='setValue("+mun+")' id='liid"+mun+"'><div class='top'><span class='unit'>￥</span><b class='num'>"+data.useCouponList[i].discount+"</b><span class='txt'>满<b id='fullSubId"+mun+"'>"+data.useCouponList[i].condition+"</b>元可用</span></div><div class='bottom'>有效期："+strYear+"."+strMonth+"."+strDay+"-"+endYear+"."+endMonth+"."+endDay+"</div><input id='coupon"+mun+"' type='hidden' value='"+data.useCouponList[i].discount+"元'><input id='hiddenCouponid"+mun+"' type='hidden' value='"+data.useCouponList[i].sid+"'><input id='hiddenTypeid"+mun+"' type='hidden' value='"+data.useCouponList[i].activitytype+"'><input id='hiddendiscount"+mun+"' type='hidden' value='"+data.useCouponList[i].discount+"'></dd>";
        					}
        					mun++;
        				}
        				if(zkStr==""){
        					$("#coupon-h3-first").addClass("hide");
        				}
        				if(mjStr==""){
        					$("#coupon-h3-second").addClass("hide");
        				}
        				$("#infozkcouponid").html(zkStr);
        				$("#infomjcouponid").html(mjStr);
        				$("#couponid1").removeClass("hide");
        				$("#couponid2").removeClass("hide");
        			}
        			if(data.status=="0"){
        				//隐藏优惠券div
        	        	$("#couponid1").addClass("hide");
        	        	$("#couponid2").addClass("hide");
        			}
        		}
        	});
    	}else{
    		//隐藏优惠券div
        	$("#couponid1").addClass("hide");
        	$("#couponid2").addClass("hide");
    	}
    }
