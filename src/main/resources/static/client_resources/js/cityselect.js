/* *
 * 全局空间 Vcity
 * */
var Vcity = {};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

//Vcity.allCity = ['北京市|beijing|bj','上海市|shanghai|sh','广州市|guangzhou|gz','深圳市|shenzhen|sz','南京市|nanjing|nj','杭州市|hangzhou|hz','天津市|tianjin|tj','重庆市|chongqing|cq','成都市|chengdu|cd','青岛市|qingdao|qd','苏州市|shuzhou|sz','无锡市|wuxi|wx','常州市|changzhou|cz','温州市|wenzhou|wz','武汉市|wuhan|wh','长沙市|changsha|cs','石家庄市|shijiazhuang|sjz','南昌市|nanchang|nc','三亚市|sanya|sy','合肥市|hefei|hf','郑州市|zhengzhou|zz','保定市|baoding|bd','唐山市|tangshan|ts','秦皇岛市|qinhuangdao|qhd','邯郸市|handan|hd','邢台市|xingtai|xt','张家口市|zhangjiakou|zjk','承德市|chengde|cd','衡水市|hengshui|hs','廊坊市|langfang|lf','沧州市|cangzhou|cz','太原市|taiyuan|ty','大同市|datong|dt','阳泉市|yangquan|yq','长治市|changzhi|cz','晋城市|jincheng|jc','朔州市|shuozhou|sz','晋中市|jinzhong|jz','运城市|yuncheng|yc','忻州市|xinzhou|xz','临汾市|linfen|lf','吕梁市|lvliang|ll','呼和浩特市|huhehaote|hhht','包头市|baotou|bt','乌海市|wuhai|wh','赤峰市|chifeng|cf','通辽市|tongliao|tl','鄂尔多斯市|eerduosi|eeds','呼伦贝尔市|hulunbeier|hlbe','巴彦淖尔市|bayannaoer|byne','乌兰察布市|wulanchabu|wlcb','兴安盟|xinganmeng|xam','锡林郭勒盟|xilinguolemeng|xlglm','阿拉善盟|alashanmeng|alsm','沈阳市|shenyang|sy','大连市|dalian|dl','鞍山市|anshan|as','抚顺市|fushun|fs','本溪市|benxi|bx','丹东市|dandong|dd','锦州市|jinzhou|jz','营口市|yingkou|yk','阜新市|fuxin|fx','辽阳市|liaoyang|ly','盘锦市|panjin|pj','铁岭市|tieling|tl','朝阳市|chaoyang|cy','葫芦岛市|huludao|hld','长春市|changchun|cc','吉林市|jilin|jl','四平市|siping|sp','辽源市|liaoyuan|ly','通化市|tonghua|th','白山市|baishan|bs','松原市|songyuan|sy','白城市|baicheng|bc','延边朝鲜族自治州|ybcxzzzz|ybcxzzzz','哈尔滨市|haerbin|heb','齐齐哈尔市|qiqihaer|qqhe','鸡西市|jixi|jx','鹤岗市|hegang|hg','双鸭山市|shuangyashan|sys','大庆市|daqing|dq','伊春市|yichun|yc','佳木斯市|jiamusi|jms','七台河市|qitaihe|qth','牡丹江市|mudanjiang|mdj','黑河市|heihe|hh','绥化市|suihua|sh','大兴安岭地区|daxinganling|dxaldq','徐州市|xuzhou|xz','南通市|nantong|nt','连云港市|lianyungang|lyg','淮安市|huaian|ha','盐城市|yancheng|yc','扬州市|yangzhou|yz','镇江市|zhenjiang|zj','泰州市|taizhou|tz','宿迁市|suqian|sq','宁波市|ningbo|nb','嘉兴市|jiaxing|jx','湖州市|huzhou|hz','绍兴市|shaoxing|sx','舟山市|zhoushan|zs','衢州市|quzhou|qz','金华市|jinhua|jh','台州市|taizhou|tz','丽水市|lishui|ls','芜湖市|wuhu|wh','蚌埠市|bengbu|bb','淮南市|huainan|hn','马鞍山市|maanshan|mas','淮北市|huaibei|hb','铜陵市|tongling|tl','安庆市|anqing|aq','黄山市|huangshan|hs','滁州市|chuzhou|cz','阜阳市|fuyang|fy','宿州市|suzhou|sz','巢湖市|chaohu|ch','六安市|luan|la','亳州市|bozhou|bz','池州市|chizhou|cz','宣城市|xuancheng|xc','福州市|fuzhou|fz','厦门市|xiamen|xm','莆田市|putian|pt','三明市|sanming|sm','泉州市|quanzhou|qz','漳州市|zhangzhou|zz','南平市|nanping|np','龙岩市|longyan|ly','宁德市|ningde|nd','景德镇市|jingdezhen|jdz','萍乡市|pingxiang|px','九江市|jiujiang|jj','新余市|xinyu|xy','鹰潭市|yingtan|yt','赣州市|ganzhou|gz','吉安市|jian|ja','宜春市|yichun|yc','抚州市|fuzhou|fz','上饶市|shangrao|sr','济南市|jinan|jn','淄博市|zibo|zb','枣庄市|zaozhuang|zz','东营市|dongying|dy','烟台市|yantai|yt','潍坊市|weifang|wf','济宁市|jining|jn','泰安市|taian|ta','威海市|weihai|wh','日照市|rizhao|rz','莱芜市|laiwu|lw','临沂市|linyi|ly','德州市|dezhou|dz','聊城市|liaocheng|lc','滨州市|binzhou|bz','菏泽市|heze|hz','开封市|kaifeng|kf','洛阳市|luoyang|ly','平顶山市|pingdingshan|pds','安阳市|anyang|ay','鹤壁市|hebi|hb','新乡市|xinxiang|xx','焦作市|jiaozuo|jz','濮阳市|puyang|py','许昌市|xuchang|xc','漯河市|luohe|lh','三门峡市|sanmenxia|smx','南阳市|nanyang|ny','商丘市|shangqiu|sq','信阳市|xinyang|xy','周口市|zhoukou|zk','驻马店市|zhumadian|zmd','济源市|jiyuan|jiyuan','黄石市|huangshi|hs','十堰市|shiyan|sy','宜昌市|yichang|yc','襄樊市|xiangfan|xf','鄂州市|ezhou|ez','荆门市|jingmen|jm','孝感市|xiaogan|xg','荆州市|jingzhou|jz','黄冈市|huanggang|hg','咸宁市|xianning|xn','随州市|suizhou|sz','恩施土家族苗族自治州|estjzmzzzz|estjzmzzzz','仙桃市|xiantao|xt','潜江市|qianjiang|qj','天门市|tianmen|tm','神农架林区|shennongjia|snjlq','株洲市|zhuzhou|zz','湘潭市|xiangtan|xt','衡阳市|hengyang|hy','邵阳市|shaoyang|sy','岳阳市|yueyang|yy','常德市|changde|cd','张家界市|zhangjiajie|zjj','益阳市|yiyang|yy','郴州市|chenzhou|cz','永州市|yongzhou|yz','怀化市|huaihua|hh','娄底市|loudi|ld','湘西土家族苗族自治州|xxtjzmzzzz|xxtjzmzzzz','韶关市|shaoguan|sg','珠海市|zhuhai|zh','汕头市|shantou|st','佛山市|foushan|fs','江门市|jiangmen|jm','湛江市|zhanjiang|jz','茂名市|maoming|mm','肇庆市|zhaoqing|zq','惠州市|huizhou|hz','梅州市|meizhou|mz','汕尾市|shanwei|sw','河源市|heyuan|hy','阳江市|yangjiang|yj','清远市|qingyuan|qy','东莞市|dongguan|dg','中山市|zhongshan|zs','潮州市|chaozhou|cz','揭阳市|jieyang|jy','云浮市|yunfu|yf','南宁市|nanning|nn','柳州市|liuzhou|lz','桂林市|guilin|gl','梧州市|wuzhou|wz','北海市|beihai|bh','防城港市|fangchenggang|fcg','钦州市|qinzhou|qz','贵港市|guigang|gg','玉林市|yulin|yl','百色市|baise|bs','贺州市|hezhou|hz','河池市|hechi|hc','来宾市|laibin|lb','崇左市|chongzuo|cz','海口市|haikou|hk','三亚市|sanya|sy','五指山市|wuzhishan|wzs','琼海市|qionghai|qh','儋州市|danzhou|dz','文昌市|wenchang|wc','万宁市|wanning|wn','东方市|dongfang|df','定安县|dingan|da','屯昌县|tunchang|tc','澄迈县|chengmai|cm','临高县|lingao|lg','白沙黎族自治县|bsnzzzx|bsnzzzx','昌江黎族自治县|cjlzzzx|cjlzzzx','乐东黎族自治县|ldlzzzx|ldlzzzx','陵水黎族自治县|lingshui|ls','保亭黎族苗族自治县|btlzmzzzx|btlzmzzzx','琼中黎族苗族自治县|qzlzmzzzx|qzlzmzzzx','西沙群岛|xishaqundao|xsqd','南沙群岛|nanshaqundao|nsqd','中沙群岛的岛礁及其海域|zhongshaqundao|zsqd','自贡市|zigong|zg','攀枝花市|panzhihua|pzh','泸州市|luzhou|lz','德阳市|deyang|dy','绵阳市|mianyang|my','广元市|guangyuan|gy','遂宁市|suining|sn','内江市|neijiang|nj','乐山市|leshan|ls','南充市|nanchong|nc','眉山市|meishan|ms','宜宾市|yibin|yb','广安市|guangan|ga','达州市|dazhou|dz','雅安市|yaan|ya','巴中市|bazhong|bz','资阳市|ziyang|zy','阿坝藏族羌族自治州|abzzqzzzz|abzzqzzzz','甘孜藏族自治州|gzzzzzz|gzzzzzz','凉山彝族自治州|lsyzzzz|lsyzzzz','贵阳市|guiyang|gy','六盘水市|liupanshui|lps','遵义市|zunyi|zy','安顺市|anshun|as','铜仁地区|tongren|tr','黔西南布依族苗族自治州|qxnbyzmzzzz|qxnbyzmzzzz','毕节地区|bijie|bj','黔东南苗族侗族自治州|qdnmzdzzzz|qdnmzdzzzz','黔南布依族苗族自治州|qnbyzmzzzz|qnbyzmzzzz','昆明市|kunming|km','曲靖市|qujing|qj','玉溪市|yuxi|yx','保山市|baoshan|bs','昭通市|zhaotong|zt','丽江市|lijiang|lj','思茅市|simao|sm','临沧市|lincang|lc','楚雄彝族自治州|cxyzzzz|cxyzzzz','红河哈尼族彝族自治州|hhhnzyzzzz|hhhnzyzzzz','文山壮族苗族自治州|wszzmzzzz|wszzmzzzz','西双版纳傣族自治州|xsbndzzzz|xsbndzzzz','大理白族自治州|dlbzzzz|dlbzzzz','德宏傣族景颇族自治州|dhdzjpzzzz|dhdzjpzzzz','怒江傈僳族自治州|njlszzzz|njlszzzz','迪庆藏族自治州|dqzzzzz|dqzzzzz','拉萨市|lasa|ls','昌都地区|changdudiqu|cd','山南地区|shannandiqu|sndq','日喀则地区|rikazediqu|rkzdq','那曲地区|naqudiqu|nqdq','阿里地区|alidiqu|aldq','林芝地区|linzhidiqu|lzdq','西安市|xian|xa','铜川市|tongchuan|tc','宝鸡市|baoji|bj','咸阳市|xianyang|xy','渭南市|weinan|wn','延安市|yanan|ya','汉中市|hanzhong|hz','榆林市|yulin|yl','安康市|ankang|ak','商洛市|shangluo|sl','兰州市|lanzhou|lz','嘉峪关市|jiayuguan|jyg','金昌市|jinchang|jc','白银市|baiyin|by','天水市|tianshui|ts','武威市|wuwei|ww','张掖市|zhangye|zy','平凉市|pingliang|pl','酒泉市|jiuquan|jq','庆阳市|qingyang|qy','定西市|dingxi|dx','陇南市|longnan|ln','临夏回族自治州|lxhzzzz|lxhzzzz','甘南藏族自治州|gnzzzzz|gnzzzzz','西宁市|xining|xn','海东地区|haidongdiqu|hddq','海北藏族自治州|hbzzzzz|hbzzzzz','黄南藏族自治州|hnzzzzz|hnzzzzz','海南藏族自治州|hnzzzzz|hnzzzzz','果洛藏族自治州|glzzzzz|hlzzzzz','玉树藏族自治州|yszzzzz|yszzzzz','海西蒙古族藏族自治州|hxmgzzzzzz|hxmgzzzzzz','银川市|yinchuan|yc','石嘴山市|shizuishan|szs','吴忠市|wuzhong|wz','固原市|guyuan|gy','中卫市|zhongwei|zw','乌鲁木齐市|wulumuqi|wlmq','克拉玛依市|kelamayi|klmy','吐鲁番地区|tulufandiqu|tlfdq','哈密地区|hamidiqu|hmdq','昌吉回族自治州|cjhzzzz|cjhzzzz','博尔塔拉蒙古自治州|betlmgzzz|betlmgzzz','巴音郭楞蒙古自治州|byglmgzzz|byglmgzzz','阿克苏地区|akesudiqu|aksdq','克孜勒苏柯尔克孜自治州|kzlskekzzzz|kzlskekzzzz','喀什地区|kashidiqu|ksdq','和田地区|hetian|ht','伊犁哈萨克自治州|ylhskzzz|ylhskzzz','塔城地区|tachengdiqu|tcdq','阿勒泰地区|aletaidiqu|altdq','石河子市|shihezi|shz','阿拉尔市|alaer|ale','图木舒克市|tumushuke|tmsk','五家渠市|wujiaqu|wjq','台北市|taibei|tb','高雄市|gaoxiong|gx','基隆市|jilong|jl','台中市|taizhong|tz','台南市|tainan|tn','新竹市|xinzhu|xz','嘉义市|jiayi|jy','台北县|taibeixian|tbx','宜兰县|yilanxian|ylx','桃园县|taoyuanxian|tyx','新竹县|xinzhuxian|xzx','苗栗县|miaolixian|mlx','台中县|taizhongxian|tzx','彰化县|zhanghuaxian|zhx','南投县|nantouxian|ntx','云林县|yunlinxian|ylx','嘉义县|jiayixian|jyx','台南县|tainanxian|tnx','高雄县|gaoxiongxian|gxx','屏东县|pingdongxian|pdx','澎湖县|penghuxian|phx','台东县|taidongxian|tdx','花莲县|hualianxian|hlx','中西区|zhongxiqu|zxq','东区|dongqu|dq','九龙城区|jiulongchengqu|jlcq','观塘区|guantangqu|gtq','南区|nanqu|nq','深水埗区|shenshuibuqu|ssbq','黄大仙区|huangdaxianqu|hdxq','湾仔区|wanzaiqu|wzq','油尖旺区|youjianwangqu|yjwq','离岛区|lidaoqu|ldq','葵青区|kuiqingqu|kqq','北区|beiqu|bq','西贡区|xigongqu|xgq','沙田区|shatianqu|stq','屯门区|tunmenqu|tmq','大埔区|dabuqu|dbq','荃湾区|quanwanqu|qwq','元朗区|yuanlangqu|ylq','花地玛堂区|huadimatangqu|hdmtq','圣安多尼堂区|shenganduonitangqu|sadntq','大堂区|datangqu|dtq','望德堂区|wangdetangqu|wdtq','风顺堂区|fengshuntangqu|fstq','嘉模堂区|jiamotangqu|jmtq','圣方济各堂区|shengfangjigetangqu|sfjgtq'];


