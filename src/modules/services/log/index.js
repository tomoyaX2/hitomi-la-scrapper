const fs = require("fs");
const uuid = require("uuid");
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
    fs.writeFile(
      `./logs/${uuid.v4()}.txt`,
      JSON.stringify(this.currentLog),
      () => {
        this.currentLog = "";
        console.log("log is written!");
      }
    );
  };
}

const logService = new LogService();

module.exports = { logService };
