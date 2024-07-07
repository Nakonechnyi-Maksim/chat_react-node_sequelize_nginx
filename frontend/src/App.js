import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/appRouter";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  );
}

export default App;
