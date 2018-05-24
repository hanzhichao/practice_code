define("wifi/homemanager_modify/color.js",["wifi/homemanager_modify/utils.js","biz_web/ui/dropdown.js"],function(e,o,t){
"use strict";
var a,i=e("wifi/homemanager_modify/utils.js"),r=e("biz_web/ui/dropdown.js"),l=wx.cgiData,n=$(".js_edit_color"),s=$(".js_edit_color_input_wrap"),c=$(".js_edit_color_input"),d={},u=l.color.isDefault;
d._setSelectColor=function(e){
a.container.find(".jsBtLabel").addClass("selected_color").css("background-color",e);
},d._initData=function(){
var e=l.color.defaultValue;
e.length>7&&(e="#"+e.substring(3,9)),l.color.defaultValue=e,e=l.color.value,e.length>7&&(e="#"+e.substring(3,9)),
l.color.value=e;
},d._renderEdit=function(){
var e=this;
a=new r({
container:".js_edit_color_select",
label:u?"默认取色":"自定义色值",
data:[{
name:"默认取色",
value:"default"
},{
name:"自定义色值",
value:"custom"
}],
callback:function(o){
"custom"===o?(s.css("display","inline-block"),u=!1):(s.hide(),u=!0),e._renderView();
}
}),this._setSelectColor(l.color.value),c.val(l.color.value.substr(1)),u||s.show();
},d._renderView=function(){
var e=this.getData(),o=l.color.defaultValue;
u||(o=e.status.success?e.data.bar_head.head_color:l.color.value),$(".js_view_color").css("background-color",o),
this._setSelectColor(o);
},d._bindEvent=function(){
var e=this,o=n.find(".js_frm_msg");
c.on("input",function(){
var t=$(this).val();
i.isValidColor(t)?o.hide():o.show(),e._renderView();
});
},d.getData=function(){
if(u)return i.makeData({
bar_head:{
head_color_type:0
}
});
var e=c.val();
return i.makeData(i.isValidColor(e)?{
bar_head:{
head_color_type:1,
head_color:"#"+e
}
}:"请输入正确的颜色值");
},d.init=function(){
this._initData(),this._renderEdit(),this._bindEvent(),this._renderView();
},t.exports=d;
});