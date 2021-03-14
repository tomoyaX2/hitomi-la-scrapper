import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

class SecureService {
  createHash = (password: string) => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
  };

  comparePasswords = (enteredPassword: string, realPassword: string) => {
    const hashedPassword = this.createHash(enteredPassword);
    return hashedPassword === realPassword;
  };

  createToken = () => {
    return crypto.randomBytes(30).toString("hex");
  };

  generateToken = (data, expiresIn = "1d") => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
  };
}

export { SecureService };
