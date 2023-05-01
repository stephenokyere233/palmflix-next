"use strict";
exports.id = 649;
exports.ids = [649];
exports.modules = {

/***/ 8452:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ai": () => (/* binding */ cloudStorage),
/* harmony export */   "lX": () => (/* binding */ firebaseAuth),
/* harmony export */   "mz": () => (/* binding */ firestoreDB)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3392);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_storage__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)({
    apiKey: "AIzaSyBzwbqGNQs8UkLlyj4X10sEqvtkd8F6TTA",
    authDomain: "palmflix-ce055.firebaseapp.com",
    projectId: "palmflix-ce055",
    storageBucket: "palmflix-ce055.appspot.com",
    messagingSenderId: "204482909712",
    appId: "1:204482909712:web:7cf44d357ebabbfad29c95",
    measurementId: "G-XM8SNXXWMF"
});
const firebaseAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);
const firestoreDB = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);
const cloudStorage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_3__.getStorage)(app);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Il": () => (/* binding */ AppContext),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export AppProvider */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



const AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const AppProvider = ({ children  })=>{
    const [selectedMovieID, setSelectedMovieID] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [showLoginModal, setShowLoginModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showSignupModal, setShowSignupModal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [showUserDropdown, setShowUserDropdown] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [searchResults, setSearchResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [discoverMovies, setDiscoverMovies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [trendingMovies, setTrendingMovies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [topRatedMovies, setTopRatedMovies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [tvShows, setTvShows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [authenticatedUser, setAuthenticatedUser] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const [savedMovieIDS, setSavedMovieIDS] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [bookmarkedMovies, setBookmarkedMovies] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AppContext.Provider, {
        value: {
            selectedMovieID,
            setSelectedMovieID,
            showLoginModal,
            setShowLoginModal,
            showSignupModal,
            setShowSignupModal,
            searchQuery,
            setSearchQuery,
            searchResults,
            setSearchResults,
            discoverMovies,
            setDiscoverMovies,
            trendingMovies,
            setTrendingMovies,
            tvShows,
            setTvShows,
            topRatedMovies,
            setTopRatedMovies,
            showUserDropdown,
            setShowUserDropdown,
            authenticatedUser,
            setAuthenticatedUser,
            savedMovieIDS,
            setSavedMovieIDS,
            bookmarkedMovies,
            setBookmarkedMovies
        },
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppProvider);


/***/ })

};
;