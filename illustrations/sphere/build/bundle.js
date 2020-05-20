var app=function(t){"use strict";function n(){}function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function c(t){return"function"==typeof t}function u(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function a(t){return document.createElement(t)}function i(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}let f;function l(t){f=t}function s(t){(function(){if(!f)throw new Error("Function called outside component initialization");return f})().$$.on_mount.push(t)}const d=[],p=[],h=[],g=[],m=Promise.resolve();let $=!1;function y(t){h.push(t)}const w=new Set;function b(){do{for(;d.length;){const t=d.shift();l(t),_(t.$$)}for(;p.length;)p.pop()();for(let t=0;t<h.length;t+=1){const n=h[t];w.has(n)||(w.add(n),n())}h.length=0}while(d.length);for(;g.length;)g.pop()();$=!1,w.clear()}function _(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(y)}}const x=new Set;function V(t,n){-1===t.$$.dirty[0]&&(d.push(t),$||($=!0,m.then(b)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function v(t,u,a,i,s,d,p=[-1]){const h=f;l(t);const g=u.props||{},m=t.$$={fragment:null,ctx:null,props:d,update:n,not_equal:s,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(h?h.$$.context:[]),callbacks:o(),dirty:p};let $=!1;var w,_;m.ctx=a?a(t,g,(n,e,...o)=>{const r=o.length?o[0]:e;return m.ctx&&s(m.ctx[n],m.ctx[n]=r)&&(m.bound[n]&&m.bound[n](r),$&&V(t,n)),e}):[],m.update(),$=!0,r(m.before_update),m.fragment=!!i&&i(m.ctx),u.target&&(u.hydrate?m.fragment&&m.fragment.l(function(t){return Array.from(t.childNodes)}(u.target)):m.fragment&&m.fragment.c(),u.intro&&((w=t.$$.fragment)&&w.i&&(x.delete(w),w.i(_))),function(t,n,o){const{fragment:u,on_mount:a,on_destroy:i,after_update:f}=t.$$;u&&u.m(n,o),y(()=>{const n=a.map(e).filter(c);i?i.push(...n):r(n),t.$$.on_mount=[]}),f.forEach(y)}(t,u.target,u.anchor),b()),l(h)}function E(t){let e,o;return{c(){e=a("div"),o=a("canvas"),i(o,"width",S),i(o,"height",A),i(e,"class","container svelte-18jbcrh")},m(n,r){!function(t,n,e){t.insertBefore(n,e||null)}(n,e,r),function(t,n){t.appendChild(n)}(e,o),t[1](o)},p:n,i:n,o:n,d(n){var o;n&&(o=e).parentNode.removeChild(o),t[1](null)}}}let S=600,A=300;function j(n,e,o){let r;return s(()=>{function n(n){if(function(n,e,o){const r=new t.Sphere(n,e);return o.intersectsSphere(r)}(new t.Vector3(0,0,1),.5,n)){return new t.Vector3(1,0,0)}const e=.5*(n.direction.clone().normalize().y+1);return new t.Vector3(.5,.7,1).lerp(new t.Vector3(1,1,1),e)}const e=new t.Vector3(-2,-1,1),o=new t.Vector3(4,0,0),c=new t.Vector3(0,2,0),u=new t.Vector3(0,0,0),a=r.width,i=r.height,f=r.getContext("2d"),l=f.getImageData(0,0,a,i);for(let r=0;r<a;++r)for(let f=0;f<i;++f){const s=r/a,d=f/i,p=e.clone().addScaledVector(o,s).addScaledVector(c,d),h=n(new t.Ray(u,p)),g=4*(f*a+r);l.data[g]=255*h.x,l.data[g+1]=255*h.y,l.data[g+2]=255*h.z,l.data[g+3]=255}f.putImageData(l,0,0)}),[r,function(t){p[t?"unshift":"push"](()=>{o(0,r=t)})}]}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=n}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}{constructor(t){super(),v(this,t,j,E,u,{})}}({target:document.body})}(THREE);