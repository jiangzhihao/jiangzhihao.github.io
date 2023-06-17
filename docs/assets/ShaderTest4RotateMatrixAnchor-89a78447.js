import{S,k as w,C as z,l as C,b as M,c as k,m as R,W as E,O as b,n as A}from"./OrbitControls-0435fcb4.js";import{d as B,r as L,o as O,c as q,b as F}from"./index-bf5306e0.js";const Y=B({__name:"ShaderTest4RotateMatrixAnchor",setup(G){const t=L();return O(()=>{var p,h,d;const o=new S,i=new A,f=new w(2,2),_=` 
    varying vec3 v_position;
    varying vec2 v_uv;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      v_position = position;
      v_uv = uv;
    }
  `,x=`
    varying vec3 v_position;
    uniform float u_time;
    varying vec2 v_uv;
  
    float rect(vec2 position, vec2 anchor, vec2 size, vec2 center) {
      vec2 p = position - center;
      vec2 halfSize = size * 0.5;
      // float h = step(-halfSize.x, p.x) - step(halfSize.x, p.x);
      // float v = step(-halfSize.y, p.y) - step(halfSize.y, p.y);
      float h = step(-halfSize.x - anchor.x, p.x) - step(halfSize.x - anchor.x, p.x);
      float v = step(-halfSize.y - anchor.y, p.y) - step(halfSize.y - anchor.y, p.y);
      return h * v;
    }

    mat2 getScaleMatrix(float scale) {
      return mat2(scale, 0, 0, scale);
    }

    mat2 getRotationMatrix(float time) {
      float s = sin(time);
      float c = cos(time);
        // c -s
        // s c
      return mat2(c, -s, s, c);
    }
  
    void main() {
      float tileCount = 6.0;
      vec2 p = fract( v_uv*tileCount);

      vec2 center = vec2(0.0);
      vec2 anchor = vec2(0.1);
      mat2 matr = getRotationMatrix(u_time);
      mat2 mats = getScaleMatrix((sin(u_time) + 1.0)/3.0 + 0.5 );
      float inRect = rect(mats * matr * (v_position.xy - center) + center, anchor, vec2(0.3), center);
      vec3 color = vec3(1.0, 1.0, 0.0) * inRect;
      gl_FragColor = vec4(color, 1.0);
    }
    
  `;function r(e){c.u_mouse.value.x=e.touches?e.touches[0].clientX:e.clientX,c.u_mouse.value.y=e.touches?e.touches[0].clientY:e.clientY}const{left:P,top:T,width:s,height:l}=t.value.getBoundingClientRect();"ontouchstart"in window?(p=t.value)==null||p.addEventListener("touchmove",r):(h=t.value)==null||h.addEventListener("mousemove",r);const c={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:s,y:l}},u_color:{value:new z(255)}},y=new C({uniforms:c,vertexShader:_,fragmentShader:x}),u=new M(f,y);u.position.set(0,0,0),o.add(u);const g=new k(300);o.add(g);const a=new R(-1,1,1,-1,.1,10);a.position.set(0,0,1),a.lookAt(0,0,0);const n=new E;n.setSize(s,l),n.render(o,a),(d=t.value)==null||d.appendChild(n.domElement);const v=new b(a,n.domElement);v.target.set(0,0,0),v.update();function m(){c.u_time.value=i.getElapsedTime(),n.render(o,a),window.requestAnimationFrame(m)}m()}),(o,i)=>(F(),q("div",{ref_key:"container",ref:t,style:{height:"500px",width:"500px","background-color":"aqua"}},null,512))}});export{Y as default};
