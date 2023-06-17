import{S as y,k as C,C as S,l as k,b as z,c as E,m as M,W as R,O as b,n as F}from"./OrbitControls-0435fcb4.js";import{d as A,r as B,o as L,c as O,b as q}from"./index-bf5306e0.js";const Y=A({__name:"ShaderTest3",setup(G){const o=B();return L(()=>{var m,p,h;const t=new y,c=new F,_=new C(2,2),f=` 
    varying vec3 v_position;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      v_position = position;
    }
  `,g=`
    varying vec3 v_position;

    // void main() {
    //   float inCircle = 1.0 - step(0.5, length(v_position.xy));
    //   vec3 color = vec3(1.0, 1.0, 0.0) * inCircle;
    //   gl_FragColor = vec4(color, 1.0);
    // }

    float rect(vec2 position, vec2 size, vec2 center) {
      vec2 p = position - center;
      vec2 halfSize = size * 0.5;
      
      float h = step(-halfSize.x, p.x) - step(halfSize.x, p.x);
      float v = step(-halfSize.y, p.y) - step(halfSize.y, p.y);
      return h * v;
    }

    // void main() {
    //   float inRect = rect(v_position.xy, vec2(1.0, 0.5), vec2(0.0));
    //   vec3 color = vec3(1.0, 1.0, 0.0) * inRect;
    //   gl_FragColor = vec4(color, 1.0);
    // }

    uniform float u_time;
  
    void main() {
      float radius = 0.5;
      float inRect = rect(v_position.xy, vec2(1.0), vec2(cos(u_time) * radius, sin(u_time) * radius));
      vec3 color = vec3(1.0, 1.0, 0.0) * inRect;
      gl_FragColor = vec4(color, 1.0);
    }
    
  `;function r(e){a.u_mouse.value.x=e.touches?e.touches[0].clientX:e.clientX,a.u_mouse.value.y=e.touches?e.touches[0].clientY:e.clientY}const{left:P,top:T,width:s,height:l}=o.value.getBoundingClientRect();"ontouchstart"in window?(m=o.value)==null||m.addEventListener("touchmove",r):(p=o.value)==null||p.addEventListener("mousemove",r);const a={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:s,y:l}},u_color:{value:new S(255)}},x=new k({uniforms:a,vertexShader:f,fragmentShader:g}),u=new z(_,x);u.position.set(0,0,0),t.add(u);const w=new E(300);t.add(w);const n=new M(-1,1,1,-1,.1,10);n.position.set(0,0,1),n.lookAt(0,0,0);const i=new R;i.setSize(s,l),i.render(t,n),(h=o.value)==null||h.appendChild(i.domElement);const v=new b(n,i.domElement);v.target.set(0,0,0),v.update();function d(){a.u_time.value=c.getElapsedTime(),i.render(t,n),window.requestAnimationFrame(d)}d()}),(t,c)=>(q(),O("div",{ref_key:"container",ref:o,style:{height:"500px",width:"500px","background-color":"aqua"}},null,512))}});export{Y as default};
