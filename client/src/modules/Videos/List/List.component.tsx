import React from "react";
import ReactPlayer from "react-player";
import { backEndAddress } from "../../../config/constants";
import { SingleVideoProps } from "./types";

const VideosListComponent: React.FC<SingleVideoProps> = ({ list }) => {
  return (
    <div>
      {list.map((el) => (
        <ReactPlayer url={`${backEndAddress}${el.path}`} controls />
      ))}
    </div>
  );
};

export default VideosListComponent;
