(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[827],{253:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/trending",function(){return s(8599)}])},9527:function(e,t,s){"use strict";var n=s(5893),r=s(875),a=s(5675),c=s.n(a),o=s(7294),i=s(134),l=s(7516),d=s(1163),u=s(4607),m=s(9828),f=s(6501),g=s(6801);let x=e=>{let{title:t,imageURL:s,movieID:a}=e,{setShowLoginModal:x,setSelectedMovieID:p,setSavedMovieIDS:v,savedMovieIDS:h}=(0,o.useContext)(i.Il),j=(0,d.useRouter)(),k=e=>{j.push("/preview/".concat(e)),p(e),localStorage.setItem("selectedMovieID",e)},_=async()=>{var e,n;let r=[...h];if(null===(e=u.lX.currentUser)||void 0===e?void 0:e.uid){console.log(null===(n=u.lX.currentUser)||void 0===n?void 0:n.uid),console.log(a);let e={title:t,id:a,uid:u.lX.currentUser.uid,backdrop_path:s,poster_path:s,description:""},c="user_bookmarks/".concat(u.lX.currentUser.uid,"/saved_bookmarks/").concat(a),o=localStorage.getItem("savedMovies")||"",i=(0,m.hJ)(u.mz,"user_bookmarks/".concat(u.lX.currentUser.uid,"/saved_bookmarks"));if(o.includes(a))!function(e,t){let s=f.ZP.loading("removing item...");(0,g.e)(e,t).then(e=>{console.log("result",e),f.ZP.dismiss(s),console.log("Item removed successfully"),f.ZP.success("Item removed successfully")}).catch(e=>{console.error("Error removing item:",e),f.ZP.dismiss(s),f.ZP.error("Error removing item:",e)})}(a.toString(),i);else{let t=f.ZP.loading("Loading...");await (0,m.pl)((0,m.JU)(u.mz,c),e).then(()=>{f.ZP.success("Added to bookmarks"),f.ZP.dismiss(t),r.push(a),v(r)}).catch(()=>{f.ZP.error("Error occured adding bookmark")}),localStorage.setItem("savedMovies",JSON.stringify(r))}}else console.log("login to save a movie"),x(!0)},b=()=>{console.log("Bookmark clicked"),_()},y=e=>{e.target instanceof SVGElement?b():k(a)};return(0,n.jsx)("div",{children:(0,n.jsxs)("div",{style:{background:"rgba(169, 169, 169, 0.2)"},className:"max-w-[350px] rounded-md w-[280px] h-[400px] p-2 cursor-pointer ",onClick:y,children:[(0,n.jsx)(c(),{src:r.Ym+s||"/no_preview.jpg",alt:t,width:300,height:300,className:"h-[85%] object-cover rounded-md  bg-gray-400"}),(0,n.jsxs)("div",{className:"flex justify-between p-2 items-center",children:[(0,n.jsx)("p",{className:"w-[90%] max-lines-2",children:t}),Array.from(h).includes(a)?(0,n.jsx)(l.ASR,{size:28,className:"text-green-400"}):(0,n.jsx)(l.p4i,{size:28})]})]})})};t.Z=x},6224:function(e,t,s){"use strict";s.d(t,{Z:function(){return m}});var n=s(5893),r=s(9583),a=s(7516),c=s(5434);let o=[{name:"Home",icon:r.xng,route:"/"},{name:"Discover",icon:c.wYG,route:"/discover"},{name:"Trending",icon:r.NcA,route:"/trending"},{name:"TV Shows",icon:r.RsC,route:"/tv_shows"},{name:"Top Rated",icon:a.Z0Y,route:"/top_rated"},{name:"Saved Trailers",icon:a.eXA,route:"/bookmarks"}];var i=s(1664),l=s.n(i),d=s(1163);s(7294);let u=()=>{let e=(0,d.useRouter)();return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("nav",{className:"w-[300px]  border-gray-600 py-6 px-4 flex  gap-10 flex-col ",children:o.map(t=>(0,n.jsx)(l(),{className:e.pathname===t.route?"text-brand":"",href:t.route,children:(0,n.jsxs)("div",{className:"flex p-3 gap-3 items-center font-medium text-xl rounded-md hover:bg-[#ffffff12]",children:[(0,n.jsx)(t.icon,{size:24}),(0,n.jsx)("p",{children:t.name})]})},t.name))})})};var m=u},8409:function(e,t,s){"use strict";var n=s(5893);s(7294);var r=s(5434),a=s(1163),c=s(6224);let o=e=>{let{children:t,currentPage:s,totalPages:o,title:i,actionNext:l,actionPrev:d}=e;return(0,a.useRouter)(),(0,n.jsxs)("section",{className:"flex flex-1 h-[91vh]",children:[(0,n.jsx)(c.Z,{}),(0,n.jsxs)("main",{className:" flex flex-col flex-1",children:[(0,n.jsxs)("header",{className:"h-16 flex items-center justify-between lg:px-20",children:[(0,n.jsx)(r.sG8,{size:28,onClick:d}),(0,n.jsx)("h3",{className:"text-xl",children:i}),(0,n.jsx)(r.AeI,{size:28,onClick:l})]}),(0,n.jsx)("section",{className:" p-4 h-[80vh] flex-1 overflow-y-scroll",children:(0,n.jsx)("div",{className:" flex justify-center  px-6  gap-6 gap-y-10 flex-wrap h-full items-center",children:t})})]})]})};t.Z=o},1865:function(e,t,s){"use strict";var n=s(5893);let r=()=>(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"lds-ring ",children:[(0,n.jsx)("div",{}),(0,n.jsx)("div",{}),(0,n.jsx)("div",{}),(0,n.jsx)("div",{})]})});t.Z=r},875:function(e,t,s){"use strict";s.d(t,{Bu:function(){return o},Iq:function(){return a},Pg:function(){return c},Ym:function(){return r},r6:function(){return i}});let n="https://api.themoviedb.org/3/",r="https://image.tmdb.org/t/p/w1280";"".concat(n,"movie/popular?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US");let a="".concat(n,"discover/movie?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US"),c="".concat(n,"tv/popular?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US"),o="".concat(n,"trending/movie/day?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US"),i="".concat(n,"discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US");"".concat(n,"search/multi?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US&page=1")},8599:function(e,t,s){"use strict";s.r(t);var n=s(5893),r=s(9527),a=s(8409),c=s(1865),o=s(875),i=s(6154),l=s(5675),d=s.n(l),u=s(7294);let m=()=>{let[e,t]=(0,u.useState)(!1),[s,l]=(0,u.useState)(null),[m,f]=(0,u.useState)(1),[g,x]=(0,u.useState)(100),p=(e,s)=>{t(!0),i.Z.request({method:"GET",url:e,params:{api_key:"49aadc9bda210df9f0d47e374c404fd5",language:"en-US",page:s}}).then(function(e){console.log(e.data),l(e.data),x(e.data.total_pages),t(!1)}).catch(function(e){console.error(e),t(!1)})};console.log("currentPage",m);let v=()=>{m<=g&&(f(e=>e+1),console.log("met"))},h=()=>{m<=1||f(m-1)};return(0,u.useEffect)(()=>{p(o.Bu,m)},[m]),(0,n.jsx)(a.Z,{actionNext:v,actionPrev:h,title:"Trending Movies",children:e?(0,n.jsx)(c.Z,{}):s?s.results.map(e=>{let{title:t,name:s,id:a,poster_path:c}=e;return(0,n.jsx)(r.Z,{title:t||s,imageURL:c,movieID:a},a)}):(0,n.jsxs)("div",{className:"flex items-center justify-center flex-col",children:[(0,n.jsx)(d(),{src:"/error.png",alt:"error",width:450,height:450}),(0,n.jsx)("p",{className:"text-xl",children:"Error getting movies"})," "]})})};t.default=m}},function(e){e.O(0,[228,774,888,179],function(){return e(e.s=253)}),_N_E=e.O()}]);