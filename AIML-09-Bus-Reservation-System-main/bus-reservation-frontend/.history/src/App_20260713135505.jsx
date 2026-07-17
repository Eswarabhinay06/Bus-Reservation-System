import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBus from "./pages/SearchBus";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;