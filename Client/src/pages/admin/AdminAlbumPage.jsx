import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaImages,
  FaImage,
  FaVideo,
  FaEye,
  FaDownload,
  FaCircle,
  FaArrowRight,
} from "react-icons/fa";
import Pagination from "../../components/common/Pagination";
import {
  getMediaByFilter,
  toggleDownload,
  deleteMedia,
  toggleMediaActive,
} from "../../app/media/mediaThunk";
import { getAllEventByFilter } from "../../app/event/eventThunk";
import { getEventCategoryByFilter } from "../../app/category/categoryThunk";
import { getSubCategoryByFilter } from "../../app/subcategory/subcategoryThunk";

const AdminAlbumPage = () => {
  const dispatch = useDispatch();
  const { medias = [], pagination = {}, loading } = useSelector(
    (state) => state.media
  );
  const { eventCategories = [] } = useSelector(
    (state) => state.eventCategory
  );
  const { subCategories = [] } = useSelector((state) => state.subCategory);
  const { events = [] } = useSelector((state) => state.event);

  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState("All");
  const [downloadFilter, setDownloadFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [subCategoryFilter, setSubCategoryFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    dispatch(
      getEventCategoryByFilter({
        page: 1,
        limit: 100,
      })
    );
    dispatch(
      getAllEventByFilter({
        page: 1,
        limit: 100,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (categoryFilter !== "All") {
      dispatch(
        getSubCategoryByFilter({
          categoryId: categoryFilter,
          page: 1,
          limit: 100,
        })
      );
    }
  }, [dispatch, categoryFilter]);

  const buildFilterParams = () => {
    const params = { page, limit };

    if (search.trim()) params.search = search.trim();
    if (mediaType !== "All") params.mediaType = mediaType;
    if (downloadFilter !== "All") {
      params.isDownloadable = downloadFilter === "Enabled" ? "true" : "false";
    }

    if (statusFilter !== "All") {
      params.isActive = statusFilter === "Active" ? "true" : "false";
    }

    if (eventFilter !== "All") {
      params.eventId = eventFilter;
    } else if (subCategoryFilter !== "All") {
      params.eventSubCategoryId = subCategoryFilter;
    } else if (categoryFilter !== "All") {
      params.categoryId = categoryFilter;
    }

    return params;
  };

  useEffect(() => {
    dispatch(getMediaByFilter(buildFilterParams()));
  }, [dispatch, search, mediaType, downloadFilter, statusFilter, page, limit, categoryFilter, subCategoryFilter, eventFilter]);

  const handleToggleDownload = async (mediaId) => {
    await dispatch(toggleDownload(mediaId));
    dispatch(getMediaByFilter(buildFilterParams()));
  };

  const handleToggleActive = async (mediaId) => {
    await dispatch(toggleMediaActive(mediaId));
    dispatch(getMediaByFilter(buildFilterParams()));
  };

  const handleDeleteMedia = async (mediaId) => {
    await dispatch(deleteMedia(mediaId));
    dispatch(getMediaByFilter(buildFilterParams()));
  };

  const eventLabel = (item) => {
    const event = item.eventId;
    if (!event) return "No event";
    const names = [event.brideName, event.groomName].filter(Boolean).join(" & ");
    return names || event.location || "Unnamed event";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-gray-500 mt-2">
            Manage all uploaded media with search, filters, and pagination.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search media..."
              className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="font-semibold">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setSubCategoryFilter("All");
                setEventFilter("All");
                setPage(1);
              }}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="All">All Categories</option>
              {eventCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Sub Category</label>
            <select
              value={subCategoryFilter}
              onChange={(e) => {
                setSubCategoryFilter(e.target.value);
                setEventFilter("All");
                setPage(1);
              }}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="All">All Sub Categories</option>
              {subCategories
                .filter((item) =>
                  categoryFilter === "All"
                    ? true
                    : item.categoryId?._id === categoryFilter,
                )
                .map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Event</label>
            <select
              value={eventFilter}
              onChange={(e) => {
                setEventFilter(e.target.value);
                setPage(1);
              }}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="All">All Events</option>
              {events
                .filter((item) => {
                  if (categoryFilter !== "All" && item.eventSubCategoryId?.categoryId?._id !== categoryFilter) {
                    return false;
                  }
                  if (subCategoryFilter !== "All" && item.eventSubCategoryId?._id !== subCategoryFilter) {
                    return false;
                  }
                  return true;
                })
                .map((event) => {
                  const label = event.brideName || event.groomName
                    ? `${event.brideName || ""} ${event.groomName || ""}`.trim()
                    : event.location || "Unnamed event";

                  return (
                    <option key={event._id} value={event._id}>
                      {label}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4 mt-4">
          <div>
            <label className="font-semibold">Media Type</label>
            <select
              value={mediaType}
              onChange={(e) => {
                setMediaType(e.target.value);
                setPage(1);
              }}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="All">All</option>
              <option value="Image">Images</option>
              <option value="Video">Videos</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Download Permission</label>
            <select
              value={downloadFilter}
              onChange={(e) => {
                setDownloadFilter(e.target.value);
                setPage(1);
              }}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="All">All</option>
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Page Size</label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full rounded-2xl bg-white p-10 text-center text-gray-500 shadow">
            Loading media...
          </div>
        ) : medias.length === 0 ? (
          <div className="col-span-full rounded-2xl bg-white p-10 text-center text-gray-500 shadow">
            No media found.
          </div>
        ) : (
          medias.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <div className="relative">
                {item.videosOrImageUrlType === "Video" ? (
                  <video
                    src={item.videosOrImageUrl}
                    controls
                    className="w-full h-56 object-cover bg-black"
                  />
                ) : (
                  <img
                    src={item.videosOrImageUrl}
                    alt={eventLabel(item)}
                    className="w-full h-56 object-cover"
                  />
                )}

                <span className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <FaCircle
                    className={
                      item.videosOrImageUrlType === "Image"
                        ? "text-green-300"
                        : "text-red-300"
                    }
                  />
                  {item.videosOrImageUrlType}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <div className="text-sm text-gray-500">{eventLabel(item)}</div>
                  <div className="text-base font-semibold">
                    {item.eventId?.eventSubCategoryId?.name || "No category"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1">
                    <FaImages />
                    {item.videosOrImageUrlType}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1">
                    <FaDownload />
                    {item.isDownloadable ? "Download Enabled" : "Download Disabled"}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleDownload(item._id)}
                    className="w-full rounded-xl bg-purple-600 text-white py-3 hover:bg-purple-700 transition"
                  >
                    {item.isDownloadable ? "Disable Download" : "Enable Download"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleActive(item._id)}
                    className={`w-full rounded-xl py-3 transition ${
                      item.isActive
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {item.isActive ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteMedia(item._id)}
                    className="w-full rounded-xl bg-red-600 text-white py-3 hover:bg-red-700 transition"
                  >
                    Delete Media
                  </button>

                  <Link
                    to={`/admin/media/${item._id}`}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-xl border border-purple-600 text-purple-600 py-3 hover:bg-purple-50 transition"
                  >
                    View Media <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        currentPage={pagination.currentPage || 1}
        totalPages={pagination.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default AdminAlbumPage;
