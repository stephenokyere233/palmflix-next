import React, { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedMovieID, setSelectedMovieID] = useState(null)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    const [showUserDropdown, setShowUserDropdown] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [discoverMovies, setDiscoverMovies] = useState([])
    const [trendingMovies, setTrendingMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [tvShows, setTvShows] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [authenticatedUser, setAuthenticatedUser] = React.useState(null)
    const [savedMovieIDS, setSavedMovieIDS] = useState([])
    const [bookmarkedMovies, setBookmarkedMovies] = useState([])
    const [showSidebar, setShowSidebar] = useState(false)
    const [currentMovies, setCurrentMovies] = useState([])


    return (
        <AppContext.Provider
            value={{
                selectedMovieID, setSelectedMovieID,
                showLoginModal, setShowLoginModal,
                showSignupModal, setShowSignupModal,
                searchQuery, setSearchQuery,
                searchResults, setSearchResults,
                discoverMovies, setDiscoverMovies,
                trendingMovies, setTrendingMovies,
                tvShows, setTvShows,
                topRatedMovies, setTopRatedMovies,
                showUserDropdown, setShowUserDropdown,
                authenticatedUser, setAuthenticatedUser,
                savedMovieIDS, setSavedMovieIDS,
                bookmarkedMovies, setBookmarkedMovies,
                upcomingMovies, setUpcomingMovies,
                currentMovies, setCurrentMovies,
                showSidebar, setShowSidebar
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;