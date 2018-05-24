define("payApply/finance.js",["common/wx/Step.js","biz_web/ui/checkbox.js","biz_common/jquery.validate.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/Cgi.js","biz_web/utils/upload.js"],function(e){
"use strict";
function a(){
function e(){
function e(e,a,n,i){
this.loca=e,this.locacity=a,this.locaid=n,this.locacityids=i;
}
var a=new Array(31);
a[0]=new e("请选择省份名","请选择城市名","",""),a[1]=new e("北京","北京","1","10"),a[2]=new e("上海","上海","2","21"),
a[3]=new e("天津","天津","3","22"),a[4]=new e("重庆","重庆","4","23"),a[5]=new e("河北","石家庄|张家口|承德|秦皇岛|唐山|廊坊|保定|沧州|衡水|邢台|邯郸","5","311|313|314|335|315|316|312|317|318|319|310"),
a[6]=new e("山西","太原|大同|朔州|阳泉|长治|晋城|忻州|离石|榆次|临汾|运城","6","351|352|349|353|355|356|350|358|354|357|359"),
a[7]=new e("内蒙古","呼和浩特(*)|包头|乌海|赤峰|海拉尔|乌兰浩特|通辽|锡林浩特|集宁|东胜|临河|阿拉善左旗|巴彦淖尔|呼伦贝尔|阿拉善左旗|乌兰察布|锡林郭勒盟|兴安盟|鄂尔多斯","7","471|472|473|476|470|482|475|479|474|477|478|483|480|481|483|484|485|486|489"),
a[8]=new e("辽宁","沈阳(*)|朝阳|阜新|铁岭|抚顺|本溪|辽阳|鞍山|丹东|大连|营口|盘锦|锦州|葫芦岛","8","24|421|418|410|413|414|419|412|415|411|417|427|416|429"),
a[9]=new e("吉林","长春(*)|白城|松原|吉林|四平|辽源|通化|白山|延吉","9","431|436|438|432|434|437|435|439|433"),
a[10]=new e("黑龙江","哈尔滨(*)|齐齐哈尔|黑河|大庆|伊春|鹤岗|佳木斯|双鸭山|七台河|鸡西|牡丹江|绥化|加格达奇","10","451|452|456|459|458|468|454|469|464|467|453|455|457"),
a[11]=new e("江苏","南京(*)|苏州|徐州|连云港|宿迁|淮安|盐城|扬州|泰州|南通|镇江|常州|无锡","11","25|512|516|518|527|517|515|514|523|513|511|519|510"),
a[12]=new e("浙江","杭州(*)|湖州|嘉兴|舟山|宁波|绍兴|金华|台州|温州|丽水|衢州","12","571|572|573|580|574|575|579|576|577|578|570"),
a[13]=new e("安徽","合肥(*)|宿州|淮北|阜阳|蚌埠|淮南|滁州|马鞍山|芜湖|铜陵|安庆|黄山|六安|巢湖|贵池|宣城|亳州","13","551|557|561|558|552|554|550|555|553|562|556|559|564|565|566|563|5581"),
a[14]=new e("福建","福州(*)|南平|三明|莆田|泉州|厦门|漳州|龙岩|宁德|福安|邵武|石狮|永安|武夷山|福清","14","591|599|598|594|595|592|596|597|593|5930|5990|5950|5980|5991|5995"),
a[15]=new e("江西","南昌(*)|九江|景德镇|鹰潭|新余|萍乡|赣州|上饶|临川|宜春|吉安|抚州","15","791|792|798|701|790|799|797|793|794|795|796|7940"),
a[16]=new e("山东","济南(*)|聊城|德州|东营|淄博|潍坊|烟台|威海|青岛|日照|临沂|枣庄|济宁|泰安|莱芜|滨州|菏泽","16","531|635|534|546|533|536|535|631|532|633|539|632|537|538|634|543|530"),
a[17]=new e("河南","郑州(*)|三门峡|洛阳|焦作|新乡|鹤壁|安阳|濮阳|开封|商丘|许昌|漯河|平顶山|南阳|信阳|济源|周口|驻马店","17","371|398|379|391|373|392|372|393|378|370|374|395|375|377|376|3910|394|396"),
a[18]=new e("湖北","武汉(*)|十堰|襄樊|荆门|孝感|黄冈|鄂州|黄石|咸宁|荆州|宜昌|恩施|仙桃|潜江|天门|随州","18","27|719|710|724|712|713|711|714|715|716|717|718|728|7281|7282|722"),
a[19]=new e("湖南","长沙(*)|张家界|常德|益阳|岳阳|株洲|湘潭|衡阳|郴州|永州|邵阳|怀化|娄底|吉首","19","731|744|736|737|730|733|732|734|735|746|739|745|738|743"),
a[20]=new e("广东","广州(*)|深圳|清远|韶关|河源|梅州|潮州|汕头|揭阳|汕尾|惠州|东莞|珠海|中山|江门|佛山|茂名|湛江|阳江|云浮|肇庆","20","20|755|763|751|762|753|768|754|663|660|752|769|756|760|750|757|668|759|662|766|758"),
a[21]=new e("广西","南宁(*)|桂林|柳州|贺州|玉林|钦州|北海|防城港|百色|河池|贵港|梧州|崇左","21","771|773|772|774|775|777|779|770|776|778|7750|7740|7711"),
a[22]=new e("海南","海口(*)|三亚|儋州","22","898|899|890"),a[23]=new e("四川","成都(*)|广元|绵阳|德阳|南充|广安|遂宁|内江|乐山|自贡|泸州|宜宾|攀枝花|巴中|达州|资阳|雅安|西昌|阿坝藏族羌族自治州区","23","28|839|816|838|817|826|825|832|833|813|830|831|812|827|818|8320|835|834|837"),
a[24]=new e("贵州","贵阳(*)|六盘水|遵义|毕节|铜仁|安顺|凯里|都匀|兴义","24","851|858|852|857|856|853|855|854|859"),
a[25]=new e("云南","昆明(*)|曲靖|玉溪|丽江|昭通|思茅|临沧|保山|潞西|泸水|中甸|大理|楚雄|个旧|文山|景洪|红河","25","871|874|877|888|870|879|883|875|692|886|887|872|878|873|876|691|8730"),
a[26]=new e("西藏","拉萨(*)|那曲|昌都|林芝|乃东|日喀则|噶尔","26","891|896|895|894|893|892|897"),
a[27]=new e("陕西","西安(*)|延安|铜川|渭南|咸阳|宝鸡|汉中|榆林|商洛|安康","27","29|911|919|913|910|917|916|912|914|915"),
a[28]=new e("甘肃","兰州(*)|嘉峪关|白银|天水|酒泉|张掖|金昌|西峰|平凉|定西|陇南|临夏|武威","28","931|937|943|938|9370|936|935|934|933|932|939|930|9350"),
a[29]=new e("宁夏","银川(*)|石嘴山|吴忠|固原","29","951|952|953|954"),a[30]=new e("青海","西宁(*)|平安|海晏|共和|同仁|玛沁|玉树|德令哈","30","971|972|970|974|973|975|976|977"),
a[31]=new e("新疆","乌鲁木齐(*)|克拉玛依|石河子|喀什|阿克苏|和田|吐鲁番|哈密|阿图什|博乐|昌吉|库尔勒|伊犁|奎屯|塔城|阿勒泰","31","991|990|993|998|997|903|995|902|908|909|994|996|999|992|901|906"),
a[32]=new e("香港","香港","32","8520"),a[33]=new e("台北","台北","33","2");
for(var n=a.length,i=0;n>i;++i){
var t="<option value='"+a[i].locaid+"'>"+a[i].loca+"</option>";
$("#area_code").append(t);
}
$("#area_code").change(function(){
$("#city_code").get(0).options.length=0;
for(var e=jQuery(this).get(0).selectedIndex,n=a[e].locacity.split("|"),i=a[e].locacityids.split("|"),t=n.length,c=0;t>c;++c){
var o="<option value='"+i[c]+"'>"+n[c]+"</option>";
$("#city_code").append(o);
}
});
}
if(o=new c({
container:"#step",
names:["1. 资料准备","2. 填写资料","3. 提交并预览"]
}),$("input[type=radio]").checkbox(),r=new v({
container:"#bank",
label:"请选择银行",
data:g,
callback:function(){}
}),e(),u=$("#form").validate({
rules:{
detail:{
required:!0
},
account:{
required:!0,
number:!0
},
name:{
required:!0
}
},
messages:{
detail:{
required:"开户银行详细名称不能为空"
},
account:{
required:"银行账户不能为空",
number:"银行帐号必须是纯数字"
},
name:{
required:"开户名称不能为空"
}
}
}),0==wx.cgiData.status)o.go(1),$("#step1").show(),$("input[name=detail]").val(wx.cgiData.info.detail),
$("input[name=account]").val(wx.cgiData.info.account),$("input[name=name]").val(wx.cgiData.info.name);else if(1==wx.cgiData.status||2==wx.cgiData.status){
$("#step,#bar,#modify").hide();
var a=wx.cgiData.info;
a.type=1==a.type?"个人银行账户":"本公司对公账户",a.imgUrl=h.multimediaFileUrl(a.imgUrl),g.each(function(e){
return(e.value=a.bank)?(a.bank=e.name,!1):void 0;
}),$("#info").html(template.render("tpl",a)),$("#step3").show();
}else 3==wx.cgiData.status&&(o.go(2),n(wx.cgiData.info),$("#step2").show(),0==$("#uploadFile").siblings("object").length&&i());
}
function n(e){
1==e.type?$("input[type=radio][data-value=1]").click():$("input[type=radio][data-value=2]").click(),
r.selected(e.bank),$("#area_code").val(e.provinceId).change(),setTimeout(function(){
$("#city_code").val(e.cityId);
},1e3),$("input[name=detail]").val(e.detail),$("input[name=account]").val(e.account),
$("input[name=name]").val(e.name),$("#preview").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:h.multimediaFileUrl(e.imgUrl),
src:h.multimediaFileUrl(e.imgUrl)
})),m=e.imgUrl,p=e.fileName;
}
function i(){
l({
container:"#uploadFile",
type:2,
multi:!1,
onComplete:function(e,a,n,i){
if(i.base_resp)switch(+i.base_resp.ret){
case 0:
b.suc("上传成功"),$("#preview").html('<a href="{href}" target="_blank"><img src="{src}"></a>'.format({
href:h.tmpFileUrl(i.content),
src:h.tmpFileUrl(i.content)
})).addClass("upload_preview_loaded"),m=i.content,p=n.name,w=!0;
break;

case 1:
b.err("图片太大");
break;

case 200011:
b.err("请上传合法的图片格式");
break;

default:
b.err("上传图片失败");
}
}
});
}
function t(){
$("#next1").click(function(){
$("#step2").show().siblings(".rn-box").hide(),o.go(2),0==$("#uploadFile").siblings("object").length&&i();
}),$("#next2").click(function(){
if(u.form()){
if(!r.name)return void b.err("请选择开户银行");
if(!$("#area_code").val())return void b.err("请选择开户银行省份");
if(!$("#city_code").val())return void b.err("请选择开户银行城市");
if(!m)return void b.err("请上传银行账号证明函");
s={
detail:$("input[name=detail]").val().trim(),
account:$("input[name=account]").val().trim(),
name:$("input[name=name]").val().trim(),
type:$("input[type=radio][checked=checked]").data("label"),
bank:r.name,
province:$("#area_code option:selected").text(),
city:$("#city_code option:selected").text(),
imgUrl:w?h.tmpFileUrl(m):h.multimediaFileUrl(m)
},$("#info").html(template.render("tpl",s)),d={
bank_name:$("input[name=detail]").val().trim(),
bank_account:$("input[name=account]").val().trim(),
bank_user_name:$("input[name=name]").val().trim(),
account_owner:$("input[type=radio][checked=checked]").data("value"),
bank:r.value,
bank_province:$("#area_code option:selected").text(),
bank_province_id:$("#area_code").val(),
bank_city:$("#city_code option:selected").text(),
bank_city_id:$("#city_code").val(),
certificate:m,
certificate_filename:p
},window.formData=d,$("#step3").show().siblings(".rn-box").hide(),o.go(3);
}
}),$("#next3").click(function(){
$("#next3").btn(!1),f.post({
url:"/merchant/businessaccess?action=bizpayfinance",
data:d,
callback:function(e){
$("#next3").btn(!0),0==e.base_resp.ret?($("#step").hide(),$("#step4").show().siblings(".rn-box").hide()):b.err();
}
});
}),$("#pre2").click(function(){
o.go(1),$("#step1").show().siblings(".rn-box").hide();
}),$("#pre3,#modify").click(function(){
o.go(2),$("#step2").show().siblings(".rn-box").hide();
});
}
var c=e("common/wx/Step.js");
e("biz_web/ui/checkbox.js"),e("biz_common/jquery.validate.js");
var o,l,r,u,m,s,d,p,w,v=e("biz_web/ui/dropdown.js"),b=e("common/wx/Tips.js"),f=e("common/wx/Cgi.js"),h=e("biz_web/utils/upload.js");
l=h.uploadTmpFile,w=!1;
var g=[{
name:"工商银行",
value:1002
},{
name:"招商银行",
value:1001
},{
name:"中国建设银行",
value:1003
},{
name:"中国农业银行",
value:1005
},{
name:"上海浦东发展银行",
value:1004
},{
name:"中国民生银行",
value:1006
},{
name:"深圳发展银行",
value:1008
},{
name:"兴业银行",
value:1009
},{
name:"平安银行",
value:1010
},{
name:"中国交通银行",
value:1020
},{
name:"中信实业银行",
value:1021
},{
name:"中国光大银行",
value:1022
},{
name:"农村合作信用社",
value:1023
},{
name:"上海银行",
value:1024
},{
name:"华夏银行",
value:1025
},{
name:"中国银行",
value:1026
},{
name:"广东发展银行",
value:1027
},{
name:"北京银行",
value:1032
},{
name:"邮政汇款",
value:1070
},{
name:"其他银行",
value:1099
}];
!function(){
a(),t();
}();
});