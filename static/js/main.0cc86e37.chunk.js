(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(37)},26:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),o=n.n(r),c=n(5),i=n.n(c),s=(n(26),n(3)),u=n(4),l=n.n(u),p=n(6),h=n(7),m=n(8),d=n(10),f=n(9),v=n(11),g=n(1),w=n.n(g);n(16);function b(){var e=Object(a.a)(["\n  margin-top: 0px;\n  font-weight: bold;\n  color: navy;\n"]);return b=function(){return e},e}var j=s.a.div(b());function x(e){return new Promise(function(t){return setTimeout(t,e)})}function k(){return y.apply(this,arguments)}function y(){return(y=Object(p.a)(l.a.mark(function e(){var t,n,a,r,o,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://cors.io/?https://www.metlink.org.nz/api/v1/ServiceLocation/3");case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,a=n.Services,e.next=10,x(1e3);case 10:return e.next=12,fetch("https://cors.io/?https://www.metlink.org.nz/api/v1/ServiceLocation/27");case 12:return t=e.sent,e.next=15,t.json();case 15:for(n=e.sent,r=n.Services,o=0;o<r.length;o++)a.push(r[o]);return c=a.map(function(e){return[+e.Lat,+e.Long,+e.DelaySeconds,+e.ServiceID,e.Direction,e.DestinationStopName]}),e.abrupt("return",c);case 22:return e.prev=22,e.t0=e.catch(0),e.abrupt("return","An error occured.");case 25:case"end":return e.stop()}},e,this,[[0,22]])}))).apply(this,arguments)}var O=function(e){function t(){return Object(h.a)(this,t),Object(d.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.activeBusses;e.busInfo;return o.a.createElement("div",null,o.a.createElement(j,null,"".concat(t," active busses as of ").concat((new Date).toLocaleString())))}}]),t}(r.Component),I=new w.a.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",iconSize:[20,30],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[0,0]}),S=new w.a.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",iconSize:[20,30],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[0,0]});function z(){var e=Object(a.a)(["\n  width: ",";\n  height: ",";\n"]);return z=function(){return e},e}delete w.a.Icon.Default.prototype._getIconUrl,w.a.Icon.Default.mergeOptions({iconRetinaUrl:n(34),iconUrl:n(35),shadowUrl:n(36)});var D=s.a.div(z(),function(e){return e.width},function(e){return e.height}),E=function(e){function t(){var e,n;Object(h.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={location:{lat:-41.301907,long:174.774041},activeBusses:0,busInfo:{}},n}return Object(v.a)(t,e),Object(m.a)(t,[{key:"resetMap",value:function(e,t){void 0!=this.map&&this.map.remove(),this.map=w.a.map("map",{center:[e,t],zoom:15,zoomControl:!1}),w.a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{detectRetina:!0,maxZoom:19}).addTo(this.map),w.a.marker([e,t]).addTo(this.map).bindTooltip("Wellington")}},{key:"componentDidMount",value:function(){var e=this,t=this.state.location,n=t.lat,a=t.long;this.resetMap(n,a);var r=0;setInterval(Object(p.a)(l.a.mark(function t(){var o,c,i,s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r>200&&(e.resetMap(n,a),r=0),t.next=3,k();case 3:o=t.sent;try{for(e.setState({activeBusses:o.length,busInfo:o}),c=0;c<o.length;c++)i=o[c][2]/60,s=void 0,s=i>0?"".concat(i.toFixed(2)," mins ahead of schedule"):i<0?"".concat(Math.abs(i.toFixed(2))," mins behind schedule"):"on time",w.a.marker([o[c][0],o[c][1]],{icon:i>=0?S:I}).bindTooltip("Bus ".concat(o[c][3]," is ").concat(s," <br/> heading ").concat(o[c][4]," to ").concat(o[c][5],".")).addTo(e.map),r+=1}catch(u){}case 5:case"end":return t.stop()}},t,this)})),1e3)}},{key:"render",value:function(){var e=this.state,t=e.activeBusses,n=e.busInfo;return o.a.createElement(r.Fragment,null,o.a.createElement(O,{activeBusses:t,busInfo:n}),o.a.createElement(D,{width:"100%",height:"80vh",id:"map"}))}}]),t}(o.a.Component);function U(){var e=Object(a.a)(["\n  display: grid;\n  grid-template-columns: 100%\n  grid-gap: 10px;\n"]);return U=function(){return e},e}var B=s.a.div(U());i.a.render(o.a.createElement(B,null,o.a.createElement(E,{stops:"yes"})),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.0cc86e37.chunk.js.map