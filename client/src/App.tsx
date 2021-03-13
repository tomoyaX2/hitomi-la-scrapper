import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { getMe } from "./modules/Users/store/actions";
import { selectLoadingState } from "./modules/Users/store/reducer";
import Router from "./Router";
import { historyService } from "./utils/services/history";
import { Loader } from "rsuite";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectLoadingState);
  React.useEffect(() => {
    dispatch(getMe());
    historyService.setupHistory(history);
  }, []);
  return isLoaded ? (
    <Sidebar>
      <Router />
    </Sidebar>
  ) : (
    <Loader />
  );
}

export default App;
