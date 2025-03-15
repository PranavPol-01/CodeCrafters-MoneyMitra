// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//     Home,
//     BarChart,
//     Gamepad2,
//     ClipboardList,
//     ChevronLeft,
//     ChevronRight,
// } from "lucide-react";

// import {
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
// } from "@/components/ui/sidebar";

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const location = useLocation();

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };
//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: <Home className="h-5 w-5" />,
//       path: "/",
//     },
//     {
//       label: "Simulation",
//       icon: <BarChart className="h-5 w-5" />,
//       path: "/simmulation",
//     },
//     {
//       label: "Paper Trading",
//       icon: <Gamepad2 className="h-5 w-5" />,
//       path: "/game/paper-trading",
//     },
//     {
//       label: "Investment Quiz",
//       icon: <ClipboardList className="h-5 w-5" />,
//       path: "/game/investment-quiz",
//     },
//     {
//       label: "Predict Market",
//       icon: <Gamepad2 className="h-5 w-5" />,
//       path: "/game/predict-market",
//     },
//   ];

//   return (
//     <div
//       className={`sidebar h-screen flex flex-col bg-background border-r transition-all duration-300 ${
//         isCollapsed ? "w-20" : "w-64"
//       }`}
//     >
//       <SidebarHeader className="flex items-center justify-between p-4">
//         <Link to="/">
//           <div className="flex items-center gap-2">
//             <Map className="h-6 w-6" />
//             {!isCollapsed && (
//               <span className="text-lg font-bold">Real Estate Portal</span>
//             )}
//           </div>
//         </Link>
//         <button onClick={toggleCollapse} className="p-2 hover:bg-muted rounded">
//           {isCollapsed ? (
//             <ChevronRight className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </SidebarHeader>
//       <SidebarSeparator />
//       <SidebarContent className="flex-1 overflow-y-auto">
//         <SidebarGroup>
//           <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
//             Main Menu
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>

//                 menuItems.map((item, index) => (
//                   <SidebarMenuItem key={index}>
//                     <SidebarMenuButton
//                       asChild
//                       className={`flex items-center gap-3 p-3 hover:bg-muted rounded ${
//                         location.pathname === item.path ? "bg-muted" : ""
//                       }`}
//                     >
//                       <Link to={item.path}>
//                         {item.icon}
//                         {!isCollapsed && <span>{item.label}</span>}
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))
//             </SidebarMenu>

//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="p-4">
//         <div
//           className={`flex items-center gap-2 rounded-md border p-2 ${
//             isCollapsed ? "justify-center" : ""
//           }`}
//         >
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
//             <User className="h-4 w-4" />
//           </div>
//           {!isCollapsed && (
//             <div className="flex flex-col">
//               <span className="text-sm font-medium">John Doe</span>
//               <span className="text-xs text-muted-foreground">
//                 john.doe@example.com
//               </span>
//             </div>
//           )}
//         </div>
//       </SidebarFooter>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart,
  Gamepad2,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import path from "path";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/",
    },
    {
      label: "Simulation",
      icon: <BarChart className="h-5 w-5" />,
      path: "/simmulation",
    },
    {
      label: "Paper Trading",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/game/paper-trading",
    },
    {
      label: "Investment Quiz",
      icon: <ClipboardList className="h-5 w-5" />,
      path: "/game/investment-quiz",
    },
    {
      label: "Predict Market",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/game/predict-market",
    },
    {
      label: "Register",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/register",
    },
    {
      label: "Login",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/login",
    },
  ];

  return (
    <div
      className={`sidebar h-screen flex flex-col bg-background border-r transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link to="/">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" /> {/* Replaced missing Map icon */}
            {!isCollapsed && (
              <span className="text-lg font-bold">Real Estate Portal</span>
            )}
          </div>
        </Link>
        <button onClick={toggleCollapse} className="p-2 hover:bg-muted rounded">
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Sidebar Content */}
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 p-3 hover:bg-muted rounded ${
                      location.pathname === item.path ? "bg-muted" : ""
                    }`}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4">
        <div
          className={`flex items-center gap-2 rounded-md border p-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              {username ? (
                <>
                  <span className="text-sm font-medium">{username}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Guest</span>
              )}
            </div>
          )}
        </div>
      </SidebarFooter>
    </div>
  );
};

export default Sidebar;
