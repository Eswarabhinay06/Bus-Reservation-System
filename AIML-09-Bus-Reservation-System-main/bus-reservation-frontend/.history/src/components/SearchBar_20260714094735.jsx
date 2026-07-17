import { useState } from "react";

function SearchBar({ onSearch }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    onSearch(source, destination);
  };

  return (
    <div className="card shadow p-4 mb-5">
      <h3 className="text-center mb-4">🔍 Search Bus</h3>

      <div className="row">

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

      </div>
    </div>
  );
}

export default SearchBar;