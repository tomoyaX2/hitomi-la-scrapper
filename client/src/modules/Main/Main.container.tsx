import React from "react";
import MainComponent from "./Main.component";
import { useDispatch } from "react-redux";
import { getMangaList } from "./store";

const Main: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMangaList());
  }, []);
  return (
    <div>
      <MainComponent />
    </div>
  );
};

export default Main;
