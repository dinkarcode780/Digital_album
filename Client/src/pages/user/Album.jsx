// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const albums = [
//   {
//     id: 1,
//     title: "Rahul & Priya Wedding",
//     date: "25 May 2024",
//     photos: 86,
//     videos: 42,
//     image:
//       "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
//   },
//   {
//     id: 2,
//     title: "Ankit & Neha Engagement",
//     date: "18 May 2024",
//     photos: 52,
//     videos: 20,
//     image:
//       "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
//   },
//   {
//     id: 3,
//     title: "Birthday Celebration",
//     date: "10 May 2024",
//     photos: 120,
//     videos: 15,
//     image:
//       "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
//   },
//   {
//     id: 4,
//     title: "Pre Wedding Shoot",
//     date: "05 May 2024",
//     photos: 45,
//     videos: 18,
//     image:
//       "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600",
//   },
//   {
//     id: 5,
//     title: "Haldi Ceremony",
//     date: "02 May 2024",
//     photos: 74,
//     videos: 30,
//     image:
//       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",
//   },
//   {
//     id: 6,
//     title: "Reception",
//     date: "30 Apr 2024",
//     photos: 95,
//     videos: 28,
//     image:
//       "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
//   },
// ];

// const Album = () => {
//   const [filter, setFilter] = useState("All");
//   return (
//     <div className="max-w-7xl mx-auto px-5 py-8">

//       {/* Heading */}

//       <div className="flex flex-col md:flex-row justify-between gap-4 items-center">

//         <div>
//           <h1 className="text-3xl font-bold">My Albums</h1>
//           <p className="text-gray-500">
//             Browse all your albums
//           </p>
//         </div>

//         <input
//           type="text"
//           placeholder="Search Album..."
//           className="border rounded-lg px-4 py-2 w-full md:w-72 outline-none focus:ring-2 focus:ring-purple-500"
//         />

//       </div>

//       {/* Filter */}

//       <div className="flex gap-3 mt-8 overflow-x-auto">

//         {/* <button className="bg-purple-600 text-white px-5 py-2 rounded-full">
//           All
//         </button> */}

//          <button
//     onClick={() => setFilter("All")}
//     className={`px-5 py-2 rounded-full ${
//       filter === "All"
//         ? "bg-purple-600 text-white"
//         : "border"
//     }`}
//   >
//     All
//   </button>

//         {/* <button className="border px-5 py-2 rounded-full">
//           Wedding
//         </button> */}

//         {/* <button className="border px-5 py-2 rounded-full">
//           Engagement
//         </button> */}

//         {/* <button className="border px-5 py-2 rounded-full">
//           Birthday
//         </button> */}

//           <button
//     onClick={() => setFilter("Wedding")}
//     className={`px-5 py-2 rounded-full ${
//       filter === "Wedding"
//         ? "bg-purple-600 text-white"
//         : "border"
//     }`}
//   >
//     Wedding
//   </button>

//   <button
//     onClick={() => setFilter("Engagement")}
//     className={`px-5 py-2 rounded-full ${
//       filter === "Engagement"
//         ? "bg-purple-600 text-white"
//         : "border"
//     }`}
//   >
//     Engagement
//   </button>

//   <button
//     onClick={() => setFilter("Birthday")}
//     className={`px-5 py-2 rounded-full ${
//       filter === "Birthday"
//         ? "bg-purple-600 text-white"
//         : "border"
//     }`}
//   >
//     Birthday
//   </button>

//   <button
//     onClick={() => setFilter("Cinematic")}
//     className={`px-5 py-2 rounded-full ${
//       filter === "Cinematic"
//         ? "bg-purple-600 text-white"
//         : "border"
//     }`}
//   >
//     Cinematic
//   </button>



//       </div>

//       {/* Albums */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8">

//         {albums.map((album) => (

//           <div
//             key={album.id}
//             className="rounded-xl overflow-hidden shadow hover:shadow-xl duration-300 bg-white"
//           >

//             <img
//               src={album.image}
//               alt={album.title}
//               className="w-full h-56 object-cover"
//             />

//             <div className="p-5">

//               <h2 className="font-bold text-lg">
//                 {album.title}
//               </h2>

//               <p className="text-gray-500 text-sm mt-1">
//                 {album.date}
//               </p>

//               <div className="flex gap-5 mt-4 text-gray-600 text-sm">

//                 <span>📷 {album.photos}</span>

//                 <span>🎥 {album.videos}</span>

//               </div>

//               {/* <Link
//   to={`/albums/${album.id}`}
//   className="block mt-5"
// >
//   <button
//     className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
//   >
//     View Album
//   </button>
// </Link> */}

// <Link
//   to={`/albums/${album.id}`}
//   state={{ album }}
//   className="block w-full mt-5 bg-purple-600 text-white py-2 rounded-lg text-center hover:bg-purple-700"
// >
//   View Album
// </Link>

//               {/* <button
//                 className="mt-5 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
//               >
//                 View Album
//               </button> */}

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// };

// export default Album;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaVideo,
  FaImage,
  FaSpinner,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";
import { getAllEventByFilter } from "../../app/event/eventThunk";
import { getEventCategoryByFilter } from "../../app/category/categoryThunk";
import { getMediaByFilter } from "../../app/media/mediaThunk";
import Pagination from "../../components/common/Pagination";

