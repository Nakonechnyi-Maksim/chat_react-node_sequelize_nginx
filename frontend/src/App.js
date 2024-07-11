import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/appRouter";
import Layout from "./Layout";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  );
}

export default App;
