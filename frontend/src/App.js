import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import AppRouter from "./router/appRouter";
import Layout from "./Layout";
import RegPage from "./pages/RegPage";

function App() {
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
