var app=function(t){"use strict";function e(){}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function i(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let a;function s(t){a=t}const l=[],u=[],d=[],f=[],h=Promise.resolve();let p=!1;function m(t){d.push(t)}const w=new Set;function g(){do{for(;l.length;){const t=l.shift();s(t),$(t.$$)}for(;u.length;)u.pop()();for(let t=0;t<d.length;t+=1){const e=d[t];w.has(e)||(w.add(e),e())}d.length=0}while(l.length);for(;f.length;)f.pop()();p=!1,w.clear()}function $(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(m)}}const y=new Set;function x(t,e){-1===t.$$.dirty[0]&&(l.push(t),p||(p=!0,h.then(g)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function b(t,c,l,u,d,f,h=[-1]){const p=a;s(t);const w=c.props||{},$=t.$$={fragment:null,ctx:null,props:f,update:e,not_equal:d,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:[]),callbacks:o(),dirty:h};let b=!1;var _,L,H;$.ctx=l?l(t,w,(e,n,...o)=>{const r=o.length?o[0]:n;return $.ctx&&d($.ctx[e],$.ctx[e]=r)&&($.bound[e]&&$.bound[e](r),b&&x(t,e)),n}):[],$.update(),b=!0,r($.before_update),$.fragment=!!u&&u($.ctx),c.target&&(c.hydrate?$.fragment&&$.fragment.l((H=c.target,Array.from(H.childNodes))):$.fragment&&$.fragment.c(),c.intro&&((_=t.$$.fragment)&&_.i&&(y.delete(_),_.i(L))),function(t,e,o){const{fragment:c,on_mount:a,on_destroy:s,after_update:l}=t.$$;c&&c.m(e,o),m(()=>{const e=a.map(n).filter(i);s?s.push(...e):r(e),t.$$.on_mount=[]}),l.forEach(m)}(t,c.target,c.anchor),g()),s(p)}function _(e){let n,o,r,i,c,a,s,l;return window.addEventListener("resize",(function(){o.aspect=n.clientWidth/n.clientHeight,o.updateProjectionMatrix(),i.setSize(n.clientWidth,n.clientHeight)})),window.addEventListener("mousemove",(function(t){a.x=t.clientX/window.innerWidth*2-1,a.y=-t.clientY/window.innerHeight*2+1}),!1),n=document.querySelector("body"),c=new t.Scene,c.background=new t.Color(9419988),a=new t.Vector2,s=new t.Raycaster,function(){o=new t.PerspectiveCamera(35,n.clientWidth/n.clientHeight,.1,1e3),o.position.set(40,40,40);const e=new t.CameraHelper(o);c.add(e)}(),r=new t.OrbitControls(o,n),function(){const e=new t.HemisphereLight(14544639,2105376,5);c.add(e,null)}(),function(){{const e=new t.MeshNormalMaterial,n=new t.SphereGeometry(5,32,32);new t.Mesh(n,e).name="sphere"}{const e=[];e.push(new t.Vector3(0,0,0)),e.push(new t.Vector3(10,10,10));const n=(new t.Geometry).setFromPoints(e),o=new t.LineBasicMaterial({color:255,linewidth:1});l=new t.Line(n,o),c.add(l)}{const e=new t.AxesHelper(25);c.add(e)}}(),i=new t.WebGLRenderer({antialias:!0}),i.setSize(n.clientWidth,n.clientHeight),i.setPixelRatio(window.devicePixelRatio),i.gammaFactor=2.2,i.gammaOutput=!0,i.physicallyCorrectLights=!0,n.appendChild(i.domElement),i.setAnimationLoop(()=>{!function(){r.update(),s.setFromCamera(a,o);{const e=[];e.push(new t.Vector3(0,0,0)),e.push(o.position);const n=(new t.Geometry).setFromPoints(e),r=new t.LineBasicMaterial({color:255,linewidth:1});l=new t.Line(n,r),c.add(l)}}(),i.render(c,o)}),[]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}{constructor(t){super(),b(this,t,_,null,c,{})}}({target:document.body})}(THREE);