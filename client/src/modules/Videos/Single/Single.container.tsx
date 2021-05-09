import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSingleVideo } from "../store/reducer";
import SinlgeVideoComponent from "./Single.component";

const SinlgeVideo: React.FC = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectSingleVideo);

  return (
    <div>
      <SinlgeVideoComponent />
    </div>
  );
};

export default SinlgeVideo;
