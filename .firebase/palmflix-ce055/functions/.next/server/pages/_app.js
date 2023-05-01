(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3340:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(134);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6290);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9648);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6201);
/* harmony import */ var _loader_LoadIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4869);
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8452);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(401);
/* harmony import */ var _logo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1989);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _modal_user_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9341);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_5__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_8__, firebase_auth__WEBPACK_IMPORTED_MODULE_9__, _modal_user_modal__WEBPACK_IMPORTED_MODULE_12__]);
([axios__WEBPACK_IMPORTED_MODULE_5__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_8__, firebase_auth__WEBPACK_IMPORTED_MODULE_9__, _modal_user_modal__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable react-hooks/exhaustive-deps */ 












const Header = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [loading, setLoading] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const { setShowLoginModal , searchQuery , setSearchQuery , setSearchResults , showUserDropdown , setShowUserDropdown , setAuthenticatedUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__/* .AppContext */ .Il);
    const handleSearch = async (query)=>{
        setLoading(true);
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_5__["default"].get(`https://api.themoviedb.org/3/search/multi?api_key=49aadc9bda210df9f0d47e374c404fd5&query=${query}&page=1`);
            console.log(response.data);
            setSearchResults(response.data);
            setLoading(false);
            router.push(`/search?query=${searchQuery}`);
        } catch (error) {
            console.log(error);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__["default"].error("erroring getting data");
            setLoading(false);
        }
    };
    const handleSubmit = (event)=>{
        event.preventDefault();
        handleSearch(searchQuery);
        console.log(searchQuery);
    };
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        listenForAuthStateChange();
    }, []);
    async function listenForAuthStateChange() {
        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_9__.onAuthStateChanged)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_8__/* .firebaseAuth */ .lX, (user)=>{
            if (user && user.email) {
                setAuthenticatedUser(user);
            } else console.log("logged out");
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
        className: `flex z-20 ${router.pathname === "/" && "fixed top-0"}  w-full justify-between px-10  h-20 items-center`,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_logo__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                    onSubmit: handleSubmit,
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "border border-gray-400 p-2 px-4 rounded-md flex items-center justify-start gap-4 min-w-[400px] relative bg-gray-400 bg-opacity-20",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__.FaSearch, {
                                className: "text-gray-400"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                className: "bg-transparent w-[85%]  outline-none",
                                type: "search",
                                id: "movie",
                                placeholder: "Search for movies",
                                value: searchQuery,
                                onChange: (event)=>setSearchQuery(event.target.value)
                            }),
                            loading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_loader_LoadIcon__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {})
                        ]
                    })
                })
            }),
            !_config_firebase_config__WEBPACK_IMPORTED_MODULE_8__/* .firebaseAuth.currentUser */ .lX.currentUser?.uid ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: ()=>setShowLoginModal(true),
                children: "Login"
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_11___default()), {
                        onClick: ()=>setShowUserDropdown(true),
                        src: _config_firebase_config__WEBPACK_IMPORTED_MODULE_8__/* .firebaseAuth.currentUser */ .lX.currentUser?.photoURL || "/user1.png",
                        alt: _config_firebase_config__WEBPACK_IMPORTED_MODULE_8__/* .firebaseAuth.currentUser */ .lX.currentUser?.displayName || "",
                        width: 100,
                        height: 100,
                        className: "rounded-full w-12 h-12 cursor-pointer bg-brand"
                    }),
                    showUserDropdown && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal_user_modal__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {})
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3153:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(134);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6197);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_2__]);
framer_motion__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const ModalLayout = ({ showModal , title , children , onHideModal , modalColor  })=>{
    const { showSignupModal , setShowSignupModal , showLoginModal , setShowLoginModal , setShowUserDropdown  } = react__WEBPACK_IMPORTED_MODULE_3___default().useContext(_context__WEBPACK_IMPORTED_MODULE_1__/* .AppContext */ .Il);
    const handleBackgroundClick = (event)=>{
        if (event.target === event.currentTarget) {
            if (onHideModal) {
                setShowSignupModal(false);
                setShowLoginModal(false);
                setShowUserDropdown(false);
                onHideModal();
            }
        }
    };
    if (showModal === false) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {});
    else return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__.motion.div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        className: "w-screen h-screen bg-[#00000080] z-[20] fixed top-0 left-0 flex items-center justify-center",
        onClick: handleBackgroundClick,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "p-2 md:p-0 absolute ",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `bg-[#00094B] p-2 md:p-10 rounded-xl w-full max-w-[650px] `,
                children: children
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalLayout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4273:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3340);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(134);
/* harmony import */ var _modal_login_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2072);
/* harmony import */ var _modal_signup_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8186);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8452);
/* harmony import */ var _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6801);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_header__WEBPACK_IMPORTED_MODULE_2__, _modal_login_auth__WEBPACK_IMPORTED_MODULE_4__, _modal_signup_auth__WEBPACK_IMPORTED_MODULE_5__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_7__, _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_8__]);
([_header__WEBPACK_IMPORTED_MODULE_2__, _modal_login_auth__WEBPACK_IMPORTED_MODULE_4__, _modal_signup_auth__WEBPACK_IMPORTED_MODULE_5__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_7__, _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable react-hooks/exhaustive-deps */ 








const Layout = ({ children  })=>{
    const { showSignupModal , setShowSignupModal , showLoginModal , setShowLoginModal , setShowUserDropdown , setBookmarkedMovies , setSavedMovieIDS  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context__WEBPACK_IMPORTED_MODULE_3__/* .AppContext */ .Il);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const [movieIDS, setMovieIDS] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([]);
    const [moviesData, setMoviesData] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([]);
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        const getBookmarks = async ()=>{
            const { savedMoviesData_ , movieIDS_  } = await (0,_services_bookmarks_service__WEBPACK_IMPORTED_MODULE_8__/* .fetchBookmarks */ .r)();
            setSavedMovieIDS(movieIDS_);
            setBookmarkedMovies(savedMoviesData_);
            setMovieIDS(movieIDS_);
            setMoviesData(savedMoviesData_);
        };
        getBookmarks();
    }, [
        router,
        _config_firebase_config__WEBPACK_IMPORTED_MODULE_7__/* .firebaseAuth.currentUser */ .lX.currentUser?.uid
    ]);
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        const savedMovies = localStorage.getItem("savedMovies");
        if (savedMovies) {
            try {
                const parsedData = JSON.parse(savedMovies);
                console.log("parsedData", parsedData);
                if (Array.isArray(parsedData)) {
                    setSavedMovieIDS(parsedData);
                }
            } catch (error) {
                console.error("Error parsing stored data:", error);
            }
        } else {
            setSavedMovieIDS(movieIDS);
        }
        const savedMoviesData = localStorage.getItem("savedMoviesData");
        if (savedMoviesData) {
            try {
                const parsedData = JSON.parse(savedMoviesData);
                if (Array.isArray(parsedData)) {
                    setBookmarkedMovies(parsedData);
                    console.log("setting from LS");
                    console.log("parsed", parsedData);
                }
            } catch (error) {
                console.error("Error parsing stored data:", error);
            }
        } else {
            setBookmarkedMovies(moviesData);
        }
    }, [
        movieIDS,
        moviesData,
        setBookmarkedMovies,
        setSavedMovieIDS
    ]);
    // console.log("bookmarked", bookmarkedMovies)
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        const keyClose = (event)=>{
            const { key  } = event;
            if (key === "Escape") {
                setShowSignupModal(false);
                setShowLoginModal(false);
                setShowUserDropdown(false);
            }
        };
        window.addEventListener("keydown", keyClose);
        return ()=>{
            window.removeEventListener("keydown", keyClose);
        };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        setShowSignupModal(false);
        setShowLoginModal(false);
        setShowUserDropdown(false);
    }, [
        router
    ]);
    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{
        const handleScroll = ()=>{
            if (window.scrollY > 0) {
                setShowUserDropdown(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: " text-white flex flex-col w-full",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_header__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {}),
            showLoginModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal_login_auth__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {}),
            showSignupModal && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_modal_signup_auth__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                className: "flex  flex-1 h-[90vh] overflow-x-hidden",
                children: children
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4869:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const LoadIcon = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "lds-ring-2 absolute top-2 right-10",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadIcon);


/***/ }),

