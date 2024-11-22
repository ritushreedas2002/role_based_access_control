
// import React, { useState } from "react";
// import { LayoutDashboard, Code, Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const navigationItems = {
//   admin: [
//     { icon: <LayoutDashboard />, label: "Dashboard", route: "/admin" },
//     { icon: <Code />, label: "Project Management", route: "/developer" },
//   ],
//   developer: [
//     { icon: <Code />, label: "Project Management", route: "/developer" },
//   ],
//   client: [
//     { icon: <Code />, label: "Projects", route: "/client" },
//   ],
// };

// const RoleBasedNavigation = ({ userRole }) => {
//   const [activeRoute, setActiveRoute] = useState("/");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const role = navigationItems[userRole] ? userRole : "client";
//   const items = navigationItems[role];

//   const handleNavigation = (route) => {
//     setActiveRoute(route);
//     setIsMobileMenuOpen(false);
//     navigate(route);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <>
//       {/* Mobile Navigation */}
//       <div className="md:hidden">
//         <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
//           <div className="px-4 py-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold capitalize">{role} Portal</h2>
//               <button
//                 onClick={toggleMobileMenu}
//                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="h-6 w-6 text-gray-600" />
//                 ) : (
//                   <Menu className="h-6 w-6 text-gray-600" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Dropdown */}
//           {isMobileMenuOpen && (
//             <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all duration-200 ease-in-out">
//               <ul className="px-4 py-2">
//                 {items.map((item, index) => (
//                   <li
//                     key={index}
//                     className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
//                       activeRoute === item.route
//                         ? "bg-blue-100 text-blue-600"
//                         : "hover:bg-gray-100 text-gray-700"
//                     }`}
//                     onClick={() => handleNavigation(item.route)}
//                   >
//                     <span className="mr-3">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </nav>
//         {/* Spacer for mobile to prevent content from hiding under fixed navbar */}
//         <div className="h-16"></div>
//       </div>

//       {/* Desktop Sidebar Navigation */}
//       <nav className="hidden md:block w-64 bg-white shadow-md h-screen fixed left-0 top-0 pt-8">
//         <div className="px-4">
//           <h2 className="text-xl font-bold mb-6 capitalize">{role} Portal</h2>
//           <ul className="space-y-2">
//             {items.map((item, index) => (
//               <li
//                 key={index}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
//                   activeRoute === item.route
//                     ? "bg-blue-100 text-blue-600"
//                     : "hover:bg-gray-100 text-gray-700"
//                 }`}
//                 onClick={() => handleNavigation(item.route)}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 <span className="font-medium">{item.label}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default RoleBasedNavigation;



import React, { useState } from "react";
import { LayoutDashboard, Code, Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "./context/userSlice";

const navigationItems = {
  admin: [
    { icon: <LayoutDashboard />, label: "Dashboard", route: "/admin" },
    { icon: <Code />, label: "Project Management", route: "/developer" },
  ],
  developer: [
    { icon: <Code />, label: "Project Management", route: "/developer" },
  ],
  client: [
    { icon: <Code />, label: "Projects", route: "/client" },
  ],
};

const RoleBasedNavigation = ({ userRole }) => {
  const [activeRoute, setActiveRoute] = useState("/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = navigationItems[userRole] ? userRole : "client";
  const items = navigationItems[role];

  const handleNavigation = (route) => {
    setActiveRoute(route);
    setIsMobileMenuOpen(false);
    navigate(route);
  };

  const handleLogout = () => {
    dispatch(resetUser()); // Reset user data in Redux store
    navigate("/"); // Redirect to login page
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
          <div className="px-4 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold capitalize">{role} Portal</h2>
              <div className="flex items-center space-x-4">
                {/* User Icon */}
                <button
                  onClick={toggleUserMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="h-6 w-6 text-gray-600" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-4 top-12 bg-white shadow-lg border rounded-lg w-40 py-2 z-50">
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all duration-200 ease-in-out">
              <ul className="px-4 py-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      activeRoute === item.route
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => handleNavigation(item.route)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
        {/* Spacer for mobile to prevent content from hiding under fixed navbar */}
        <div className="h-16"></div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:block w-64 bg-white shadow-md h-screen fixed left-0 top-0 pt-8">
        <div className="px-4">
          <h2 className="text-xl font-bold mb-6 capitalize">{role} Portal</h2>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  activeRoute === item.route
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleNavigation(item.route)}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </li>
            ))}
          </ul>

          {/* User Menu */}
          <div className="absolute bottom-4 left-4">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 transition-all"
            >
              <User className="h-6 w-6 text-gray-600" />
              <span className="font-medium text-gray-700">Profile</span>
            </button>
            {isUserMenuOpen && (
              <div className="mt-2 bg-white shadow-lg border rounded-lg w-40 py-2">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default RoleBasedNavigation;
