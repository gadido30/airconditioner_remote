/*! airconditioner-remote 2014-08-17 */
!function(a){"use strict";a.json("/temperature",function(b,c){function d(){a.json("/temperature/"+f,function(b,i){if(i.length){c=c.concat(i);for(var j=0,k=c.length;k>j&&c[j].d<f-e;j++)c.shift()}f=Date.now();var t=c[c.length-1],v=u.datum();u.datum(t).transition().duration(1e3).tween("text",function(b){var c=a.interpolateNumber(v.t,b.t);return function(a){this.textContent=h(s(c(a)))}}),l.domain([f-e-g,f-g]),m.domain([Math.min(20,a.min(c,function(a){return a.t})),Math.max(30,a.max(c,function(a){return a.t}))]).nice(),o.select(".line").attr("d",n).attr("transform",null),r.data([c]).transition().duration(g).ease("linear").attr("transform","translate("+l(f-e-g)+")").each("end",d),p.transition().duration(g).ease("linear").call(l.axis),q.transition().duration(g).ease("linear").call(m.axis)})}if(!b){var e=36e5,f=Date.now(),g=2500,h=function(a){return a+"°C"},i={top:6,right:100,bottom:20,left:40},j=450-i.right,k=120-i.top-i.bottom,l=a.time.scale().domain([f-e-g,f-g]).range([0,j]),m=a.scale.linear().domain([20,30]).range([k,0]),n=a.svg.line().interpolate("basis").x(function(a){return l(a.d)}).y(function(a){return m(a.t)}),o=a.select(document.querySelector(".temperature-plot")).append("svg").attr("width",j+i.left+i.right).attr("height",k+i.top+i.bottom).style("margin-left",-i.left+"px").append("g").attr("transform","translate("+i.left+","+i.top+")");o.append("defs").append("clipPath").attr("id","clip").append("rect").attr("width",j).attr("height",k);var p=o.append("g").attr("class","x axis").attr("transform","translate(0,"+k+")").call(l.axis=a.svg.axis().scale(l).tickFormat(a.time.format("%H:%M")).orient("bottom")),q=o.append("g").attr("class","y axis").call(m.axis=a.svg.axis().scale(m).ticks(5).tickFormat(function(a){return degress(a)}).orient("left")),r=o.append("g").attr("clip-path","url(#clip)").append("path").data([c]).attr("class","line"),s=a.format(".1f"),t=i.top,u=o.append("g").attr("transform","translate("+(j+t)+", "+i.top+")").append("text").attr("class","temperature").attr("y",k/2).attr("dy","0.35em").datum(c[c.length-1]).text(function(a){return h(s(a.t))});d()}})}(d3);