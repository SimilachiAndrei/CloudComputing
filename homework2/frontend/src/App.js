import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LibraryPage from "./components/LibraryPage";
import OtherWsPage from "./components/OtherWsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/libraryAPI" element={<LibraryPage />} />
        <Route path="/OtherWsPage" element={<OtherWsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
