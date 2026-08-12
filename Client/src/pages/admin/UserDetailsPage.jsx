import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaImages,
  FaCalendarCheck,
  FaHeart,
  FaDownload,
  FaEdit,
  FaVideo,
  FaImage,
  FaEye,
} from "react-icons/fa";
import EditUserDialog from "../../components/admindilog/EditUserDialog";
import { getUserById, userUpdateProfile } from "../../app/auth/authThunk";
import { getAllEventByFilter } from "../../app/event/eventThunk";
import { getMediaByFilter } from "../../app/media/mediaThunk";

const staticAlbums = [
  {
    id: 1,
    title: "Rahul & Priya Wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
    date: "25 May 2026",
  },
  {
    id: 2,
    title: "Engagement Ceremony",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    date: "12 June 2026",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
    date: "18 July 2026",
  },
];

const bookings = [
  {
    id: "BK1001",
    event: "Wedding",
    date: "25 Dec 2026",
    status: "Confirmed",
  },
  {
    id: "BK1002",
    event: "Reception",
    date: "28 Dec 2026",
    status: "Pending",
  },
];

const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userMedia, setUserMedia] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);

  const albumsRef = useRef(null);

  const fetchUserDetails = async () => {
    if (!id) return;
    setLoadingUser(true);
    try {
      const res = await dispatch(getUserById(id)).unwrap();
      if (res?.success) {
        setUserData(res.data);
      }
    } catch (err) {
      toast.error(err?.message || "Failed to fetch user details");
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchUserAlbums = async () => {
    if (!id) return;
    setLoadingAlbums(true);
    try {
      const [eventsRes, mediaRes] = await Promise.all([
        dispatch(getAllEventByFilter({ userId: id, limit: 100 })).unwrap(),
        dispatch(getMediaByFilter({ userId: id, limit: 100 })).unwrap(),
      ]);

      if (eventsRes?.success) {
        setUserAlbums(eventsRes.data || []);
      }
      if (mediaRes?.success) {
        setUserMedia(mediaRes.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch user albums/media:", err);
    } finally {
      setLoadingAlbums(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAlbums();
  }, [id]);

  const handleUpdate = async (updatedUser) => {
    const result = await dispatch(
      userUpdateProfile({
        userId: id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        profileImage: updatedUser.profileImage,
      })
    );

    if (userUpdateProfile.fulfilled.match(result)) {
      toast.success("User updated successfully");
      setOpenEdit(false);
      fetchUserDetails();
    } else {
      toast.error(result.payload?.message || "Failed to update user");
    }
  };

  const scrollToAlbums = () => {
    if (albumsRef.current) {
      albumsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formattedJoinedDate = userData?.createdAt
    ? new Date(userData.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "15 Jan 2026";

  return (
    <div className="space-y-8">
      {/* Edit User Dialog */}
      <EditUserDialog
        open={openEdit}
        user={userData}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdate}
      />

      {/* Back */}
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold"
      >
        <FaArrowLeft />
        Back to Users
      </Link>

      {/* Profile */}
      <div className="bg-white rounded-2xl shadow p-8">
        {loadingUser ? (
          <div className="text-center py-10 text-gray-500">
            Loading user profile...
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <img
              src={
                userData?.profileImage ||
                "https://i.pravatar.cc/200?img=11"
              }
              alt={userData?.name || "User Avatar"}
              className="w-40 h-40 rounded-full object-cover border-4 border-purple-500"
            />

            <div className="flex-1">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl font-bold">
                    {userData?.name || "Dinkar Paswan"}
                  </h1>

                  <p className="text-gray-500 mt-2">
                    {userData?.userType || "Registered User"}
                  </p>
                </div>

                <button
                  onClick={() => setOpenEdit(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition"
                >
                  <FaEdit />
                  Edit User
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-purple-600" />
                  {userData?.email || "dinkar@gmail.com"}
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-600" />
                  {userData?.phoneNumber || "+91 9876543210"}
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-500" />
                  {userData?.address || "Begusarai, Bihar"}
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-600" />
                  Joined : {formattedJoinedDate}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={scrollToAlbums}
          className="bg-white rounded-2xl shadow p-6 text-center cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <FaImages className="text-4xl text-purple-600 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">
            {userAlbums.length}
          </h2>

          <p className="text-gray-600 text-sm mt-1">Total Albums</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <FaCalendarCheck className="text-4xl text-green-600 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">5</h2>

          <p className="text-gray-600 text-sm mt-1">Total Bookings</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <FaHeart className="text-4xl text-pink-600 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">124</h2>

          <p className="text-gray-600 text-sm mt-1">Favorites</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <FaDownload className="text-4xl text-orange-500 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">
            {userMedia.length}
          </h2>

          <p className="text-gray-600 text-sm mt-1">Total Media</p>
        </div>
      </div>

      {/* Albums */}
      <div ref={albumsRef} id="user-albums-section" className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Albums</h2>

          <Link
            to={`/admin/albums?userId=${id}`}
            className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1"
          >
            View All
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {loadingAlbums ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              Loading user albums...
            </div>
          ) : userAlbums.length > 0 ? (
            userAlbums.map((album) => {
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

              const albumMediaList = userMedia.filter(
                (m) => String(m.eventId?._id || m.eventId) === String(album._id)
              );

              const firstMedia = albumMediaList[0];

              return (
                <div
                  key={album._id}
                  className="rounded-xl overflow-hidden border hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div className="relative">
                    {firstMedia ? (
                      firstMedia.videosOrImageUrlType === "Video" ? (
                        <div className="relative bg-black h-52 overflow-hidden flex items-center justify-center">
                          <video
                            src={firstMedia.videosOrImageUrl}
                            controls
                            className="w-full h-52 object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-red-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium z-10 pointer-events-none">
                            <FaVideo /> Video
                          </span>
                        </div>
                      ) : (
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={firstMedia.videosOrImageUrl || firstMedia.thumbnail}
                            alt={albumTitle}
                            className="w-full h-52 object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-purple-600/90 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium z-10">
                            <FaImage /> Photo
                          </span>
                        </div>
                      )
                    ) : (
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={
                            album.thumbnail ||
                            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600"
                          }
                          alt={albumTitle}
                          className="w-full h-52 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{albumTitle}</h3>

                      <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm">
                        <span>{albumDate}</span>
                        {albumMediaList.length > 0 && (
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                            {albumMediaList.length} {albumMediaList.length === 1 ? "media" : "media items"}
                          </span>
                        )}
                      </div>

                      {album.location && (
                        <p className="text-gray-400 text-xs mt-1">
                          📍 {album.location}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/admin/albums?eventId=${album._id}`}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2.5 rounded-xl font-medium transition text-sm flex items-center justify-center gap-2"
                      >
                        <FaEye /> View Album
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            staticAlbums.map((album) => (
              <div
                key={album.id}
                className="rounded-xl overflow-hidden border hover:shadow-lg transition flex flex-col justify-between"
              >
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold">{album.title}</h3>

                    <p className="text-gray-500 mt-2 text-sm">{album.date}</p>
                  </div>

                  <Link
                    to="/admin/albums"
                    className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg block font-medium transition"
                  >
                    View Album
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking History */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Booking History</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Booking ID</th>

                <th className="text-left p-4">Event</th>

                <th className="text-left p-4">Date</th>

                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-4">{booking.id}</td>

                  <td className="p-4">{booking.event}</td>

                  <td className="p-4">{booking.date}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;