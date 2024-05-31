// import "./styles.css";
import AuthProvider from "./AuthContext";
import Pureplate from "./Pureplate/Pureplate";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurant from "./Restaurant/Restaurant";
import FeedbackPage from "./FeedbackPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Pureplate />}>
            <Route path=":id" element={<Restaurant id="0" none="none" />} />
            <Route path="feedback" element={<FeedbackPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
