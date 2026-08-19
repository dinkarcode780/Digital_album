import { useEffect, useState } from "react";
import { FaArrowLeft, FaImage, FaVideo, FaCheck, FaSpinner, FaDownload } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMediaByFilter } from "../../app/media/mediaThunk";

export default function AlbumDetails() {
  const [selected, setSelected] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const album = location.state?.album;
  const initialMedia = location.state?.albumMediaList;

  useEffect(() => {
    if (initialMedia && initialMedia.length > 0) {
      setMediaList(initialMedia);
      setLoading(false);
    } else if (id) {
      setLoading(true);
      dispatch(getMediaByFilter({ eventId: id, limit: 100 }))
        .unwrap()
        .then((res) => {
          if (res?.success) {
            setMediaList(res.data || []);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id, initialMedia, dispatch]);

  const albumTitle =
    album
      ? [album.brideName, album.groomName].filter(Boolean).join(" & ") ||
        album.eventSubCategoryId?.name ||
        album.location ||
        "Album Event"
      : "Album Details";

  const albumDate = album?.eventDate
    ? new Date(album.eventDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const toggleSelect = (mediaId) => {
    if (selected.includes(mediaId)) {
      setSelected(selected.filter((item) => item !== mediaId));
    } else {
      setSelected([...selected, mediaId]);
    }
  };

  const filteredMedia = mediaList.filter((item) => {
    if (filterType === "Photos" && item.videosOrImageUrlType === "Video")
      return false;
    if (filterType === "Videos" && item.videosOrImageUrlType !== "Video")
      return false;
    if (search.trim()) {
      const query = search.toLowerCase();
      return (
        item.videosOrImageUrlType?.toLowerCase().includes(query) ||
        false
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-purple-600 font-semibold hover:underline"
      >
        <FaArrowLeft />
        Back to Albums
      </button>

      <h1 className="text-3xl font-bold mt-4 text-gray-800">{albumTitle}</h1>

      <p className="text-gray-500 mt-2">
        {albumDate} {album?.location ? `• ${album.location}` : ""}
      </p>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search media in album..."
        className="mt-6 border rounded-xl px-4 py-3 w-full outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* Filter */}
      <div className="flex gap-3 mt-6 flex-wrap">
        <button
          onClick={() => setFilterType("All")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            filterType === "All"
              ? "bg-purple-600 text-white"
              : "border border-gray-200 bg-white text-gray-700"
          }`}
        >
          All ({mediaList.length})
        </button>

        <button
          onClick={() => setFilterType("Photos")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            filterType === "Photos"
              ? "bg-purple-600 text-white"
              : "border border-gray-200 bg-white text-gray-700"
          }`}
        >
          Photos (
          {
            mediaList.filter(
              (m) => m.videosOrImageUrlType === "Image" || !m.videosOrImageUrlType
            ).length
          }
          )
        </button>

        <button
          onClick={() => setFilterType("Videos")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            filterType === "Videos"
              ? "bg-purple-600 text-white"
              : "border border-gray-200 bg-white text-gray-700"
          }`}
        >
          Videos (
          {mediaList.filter((m) => m.videosOrImageUrlType === "Video").length})
        </button>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-purple-600">
          <FaSpinner className="animate-spin text-4xl mb-3" />
          <p className="text-gray-500">Loading album media...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border mt-8">
          <p className="text-gray-500">No media found in this album.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {filteredMedia.map((item) => (
            <div
              key={item._id}
              onClick={() => toggleSelect(item._id)}
              className="relative cursor-pointer group rounded-xl overflow-hidden shadow border bg-black"
            >
              {item.videosOrImageUrlType === "Video" ? (
                <div className="relative h-60 bg-black flex items-center justify-center">
                  <video
                    src={item.videosOrImageUrl}
                    controls
                    controlsList={item.isDownloadable ? undefined : "nodownload"}
                    disablePictureInPicture={!item.isDownloadable}
                    onContextMenu={(e) => !item.isDownloadable && e.preventDefault()}
                    className="rounded-xl w-full h-60 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-600/90 text-white rounded-full p-2 text-xs flex items-center gap-1 font-medium pointer-events-none z-10">
                    <FaVideo /> Video
                  </div>

                  {item.isDownloadable && (
                    <a
                      href={item.videosOrImageUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Download Video"
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full z-10 transition backdrop-blur-sm shadow-md"
                    >
                      <FaDownload className="text-sm" />
                    </a>
                  )}
                </div>
              ) : (
                <div className="relative h-60">
                  <img
                    src={item.videosOrImageUrl || item.thumbnail}
                    alt="Album Media"
                    onContextMenu={(e) => !item.isDownloadable && e.preventDefault()}
                    className="rounded-xl w-full h-60 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-purple-600/90 text-white rounded-full p-2 text-xs flex items-center gap-1 font-medium z-10">
                    <FaImage /> Photo
                  </div>

                  {item.isDownloadable && (
                    <a
                      href={item.videosOrImageUrl || item.thumbnail}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Download Photo"
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full z-10 transition backdrop-blur-sm shadow-md"
                    >
                      <FaDownload className="text-sm" />
                    </a>
                  )}
                </div>
              )}

              {selected.includes(item._id) && (
                <div className="absolute inset-0 bg-purple-700/40 rounded-xl flex justify-center items-center z-20">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <FaCheck className="text-green-600 text-xl" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      {selected.length > 0 && (
        <div className="sticky bottom-5 bg-white shadow-2xl rounded-2xl p-4 flex justify-between items-center mt-10 border border-purple-100 z-30">
          <h2 className="font-bold text-gray-800">
            Selected : <span className="text-purple-600">{selected.length}</span>
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => setSelected([])}
              className="border border-gray-300 hover:bg-gray-50 px-5 py-2 rounded-xl text-sm font-medium transition"
            >
              Clear
            </button>

            <button
              onClick={() => {
                alert(`Selected ${selected.length} items.`);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition shadow-md"
            >
              Save Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}