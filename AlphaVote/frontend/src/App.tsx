import { Suspense } from "react";
import stores from "./store/stores";
import loadable from "@loadable/component";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const MainPage = loadable(() => import("./MainPage"));
const MenuModal = loadable(() => import("./statics/MenuModal"));
const PopFromBottomModal = loadable(
  () => import("./statics/PopFromBottomModal")
);
const OverlayElectionModal = loadable(
  () => import("./statics/OverlayElectionModal")
);

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
