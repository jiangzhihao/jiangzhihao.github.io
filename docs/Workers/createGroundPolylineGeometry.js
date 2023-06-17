define(["./Transforms-fce95115","./Matrix2-413c4048","./Matrix3-81054f0f","./defaultValue-f6d5e6da","./Math-2ce22ee9","./ArcType-26a3f38d","./arrayRemoveDuplicates-9b636830","./ComponentDatatype-ab629b88","./EllipsoidGeodesic-2723ab86","./EllipsoidRhumbLine-77eff028","./EncodedCartesian3-5e2017ab","./GeometryAttribute-81ff775c","./IntersectionTests-357c3d7f","./Plane-6add0ae1","./WebMercatorProjection-943e2226","./combine-0c102d93","./RuntimeError-9b4ce3fb","./WebGLConstants-7f557f93"],(function(e,t,a,n,i,r,s,o,l,c,u,C,p,h,d,g,f,m){"use strict";function w(i){i=n.defaultValue(i,n.defaultValue.EMPTY_OBJECT),this._ellipsoid=n.defaultValue(i.ellipsoid,a.Ellipsoid.WGS84),this._rectangle=n.defaultValue(i.rectangle,t.Rectangle.MAX_VALUE),this._projection=new e.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=n.defaultValue(i.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=n.defaultValue(i.numberOfLevelZeroTilesY,1)}Object.defineProperties(w.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),w.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},w.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},w.prototype.rectangleToNativeRectangle=function(e,a){const r=i.CesiumMath.toDegrees(e.west),s=i.CesiumMath.toDegrees(e.south),o=i.CesiumMath.toDegrees(e.east),l=i.CesiumMath.toDegrees(e.north);return n.defined(a)?(a.west=r,a.south=s,a.east=o,a.north=l,a):new t.Rectangle(r,s,o,l)},w.prototype.tileXYToNativeRectangle=function(e,t,a,n){const r=this.tileXYToRectangle(e,t,a,n);return r.west=i.CesiumMath.toDegrees(r.west),r.south=i.CesiumMath.toDegrees(r.south),r.east=i.CesiumMath.toDegrees(r.east),r.north=i.CesiumMath.toDegrees(r.north),r},w.prototype.tileXYToRectangle=function(e,a,i,r){const s=this._rectangle,o=this.getNumberOfXTilesAtLevel(i),l=this.getNumberOfYTilesAtLevel(i),c=s.width/o,u=e*c+s.west,C=(e+1)*c+s.west,p=s.height/l,h=s.north-a*p,d=s.north-(a+1)*p;return n.defined(r)||(r=new t.Rectangle(u,d,C,h)),r.west=u,r.south=d,r.east=C,r.north=h,r},w.prototype.positionToTileXY=function(e,a,r){const s=this._rectangle;if(!t.Rectangle.contains(s,e))return;const o=this.getNumberOfXTilesAtLevel(a),l=this.getNumberOfYTilesAtLevel(a),c=s.width/o,u=s.height/l;let C=e.longitude;s.east<s.west&&(C+=i.CesiumMath.TWO_PI);let p=(C-s.west)/c|0;p>=o&&(p=o-1);let h=(s.north-e.latitude)/u|0;return h>=l&&(h=l-1),n.defined(r)?(r.x=p,r.y=h,r):new t.Cartesian2(p,h)};const y=new a.Cartesian3,M=new a.Cartesian3,T=new a.Cartographic,E=new a.Cartesian3,_=new a.Cartesian3,O=new e.BoundingSphere,P=new w,A=[new a.Cartographic,new a.Cartographic,new a.Cartographic,new a.Cartographic],b=new t.Cartesian2,k={};function L(e){a.Cartographic.fromRadians(e.east,e.north,0,A[0]),a.Cartographic.fromRadians(e.west,e.north,0,A[1]),a.Cartographic.fromRadians(e.east,e.south,0,A[2]),a.Cartographic.fromRadians(e.west,e.south,0,A[3]);let t=0,n=0,i=0,r=0;const s=k._terrainHeightsMaxLevel;let o;for(o=0;o<=s;++o){let e=!1;for(let t=0;t<4;++t){const a=A[t];if(P.positionToTileXY(a,o,b),0===t)i=b.x,r=b.y;else if(i!==b.x||r!==b.y){e=!0;break}}if(e)break;t=i,n=r}if(0!==o)return{x:t,y:n,level:o>s?s:o-1}}k.initialize=function(){let t=k._initPromise;return n.defined(t)||(t=e.Resource.fetchJson(e.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){k._terrainHeights=e})),k._initPromise=t),t},k.getMinimumMaximumHeights=function(e,i){i=n.defaultValue(i,a.Ellipsoid.WGS84);const r=L(e);let s=k._defaultMinTerrainHeight,o=k._defaultMaxTerrainHeight;if(n.defined(r)){const l=`${r.level}-${r.x}-${r.y}`,c=k._terrainHeights[l];n.defined(c)&&(s=c[0],o=c[1]),i.cartographicToCartesian(t.Rectangle.northeast(e,T),y),i.cartographicToCartesian(t.Rectangle.southwest(e,T),M),a.Cartesian3.midpoint(M,y,E);const u=i.scaleToGeodeticSurface(E,_);if(n.defined(u)){const e=a.Cartesian3.distance(E,u);s=Math.min(s,-e)}else s=k._defaultMinTerrainHeight}return s=Math.max(k._defaultMinTerrainHeight,s),{minimumTerrainHeight:s,maximumTerrainHeight:o}},k.getBoundingSphere=function(t,i){i=n.defaultValue(i,a.Ellipsoid.WGS84);const r=L(t);let s=k._defaultMaxTerrainHeight;if(n.defined(r)){const e=`${r.level}-${r.x}-${r.y}`,t=k._terrainHeights[e];n.defined(t)&&(s=t[1])}const o=e.BoundingSphere.fromRectangle3D(t,i,0);return e.BoundingSphere.fromRectangle3D(t,i,s,O),e.BoundingSphere.union(o,O,o)},k._terrainHeightsMaxLevel=6,k._defaultMaxTerrainHeight=9e3,k._defaultMinTerrainHeight=-1e5,k._terrainHeights=void 0,k._initPromise=void 0,Object.defineProperties(k,{initialized:{get:function(){return n.defined(k._terrainHeights)}}});var S=k;const x=[e.GeographicProjection,d.WebMercatorProjection],I=x.length,N=Math.cos(i.CesiumMath.toRadians(30)),R=Math.cos(i.CesiumMath.toRadians(150)),D=0,v=1e3;function z(e){const t=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).positions;this.width=n.defaultValue(e.width,1),this._positions=t,this.granularity=n.defaultValue(e.granularity,9999),this.loop=n.defaultValue(e.loop,!1),this.arcType=n.defaultValue(e.arcType,r.ArcType.GEODESIC),this._ellipsoid=a.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(z.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+a.Ellipsoid.packedLength+1+1}}}),z.setProjectionAndEllipsoid=function(e,t){let a=0;for(let e=0;e<I;e++)if(t instanceof x[e]){a=e;break}e._projectionIndex=a,e._ellipsoid=t.ellipsoid};const H=new a.Cartesian3,j=new a.Cartesian3,B=new a.Cartesian3;function V(e,t,n,i,r){const s=U(i,e,0,H),o=U(i,e,n,j),l=U(i,t,0,B),c=Z(o,s,j),u=Z(l,s,B);return a.Cartesian3.cross(u,c,r),a.Cartesian3.normalize(r,r)}const G=new a.Cartographic,Y=new a.Cartesian3,F=new a.Cartesian3,q=new a.Cartesian3;function X(e,t,n,i,s,o,u,C,p,h,d){if(0===s)return;let g;o===r.ArcType.GEODESIC?g=new l.EllipsoidGeodesic(e,t,u):o===r.ArcType.RHUMB&&(g=new c.EllipsoidRhumbLine(e,t,u));const f=g.surfaceDistance;if(f<s)return;const m=V(e,t,i,u,q),w=Math.ceil(f/s),y=f/w;let M=y;const T=w-1;let E=C.length;for(let e=0;e<T;e++){const e=g.interpolateUsingSurfaceDistance(M,G),t=U(u,e,n,Y),r=U(u,e,i,F);a.Cartesian3.pack(m,C,E),a.Cartesian3.pack(t,p,E),a.Cartesian3.pack(r,h,E),d.push(e.latitude),d.push(e.longitude),E+=3,M+=y}}const W=new a.Cartographic;function U(e,t,n,i){return a.Cartographic.clone(t,W),W.height=n,a.Cartographic.toCartesian(W,e,i)}function Z(e,t,n){return a.Cartesian3.subtract(e,t,n),a.Cartesian3.normalize(n,n),n}function $(e,t,n,i){return i=Z(e,t,i),i=a.Cartesian3.cross(i,n,i),i=a.Cartesian3.normalize(i,i),i=a.Cartesian3.cross(n,i,i)}z.pack=function(e,t,i){let r=n.defaultValue(i,0);const s=e._positions,o=s.length;t[r++]=o;for(let e=0;e<o;++e){const n=s[e];a.Cartesian3.pack(n,t,r),r+=3}return t[r++]=e.granularity,t[r++]=e.loop?1:0,t[r++]=e.arcType,a.Ellipsoid.pack(e._ellipsoid,t,r),r+=a.Ellipsoid.packedLength,t[r++]=e._projectionIndex,t[r++]=e._scene3DOnly?1:0,t},z.unpack=function(e,t,i){let r=n.defaultValue(t,0);const s=e[r++],o=new Array(s);for(let t=0;t<s;t++)o[t]=a.Cartesian3.unpack(e,r),r+=3;const l=e[r++],c=1===e[r++],u=e[r++],C=a.Ellipsoid.unpack(e,r);r+=a.Ellipsoid.packedLength;const p=e[r++],h=1===e[r++];return n.defined(i)||(i=new z({positions:o})),i._positions=o,i.granularity=l,i.loop=c,i.arcType=u,i._ellipsoid=C,i._projectionIndex=p,i._scene3DOnly=h,i};const J=new a.Cartesian3,Q=new a.Cartesian3,K=new a.Cartesian3,ee=new a.Cartesian3,te=0,ae=-1;function ne(e,t,n,r,s){const o=Z(n,t,ee),l=$(e,t,o,J),c=$(r,t,o,Q);if(i.CesiumMath.equalsEpsilon(a.Cartesian3.dot(l,c),ae,i.CesiumMath.EPSILON5))return s=a.Cartesian3.cross(o,l,s),s=a.Cartesian3.normalize(s,s);s=a.Cartesian3.add(c,l,s),s=a.Cartesian3.normalize(s,s);const u=a.Cartesian3.cross(o,s,K);return a.Cartesian3.dot(c,u)<te&&(s=a.Cartesian3.negate(s,s)),s}const ie=h.Plane.fromPointNormal(a.Cartesian3.ZERO,a.Cartesian3.UNIT_Y),re=new a.Cartesian3,se=new a.Cartesian3,oe=new a.Cartesian3,le=new a.Cartesian3,ce=new a.Cartesian3,ue=new a.Cartesian3,Ce=new a.Cartographic,pe=new a.Cartographic,he=new a.Cartographic;z.createGeometry=function(l){const h=!l._scene3DOnly;let d=l.loop;const g=l._ellipsoid,f=l.granularity,m=l.arcType,w=new x[l._projectionIndex](g),y=D,M=v;let T,E;const _=l._positions,O=_.length;let P,A,b,k;2===O&&(d=!1);const L=new c.EllipsoidRhumbLine(void 0,void 0,g);let I,R,z;const H=[_[0]];for(E=0;E<O-1;E++)P=_[E],A=_[E+1],I=p.IntersectionTests.lineSegmentPlane(P,A,ie,ue),!n.defined(I)||a.Cartesian3.equalsEpsilon(I,P,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(I,A,i.CesiumMath.EPSILON7)||(l.arcType===r.ArcType.GEODESIC?H.push(a.Cartesian3.clone(I)):l.arcType===r.ArcType.RHUMB&&(z=g.cartesianToCartographic(I,Ce).longitude,b=g.cartesianToCartographic(P,Ce),k=g.cartesianToCartographic(A,pe),L.setEndPoints(b,k),R=L.findIntersectionWithLongitude(z,he),I=g.cartographicToCartesian(R,ue),!n.defined(I)||a.Cartesian3.equalsEpsilon(I,P,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(I,A,i.CesiumMath.EPSILON7)||H.push(a.Cartesian3.clone(I)))),H.push(A);d&&(P=_[O-1],A=_[0],I=p.IntersectionTests.lineSegmentPlane(P,A,ie,ue),!n.defined(I)||a.Cartesian3.equalsEpsilon(I,P,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(I,A,i.CesiumMath.EPSILON7)||(l.arcType===r.ArcType.GEODESIC?H.push(a.Cartesian3.clone(I)):l.arcType===r.ArcType.RHUMB&&(z=g.cartesianToCartographic(I,Ce).longitude,b=g.cartesianToCartographic(P,Ce),k=g.cartesianToCartographic(A,pe),L.setEndPoints(b,k),R=L.findIntersectionWithLongitude(z,he),I=g.cartographicToCartesian(R,ue),!n.defined(I)||a.Cartesian3.equalsEpsilon(I,P,i.CesiumMath.EPSILON7)||a.Cartesian3.equalsEpsilon(I,A,i.CesiumMath.EPSILON7)||H.push(a.Cartesian3.clone(I)))));let j=H.length,B=new Array(j);for(E=0;E<j;E++){const e=a.Cartographic.fromCartesian(H[E],g);e.height=0,B[E]=e}if(B=s.arrayRemoveDuplicates(B,a.Cartographic.equalsEpsilon),j=B.length,j<2)return;const G=[],Y=[],F=[],q=[];let W=re,$=se,J=oe,Q=le,K=ce;const ee=B[0],te=B[1];for(W=U(g,B[j-1],y,W),Q=U(g,te,y,Q),$=U(g,ee,y,$),J=U(g,ee,M,J),K=d?ne(W,$,J,Q,K):V(ee,te,M,g,K),a.Cartesian3.pack(K,Y,0),a.Cartesian3.pack($,F,0),a.Cartesian3.pack(J,q,0),G.push(ee.latitude),G.push(ee.longitude),X(ee,te,y,M,f,m,g,Y,F,q,G),E=1;E<j-1;++E){W=a.Cartesian3.clone($,W),$=a.Cartesian3.clone(Q,$);const e=B[E];U(g,e,M,J),U(g,B[E+1],y,Q),ne(W,$,J,Q,K),T=Y.length,a.Cartesian3.pack(K,Y,T),a.Cartesian3.pack($,F,T),a.Cartesian3.pack(J,q,T),G.push(e.latitude),G.push(e.longitude),X(B[E],B[E+1],y,M,f,m,g,Y,F,q,G)}const ae=B[j-1],de=B[j-2];if($=U(g,ae,y,$),J=U(g,ae,M,J),d){const e=B[0];W=U(g,de,y,W),Q=U(g,e,y,Q),K=ne(W,$,J,Q,K)}else K=V(de,ae,M,g,K);if(T=Y.length,a.Cartesian3.pack(K,Y,T),a.Cartesian3.pack($,F,T),a.Cartesian3.pack(J,q,T),G.push(ae.latitude),G.push(ae.longitude),d){for(X(ae,ee,y,M,f,m,g,Y,F,q,G),T=Y.length,E=0;E<3;++E)Y[T+E]=Y[E],F[T+E]=F[E],q[T+E]=q[E];G.push(ee.latitude),G.push(ee.longitude)}return function(n,r,s,l,c,p,h){let d,g;const f=r._ellipsoid,m=s.length/3-1,w=8*m,y=4*w,M=36*m,T=w>65535?new Uint32Array(M):new Uint16Array(M),E=new Float64Array(3*w),_=new Float32Array(y),O=new Float32Array(y),P=new Float32Array(y),A=new Float32Array(y),b=new Float32Array(y);let k,L,x,I;h&&(k=new Float32Array(y),L=new Float32Array(y),x=new Float32Array(y),I=new Float32Array(2*w));const R=p.length/2;let D=0;const v=ke;v.height=0;const z=Le;z.height=0;let H=Se,j=xe;if(h)for(g=0,d=1;d<R;d++)v.latitude=p[g],v.longitude=p[g+1],z.latitude=p[g+2],z.longitude=p[g+3],H=r.project(v,H),j=r.project(z,j),D+=a.Cartesian3.distance(H,j),g+=2;const B=l.length/3;j=a.Cartesian3.unpack(l,0,j);let V,G=0;for(g=3,d=1;d<B;d++)H=a.Cartesian3.clone(j,H),j=a.Cartesian3.unpack(l,g,j),G+=a.Cartesian3.distance(H,j),g+=3;g=3;let Y=0,F=0,q=0,X=0,W=!1,U=a.Cartesian3.unpack(s,0,Ne),$=a.Cartesian3.unpack(l,0,xe),J=a.Cartesian3.unpack(c,0,De);if(n){me(J,a.Cartesian3.unpack(s,s.length-6,Ie),U,$)&&(J=a.Cartesian3.negate(J,J))}let Q=0,K=0,ee=0;for(d=0;d<m;d++){const e=a.Cartesian3.clone(U,Ie),n=a.Cartesian3.clone($,Se);let o,C,d,m,w=a.Cartesian3.clone(J,Re);if(W&&(w=a.Cartesian3.negate(w,w)),U=a.Cartesian3.unpack(s,g,Ne),$=a.Cartesian3.unpack(l,g,xe),J=a.Cartesian3.unpack(c,g,De),W=me(J,e,U,$),v.latitude=p[Y],v.longitude=p[Y+1],z.latitude=p[Y+2],z.longitude=p[Y+3],h){const e=be(v,z);o=r.project(v,Ge),C=r.project(z,Ye);const t=Z(C,o,et);t.y=Math.abs(t.y),d=Fe,m=qe,0===e||a.Cartesian3.dot(t,a.Cartesian3.UNIT_Y)>N?(d=Te(r,v,w,o,Fe),m=Te(r,z,J,C,qe)):1===e?(m=Te(r,z,J,C,qe),d.x=0,d.y=i.CesiumMath.sign(v.longitude-Math.abs(z.longitude)),d.z=0):(d=Te(r,v,w,o,Fe),m.x=0,m.y=i.CesiumMath.sign(v.longitude-z.longitude),m.z=0)}const y=a.Cartesian3.distance(n,$),M=u.EncodedCartesian3.fromCartesian(e,Qe),T=a.Cartesian3.subtract(U,e,Xe),R=a.Cartesian3.normalize(T,Ze);let H=a.Cartesian3.subtract(n,e,We);H=a.Cartesian3.normalize(H,H);let j=a.Cartesian3.cross(R,H,Ze);j=a.Cartesian3.normalize(j,j);let B=a.Cartesian3.cross(H,w,$e);B=a.Cartesian3.normalize(B,B);let te=a.Cartesian3.subtract($,U,Ue);te=a.Cartesian3.normalize(te,te);let ae=a.Cartesian3.cross(J,te,Je);ae=a.Cartesian3.normalize(ae,ae);const ne=y/G,ie=Q/G;let re,se,oe,le=0,ce=0,ue=0;if(h){le=a.Cartesian3.distance(o,C),re=u.EncodedCartesian3.fromCartesian(o,Ke),se=a.Cartesian3.subtract(C,o,et),oe=a.Cartesian3.normalize(se,tt);const e=oe.x;oe.x=oe.y,oe.y=-e,ce=le/D,ue=K/D}for(V=0;V<8;V++){const e=X+4*V,t=F+2*V,n=e+3,i=V<4?1:-1,r=2===V||3===V||6===V||7===V?1:-1;a.Cartesian3.pack(M.high,_,e),_[n]=T.x,a.Cartesian3.pack(M.low,O,e),O[n]=T.y,a.Cartesian3.pack(B,P,e),P[n]=T.z,a.Cartesian3.pack(ae,A,e),A[n]=ne*i,a.Cartesian3.pack(j,b,e);let s=ie*r;0===s&&r<0&&(s=9),b[n]=s,h&&(k[e]=re.high.x,k[e+1]=re.high.y,k[e+2]=re.low.x,k[e+3]=re.low.y,x[e]=-d.y,x[e+1]=d.x,x[e+2]=m.y,x[e+3]=-m.x,L[e]=se.x,L[e+1]=se.y,L[e+2]=oe.x,L[e+3]=oe.y,I[t]=ce*i,s=ue*r,0===s&&r<0&&(s=9),I[t+1]=s)}const Ce=Be,pe=Ve,he=He,de=je,ge=t.Rectangle.fromCartographicArray(ve,ze),fe=S.getMinimumMaximumHeights(ge,f),we=fe.minimumTerrainHeight,ye=fe.maximumTerrainHeight;ee+=we,ee+=ye,Oe(e,n,we,ye,Ce,he),Oe(U,$,we,ye,pe,de);let Me=a.Cartesian3.multiplyByScalar(j,i.CesiumMath.EPSILON5,at);a.Cartesian3.add(Ce,Me,Ce),a.Cartesian3.add(pe,Me,pe),a.Cartesian3.add(he,Me,he),a.Cartesian3.add(de,Me,de),Ae(Ce,pe),Ae(he,de),a.Cartesian3.pack(Ce,E,q),a.Cartesian3.pack(pe,E,q+3),a.Cartesian3.pack(de,E,q+6),a.Cartesian3.pack(he,E,q+9),Me=a.Cartesian3.multiplyByScalar(j,-2*i.CesiumMath.EPSILON5,at),a.Cartesian3.add(Ce,Me,Ce),a.Cartesian3.add(pe,Me,pe),a.Cartesian3.add(he,Me,he),a.Cartesian3.add(de,Me,de),Ae(Ce,pe),Ae(he,de),a.Cartesian3.pack(Ce,E,q+12),a.Cartesian3.pack(pe,E,q+15),a.Cartesian3.pack(de,E,q+18),a.Cartesian3.pack(he,E,q+21),Y+=2,g+=3,F+=16,q+=24,X+=32,Q+=y,K+=le}g=0;let te=0;for(d=0;d<m;d++){for(V=0;V<rt;V++)T[g+V]=it[V]+te;te+=8,g+=rt}const ae=nt;e.BoundingSphere.fromVertices(s,a.Cartesian3.ZERO,3,ae[0]),e.BoundingSphere.fromVertices(l,a.Cartesian3.ZERO,3,ae[1]);const ne=e.BoundingSphere.fromBoundingSpheres(ae);ne.radius+=ee/(2*m);const ie={position:new C.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:E}),startHiAndForwardOffsetX:st(_),startLoAndForwardOffsetY:st(O),startNormalAndForwardOffsetZ:st(P),endNormalAndTextureCoordinateNormalizationX:st(A),rightNormalAndTextureCoordinateNormalizationY:st(b)};h&&(ie.startHiLo2D=st(k),ie.offsetAndRight2D=st(L),ie.startEndNormals2D=st(x),ie.texcoordNormalization2D=new C.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:I}));return new C.Geometry({attributes:ie,indices:T,boundingSphere:ne})}(d,w,F,q,Y,G,h)};const de=new a.Cartesian3,ge=new a.Matrix3,fe=new e.Quaternion;function me(t,n,r,s){const o=Z(r,n,de),l=a.Cartesian3.dot(o,t);if(l>N||l<R){const n=Z(s,r,ee),o=l<R?i.CesiumMath.PI_OVER_TWO:-i.CesiumMath.PI_OVER_TWO,c=e.Quaternion.fromAxisAngle(n,o,fe),u=a.Matrix3.fromQuaternion(c,ge);return a.Matrix3.multiplyByVector(u,t,t),!0}return!1}const we=new a.Cartographic,ye=new a.Cartesian3,Me=new a.Cartesian3;function Te(e,t,n,r,s){const o=a.Cartographic.toCartesian(t,e._ellipsoid,ye);let l=a.Cartesian3.add(o,n,Me),c=!1;const u=e._ellipsoid;let C=u.cartesianToCartographic(l,we);Math.abs(t.longitude-C.longitude)>i.CesiumMath.PI_OVER_TWO&&(c=!0,l=a.Cartesian3.subtract(o,n,Me),C=u.cartesianToCartographic(l,we)),C.height=0;const p=e.project(C,s);return(s=a.Cartesian3.subtract(p,r,s)).z=0,s=a.Cartesian3.normalize(s,s),c&&a.Cartesian3.negate(s,s),s}const Ee=new a.Cartesian3,_e=new a.Cartesian3;function Oe(e,t,n,i,r,s){const o=a.Cartesian3.subtract(t,e,Ee);a.Cartesian3.normalize(o,o);const l=n-D;let c=a.Cartesian3.multiplyByScalar(o,l,_e);a.Cartesian3.add(e,c,r);const u=i-v;c=a.Cartesian3.multiplyByScalar(o,u,_e),a.Cartesian3.add(t,c,s)}const Pe=new a.Cartesian3;function Ae(e,t){const n=h.Plane.getPointDistance(ie,e),r=h.Plane.getPointDistance(ie,t);let s=Pe;i.CesiumMath.equalsEpsilon(n,0,i.CesiumMath.EPSILON2)?(s=Z(t,e,s),a.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),a.Cartesian3.add(e,s,e)):i.CesiumMath.equalsEpsilon(r,0,i.CesiumMath.EPSILON2)&&(s=Z(e,t,s),a.Cartesian3.multiplyByScalar(s,i.CesiumMath.EPSILON2,s),a.Cartesian3.add(t,s,t))}function be(e,t){const a=Math.abs(e.longitude),n=Math.abs(t.longitude);if(i.CesiumMath.equalsEpsilon(a,i.CesiumMath.PI,i.CesiumMath.EPSILON11)){const n=i.CesiumMath.sign(t.longitude);return e.longitude=n*(a-i.CesiumMath.EPSILON11),1}if(i.CesiumMath.equalsEpsilon(n,i.CesiumMath.PI,i.CesiumMath.EPSILON11)){const a=i.CesiumMath.sign(e.longitude);return t.longitude=a*(n-i.CesiumMath.EPSILON11),2}return 0}const ke=new a.Cartographic,Le=new a.Cartographic,Se=new a.Cartesian3,xe=new a.Cartesian3,Ie=new a.Cartesian3,Ne=new a.Cartesian3,Re=new a.Cartesian3,De=new a.Cartesian3,ve=[ke,Le],ze=new t.Rectangle,He=new a.Cartesian3,je=new a.Cartesian3,Be=new a.Cartesian3,Ve=new a.Cartesian3,Ge=new a.Cartesian3,Ye=new a.Cartesian3,Fe=new a.Cartesian3,qe=new a.Cartesian3,Xe=new a.Cartesian3,We=new a.Cartesian3,Ue=new a.Cartesian3,Ze=new a.Cartesian3,$e=new a.Cartesian3,Je=new a.Cartesian3,Qe=new u.EncodedCartesian3,Ke=new u.EncodedCartesian3,et=new a.Cartesian3,tt=new a.Cartesian3,at=new a.Cartesian3,nt=[new e.BoundingSphere,new e.BoundingSphere],it=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],rt=it.length;function st(e){return new C.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return z._projectNormal=Te,function(e,t){return S.initialize().then((function(){return n.defined(t)&&(e=z.unpack(e,t)),z.createGeometry(e)}))}}));
