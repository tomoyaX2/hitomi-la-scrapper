import fs from "fs";
import crypto from "crypto";
const dir = "./logs";

class LogService {
  currentLog = "";

  createLogDir = () => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  };

  addToLog = (text) => {
    this.currentLog += `\\n  ${text}`;
  };

  clearLogs = () => {
    this.currentLog = "";
    fs.rmdirSync(dir, { recursive: true });
  };

  writeLog = () => {
    this.createLogDir();
    const id = crypto.randomBytes(16).toString("hex");
    fs.writeFile(
      `./logs/${id}.txt`, 
      JSON.stringify(this.currentLog),
      () => {
        this.currentLog = "";
        console.log("log is written!");
      }
    );
  };
}

export { LogService };
