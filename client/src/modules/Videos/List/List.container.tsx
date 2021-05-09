import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoList } from "../store/actions";
import { selectVideosList } from "../store/reducer";
import VideosComponent from "./List.component";

const VideosList: React.FC = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectVideosList);

  React.useEffect(() => {
    dispatch(getVideoList());
  }, []);

  return (
    <div>
      <VideosComponent list={list} />
    </div>
  );
};

export default VideosList;
