define("ad_system/promotion/ad_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js"],function(e){
"use strict";
var t={
getlist:"/merchant/advert?action=get_advert_list&f=json",
getdetail:"/merchant/advert?action=get_advert_info&f=json",
create:"/merchant/advert?action=create_advert_info&f=json",
put:"/merchant/advert?action=update_advert_info&f=json&status=ADSTATUS_NORMAL",
stop:"/merchant/advert?action=update_advert_info&f=json&status=ADSTATUS_SUSPEND",
update:"/merchant/advert?action=update_advert_info&f=json",
preview:"/merchant/ad_preview?action=preview&f=json",
checkApp:"/merchant/ad_app_check?action=get_app_info&f=json"
},a=e("common/wx/Tips.js"),r=e("common/wx/Cgi.js"),n=function(e,t,a,n,o){
r[e]({
url:t,
data:a,
error:function(){
o&&o();
}
},function(e){
if(e&&e.base_resp&&0==e.base_resp.ret){
var t=Number(e.down_count),a=["万","百万","亿"];
if(t>=1e4){
t/=1e4;
for(var r=0;t>=10&&2>r;)t/=100,r++;
e.down_count=t.toFixed(1)+a[r]+"次";
}else e.down_count=t.toFixed(1)+"次";
var c=e.app_size/1024;
return e.app_size=c>=1024?(c/1024).toFixed(2)+"M":c.toFixed(2)+"K",e.category=e.category&&e.category.length>0?e.category[0]:"其他",
void(n&&n(e));
}
o&&o(e);
});
};
return{
getlist:function(e,a,r){
n("get",t.getlist,e,a,r);
},
getdetail:function(e,a,r){
n("get",t.getdetail,e,a,r);
},
preview:function(e,r,o){
n("post",t.preview,e,function(e){
var t=e.base_resp.ret;
e.ret=t,a.suc("发送预览成功，请留意你的手机微信"),r&&r(e);
},function(e){
var t=e.base_resp.ret;
switch(e.ret=t,t){
case 64501:
a.err("你输入是非法的微信号，请重新输入");
break;

case 64502:
a.err("你输入的微信号不存在，请重新输入");
break;

case 10700:
case 64503:
a.err("你输入的微信号不是你的好友");
break;

case 10703:
a.err("对方关闭了接收消息");
break;

case 10701:
a.err("用户已被加入黑名单，无法向其发送消息");
break;

case 10704:
case 10705:
a.err("该素材已被删除");
break;

case 64505:
a.err("发送预览失败，请稍后再试");
break;

case 200008:
case 200006:
e.ret="-6",a.err("请输入验证码");
break;

default:
a.err("系统繁忙，请稍后重试");
}
o&&o(e);
});
},
edit:function(e,a,r){
var o=t.create,c=e.age.split("~");
if(2==c.length){
var i=1*c[0],s=1*c[1];
i==s&&(60==s?i--:s++,e.age=i+"~"+s);
}
e.advert_id&&(o=t.update),n("post",o,e,a,r);
},
checkApp:function(e,a,r){
n("get",t.checkApp,e,a,r);
},
put:function(e,a,r){
n("post",t.put,e,a,r);
},
stop:function(e,a,r){
n("post",t.stop,e,a,r);
}
};
});