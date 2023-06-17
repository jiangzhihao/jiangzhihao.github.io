import{S as w,k as C,C as b,l as k,b as S,c as E,m as F,W as M,O as A,n as B}from"./OrbitControls-0435fcb4.js";import{d as L,r as O,o as q,c as G,b as P}from"./index-bf5306e0.js";const j=L({__name:"ShaderTest",setup(R){const o=O();return q(()=>{var v,_,x;const n=new w,i=new B,h=new C(2,2),f=` 
    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position * 0.5, 1.0 );
    }
  `,p=`
    // uniform vec3 u_color;
    // void main() {
    //   gl_FragColor = vec4(u_color, 1.0);
    // }

    // uniform vec2 u_mouse;
    // uniform vec2 u_resolution;

    // void main() {
    //   // vec2除法返回新的vec2
    //   vec2 v = u_mouse/u_resolution;
    //   vec3 color = vec3(v.x, 0.0, v.y);
    //   gl_FragColor = vec4(color, 1.0);
    // }

    // uniform float u_time;

    // void main() {
    //   float r = (sin(u_time) + 1.0) / 2.0;
    //   float b = (cos(u_time) + 1.0) / 2.0;
    //   gl_FragColor = vec4(r, 1.0, b, 1.0);
    // }

    uniform vec2 u_resolution;

    void main() {
      // mix(x, y, 0.0) = x
      // mix(x, y, 1.0) = y
      // mix(a, b, n)
      // n < 0.0 return a 
      // n > 1.0 return b
      // mix(x, y, a)
      // 其中 x 和 y 是待混合的两个值，a 是混合因子。返回值为 x 和 y 按照混合因子 a 进行线性插值的结果
      // result = x * (1.0 - a) + y * a;
      vec2 uv = gl_FragCoord.xy / u_resolution;
      vec4 color = mix(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), uv.y);
      gl_FragColor = color;
    }
    
  `;function c(e){a.u_mouse.value.x=e.touches?e.touches[0].clientX:e.clientX,a.u_mouse.value.y=e.touches?e.touches[0].clientY:e.clientY}const{left:T,top:W,width:s,height:l}=o.value.getBoundingClientRect();"ontouchstart"in window?(v=o.value)==null||v.addEventListener("touchmove",c):(_=o.value)==null||_.addEventListener("mousemove",c);const a={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:s,y:l}},u_color:{value:new b(255)}},g=new k({uniforms:a,vertexShader:f,fragmentShader:p}),u=new S(h,g);u.position.set(0,0,0),n.add(u);const y=new E(300);n.add(y);const t=new F(-1,1,1,-1,.1,10);t.position.set(0,0,1),t.lookAt(0,0,0);const r=new M;r.setSize(s,l),r.render(n,t),(x=o.value)==null||x.appendChild(r.domElement);const m=new A(t,r.domElement);m.target.set(0,0,0),m.update();function d(){a.u_time.value=i.getElapsedTime(),r.render(n,t),window.requestAnimationFrame(d)}d()}),(n,i)=>(P(),G("div",{ref_key:"container",ref:o,style:{height:"500px",width:"800px","background-color":"aqua"}},null,512))}});export{j as default};