/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*\|(\d*)$/i;
Vcity.regEx2 = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\d*)$/i;
Vcity.regExChinese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
	getCitycode();
    var citys = Vcity.allCity, match, letter,
            regEx = Vcity.regEx,
            reg2 = /^[a-e]$/i, reg3 = /^[f-j]$/i, reg4 = /^[k-p]$/i,reg5 = /^[q-w]$/i,reg6 = /^[x-z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},ABCDE:{},FGHJ:{},KLMNP:{},QRSTW:{},XYZ:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.ABCDE[letter]) Vcity.oCity.ABCDE[letter] = [];
                Vcity.oCity.ABCDE[letter].push(match[1]+"|"+match[4]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.FGHJ[letter]) Vcity.oCity.FGHJ[letter] = [];
                Vcity.oCity.FGHJ[letter].push(match[1]+"|"+match[4]);
            }else if (reg4.test(letter)) {
                if (!Vcity.oCity.KLMNP[letter]) Vcity.oCity.KLMNP[letter] = [];
                Vcity.oCity.KLMNP[letter].push(match[1]+"|"+match[4]);
            }else if (reg5.test(letter)) {
                if (!Vcity.oCity.QRSTW[letter]) Vcity.oCity.QRSTW[letter] = [];
                Vcity.oCity.QRSTW[letter].push(match[1]+"|"+match[4]);
            }else if (reg6.test(letter)) {
                if (!Vcity.oCity.XYZ[letter]) Vcity.oCity.XYZ[letter] = [];
                Vcity.oCity.XYZ[letter].push(match[1]+"|"+match[4]);
            }

        }
	    //热门城市
		if(Vcity.hotCityShow){
			var hotCity=Vcity.hotCity;
			for (var i = 0, n = hotCity.length; i < n; i++) {
            	match = regEx.exec(hotCity[i]);
             	if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
             	Vcity.oCity.hot['hot'].push(match[1]+"|"+match[4]);
            }
		}
        
    }
})();


