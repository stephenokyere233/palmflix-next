"use strict";
exports.id = 527;
exports.ids = [527];
exports.modules = {

/***/ 9527:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants_endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(875);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(134);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6652);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_bi__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8452);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1492);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6201);
/* harmony import */ var _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6801);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__, firebase_firestore__WEBPACK_IMPORTED_MODULE_8__, react_hot_toast__WEBPACK_IMPORTED_MODULE_9__, _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_10__]);
([_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__, firebase_firestore__WEBPACK_IMPORTED_MODULE_8__, react_hot_toast__WEBPACK_IMPORTED_MODULE_9__, _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const MovieCard = ({ title , imageURL , movieID  })=>{
    const { setShowLoginModal , setSelectedMovieID , setSavedMovieIDS , savedMovieIDS  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context__WEBPACK_IMPORTED_MODULE_4__/* .AppContext */ .Il);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const handleClick = (id)=>{
        router.push(`/preview/${id}`);
        setSelectedMovieID(id);
        localStorage.setItem("selectedMovieID", id);
    };
    function handleRemoveButtonClick(movieID, collectionRef) {
        const toastId = react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].loading("removing item...");
        (0,_services_bookmarks_service__WEBPACK_IMPORTED_MODULE_10__/* .removeBookmark */ .e)(movieID, collectionRef).then((result)=>{
            console.log("result", result);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].dismiss(toastId);
            console.log("Item removed successfully");
            react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].success("Item removed successfully");
        }).catch((error)=>{
            console.error("Error removing item:", error);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].dismiss(toastId);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].error("Error removing item:", error);
        });
    }
    const addToBookmark = async ()=>{
        let savedArray = [
            ...savedMovieIDS
        ];
        if (!_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firebaseAuth.currentUser */ .lX.currentUser?.uid) {
            console.log("login to save a movie");
            setShowLoginModal(true);
        } else {
            console.log(_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firebaseAuth.currentUser */ .lX.currentUser?.uid);
            console.log(movieID);
            const movieToSave = {
                title: title,
                id: movieID,
                uid: _config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firebaseAuth.currentUser.uid */ .lX.currentUser.uid,
                backdrop_path: imageURL,
                poster_path: imageURL,
                description: ""
            };
            let docRef = `user_bookmarks/${_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firebaseAuth.currentUser.uid */ .lX.currentUser.uid}/saved_bookmarks/${movieID}`;
            const LSMovies = localStorage.getItem("savedMovies") || "";
            let collectionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_8__.collection)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firestoreDB */ .mz, `user_bookmarks/${_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firebaseAuth.currentUser.uid */ .lX.currentUser.uid}/saved_bookmarks`);
            if (LSMovies.includes(movieID)) {
                handleRemoveButtonClick(movieID.toString(), collectionRef);
            } else {
                const toastId = react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].loading("Loading...");
                await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_8__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_8__.doc)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firestoreDB */ .mz, docRef), movieToSave).then(()=>{
                    react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].success("Added to bookmarks");
                    react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].dismiss(toastId);
                    savedArray.push(movieID);
                    setSavedMovieIDS(savedArray);
                }).catch(()=>{
                    react_hot_toast__WEBPACK_IMPORTED_MODULE_9__["default"].error("Error occured adding bookmark");
                });
                localStorage.setItem("savedMovies", JSON.stringify(savedArray));
            }
        }
    };
    const handleBookmarkClick = ()=>{
        console.log("Bookmark clicked");
        addToBookmark();
    };
    const handleCardClick = (event)=>{
        if (!(event.target instanceof SVGElement)) {
            handleClick(movieID);
        } else {
            handleBookmarkClick();
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            style: {
                background: "rgba(169, 169, 169, 0.2)"
            },
            className: "max-w-[350px] rounded-md w-[280px] h-[400px] p-2 cursor-pointer ",
            onClick: handleCardClick,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {
                    src: _constants_endpoints__WEBPACK_IMPORTED_MODULE_1__/* .img_path */ .Ym + imageURL || "/no_preview.jpg",
                    alt: title,
                    width: 300,
                    height: 300,
                    className: "h-[85%] object-cover rounded-md  bg-gray-400"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex justify-between p-2 items-center",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "w-[90%] max-lines-2",
                            children: title
                        }),
                        Array.from(savedMovieIDS).includes(movieID) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_5__.BiBookmarkHeart, {
                            size: 28,
                            className: "text-green-400"
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_5__.BiBookmark, {
                            size: 28
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 875:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bu": () => (/* binding */ trending_movies),
/* harmony export */   "Iq": () => (/* binding */ discover_movies),
/* harmony export */   "Pg": () => (/* binding */ tv_shows),
/* harmony export */   "Ym": () => (/* binding */ img_path),
/* harmony export */   "r6": () => (/* binding */ top_rated)
/* harmony export */ });
/* unused harmony exports api_url, popular_movies, search_url */
const api_url = `https://api.themoviedb.org/3/`;
const img_path = `https://image.tmdb.org/t/p/w1280`;
const popular_movies = `${api_url}movie/popular?api_key=${"49aadc9bda210df9f0d47e374c404fd5"}&language=en-US`;
const discover_movies = `${api_url}discover/movie?api_key=${"49aadc9bda210df9f0d47e374c404fd5"}&language=en-US`;
const tv_shows = `${api_url}tv/popular?api_key=${"49aadc9bda210df9f0d47e374c404fd5"}&language=en-US`;
const trending_movies = `${api_url}trending/movie/day?api_key=${"49aadc9bda210df9f0d47e374c404fd5"}&language=en-US`;
const top_rated = `${api_url}discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${"49aadc9bda210df9f0d47e374c404fd5"}&language=en-US`;
const search_url = `${api_url}search/multi?api_key=${"49aadc9bda210df9f0d47e374c404fd5"}&language=en-US&page=1`; // export const trailer = `${api_url}movie/${ movie_id }/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`


/***/ })

};
;