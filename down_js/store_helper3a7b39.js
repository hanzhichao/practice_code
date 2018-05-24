define("cardticket/store_helper.js",["biz_web/ui/dropdown.js","biz_common/jquery.validate.js","common/wx/Cgi.js","common/wx/sosomap/util.js","cardticket/common_validate.js"],function(e){
"use strict";
function a(e,a){
e.validate({
rules:{
business_name:{
required:!0,
business_name:30
},
branch_name:{
required:!1,
branch_name:10
},
category:{
required:!0
},
address:{},
telephone:{
required:!0,
telechar:!0
},
pic_url:{
required:!1
},
avg_price:{
digits:!0
},
desc:{},
signature:{
maxlength:6
}
},
ignore:[],
messages:{
business_name:{
required:"门店名不能为空且长度不超过15个汉字或30个英文字母",
business_name:"门店名不能为空且长度不超过15个汉字或30个英文字母"
},
branch_name:"分店名不能超过10个字",
category:"请选择类别",
address:"详细地址不能为空",
telephone:{
required:"电话不能为空",
telechar:"电话只能包含数字和“-”"
},
pic_url:{
required:"请上传图片"
},
avg_price:{
digits:"此处只填写数字，展示时会自动加上“￥”符号"
},
desc:{
maxlength:"简介最多100个字"
},
signature:{
maxlength:"签名超过6个字"
}
},
errorPlacement:function(e,a){
var n=a.parent(),r=n.parent(),t=r.find(".frm_tips");
r.find("p.fail").remove(),t.length?e.insertBefore(t):e.appendTo(r);
},
submitHandler:function(e){
a&&a(e);
},
invalidHandler:function(e,a){
var n=$(a.errorList[0].element);
n.focus();
}
});
}
function n(e,a){
return new t({
container:e.find(".js_category_container"),
label:a||"请选择",
data:s,
callback:function(a,n){
var r=e.find(".js_category_value").val(n);
r.closest(".frm_control_group").find(".fail").hide();
}
});
}
function r(e,a,n){
var r=e.getData()||{};
if(a){
var t=l.formatAddress(a.detail);
r.address=t.province+t.city+t.district+(n.street?n.street:t.finalAddress),r.latLng=a.detail.location,
r.latitude=r.latLng.lat,r.longitude=r.latLng.lng;
}
n.branch_name&&(r.branch_name=n.branch_name),n.telephone&&(r.telephone=n.telephone),
e.refresh(r);
}
var t=e("biz_web/ui/dropdown.js"),i=e("biz_common/jquery.validate.js"),o=i.rules,l=(e("common/wx/Cgi.js"),
e("common/wx/sosomap/util.js"));
e("cardticket/common_validate.js"),$.validator.addMethod("business_name",function(e,a,n){
return this.optional(a)||$("#js_sosomap_poi_uid").val()||e.len()<=n;
}),$.validator.addMethod("branch_name",function(e,a,n){
return this.optional(a)||$("#js_sosomap_poi_uid").val()||o.maxlength(e,n);
});
var s=[{
name:"美食",
value:"100000"
},{
name:"娱乐休闲",
value:"160000"
},{
name:"购物",
value:"130000"
},{
name:"生活服务",
value:"140000"
},{
name:"运动健身",
value:"180000"
},{
name:"酒店宾馆",
value:"210000"
},{
name:"汽车服务",
value:"190000"
},{
name:"旅游景点",
value:"220000"
},{
name:"文体场馆",
value:"230000"
},{
name:"教育学校",
value:"240000"
},{
name:"医疗保健",
value:"200000"
},{
name:"银行金融",
value:"250000"
},{
name:"公司企业",
value:"110000"
},{
name:"房产小区",
value:"280000"
},{
name:"机构团体",
value:"120000"
},{
name:"地名地址",
value:"260000"
},{
name:"基础设施",
value:"270000"
},{
name:"其他",
value:"990000"
}];
return{
initCategory:n,
initCreateForm:a,
updateMarker:r,
trimdata:function(e){
for(var a in e)e[a]=$.trim(e[a]);
return e;
}
};
});