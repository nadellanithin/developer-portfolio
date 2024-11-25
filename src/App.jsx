import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Explore from "./components/Explore";
import "./App.css";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