/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">拼音支持首字母输入</p>',
    '<ul class="cityTab">',
    '<li class="hotTag on">热门城市</li>',
    '<li>ABCDE</li>',
    '<li>FGHJ</li>',
    '<li>KLMNP</li>',
    '<li>QRSTW</li>',
    '<li>XYZ</li>',
    '</ul>'
];

/* 没有热门城市的HTML模板 */
Vcity._template2 = [
    '<p class="tip">拼音支持首字母输入</p>',
    '<ul class="cityTab">',
    '<li class="on">ABCDE</li>',
    '<li>FGHJ</li>',
    '<li>KLMNP</li>',
    '<li>QRSTW</li>',
    '<li>XYZ</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
    	if(!Vcity.cityshow){
    		return;
    	}
        var input = options.input;
        // this.input = Vcity._m.$('#'+ input);
        this.input = $('#'+ input);
        this.inputEvent();
    },

    /* *
        

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */
    createWarp:function(){
        var inputPos = $(this.input).offset();
        var inputHeight = $(this.input).outerHeight(true);
        var div = this.rootDiv = $('<div></div>');
        var that = this;

        // 设置DIV阻止冒泡
        $(this.rootDiv).click(function(event){
            event = event || window.event;
            event.stopPropagation();
        });

        // 设置点击文档隐藏弹出的城市选择框
        $(document).click(function(event){
            event = event || window.event;
            var target = event.target;
            if(target == that.input) return false;
            if(that.cityBox){
                $(that.cityBox).addClass("hide");
            }
            if(that.ul){
                $(that.ul).addClass("hide");
            }
            if(that.myIframe){
                $(that.myIframe).addClass("hide");
            }
        });
        $(div).addClass("citySelector").css({
            position:"absolute",
            left:inputPos.left,
            top:inputPos.top + inputHeight + 5,
            zIndex:9999
        });

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }
        var childdiv = this.cityBox = $('<div></div>');
        $(childdiv).addClass('cityBox').attr("id","cityBox");
        if(Vcity.hotCityShow){
        	$(childdiv).html(Vcity._template.join(''));
        }else{
        	$(childdiv).html(Vcity._template2.join(''));
        }
        var hotCity = this.hotCity =  $('<div></div>');
        $(hotCity).addClass('hotCity');
        $(childdiv).append(hotCity);
        $(div).append(childdiv);
        this.createHotCity();
    },
    /* *
     * @changePos
     * 改变框架的位置
     * */
    changePos:function(){
        var inputPos = $(this.input).offset();
        var inputHeight = $(this.input).outerHeight(true);
        $(this.rootDiv).css({
            left:inputPos.left,
            top:inputPos.top + inputHeight+ 5
        });
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/
    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = $('<div></div>');
            // 先设置全部隐藏hide
            $(odiv).addClass(key + ' ' + 'cityTab hide');
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            var regEx2=Vcity.regEx2;
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = $("<dl></dl>");
                odt = $("<dt></dt>");
                odd = $("<dd></dd>");
                odt.html(sortKey[j] == 'hot'?'&nbsp;':sortKey[j]);
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                	var stri= oCity[key][sortKey[j]][i];
                	match = regEx2.exec(oCity[key][sortKey[j]][i]);
                    str = '<a value="'+match[2]+'">' + match[1] + '</a>';
                    odda.push(str);
                }
                $(odd).html(odda.join(''));
                $(odl).html(odt);
                $(odl).append(odd);
                $(odiv).append(odl);
            }

            // 移除热门城市的隐藏CSS
            $(this.hot).removeClass("hide");
            $(this.hotCity).append(odiv);
        }
        $("body").append(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = $(this.cityBox).children("li");
        var divs = $(this.hotCity).find("div");
        var that = this;
        $(that.rootDiv).delegate("li","click",function(event){
            var $this = $(this);
            var $index = $this.index();
            if(!$this.hasClass("on")){
                $this.addClass("on").siblings("li").removeClass("on");
                $(that.hotCity).children("div").addClass("hide").eq($index).removeClass("hide");
            }
            that.changeIframe();
        });
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * 点击tab页
     * */
    linkEvent:function(){
        var links = $(this.hotCity).find("a");
        var that = this;
        $(this.hotCity).find("a").click(function(){
            $(that.input).val($(this).text());
            var areacode = $(this).attr("value");
            setAreacode(areacode);
            getComCodeInfoByAreaCode_();
            
          //追加原产品方案点击城市控件后的处理逻辑
            var productCode = $("#productcode").val();
    		//电子发票展示控制
    		if("EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode|| "JBD_B" == productCode|| "JBM_S" == productCode||"ZFO" == productCode){
    			showInvoiceDivNew($("#sumpremium").val());
    		}
    		//规范归属机构控制
    		checkMakeComCode();
    		if(",YXL,".indexOf(productCode)>-1){
    			toggleCombo("combo_C","1");
    		}
    		if(",YEHKM,".indexOf(productCode)>-1){
    			uploadCombo("cityChange");
    		}
    		if(",WAF_N,".indexOf(productCode)>-1){
    			calculateFee("sync");
    		}
    		if("JMA" == $("#productcode").val()){
    			getItemdata();
    			setJMACity(this);
    		}
    		if("JAB_A"==$("#productcode").val()){
    			getRate('sync');
    			if($("#areacode").val()=="33020000"){
    				setTplus7day();
    			}
    		}
    		if("JBM_S" == $("#productcode").val()){
    			$("#cityname1").text($("#cityname").val());
    			setCityNameSpan();
   				showValidateResultNew("cityname", "");
   		 	}
            /* 点击城市名的时候隐藏myIframe */
            $(that.cityBox).addClass("hide")
            $(that.myIframe).addClass("hide")
        });
    },


    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */
    inputEvent:function(){
        var that = this;
        $(this.input).click(function(event){
            event = event || window.event;
            event.stopPropagation();
            if($(this).attr("readonly") == "readonly"){
                return false;
            }
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && $(that.cityBox).hasClass("hide")){
                that.changePos();
                if(!that.ul || (that.ul && $(that.ul).hasClass("hide"))){
                    $(that.cityBox).removeClass("hide")
                    /* IE6 移除iframe 的hide 样式 */
                    $(that.myIframe).removeClass("hide")
                    that.changeIframe();
                }
            }
        });
        $(this.input).blur(function(){
            var value = $.trim($(that.input).val());
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
                var flag = 0;
                for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                    if (reg.test(Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    $(that.input).val("");
                    setAreacode("");
                    getComCodeInfoByAreaCode_();
                }else{
                    var lis = $(that.ul).children("li");
                    var flag2 = false; 
                    var flagA = false; 
                    if(typeof lis == 'object' && lis['length'] > 0){
                    	var i = 0;
                    	for (l = lis.length; i < l; i++) {
							if ($(lis[i]).children(".cityname").text() == value) {
								flagA = true;
								break;
							}
						} 
                    	var li = lis[0];
	                    if(flagA){ 
	                    	li = lis[i]; 
                        }
	                    var bs = li.children;
                        if(bs && bs['length'] > 1){
                            $(that.input).val($(bs[0]).text());
                            var areacode = $(li).children("b").eq(0).attr("value");
                            setAreacode(areacode);
                            getComCodeInfoByAreaCode_();
                        } 
                    }
                    // else{
                    //     $(that.input).val("");
                    // }
                }
              //追加原产品方案点击城市控件后的处理逻辑
                var productCode = $("#productcode").val();
        		//电子发票展示控制
        		if("EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode|| "JBD_B" == productCode|| "JBM_S" == productCode|| "ZFO" == productCode){
        			showInvoiceDivNew($("#sumpremium").val());
        		}
        		//规范归属机构控制
        		checkMakeComCode();
        		if(",YXL,".indexOf(productCode)>-1){
        			toggleCombo("combo_C","1");
        		}
        		if(",YEHKM,".indexOf(productCode)>-1){
        			uploadCombo("cityChange");
        		}
        		if(",WAF_N,".indexOf(productCode)>-1){
        			calculateFee("sync");
        		}
        		if("JMA" == $("#productcode").val()){
        			getItemdata();
        			setJMACity(this);
        		}
        		if("JAB_A"==$("#productcode").val()){
        			getRate('sync');
        			if($("#areacode").val()=="33020000"){
        				setTplus7day();
        			}
        			return true;
        		}
        		if("JBM_S" == $("#productcode").val()){
       			 	$("#cityname1").text($("#cityname").val());
       			 	setCityNameSpan();
       				showValidateResultNew("cityname", "");
       		 	}
            }else{
                $(that.input).val("");
                setAreacode("");
                getComCodeInfoByAreaCode_();
                if("JBM_S" == $("#productcode").val()){
        			$("#cityname1").text($("#cityname").val());
        			setCityNameSpan();
       				showValidateResultNew("cityname", "");
       		 	}
            }
        }).keyup(function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            $(that.cityBox).addClass("hide");
            that.createUl();
            /* 移除iframe 的hide 样式 */
            $(that.myIframe).addClass("hide")
            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !$(that.ul).hasClass("hide") && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */
    createUl:function () {
        var str;
        var value = $.trim($(this.input).val());
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            // 此处需设置中文输入法也可用onpropertychange
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li  ><b class="cityname" value="'+match[4]+'">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on"  ><b class="cityname" value="'+match[4]+'">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = $("<ul></ul>");
                $(ul).addClass('cityslide mCustomScrollbar');
                this.rootDiv && $(this.rootDiv).append(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && $(this.ul).hasClass("hide")) {
                this.count = 0;
                $(this.ul).removeClass("hide");
            }
            $(this.ul).html(searchResult.join(''));

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            $(this.ul).addClass("hide");
            $(this.cityBox).removeClass("hide");
            $(this.myIframe).removeClass("hide");
            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */
    KeyboardEvent:function(event,keycode){
        var lis = $(this.ul).children("li");
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    $(lis[i]).removeClass("on");
                }
                $(lis[this.count]).addClass("on");
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    $(lis[i]).removeClass("on");
                }
                $(lis[this.count]).addClass("on");
                break;
            case 13: // enter键
                $(this.input).val(Vcity.regExChinese.exec(lis[this.count].innerHTML)[0]);
                var target=lis[this.count];
                var areacode=target.childNodes[0].getAttribute("value");
                setAreacode(areacode);
                getComCodeInfoByAreaCode_();
                hideTipsNew('cityname');
                $(this.ul).addClass("hide");
                /* IE6 */
                $(this.myIframe).addClass("hide");
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */
    liEvent:function(){
        var that = this;
        var lis = $(this.ul).children("li");
        $(this.ul).children("li").click(function(event){
            event = event || window.event;
            event.stopPropagation();
            target = event.target;
            if(!$(this).hasClass("empty")){
                // that.input.value = Vcity.regExChinese.exec(target.innerHTML)[0];
                $(that.input).val($(this).children(".cityname").text());
                var areacode = $(this).children(".cityname").attr("value");
                setAreacode(areacode);
                getComCodeInfoByAreaCode_();
            }else{
            	$(that.input).val("");
            }
            $(that.ul).html("");
            $(that.ul).addClass("hide");
            $(that.myIframe).addClass("hide");
            //追加原产品方案点击城市控件后的处理逻辑
            var productCode = $("#productcode").val();
    		//电子发票展示控制
    		if("EAK_X" == productCode || ("EFFEFG" == productCode && "Info" == $("#processbar").val()) || "EJQ_Z" == productCode || "LEF" == productCode|| "JBD_B" == productCode|| "JBM_S" == productCode|| "ZFO" == productCode){
    			showInvoiceDivNew($("#sumpremium").val());
    		}
    		//规范归属机构控制
    		checkMakeComCode();
    		if(",YXL,".indexOf(productCode)>-1){
    			toggleCombo("combo_C","1");
    		}
    		if(",YEHKM,".indexOf(productCode)>-1){
    			uploadCombo("cityChange");
    		}
    		if(",WAF_N,".indexOf(productCode)>-1){
    			calculateFee("sync");
    		}
    		if("JMA" == $("#productcode").val()){
    			getItemdata();
    			setJMACity(this);
    		}
    		if("JAB_A"==$("#productcode").val()){
    			getRate('sync');
    			if($("#areacode").val()=="33020000"){
    				setTplus7day();
    			}
    			return true;
    		}
    		if("JBM_S" == $("#productcode").val()){
   			 	$("#cityname1").text($("#cityname").val());
   			 	setCityNameSpan();
   				showValidateResultNew("cityname", "");
   		 	}
        }).mouseover(function(){
            $(this).addClass("on").siblings().removeClass("on");
        }).mouseout(function(){
            $(this).removeClass("on");
        });
    }
};


/**从后台获取城市列表**/
function getCitycode(){
	var productcode = $('#productcode').val();
	if(productcode!=null&&productcode!=""){
		$.ajax({
			url:'/eproperty/getCityJson.do',
			data:{
				productCode:productcode
	           },
			type:'post',
			dataType:'json',
			async:false,
			success:function(data){
				var cityshow=data.cityshow;
				var citycodes=null;
				if(cityshow=="1"){
					Vcity.cityshow=true;
					Vcity.allCity=data.citycodes;
					if(data.hotcity=="1"){
						Vcity.hotCityShow=true;
						Vcity.hotCity=data.hotcitycodes;
					}else{
						Vcity.hotCityShow=false;
						Vcity.hotCity={};
					}

				}else{
					Vcity.cityshow=false;
					Vcity.allCity={};
					Vcity.hotCityShow=false;
					Vcity.hotCity={};
					$("#comcode").val(data.comcode);
					$("#areacode").val(data.areacode);
					$("#cityname").val(data.cityname);
				}
			},
			err:function(){
			}
		});
	}
}

function getComCodeInfoByAreaCode_() {
	if ("Info"==$("#processbar").val()||"Continue"==$("#processbar").val()) {
		var areacode = $("#areacode").val();
		var productcode = $("#productcode").val();
		var data = 'areacode=' + areacode;
		$.ajax({
			type : 'post',
			url : '/eproperty/eaproposal/getComcode.do',
			data : data,
			success : function(data) {
				if (data != null) {
						if(data.count==1){
							var comcodess = data.comcodes[0].split(",");
							$("#comcode").val(comcodess[1]);
							if("JBM_S" == productcode){
								$('#comcodeLeft').css("display","none");
								$('#comcodeRight').css("display","none");
							}else{
								$('#comcodeSelect').css("display","none");
							}
							hideTipsNew('comcode');
						}else if(data.count>1){
							var htmlStr="";
							$.each(data.comcodes, function(i, item){
								var comcodess =item.split(",");
								var companyName = comcodess[0].length > 12?comcodess[0].substring(0,12)+ '..':comcodess[0];
								if(i==0){
									$('#comcodeSelect').children("span").html(companyName);
									$("#comcode").val(comcodess[1]);
								}
								htmlStr+='<li strValue=\"'+comcodess[1]+'\">'+comcodess[0]+'</li>';
							});
							$('#comcodeSelect').children("ul").html(htmlStr);
							if("JBM_S" == productcode){
								$('#comcodeLeft').css("display","");
								$('#comcodeRight').css("display","");
							}else{
								$('#comcodeSelect').css("display","");
							}
							showTipsNew('comcode',''); // 您的保单将由您选择的人保分公司为您提供后援服务。  分公司提示
							if($("#areacode").val()=="50000000"){
								$('#comcodeSelect').children("span").html("人保财险重庆电子商务营业部");
								$("#comcode").val("50017900");
							}else if($("#areacode").val()=="21020000"){
								$('#comcodeSelect').children("span").html("长海支公司");
								$("#comcode").val("21022400");
							}
						}else if(data.count==0){
							$("#comcode").val("");
							if("JBM_S" == productcode){
								$('#comcodeLeft').css("display","none");
								$('#comcodeRight').css("display","none");
							}else{
								$('#comcodeSelect').css("display","none");
							}
							hideTipsNew('comcode');
						}
				}
			},
			err : function() {
			}
		});
	}
}

function setAreacode(str){
	$("#areacode").val(str);
	var couponsType = $("#couponsType").val();
    if(null != couponsType && couponsType != "" && couponsType != undefined){
    	showTipsWindown("保单信息变更，请重新选择优惠券。");
    }
    if($('#productcode').val()=="LAY_H"||$('#productcode').val()=="LAY_A"||$('#productcode').val()=="LAY_G"||$('#productcode').val()=="LAY_J"||$('#productcode').val()=="LAY_N"){
    	queryUseCoupons();
    	calculateFee("invalid");
    }
    if($('#productcode').val()=="EFFEFG" || $('#productcode').val()=="ECK"){
    	queryUseCoupons();
    	calculateFee();
    }
    if($('#productcode').val()=="WAF_N"){
    	queryUseCoupons();
    	calculateFee();
    }
}



