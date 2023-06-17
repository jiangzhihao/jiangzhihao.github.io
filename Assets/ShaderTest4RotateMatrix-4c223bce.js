import{S as y,k as S,C,l as M,b as k,c as z,m as R,W as E,O as b,n as A}from"./OrbitControls-0435fcb4.js";import{d as B,r as L,o as O,c as q,b as F}from"./index-bf5306e0.js";const Y=B({__name:"ShaderTest4RotateMatrix",setup(G){const t=L();return O(()=>{var v,d,h;const o=new y,r=new A,f=new S(2,2),_=` 
    varying vec3 v_position;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      v_position = position;
    }
  `,x=`
    varying vec3 v_position;
    uniform float u_time;
  
    float rect(vec2 position, vec2 size, vec2 center) {
      vec2 p = position - center;
      vec2 halfSize = size * 0.5;
      
      float h = step(-halfSize.x, p.x) - step(halfSize.x, p.x);
      float v = step(-halfSize.y, p.y) - step(halfSize.y, p.y);
      return h * v;
    }

    mat2 getRotationMatrix(float time) {
      float s = sin(time);
      float c = cos(time);
        // c -s
        // s c
      return mat2(c, -s, s, c);
    }
  
    void main() {
      mat2 matr = getRotationMatrix(u_time);
      vec2 center = vec2(0.5);
      float inRect = rect(matr * (v_position.xy - center) + center, vec2(1.0), center);
      vec3 color = vec3(1.0, 1.0, 0.0) * inRect;
      gl_FragColor = vec4(color, 1.0);
    }
    
  `;function s(e){i.u_mouse.value.x=e.touches?e.touches[0].clientX:e.clientX,i.u_mouse.value.y=e.touches?e.touches[0].clientY:e.clientY}const{left:P,top:T,width:c,height:l}=t.value.getBoundingClientRect();"ontouchstart"in window?(v=t.value)==null||v.addEventListener("touchmove",s):(d=t.value)==null||d.addEventListener("mousemove",s);const i={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:c,y:l}},u_color:{value:new C(255)}},g=new M({uniforms:i,vertexShader:_,fragmentShader:x}),u=new k(f,g);u.position.set(0,0,0),o.add(u);const w=new z(300);o.add(w);const n=new R(-1,1,1,-1,.1,10);n.position.set(0,0,1),n.lookAt(0,0,0);const a=new E;a.setSize(c,l),a.render(o,n),(h=t.value)==null||h.appendChild(a.domElement);const m=new b(n,a.domElement);m.target.set(0,0,0),m.update();function p(){i.u_time.value=r.getElapsedTime(),a.render(o,n),window.requestAnimationFrame(p)}p()}),(o,r)=>(F(),q("div",{ref_key:"container",ref:t,style:{height:"500px",width:"500px","background-color":"aqua"}},null,512))}});export{Y as default};
