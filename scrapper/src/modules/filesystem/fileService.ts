import fs from "fs";

const publicPath = "public";

class FileSystemService {
  writeAvatar = async (userId: string, base64: string) => {
    const dir = `${publicPath}/${userId}`;
    const userAvatarPath = `${dir}/avatar.png`;
    if (fs.existsSync(userAvatarPath)) {
      fs.unlinkSync(userAvatarPath);
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await this.convertBase64ToImage(base64, userAvatarPath);
    return `${userId}/avatar.png`;
  };

  convertBase64ToImage = async (base64: string, path: string) => {
    return await fs.writeFile(
      path,
      base64.replace(/^data:image\/png;base64,/, ""),
      "base64",
      (err) => {
        console.log(err, "Error write image");
      }
    );
  };
}

export { FileSystemService };
