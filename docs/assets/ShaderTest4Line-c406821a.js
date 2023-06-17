import{S as y,k as C,C as k,l as L,b as S,c as W,m as E,W as M,O as P,n as b}from"./OrbitControls-0435fcb4.js";import{d as I,r as A,o as B,c as O,b as q}from"./index-bf5306e0.js";const Y=I({__name:"ShaderTest4Line",setup(F){const t=A();return B(()=>{var m,p,v;const n=new y,l=new b,_=new C(2,2),g=` 
    varying vec3 v_position;
    varying vec2 v_uv;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      v_position = position;
      v_uv = uv;
    }
  `,f=`
    #define PI2 6.28318530718
    varying vec3 v_position;
    uniform float u_time;
    varying vec2 v_uv;
  

    // return smoothstep(x-line_width/2.0-edge_width, x-line_width/2.0, y) - smoothstep(x+line_width/2.0, x+line_width/2.0+edge_width, y);
    float line(float x, float y, float lineWidth) {
      float halfLineWidth = lineWidth / 2.0;
      return smoothstep(x - halfLineWidth, x,  y) - smoothstep(x, x+ halfLineWidth , y);
    }

    float sweep(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness){
      vec2 d = pt - center;
      float theta = fract(u_time/4.0) * PI2;
      vec2 p = vec2(cos(theta), sin(theta))*radius;
      float h = clamp( dot(d,p)/dot(p,p), 0.0, 1.0 );
      //float h = dot(d,p)/dot(p,p);
      float l = length(d - p*h);
  
  
  
    float gradient = 0.0;
    const float gradient_angle = 3.0;
    if (length(d)<radius){
      float angle = mod( theta - atan(d.y, d.x), PI2);
      // gradient = clamp(gradient_angle - angle, 0.0, gradient_angle) * 0.5;
      gradient = (gradient_angle - angle) * 0.5;
      // gradient =  mix(0.0, 1.0, (gradient_angle - angle) / gradient_angle);
    }
    return gradient + 1.0 - smoothstep(line_width, line_width+edge_thickness, l);
}
  
    void main() {
      // float inCircle =  line(v_position.y, mix(0.2, 0.8, sin(v_position.x*PI2)), 0.005);
      float inCircle = line(v_position.y,  mix(-0.2, 0.2, sin(v_position.x * 10.0) + 0.5), 0.1);
      vec3 color = vec3(1.0, 0.0, 0.0) * inCircle;
      color += sweep(v_position.xy, vec2(0.5), 0.3, 0.003, 0.001) * vec3(0.1, 0.3, 1.0);
      gl_FragColor = vec4(color, 1.0);
    }
    
  `;function s(e){a.u_mouse.value.x=e.touches?e.touches[0].clientX:e.clientX,a.u_mouse.value.y=e.touches?e.touches[0].clientY:e.clientY}const{left:G,top:R,width:r,height:c}=t.value.getBoundingClientRect();"ontouchstart"in window?(m=t.value)==null||m.addEventListener("touchmove",s):(p=t.value)==null||p.addEventListener("mousemove",s);const a={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:r,y:c}},u_color:{value:new k(255)}},w=new L({uniforms:a,vertexShader:g,fragmentShader:f}),d=new S(_,w);d.position.set(0,0,0),n.add(d);const x=new W(300);n.add(x);const o=new E(-1,1,1,-1,.1,10);o.position.set(0,0,1),o.lookAt(0,0,0);const i=new M;i.setSize(r,c),i.render(n,o),(v=t.value)==null||v.appendChild(i.domElement);const h=new P(o,i.domElement);h.target.set(0,0,0),h.update();function u(){a.u_time.value=l.getElapsedTime(),i.render(n,o),window.requestAnimationFrame(u)}u()}),(n,l)=>(q(),O("div",{ref_key:"container",ref:t,style:{height:"500px",width:"500px","background-color":"aqua"}},null,512))}});export{Y as default};
