"use strict";
exports.id = 224;
exports.ids = [224];
exports.modules = {

/***/ 6224:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Nav)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-icons/fa"
var fa_ = __webpack_require__(6290);
// EXTERNAL MODULE: external "react-icons/bi"
var bi_ = __webpack_require__(6652);
// EXTERNAL MODULE: external "react-icons/md"
var md_ = __webpack_require__(4041);
;// CONCATENATED MODULE: ./constants/TABS.js



const TABS = [
    {
        name: "Home",
        icon: fa_.FaHome,
        route: "/"
    },
    {
        name: "Discover",
        icon: md_.MdShowChart,
        route: "/discover"
    },
    {
        name: "Trending",
        icon: fa_.FaFire,
        route: "/trending"
    },
    {
        name: "TV Shows",
        icon: fa_.FaTv,
        route: "/tv_shows"
    },
    {
        name: "Top Rated",
        icon: bi_.BiMovie,
        route: "/top_rated"
    },
    {
        name: "Saved Trailers",
        icon: bi_.BiBookBookmark,
        route: "/bookmarks"
    }
];

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./components/Nav/index.tsx





const Sidebar = ()=>{
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("nav", {
            className: "w-[300px]  border-gray-600 py-6 px-4 flex  gap-10 flex-col ",
            children: TABS.map((tab)=>/*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    className: router.pathname === tab.route ? "text-brand" : "",
                    href: tab.route,
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex p-3 gap-3 items-center font-medium text-xl rounded-md hover:bg-[#ffffff12]",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(tab.icon, {
                                size: 24
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: tab.name
                            })
                        ]
                    })
                }, tab.name))
        })
    });
};
/* harmony default export */ const Nav = (Sidebar);


/***/ })

};
;