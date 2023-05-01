import { FaBars, FaFire, FaHome, FaSearch, FaTv } from "react-icons/fa"
import { BiMovie,BiBookBookmark } from "react-icons/bi"
import { MdShowChart } from "react-icons/md"
export const TABS = [
    {
        name: "Home",
        icon: FaHome,
        route: "/"
    },
    {
        name: "Discover",
        icon: MdShowChart,
        route: "/discover"
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
    {
        name: "Saved Trailers",
        icon: BiBookBookmark,
        route: "/bookmarks"
    },
]