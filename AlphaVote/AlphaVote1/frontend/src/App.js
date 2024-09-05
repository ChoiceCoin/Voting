import { Suspense } from "react";
import stores from "./store/stores";
import loadable from "@loadable/component";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const MainPage = loadable(() => import("./MainPage"));
const PopFromBottomModal = loadable(() =>
  import("./statics/PopFromBottomModal")
);
const PopFromBottomModalToVote = loadable(() =>
  import("./statics/PopFromBottomModalToVote")
);
const OverlayElectionModal = loadable(() =>
  import("./statics/OverlayElectionModal")
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
            <PopFromBottomModal />
            <OverlayElectionModal />
            <PopFromBottomModalToVote />
          </Router>
        </QueryClientProvider>
      </ReduxProvider>
    </Suspense>
  );
};

export default App;
