import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-column">
      <span className="text-blue-400 text-4xl">404</span>
      <span className="text-blue-400 text-2xl">
        Sorry, but we cannot found this page :(
      </span>
    </div>
  );
};

export { NotFound };
