define("biz_web/lib/highcharts-more-v4.2.4.js",[],function(){
return function(t){
function i(t,i,a){
this.init(t,i,a);
}
var a,e=t.arrayMin,o=t.arrayMax,n=t.each,r=t.extend,s=t.merge,l=t.map,h=t.pick,p=t.pInt,c=t.correctFloat,d=t.getOptions().plotOptions,u=t.seriesTypes,g=t.extendClass,f=t.splat,m=t.wrap,y=t.Axis,b=t.Tick,x=t.Point,A=t.Pointer,P=t.CenteredSeriesMixin,L=t.TrackerMixin,w=t.Series,M=Math,v=M.round,k=M.floor,C=M.max,T=t.Color,X=function(){};
r(i.prototype,{
init:function(t,i,a){
var e,o=this,r=o.defaultOptions;
o.chart=i,o.options=t=s(r,i.angular?{
background:{}
}:void 0,t),e=t.background,e&&n([].concat(f(e)).reverse(),function(t){
var i=t.backgroundColor,e=a.userOptions;
t=s(o.defaultBackgroundOptions,t),i&&(t.backgroundColor=i),t.color=t.backgroundColor,
a.options.plotBands.unshift(t),e.plotBands=e.plotBands||[],e.plotBands!==a.options.plotBands&&e.plotBands.unshift(t);
});
},
defaultOptions:{
center:["50%","50%"],
size:"85%",
startAngle:0
},
defaultBackgroundOptions:{
shape:"circle",
borderWidth:1,
borderColor:"silver",
backgroundColor:{
linearGradient:{
x1:0,
y1:0,
x2:0,
y2:1
},
stops:[[0,"#FFF"],[1,"#DDD"]]
},
from:-Number.MAX_VALUE,
innerRadius:0,
to:Number.MAX_VALUE,
outerRadius:"105%"
}
});
var Y=y.prototype,S=b.prototype,R={
getOffset:X,
redraw:function(){
this.isDirty=!1;
},
render:function(){
this.isDirty=!1;
},
setScale:X,
setCategories:X,
setTitle:X
},z={
isRadial:!0,
defaultRadialGaugeOptions:{
labels:{
align:"center",
x:0,
y:null
},
minorGridLineWidth:0,
minorTickInterval:"auto",
minorTickLength:10,
minorTickPosition:"inside",
minorTickWidth:1,
tickLength:10,
tickPosition:"inside",
tickWidth:2,
title:{
rotation:0
},
zIndex:2
},
defaultRadialXOptions:{
gridLineWidth:1,
labels:{
align:null,
distance:15,
x:0,
y:null
},
maxPadding:0,
minPadding:0,
showLastLabel:!1,
tickLength:0
},
defaultRadialYOptions:{
gridLineInterpolation:"circle",
labels:{
align:"right",
x:-3,
y:-2
},
showLastLabel:!1,
title:{
x:4,
text:null,
rotation:90
}
},
setOptions:function(t){
var i=this.options=s(this.defaultOptions,this.defaultRadialOptions,t);
i.plotBands||(i.plotBands=[]);
},
getOffset:function(){
Y.getOffset.call(this),this.chart.axisOffset[this.side]=0,this.center=this.pane.center=P.getCenter.call(this.pane);
},
getLinePath:function(t,i){
var a=this.center;
return i=h(i,a[2]/2-this.offset),this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],i,i,{
start:this.startAngleRad,
end:this.endAngleRad,
open:!0,
innerR:0
});
},
setAxisTranslation:function(){
Y.setAxisTranslation.call(this),this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),
this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0);
},
beforeSetTickPositions:function(){
this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0);
},
setAxisSize:function(){
Y.setAxisSize.call(this),this.isRadial&&(this.center=this.pane.center=t.CenteredSeriesMixin.getCenter.call(this.pane),
this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*h(this.sector,1)/2);
},
getPosition:function(t,i){
return this.postTranslate(this.isCircular?this.translate(t):0,h(this.isCircular?i:this.translate(t),this.center[2]/2)-this.offset);
},
postTranslate:function(t,i){
var a=this.chart,e=this.center;
return t=this.startAngleRad+t,{
x:a.plotLeft+e[0]+Math.cos(t)*i,
y:a.plotTop+e[1]+Math.sin(t)*i
};
},
getPlotBandPath:function(t,i,a){
var e,o,n,r,s=this.center,c=this.startAngleRad,d=s[2]/2,u=[h(a.outerRadius,"100%"),a.innerRadius,h(a.thickness,10)],g=/%$/,f=this.isCircular;
return"polygon"===this.options.gridLineInterpolation?r=this.getPlotLinePath(t).concat(this.getPlotLinePath(i,!0)):(t=Math.max(t,this.min),
i=Math.min(i,this.max),f||(u[0]=this.translate(t),u[1]=this.translate(i)),u=l(u,function(t){
return g.test(t)&&(t=p(t,10)*d/100),t;
}),"circle"!==a.shape&&f?(e=c+this.translate(t),o=c+this.translate(i)):(e=-Math.PI/2,
o=1.5*Math.PI,n=!0),r=this.chart.renderer.symbols.arc(this.left+s[0],this.top+s[1],u[0],u[0],{
start:Math.min(e,o),
end:Math.max(e,o),
innerR:h(u[1],u[0]-u[2]),
open:n
})),r;
},
getPlotLinePath:function(t,i){
var a,e,o,r,s=this,l=s.center,h=s.chart,p=s.getPosition(t);
return s.isCircular?r=["M",l[0]+h.plotLeft,l[1]+h.plotTop,"L",p.x,p.y]:"circle"===s.options.gridLineInterpolation?(t=s.translate(t),
t&&(r=s.getLinePath(0,t))):(n(h.xAxis,function(t){
t.pane===s.pane&&(a=t);
}),r=[],t=s.translate(t),o=a.tickPositions,a.autoConnect&&(o=o.concat([o[0]])),i&&(o=[].concat(o).reverse()),
n(o,function(i,o){
e=a.getPosition(i,t),r.push(o?"L":"M",e.x,e.y);
})),r;
},
getTitlePosition:function(){
var t=this.center,i=this.chart,a=this.options.title;
return{
x:i.plotLeft+t[0]+(a.x||0),
y:i.plotTop+t[1]-{
high:.5,
middle:.25,
low:0
}[a.align]*t[2]+(a.y||0)
};
}
};
m(Y,"init",function(t,e,o){
var n,l,p,c,d,u,g=this,m=e.angular,y=e.polar,b=o.isX,x=m&&b,A=e.options,P=o.pane||0;
m?(r(this,x?R:z),n=!b,n&&(this.defaultRadialOptions=this.defaultRadialGaugeOptions)):y&&(r(this,z),
n=b,this.defaultRadialOptions=b?this.defaultRadialXOptions:s(this.defaultYAxisOptions,this.defaultRadialYOptions)),
t.call(this,e,o),x||!m&&!y||(c=this.options,e.panes||(e.panes=[]),this.pane=d=e.panes[P]=e.panes[P]||new i(f(A.pane)[P],e,g),
u=d.options,e.inverted=!1,A.chart.zoomType=null,this.startAngleRad=l=(u.startAngle-90)*Math.PI/180,
this.endAngleRad=p=(h(u.endAngle,u.startAngle+360)-90)*Math.PI/180,this.offset=c.offset||0,
this.isCircular=n,n&&o.max===a&&p-l===2*Math.PI&&(this.autoConnect=!0));
}),m(Y,"autoLabelAlign",function(t){
return this.isRadial?void 0:t.apply(this,[].slice.call(arguments,1));
}),m(S,"getPosition",function(t,i,a,e,o){
var n=this.axis;
return n.getPosition?n.getPosition(a):t.call(this,i,a,e,o);
}),m(S,"getLabelPosition",function(t,i,a,e,o,n,r,s,l){
var p,c=this.axis,d=n.y,u=20,g=n.align,f=(c.translate(this.pos)+c.startAngleRad+Math.PI/2)/Math.PI*180%360;
return c.isRadial?(p=c.getPosition(this.pos,c.center[2]/2+h(n.distance,-25)),"auto"===n.rotation?e.attr({
rotation:f
}):null===d&&(d=c.chart.renderer.fontMetrics(e.styles.fontSize).b-e.getBBox().height/2),
null===g&&(c.isCircular?(this.label.getBBox().width>c.len*c.tickInterval/(c.max-c.min)&&(u=0),
g=f>u&&180-u>f?"left":f>180+u&&360-u>f?"right":"center"):g="center",e.attr({
align:g
})),p.x+=n.x,p.y+=d):p=t.call(this,i,a,e,o,n,r,s,l),p;
}),m(S,"getMarkPath",function(t,i,a,e,o,n,r){
var s,l,h=this.axis;
return h.isRadial?(s=h.getPosition(this.pos,h.center[2]/2+e),l=["M",i,a,"L",s.x,s.y]):l=t.call(this,i,a,e,o,n,r),
l;
}),d.arearange=s(d.area,{
lineWidth:1,
marker:null,
threshold:null,
tooltip:{
pointFormat:'<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
},
trackByArea:!0,
dataLabels:{
align:null,
verticalAlign:null,
xLow:0,
xHigh:0,
yLow:0,
yHigh:0
},
states:{
hover:{
halo:!1
}
}
}),u.arearange=g(u.area,{
type:"arearange",
pointArrayMap:["low","high"],
dataLabelCollections:["dataLabel","dataLabelUpper"],
toYData:function(t){
return[t.low,t.high];
},
pointValKey:"low",
deferTranslatePolar:!0,
highToXY:function(t){
var i=this.chart,a=this.xAxis.postTranslate(t.rectPlotX,this.yAxis.len-t.plotHigh);
t.plotHighX=a.x-i.plotLeft,t.plotHigh=a.y-i.plotTop;
},
translate:function(){
var t=this,i=t.yAxis;
u.area.prototype.translate.apply(t),n(t.points,function(t){
var a=t.low,e=t.high,o=t.plotY;
null===e||null===a?t.isNull=!0:(t.plotLow=o,t.plotHigh=i.translate(e,0,1,0,1));
}),this.chart.polar&&n(this.points,function(i){
t.highToXY(i);
});
},
getGraphPath:function(){
var t,i,a,e,o,n,r=this.points,s=[],l=[],h=r.length,p=w.prototype.getGraphPath,c=this.options,d=c.step;
for(h=r.length;h--;)t=r[h],t.isNull||r[h+1]&&!r[h+1].isNull||l.push({
plotX:t.plotX,
plotY:t.plotLow
}),i={
plotX:t.plotX,
plotY:t.plotHigh,
isNull:t.isNull
},l.push(i),s.push(i),t.isNull||r[h-1]&&!r[h-1].isNull||l.push({
plotX:t.plotX,
plotY:t.plotLow
});
return e=p.call(this,r),d&&(d===!0&&(d="left"),c.step={
left:"right",
center:"center",
right:"left"
}[d]),o=p.call(this,s),n=p.call(this,l),c.step=d,a=[].concat(e,o),this.chart.polar||"M"!==n[0]||(n[0]="L"),
this.areaPath=this.areaPath.concat(e,n),a;
},
drawDataLabels:function(){
var t,i,a,e=this.data,o=e.length,n=[],r=w.prototype,s=this.options.dataLabels,l=s.align,h=s.verticalAlign,p=s.inside,c=this.chart.inverted;
if(s.enabled||this._hasPointLabels){
for(t=o;t--;)i=e[t],i&&(a=p?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,i.y=i.high,
i._plotY=i.plotY,i.plotY=i.plotHigh,n[t]=i.dataLabel,i.dataLabel=i.dataLabelUpper,
i.below=a,c?l||(s.align=a?"right":"left"):h||(s.verticalAlign=a?"top":"bottom"),
s.x=s.xHigh,s.y=s.yHigh);
for(r.drawDataLabels&&r.drawDataLabels.apply(this,arguments),t=o;t--;)i=e[t],i&&(a=p?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,
i.dataLabelUpper=i.dataLabel,i.dataLabel=n[t],i.y=i.low,i.plotY=i._plotY,i.below=!a,
c?l||(s.align=a?"left":"right"):h||(s.verticalAlign=a?"bottom":"top"),s.x=s.xLow,
s.y=s.yLow);
r.drawDataLabels&&r.drawDataLabels.apply(this,arguments);
}
s.align=l,s.verticalAlign=h;
},
alignDataLabel:function(){
u.column.prototype.alignDataLabel.apply(this,arguments);
},
setStackedPoints:X,
getSymbol:X,
drawPoints:X
}),d.areasplinerange=s(d.arearange),u.areasplinerange=g(u.arearange,{
type:"areasplinerange",
getPointSpline:u.spline.prototype.getPointSpline
}),function(){
var t=u.column.prototype;
d.columnrange=s(d.column,d.arearange,{
lineWidth:1,
pointRange:null
}),u.columnrange=g(u.arearange,{
type:"columnrange",
translate:function(){
var i,a,e=this,o=e.yAxis,r=e.xAxis,s=r.startAngleRad,l=e.chart,p=e.xAxis.isRadial;
t.translate.apply(e),n(e.points,function(t){
var n,c,d,u=t.shapeArgs,g=e.options.minPointLength;
t.plotHigh=a=o.translate(t.high,0,1,0,1),t.plotLow=t.plotY,d=a,c=h(t.rectPlotY,t.plotY)-a,
Math.abs(c)<g?(n=g-c,c+=n,d-=n/2):0>c&&(c*=-1,d-=c),p?(i=t.barX+s,t.shapeType="path",
t.shapeArgs={
d:e.polarArc(d+c,d,i,i+t.pointWidth)
}):(u.height=c,u.y=d,t.tooltipPos=l.inverted?[o.len+o.pos-l.plotLeft-d-c/2,r.len+r.pos-l.plotTop-u.x-u.width/2,c]:[r.left-l.plotLeft+u.x+u.width/2,o.pos-l.plotTop+d+c/2,c]);
});
},
directTouch:!0,
trackerGroups:["group","dataLabelsGroup"],
drawGraph:X,
crispCol:t.crispCol,
pointAttrToOptions:t.pointAttrToOptions,
drawPoints:t.drawPoints,
drawTracker:t.drawTracker,
getColumnMetrics:t.getColumnMetrics,
animate:function(){
return t.animate.apply(this,arguments);
},
polarArc:function(){
return t.polarArc.apply(this,arguments);
}
});
}(),d.gauge=s(d.line,{
dataLabels:{
enabled:!0,
defer:!1,
y:15,
borderWidth:1,
borderColor:"silver",
borderRadius:3,
crop:!1,
verticalAlign:"top",
zIndex:2
},
dial:{},
pivot:{},
tooltip:{
headerFormat:""
},
showInLegend:!1
});
var D=g(x,{
setState:function(t){
this.state=t;
}
}),O={
type:"gauge",
pointClass:D,
angular:!0,
directTouch:!0,
drawGraph:X,
fixedBox:!0,
forceDL:!0,
trackerGroups:["group","dataLabelsGroup"],
translate:function(){
var t=this,i=t.yAxis,a=t.options,e=i.center;
t.generatePoints(),n(t.points,function(t){
var o=s(a.dial,t.dial),n=p(h(o.radius,80))*e[2]/200,r=p(h(o.baseLength,70))*n/100,l=p(h(o.rearLength,10))*n/100,c=o.baseWidth||3,d=o.topWidth||1,u=a.overshoot,g=i.startAngleRad+i.translate(t.y,null,null,null,!0);
u&&"number"==typeof u?(u=u/180*Math.PI,g=Math.max(i.startAngleRad-u,Math.min(i.endAngleRad+u,g))):a.wrap===!1&&(g=Math.max(i.startAngleRad,Math.min(i.endAngleRad,g))),
g=180*g/Math.PI,t.shapeType="path",t.shapeArgs={
d:o.path||["M",-l,-c/2,"L",r,-c/2,n,-d/2,n,d/2,r,c/2,-l,c/2,"z"],
translateX:e[0],
translateY:e[1],
rotation:g
},t.plotX=e[0],t.plotY=e[1];
});
},
drawPoints:function(){
var t=this,i=t.yAxis.center,a=t.pivot,e=t.options,o=e.pivot,r=t.chart.renderer;
n(t.points,function(i){
var a=i.graphic,o=i.shapeArgs,n=o.d,l=s(e.dial,i.dial);
a?(a.animate(o),o.d=n):i.graphic=r[i.shapeType](o).attr({
stroke:l.borderColor||"none",
"stroke-width":l.borderWidth||0,
fill:l.backgroundColor||"black",
rotation:o.rotation,
zIndex:1
}).add(t.group);
}),a?a.animate({
translateX:i[0],
translateY:i[1]
}):t.pivot=r.circle(0,0,h(o.radius,5)).attr({
"stroke-width":o.borderWidth||0,
stroke:o.borderColor||"silver",
fill:o.backgroundColor||"black",
zIndex:2
}).translate(i[0],i[1]).add(t.group);
},
animate:function(t){
var i=this;
t||(n(i.points,function(t){
var a=t.graphic;
a&&(a.attr({
rotation:180*i.yAxis.startAngleRad/Math.PI
}),a.animate({
rotation:t.shapeArgs.rotation
},i.options.animation));
}),i.animate=null);
},
render:function(){
this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup),
w.prototype.render.call(this),this.group.clip(this.chart.clipRect);
},
setData:function(t,i){
w.prototype.setData.call(this,t,!1),this.processData(),this.generatePoints(),h(i,!0)&&this.chart.redraw();
},
drawTracker:L&&L.drawTrackerPoint
};
u.gauge=g(u.line,O),d.boxplot=s(d.column,{
fillColor:"#FFFFFF",
lineWidth:1,
medianWidth:2,
states:{
hover:{
brightness:-.3
}
},
threshold:null,
tooltip:{
pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'
},
whiskerLength:"50%",
whiskerWidth:2
}),u.boxplot=g(u.column,{
type:"boxplot",
pointArrayMap:["low","q1","median","q3","high"],
toYData:function(t){
return[t.low,t.q1,t.median,t.q3,t.high];
},
pointValKey:"high",
pointAttrToOptions:{
fill:"fillColor",
stroke:"color",
"stroke-width":"lineWidth"
},
drawDataLabels:X,
translate:function(){
var t=this,i=t.yAxis,a=t.pointArrayMap;
u.column.prototype.translate.apply(t),n(t.points,function(t){
n(a,function(a){
null!==t[a]&&(t[a+"Plot"]=i.translate(t[a],0,1,0,1));
});
});
},
drawPoints:function(){
var t,i,e,o,r,s,l,p,c,d,u,g,f,m,y,b,x,A,P,L,w,M,C,T=this,X=T.points,Y=T.options,S=T.chart,R=S.renderer,z=T.doQuartiles!==!1,D=T.options.whiskerLength;
n(X,function(n){
c=n.graphic,w=n.shapeArgs,u={},m={},b={},M=n.color||T.color,n.plotY!==a&&(t=n.pointAttr[n.selected?"selected":""],
x=w.width,A=k(w.x),P=A+x,L=v(x/2),i=k(z?n.q1Plot:n.lowPlot),e=k(z?n.q3Plot:n.lowPlot),
o=k(n.highPlot),r=k(n.lowPlot),u.stroke=n.stemColor||Y.stemColor||M,u["stroke-width"]=h(n.stemWidth,Y.stemWidth,Y.lineWidth),
u.dashstyle=n.stemDashStyle||Y.stemDashStyle,m.stroke=n.whiskerColor||Y.whiskerColor||M,
m["stroke-width"]=h(n.whiskerWidth,Y.whiskerWidth,Y.lineWidth),b.stroke=n.medianColor||Y.medianColor||M,
b["stroke-width"]=h(n.medianWidth,Y.medianWidth,Y.lineWidth),l=u["stroke-width"]%2/2,
p=A+L+l,d=["M",p,e,"L",p,o,"M",p,i,"L",p,r],z&&(l=t["stroke-width"]%2/2,p=k(p)+l,
i=k(i)+l,e=k(e)+l,A+=l,P+=l,g=["M",A,e,"L",A,i,"L",P,i,"L",P,e,"L",A,e,"z"]),D&&(l=m["stroke-width"]%2/2,
o+=l,r+=l,C=/%$/.test(D)?L*parseFloat(D)/100:D/2,f=["M",p-C,o,"L",p+C,o,"M",p-C,r,"L",p+C,r]),
l=b["stroke-width"]%2/2,s=v(n.medianPlot)+l,y=["M",A,s,"L",P,s],c?(n.stem.animate({
d:d
}),D&&n.whiskers.animate({
d:f
}),z&&n.box.animate({
d:g
}),n.medianShape.animate({
d:y
})):(n.graphic=c=R.g().add(T.group),n.stem=R.path(d).attr(u).add(c),D&&(n.whiskers=R.path(f).attr(m).add(c)),
z&&(n.box=R.path(g).attr(t).add(c)),n.medianShape=R.path(y).attr(b).add(c)));
});
},
setStackedPoints:X
}),d.errorbar=s(d.boxplot,{
color:"#000000",
grouping:!1,
linkedTo:":previous",
tooltip:{
pointFormat:'<span style="color:{point.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
},
whiskerWidth:null
}),u.errorbar=g(u.boxplot,{
type:"errorbar",
pointArrayMap:["low","high"],
toYData:function(t){
return[t.low,t.high];
},
pointValKey:"high",
doQuartiles:!1,
drawDataLabels:u.arearange?u.arearange.prototype.drawDataLabels:X,
getColumnMetrics:function(){
return this.linkedParent&&this.linkedParent.columnMetrics||u.column.prototype.getColumnMetrics.call(this);
}
}),d.waterfall=s(d.column,{
lineWidth:1,
lineColor:"#333",
dashStyle:"dot",
borderColor:"#333",
dataLabels:{
inside:!0
},
states:{
hover:{
lineWidthPlus:0
}
}
}),u.waterfall=g(u.column,{
type:"waterfall",
upColorProp:"fill",
pointValKey:"y",
translate:function(){
var t,i,a,e,o,n,r,s,l,p,d,g,f=this,m=f.options,y=f.yAxis,b=h(m.minPointLength,5),x=m.threshold,A=m.stacking;
for(u.column.prototype.translate.apply(this),f.minPointLengthOffset=0,l=p=x,a=f.points,
i=0,t=a.length;t>i;i++)e=a[i],s=this.processedYData[i],o=e.shapeArgs,n=A&&y.stacks[(f.negStacks&&x>s?"-":"")+f.stackKey],
d=n?n[e.x].points[f.index+","+i]:[0,s],e.isSum?e.y=c(s):e.isIntermediateSum&&(e.y=c(s-p)),
r=C(l,l+e.y)+d[0],o.y=y.translate(r,0,1),e.isSum?(o.y=y.translate(d[1],0,1),o.height=Math.min(y.translate(d[0],0,1),y.len)-o.y+f.minPointLengthOffset):e.isIntermediateSum?(o.y=y.translate(d[1],0,1),
o.height=Math.min(y.translate(p,0,1),y.len)-o.y+f.minPointLengthOffset,p=d[1]):(0!==l&&(o.height=s>0?y.translate(l,0,1)-o.y:y.translate(l,0,1)-y.translate(l-s,0,1)),
l+=s),o.height<0&&(o.y+=o.height,o.height*=-1),e.plotY=o.y=v(o.y)-f.borderWidth%2/2,
o.height=C(v(o.height),.001),e.yBottom=o.y+o.height,o.height<=b&&(o.height=b,f.minPointLengthOffset+=b),
o.y-=f.minPointLengthOffset,g=e.plotY+(e.negative?o.height:0)-f.minPointLengthOffset,
f.chart.inverted?e.tooltipPos[0]=y.len-g:e.tooltipPos[1]=g;
},
processData:function(t){
var i,a,e,o,n,r,s,l=this,h=l.options,p=l.yData,d=l.options.data,u=p.length,g=h.threshold||0;
for(e=a=o=n=g,s=0;u>s;s++)r=p[s],i=d&&d[s]?d[s]:{},"sum"===r||i.isSum?p[s]=c(e):"intermediateSum"===r||i.isIntermediateSum?p[s]=c(a):(e+=r,
a+=r),o=Math.min(e,o),n=Math.max(e,n);
w.prototype.processData.call(this,t),l.dataMin=o,l.dataMax=n;
},
toYData:function(t){
return t.isSum?0===t.x?null:"sum":t.isIntermediateSum?0===t.x?null:"intermediateSum":t.y;
},
getAttribs:function(){
u.column.prototype.getAttribs.apply(this,arguments);
var i=this,a=i.options,e=a.states,o=a.upColor||i.color,r=t.Color(o).brighten(.1).get(),l=s(i.pointAttr),h=i.upColorProp;
l[""][h]=o,l.hover[h]=e.hover.upColor||r,l.select[h]=e.select.upColor||o,n(i.points,function(t){
t.options.color||(t.y>0?(t.pointAttr=l,t.color=o):t.pointAttr=i.pointAttr);
});
},
getGraphPath:function(){
var t,i,a,e,o=this.data,n=o.length,r=this.options.lineWidth+this.borderWidth,s=v(r)%2/2,l=[],h="M",p="L";
for(a=1;n>a;a++)i=o[a].shapeArgs,t=o[a-1].shapeArgs,e=[h,t.x+t.width,t.y+s,p,i.x,t.y+s],
o[a-1].y<0&&(e[2]+=t.height,e[5]+=t.height),l=l.concat(e);
return l;
},
getExtremes:X,
drawGraph:w.prototype.drawGraph
}),d.polygon=s(d.scatter,{
marker:{
enabled:!1
}
}),u.polygon=g(u.scatter,{
type:"polygon",
fillGraph:!0,
getSegmentPath:function(t){
return w.prototype.getSegmentPath.call(this,t).concat("z");
},
drawGraph:w.prototype.drawGraph,
drawLegendSymbol:t.LegendSymbolMixin.drawRectangle
}),d.bubble=s(d.scatter,{
dataLabels:{
formatter:function(){
return this.point.z;
},
inside:!0,
verticalAlign:"middle"
},
marker:{
lineColor:null,
lineWidth:1
},
minSize:8,
maxSize:"20%",
softThreshold:!1,
states:{
hover:{
halo:{
size:5
}
}
},
tooltip:{
pointFormat:"({point.x}, {point.y}), Size: {point.z}"
},
turboThreshold:0,
zThreshold:0,
zoneAxis:"z"
});
var I=g(x,{
haloPath:function(){
return x.prototype.haloPath.call(this,this.shapeArgs.r+this.series.options.states.hover.halo.size);
},
ttBelow:!1
});
u.bubble=g(u.scatter,{
type:"bubble",
pointClass:I,
pointArrayMap:["y","z"],
parallelArrays:["x","y","z"],
trackerGroups:["group","dataLabelsGroup"],
bubblePadding:!0,
zoneAxis:"z",
pointAttrToOptions:{
stroke:"lineColor",
"stroke-width":"lineWidth",
fill:"fillColor"
},
applyOpacity:function(t){
var i=this.options.marker,a=h(i.fillOpacity,.5);
return t=t||i.fillColor||this.color,1!==a&&(t=T(t).setOpacity(a).get("rgba")),t;
},
convertAttribs:function(){
var t=w.prototype.convertAttribs.apply(this,arguments);
return t.fill=this.applyOpacity(t.fill),t;
},
getRadii:function(t,i,a,e){
var o,n,r,s,l,h=this.zData,p=[],c=this.options,d="width"!==c.sizeBy,u=c.zThreshold,g=i-t;
for(n=0,o=h.length;o>n;n++)s=h[n],c.sizeByAbsoluteValue&&null!==s&&(s=Math.abs(s-u),
i=Math.max(i-u,Math.abs(t-u)),t=0),null===s?l=null:t>s?l=a/2-1:(r=g>0?(s-t)/g:.5,
d&&r>=0&&(r=Math.sqrt(r)),l=M.ceil(a+r*(e-a))/2),p.push(l);
this.radii=p;
},
animate:function(t){
var i=this.options.animation;
t||(n(this.points,function(t){
var a=t.graphic,e=t.shapeArgs;
a&&e&&(a.attr("r",1),a.animate({
r:e.r
},i));
}),this.animate=null);
},
translate:function(){
var t,i,e,o=this.data,n=this.radii;
for(u.scatter.prototype.translate.call(this),t=o.length;t--;)i=o[t],e=n?n[t]:0,"number"==typeof e&&e>=this.minPxSize/2?(i.shapeType="circle",
i.shapeArgs={
x:i.plotX,
y:i.plotY,
r:e
},i.dlBox={
x:i.plotX-e,
y:i.plotY-e,
width:2*e,
height:2*e
}):i.shapeArgs=i.plotY=i.dlBox=a;
},
drawLegendSymbol:function(t,i){
var a=this.chart.renderer,e=a.fontMetrics(t.itemStyle.fontSize).f/2;
i.legendSymbol=a.circle(e,t.baseline-e,e).attr({
zIndex:3
}).add(i.legendGroup),i.legendSymbol.isMarker=!0;
},
drawPoints:u.column.prototype.drawPoints,
alignDataLabel:u.column.prototype.alignDataLabel,
buildKDTree:X,
applyZones:X
}),y.prototype.beforePadding=function(){
var t=this,i=this.len,r=this.chart,s=0,l=i,c=this.isXAxis,d=c?"xData":"yData",u=this.min,g={},f=M.min(r.plotWidth,r.plotHeight),m=Number.MAX_VALUE,y=-Number.MAX_VALUE,b=this.max-u,x=i/b,A=[];
n(this.series,function(i){
var a,s=i.options;
!i.bubblePadding||!i.visible&&r.options.chart.ignoreHiddenSeries||(t.allowZoomOutside=!0,
A.push(i),c&&(n(["minSize","maxSize"],function(t){
var i=s[t],a=/%$/.test(i);
i=p(i),g[t]=a?f*i/100:i;
}),i.minPxSize=g.minSize,i.maxPxSize=g.maxSize,a=i.zData,a.length&&(m=h(s.zMin,M.min(m,M.max(e(a),s.displayNegative===!1?s.zThreshold:-Number.MAX_VALUE))),
y=h(s.zMax,M.max(y,o(a))))));
}),n(A,function(i){
var a,e=i[d],o=e.length;
if(c&&i.getRadii(m,y,i.minPxSize,i.maxPxSize),b>0)for(;o--;)"number"==typeof e[o]&&t.dataMin<=e[o]&&e[o]<=t.dataMax&&(a=i.radii[o],
s=Math.min((e[o]-u)*x-a,s),l=Math.max((e[o]-u)*x+a,l));
}),A.length&&b>0&&!this.isLog&&(l-=i,x*=(i+s-l)/i,n([["min","userMin",s],["max","userMax",l]],function(i){
h(t.options[i[0]],t[i[1]])===a&&(t[i[0]]+=i[2]/x);
}));
},function(){
function t(t,i){
var a,e=this.chart,o=this.options.animation,n=this.group,r=this.markerGroup,s=this.xAxis.center,l=e.plotLeft,h=e.plotTop;
e.polar?e.renderer.isSVG&&(o===!0&&(o={}),i?(a={
translateX:s[0]+l,
translateY:s[1]+h,
scaleX:.001,
scaleY:.001
},n.attr(a),r&&r.attr(a)):(a={
translateX:l,
translateY:h,
scaleX:1,
scaleY:1
},n.animate(a,o),r&&r.animate(a,o),this.animate=null)):t.call(this,i);
}
var i,a=w.prototype,e=A.prototype;
a.searchPointByAngle=function(t){
var i=this,a=i.chart,e=i.xAxis,o=e.pane.center,n=t.chartX-o[0]-a.plotLeft,r=t.chartY-o[1]-a.plotTop;
return this.searchKDTree({
clientX:180+Math.atan2(n,r)*(-180/Math.PI)
});
},m(a,"buildKDTree",function(t){
this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.kdDimensions=2),
t.apply(this);
}),a.toXY=function(t){
var i,a,e=this.chart,o=t.plotX,n=t.plotY;
t.rectPlotX=o,t.rectPlotY=n,i=this.xAxis.postTranslate(t.plotX,this.yAxis.len-n),
t.plotX=t.polarPlotX=i.x-e.plotLeft,t.plotY=t.polarPlotY=i.y-e.plotTop,this.kdByAngle?(a=(o/Math.PI*180+this.xAxis.pane.options.startAngle)%360,
0>a&&(a+=360),t.clientX=a):t.clientX=t.plotX;
},u.spline&&m(u.spline.prototype,"getPointSpline",function(t,i,a,e){
var o,n,r,s,l,h,p,c,d,u,g,f,m,y,b,x,A,P,L=1.5,w=L+1;
return this.chart.polar?(n=a.plotX,r=a.plotY,s=i[e-1],l=i[e+1],this.connectEnds&&(s||(s=i[i.length-2]),
l||(l=i[1])),s&&l&&(h=s.plotX,p=s.plotY,c=l.plotX,d=l.plotY,u=(L*n+h)/w,g=(L*r+p)/w,
f=(L*n+c)/w,m=(L*r+d)/w,y=Math.sqrt(Math.pow(u-n,2)+Math.pow(g-r,2)),b=Math.sqrt(Math.pow(f-n,2)+Math.pow(m-r,2)),
x=Math.atan2(g-r,u-n),A=Math.atan2(m-r,f-n),P=Math.PI/2+(x+A)/2,Math.abs(x-P)>Math.PI/2&&(P-=Math.PI),
u=n+Math.cos(P)*y,g=r+Math.sin(P)*y,f=n+Math.cos(Math.PI+P)*b,m=r+Math.sin(Math.PI+P)*b,
a.rightContX=f,a.rightContY=m),e?(o=["C",s.rightContX||s.plotX,s.rightContY||s.plotY,u||n,g||r,n,r],
s.rightContX=s.rightContY=null):o=["M",n,r]):o=t.call(this,i,a,e),o;
}),m(a,"translate",function(t){
var i,a,e=this.chart;
if(t.call(this),e.polar&&(this.kdByAngle=e.tooltip&&e.tooltip.shared,!this.preventPostTranslate))for(i=this.points,
a=i.length;a--;)this.toXY(i[a]);
}),m(a,"getGraphPath",function(t,i){
var a=this;
return this.chart.polar&&(i=i||this.points,this.options.connectEnds!==!1&&null!==i[0].y&&(this.connectEnds=!0,
i.splice(i.length,0,i[0])),n(i,function(t){
void 0===t.polarPlotY&&a.toXY(t);
})),t.apply(this,[].slice.call(arguments,1));
}),m(a,"animate",t),u.column&&(i=u.column.prototype,i.polarArc=function(t,i,a,e){
var o=this.xAxis.center,n=this.yAxis.len;
return this.chart.renderer.symbols.arc(o[0],o[1],n-i,null,{
start:a,
end:e,
innerR:n-h(t,n)
});
},m(i,"animate",t),m(i,"translate",function(t){
var i,a,e,o,n=this.xAxis,r=n.startAngleRad;
if(this.preventPostTranslate=!0,t.call(this),n.isRadial)for(a=this.points,o=a.length;o--;)e=a[o],
i=e.barX+r,e.shapeType="path",e.shapeArgs=this.polarArc(e.yBottom,e.plotY,i,i+e.pointWidth),
this.toXY(e),e.tooltipPos=[e.plotX,e.plotY],e.ttBelow=e.plotY>n.center[1];
}),m(i,"alignDataLabel",function(t,i,e,o,n,r){
if(this.chart.polar){
var s,l,h=i.rectPlotX/Math.PI*180;
null===o.align&&(s=h>20&&160>h?"left":h>200&&340>h?"right":"center",o.align=s),null===o.verticalAlign&&(l=45>h||h>315?"bottom":h>135&&225>h?"top":"middle",
o.verticalAlign=l),a.alignDataLabel.call(this,i,e,o,n,r);
}else t.call(this,i,e,o,n,r);
})),m(e,"getCoordinates",function(t,i){
var a=this.chart,e={
xAxis:[],
yAxis:[]
};
return a.polar?n(a.axes,function(t){
var o=t.isXAxis,n=t.center,r=i.chartX-n[0]-a.plotLeft,s=i.chartY-n[1]-a.plotTop;
e[o?"xAxis":"yAxis"].push({
axis:t,
value:t.translate(o?Math.PI-Math.atan2(r,s):Math.sqrt(Math.pow(r,2)+Math.pow(s,2)),!0)
});
}):e=t.call(this,i),e;
});
}();
};
});