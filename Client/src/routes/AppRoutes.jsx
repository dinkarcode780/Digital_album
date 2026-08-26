
// import { Routes, Route } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";

// import Dashboard from "../pages/user/Dashboard";
// import Album from "../pages/user/Album";
// import AlbumDetails from "../pages/user/AlbumDetails";
// import Favorites from "../pages/user/Favorites";
// import Downloads from "../pages/user/Downloads";
// import Invites from "../pages/user/Invites";
// import Notification from "../pages/user/Notification";
// import Profile from "../pages/user/Profile";
// import Services from "../pages/user/Services";
// import Testimonials from "../pages/user/Testimonials";
// import About from "../pages/user/About";
// import Blog from "../pages/user/Blog";
// import Support from "../pages/user/Support";
// import BlogDetails from "../pages/user/BlogDetails";
// import Booking from "../pages/user/Booking";
// import BookingDetails from "../pages/user/BookingDetails";
// import AdminLayout from "../layouts/AdminLayout";
// // import Users from "../pages/admin/Users";
// import BookingPage from "../pages/admin/BookingPage";
// import AdminDashboard from "../pages/admin/AdminDashboard";
// import Categories from "../pages/admin/CategoriesPage";
// import SubCategory from "../pages/admin/SubCategoryPage";
// import UsersPage from "../pages/admin/UsersPage";
// import AdminMedia from "../pages/admin/AdminMedia";
// import ServicesPage from "../pages/admin/ServicesPage"
// import ReportsPage from "../pages/admin/ReportsPage";
// import AdminSettings from "../pages/admin/AdminSettings";
// import ProfilePage from "../pages/admin/ProfilePage";
// import NotificationsPage from "../pages/admin/NotificationsPage";
// import UserDetailsPage from "../pages/admin/UserDetailsPage";
// import AdminAlbumPage  from "../pages/admin/AdminAlbumPage";
// import AdminAlbumDetailsPage from "../pages/admin/AdminAlbumDetailsPage";
// import EventPage from "../pages/admin/EventPage";
// import PrivacyAndSecurity from "../pages/admin/PrivacyAndSecurity";
// import Login from "../components/common/Login";
// import Register from "../components/common/Register";



// const AppRoutes = () => {
//   return (
//     <Routes>

//       {/* Public */}

//       {/* <Route element={<PublicRoute />}>
      
//       </Route> */}

//       <Route path="/" element={<Login />} />

//       <Route path="/users/register" element={<Register />} />


//       {/* User */}

//       <Route element={<MainLayout />}>

//         <Route path="/user/dashboard" element={<Dashboard />} />

//         <Route path="/albums" element={<Album />} />

//         <Route path="/albums/:id" element={<AlbumDetails />} />

//         <Route path="/favorites" element={<Favorites />} />

//         <Route path="/downloads" element={<Downloads />} />

//         <Route path="/invites" element={<Invites />} />

//         <Route path="/notifications" element={<Notification />} />

//         <Route path="/profile" element={<Profile />} />

//         <Route path="/services" element={<Services />} />

//         <Route path="/testimonials" element={<Testimonials />} />

//         <Route path="/about" element={<About />} />

//         <Route path="/services" element={<Services />} />

//         <Route path="/blog" element={<Blog />} />
//         <Route path="/blog/:id" element={<BlogDetails />} />

//         <Route path="/book" element={<Booking />} />
//         <Route path="/booking-details" element={<BookingDetails />} />

//         <Route path="/support" element={<Support />} />

//       </Route>


//       {/* ================= ADMIN ROUTES ================= */}

// {/* <Route element={<PrivateRoute />}> */}

//   {/* <Route element={<RoleRoute role="Admin" />}> */}

//     <Route element={<AdminLayout />}>

//       <Route
//         path="/admin/dashboard"
//         element={<AdminDashboard />}
//       />

//       <Route
//         path="/admin/bookings"
//         element={<BookingPage />}
//       />

//       <Route
//         path="/admin/bookings/:id"
//         element={<BookingDetails />}
//       />

//       <Route
//         path="/admin/users"
//         element={<UsersPage/>}
//       />

//       <Route
//   path="/admin/users/details/:id"
//   element={<UserDetailsPage/>}
// />

//       <Route
//         path="/admin/categories"
//         element={<Categories />}
//       />

//       <Route
//         path="/admin/sub-categories"
//         element={<SubCategory />}
//       />

//       <Route
//         path="/admin/media"
//         element={<AdminMedia />}
//       />

//       <Route path="/admin/events" element={<EventPage />} />
//       <Route path="/admin/events/create" element={<EventPage />} />


// <Route
//   path="/admin/albums"
//   element={<AdminAlbumPage />}
// />
// <Route
//   path="/admin/albums/:id"
//   element={<AdminAlbumDetailsPage />}
// />

//       <Route
//         path="/admin/services"
//         element={<ServicesPage />}
//       />

//       <Route
//         path="/admin/reports"
//         element={<ReportsPage />}
//       />

//       <Route
//         path="/admin/settings"
//         element={<AdminSettings />}
//       />
//       <Route path="/admin/resetpassword" element={< PrivacyAndSecurity/>}/>

