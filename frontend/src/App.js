import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import AppRouter from "./router/appRouter";
import Layout from "./Layout";
import RegPage from "./pages/AuthPage";
import { UserProvider } from "./context/UserContext";
import UserContext from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

const AppContent = () => {
  const { isAuth } = useContext(UserContext);

  return isAuth ? (
    <Layout>
      <AppRouter />
    </Layout>
  ) : (
    <RegPage />
  );
};

export default App;
