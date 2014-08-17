/*! airconditioner-remote 2014-08-17 */
!function(a,b){"use strict";b.json("/temperature",function(c,d){function e(){b.json("/temperature/"+h,function(a,c){if(c.length){d=d.concat(c);for(var f=0,k=d.length;k>f&&d[f].d<h-g;f++)d.shift()}h=Date.now();var l=d[d.length-1],m=w.datum();w.datum(l).transition().duration(1e3).tween("text",function(a){var c=b.interpolateNumber(m.t,a.t);return function(a){this.textContent=j(u(c(a)))}}),n.domain([h-g-i,h-i]),o.domain([Math.min(20,b.min(d,function(a){return a.t})),Math.max(30,b.max(d,function(a){return a.t}))]).nice(),q.select(".line").attr("d",p).attr("transform",null),t.data([d]).transition().duration(i).ease("linear").attr("transform","translate("+n(h-g-i)+")").each("end",e),r.transition().duration(i).ease("linear").call(n.axis),s.transition().duration(i).ease("linear").call(o.axis)})}if(!c){var f=a(".temperature-plot"),g=36e5,h=Date.now(),i=2500,j=function(a){return a+"°C"},k={top:6,right:90,bottom:20,left:40},l=f.width()-k.right-k.left,m=120-k.top-k.bottom,n=b.time.scale().domain([h-g-i,h-i]).range([0,l]),o=b.scale.linear().domain([20,30]).range([m,0]),p=b.svg.line().interpolate("basis").x(function(a){return n(a.d)}).y(function(a){return o(a.t)}),q=b.select(f.get(0)).append("svg").attr("width",l+k.right+k.left).attr("height",m+k.top+k.bottom).append("g").attr("transform","translate("+k.left+","+k.top+")");q.append("defs").append("clipPath").attr("id","clip").append("rect").attr("width",l).attr("height",m);var r=q.append("g").attr("class","x axis").attr("transform","translate(0,"+m+")").call(n.axis=b.svg.axis().scale(n).tickFormat(b.time.format("%H:%M")).orient("bottom")),s=q.append("g").attr("class","y axis").call(o.axis=b.svg.axis().scale(o).ticks(5).tickFormat(function(a){return j(a)}).orient("left")),t=q.append("g").attr("clip-path","url(#clip)").append("path").data([d]).attr("class","line"),u=b.format(".1f"),v=k.top,w=q.append("g").attr("transform","translate("+(l+v)+", "+k.top+")").append("text").attr("class","temperature").attr("y",m/2).attr("dy","0.35em").datum(d[d.length-1]).text(function(a){return j(u(a.t))});e()}})}(window.jQuery,window.d3);