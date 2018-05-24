define("ad_system/promotion/new_edit.js",["biz_common/jquery.validate.js","common/wx/videoChange.js","ad_system/promotion/ad_timeset.js","common/qq/url.js","common/wx/dialog.js","common/wx/Step.js","common/qq/events.js","biz_web/ui/input/lentips.js","common/wx/Tips.js","biz_web/ui/checkbox.js","ad_system/promotion/ad_cgi.js","biz_web/lib/store.js","common/wx/multiSelector/city.js","common/wx/multiSelector/industry.js","common/wx/multiSelector/interest.js","biz_web/ui/dropdown.js","biz_web/ui/dateRange.js","common/wx/slider.js","common/wx/hourspan.js","common/wx/popup.js","common/wx/upload.js","material/common_edit.js","material/materialDialog.js","biz_common/moment.js","common/wx/verifycode.js","tpl/simplePopup.html.js","common/wx/Cgi.js","common/wx/pagebar.js"],function(e){
"use strict";
function t(){
if(0==N.crt_type);else if(1==N.crt_type){
var e=0==N.pos_type||2==N.pos_type?N.image_url_bottom_pic:N.image_url_top_pic;
if(!e)return G.err("请上传广告位图片"),!1;
var t=N.ad_content_img;
if(!t||t.length>15)return G.err("图片说明必须为1-15个字符"),!1;
var a=Ia(t);
if(a)return G.err("图片说明不能包含以下特殊字符："+a),!1;
N.ad_content=t,N.image_url=e;
}else if(2==N.crt_type){
var i=N.ad_content_card;
if(!i||i.length>14)return G.err("图文标题必须为1-14个字符"),!1;
var a=Ia(i);
if(a)return G.err("图文标题不能包含以下特殊字符："+a),!1;
var _=N.ad_desc;
if(!_||_.length>28)return G.err("图文描述必须为1-28个字符"),!1;
var a=Ia(_);
if(a)return G.err("图文描述不能包含以下特殊字符："+a),!1;
var e=N.image_url_card_pic;
if(!e)return G.err("请上传图文左侧配图"),!1;
N.ad_content=i,N.image_url=e;
}else if(3==N.crt_type||301==N.crt_type){
var n=N.crt_type,i=N["ad_content_"+n];
if(!i||i.length>18)return G.err("引导文案必须为1-18个字符"),!1;
var a=Ia(i);
if(a)return G.err("引导文案不能包含以下特殊字符："+a),!1;
N.ad_content=i;
}else if(4==N.crt_type){
var e=0==N.pos_type||2==N.pos_type?N.image_url_bottom_app_pic:N.image_url_top_app_pic;
if(!e)return G.err("请上传卡片左侧配图"),!1;
N.image_url=e;
}
if(1==N.dest_type){
var r=$("#js_outerlink").val().trim(),o=/:\/\//;
if(r&&!o.test(r)&&(r="http://"+r),!r)return G.err("请输入外部链接地址"),!1;
if(!it.url(r))return G.err("请输入正确的外部链接地址"),!1;
if(r.length>250)return G.err("外部链接地址必须少于250个字符"),!1;
N.outer_link=r;
}
if(6==N.type||5==N.type){
if(N.app_cover_flag){
if(1==N.app_cover_desc_length)return G.err("活动描述超过字数限制"),!1;
if(""==N.app_cover_url)return G.err("必须上传活动图片"),!1;
if(""==N.app_cover_desc)return G.err("必须添加活动描述"),!1;
}
if(N.app_video_flag){
if(""==N.app_video_url)return G.err("必须上传视频"),!1;
if(""==N.app_video_background)return G.err("必须上传视频封面"),!1;
}
}
return!0;
}
e("biz_common/jquery.validate.js");
var a,i,_,n,r,o,s,p,c,d,l,u,m,h,f,v,g,j,w,y,b,k,x,C=e("common/wx/videoChange.js"),D=wx.cgiData,q=null,I=null,z=1,A=4,N={},S=!1,F=!1,O=wx.cgiData.can_use_hyperlink,T=wx.cgiData.can_use_txad,P=wx.cgiData.nick_name,Y=wx.cgiData.can_use_top,M=wx.data.time,K=e("ad_system/promotion/ad_timeset.js"),B=e("common/qq/url.js"),E=e("common/wx/dialog.js"),L=e("common/wx/Step.js"),V=e("common/qq/events.js")(!0),R=e("biz_web/ui/input/lentips.js"),G=e("common/wx/Tips.js"),H=(e("biz_web/ui/checkbox.js"),
e("ad_system/promotion/ad_cgi.js")),U=e("biz_web/lib/store.js"),W=e("common/wx/multiSelector/city.js"),X=e("common/wx/multiSelector/industry.js"),J=e("common/wx/multiSelector/interest.js"),Q=e("biz_web/ui/dropdown.js"),Z=e("biz_web/ui/dateRange.js"),et=e("common/wx/slider.js"),tt=e("common/wx/hourspan.js"),at=e("biz_common/jquery.validate.js"),it=at.rules,_t=(e("common/wx/popup.js"),
e("common/wx/upload.js")),nt=_t.uploadCdnFileFromAd({
w:582,
h:166,
size:61440
}),rt=_t.uploadCdnFileFromAd({
w:900,
h:162,
size:40960
}),ot=_t.uploadCdnFileFromAd({
w:114,
h:114,
size:40960
}),st=_t.uploadCdnFileFromAd({
w:525,
h:258,
size:40960
}),pt=_t.uploadCdnFileFromAd({
w:600,
h:162,
size:30720
}),ct=_t.uploadCdnFileFromAd({
w:690,
h:140,
size:40960
}),dt=_t.uploadCdnFileFromAd({
w:320,
h:480,
size:40960
}),lt=e("material/common_edit.js"),ut=e("material/materialDialog.js"),mt=e("biz_common/moment.js"),O=wx.cgiData.can_use_hyperlink,ht=$("#js_ad_name"),ft=$("#js_ad_name_len_tips"),vt=$("#js_ad_goodtype"),gt=$("#js_ad_app_check_ios"),jt=$("#js_ad_app_check_android"),wt=$("#js_ad_pos_type"),yt=$("#js_crt_type"),$t=$("#js_dest_type"),bt=$("#js_crt_type_area"),kt=$("#js_dest_type_area"),xt=$("#js_ad_biz_content"),Ct=$("#js_ad_img_desc"),Dt=$("#js_select_appmsg"),qt=$("#js_outerlink"),It=$("#bid"),zt=$("#quota"),At=$("#js_ad_img_desc_len_tips"),Nt=$("#js_ad_biz_content_len_tips"),St=$("#js_ad_show_preview").find(".js_ad_show_preview"),Ft=vt.find(".frm_radio"),Ot=wt.find(".frm_radio"),Tt=yt.find(".frm_radio"),Pt=$t.find(".frm_radio"),Yt=$("#js_ad_appmsg_title"),Mt=$("#js_ad_appmsg_title_len_tips"),Kt=$("#js_ad_appmsg_desc"),Bt=$("#js_ad_appmsg_desc_len_tips"),Dt=$("#js_select_appmsg"),Et=$("#js_title_material"),Lt=$("#js_save_goto_step3"),Vt=($("#js_tag_container"),
$("#js_industry_container")),Rt=$("#js_goto_step3"),Gt=$("#js_back_step1"),Ht=$("#js_back_step2"),Ut=$("#js_edit_material"),Wt=$("#js_appmsg_info_preview"),Xt=$("#js_material_area"),Jt=$("#js_step3"),Qt=$("#js_step4"),Zt=$("#js_sex"),ea=$("#js_industry"),ta=$("#js_industry_area"),aa=ea.find(".frm_radio"),ia=Zt.find(".frm_radio"),_a=$("#js_age_user_info"),na=_a.find(".frm_radio"),ra=$("#js_connection"),oa=$("#js_connection_info"),sa=$("#js_operation_system"),pa=$("#js_os_info"),ca=$("#js_interest"),da=$("#js_area_user_info"),la=ra.find(".frm_checkbox"),ua=sa.find(".frm_checkbox"),ma=oa.find(".frm_radio"),ha=da.find(".frm_radio"),fa=pa.find(".frm_radio"),va=ca.find(".frm_radio"),ga=$("#js_goto_step2"),ja={
3:{
pos_type:1,
crt_type:8,
dest_type:0
},
4:{
pos_type:7,
crt_type:6,
dest_type:3
},
5:{
pos_type:7,
crt_type:16,
dest_type:0
},
6:{
pos_type:7,
crt_type:16,
dest_type:0
}
},wa={
0:{
crt_type:30,
dest_type:3
},
1:{
crt_type:18,
dest_type:3
},
2:{
crt_type:26,
dest_type:3
}
},ya={
0:{
dest_type:3
},
1:{
dest_type:3
},
2:{
dest_type:3
},
3:{
dest_type:3
},
4:{
dest_type:3
}
},$a={
IOS:"苹果系统",
ANDROID:"安卓系统",
WINDOWS:"微软系统",
SYMBIAN:"塞班系统",
JAVA:"爪哇系统",
OS_UNKNOWN:"未知系统"
},ba={
WIFI:"Wifi",
NET4G:"4G",
NET3G:"3G",
NET2G:"2G",
CONNECTION_UNKNOWN:"其他环境"
},ka=function(){},xa=K.createTimeSet,Ca=K.getFromTimeset,Da=function(){
I=new L({
container:"#js_step",
step:1,
names:["1. 基本信息","2. 编辑广告位","3. 投放设置","4. 预览并提交"]
});
},qa=function(e){
I.go(e);
for(var t=1;A>=t;++t)$("#js_step"+t)[t==e?"show":"hide"]();
z=e,V.trigger("_fnSetStep_"+e);
},Ia=function(e){
for(var t="<>&'\"/\\",a=[],i=0,_=e.length;_>i;++i){
var n=e.charAt(i);
-1!=t.indexOf(n)&&a.push(n);
}
return a.join("、");
},za=function(){},Aa=function(e){
var t=e.indexOf(".");
return-1!=t?(e=e.substring(0,t)+(e.substring(t+1)+"00").substring(0,2),1*e):100*e;
},Na=function(){
D=$.extend({
ad_name:"",
ad_goodtype:3,
crt_type:3,
pos_type:0,
dest_type:0,
ad_content:"",
ad_desc:"",
outer_link:"",
app_id:"",
start:0,
end:24,
target_url:"",
area:[],
channel_id:"",
channel_name:"主线包",
businessinterest:[],
wechatflowclass:[],
os:[""],
connection:[""],
age:["5~60"],
type:3,
app_info:{},
os_info:"0",
connection_info:"0",
gender:[]
},D);
var e=D.target_url,t="http://mp.weixin.qq.com/mp/ad?";
if(0==e.indexOf(t)){
var a=new B(e);
if(D.id=a.get("id"),D.sign=a.get("sign"),!D.id||!D.sign)return;
}
if(3!=D.crt_type||5!=D.type&&6!=D.type||(D.crt_type=301),D.begin_time&&D.end_time)D.begin_time=mt.unix(D.begin_time).format("YYYY-MM-DD"),
D.end_time=mt.unix(D.end_time).format("YYYY-MM-DD");else{
var i=mt.unix(M).add("d",7).format("YYYY-MM-DD"),_=mt.unix(M).add("d",0).format("YYYY-MM-DD");
D.begin_time=_,D.end_time=i;
}
if(D.type=D.type||3,D.timeset){
var n=Ca(D.timeset);
D.start=n.start,D.end=n.end;
}
var r=D.age;
r=D.age[0],r&&(r=r.split("~")),r&&2==r.length?(D.age_start=1*r[0],D.age_end=1*r[1]):(D.age_start=5,
D.age_end=60),D.gender=1==D.gender.length?D.gender[0]:"",!D.os||D.os.length<=0||1==D.os.length&&""==D.os[0]?(D.os=[""],
D.os_info="0"):D.os_info="1",!D.connection||D.connection.length<=0||1==D.connection.length&&""==D.connection[0]?(D.connection=[""],
D.connection_info="0"):D.connection_info="1",q=$.extend(!0,{},D),ka(D);
},Sa=function(e,t){
var a={};
if(a.type=e.type||3,a.crt_type=e.crt_type,a.crt_type=301==e.crt_type?3:e.crt_type,
a.dest_type=3==e.type?3:5==e.type||6==e.type?2:e.dest_type,a.image_url=e.image_url,
a.outer_link=e.outer_link,a.ad_content=e.ad_content,S=a.ad_content!=D.ad_content?!0:!1,
a.good_type=e.good_type,a.goods=e.goods,a.ad_desc=e.ad_desc,a.app_id=e.app_id,a.pos_type=e.pos_type,
a.channel_id=e.channel_id,a.channel_name=e.channel_name,e.app_cover_flag&&(a.app_cover_url=e.app_cover_url,
a.app_cover_desc=e.app_cover_desc),e.app_video_flag&&(a.app_video_url=e.app_video_url,
a.app_video_background=e.app_video_background),t)return a;
if(a.ad_name=e.ad_name,a.age=e.age.join("~"),a.gender=e.gender,a.day_budget=Aa(e.day_budget),
a.price=Aa(e.price),a.begin_time=mt(e.begin_time).unix(),a.end_time=mt(e.end_time).unix(),
a.end_time<a.begin_time+86400)return G.err("投放日期至少选择一天以上"),!1;
if(a.end_time<M)return G.err("投放截止时间不能早于今天"),!1;
if(a.timeset=xa(e.start,e.end),"1"==e.area){
for(var i=[],_=0,n=e.areaCity.length;n>_;++_)i.push(e.areaCity[_].id);
if(i.length<=0)return G.err("请至少选择1个用户投放地域"),!1;
a.area=i.join(",");
}
if("1"==e.os_info&&e.os.length<=0)return G.err("请至少选择1个手机操作系统"),!1;
if(a.os="1"==e.os_info?e.os.join(","):"","1"==e.connection_info&&e.connection.length<=0)return G.err("请至少选择1个联网环境"),
!1;
if(a.connection="1"==e.connection_info?e.connection.join(","):"","1"==e.industry_tag){
for(var r=[],_=0,n=e.industryData.length;n>_;++_)r.push(e.industryData[_].id);
if(r.length<=0)return G.err("请至少选择1个流量主标签"),!1;
a.wechatflowclass=r.join(",");
}
if("1"==e.businessinterest_tag){
for(var o=[],_=0,n=e.businessinterestData.length;n>_;++_)o.push(e.businessinterestData[_].id);
if(o.length<=0)return G.err("请至少选择1个用户兴趣"),!1;
a.businessinterest=o.join(",");
}
return a;
},Fa=function(e){
N.type=e,vt.find(".js_ad_goodtype").hide(),$("#js_ad_goodtype_"+e).show(),5==e&&1==N.check_ios&&N.iosInfo&&(N.app_id=N.iosInfo.app_id,
N.app_name=N.iosInfo.app_name,N.icon_url=N.iosInfo.icon_url,N.source="AppStore",
Ka(N)),6==e&&1==N.check_android&&N.androidInfo&&(N.app_id=N.androidInfo.app_id,N.app_name=N.androidInfo.app_name,
N.icon_url=N.androidInfo.icon_url,N.source="腾讯应用宝",Ka(N)),ka("_fnChangeType : "+e);
},Oa=function(e){
N.pos_type=e,ka("_fnChangePosType : "+e),Pa();
},Ta=function(e){
N.crt_type=e,ka("_fnChangeCrtType : "+e),St.hide();
var t="js_ad_show_preview_";
1==e&&(t="js_ad_show_preview_"+N.pos_type+"_"),$("#"+t+e).show(),$("#js_click_lable_tip").text(2>=e?"点击效果":"点击非按钮区域"),
bt.find(".js_crt_type_area").hide(),$("#js_crt_type_area_"+e).show(),Pa();
},Pa=function(){
var e=N.pos_type,t=N.crt_type,a=["media_preview_area"];
0==e||(1==e?a.push("topad"):2==e&&a.push("txad")),4==t&&a.push("top_obvious"),$("#js_ad_show_preview").attr("class",a.join(" ")),
1!=t?($("#js_ad_show_preview_0_1").hide(),$("#js_ad_show_preview_1_1").hide()):(1==e&&($("#js_ad_pic_tips").text("尺寸必须为900像素x162像素，大小不能超过30K。"),
$("#pic_upload_ad_bottom_pic_area,#js_imageurl_preview_ad_bottom_pic").hide(),$("#pic_upload_ad_top_pic_area,#js_imageurl_preview_ad_top_pic").show(),
$("#js_ad_show_preview_0_1").hide(),$("#js_ad_show_preview_1_1").show(),Wa()),0==e&&($("#js_ad_show_preview_0_1").show(),
$("#js_ad_show_preview_1_1").hide()),2==e&&($("#js_ad_show_preview_0_1").show(),
$("#js_ad_show_preview_1_1").hide()),(0==e||2==e)&&($("#js_ad_pic_tips").text("尺寸必须为582像素x166像素，大小不能超过50K。"),
$("#pic_upload_ad_bottom_pic_area,#js_imageurl_preview_ad_bottom_pic").show(),$("#pic_upload_ad_top_pic_area,#js_imageurl_preview_ad_top_pic").hide(),
Ua())),2==t&&Xa(),4==t&&(0==e||2==e?($("#js_app_icon_preview_4_0").show(),$("#js_app_icon_preview_4_1").hide(),
$("#pic_upload_ad_bottom_app_pic_area,#js_imageurl_preview_ad_bottom_app_pic").show(),
$("#pic_upload_ad_top_app_pic_area,#js_imageurl_preview_ad_top_app_pic").hide(),
$("#js_ad_app_tips").html("上传作图所示广告位图片<br>图片大小为525*258像素，支持bmp, png, jpeg, jpg, gif格式，不超过30KB"),
Ja()):1==e&&($("#js_app_icon_preview_4_0").hide(),$("#js_app_icon_preview_4_1").show(),
$("#pic_upload_ad_bottom_app_pic_area,#js_imageurl_preview_ad_bottom_app_pic").hide(),
$("#pic_upload_ad_top_app_pic_area,#js_imageurl_preview_ad_top_app_pic").show(),
$("#js_ad_app_tips").html("上传作图所示广告位图片<br>图片大小为600*162像素，支持bmp, png, jpeg, jpg, gif格式，不超过30KB"),
Qa()));
},Ya=function(e){
N.dest_type=e,ka("_fnChangeDestType : "+e),$("#js_dest_type_area").find(".js_dest_type_area").hide(),
$("#js_dest_type_area_"+e).show(),D.target_goods&&!F||0!=e?(Lt.hide(),Rt.show(),
Xt.hide()):(Lt.show(),Rt.hide(),Xt.show());
},Ma=function(e){
for(var t=[{
name:"主线包",
value:""
}],a=0,i=e.length;i>a;++a)t.push({
name:e[a].channel_name,
value:e[a].channel_id
});
p&&p.destroy(),p=new Q({
container:"#js_app_channel",
data:t,
callback:function(e,t){
N.channel_name=t,N.channel_id=e;
}
}),p.enable(),p.selected(0);
},Ka=function(e){
var t=e.type;
1*t==5?($("#js_apple_id_preview").val(e.app_name.html(!1)),$("#js_apple_id_verify").show(),
$("#js_app_pos1_preview").text(e.category),$("#js_app_pos2_preview").text(e.app_size),
$("#js_app_tips1,#js_app_tips2").html("跳转到App Store详情页")):1*t==6&&($("#js_apk_name_preview").val(e.app_name.html(!1)),
$("#js_apk_name_verify").show(),$("#js_app_pos1_preview").text(e.app_size),$("#js_app_pos2_preview").text(e.down_count),
$("#js_app_tips1").html("直接下载"),$("#js_app_tips2").html("跳转到应用详情页")),$("#js_app_name_preview_301,#js_app_name_preview_4").text(e.app_name),
$("#js_app_source_preview").text(e.source);
},Ba=function(){
$("#js_nickname1").val(P.html(!1)),$("#js_nickname2").html(P),new R({
input:ht.val(D.ad_name.html(!1)),
tip:ft,
maxlimit:15,
trim:!0,
className:"txt_hint",
callback:function(e,t){
N.ad_name=e?"":t.value;
}
}),Ft.filter("[value="+D.type+"]").attr("checked",!0),i=Ft.checkbox({
type:"radio",
initOnChanged:!0,
onChanged:function(){
var e=1*this.values()[0];
N.type!=e&&Fa(e),6==e?$("#js_app_detail_edit").show():$("#js_app_detail_edit").hide();
}
}),function(){
var e=D.app_info.app_id,t=D.app_info.app_name,a=D.app_info.icon_url,i=D.app_info.down_count,_=D.app_info.app_size,n=D.app_info.category;
if(e&&t){
var r=["万","百万","亿"];
if(i>=1e4){
i/=1e4;
for(var o=0;i>=10&&2>o;)i/=100,o++;
N.down_count=i.toFixed(1)+r[o]+"次";
}else N.down_count=i.toFixed(1)+"次";
_/=1024,N.app_size=_>=1024?(_/1024).toFixed(2)+"M":_.toFixed(2)+"K",N.category=n&&n.length>0?n[0]:"其他",
5==D.type?(N.source="AppStore",$("#js_apple_id").val((""+e).html(!1)),N.check_ios=!0,
N.app_id=e,N.app_name=t,N.icon_url=a,Ka(N)):6==D.type&&(N.source="腾讯应用宝",$("#js_apk_name").val((""+e).html(!1)),
N.check_android=!0,N.app_id=e,N.app_name=t,N.icon_url=a,Ka(N));
}
gt.click(function(){
var e=$("#js_apple_id").val().trim();
if(e.length<=0)return G.err("请填写正确的APPLE ID，并点击校验"),$("#js_apple_id").focus(),!1;
var t=$(this);
t.btn(!1),H.checkApp({
app_type:0,
app_id:e
},function(a){
G.suc("校验成功"),a.app_id=e,N.check_ios=!0,N.app_id=e,N.app_name=a.app_name,N.icon_url=a.icon_url,
N.app_size=a.app_size,N.down_count=a.down_count,N.category=a.category,N.source="AppStore",
N.iosInfo=a,Ka(N),t.btn(!0);
},function(){
G.err("你输入的Apple ID不正确，请重新输入。"),$("#js_apple_id_verify").hide(),$("#js_apple_id_preview").val("未获取应用名称"),
N.check_ios=!1,t.btn(!0);
});
}),jt.click(function(){
var e=$("#js_apk_name").val().trim();
if(e.length<=0)return G.err("请填写正确的腾讯开放平台ID，并点击校验"),$("#js_apk_name").focus(),!1;
var t=$(this);
t.btn(!1),H.checkApp({
app_type:1,
app_id:e
},function(a){
G.suc("校验成功"),N.check_android=!0,a.app_id=e,N.app_id=e,N.app_name=a.app_name,N.icon_url=a.icon_url,
N.app_size=a.app_size,N.down_count=a.down_count,N.category=a.category,N.source="腾讯应用宝",
N.androidInfo=a,Ka(N);
var i=a.channel_app_info;
Ma(i),t.btn(!0);
},function(){
G.err("你输入的腾讯开放平台 ID不正确，请重新输入。"),$("#js_apk_name_verify").hide(),$("#js_apk_name_preview").val("未获取应用名称"),
N.check_android=!1,t.btn(!0);
});
}),p=new Q({
container:"#js_app_channel",
data:[{
name:D.channel_name,
value:D.channel_id
}],
callback:function(e,t){
N.channel_name=t,N.channel_id=e;
}
}),p.disable(),p.selected(0);
}(),ga.click(function(){
if(""==N.ad_name)return G.err("广告名字必须为1-15个字"),$("#js_ad_name").focus(),!1;
var e=Ia(N.ad_name);
return e?(G.err("广告内容不能包含以下特殊字符："+e),!1):"6"!=N.type||N.check_android&&N.app_id?"5"!=N.type||N.check_ios&&N.app_id?(qa(2),
void Oa(N.pos_type)):(G.err("请填写正确的APPLE ID，并点击校验"),!1):(G.err("请填写正确的腾讯开放平台ID，并点击校验"),
!1);
}),D.advert_id&&(i.disabled(!0),jt.disable(),gt.disable());
},Ea=function(){
Ot.filter("[value="+D.pos_type+"]").attr("checked",!0),_=Ot.checkbox({
type:"radio",
initOnChanged:!0,
onChanged:function(){
var e=1*this.values()[0],t=e;
Oa(t),Ha();
}
}),Tt.filter("[value="+D.crt_type+"]").attr("checked",!0),n=Tt.checkbox({
type:"radio",
initOnChanged:!0,
onChanged:function(){
var e=1*this.values()[0],t=e;
Ta(t),Ha();
}
}),function(){
new R({
input:Ct.val(D.ad_content.html(!1)),
tip:At,
maxlimit:15,
trim:!0,
className:"txt_hint",
callback:function(e,t){
N.ad_content_img=e?"":t.value;
}
}),new R({
input:Yt.val(D.ad_content.html(!1)),
tip:Mt,
maxlimit:14,
trim:!0,
className:"txt_hint",
callback:function(e,t){
N.ad_content_card=e?"":t.value;
}
}),new R({
input:Kt.val(D.ad_desc.html(!1)),
tip:Bt,
maxlimit:28,
trim:!0,
className:"txt_hint",
callback:function(e,t){
N.ad_desc=e?"":t.value;
}
});
var e="图文标题";
Yt.keyup(function(){
$("#js_ad_show_preview_title_2").html((Yt.val().trim()||e).substr(0,14).html(!0));
}),$("#js_ad_show_preview_title_2").html(D.ad_content||e);
var t="图文描述";
Kt.keyup(function(){
$("#js_ad_show_preview_desc_2").html((Kt.val().trim()||t).substr(0,28).html(!0));
}),$("#js_ad_show_preview_desc_2").html(D.ad_desc||t),new R({
input:xt.val(D.ad_content.html(!1)),
tip:Nt,
maxlimit:18,
trim:!0,
className:"txt_hint",
callback:function(e,t){
N.ad_content_3=e?"":t.value;
}
});
var a="填写的关注引导文案将会显示在这里";
if(xt.keyup(function(){
$("#js_ad_show_preview_title_3_0").html((xt.val().trim()||a).substr(0,18).html(!0));
}),$("#js_ad_show_preview_title_3_0").html(D.ad_content||a),D.image_url&&(1==D.crt_type?0==D.pos_type||2==D.pos_type?($("#js_ad_show_preview_0_1").find("img").attr("src",D.image_url),
$("#js_imageurl_preview_ad_bottom_pic").show().attr("src",D.image_url),$("#js_upload_ad_bottom_pic").html("重新上传"),
Ua(),N.image_url_bottom_pic=D.image_url):($("#js_ad_show_preview_1_1").find("img").attr("src",D.image_url),
$("#js_imageurl_preview_ad_top_pic").show().attr("src",D.image_url),$("#js_upload_ad_top_pic").html("重新上传"),
Wa(),N.image_url_top_pic=D.image_url):2==D.crt_type?($("#js_ad_show_preview_2").find("img").attr("src",D.image_url),
$("#js_imageurl_preview_ad_card_pic").show().attr("src",D.image_url),$("#js_upload_ad_card_pic").html("重新上传"),
N.image_url_card_pic=D.image_url,Xa()):4==D.crt_type&&(0==D.pos_type||2==D.pos_type?($("#js_app_icon_preview_4_0").show().attr("src",D.image_url),
$("#js_imageurl_preview_ad_bottom_app_pic").find("img").show().attr("src",D.image_url),
$("#js_upload_ad_bottom_app_pic").html("重新上传"),N.image_url_bottom_app_pic=D.image_url,
Ja()):($("#js_app_icon_preview_4_1").show().attr("src",D.image_url),$("#js_imageurl_preview_ad_top_app_pic").find("img").show().attr("src",D.image_url),
$("#js_upload_ad_top_app_pic").html("重新上传"),N.image_url_top_app_pic=D.image_url,
Qa()))),N.app_cover_desc="",N.app_cover_url="",N.app_video_url="",N.app_video_background="",
new R({
input:$("#js_app_cover_desc").val(D.app_cover_desc),
tip:$("#js_app_cover_desc_tips"),
maxlimit:200,
trim:!0,
className:"txt_hint",
callback:function(e,t){
e?(N.app_cover_desc="",N.app_cover_desc_length=1):(N.app_cover_desc=t.value,N.app_cover_desc_length=0);
}
}),D.advert_id?($("#js_app_detail_activity").parent().addClass("disabled"),$("#js_app_detail_video").parent().addClass("disabled")):($("#js_app_detail_activity").click(function(){
$("#js_app_detail_activity_container").is(":hidden")?($("#js_app_detail_activity").parent().addClass("selected"),
$("#js_app_detail_activity_container").show(),N.app_cover_flag=1,Za()):($("#js_app_detail_activity").parent().removeClass("selected"),
$("#js_app_detail_activity_container").hide(),N.app_cover_flag=0);
}),$("#js_app_detail_video").click(function(){
$("#js_app_detail_video_container").is(":hidden")?($("#js_app_detail_video").parent().addClass("selected"),
$("#js_app_detail_video_container").show(),N.app_video_flag=1,ei()):($("#js_app_detail_video").parent().removeClass("selected"),
$("#js_app_detail_video_container").hide(),N.app_video_flag=0);
}),$("#js_upload_app_video").click(function(){
$("#js_video_dialog").show(),$("#js_video_dialog").center("true"),$("#mask").show(),
$("#js_app_video_url").change(function(e){
C(e.target.value,548,280,function(e){
""==e&&G.err("上传视频失败，请输入合法的腾讯视频网址"),$("#js_app_video_iframe").attr("src",e);
}),""==e.target.value&&$("#js_app_video_iframe").attr("src","");
}),$("#js_video_dialog_y").click(function(){
var e=$("#js_app_video_iframe").attr("src");
e=e.replace("width=548","width=200"),e=e.replace("height=280","height=150"),$("#js_imageurl_preview_upload_app_video").find("iframe").show().attr("src",e),
N.app_video_url=$("#js_app_video_iframe").attr("src"),$("#js_video_dialog").hide(),
$("#mask").hide();
}),$("#js_video_dialog_n").click(function(){
$("#js_video_dialog").hide(),$("#mask").hide();
});
})),D.app_cover_url&&($("#js_app_detail_activity").parent().addClass("selected"),
$("#js_app_detail_activity_container").show(),N.app_cover_flag=1,$("#js_imageurl_preview_upload_app_cover_pic").find("img").show().attr("src",D.app_cover_url),
$("#js_upload_app_cover_pic").html("重新上传"),N.app_cover_url=D.app_cover_url,N.app_cover_desc=D.app_cover_desc,
$("#js_upload_app_cover_pic").removeClass("btn_upload").addClass("btn_disabled"),
$("#js_app_cover_desc").attr("disabled","disabled"),$(".frm_textarea_box").addClass("disabled")),
D.app_video_url){
$("#js_app_detail_video").parent().addClass("selected"),$("#js_app_detail_video_container").show(),
N.app_video_flag=1,$("#js_imageurl_preview_upload_app_video_pic").find("img").show().attr("src",D.app_video_background),
$("#js_upload_app_video_pic").html("重新上传");
var i=D.app_video_url.replace(/width=\d+/,"width=200");
i=i.replace(/height=\d+/,"height=150"),$("#js_imageurl_preview_upload_app_video").find("iframe").show().attr("src",i),
N.app_video_url=D.app_video_url,N.app_video_background=D.app_video_background,$("#js_upload_app_video_pic").removeClass("btn_upload").addClass("btn_disabled"),
$("#js_upload_app_video").removeClass("btn_upload").addClass("btn_disabled");
}
}(),Pt.filter("[value="+D.dest_type+"]").attr("checked",!0),r=Pt.checkbox({
type:"radio",
initOnChanged:!0,
onChanged:function(){
var e=1*this.values()[0],t=e;
Ya(t);
}
}),qt.val(D.outer_link.html(!1));
var e=function(e,t,a){
var i="http://mp.weixin.qq.com/mp/ad?id=%s&sign=%s&__biz=%s#wechat_redirect".sprintf(e.id,e.sign,wx.data.uin_base64);
Wt.find("a.js_ad_link").attr("href",i).html(e.title.html(!0)),t?(Wt.hide(),Xt.show()):Wt.show(),
N.goods=e.id,N.content_url=i,N.title=e.title,D.sign=e.sign,D.body=e.body,e.body&&o.setContent(e.body||""),
Et.val(e.title),a||(Dt.html("重新导入"),e.id&&o.setId(e.id));
};
s=new ut,Dt.click(function(){
s.show({
callback:function(t){
F=!0,e(t,!0);
}
},!0,!1);
}),o=new lt({
editor_id:"js_ueditor",
can_use_hyperlink:O,
can_use_copyright:wx.cgiData.can_use_copyright,
is_link_white:wx.cgiData.is_link_white,
title$:"#js_title_material",
preview_iframe$:"#js_preview_page iframe",
pre_preview:function(){},
suc:function(t){
e({
id:t.id,
sign:t.sign,
title:Et.val()
},!0,!0),Rt.click();
},
preview:function(t){
e({
id:t.id,
sign:t.sign,
title:Et.val()
},!0,!0);
}
}),Ut.click(function(){
E.show({
type:"info",
msg:"温馨提示|一旦编辑推广页，广告将重新进入审核状态。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
Wt.hide(),Xt.show(),D.body&&o.setContent(D.body||""),F=!0,Lt.show(),Rt.hide(),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}),D.id&&e({
id:D.id,
sign:D.sign,
body:D.body,
title:D.target_goods
},!1,!0),V.on("_fnSetStep_2",function(){
Ha(),Pa();
}),$(document).on("click","#js_add_contact_1,#js_add_contact_2,#js_add_contact_3",function(){
E.show({
type:"info",
msg:"用户点击后，将弹窗提示用户关注。",
mask:!0,
buttons:[{
text:"确认",
click:function(){
this.remove();
}
}]
});
}),$(document).on("click","#js_download_app_1,#js_download_app_2,#js_download_app_3",function(){
var e="用户点击下载按钮后，将直接下载APP。";
1*N.type==5&&(e="用户点击下载按钮后，将跳转至App Store应用详情页。"),E.show({
type:"info",
msg:e,
mask:!0,
buttons:[{
text:"确认",
click:function(){
this.remove();
}
}]
});
}),Gt.click(function(){
qa(1);
}),Lt.click(function(){
return t()?void(o&&0==N.dest_type&&o.saveAndCb(!1,!1,$("#js_save_goto_step3"))):!1;
}),Rt.click(function(){
if(!t())return!1;
0!=N.dest_type||!F&&D.advert_id||(Rt.hide(),Lt.show());
var e=($("#js_operation_system").find(".frm_radio"),$("#js_operation_system").find(".frm_checkbox"));
!!v&&v.disabled(!1),!!g&&g.disabled(!1),5==N.type?(fa.eq(1).click(),e.eq(0).attr("checked")||e.eq(0).click(),
e.eq(1).attr("checked")&&e.eq(1).click(),v.disabled(!0),g.disabled(!0),N.os=["IOS"]):6==N.type&&(fa.eq(1).click(),
e.eq(1).attr("checked")||e.eq(1).click(),e.eq(0).attr("checked")&&e.eq(0).click(),
v.disabled(!0),g.disabled(!0),N.os=["ANDROID"]),qa(3);
}),D.advert_id&&(_.disabled(!0),n.disabled(!0));
},La=function(e){
var t={
state:{},
list:[]
},a=0;
if(0==e)return t;
for(;1!=e;)e%2==1&&(t.state[a]=!0,t.list.push(a),"undefined"==typeof t.base&&(t.base=a)),
e=Math.floor(e/2),a++;
return t.state[a]=!0,t.list.push(a),"undefined"==typeof t.base&&(t.base=a),t;
},Va=function(e){
var t=ja[e].pos_type;
return t&=65531|(T>>e-1&1)<<2,t&=65533|Y<<1,La(t);
},Ra=function(e,t){
var a=ja[e].crt_type&wa[t].crt_type;
return La(a);
},Ga=function(e,t,a){
var i=ja[e].dest_type&wa[t].dest_type&ya[a].dest_type;
return i&=65533|O<<1,La(i);
},Ha=function(){
var e=N.type,t=Va(e),a=N.pos_type;
wt.find(".js_ad_pos_type").hide();
for(var i=0,_=t.list.length;_>i;++i)$("#js_ad_pos_type_"+t.list[i]).show();
t.state[a]||"undefined"==typeof t.base||(a=t.base,$("#js_ad_pos_type_"+a).find(".frm_radio").click());
var n=Ra(e,a),o=N.crt_type;
yt.find(".js_crt_type").hide();
for(var i=0,_=n.list.length;_>i;++i)$("#js_crt_type_"+n.list[i]).show();
n.state[o]||"undefined"==typeof n.base||(o=n.base,$("#js_crt_type_"+o).find(".frm_radio").click());
var s=Ga(e,a,o),p=N.dest_type;
$t.find(".js_dest_type").hide();
for(var i=0,_=s.list.length;_>i;++i)$("#js_dest_type_"+s.list[i]).show(),kt.show();
s.state[p]||("undefined"!=typeof s.base?(p=s.base,r&&$("#js_dest_type_"+p).find(".frm_radio").click()):(kt.hide(),
Ya(-1)));
},Ua=function(){
return 2!=z?!1:(nt({
multi:!1,
type:2,
container:"#js_upload_ad_bottom_pic",
onComplete:function(e,t,a,i){
switch(+i.base_resp.ret){
case 0:
var _=i.content;
$("#js_ad_show_preview_0_1").find("img").attr("src",_),$("#js_imageurl_preview_ad_bottom_pic").show().attr("src",_),
N.image_url_bottom_pic=_,G.suc("上传成功"),$("#js_upload_ad_bottom_pic").html("重新上传");
break;

case 200034:
G.err("尺寸必须为582像素X166像素，大小不能超过50K。");
break;

case 1:
G.err("图片太大");
break;

case 200011:
G.err("请上传合法的图片格式");
break;

default:
G.err("上传图片失败");
}
}
}),void(Ua=za));
},Wa=function(){
return 2!=z?!1:(rt({
multi:!1,
type:2,
container:"#js_upload_ad_top_pic",
onComplete:function(e,t,a,i){
switch(+i.base_resp.ret){
case 0:
var _=i.content;
$("#js_ad_show_preview_1_1").find("img").attr("src",_),$("#js_imageurl_preview_ad_top_pic").show().attr("src",_),
N.image_url_top_pic=_,G.suc("上传成功"),$("#js_upload_ad_top_pic").html("重新上传");
break;

case 200034:
G.err("尺寸必须为900像素X162像素，大小不能超过30K。");
break;

case 1:
G.err("图片太大");
break;

case 200011:
G.err("请上传合法的图片格式");
break;

default:
G.err("上传图片失败");
}
}
}),void(Wa=za));
},Xa=function(){
return 2!=z?!1:(ot({
multi:!1,
type:2,
container:"#js_upload_ad_card_pic",
onComplete:function(e,t,a,i){
switch(+i.base_resp.ret){
case 0:
var _=i.content;
$("#js_ad_show_preview_2").find("img").attr("src",_),$("#js_imageurl_preview_ad_card_pic").show().attr("src",_),
N.image_url_card_pic=_,G.suc("上传成功"),$("#js_upload_ad_card_pic").html("重新上传");
break;

case 200034:
G.err("尺寸必须为114*114像素，大小不能超过30K。");
break;

case 1:
G.err("图片太大");
break;

case 200011:
G.err("请上传合法的图片格式");
break;

default:
G.err("上传图片失败");
}
}
}),void(Xa=za));
},Ja=function(){
return 2!=z?!1:(st({
multi:!1,
type:2,
container:"#js_upload_ad_bottom_app_pic",
onComplete:function(e,t,a,i){
switch(+i.base_resp.ret){
case 0:
var _=i.content;
$("#js_app_icon_preview_4_0").show().attr("src",_),$("#js_imageurl_preview_ad_bottom_app_pic").find("img").show().attr("src",_),
N.image_url_bottom_app_pic=_,G.suc("上传成功"),$("#js_upload_ad_bottom_app_pic").html("重新上传");
break;

case 200034:
G.err("尺寸必须为525*258像素，大小不能超过30K。");
break;

case 1:
G.err("图片太大");
break;

case 200011:
G.err("请上传合法的图片格式");
break;

default:
G.err("上传图片失败");
}
}
}),void(Ja=za));
},Qa=function(){
return 2!=z?!1:(pt({
multi:!1,
type:2,
container:"#js_upload_ad_top_app_pic",
onComplete:function(e,t,a,i){
switch(+i.base_resp.ret){
case 0:
var _=i.content;
$("#js_app_icon_preview_4_1").show().attr("src",_),$("#js_imageurl_preview_ad_top_app_pic").find("img").show().attr("src",_),
N.image_url_top_app_pic=_,G.suc("上传成功"),$("#js_upload_ad_top_app_pic").html("重新上传");
break;

case 200034:
G.err("尺寸必须为600*162像素，大小不能超过30K。");
break;

case 1:
G.err("图片太大");
break;

case 200011:
G.err("请上传合法的图片格式");
break;

default:
G.err("上传图片失败");
}
}
}),void(Qa=za));
},Za=function(){
ct({
multi:!1,
type:2,
container:"#js_upload_app_cover_pic",
onComplete:function(e,t,a,i){
switch(+i.base_resp.ret){
case 0:
var _=i.content;
$("#js_imageurl_preview_upload_app_cover_pic").find("img").show().attr("src",_),
N.app_cover_url=_,G.suc("上传成功"),$("#js_upload_app_cover_pic").html("重新上传");
break;

case 200034:
G.err("尺寸必须为690*140像素，大小不能超过30K。");
break;

case 1:
G.err("图片太大");
break;

case 200011:
G.err("请上传合法的图片格式");
break;

default:
G.err("上传图片失败");
}
}
}),Za=za;
},ei=function(){
dt({
multi:!1,
type:2,
container:"#js_upload_app_video_pic",
onComplete:function(e,t,a,i){
switch(+i.base_resp.ret){
case 0:
var _=i.content;
$("#js_imageurl_preview_upload_app_video_pic").find("img").show().attr("src",_),
N.app_video_background=_,G.suc("上传成功"),$("#js_upload_app_video_pic").html("重新上传");
break;

case 200034:
G.err("尺寸必须为320*480像素，大小不能超过30K。");
break;

case 1:
G.err("图片太大");
break;

case 200011:
G.err("请上传合法的图片格式");
break;

default:
G.err("上传图片失败");
}
}
}),ei=za;
},ti=function(){
if($.validator.defaults.errorPlacement=function(e,t){
t.parent().parent().after(e);
},N.begin_time=D.begin_time,N.end_time=D.end_time,c=Z({
container:"#js_time_date_range",
isTodayValid:!0,
startDate:D.begin_time,
endDate:D.end_time,
minValidDate:D.begin_time,
monthRangeMax:120,
stopToday:!1,
defaultText:" 至 ",
theme:"ta",
success:function(e){
N.begin_time=e.startDate,N.end_time=e.endDate;
}
}),d=new tt({
container:"#js_hour",
childid:"childid",
span:" 至 ",
start:D.start,
end:D.end
}),l=new W({
container:"#js_area_selector"
}),0==D.area.length||1==D.area.length&&""==D.area[0]?(N.area="0",ha.filter("[value=0]").attr("checked",!0)):(N.area="1",
ha.filter("[value=1]").attr("checked",!0),$("#js_area_selector").show(),l.setItemsByID(D.area)),
u=ha.checkbox({
type:"radio",
onChanged:function(){
var e=u.values()[0];
N.area=e,$("#js_area_selector")["0"==e?"hide":"show"]();
}
}),m=null,x=new X({
container:"#js_industry_area",
tip_msg:"最多只能选择10个选项"
}),0==D.wechatflowclass.length||1==D.wechatflowclass.length&&""==D.wechatflowclass[0]?(N.industry_tag="0",
aa.filter("[value=0]").attr("checked",!0)):(N.industry_tag="1",aa.filter("[value=1]").attr("checked",!0),
ta.show(),x.setItemsByID(D.wechatflowclass)),k=aa.checkbox({
type:"radio",
onChanged:function(){
var e=k.values()[0];
N.industry_tag=e,$("#js_industry_area")["0"==e?"hide":"show"]();
}
}),h=new J({
container:"#js_interest_area",
tip_msg:"最多只能选择17个选项"
}),0==D.businessinterest.length||1==D.businessinterest.length&&""==D.businessinterest[0]?(N.businessinterest_tag="0",
va.filter("[value=0]").attr("checked",!0)):(N.businessinterest_tag="1",va.filter("[value=1]").attr("checked",!0),
$("#js_interest_area").show(),h.setItemsByID(D.businessinterest)),f=va.checkbox({
type:"radio",
onChanged:function(){
var e=f.values()[0];
N.businessinterest_tag=e,$("#js_interest_area")["0"==e?"hide":"show"]();
}
}),fa.filter("[value="+D.os_info+"]").attr("checked",!0),v=fa.checkbox({
type:"radio",
initOnChanged:!0,
onChanged:function(){
var e=this.values()[0];
N.os_info=e,$("#js_os")["0"==e?"hide":"show"]();
}
}),"1"==D.os_info)for(var e=0,t=D.os.length;t>e;++e)ua.filter("[value="+D.os[e]+"]").attr("checked",!0);
if(g=ua.checkbox({
type:"checkbox",
initOnChanged:!0,
onChanged:function(){
var e=this.values();
N.os=e;
}
}),ma.filter("[value="+D.connection_info+"]").attr("checked",!0),j=ma.checkbox({
type:"radio",
initOnChanged:!0,
onChanged:function(){
var e=this.values()[0];
N.connection_info=e,$("#js_connection")["0"==e?"hide":"show"]();
}
}),"1"==D.connection_info)for(var e=0,t=D.connection.length;t>e;++e)la.filter("[value="+D.connection[e]+"]").attr("checked",!0);
w=la.checkbox({
type:"checkbox",
initOnChanged:!0,
onChanged:function(){
var e=this.values();
N.connection=e;
}
}),ia.filter("[value="+D.gender+"]").attr("checked",!0),y=ia.checkbox({
type:"radio",
onChanged:function(){
N.gender=y.values()[0];
}
}),N.gender=D.gender,$.validator.addMethod("bid",function(e){
var t=/^(\d+)(\.(\d+))?$/.test(e);
return t?(e=parseFloat(e),e>=.5&&20>=e):!1;
},"有效范围为0.50-20.00元"),$.validator.addMethod("quota",function(e){
var t=/^(\d+)(\.(\d+))?$/.test(e);
return t?(e=parseFloat(e),e>=50&&4e6>=e):!1;
},"有效范围为50.00-4,000,000.00元"),Jt.validate({
rules:{
bid:{
required:!0,
bid:!0
},
quota:{
required:!0,
quota:!0
}
},
messages:{
bid:{
bid:"有效范围为0.50-20.00元"
},
quota:{
quota:"有效范围为50.00-4,000,000.00元"
}
},
submitHandler:function(){
var e=d.values();
if(N.start=e.start,N.end=e.end,N.price=It.val(),N.day_budget=zt.val(),"1"==N.area&&(N.areaCity=l.getValue()),
"1"==N.industry_tag&&(N.industryData=x.getValue()),"1"==N.businessinterest_tag&&(N.businessinterestData=h.getValue()),
"0"==N.age_info)N.age=[""];else{
var t=m.values();
if(2==t.length){
var i=1*t[0],_=1*t[1];
i==_&&(60==_?i--:_++),t=[i,_];
}
N.age=t;
}
return(a=Sa(N))?(3==N.type&&(N.dest_type=3),a.advert_id=D.advert_id,N.os_map=$a,
N.connection_map=ba,N.nickname=P,ka(a),Qt.html(template.render("t_info_preview",N)),
void qa(4)):!1;
}
}),V.on("_fnSetStep_3",function(){
ai(),Vt[2==N.pos_type?"hide":"show"]();
}),Ht.click(function(){
qa(2);
});
},ai=function(){
m=new et({
container:"#js_age",
min:5,
max:60,
value:[D.age_start,D.age_end]
}),0==D.area.length||1==D.age.length&&""==D.age[0]?(N.age_info="0",na.filter("[value=0]").attr("checked",!0),
$("#js_age").hide()):(N.age_info="1",na.filter("[value=1]").attr("checked",!0),$("#js_age").show()),
b=na.checkbox({
type:"radio",
onChanged:function(){
var e=b.values()[0];
N.age_info=e,$("#js_age")["0"==e?"hide":"show"]();
}
}),"undefined"!=typeof D.price&&It.val(D.price/100),"undefined"!=typeof D.day_budget&&zt.val(D.day_budget/100),
ai=za;
},ii=function(){
V.on("_fnSetStep_4",function(){
var e=$("#js_sure_area");
e.on("click",".js_area_edit",function(){
var e=$(this);
qa(1*e.data("step"));
});
}),$(document).on("click","#js_back_step3",function(){
qa(3);
}),$(document).on("click","#js_submit",function(){
function e(){
H.edit(a,function(){
G.suc("提交成功！"),location.href="/merchant/advert?t=ad_system/promotion_list&action=get_advert_count&lang=zh_CN&token="+wx.data.t;
},function(e){
if($("#js_submit").btn(!0),e&&e.base_resp){
var t=e.base_resp.ret;
if(13001==t)return void G.err("账户余额为空，请先充值后再创建广告!");
if(7001==t)return void G.err("你的广告消耗已超过限额，请设置更大的广告限额。");
if(7005==t)return void G.err("修改广告限额时，最少提高或降低50元");
}
G.err("提交错误，请稍后重试！");
});
}
if(a.advert_id){
var t="你没有修改广告位，提交后广告状态不变",i="info",_=q;
return(1*_.type!=1*a.type||1*_.crt_type!=1*a.crt_type||1*_.crt_type==1*a.crt_type&&1*_.crt_type==0&&_.ad_content!=a.ad_content||1*_.crt_type==1*a.crt_type&&1*_.crt_type==1&&(_.image_url!=a.image_url||_.ad_content!=a.ad_content||1*_.pos_type!=1*a.pos_type)||1*_.crt_type==1*a.crt_type&&1*_.crt_type==2&&(_.ad_desc!=a.ad_desc||_.ad_content!=a.ad_content||_.image_url!=a.image_url)||1*_.crt_type==1*a.crt_type&&1*_.crt_type==3&&_.ad_content!=a.ad_content||1*_.crt_type==1*a.crt_type&&1*_.crt_type==4&&_.image_url!=a.image_url||1*_.dest_type!=1*a.dest_type||1*_.dest_type==1*a.dest_type&&1*_.dest_type==0&&F||1*_.dest_type==1*a.dest_type&&5!=_.type&&6!=_.type&&1*_.dest_type==1&&_.outer_link!=a.outer_link)&&(t="你修改了广告位，提交后广告将重新进入审核状态。",
i="warn"),E.show({
type:i,
msg:"确认提交|"+t,
mask:!0,
buttons:[{
text:"确定",
click:function(){
$("#js_submit").btn(!1),e(),this.remove();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}),!1;
}
$("#js_submit").btn(!1),e();
});
},_i=function(){
{
var a=U.get("appMsgPreviewName");
e("common/wx/verifycode.js");
}
$(document).on("click","#js_preview1,#js_preview2",function(){
var i=$(this),_="js_preview2"==i.attr("id"),n=function(){
if(!t())return!1;
var i=Sa(N,!0);
if(!i)return!1;
var _=null,n=e("tpl/simplePopup.html.js"),r=null,o=$(template.compile(n)({
label:"请输入微信号，此广告消息将发送至该微信号预览。",
value:a
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var e=this,t=e.get(),n=t.find(".frm_input");
if(a=n.val().trim(),i.preusername=a,U.set("appMsgPreviewName",a||""),!it.rangelength(a,[1,20]))return G.err("微信号必须为1到20个字符"),
n.focus(),!0;
if(null!=_&&_.getCode().trim().length<=0)return G.err("请输入验证码"),_.focus(),!0;
var o=t.find(".btn_primary .js_btn").parent(".btn").btn(!1);
return i.imgcode=_&&_.getCode().trim(),H.preview(i,function(){
e.hide(),setTimeout(function(){
o.btn(!0);
},500);
},function(e){
o.btn(!0),n.focus(),e&&-6==e.ret&&(r=t.find(".js_verifycode"),_=r.html("").removeClass("dn").verifycode().data("verifycode"),
_.focus());
}),!0;
}
});
$(".frm_input",o).focus();
};
0!=N.dest_type||_||!o||!o.saveAndCb||N.goods&&!F?n()||i.btn(!0):o.saveAndCb(function(e){
i.btn(!0),N.goods=e.id,n(e);
},!1,i);
});
};
!function(){
Da(),Na(),Ba(),Ea(),ti(),ii(),_i();
}(),window.openLink=function(){
$("#linkPop").show(),$("#mask").show(),ni.init();
};
var ni=function(){
function t(e,a,_,n){
r.post({
url:"/cgi-bin/appmsg",
data:{
action:"list_ex",
begin:e,
count:l,
query:_,
type:9
}
},function(e){
"0"==e.base_resp.ret?(i(e.app_msg_list),n&&($("#pageBar").html(""),new s({
container:"#pageBar",
midRange:l,
totalItemsNum:e.app_msg_cnt,
isSimple:!0,
callback:function(e){
t((e.currentPage-1)*l,l,$("#keyInput").val().trim(),!1);
}
}))):G.err();
});
}
function a(){
u=!0,p=$("#linkForm").validate({
rules:{
title:{
required:!0
},
href:{
required:!0,
url:!0
}
},
messages:{
title:{
required:"文章标题不能为空"
},
href:{
required:"链接地址不能为空",
url:"链接地址不合法(必须以http://或https://开头)"
}
}
}),$("#keyInput").keydown(function(e){
var t="which"in e?e.which:e.keyCode;
13==t&&$("#searchBt").trigger("click");
}),$("#searchCloseBt").click(function(){
$("#keyInput").val(""),t(0,l,"",!0);
}),$("#searchBt").click(function(){
t(0,l,$("#keyInput").val().trim(),!0);
}),$(".jsLinkClose").click(function(){
$("#linkPop").hide(),$("#mask").hide(),$("#txtHref").val("http://"),$("#txtTitle").val(""),
$("#keyInput").val(""),$("#linkList").html(""),"1"==O?($("#hrefDiv").show(),$("#linkChoose").hide(),
$("#linkArrow").find(".arrow").setClass("arrow down")):($("#hrefDiv").hide(),$("#linkChoose").show(),
$("#linkArrow").find(".arrow").setClass("arrow up"));
}),$("#linkArrow").click(function(){
$(this).find(".arrow").hasClass("down")?($(this).find(".arrow").setClass("arrow up"),
$("#linkChoose").show(),$("#linkPop").center(!0)):($(this).find(".arrow").setClass("arrow down"),
$("#linkChoose").hide(),$("#linkPop").center(!0));
}),$("#linkOk").click(function(){
if(p.form()){
var e={
href:$("#txtHref").val().replace(/^\s+|\s+$/g,""),
target:"_blank",
data_ue_src:$("#txtHref").val().replace(/^\s+|\s+$/g,"")
};
m&&(e.textValue=$("#txtTitle").val().replace(/^\s+|\s+$/g,"")),_ueditor.execCommand("link",e),
$(".jsLinkClose").trigger("click");
}
});
}
function i(e){
var t=[];
e.each(function(e){
t.push({
title:e.title,
time:o.unix(e.update_time).format("YYYY-MM-DD"),
href:e.link.replace("#rd","&scene=21#wechat_redirect"),
aid:e.aid
});
}),t.length>0?($("#linkList").html(template.render("tplMsg",{
data:t
})),$("#linkPop").center(!0),$("input[type=radio]").checkbox({
onChanged:function(e){
1==m&&$("#txtTitle").val($(e).data("title")),$("#txtHref").val($(e).data("href")),
p.form();
}
})):$("#linkList").html('<li class="empty_tips">暂无数据</li>');
}
function _(){
c=_ueditor.selection.getRange(),d=c.collapsed?_ueditor.queryCommandValue("link"):_ueditor.selection.getStart(),
d?(UE.dom.domUtils.findParentByTagName(d,"a",!0)&&(d=UE.dom.domUtils.findParentByTagName(d,"a",!0)),
$("#txtTitle").val(d.text||"你已选中了添加链接的文本内容").attr("disabled",!0).parent().addClass("disabled"),
$("#txtHref").val(d.href||"http://"),m=!1):($("#txtTitle").attr("disabled",!1).parent().removeClass("disabled"),
m=!0);
}
function n(){
_(),t(0,l,"",!0),0==u&&a(),"1"==O?($("#hrefDiv").show(),$("#linkChoose").hide(),
$("#linkArrow").find(".arrow").setClass("arrow down"),$("#linkPop").center(!0)):($("#hrefDiv").hide(),
$("#linkChoose").show(),$("#linkArrow").find(".arrow").setClass("arrow up"),$("#linkPop").center(!0));
}
var r=e("common/wx/Cgi.js"),o=e("biz_common/moment.js"),s=e("common/wx/pagebar.js");
e("biz_common/jquery.validate.js");
var p,c,d,l=5,u=!1,m=!1;
return{
init:n
};
}();
});