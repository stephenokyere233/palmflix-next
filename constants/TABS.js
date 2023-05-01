import { FaBars, FaFire, FaHome, FaSearch, FaTv } from "react-icons/fa"
import { BiMovie } from "react-icons/bi"
export const TABS = [
    {
        name: "Discover",
        icon: FaHome,
        route: "/"
    },
    {
        name: "Trending",
        icon: FaFire,
        route: "/trending"
    },
    {
        name: "TV Shows",
        icon: FaTv,
        route: "/tv_shows"

    },
    {
        name: "Top Rated",
        icon: BiMovie,
        route: "/top_rated"
    },
]