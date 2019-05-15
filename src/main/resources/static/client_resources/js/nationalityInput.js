/**
 * 查询符合条件的国家或地区;
 * @return
 */
function getNationalityAge(){
	var inputVal = $.trim($('#input_applyCountryName').val().toUpperCase());
	if (inputVal == "") {
		jQuery("#div_nationalityInput_age").fadeOut("fast");
		return false;
	}
	//国家控件json文件与数据库prpdcode表的CountryCode文件差异
	//1:json中申根国家统一加上SCS_的前字符串，数据库中是将申根国家SCS单独作为一个国家存一条数据
	//2:json中将"美属太平洋各群岛（包括：中途岛、约翰斯顿岛、豪兰岛、贝克岛和威克岛等）"这个超长的数字名称删除了后面括号内内容
	var dataSource="/eproperty/js/country/country.json";
	//var dataSource="/eproperty/js/nationality/nationality.json";
	$.ajax({
		type:'get',
		url:dataSource,
		dataType:'json',
		success:function(data){
			var countrys = new Array();
			$.each(data, function(i, item){
				var countrycode = item.codecode;
				var countryename = item.codeename;
				var countrycname = item.codecname;
				
				if(countryename.indexOf(inputVal) == 0 || countrycname.indexOf(inputVal) == 0){
					var country = new Array();
					country.push(countrycode);
					country.push(countryename);
					country.push(countrycname);
					
					countrys.push(country);
				}
			});
			addNation(countrys);
		},
		err:function(){
			alert('err');
		}
	});
}

/**
 * 根据国家或地区代码翻译代码;
 * @return
 */
function getNationalityCnameByCode()
{
	var inputVal = $.trim($('#input_applyCountryCode').val().toUpperCase());
	var countryCodes = new Array();
	var countryCnames = "";
	var countryEnames = "";
	var isSCS=false;
	if (inputVal == "") 
	{
		return false;
	} 
	else
	{
		countryCodes = inputVal.split(',');
		if(inputVal.indexOf("SCS")>0)
		{
			isSCS = true;
		}
	}
	var dataSource="/eproperty/js/country/country.json";
	$.ajax({
		type:'get',
		url:dataSource,
		dataType:'json',
		success:function(data){
		var countrys = new Array();
		$.each(countryCodes,function(j,countryCodeItem){
			if(countryCodeItem!="SCS")
			{
				$.each(data, function(i, item){
					if(item.codecode==countryCodeItem)
					{
						countryCnames += item.codecname+',';
						countryEnames += item.codeename+',';
					}
					else
					{
						//二代库历史数据申根国家无申根标志，撤销申根标志判断
						//if(isSCS)
						{
							if(item.codecode==("SCS_"+countryCodeItem))
							{
								countryCnames += item.codecname+',';
								countryEnames += item.codeename+',';
							}
						}
					}
				});
			}
		});
		countryCnames = countryCnames.substring(0, countryCnames.lastIndexOf(','));
		countryEnames = countryEnames.substring(0, countryEnames.lastIndexOf(','));
		$('#input_applyCountryName').val(countryCnames);
		$('#input_applyCountryName').attr("value",countryCnames);
		//修改国籍居民信息
		//setConfirm_applyNationlityStr();
		//新版页面无确认页面，判断存在确认国籍居民元素时，从国籍居民字段组装其值
		if($('#confirm_applyNationlityStr').length>0)
		{
			var nationalityName = $('#input_applyCountryName').val();
			var isResident = $('#input_applyIsResident option:selected').text();
			$('#confirm_applyNationlityStr').text(nationalityName+isResident);
		}
		},
		err:function(){
			alert('err');
		}
	});
}

/**
 * 生成下拉框数据;
 * @param countrys
 * @return
 */
function addNation(countrys){
	var countryDiv = $('#div_nationalityInput_search').find('table>tbody');
	countryDiv.html('');
	var tr = '';
	$.each(countrys,function(i, country){
	
		tr += '<tr nationalityCode=' + country[0] +'><td><a href="javascript:">' + country[2] + '</a></td><td><a href="javascript:">' + country[1] + '</a></td></tr>';
		if($("#input_applyCountryName").val()!= country[2] ){
			$('#searchResultFlag').val("0");
		}
	});
	if(tr == ''){
		tr = '<tr><td colspan="2" align="center">对不起，查无此国家，您可以从下列表中选择。</td></tr>';
		$('#searchResultFlag').val("0");
	}
	countryDiv.html(tr);
}
