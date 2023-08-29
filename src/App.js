import { BrowserRouter, Routes, Route } from "react-router-dom";
import Part1 from "./components/Part1";
import Part2 from "./components/Part2";
import Yup from "./components/Yup";
import ListGroup from "./components/ListGroup";

function App() {
  return (
    <BrowserRouter>
      <div className="container my-2">
        <div className="row">
          <div className="col-md-3">
          <ListGroup />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<Part1 />} />
              <Route path="/extended" element={<Part2 />} />
              <Route path="/yup" element={<Yup/>} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
