import { useState } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    onSearch(source, destination);
  };

  const handleReset = () => {
    setSource("");
    setDestination("");
    setDate("");
    onSearch("", "");
  };

  return (
    <div className="search-card">

      <h2 className="search-title">
        🔍 Find Your Bus
      </h2>

      <div className="row g-3">

        <div className="col-lg-3 col-md-6">
          <label className="form-label">From</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <label className="form-label">To</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <label className="form-label">Journey Date</label>

          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="col-lg-3 col-md-6 d-flex align-items-end">

          <button
            className="btn btn-primary me-2 flex-fill"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            className="btn btn-outline-secondary flex-fill"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}

export default SearchBar;