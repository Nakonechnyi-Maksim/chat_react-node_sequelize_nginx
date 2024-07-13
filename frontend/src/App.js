import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import AppRouter from "./router/appRouter";
import Layout from "./Layout";
import RegPage from "./pages/RegPage";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <Router>
      {isAuth ? (
        <Layout>
          <AppRouter />
        </Layout>
      ) : (
        <RegPage />
      )}
    </Router>
  );
}

export default App;
