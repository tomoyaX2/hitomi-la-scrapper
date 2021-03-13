import { initiateScrapper } from "..";

export const initiateController = (req, res) => {
  res.send("scrapping is started");
  initiateScrapper();
}