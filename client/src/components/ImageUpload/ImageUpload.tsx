import { useFormikContext } from "formik";
import React from "react";
import { Plus } from "../icons/Plus";
import { ImageUploadProps } from "./types";

const ImageUpload: React.FC<ImageUploadProps> = ({ name }) => {
  const { setFieldValue, values } = useFormikContext<{ avatarUrl: string }>();
  const fileInputRef = React.useRef<any>();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onloadend = function () {
      setFieldValue(name, reader.result);
    };
  };

  const hasAvatar = values[name]?.length;
  return (
    <div className="flex flex-col  ml-12 mt-4">
      <span className="text-md">Avatar</span>
      <div
        className="flex items-center justify-center mt-1 bg-gray-100 w-56 h-48 rounded-lg cursor-pointer"
        onClick={handleUploadClick}
      >
        {hasAvatar && (
          <img
            src={
              values[name].startsWith("data:image")
                ? values[name]
                : `${process.env.REACT_APP_SERVER_URL}/${values[name]}`
            }
            className="w-full h-full rounded-lg"
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onChange}
          className="hidden"
        />
        <Plus className="w-12 h-12 cursor-pointer absolute" />
      </div>
    </div>
  );
};

export { ImageUpload };
