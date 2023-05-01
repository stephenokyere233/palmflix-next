"use strict";
exports.id = 801;
exports.ids = [801];
exports.modules = {

/***/ 6801:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ removeBookmark),
/* harmony export */   "r": () => (/* binding */ fetchBookmarks)
/* harmony export */ });
/* harmony import */ var _config_firebase_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8452);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__]);
([_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


async function fetchBookmarks() {
    const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__/* .firestoreDB */ .mz, `user_bookmarks/${_config_firebase_config__WEBPACK_IMPORTED_MODULE_0__/* .firebaseAuth.currentUser */ .lX.currentUser?.uid}`);
    const subCollectionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(docRef, `saved_bookmarks`);
    const movieIDS_ = [];
    const savedMoviesData_ = [];
    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)(subCollectionRef, (querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            movieIDS_.push(doc.data().id);
            savedMoviesData_.push(doc.data());
        });
        const movieIDSToSave = new Set(movieIDS_);
        const parsedIDSTOSave = Array.from(movieIDSToSave);
        localStorage.setItem("savedMovies", JSON.stringify(parsedIDSTOSave));
        const movieIDSDataToSave = new Set(savedMoviesData_);
        const parsedMovieIDSDataToSave = Array.from(movieIDSDataToSave);
        localStorage.setItem("savedMoviesData", JSON.stringify(parsedMovieIDSDataToSave));
    });
    return {
        movieIDS_,
        savedMoviesData_
    };
}
async function removeBookmark(movieID, collectionRef) {
    let updatedSavedMovies;
    try {
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(collectionRef, movieID));
        console.log("Item removed from Firestore");
        const savedMovies = localStorage.getItem("savedMovies");
        if (savedMovies) {
            try {
                const parsedData = JSON.parse(savedMovies);
                if (Array.isArray(parsedData)) {
                    const updatedSavedMovies_ = parsedData.filter((id)=>id !== movieID);
                    localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies_));
                    console.log("Item removed from localStorage savedMovies");
                    updatedSavedMovies = updatedSavedMovies_;
                }
            } catch (error) {
                console.error("Error parsing stored savedMovies data:", error);
            }
        }
        const savedMoviesData = localStorage.getItem("savedMoviesData");
        if (savedMoviesData) {
            try {
                const parsedData = JSON.parse(savedMoviesData);
                if (Array.isArray(parsedData)) {
                    const updatedSavedMoviesData = parsedData.filter((movie)=>movie.id !== movieID);
                    localStorage.setItem("savedMoviesData", JSON.stringify(updatedSavedMoviesData));
                    console.log("Item removed from localStorage savedMoviesData");
                }
            } catch (error) {
                console.error("Error parsing stored savedMoviesData data:", error);
            }
        }
    } catch (error) {
        throw error;
    }
    return updatedSavedMovies;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;