(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[664],{2003:function(e,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/bookmarks",function(){return o(9370)}])},9527:function(e,t,o){"use strict";var r=o(5893),a=o(875),n=o(5675),c=o.n(n),s=o(7294),i=o(134),l=o(7516),d=o(1163),u=o(4607),m=o(9828),f=o(6501),g=o(6801);let p=e=>{let{title:t,imageURL:o,movieID:n}=e,{setShowLoginModal:p,setSelectedMovieID:x,setSavedMovieIDS:v,savedMovieIDS:h}=(0,s.useContext)(i.Il),k=(0,d.useRouter)(),b=e=>{k.push("/preview/".concat(e)),x(e),localStorage.setItem("selectedMovieID",e)},j=async()=>{var e,r;let a=[...h];if(null===(e=u.lX.currentUser)||void 0===e?void 0:e.uid){console.log(null===(r=u.lX.currentUser)||void 0===r?void 0:r.uid),console.log(n);let e={title:t,id:n,uid:u.lX.currentUser.uid,backdrop_path:o,poster_path:o,description:""},c="user_bookmarks/".concat(u.lX.currentUser.uid,"/saved_bookmarks/").concat(n),s=localStorage.getItem("savedMovies")||"",i=(0,m.hJ)(u.mz,"user_bookmarks/".concat(u.lX.currentUser.uid,"/saved_bookmarks"));if(s.includes(n))!function(e,t){let o=f.ZP.loading("removing item...");(0,g.e)(e,t).then(e=>{console.log("result",e),f.ZP.dismiss(o),console.log("Item removed successfully"),f.ZP.success("Item removed successfully")}).catch(e=>{console.error("Error removing item:",e),f.ZP.dismiss(o),f.ZP.error("Error removing item:",e)})}(n.toString(),i);else{let t=f.ZP.loading("Loading...");await (0,m.pl)((0,m.JU)(u.mz,c),e).then(()=>{f.ZP.success("Added to bookmarks"),f.ZP.dismiss(t),a.push(n),v(a)}).catch(()=>{f.ZP.error("Error occured adding bookmark")}),localStorage.setItem("savedMovies",JSON.stringify(a))}}else console.log("login to save a movie"),p(!0)},_=()=>{console.log("Bookmark clicked"),j()},y=e=>{e.target instanceof SVGElement?_():b(n)};return(0,r.jsx)("div",{children:(0,r.jsxs)("div",{style:{background:"rgba(169, 169, 169, 0.2)"},className:"max-w-[350px] rounded-md w-[280px] h-[400px] p-2 cursor-pointer ",onClick:y,children:[(0,r.jsx)(c(),{src:a.Ym+o||"/no_preview.jpg",alt:t,width:300,height:300,className:"h-[85%] object-cover rounded-md  bg-gray-400"}),(0,r.jsxs)("div",{className:"flex justify-between p-2 items-center",children:[(0,r.jsx)("p",{className:"w-[90%] max-lines-2",children:t}),Array.from(h).includes(n)?(0,r.jsx)(l.ASR,{size:28,className:"text-green-400"}):(0,r.jsx)(l.p4i,{size:28})]})]})})};t.Z=p},6224:function(e,t,o){"use strict";o.d(t,{Z:function(){return m}});var r=o(5893),a=o(9583),n=o(7516),c=o(5434);let s=[{name:"Home",icon:a.xng,route:"/"},{name:"Discover",icon:c.wYG,route:"/discover"},{name:"Trending",icon:a.NcA,route:"/trending"},{name:"TV Shows",icon:a.RsC,route:"/tv_shows"},{name:"Top Rated",icon:n.Z0Y,route:"/top_rated"},{name:"Saved Trailers",icon:n.eXA,route:"/bookmarks"}];var i=o(1664),l=o.n(i),d=o(1163);o(7294);let u=()=>{let e=(0,d.useRouter)();return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("nav",{className:"w-[300px]  border-gray-600 py-6 px-4 flex  gap-10 flex-col ",children:s.map(t=>(0,r.jsx)(l(),{className:e.pathname===t.route?"text-brand":"",href:t.route,children:(0,r.jsxs)("div",{className:"flex p-3 gap-3 items-center font-medium text-xl rounded-md hover:bg-[#ffffff12]",children:[(0,r.jsx)(t.icon,{size:24}),(0,r.jsx)("p",{children:t.name})]})},t.name))})})};var m=u},875:function(e,t,o){"use strict";o.d(t,{Bu:function(){return s},Iq:function(){return n},Pg:function(){return c},Ym:function(){return a},r6:function(){return i}});let r="https://api.themoviedb.org/3/",a="https://image.tmdb.org/t/p/w1280";"".concat(r,"movie/popular?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US");let n="".concat(r,"discover/movie?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US"),c="".concat(r,"tv/popular?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US"),s="".concat(r,"trending/movie/day?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US"),i="".concat(r,"discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US");"".concat(r,"search/multi?api_key=").concat("49aadc9bda210df9f0d47e374c404fd5","&language=en-US&page=1")},9370:function(e,t,o){"use strict";o.r(t);var r=o(5893),a=o(9527),n=o(134),c=o(1163),s=o(7294),i=o(5675),l=o.n(i),d=o(6224);let u=()=>{(0,c.useRouter)();let{setSelectedMovieID:e,selectedMovieID:t,setShowLoginModal:o,savedMovieIDS:i,setSavedMovieIDS:u,bookmarkedMovies:m,setBookmarkedMovies:f}=(0,s.useContext)(n.Il),g=()=>(0,r.jsxs)("div",{className:"flex flex-1 border h-[90vh] flex-col items-center justify-center text-xl opacity-50",children:[(0,r.jsx)(l(),{src:"/null.png",alt:"",className:"object-cover",width:300,height:300}),(0,r.jsx)("p",{className:"capitalize opacity-50",children:"No Saved Trailers"})]});return console.log("bookmarked",m),(0,r.jsxs)("div",{className:"w-full h-[90vh] flex",children:[(0,r.jsx)(d.Z,{}),m.length<1?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(g,{})}):(0,r.jsxs)("div",{className:"max-w-[100rem] mx-auto lg:px-10 flex-1 overflow-y-scroll flex-col flex",children:[(0,r.jsx)("h2",{className:"text-3xl p-2 text-center py-4",children:"My Bookmarks"}),(0,r.jsx)("div",{className:"flex flex-wrap gap-10 justify-center ",children:m&&m.map(e=>{let{title:t,id:o,description:n,poster_path:c}=e;return(0,r.jsx)(a.Z,{title:t,imageURL:c,movieID:o},o)})})]})]})};t.default=u}},function(e){e.O(0,[228,774,888,179],function(){return e(e.s=2003)}),_N_E=e.O()}]);