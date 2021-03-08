import React from "react";
import MainComponent from "./Main.component";
import { useDispatch } from "react-redux";
import { getProjectsList } from "./store";

const Main: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("1111");
    dispatch(getProjectsList());
  }, []);
  return (
    <div>
      <MainComponent />
    </div>
  );
};

export default Main;
