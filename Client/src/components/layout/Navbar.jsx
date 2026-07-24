import { NavLink } from "react-router-dom";

const Navbar = () => {
  const menus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Albums",
      path: "/albums",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/support",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Favorites",
      path: "favorites",
    },

    {
      name: "Book Now",
      path: "book",
    },
  ];

  return (
    <nav className="hidden lg:flex gap-8">
      {menus.map((menu, index) => (
        <NavLink
          key={index}
          to={menu.path}
          className={({ isActive }) =>
            isActive
              ? "text-purple-600 font-semibold"
              : "text-gray-700 hover:text-purple-600"
          }
        >
          {menu.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
