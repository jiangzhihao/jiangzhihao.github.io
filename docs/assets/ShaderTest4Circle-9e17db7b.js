import{S as y,k as C,C as k,l as b,b as S,c as W,m as E,W as M,O as A,n as B}from"./OrbitControls-0435fcb4.js";import{d as L,r as O,o as q,c as F,b as G}from"./index-bf5306e0.js";const j=L({__name:"ShaderTest4Circle",setup(P){const t=O();return q(()=>{var p,h,m;const o=new y,a=new B,f=new C(2,2),g=` 
    varying vec3 v_position;
    varying vec2 v_uv;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      v_position = position;
      v_uv = uv;
    }
  `,_=`
    varying vec3 v_position;
    uniform float u_time;
    varying vec2 v_uv;
  
    float circle(vec2 pt, vec2 center, float radius) {
      vec2 p = pt - center;
      return 1.0 - step(radius, length(p));
    }

    float circle(vec2 pt, vec2 center, float radius, bool soften) {
      vec2 p = pt - center;
      float edge = soften ? 0.05 : 0.0;
      return 1.0 - smoothstep(radius - edge, radius + edge,length(p));
    }


    float circle(vec2 pt, vec2 center, float radius, float lineWidth) {
      vec2 p = pt - center;
      float length = length(p);
      return step(radius, length) - step(radius + lineWidth, length);
    }

    float circle(vec2 pt, vec2 center, float radius, float lineWidth, bool soften) {
      vec2 p = pt - center;
      float length = length(p);
      float edge = soften ? 0.05 : 0.0;
      return smoothstep(radius - edge, radius + edge,  length) - smoothstep(radius - edge + lineWidth, radius + edge + lineWidth , length);
    }
  
    void main() {
      float inCircle = circle(v_position.xy, vec2(0.0, 0.5), 0.5, 0.1, true);
      vec3 color = vec3(1.0, 0.0, 0.0) * inCircle;
      gl_FragColor = vec4(color, 1.0);
    }
    
  `;function s(e){i.u_mouse.value.x=e.touches?e.touches[0].clientX:e.clientX,i.u_mouse.value.y=e.touches?e.touches[0].clientY:e.clientY}const{left:R,top:T,width:c,height:l}=t.value.getBoundingClientRect();"ontouchstart"in window?(p=t.value)==null||p.addEventListener("touchmove",s):(h=t.value)==null||h.addEventListener("mousemove",s);const i={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:c,y:l}},u_color:{value:new k(255)}},w=new b({uniforms:i,vertexShader:g,fragmentShader:_}),u=new S(f,w);u.position.set(0,0,0),o.add(u);const x=new W(300);o.add(x);const n=new E(-1,1,1,-1,.1,10);n.position.set(0,0,1),n.lookAt(0,0,0);const r=new M;r.setSize(c,l),r.render(o,n),(m=t.value)==null||m.appendChild(r.domElement);const d=new A(n,r.domElement);d.target.set(0,0,0),d.update();function v(){i.u_time.value=a.getElapsedTime(),r.render(o,n),window.requestAnimationFrame(v)}v()}),(o,a)=>(G(),F("div",{ref_key:"container",ref:t,style:{height:"500px",width:"500px","background-color":"aqua"}},null,512))}});export{j as default};
