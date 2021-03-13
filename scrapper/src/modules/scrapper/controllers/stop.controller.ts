import { selectElementService } from "../services";

export const stopController = (req, res) => {
  res.send("scrapping is stopped");
  selectElementService.stopScrapper();
};
