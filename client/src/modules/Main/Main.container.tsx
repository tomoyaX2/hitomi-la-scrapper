import React from "react";
import MainComponent from "./Main.component";
import { useDispatch, useSelector } from "react-redux";
import { getMangaList } from "./store/actions";
import { selectRecomendations } from "./store/reducer";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const recomendations = useSelector(selectRecomendations);
  React.useEffect(() => {
    dispatch(getMangaList());
  }, []);
  return <MainComponent recomendations={recomendations} />;
};

export default Main;
