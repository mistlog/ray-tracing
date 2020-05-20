var app=function(t){"use strict";function e(){}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function c(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t){return document.createElement(t)}function s(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let l;function u(t){l=t}function d(t){(function(){if(!l)throw new Error("Function called outside component initialization");return l})().$$.on_mount.push(t)}const h=[],f=[],m=[],p=[],w=Promise.resolve();let g=!1;function y(t){m.push(t)}const b=new Set;function V(){do{for(;h.length;){const t=h.shift();u(t),$(t.$$)}for(;f.length;)f.pop()();for(let t=0;t<m.length;t+=1){const e=m[t];b.has(e)||(b.add(e),e())}m.length=0}while(h.length);for(;p.length;)p.pop()();g=!1,b.clear()}function $(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(y)}}const M=new Set;function x(t,e){-1===t.$$.dirty[0]&&(h.push(t),g||(g=!0,w.then(V)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function S(t,a,i,s,d,h,f=[-1]){const m=l;u(t);const p=a.props||{},w=t.$$={fragment:null,ctx:null,props:h,update:e,not_equal:d,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:[]),callbacks:o(),dirty:f};let g=!1;var b,$;w.ctx=i?i(t,p,(e,n,...o)=>{const r=o.length?o[0]:n;return w.ctx&&d(w.ctx[e],w.ctx[e]=r)&&(w.bound[e]&&w.bound[e](r),g&&x(t,e)),n}):[],w.update(),g=!0,r(w.before_update),w.fragment=!!s&&s(w.ctx),a.target&&(a.hydrate?w.fragment&&w.fragment.l(function(t){return Array.from(t.childNodes)}(a.target)):w.fragment&&w.fragment.c(),a.intro&&((b=t.$$.fragment)&&b.i&&(M.delete(b),b.i($))),function(t,e,o){const{fragment:a,on_mount:i,on_destroy:s,after_update:l}=t.$$;a&&a.m(e,o),y(()=>{const e=i.map(n).filter(c);s?s.push(...e):r(e),t.$$.on_mount=[]}),l.forEach(y)}(t,a.target,a.anchor),V()),u(m)}function v(t,e){return t+Math.random()*(e-t)}function z(e,n){return new t.Vector3(v(e,n),v(e,n),v(e,n))}class _ extends class{constructor(){this.topLeftCorner=new t.Vector3(-2,-1,1),this.horizontal=new t.Vector3(4,0,0),this.vertical=new t.Vector3(0,2,0),this.origin=new t.Vector3(0,0,0)}getRay(e,n){const o=this.topLeftCorner.clone().addScaledVector(this.horizontal,e).addScaledVector(this.vertical,n).sub(this.origin);return new t.Ray(this.origin,o)}}{constructor(t,e,n,o,r,c,a){super(),this.origin=n.clone(),this.lensRadius=c/2;const i=Math.tan(t/2)*a,s=e*i;this.w=n.clone().sub(o).normalize(),this.u=r.clone().cross(this.w).normalize(),this.v=this.u.clone().cross(this.w),this.topLeftCorner=this.origin.clone().sub(this.u.clone().multiplyScalar(s)).sub(this.v.clone().multiplyScalar(i)).sub(this.w.clone().multiplyScalar(a)),this.horizontal=this.u.clone().multiplyScalar(2*s),this.vertical=this.v.clone().multiplyScalar(2*i)}getRay(e,n){const o=function(){for(;;){const e=new t.Vector3(v(-1,1),v(-1,1),0);if(e.lengthSq()<1)return e}}().multiplyScalar(this.lensRadius),r=this.u.clone().multiplyScalar(o.x).addScaledVector(this.v,o.y),c=this.origin.clone().add(r),a=this.topLeftCorner.clone().addScaledVector(this.horizontal,e).addScaledVector(this.vertical,n).sub(c);return new t.Ray(c,a)}}class R{constructor(){this.objects=[]}hit(t,e){let n=e.max,o=null;return this.objects.forEach(r=>{const c=r.hit(t,{min:e.min,max:n});c&&(n=c.distance,o=c)}),o}addObject(t){return this.objects.push(t),this}}class j{constructor(t,e,n){this.center=t,this.radius=e,this.material=n}hit(e,n){const o=e.origin.clone().sub(this.center),r=e.direction.dot(e.direction),c=2*o.dot(e.direction),a=c*c-4*r*(o.dot(o)-this.radius*this.radius);if(a>=0){const o=[(-c-Math.sqrt(a))/(2*r),(-c+Math.sqrt(a))/(2*r)];for(const r of o)if(r>n.min&&r<n.max){const n=e.at(r,new t.Vector3),o=n.clone().sub(this.center).divideScalar(this.radius),c=o.dot(e.direction)<0;return{distance:r,point:n,normal:c?o:o.negate(),isFrontFace:c,material:this.material}}}return null}}class q{constructor(t){this.albedo=t}scatter(e,n){const o=n.normal.clone().add(function(){const e=v(0,2*Math.PI),n=v(-1,1),o=Math.sqrt(1-n*n);return new t.Vector3(o*Math.cos(e),o*Math.sin(e),n)}());return{attenuation:this.albedo,scattered:new t.Ray(n.point,o)}}}class E{constructor(t){this.albedo=t}scatter(e,n){const o=e.direction.clone().normalize().reflect(n.normal.clone().normalize());return{attenuation:this.albedo,scattered:new t.Ray(n.point,o)}}}class O{constructor(t,e){this.albedo=t,this.fuzz=e}scatter(e,n){const o=e.direction.clone().normalize().reflect(n.normal.clone().normalize()),r=new t.Ray(n.point,o.add(function(){for(;;){const t=z(-1,1);if(t.length()<1)return t}}().multiplyScalar(this.fuzz)));return{attenuation:this.albedo,scattered:r.direction.dot(n.normal)>0?r:null}}}class I{constructor(t){this.refractiveIndex=t}scatter(e,n){const o=new t.Vector3(1,1,1),r=n.isFrontFace?1/this.refractiveIndex:this.refractiveIndex,c=e.direction.clone().normalize(),a=n.normal.clone().normalize(),i=Math.min(-c.dot(a),1),s=Math.sqrt(1-i*i),l=this.schlick(i,r);if(r*s>1||Math.random()<l){const e=c.clone().reflect(a);return{attenuation:o,scattered:new t.Ray(n.point,e)}}const u=c.clone().add(a.clone().multiplyScalar(i)).multiplyScalar(r),d=a.clone().multiplyScalar(-Math.sqrt(1-u.lengthSq())),h=u.add(d);return{attenuation:o,scattered:new t.Ray(n.point,h)}}schlick(t,e){const n=Math.pow((1-e)/(1+e),2);return n+(1-n)*Math.pow(1-t,5)}}function C(t){let n,o;return{c(){n=i("div"),o=i("canvas"),s(o,"width",A),s(o,"height",F),s(n,"class","container svelte-1nnd0qh")},m(e,r){!function(t,e,n){t.insertBefore(e,n||null)}(e,n,r),function(t,e){t.appendChild(e)}(n,o),t[1](o)},p:e,i:e,o:e,d(e){var o;e&&(o=n).parentNode.removeChild(o),t[1](null)}}}let A=600,F=300;function k(e,n,o){let r;return d(()=>{function e(n,o,r){if(r<=0)return new t.Vector3(0,0,0);const c=o.hit(n,{min:.001,max:Number.MAX_SAFE_INTEGER});if(c){const{scattered:a,attenuation:i}=c.material.scatter(n,c);if(a){return e(a,o,r-1).multiply(i)}return new t.Vector3(0,0,0)}const a=.5*(n.direction.clone().normalize().y+1);return new t.Vector3(.5,.7,1).lerp(new t.Vector3(1,1,1),a)}const n=r.width,o=r.height,c=r.getContext("2d"),a=c.getImageData(0,0,n,o),i=function(){const e=new R,n=new j(new t.Vector3(0,1e3,0),1e3,new q(new t.Vector3(.5,.5,.5)));e.addObject(n).addObject(new j(new t.Vector3(0,-1,0),1,new I(1.5))).addObject(new j(new t.Vector3(-4,-1,0),1,new q(new t.Vector3(.4,.2,.1)))).addObject(new j(new t.Vector3(4,-1,0),1,new E(new t.Vector3(.7,.6,.5))));for(let n=-5;n<5;n+=2)for(let o=-5;o<5;o+=2){const r=Math.random(),c=new t.Vector3(n+.9*Math.random(),-.2,-(o+.9*Math.random()));if(c.clone().sub(new t.Vector3(4,-.2,0)).length()>.9)if(r<.8){const t=z(0,1);e.addObject(new j(c,.2,new q(t)))}else if(r<.95){const t=z(.5,1),n=v(0,.5);e.addObject(new j(c,.2,new O(t,n)))}else e.addObject(new j(c,.2,new I(1.5)))}return e}(),s=new t.Vector3(13,-2,-3),l=new t.Vector3(0,0,0),u=new t.Vector3(0,-1,0),d=Math.PI/9,h=new _(d,n/o,s,l,u,.1,10);for(let r=0;r<n;++r)for(let c=0;c<o;++c){const s=new t.Vector3(0,0,0);for(let t=0;t<5;++t){const t=(r+Math.random())/n,a=(c+Math.random())/o,l=h.getRay(t,a);s.add(e(l,i,5))}s.divideScalar(5);const l=Math.sqrt(s.x),u=Math.sqrt(s.y),d=Math.sqrt(s.z),f=4*(c*n+r);a.data[f]=255*l,a.data[f+1]=255*u,a.data[f+2]=255*d,a.data[f+3]=255}c.putImageData(a,0,0)}),[r,function(t){f[t?"unshift":"push"](()=>{o(0,r=t)})}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}{constructor(t){super(),S(this,t,k,C,a,{})}}({target:document.body})}(THREE);