const fs = require("fs");
const uuid = require("uuid");
const dir = "./logs";

class LogService {
  createLogDir = () => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  };

  clearLogs = () => {
    fs.rmdirSync(dir, { recursive: true });
  };

  writeLog = ({ data, fileName }) => {
    this.createLogDir();
    fs.writeFile(`./logs/${uuid.v4()}${fileName}`, JSON.stringify(data), () =>
      console.log("log is written!")
    );
  };
}

const logService = new LogService();

module.exports = { logService };
