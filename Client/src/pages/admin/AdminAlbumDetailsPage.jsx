import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaTrash,
  FaImage,
  FaVideo,
  FaSearch,
  FaCompress,
  FaExpand,
  FaInfoCircle,
} from "react-icons/fa";
import { getMediaById, toggleDownload, toggleMediaActive, deleteMedia, updateMedia } from "../../app/media/mediaThunk";

const AdminAlbumDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { media, loading } = useSelector((state) => state.media);

  const [search, setSearch] = useState("");
  const [zoomed, setZoomed] = useState(false);
  const [videoSize, setVideoSize] = useState("medium");
  const [newMediaFile, setNewMediaFile] = useState(null);
  const [newThumbnail, setNewThumbnail] = useState(null);
  const [newDownloadable, setNewDownloadable] = useState(false);
  const [newActive, setNewActive] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getMediaById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (media) {
      setNewDownloadable(media.isDownloadable);
      setNewActive(media.isActive);
    }
  }, [media]);

  const handleToggleDownload = async () => {
    if (!media?._id) return;
    await dispatch(toggleDownload(media._id));
    dispatch(getMediaById(media._id));
  };

  const handleToggleActive = async () => {
    if (!media?._id) return;
    await dispatch(toggleMediaActive(media._id));
    dispatch(getMediaById(media._id));
  };

  const handleDelete = async () => {
    if (!media?._id) return;
    await dispatch(deleteMedia(media._id));
  };

  const handleUpdateMedia = async () => {
    if (!media?._id) return;

    const formData = new FormData();
    formData.append("mediaId", media._id);
    formData.append("isDownloadable", newDownloadable);
    formData.append("isActive", newActive);

    if (newMediaFile) {
      formData.append("mediaFile", newMediaFile);
    }
    if (newThumbnail) {
      formData.append("thumbnail", newThumbnail);
    }

    await dispatch(updateMedia(formData));
    dispatch(getMediaById(media._id));
  };

  const eventLabel = (item) => {
    const event = item?.eventId;
    if (!event) return "No event";
    const names = [event.brideName, event.groomName].filter(Boolean).join(" & ");
    return names || event.location || "Unnamed event";
  };

  const objectFitClass =
    videoSize === "small"
      ? "h-56"
      : videoSize === "medium"
      ? "h-80"
      : "h-[420px]";

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <Link
            to="/admin/albums"
            className="text-purple-600 font-semibold flex items-center gap-2 mb-3"
          >
            <FaArrowLeft /> Back
          </Link>
          <h1 className="text-3xl font-bold">{eventLabel(media)}</h1>
          <p className="text-gray-500 mt-2">
            {media?.eventId?.location}
            {media?.eventId?.eventDate
              ? ` • ${new Date(media.eventId.eventDate).toLocaleDateString()}`
              : ""}
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search in media..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white shadow rounded-2xl overflow-hidden">
          <div className="relative bg-black">
            {media?.videosOrImageUrlType === "Video" ? (
              <video
                src={media.videosOrImageUrl}
                controls
                className={`w-full object-cover ${objectFitClass}`}
              />
            ) : (
              <img
                src={media?.videosOrImageUrl}
                alt={eventLabel(media)}
                className={`w-full object-contain ${
                  zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                } ${zoomed ? "h-[720px]" : "h-[420px]"}`}
                onClick={() => setZoomed((prev) => !prev)}
              />
            )}

            <div className="absolute top-3 right-3 flex items-center gap-2">
              {media?.videosOrImageUrlType === "Video" ? (
                <button
                  onClick={() =>
                    setVideoSize((prev) =>
                      prev === "small"
                        ? "medium"
                        : prev === "medium"
                        ? "large"
                        : "small"
                    )
                  }
                  className="bg-white/90 text-gray-700 rounded-full p-2 shadow"
                  title="Toggle video size"
                >
                  {videoSize === "large" ? <FaCompress /> : <FaExpand />}
                </button>
              ) : (
                <button
                  onClick={() => setZoomed((prev) => !prev)}
                  className="bg-white/90 text-gray-700 rounded-full p-2 shadow"
                  title={zoomed ? "Zoom out" : "Zoom in"}
                >
                  {zoomed ? <FaCompress /> : <FaExpand />}
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="p-6 text-gray-500">Loading media...</div>
          )}

          {!loading && !media && (
            <div className="p-6 text-center text-gray-500">
              Media not found.
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-100 text-purple-700 p-3">
              <FaInfoCircle />
            </div>
            <div>
              <p className="text-sm text-gray-500">Media Type</p>
              <p className="font-semibold">{media?.videosOrImageUrlType || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <p className="text-gray-500">Download Permission</p>
              <p className="font-semibold">
                {media?.isDownloadable ? "Enabled" : "Disabled"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Event</p>
              <p className="font-semibold">{eventLabel(media)}</p>
            </div>

            <div>
              <p className="text-gray-500">Sub Category</p>
              <p className="font-semibold">
                {media?.eventId?.eventSubCategoryId?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-semibold">
                {media?.eventId?.eventSubCategoryId?.categoryId?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Update Media File
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setNewMediaFile(e.target.files?.[0] || null)}
              className="w-full border rounded-xl p-3"
            />

            <label className="block text-sm font-semibold text-gray-700">
              Update Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewThumbnail(e.target.files?.[0] || null)}
              className="w-full border rounded-xl p-3"
            />

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={newDownloadable}
                  onChange={(e) => setNewDownloadable(e.target.checked)}
                />
                Downloadable
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={newActive}
                  onChange={(e) => setNewActive(e.target.checked)}
                />
                Active
              </label>
            </div>

            <button
              onClick={handleUpdateMedia}
              className="w-full rounded-xl bg-blue-600 text-white py-3 hover:bg-blue-700 transition"
            >
              Save Updates
            </button>
            <button
              onClick={handleToggleDownload}
              className="w-full rounded-xl bg-purple-600 text-white py-3 hover:bg-purple-700 transition"
            >
              {media?.isDownloadable ? "Disable Download" : "Enable Download"}
            </button>
            <button
              onClick={handleToggleActive}
              className={`w-full rounded-xl py-3 transition ${
                media?.isActive
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {media?.isActive ? "Deactivate Media" : "Activate Media"}
            </button>
            <button
              onClick={handleDelete}
              className="w-full rounded-xl bg-red-600 text-white py-3 hover:bg-red-700 transition"
            >
              Delete Media
            </button>
            <a
              href={media?.videosOrImageUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 rounded-xl border border-gray-200 text-gray-700 py-3 hover:bg-gray-50 transition"
            >
              <FaDownload /> Open in new tab
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlbumDetailsPage;
