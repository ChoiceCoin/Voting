import { Suspense } from "react";
import MainPage from "./MainPage";
import stores from "./store/stores";
import AlertModal from "./statics/AlertModal";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const renderLoader = () => <p></p>;

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={renderLoader()}>
      <ReduxProvider store={stores}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <MainPage />
            <AlertModal />
          </Router>
        </QueryClientProvider>
      </ReduxProvider>
    </Suspense>
  );
};

export default App;
