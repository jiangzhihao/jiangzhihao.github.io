import{S as y,k as C,C as b,l as M,b as S,c as k,m as E,W as F,o as A,O as B,n as L}from"./OrbitControls-0435fcb4.js";import{d as O,r as P,o as q,c as G,b as R}from"./index-bf5306e0.js";const z=O({__name:"ShaderTest2",setup(T){const t=P();return q(()=>{var d,m,_;const n=new y,r=new L,h=new C(2,2),g=` 
  varying vec2 v_uv;
  varying vec3 v_position;
    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position * 0.5, 1.0 );
      v_uv = uv;
      v_position = position;
    }
  `,x=`
    varying vec2 v_uv;

    varying vec3 v_position;

    uniform vec2 u_resolution;
 
    void main() {
     
      // gl_FragColor = vec4(v_uv.x, v_uv.y, 0.0, 1.0);

      vec3 color = vec3(0.0);
      // clamp(x, a, b) = min(max(x, a), b)
      // 其中，x 是输入值，a 和 b 分别是范围的上限和下限。如果 x 在范围内，则输出值等于 x，否则输出值等于 a 或 b
      // color.r = clamp(v_position.x, 0.0, 1.0);
      // color.g = clamp(v_position.y, 0.0, 1.0);

      // step(edge, n)是一个内置函数，
      // 它接收两个参数，第一个参数为阈值，第二个参数为要进行判断的值。step()函数的返回值为0或1，表示输入值是否大于或等于阈值。
      // 在顶点着色器中，可以使用step()函数根据阈值对顶点进行剪裁，以生成类似于裁剪平面的效果。
      // 在片元着色器中，可以使用step()函数将纹理坐标限制在一定的范围内，以避免出现采样越界的情况。
      // color.r = step(0.0, v_position.x); // x大于等于0 返回1，
      // color.g = step(0.0, v_position.y);

      // smoothstep(edge0, edge1, n)
      // 在 n 值在 [edge0, edge1] 范围内时，smoothstep() 的返回值将在 [0, 1] 范围内进行平滑插值。
      // 当 n 值小于 edge0 时，返回值为 0，当 n 值大于 edge1 时，返回值为 1。
      // smoothstep函数通常用于在着色器中进行平滑的渐变，
      // 它可以将一个边界范围内的值映射到0到1之间，并在边界处实现平滑的渐变，避免出现突变或不连续的情况。
      // 它的作用可以用来实现很多效果，如过渡动画、渐变颜色等。
      color.r = smoothstep(0.0, 0.1, v_position.x); // x大于等于0 返回1，
      color.g = smoothstep(0.0, 0.1, v_position.y);
      gl_FragColor = vec4(color, 1.0);
    }
    
  `;function i(o){a.u_mouse.value.x=o.touches?o.touches[0].clientX:o.clientX,a.u_mouse.value.y=o.touches?o.touches[0].clientY:o.clientY}const{left:W,top:X,width:c,height:l}=t.value.getBoundingClientRect();"ontouchstart"in window?(d=t.value)==null||d.addEventListener("touchmove",i):(m=t.value)==null||m.addEventListener("mousemove",i);const a={u_time:{value:0},u_mouse:{value:{x:0,y:0}},u_resolution:{value:{x:c,y:l}},u_color:{value:new b(255)}},w=new M({uniforms:a,vertexShader:g,fragmentShader:x}),u=new S(h,w);u.position.set(0,0,0),n.add(u);const f=new k(300);n.add(f);const s=new E(-1,1,1,-1,.1,10);s.position.set(0,0,1),s.lookAt(0,0,0);const e=new F;e.setSize(c,l),e.shadowMap.enabled=!0,e.shadowMap.type=A,e.render(n,s),console.log(111,e.info.render.calls),(_=t.value)==null||_.appendChild(e.domElement);const p=new B(s,e.domElement);p.target.set(0,0,0),p.update();function v(){a.u_time.value=r.getElapsedTime(),e.render(n,s),window.requestAnimationFrame(v)}v()}),(n,r)=>(R(),G("div",{ref_key:"container",ref:t,style:{height:"500px",width:"800px","background-color":"aqua"}},null,512))}});export{z as default};
