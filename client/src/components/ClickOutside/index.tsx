import React, { useEffect, useRef } from "react";
import { ClickOutsideProps } from "./types";

const useOutsideAlerter = (
  ref: React.MutableRefObject<any>,
  action: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const ClickOutside: React.FC<ClickOutsideProps> = ({
  children,
  action,
  className,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, action);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export { ClickOutside };
