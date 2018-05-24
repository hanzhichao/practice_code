define("register/model.js",[],function(t,n,e){
"use strict";
function a(t){
t&&t.call(this,c),f.onDataChange&&f.onDataChange.call(this,c);
}
function i(){
return c;
}
function o(t){
c.step=t,f.onStepChange&&f.onStepChange.call(this,t,c);
}
function s(t){
f=$.extend(!0,f,t),f.data&&(c=$.extend(!0,c,t.data),f.data=void 0);
}
var c={
step:3,
refill:"false"
},f={
onDataChange:function(){},
onStepChange:function(){}
};
e.exports={
init:s,
setStep:o,
setData:a,
getData:i
};
});