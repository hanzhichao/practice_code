define("biz_common/utils/format_ori_check_result.js",[],function(){
function t(t,e,l,i,r){
var n=0,o=0,u=0,_=0,s=0;
if(t.length+e.length+l.length+i.length+r.length==1)return{
forbit_butallow_num:"",
original_num:"",
other_num:"",
history_num:""
};
n=t.length>0?1:0,o=n+(e.length>0?1:0),u=o+(l.length>0?1:0),_=u+(i.length>0?1:0),
s=_+(r.length>0?1:0);
var h=["","一、","二、","三、","四、","五、"];
return{
forbit_butallow_num:h[n],
original_num:h[o],
other_num:h[u],
history_num:h[_],
new_history_num:h[s]
};
}
function e(t){
var e={
forbit_list:[],
forbit_butallow_list:[],
original_list:[],
other_list:[],
history_list:[],
new_history_list:[],
denyByWeapp:[],
willReplace:[],
willReplaceWithPermission:[],
willReplaceIfHistory:[],
willReplaceIfNotShowSrc:[]
};
if(!t||0==t.length)return e;
for(var l=0,i=t.length;i>l;l++){
var r=t[l],n=+r.source_type,o=+r.source_auth_type,u=+r.white_list_status;
r.url=r.source_url.replace(/^http:/,"https:"),r.myUrl=(r.article_url||"").replace(/^http:/,"https:"),
r.source_url=encodeURIComponent(r.source_url||""),r.article_url=encodeURIComponent(r.article_url||""),
r.article_title_encode=encodeURIComponent(r.article_title),[2,100,110].indexOf(u)>-1&&(110!=u&&100!=u||3!=o)?0==o?e.willReplaceIfHistory.push(r):2==u?e.willReplaceIfNotShowSrc.push(r):e.willReplace.push(r):[1,2,3].indexOf(u)>-1?e.forbit_butallow_list.push(r):3==o?e.willReplace.push(r):3!=o&&-1==[1,2,3].indexOf(u)&&(1==n?0==o?e.willReplaceIfHistory.push(r):e.original_list.push(r):9==n?e.new_history_list.push(r):n>1&&e.other_list.push(r));
}
return e;
}
return{
getShowNum:t,
format:e
};
});