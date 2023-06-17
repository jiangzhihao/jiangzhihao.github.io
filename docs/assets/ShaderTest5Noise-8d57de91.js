import{S as y,k as C,C as S,l as b,b as k,c as M,m as E,W as F,O as A,n as B}from"./OrbitControls-0435fcb4.js";import{d as L,r as O,o as q,c as G,b as H}from"./index-bf5306e0.js";const Y=L({__name:"ShaderTest5Noise",setup(P){const o=O();return q(()=>{var d,f,p;const t=new y,r=new B,h=new C(2,2),_=` 
    varying vec3 v_position;
    varying vec2 v_uv;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
      v_position = position;
      v_uv = uv;
    }
  `,g=`
    varying vec3 v_position;
    uniform float u_time;
    varying vec2 v_uv;
  
    float random (vec2 st) {
      const float a = 12.9898;
      const float b = 78.233;
      const float c = 43758.543123;
      return fract(sin(dot(st.xy, vec2(a, b))) * c );
    }
  
    // void main(){    
    //   vec3 color = random(v_uv, u_time)*vec3(1.0);
	  //   gl_FragColor  = vec4(color, 1.0);
    // }

    float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    // Smooth Interpolation
    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);
    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
void main() {
    vec2 st = v_uv;
    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(st*1.0);
    // Use the noise function
    float n = noise(pos);
    n = smoothstep(0.4, 0.6, n);
    gl_FragColor = vec4(vec3(n), 1.0);
}
    
  `;function i(e){s.u_mouse.value.x=e.touches?e.touches[0].clientX:e.clientX,s.u_mouse.value.y=e.touches?e.touches[0].clientY:e.clientY}const{left:R,top:T,width:c,height:l}=o.value.getBoundingClientRect();"ontouchstart"in window?(d=o.value)==null||d.addEventListener("touchmove",i):(f=o.value)==null||f.addEventListener("mousemove",i);const s={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:c,y:l}},u_color:{value:new S(255)}},x=new b({uniforms:s,vertexShader:_,fragmentShader:g}),u=new k(h,x);u.position.set(0,0,0),t.add(u);const w=new M(300);t.add(w);const n=new E(-1,1,1,-1,.1,10);n.position.set(0,0,1),n.lookAt(0,0,0);const a=new F;a.setSize(c,l),a.render(t,n),(p=o.value)==null||p.appendChild(a.domElement);const v=new A(n,a.domElement);v.target.set(0,0,0),v.update();function m(){s.u_time.value=r.getElapsedTime(),a.render(t,n),window.requestAnimationFrame(m)}m()}),(t,r)=>(H(),G("div",{ref_key:"container",ref:o,style:{height:"500px",width:"500px","background-color":"aqua"}},null,512))}});export{Y as default};
