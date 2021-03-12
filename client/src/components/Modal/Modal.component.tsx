import React from "react";

const ModalComponent: React.FC = ({ children }) => {
  return <div className="w-screen h-screen absolute">{children}</div>;
};

export { ModalComponent };
