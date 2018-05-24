define("cardticket/add/member_info_flag.js",[],function(){
"use strict";
function n(n,f){
for(var i=0;i<n.length;i++)if(n[i]===f)return i;
return-1;
}
var f=[1,4096,2,4,8,0,32,64,128,256,512,1024,2048];
return{
sys_info:["手机号","姓名","性别","所在地区","生日","身份证号","邮箱","详细地址","学历","职业","行业","收入","爱好"],
info_flag:f,
flag2info:function(n){
for(var f=[],i=0;i<this.info_flag.length;i++){
var r=this.info_flag[i];
r&n&&f.push(this.sys_info[i]);
}
return f;
},
info2flag:function(f){
for(var i=0,r=0;r<f.length;r++){
var t=n(this.sys_info,f[r]);
t>=0&&(i|=this.info_flag[t]);
}
return i;
}
};
});