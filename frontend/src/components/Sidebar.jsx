import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    { name: "Profile", path: "/profile/1" }, // sample user id
  ];

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 hidden md:block">
      <h2 className="font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        {menuItems.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-orange-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
