import { History } from "history";

class HistoryService {
  history = {} as History;

  setupHistory = (history: History) => {
    this.history = history;
  };
}

const historyService = new HistoryService();

export { historyService };
