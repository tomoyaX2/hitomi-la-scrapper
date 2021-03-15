import React from "react";
import { Arrow } from "../../components/icons/Arrow";
import { MainComponentProps } from "./types";

const MainComponent: React.FC<MainComponentProps> = ({
  recomendations: { manga },
}) => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl mt-4 text-black">Latest</span>
      <div className="flex items-center justify-start flex-wrap mt-4">
        {manga.slice(0, 10).map((el) => (
          <div className="flex flex-col mr-4 cursor-pointer mt-2">
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/${
                el.Album.Images[el.Album.Images.length - 1]?.url
              }`}
              className="w-60 h-60"
            />
            <div className="flex flex-col mt-2 flex-wrap w-60 h-60">
              <span className="text-black mt-2 text-lg">{el.name}</span>
              <span className="text-black mt-2 text-md">
                {el.language?.name}
              </span>
            </div>
          </div>
        ))}
        {/* <Arrow className="w-16 h-16 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default MainComponent;