const Album = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events = [], pagination = {}, loading } = useSelector(
    (state) => state.event
  );
  const { eventCategories = [] } = useSelector((state) => state.eventCategory);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [userMedia, setUserMedia] = useState([]);

  // Fetch categories & media for counts
  useEffect(() => {
    dispatch(getEventCategoryByFilter({ page: 1, limit: 100 }));
    dispatch(getMediaByFilter({ page: 1, limit: 500 }))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          setUserMedia(res.data || []);
        }
      })
      .catch(() => {});
  }, [dispatch]);

  // Fetch events on filter/search/page change
  useEffect(() => {
    const params = {
      page,
      limit,
    };

    if (user?._id && user?.userType !== "Admin") {
      params.userId = user._id;
    }

    if (search.trim()) {
      params.search = search.trim();
    }

    if (selectedCategory !== "All") {
      params.categoryId = selectedCategory;
    }

    dispatch(getAllEventByFilter(params));
  }, [dispatch, search, selectedCategory, page, limit, user]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      {/* Heading & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div>
          <h1 className="text-3xl font-bold">My Albums</h1>
          <p className="text-gray-500 mt-1">Browse all your albums</p>
        </div>

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search Album..."
            className="border rounded-xl pl-10 pr-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex gap-3 mt-8 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
            selectedCategory === "All"
              ? "bg-purple-600 text-white shadow-md"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          All
        </button>

        {eventCategories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryChange(category._id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              selectedCategory === category._id
                ? "bg-purple-600 text-white shadow-md"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Page Limit Selector & Summary */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <div>
          Showing {events.length} of {pagination.totalRecords || events.length} albums
        </div>
        <div className="flex items-center gap-2">
          <span>Per Page:</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded-lg px-2 py-1 outline-none bg-white"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      {/* Albums Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-purple-600">
          <FaSpinner className="animate-spin text-4xl mb-3" />
          <p className="text-gray-500 font-medium">Loading albums...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border mt-8">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            📷
          </div>
          <h3 className="text-xl font-bold text-gray-800">No Albums Found</h3>
          <p className="text-gray-500 mt-2">
            No albums match your search or filter criteria.
          </p>
          {(search || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setPage(1);
              }}
              className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-6">
          {events.map((album) => {
            const albumTitle =
              [album.brideName, album.groomName].filter(Boolean).join(" & ") ||
              album.eventSubCategoryId?.name ||
              album.location ||
              "Album Event";

            const albumDate = album.eventDate
              ? new Date(album.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Date N/A";

            const eventMediaList = userMedia.filter(
              (m) => String(m.eventId?._id || m.eventId) === String(album._id)
            );

            const photosCount = eventMediaList.filter(
              (m) => m.videosOrImageUrlType === "Image" || !m.videosOrImageUrlType
            ).length;

            const videosCount = eventMediaList.filter(
              (m) => m.videosOrImageUrlType === "Video"
            ).length;

            const firstMedia = eventMediaList[0];

            return (
              <div
                key={album._id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl duration-300 bg-white border border-gray-100 flex flex-col justify-between"
              >
                <div className="relative">
                  {firstMedia ? (
                    firstMedia.videosOrImageUrlType === "Video" ? (
                      <div className="relative bg-black h-56 flex items-center justify-center overflow-hidden">
                        <video
                          src={firstMedia.videosOrImageUrl}
                          controls
                          controlsList={firstMedia.isDownloadable ? undefined : "nodownload"}
                          disablePictureInPicture={!firstMedia.isDownloadable}
                          onContextMenu={(e) => !firstMedia.isDownloadable && e.preventDefault()}
                          className="w-full h-56 object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-red-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium pointer-events-none z-10">
                          <FaVideo /> Video
                        </span>

                        {firstMedia.isDownloadable && (
                          <a
                            href={firstMedia.videosOrImageUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Download Video"
                            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10 transition backdrop-blur-sm shadow-md"
                          >
                            <FaDownload className="text-xs" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={firstMedia.videosOrImageUrl || firstMedia.thumbnail}
                          alt={albumTitle}
                          onContextMenu={(e) => !firstMedia.isDownloadable && e.preventDefault()}
                          className="w-full h-56 object-cover hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-purple-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium z-10">
                          <FaImage /> Photo
                        </span>

                        {firstMedia.isDownloadable && (
                          <a
                            href={firstMedia.videosOrImageUrl || firstMedia.thumbnail}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Download Photo"
                            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10 transition backdrop-blur-sm shadow-md"
                          >
                            <FaDownload className="text-xs" />
                          </a>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={
                          album.thumbnail ||
                          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600"
                        }
                        alt={albumTitle}
                        className="w-full h-56 object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-xl text-gray-800">{albumTitle}</h2>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                      <FaCalendarAlt className="text-purple-500" />
                      <span>{albumDate}</span>
                    </div>

                    {album.location && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>{album.location}</span>
                      </div>
                    )}

                    <div className="flex gap-5 mt-4 text-gray-700 text-sm font-medium bg-purple-50 p-2.5 rounded-xl">
                      <span className="flex items-center gap-1">
                        📷 {photosCount} Photos
                      </span>
                      <span className="flex items-center gap-1">
                        🎥 {videosCount} Videos
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/albums/${album._id}`}
                    state={{ album, albumMediaList: eventMediaList }}
                    className="block w-full mt-5 bg-purple-600 text-white py-2.5 rounded-xl text-center font-semibold hover:bg-purple-700 transition shadow-md hover:shadow-purple-200"
                  >
                    View Album
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && events.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage || page}
          totalPages={pagination.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default Album;