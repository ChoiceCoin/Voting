import { Suspense } from "react";
import stores from "./store/stores";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./MainPage";
import OverlayElectionModal from "./statics/OverlayElectionModal";
import PopFromBottomModal from "./statics/PopFromBottomModal";
import MenuModal from "./statics/MenuModal";

const renderLoader = () => <p></p>;

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={renderLoader()}>
      <ReduxProvider store={stores}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <MainPage />
            <OverlayElectionModal />
            <PopFromBottomModal />
            <MenuModal />
          </Router>
        </QueryClientProvider>
      </ReduxProvider>
    </Suspense>
  );
};

export default App;
