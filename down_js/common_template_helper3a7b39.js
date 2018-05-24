define("cardticket/common_template_helper.js",["common/wx/upload.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/add/msg_operate_type_html.js"],function(e){
"use strict";
function t(e){
for(var t,r,n,a,i=[],_=0;_<e.length;_++){
var s=e[_];
"object"==typeof s&&(s=d[s.type]),a=h[s],s?_==e.length-1?n&&s-n!=1?(i.push(t+(r?"至"+r:"")),
i.push(a)):i.push(t?t+"至"+a:a):n&&s-n!=1?(i.push(t+(r?"至"+r:"")),t=a,r="",n=s):(t?r=a:t=a,
n=s):(s=8,_==e.length-1&&t&&i.push(t+"至"+r),i.push(a),t=r=n="");
}
return i.join("、");
}
function r(e){
return e.replace(/\r\n|\\n|\n/g,"<br/>");
}
function n(e){
var t="YYYY-MM-DD HH:mm:ss",r=l(e,t);
return r?r.format("YYYY-MM-DD"):"";
}
function a(e){
return 1==e||3==e||2==e;
}
function i(e,t){
return 1==e&&119>=t?!0:(2!=e||215!=t&&210!=t&&208!=t&&207!=t&&206!=t&&204!=t&&203!=t&&211!=t&&201!=t&&202!=t)&&(3!=e||308!=t&&309!=t&&306!=t&&305!=t&&304!=t&&303!=t&&314!=t&&316!=t&&317!=t)&&(6!=e||601!=t&&602!=t&&603!=t)?4==e&&402==t?!0:7==e&&701==t?!0:(5!=e||501!=t&&502!=t&&503!=t)&&(8!=e||812!=t&&811!=t&&808!=t&&817!=t&&818!=t&&827!=t&&804!=t&&803!=t&&802!=t&&801!=t&&824!=t&&822!=t&&823!=t&&821!=t&&828!=t&&814!=t&&825!=t&&826!=t&&809!=t&&807!=t&&816!=t&&819!=t&&813!=t)?!1:!0:!0;
}
function _(e){
for(var t=0;t<M.length;t++){
var r=M[t];
"function"!=typeof r&&(r=$.noop),r(e);
}
M=[];
}
function s(e){
return M.push(e),"undefined"!=typeof I?(_(I),!0):U?!1:(U=!0,u.get({
url:"/merchant/cardhelpmakesend",
data:{
action:"list",
begin:0,
count:9999999,
status_list:1
},
complete:function(){
U=!1;
}
},function(e){
if(0==e.base_resp.ret||-1==e.base_resp.ret){
for(var t=$.parseJSON(e.bind_list),r=t.List,n=!1,a=!1,s=0;s<r.length;s++){
var p=r[s];
if(i(p.PrimaryCategoryId,p.SecondaryCategoryId)){
a=!0;
break;
}
}
e.attr&&e.attr.merchant_info&&(n=i(e.attr.merchant_info.primary_category_id,e.attr.merchant_info.secondary_category_id)),
n&&a&&(I=1),n&&!a&&(I=2),!n&&a&&(I=3),n||a||(I=4),4==I&&e.is_can_use_sns_card&&!e.is_can_use_help_make_and_send&&(I=5),
_(I);
}
}),!1);
}
function p(e,t){
var r=!1;
e.create_time&&e.create_time<1463648400&&(r=!0),"undefined"==typeof t&&(t=!0);
var n="",a=!1;
return 4==e.type||2==e.type?(t&&e.reduce_cost&&(n="价值%s元代金券一张".sprintf(e.reduce_cost)),
r?n:(e.use_condition_least_cost?(n&&(n+="，"),n+="消费满%s元可用".sprintf(e.use_condition_least_cost)):4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||(n&&(n+="；"),
n+="无最低消费限制"),e.accept_category&&(n&&(n+="；"),n+="适用于%s".sprintf(e.accept_category),
a=!0),e.reject_category&&(n&&(n+="；"),n+="不适用于%s".sprintf(e.reject_category),a=!0),
"1"!=e.is_sns_card&&e.is_sns_card!==!0||4!=e.type||a||(n&&(n+="；"),n+="全场通用，不限品类"),
!(4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||e.has_condition||"0"!=e.uncheckcount&&!e.id),
n)):3==e.type?(t&&(e.title||e.gift_title)&&(n="%s%s%s%s".sprintf("1"==e.is_sns_card||e.is_sns_card===!0?"兑换":"",e.gift_title||e.title,e.gift_num||"",e.gift_unit||"")),
r?n:(2==e.use_condition_least_cost_type&&e.object_use_for&&(n&&(n+="；"),n+="购买%s可用".sprintf(e.object_use_for),
a=!0),1==e.use_condition_least_cost_type&&e.use_condition_least_cost&&(n&&(n+="，"),
n+="消费满%s元可用".sprintf(e.use_condition_least_cost),a=!0),"1"!=e.is_sns_card&&e.is_sns_card!==!0||a||(n&&(n+="；"),
n+="无最低消费限制"),n)):void 0;
}
function o(e){
if(!e.begin_time||!e.end_time)return"";
var t="YYYY.MM.DD";
return l.unix(e.begin_time).format(t)+"-"+l.unix(e.end_time).format(t);
}
var c=e("common/wx/upload.js"),u=e("common/wx/Cgi.js"),l=e("biz_common/moment.js"),m={
10:"会员卡",
21:"门票",
22:"电影票",
4:"代金券",
1:"团购券",
2:"折扣券",
3:"兑换券",
0:"优惠券"
},f={
1:"审核中",
2:"未通过",
3:"待投放",
4:"已删除",
5:"待投放",
6:"已投放",
8:"已过期",
7:"违规下架"
},d={
MONDAY:"1",
TUESDAY:"2",
WEDNESDAY:"3",
THURSDAY:"4",
FRIDAY:"5",
SATURDAY:"6",
SUNDAY:"7"
};
template.helper("$has_day",function(e,t){
if(!e)return"";
for(var r=0;r<e.length;r++){
var n=d[e[r].type];
if(n||(n=8),n==t)return"checked";
}
return"";
});
var h={
1:"周一",
2:"周二",
3:"周三",
4:"周四",
5:"周五",
6:"周六",
7:"周日",
8:"节假日"
};
template.helper("convert_time_limit",function(e){
return t(e);
});
var v={
1:"免费WIFI",
2:"可带宠物",
4:"免费停车",
8:"可外卖"
};
template.helper("convert_business_service",function(e){
if(!e)return"无";
var t=[];
for(var r in v){
var n=parseInt(r);
(e&n)>0&&t.push(v[r]);
}
return t.join("&nbsp;&nbsp;");
});
var l=e("biz_common/moment.js");
template.helper("convert_state",function(e){
return f[e]||e;
}),template.helper("convert_type",function(e){
return m[e]||e;
}),template.helper("card_type_map",function(e){
return e;
}),template.helper("unixFormat",function(e,t){
return t&&(t=t.replace(","," ")),l.unix(e).format(t);
}),template.helper("validtime",function(e,t){
if(1==e.time_type){
var r=l.unix(e.begin_time).format(t)+"至"+l.unix(e.end_time).format(t);
return e.end_time<l().unix()&&(r+="(已过期)"),r;
}
return 2==e.time_type?0==e.from_day?"领取后当天生效%s天有效".sprintf(e.fixed_term):"领取后%s天生效%s天有效".sprintf(e.from_day,e.fixed_term):"";
}),template.helper("addtoken",function(e){
return wx.url(e);
}),template.helper("nl2br",function(e){
return r(e.html(!0));
});
var g={
1:"50万以下",
2:"50-100万",
3:"100-500万",
4:"500-1000万",
5:"1000万以上"
};
template.helper("convert_business_volume_type",function(e){
return g[e]||e;
});
var y={
0:"已提交",
2:"已提交",
3:"生效",
4:"不通过"
};
template.helper("convert_store_state",function(e){
return y[e]||e;
}),template.helper("$preview",function(e){
if(!e)return"无";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=c.tmpFileUrl(e)):t=c.multimediaFileUrl(e),
"<a href='%s' target='_blank'><img src='%s' /></a>".sprintf(t,t);
}),template.helper("$upload_preview",function(e){
if(!e)return"";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=c.tmpFileUrl(e)):t=c.multimediaFileUrl(e),
"<img src='%s' style='width:260px;' />".sprintf(t);
}),template.helper("$preview_stuffs",function(e){
for(var t=[],r=e.stuffs,n=0;n<r.length;n++){
var a=r[n]+"_preview_tpl";
$("#"+a).length&&t.push(template.render(a,e));
}
return t.join("");
});
var x={
2:"女",
1:"男"
};
template.helper("convert_gender",function(e){
return x[e]||"未知";
}),template.helper("percentage",function(e,t,r,n){
var r=e/t*100;
return n&&r>n&&(r=n),r.toFixed(2);
});
var b={
"":"全部",
0:"API渠道",
1:"嵌入图文消息",
2:"直接群发卡券",
3:"下载二维码"
};
template.helper("convert_channel",function(e){
return b[e]||e;
}),template.helper("convert_provide_time",n),template.helper("http2https",function(e){
return e?(e+"").http2https():"";
}),template.helper("https2http",function(e){
return e?(e+"").https2http():"";
}),template.helper("codepad",function(e){
var t=new RegExp("([^s]{4})(?=([^s])+$)","ig");
return e.replace(t,"$1-");
}),template.helper("yuan",function(e){
if(!e)return"--";
var e=e/100;
return e.toFixed(2);
}),template.helper("is_paycard",function(){
return window.wx_is_paycard;
});
var w={
0:"等待接收",
1:"已接收",
3:"过期退回",
2:"已拒绝"
},j={
0:"等待接收",
2:"已拒绝",
1:"已接收",
3:"过期退回"
};
template.helper("convert_intercard_status",function(e){
return w[e]||e;
}),template.helper("convert_intercard_rec_status",function(e){
return j[e]||e;
});
var Y={
0:"无",
1:"图文消息",
2:"卡券货架",
3:"小店货架",
4:"网页链接",
5:"卡券"
};
template.helper("convert_msg_operate_type",function(e){
return Y[e]||"无";
});
var k=e("cardticket/add/msg_operate_type_html.js"),u=e("common/wx/Cgi.js");
template.helper("msg_operate_content",function(e){
return 5===e._type?"":e._notexist?"无":template.compile(k[e._type])({
msg_operation:e
})||"";
});
var D={
CHECKING:"审核中",
APPROVED:"已通过",
REJECTED:"未通过",
EXPIRED:"已过期"
};
template.helper("convert_sub_merchant_status",function(e){
return D[e]||e;
}),template.helper("$is_can_use_help_make_and_send",function(){
return 1==window.wx_is_can_use_help_make_and_send;
}),template.helper("wx_url",function(e){
return wx.url(e);
});
var A={
".*?_4":"激活"
};
template.helper("convert_use_source",function(e,t){
var r=e+"_"+t;
return 4==t?"激活":1==t||6==t||7==t?"自助买单":5==t?"自助核销":2==t?"收款":3==e?"手机核销":1==e?"网页核销":2==e?"API核销":3==t?"积分变更":A[r]||"";
}),template.helper("convert_fee_coin",function(e,t){
return 0==t?"--":a(e)?'<span class="number_add">+%s</span>'.sprintf(t/100):'<span class="number_degress">-%s</span>'.sprintf(t/100);
});
var E={
1:"平台赠送",
2:"充值",
3:"退还券点",
4:"支出",
5:"平台扣减"
};
template.helper("convert_fee_order_type",function(e){
return E[e]||e;
});
var F={
2:{
1:"等待确认",
2:"充值成功",
3:"充值成功",
8:"充值成功"
},
3:"已退券点",
4:{
1:"等待确认",
3:"库存发放中",
4:"库存已发放",
7:"库存添加失败, 已返还券点",
6:"库存已发放",
5:"库存已发放"
}
};
template.helper("convert_fee_order_status",function(e,t){
var r=F[t];
return r?"string"==typeof r?r:r[e]||e:e;
}),template.helper("addhttp",function(e){
return/^http:\/\//.test(e)?e:"http://"+e;
});
var I,C=[],U=!1,M=[];
template.helper("$fix_abstract4friendcard",function(e,t){
return p(e,t);
}),template.helper("$gen_use_time",function(e){
return o(e);
});
var R={
0:"生效",
1:"已使用",
2:"过期",
3:"转赠中",
4:"已转赠",
5:"转赠过期",
6:"已删除"
};
template.helper("convert_user_card_state",function(e){
return R[e]||e;
});
var S={
0:"审核通过",
1:"待商户审核",
2:"审核不通过",
3:"待激活",
4:"请添加库存"
};
return template.helper("convert_swipe_card_status",function(e){
return S[e]||e;
}),{
type_map:m,
status_map:f,
store_status:y,
gender_map:x,
source_map:b,
convert_provide_time:n,
nl2br:r,
sub_merchant_status_map:D,
fix_money:function(e){
var t=/(\.\d{2}).+$/,r=e;
return r=parseFloat((r+"").replace(t,"$1"));
},
parse_assistsend_quota:function(e,t){
for(var r=0,n=0,a=0;a<e.length;a++){
var i=e[a];
i.quota_name==(t||"merchant_auth_create_card")&&(r=i.value),i.quota_name==(t?t+"_max_sku":"merchant_auth_create_card_max_sku")&&(n=i.value);
}
return{
max_card:r,
max_sku:n
};
},
check_friend_card_word:function(e,t){
if(!e)return!0;
for(var r=0;r<C.length;r++)if(e.indexOf(C[r])>=0)return t?t():!0;
return!0;
},
check_assist_brand_name_type:s,
can_category_use_sns_card:i,
fix_abstract4friendcard:p,
strlen:function(e){
for(var t=0,r=0;r<e.length;r++){
var n=e.charCodeAt(r);
128>n?t++:t+=2;
}
return t;
},
gen_use_time:o,
gen_time_limit:t
};
});