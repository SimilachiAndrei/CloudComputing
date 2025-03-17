import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LibraryPage from "./components/LibraryPage";
import SecondPage from "./components/SecondPage";
import ThirdPage from "./components/ThirdPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/libraryAPI" element={<LibraryPage />} />
        <Route path="/secondAPI" element={<SecondPage />} />
        <Route path="/thirdAPI" element={<ThirdPage />} />
      </Routes>
    </Router>
  );
}

export default App;
