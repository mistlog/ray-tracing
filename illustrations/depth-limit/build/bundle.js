var app=function(t){"use strict";function e(){}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function c(t){return"function"==typeof t}function u(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e){t.appendChild(e)}function a(t){return document.createElement(t)}function s(t){return document.createTextNode(t)}function d(){return s(" ")}function l(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t){return""===t?void 0:+t}function $(t,e){e=""+e,t.data!==e&&(t.data=e)}function g(t,e){(null!=e||t.value)&&(t.value=e)}let h;function x(t){h=t}const m=[],v=[],y=[],b=[],_=Promise.resolve();let w=!1;function z(t){y.push(t)}const E=new Set;function F(){do{for(;m.length;){const t=m.shift();x(t),k(t.$$)}for(;v.length;)v.pop()();for(let t=0;t<y.length;t+=1){const e=y[t];E.has(e)||(E.add(e),e())}y.length=0}while(m.length);for(;b.length;)b.pop()();w=!1,E.clear()}function k(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}const A=new Set;function C(t,e){-1===t.$$.dirty[0]&&(m.push(t),w||(w=!0,_.then(F)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function N(t,u,i,a,s,d,l=[-1]){const f=h;x(t);const p=u.props||{},$=t.$$={fragment:null,ctx:null,props:d,update:e,not_equal:s,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:[]),callbacks:r(),dirty:l};let g=!1;var m,v;$.ctx=i?i(t,p,(e,n,...r)=>{const o=r.length?r[0]:n;return $.ctx&&s($.ctx[e],$.ctx[e]=o)&&($.bound[e]&&$.bound[e](o),g&&C(t,e)),n}):[],$.update(),g=!0,o($.before_update),$.fragment=!!a&&a($.ctx),u.target&&(u.hydrate?$.fragment&&$.fragment.l(function(t){return Array.from(t.childNodes)}(u.target)):$.fragment&&$.fragment.c(),u.intro&&((m=t.$$.fragment)&&m.i&&(A.delete(m),m.i(v))),function(t,e,r){const{fragment:u,on_mount:i,on_destroy:a,after_update:s}=t.$$;u&&u.m(e,r),z(()=>{const e=i.map(n).filter(c);a?a.push(...e):o(e),t.$$.on_mount=[]}),s.forEach(z)}(t,u.target,u.anchor),F()),x(f)}function V(t){let n,r,c,u,p,h,x,m,v,y,b,_,w,z,E,F,k,A,C,N,V,j,L,M,O,S,T,q=`t: ${t[1]}`+"",B=`depth: ${t[2]}`+"",H=`blended: rgb(${t[3](t[0].x,t[2]).toFixed(2)}, ${t[3](t[0].y,t[2]).toFixed(2)}, ${t[3](t[0].z,t[2]).toFixed(2)})`+"";return{c(){n=a("div"),r=a("input"),h=d(),x=a("div"),m=s(q),v=d(),y=a("input"),z=d(),E=a("div"),F=s(B),k=d(),A=a("div"),C=s(H),N=d(),V=a("div"),V.textContent="start: rgb(0.5, 0.7, 1)",j=d(),L=a("div"),L.textContent="end: rgb(1, 1, 1)",M=d(),O=a("div"),f(r,"type","range"),f(r,"min",c=0),f(r,"max",u=1),f(r,"step",p=.01),f(x,"class","svelte-1ufd2zx"),f(y,"type","range"),f(y,"min",b=1),f(y,"max",_=3),f(y,"step",w=1),f(E,"class","svelte-1ufd2zx"),f(A,"class","svelte-1ufd2zx"),f(V,"class","svelte-1ufd2zx"),f(L,"class","svelte-1ufd2zx"),f(O,"style",S=`align-self:center;width:150px;height:150px;background-color:rgb(${255*t[3](t[0].x,t[2])}, ${255*t[3](t[0].y,t[2])}, ${255*t[3](t[0].z,t[2])})`),f(O,"class","svelte-1ufd2zx"),f(n,"class","container svelte-1ufd2zx")},m(e,o){!function(t,e,n){t.insertBefore(e,n||null)}(e,n,o),i(n,r),g(r,t[1]),i(n,h),i(n,x),i(x,m),i(n,v),i(n,y),g(y,t[2]),i(n,z),i(n,E),i(E,F),i(n,k),i(n,A),i(A,C),i(n,N),i(n,V),i(n,j),i(n,L),i(n,M),i(n,O),T=[l(r,"change",t[4]),l(r,"input",t[4]),l(y,"change",t[5]),l(y,"input",t[5])]},p(t,[e]){2&e&&g(r,t[1]),2&e&&q!==(q=`t: ${t[1]}`+"")&&$(m,q),4&e&&g(y,t[2]),4&e&&B!==(B=`depth: ${t[2]}`+"")&&$(F,B),5&e&&H!==(H=`blended: rgb(${t[3](t[0].x,t[2]).toFixed(2)}, ${t[3](t[0].y,t[2]).toFixed(2)}, ${t[3](t[0].z,t[2]).toFixed(2)})`+"")&&$(C,H),5&e&&S!==(S=`align-self:center;width:150px;height:150px;background-color:rgb(${255*t[3](t[0].x,t[2])}, ${255*t[3](t[0].y,t[2])}, ${255*t[3](t[0].z,t[2])})`)&&f(O,"style",S)},i:e,o:e,d(t){var e;t&&(e=n).parentNode.removeChild(e),o(T)}}}function j(e,n,r){let o=new t.Vector3(.5,.7,1),c=0,u=1;return e.$$.update=()=>{2&e.$$.dirty&&r(0,o=new t.Vector3(.5,.7,1).lerp(new t.Vector3(1,1,1),c))},[o,c,u,(t,e)=>t*Math.pow(.5,e),function(){c=p(this.value),r(1,c)},function(){u=p(this.value),r(2,u)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}{constructor(t){super(),N(this,t,j,V,u,{})}}({target:document.body})}(THREE);