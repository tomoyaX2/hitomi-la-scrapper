import React from "react";
import NavbarComponent from "./Navbar.component";

const Navbar: React.FC = ({ children }) => {
  return <NavbarComponent>{children}</NavbarComponent>;
};

export default Navbar;