/***/ 2072:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(134);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(178);
/* harmony import */ var react_icons_fc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fc__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(401);
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8452);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6201);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3397);
/* harmony import */ var _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3153);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6652);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_icons_bi__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6801);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_4__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_5__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__, _services_auth_service__WEBPACK_IMPORTED_MODULE_8__, _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_9__, _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_11__]);
([firebase_auth__WEBPACK_IMPORTED_MODULE_4__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_5__, react_hot_toast__WEBPACK_IMPORTED_MODULE_6__, _services_auth_service__WEBPACK_IMPORTED_MODULE_8__, _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_9__, _services_bookmarks_service__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/* eslint-disable react-hooks/exhaustive-deps */ 











const googleProvider = new firebase_auth__WEBPACK_IMPORTED_MODULE_4__.GoogleAuthProvider();
const LoginModal = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const [email, setEmail] = react__WEBPACK_IMPORTED_MODULE_2___default().useState("");
    const [password, setPassword] = react__WEBPACK_IMPORTED_MODULE_2___default().useState("");
    const [errorMessage, setErrorMessage] = react__WEBPACK_IMPORTED_MODULE_2___default().useState("");
    const [loading, setLoading] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false);
    const { setShowSignupModal , setShowLoginModal , setBookmarkedMovies , setSavedMovieIDS  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__/* .AppContext */ .Il);
    const getBookmarks = async ()=>{
        const { movieIDS_ , savedMoviesData_  } = await (0,_services_bookmarks_service__WEBPACK_IMPORTED_MODULE_11__/* .fetchBookmarks */ .r)();
        setSavedMovieIDS(movieIDS_);
        setBookmarkedMovies(savedMoviesData_);
    };
    const handleGoogleAuth = ()=>{
        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__.signInWithPopup)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_5__/* .firebaseAuth */ .lX, googleProvider).then(async (result)=>{
            (0,_services_auth_service__WEBPACK_IMPORTED_MODULE_8__/* .onAuthenticationSuccess */ .g)(result.user);
            getBookmarks();
            setShowLoginModal(false);
        }).catch((error)=>{
            if (error.message === "Firebase: Error (auth/internal-error).") {
                react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("You might be having connection issues");
            } else {
                react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error(error.message);
            }
            console.log(error.message);
        });
    };
    react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(()=>{
        getBookmarks();
    }, [
        router,
        _config_firebase_config__WEBPACK_IMPORTED_MODULE_5__/* .firebaseAuth.currentUser */ .lX.currentUser?.uid
    ]);
    const handleEmailAndPasswordAuth = ()=>{
        setLoading(true);
        if (email !== "" || password !== "") {
            (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__.signInWithEmailAndPassword)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_5__/* .firebaseAuth */ .lX, email, password).then(async (result)=>{
                (0,_services_auth_service__WEBPACK_IMPORTED_MODULE_8__/* .onAuthenticationSuccess */ .g)(result.user);
                getBookmarks();
                setShowLoginModal(false);
                setLoading(false);
            }).catch((error)=>{
                if (error.message === "Firebase: Error (auth/internal-error).") {
                    react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("You might be having connection issues");
                } else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error("User not found");
                } else {
                    react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error(error.message);
                }
                console.log(error.message);
                setLoading(false);
            });
        } else {
            setLoading(false);
            setErrorMessage("One or more fields empty");
        }
    };
    const handleSignUpClicked = ()=>{
        setShowLoginModal(false);
        setShowSignupModal(true);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_ModalLayout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
        onHideModal: ()=>setShowLoginModal(false),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            className: " p-2 w-full flex flex-col gap-4 justify-center items-center min-w-[350px] ",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_10__.BiX, {
                    className: "absolute top-6 right-10 text-black cursor-pointer",
                    onClick: ()=>setShowLoginModal(false),
                    size: 28
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: "text-2xl uppercase",
                    children: "Login"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex w-full  flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "email",
                            children: "Email"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            name: "email",
                            type: "text",
                            value: email,
                            className: "bg-transparent border outline-none p-2 rounded-md ",
                            onChange: (event)=>{
                                setEmail(event.target.value);
                                if (email !== "" || password !== "") {
                                    setErrorMessage("");
                                }
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex pb-2 w-full flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "password",
                            children: "Password"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            name: "password",
                            type: "password",
                            value: password,
                            className: "outline-none p-2 rounded-md bg-transparent border",
                            onChange: (event)=>{
                                setPassword(event.target.value);
                                if (email !== "" || password !== "") {
                                    setErrorMessage("");
                                }
                            }
                        })
                    ]
                }),
                errorMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "text-red-500",
                    children: errorMessage
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: handleEmailAndPasswordAuth,
                    className: "border w-full justify-center text-center rounded-md bg-[#2221] p-2 flex items-center gap-2",
                    children: loading ? "Loading...." : "Sign in"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex items-center gap-2 ",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                            className: "w-[100px]"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: "OR"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
                            className: "w-[100px]"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    onClick: handleGoogleAuth,
                    className: "border w-full justify-center  rounded-md bg-[#2221] p-2 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fc__WEBPACK_IMPORTED_MODULE_3__.FcGoogle, {}),
                        " Sign in with gmail"
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    onClick: handleSignUpClicked,
                    className: "flex gap-3",
                    children: [
                        "Don't have an account?",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "",
                            children: "Sign up"
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8186:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(401);
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8452);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3397);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6201);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6652);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_icons_bi__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3392);
/* harmony import */ var _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3153);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(134);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_3__, _services_auth_service__WEBPACK_IMPORTED_MODULE_4__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, firebase_storage__WEBPACK_IMPORTED_MODULE_7__, _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_8__]);
([firebase_auth__WEBPACK_IMPORTED_MODULE_2__, _config_firebase_config__WEBPACK_IMPORTED_MODULE_3__, _services_auth_service__WEBPACK_IMPORTED_MODULE_4__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, firebase_storage__WEBPACK_IMPORTED_MODULE_7__, _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const SignUpModal = ()=>{
    const [email, setEmail] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    const [password, setPassword] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    const [name, setName] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    const [errorMessage, setErrorMessage] = react__WEBPACK_IMPORTED_MODULE_1___default().useState("");
    const [loading, setLoading] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const [file, setFile] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const { setShowSignupModal , setShowLoginModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context__WEBPACK_IMPORTED_MODULE_9__/* .AppContext */ .Il);
    const registerUserWithEmailAndPassword = async ()=>{
        setLoading(true);
        if (email !== "" || password !== "" || name !== "") {
            try {
                const res = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.createUserWithEmailAndPassword)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_3__/* .firebaseAuth */ .lX, email, password);
                const storageRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_7__.ref)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_3__/* .cloudStorage */ .ai, `${name}.jpg`);
                const uploadTask = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_7__.uploadBytesResumable)(storageRef, file);
                if (file) {
                    uploadTask.on("state_changed", ()=>{
                        (0,firebase_storage__WEBPACK_IMPORTED_MODULE_7__.getDownloadURL)(uploadTask.snapshot.ref).then(async (downloadURL)=>{
                            console.log("File available at", downloadURL);
                            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.updateProfile)(res.user, {
                                displayName: name,
                                photoURL: downloadURL
                            }).then(()=>{
                                (0,_services_auth_service__WEBPACK_IMPORTED_MODULE_4__/* .onAuthenticationSuccess */ .g)(res.user);
                                setShowSignupModal(false);
                                setLoading(false);
                            }).catch((error)=>{
                                setLoading(false);
                                react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error("couldn't add user details");
                                react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error;
                            });
                        });
                    });
                } else {
                    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.updateProfile)(res.user, {
                        displayName: name
                    }).then(()=>{
                        (0,_services_auth_service__WEBPACK_IMPORTED_MODULE_4__/* .onAuthenticationSuccess */ .g)(res.user);
                        setShowSignupModal(false);
                        setLoading(false);
                    }).catch((error)=>{
                        setLoading(false);
                        react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error("couldn't add user details");
                    });
                }
            } catch (error) {
                console.log(error);
                react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].error(`${error.message}`);
                setLoading(false);
            }
        } else {
            setErrorMessage("One or more fields empty");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_ModalLayout__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
        onHideModal: ()=>setShowLoginModal(false),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            className: "relative p-2 w-full flex flex-col gap-4 justify-center items-center min-w-[350px]",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_6__.BiX, {
                    className: "absolute top-6 right-4 text-black cursor-pointer",
                    onClick: ()=>setShowSignupModal(false)
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: "text-2xl uppercase",
                    children: "Signup"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex w-full flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "name",
                            children: "Name"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            value: name,
                            type: "text",
                            className: "bg-transparent border outline-none p-2 rounded-md",
                            onChange: (event)=>{
                                setName(event.target.value);
                                if (email !== "" || password !== "" || name !== "") {
                                    setErrorMessage("");
                                }
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex w-full flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "email",
                            children: "Email"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            name: "email",
                            type: "text",
                            value: email,
                            className: "bg-transparent border outline-none p-2 rounded-md",
                            onChange: (event)=>{
                                setEmail(event.target.value);
                                if (email !== "" || password !== "" || name !== "") {
                                    setErrorMessage("");
                                }
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex w-full flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "password",
                            children: "Password"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            name: "password",
                            type: "password",
                            value: password,
                            className: "bg-transparent border outline-none p-2 rounded-md",
                            onChange: (event)=>{
                                setPassword(event.target.value);
                                if (email !== "" || password !== "" || name !== "") {
                                    setErrorMessage("");
                                }
                            }
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-col",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: "profile",
                            children: "Profile"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                            name: "profile",
                            type: "file",
                            className: "border outline-none p-2 rounded-md",
                            onChange: (event)=>{
                                {
                                    event.target.files && setFile(event.target.files[0]);
                                }
                                if (email !== "" || password !== "" || name !== "") {
                                    setErrorMessage("");
                                }
                            }
                        })
                    ]
                }),
                errorMessage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "text-red-500",
                    children: errorMessage
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    onClick: registerUserWithEmailAndPassword,
                    className: "border w-full justify-center rounded-md bg-[#2221] p-2 flex items-center gap-2",
                    children: loading ? "loading..." : "Sign Up"
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SignUpModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9341:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6652);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_bi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8452);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6201);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(134);
/* harmony import */ var _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3153);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_config_firebase_config__WEBPACK_IMPORTED_MODULE_4__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_7__]);
([_config_firebase_config__WEBPACK_IMPORTED_MODULE_4__, react_hot_toast__WEBPACK_IMPORTED_MODULE_5__, _layout_ModalLayout__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const UserDropDown = ()=>{
    const { authenticatedUser , setAuthenticatedUser , showUserDropdown , setShowUserDropdown , setSavedMovieIDS , setBookmarkedMovies  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context__WEBPACK_IMPORTED_MODULE_6__/* .AppContext */ .Il);
    const signOut = ()=>{
        _config_firebase_config__WEBPACK_IMPORTED_MODULE_4__/* .firebaseAuth.signOut */ .lX.signOut().then(()=>{
            setAuthenticatedUser(null);
            localStorage.clear();
            sessionStorage.clear();
            setShowUserDropdown(false);
            setSavedMovieIDS([]);
            setBookmarkedMovies([]);
            react_hot_toast__WEBPACK_IMPORTED_MODULE_5__["default"].success("Logged out Successfully");
        }).catch((error)=>{
            console.log(error);
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_layout_ModalLayout__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
        onHideModal: ()=>setShowUserDropdown(false),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: "mb-4",
                children: "MENU"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_3__.BiX, {
                className: "absolute top-6 right-10 text-black cursor-pointer",
                onClick: ()=>setShowUserDropdown(false),
                size: 28
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    background: "rgba(169, 169, 169, 0.2)"
                },
                className: ` w-[300px] flex flex-col rounded-md  text-xl text-white`,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                        href: "/profile",
                        className: "flex opacity-100 items-center border-[#222] border-b gap-2 px-4 py-3",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_3__.BiUser, {}),
                            "Profile"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                        href: "/bookmarks",
                        className: "flex opacity-100 items-center border-[#222] border-b gap-2 px-4 py-3",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_3__.BiBookmark, {}),
                            "Saved Trailers"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                        className: "flex items-center gap-2 px-4 py-3",
                        onClick: signOut,
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_3__.BiLogOut, {}),
                            "Logout"
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserDropDown);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4178:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4273);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(134);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6201);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_4__]);
([_components_layout__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function App({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_context_index__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_hot_toast__WEBPACK_IMPORTED_MODULE_4__.Toaster, {}),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3397:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ onAuthenticationSuccess)
/* harmony export */ });
/* unused harmony export signOut */
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8452);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6201);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_2__]);
([_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, react_hot_toast__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



async function onAuthenticationSuccess(firebaseUser) {
    let docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__/* .firestoreDB */ .mz, `users/${firebaseUser.uid}`);
    let docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)(docRef);
    if (!docSnap.exists()) {
        if (!firebaseUser.email) return;
        let newUser = {
            dateRegistered: Date(),
            id: firebaseUser.uid,
            imageUrl: firebaseUser.photoURL || null,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split("@")[0]
        };
        (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__/* .firestoreDB */ .mz, `users/${firebaseUser.uid}`), newUser).then(async (result)=>{
            react_hot_toast__WEBPACK_IMPORTED_MODULE_2__["default"].success("Signed up successfully");
            console.log(result);
        }).catch((error)=>react_hot_toast__WEBPACK_IMPORTED_MODULE_2__["default"].error("Couldn't add user"));
    } else react_hot_toast__WEBPACK_IMPORTED_MODULE_2__["default"].success("Welcome");
}
async function signOut() {
    firebaseAuth.signOut().then(()=>{
        sessionStorage.clear();
        localStorage.clear();
    }).catch((error)=>{
        console.log(error);
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6652:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/bi");

/***/ }),

/***/ 6290:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fa");

/***/ }),

/***/ 178:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fc");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 3745:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ 401:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ 1492:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ 3392:
/***/ ((module) => {

"use strict";
module.exports = import("firebase/storage");;

/***/ }),

/***/ 6197:
/***/ ((module) => {

"use strict";
module.exports = import("framer-motion");;

/***/ }),

/***/ 6201:
/***/ ((module) => {

"use strict";
module.exports = import("react-hot-toast");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [636,675,63,649,801,989], () => (__webpack_exec__(4178)));
module.exports = __webpack_exports__;

})();