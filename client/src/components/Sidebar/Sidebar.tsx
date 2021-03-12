import React from "react";
import Navbar from "../Navbar/Navbar";
import SidebarComponent from "./Sidebar.component";

const Sidebar: React.FC = ({ children }) => {
  return (
    <Navbar>
      <SidebarComponent>{children}</SidebarComponent>
    </Navbar>
  );
};

export default Sidebar;