//       <Route
//         path="/admin/profile"
//         element={<ProfilePage />}
//       />

//       <Route
//         path="/admin/notifications"
//         element={<NotificationsPage />}
//       />

//     </Route>

//   {/* </Route> */}

// {/* </Route> */}

//     </Routes>
//   );
// };

// export default AppRoutes;


import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public
import Login from "../components/common/Login";
import Register from "../components/common/Register";

// User Pages
import Dashboard from "../pages/user/Dashboard";
import Album from "../pages/user/Album";
import AlbumDetails from "../pages/user/AlbumDetails";
import Favorites from "../pages/user/Favorites";
import Downloads from "../pages/user/Downloads";
import Invites from "../pages/user/Invites";
import Notification from "../pages/user/Notification";
import Profile from "../pages/user/Profile";
import Services from "../pages/user/Services";
import Testimonials from "../pages/user/Testimonials";
import About from "../pages/user/About";
import Blog from "../pages/user/Blog";
import BlogDetails from "../pages/user/BlogDetails";
import Booking from "../pages/user/Booking";
import BookingDetails from "../pages/user/BookingDetails";
import Support from "../pages/user/Support";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import BookingPage from "../pages/admin/BookingPage";
import Categories from "../pages/admin/CategoriesPage";
import SubCategory from "../pages/admin/SubCategoryPage";
import UsersPage from "../pages/admin/UsersPage";
import UserDetailsPage from "../pages/admin/UserDetailsPage";
import AdminMedia from "../pages/admin/AdminMedia";
import EventPage from "../pages/admin/EventPage";
import AdminAlbumPage from "../pages/admin/AdminAlbumPage";
import AdminAlbumDetailsPage from "../pages/admin/AdminAlbumDetailsPage";
import ServicesPage from "../pages/admin/ServicesPage";
import ReportsPage from "../pages/admin/ReportsPage";
import AdminSettings from "../pages/admin/AdminSettings";
import NotificationsPage from "../pages/admin/NotificationsPage";
import ProfilePage from "../pages/admin/ProfilePage";
import PrivacyAndSecurity from "../pages/admin/PrivacyAndSecurity";
import ForgetPassword from "../components/common/ForgetPassword";
import AdminInvite from "../pages/admin/AdminInvite";
import InvitePage from "../components/common/InvitePage";
import AdminFavorites from "../pages/admin/AdminFavorites";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
         <Route path="/invite/:token" element={<InvitePage />} />
      </Route>

      {/* ================= USER ================= */}

      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute role="User" />}>
          <Route element={<MainLayout />}>

            <Route path="/user/dashboard" element={<Dashboard />} />

            <Route path="/albums" element={<Album />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />

            <Route path="/favorites" element={<Favorites />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/notifications" element={<Notification />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/services" element={<Services />} />

            <Route path="/testimonials" element={<Testimonials />} />

            <Route path="/about" element={<About />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />

            <Route path="/book" element={<Booking />} />
            <Route
              path="/booking-details"
              element={<BookingDetails />}
            />

            <Route path="/support" element={<Support />} />

          </Route>
        </Route>
      </Route>

      {/* ================= ADMIN ================= */}

      <Route element={<PrivateRoute />}>
        <Route element={<RoleRoute role="Admin" />}>
          <Route element={<AdminLayout />}>

            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/bookings"
              element={<BookingPage />}
            />
  <Route path="/admin/invites" element={<Invites />} />
  <Route path="/admin/admininvite" element={<AdminInvite />} />

            <Route
              path="/admin/bookings/:id"
              element={<BookingDetails />}
            />

            <Route
              path="/admin/users"
              element={<UsersPage />}
            />

            <Route
              path="/admin/users/details/:id"
              element={<UserDetailsPage />}
            />

            <Route
              path="/admin/categories"
              element={<Categories />}
            />

            <Route
              path="/admin/sub-categories"
              element={<SubCategory />}
            />

            <Route
              path="/admin/media"
              element={<AdminMedia />}
            />

            <Route
              path="/admin/media/:id"
              element={<AdminAlbumDetailsPage />}
            />

            <Route
              path="/admin/events"
              element={<EventPage />}
            />

            <Route
              path="/admin/events/create"
              element={<EventPage />}
            />

            <Route
              path="/admin/albums"
              element={<AdminAlbumPage />}
            />

            <Route
              path="/admin/albums/:id"
              element={<AdminAlbumDetailsPage />}
            />

            <Route
              path="/admin/services"
              element={<ServicesPage />}
            />

            <Route
              path="/admin/reports"
              element={<ReportsPage />}
            />

            <Route
              path="/admin/settings"
              element={<AdminSettings />}
            />

            <Route
              path="/admin/profile"
              element={<ProfilePage />}
            />

            <Route
              path="/admin/resetpassword"
              element={<PrivacyAndSecurity />}
            />

            <Route
              path="/admin/notifications"
              element={<NotificationsPage />}
            />
  <Route path="/admin/adminfavorite" element={<AdminFavorites />} />


          </Route>
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;
