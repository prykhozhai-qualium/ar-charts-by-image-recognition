(function(t){function e(e){for(var i,s,a=e[0],c=e[1],u=e[2],p=0,f=[];p<a.length;p++)s=a[p],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);h&&h(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(i=!1)}i&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var i={},r={app:0},o=[];function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var h=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"0598":function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[]},"199c":function(t,e){},"23be":function(t,e,n){"use strict";var i=n("199c"),r=n.n(i);e["default"]=r.a},"3dfd":function(t,e,n){"use strict";var i=n("0598"),r=n("23be"),o=(n("034f"),n("2877")),s=Object(o["a"])(r["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=n("3dfd"),o=n("2f62"),s=n("1da1"),a=(n("96cf"),n("d3b7"),n("159b"),n("936c"),n("d81d"),{smoothMatrixChange:function(t,e){return e.map((function(e,n){return t[n]+(e-t[n])/5}))}}),c=window.MINDAR.IMAGE.THREE,u={state:{target_anchor:-1,frame_callbacks_stack:[],scene:{anchors:[],scene_anchor:null},options:null},mutations:{updateSceneAnchorMatrix:function(t){var e,n;if(t.scene.anchors.forEach((function(t,i){1==t.visible&&(e=t,n=i)})),!t.scene.scene_anchor||!e)return t.target_anchor=-1,t.scene.scene_anchor.visible=!1,void(t.scene.scene_anchor.group.visible=!1);t.target_anchor=n,t.scene.scene_anchor.visible=!0,t.scene.scene_anchor.group.visible=!0;var i=t.scene.scene_anchor.group.matrix,r=e.group.matrix;i.elements=a.smoothMatrixChange(i.elements,r.elements)},addFrameCallback:function(t,e){t.frame_callbacks_stack.push(e)},addLight:function(t,e){var n=new c.PointLight(4210752);n.position.set(-40,-120,-40),e.group.add(n)}},actions:{setUpScene:function(t,e){var n=t.state,i=t.commit;n.options=e;var r=new window.MINDAR.IMAGE.MindARThree({container:document.querySelector("#container"),imageTargetSrc:n.options.target}),o=r.renderer,a=r.scene,c=r.camera;n.scene.anchors.push(r.addAnchor(0)),n.scene.scene_anchor=r.addAnchor(1),console.log(n.scene.scene_anchor);var u=function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.start();case 2:o.setAnimationLoop((function(){n.frame_callbacks_stack.forEach((function(t){return t()})),o.render(a,c)})),i("addFrameCallback",(function(){return i("updateSceneAnchorMatrix")}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();window.requestAnimationFrame(u),i("addLight",n.scene.scene_anchor)}}},h=n("8c4f"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("div",{attrs:{id:"container"}}),t.parent?n("Chart",{attrs:{parent:t.parent}}):t._e()],1)},f=[],l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}})},d=[],m=(n("b0c0"),n("25f0"),n("5a89")),v=n("598d"),g=n("7e1b"),w=n("4a8d"),b={name:"Chart",props:{parent:Object},data:function(){return{scene_created:!1,framestamp:0,framestamp_vector:1,framestamp_scale:600*Math.PI,camera:null,scene:null,renderer:null,animation_frame_callbacks:[],reticle:void 0,functions:[],active_function:8,prev_active_function:0,hit:{hitTestSource:null,hitTestSourceRequested:!1},objects:{grid:{text:{mesh:null}}},options:{miniature:{active:{scale:1.2,position_z:5},inactive:{scale:1},points:{width:8,length:8}},scale:.5,points:{width:34,length:34},grid:{text:null,size:{x:15,y:15,z:7}}}}},components:{},methods:{createAnimFunction:function(t,e){this.functions.push({k:1,fn:t,color_fn:e})},updateActiveFunction:function(){var t=this;this.functions.forEach((function(e,n){n==t.active_function?e.k+=(1-e.k)/20:e.k+=(0-e.k)/20}))},setUpSphere:function(t,e){var n=this,i=new m["f"](.1,3),r=new m["m"]({color:16777215}),o=new m["g"](i,r,e.points.width*e.points.length),s=this.options.grid.size.x/e.points.width,a=this.options.grid.size.z/e.points.length,c=(this.options.grid.size.x-1/s*s)/e.points.width,u=(this.options.grid.size.z-1/a*a)/e.points.length;o.instanceMatrix,this.animation_frame_callbacks.push((function(){for(var t=0,i=0;i<e.points.width;i++)for(var r=0;r<e.points.length;r++){var s=new m["k"],a=u*r,h=c*i,p=0;p=e.fn(h,a),s.setPosition(h,p,a);var f=e.scale_fn(p);s.scale(new m["q"](f,f,f)),o.updateMatrix(),o.setMatrixAt(t,s),o.updateMatrix(),o.setColorAt(t,e.color_fn(i/e.points.width,r/e.points.length,n.active_function)),o.updateMatrix(),t++,o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0}})),o.position.x=-this.options.grid.size.x/2,o.position.z=-this.options.grid.size.z/2,o.name=e.name,t.add(o)},getText:function(t){var e=new w["a"];e.parse(g);var n=new v["a"](t,{font:e.parse(g),size:.3,height:0,curveSegments:10,bevelEnabled:!0,bevelThickness:.01,bevelSize:0,bevelOffset:0,bevelSegments:2}),i=new m["m"]({color:16777215,specular:16777215}),r=new m["l"](n,i);return r},setUpGrid:function(t,e){var n,i=this;e.numbers&&(n=new m["l"]);for(var r=new m["i"]({color:e.color,transparent:!0,opacity:e.opacity}),o=[],s=0;s<this.options.grid.size.x;s++){if(s%2==0&&e.numbers){var a=this.getText(s.toString());a.position.x=s,a.position.z=this.options.grid.size.z,a.rotateY(Math.PI/3),n.add(a)}for(var c=0;c<this.options.grid.size.y;c++)o.push(new m["q"](s,c,0));for(var u=0;u<this.options.grid.size.z;u++)o.push(new m["q"](s,0,u));o.push(new m["q"](s,0,0))}for(var h=0;h<this.options.grid.size.y;h++){if(h%2==0&&e.numbers){var p=this.getText(h.toString());p.position.y=h,p.position.x=this.options.grid.size.x,p.rotateY(Math.PI/3),n.add(p)}for(var f=0;f<this.options.grid.size.z;f++)o.push(new m["q"](0,h,f));for(var l=0;l<this.options.grid.size.x;l++)o.push(new m["q"](l,h,0));o.push(new m["q"](0,h,0))}for(var d=0;d<this.options.grid.size.z;d++){if(d%2==0&&e.numbers){var v=this.getText(d.toString());v.position.z=d,v.position.x=this.options.grid.size.x,v.rotateY(Math.PI/3),n.add(v)}for(var g=0;g<this.options.grid.size.y;g++)o.push(new m["q"](0,g,d));for(var w=0;w<this.options.grid.size.x;w++)o.push(new m["q"](w,0,d));o.push(new m["q"](0,0,d))}var b=(new m["a"]).setFromPoints(o),_=new m["h"](b,r);_.name=e.name,_.position.x=-this.options.grid.size.x/2,_.position.z=-this.options.grid.size.z/2,e.numbers&&(n.position.x=-this.options.grid.size.x/2,n.position.z=-this.options.grid.size.z/2,this.objects.grid.text.mesh=n,t.add(n),this.animation_frame_callbacks.push((function(){i.objects.grid.text&&i.objects.grid.text.mesh.children.forEach((function(t){t.lookAt(i.camera.position)}))}))),t.add(_)},setUpScene:function(){this.camera=new m["n"](45,window.innerWidth/window.innerHeight,.01,120),this.camera.position.z=25,this.camera.position.x=25,this.camera.position.y=35,this.camera.lookAt(new m["q"](0,0,0)),this.scene=new m["o"],this.renderer=new m["r"]({antialias:!0,alpha:!0}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.renderer.setAnimationLoop(this.render)},render:function(t){var e=this;0==this.framestamp?this.framestamp_vector=1:this.framestamp==this.framestamp_scale&&(this.framestamp_vector=-1),this.framestamp=this.framestamp+this.framestamp_vector,e.animation_frame_callbacks.forEach((function(e){e(t)})),e.renderer.render(e.scene,e.camera)},setUpCharts:function(){var t=this;this.createAnimFunction((function(t,e){return 2*Math.cos(.1*t)+2*Math.cos(.1*e)+6}),(function(t,e){return new m["b"](Math.sin(2*t),Math.sin(Math.sqrt(e)),1)})),this.createAnimFunction((function(t){return 2*Math.cos(.7*t)+4}),(function(t,e){return new m["b"](Math.sin(2*t),Math.sin(Math.sqrt(e)),1)})),this.createAnimFunction((function(t,e){return 2*Math.cos(.8*t)*Math.sin(.8*e)+6}),(function(t,e){return new m["b"](Math.sin(2*t),Math.sin(Math.sqrt(e)),1)})),this.createAnimFunction((function(e,n){var i=-t.options.grid.size.x/2,r=-t.options.grid.size.z/2;return Math.sqrt(Math.pow(i+e,2)+Math.pow(r+n,2)+16)}),(function(t){return new m["b"](1,t,Math.sqrt(t))})),this.createAnimFunction((function(e,n){var i=-t.options.grid.size.x/4,r=-t.options.grid.size.z/4;return Math.sqrt(Math.pow(i+e,2)+Math.pow(r+n,2)+16)-2}),(function(t){return new m["b"](1,t,Math.sqrt(t))})),this.createAnimFunction((function(e,n){var i=-t.options.grid.size.x/4,r=-t.options.grid.size.z/4;return Math.sqrt(Math.pow(i+e,2)+Math.pow(r+n,2)+16)-2+Math.sin(e+n)}),(function(t){return new m["b"](1,t,Math.sqrt(t))})),this.createAnimFunction((function(t,e){return Math.abs(Math.sin(10*t))*e}),(function(t){return new m["b"](t,1,Math.sqrt(t))})),this.createAnimFunction((function(t,e){return.5*Math.abs(Math.pow(Math.cos(10*t),2)+Math.sin(e))*e}),(function(t){return new m["b"](t,1,Math.sqrt(t))})),this.createAnimFunction((function(t,e){return.5*Math.abs(Math.pow(Math.cos(10*t),2)+Math.sin(e))*(e+t)}),(function(t){return new m["b"](t,1,Math.sqrt(t))}))},createObjects:function(){var t=this,e=new m["l"],n=function(e){return e/t.options.grid.size.y*2+.5},i=function(e){return e/t.options.grid.size.y*18};this.setUpCharts(),this.setUpGrid(e,{color:16777215,opacity:1,numbers:!0}),this.setUpSphere(e,{points:this.options.points,fn:function(e,n){var i=0;return t.functions.forEach((function(t){return i+=t.k*t.fn(e,n)})),i},scale_fn:n,color_fn:function(e,n){var i={r:0,g:0,b:0};return t.functions.forEach((function(t){i.r+=t.color_fn(e,n).r*t.k,i.g+=t.color_fn(e,n).g*t.k,i.b+=t.color_fn(e,n).b*t.k})),new m["b"](i.r,i.g,i.b)}}),this.animation_frame_callbacks.push((function(){t.updateActiveFunction()})),e.scale.set(1,1,1);for(var r=new m["l"],o=new m["l"],s=0;s<this.functions.length;s++){var a=new m["l"];this.setUpGrid(a,{color:16777215,opacity:.3,name:"miniature_"+s,numbers:!1}),this.setUpSphere(a,{points:this.options.miniature.points,fn:this.functions[s].fn,name:"miniature_"+s,scale_fn:i,color_fn:this.functions[s].color_fn}),a.position.x=1.5*this.options.grid.size.x*Math.floor(s/3),a.position.y=s%3*this.options.grid.size.y*1.5,a.name="miniature_"+s,o.add(a)}return this.animation_frame_callbacks.push((function(){o.children.forEach((function(e,n){n==t.active_function?e.scale.set(e.scale.x+(t.options.miniature.active.scale-e.scale.x)/20,e.scale.y+(t.options.miniature.active.scale-e.scale.y)/20,e.scale.z+(t.options.miniature.active.scale-e.scale.z)/20):e.scale.set(e.scale.x+(t.options.miniature.inactive.scale-e.scale.x)/20,e.scale.y+(t.options.miniature.inactive.scale-e.scale.y)/20,e.scale.z+(t.options.miniature.inactive.scale-e.scale.z)/20)}))})),r.add(o),r.scale.set(.2,.2,.2),r.position.x=this.options.grid.size.x/2+4,r.position.z=-this.options.grid.size.z/2,r.position.y=2,e.add(r),e}},mounted:function(){this.setUpScene();var t=this.createObjects();t.scale.set(.05,.05,.05),t.position.y=-.3;var e=new m["e"](16777215,12303359,1);e.position.set(.5,1,.25),this.parent.add(e),this.parent.add(t)}},_=b,x=(n("e3e9"),n("2877")),M=Object(x["a"])(_,l,d,!1,null,null,null),z=M.exports,y={name:"App",data:function(){return{options:null,contact:0,parent:null}},components:{Chart:z},methods:{setUpMainModel:function(){this.parent=this.$store.state.scene.scene_anchor.group},loadOptions:function(){return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch("./options.json",{headers:{"Content-Type":"application/json",Accept:"application/json"}});case 2:return t.next=4,t.sent.json();case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}}),t)})))()},setUp:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.loadOptions();case 2:t.options=e.sent,t.$nextTick((function(){t.$store.dispatch("setUpScene",t.options),t.setUpMainModel()}));case 4:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia({video:!0});case 2:t.setUp();case 3:case"end":return e.stop()}}),e)})))()}},k=y,A=(n("cccb"),Object(x["a"])(k,p,f,!1,null,null,null)),j=A.exports;i["a"].config.productionTip=!1;var q=new h["a"]({routes:[{path:"/:id?",component:j}]});i["a"].use(o["a"]),i["a"].use(h["a"]);var S=new o["a"].Store(u);new i["a"]({router:q,render:function(t){return t(r["default"])},store:S}).$mount("#app")},"5ced":function(t,e,n){},"85ec":function(t,e,n){},a0dc:function(t,e,n){},cccb:function(t,e,n){"use strict";n("5ced")},e3e9:function(t,e,n){"use strict";n("a0dc")}});
//# sourceMappingURL=app.316a9e75.js.map