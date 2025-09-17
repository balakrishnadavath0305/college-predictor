import React, { useState } from "react";

const HomePage = () => {
  // ------------------- STATES -------------------
  const [exam, setExam] = useState("TS-EAMCET");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OC");
  const [gender, setGender] = useState("Male");
  const [branch, setBranch] = useState("CSE");
  const [results, setResults] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [minFees, setMinFees] = useState("");
  const [maxFees, setMaxFees] = useState("");

  // ------------------- HANDLE SUBMIT -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam, rank, category, gender, branch }),
      });
      const data = await res.json();
      setResults(data.results); // store results in state
    } catch (err) {
      console.error("Error fetching predictions:", err);
    }
  };

  // ------------------- FILTER RESULTS -------------------
  const filteredResults = results.filter((college) => {
    return (
      (!locationFilter || college.location === locationFilter) &&
      (!typeFilter || college.type === typeFilter) &&
      (!minFees || college.fees >= parseInt(minFees)) &&
      (!maxFees || college.fees <= parseInt(maxFees))
    );
  });

  // ------------------- JSX -------------------
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">College Predictor</h1>

      {/* --------- INPUT FORM --------- */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label>Exam:</label>
          <select value={exam} onChange={(e) => setExam(e.target.value)}>
            <option value="TS-EAMCET">TS-EAMCET</option>
            <option value="JEE">JEE</option>
          </select>
        </div>

        <div>
          <label>Rank:</label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="OC">OC</option>
            <option value="BC-A">BC-A</option>
            <option value="BC-B">BC-B</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>

        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Branch:</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Predict
        </button>
      </form>

      {/* --------- FILTERS --------- */}
      {results.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Filters</h3>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="mr-2"
          >
            <option value="">All Locations</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Warangal">Warangal</option>
            {/* Add more locations if needed */}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="mr-2"
          >
            <option value="">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>

          <input
            type="number"
            placeholder="Min Fees"
            value={minFees}
            onChange={(e) => setMinFees(e.target.value)}
            className="mr-2"
          />
          <input
            type="number"
            placeholder="Max Fees"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
          />
        </div>
      )}

      {/* --------- RESULTS TABLE --------- */}
      {filteredResults.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Predicted Colleges</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">College</th>
                <th className="border px-4 py-2">Branch</th>
                <th className="border px-4 py-2">Cutoff Rank</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Fees</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((college, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{college.name}</td>
                  <td className="border px-4 py-2">{college.branch}</td>
                  <td className="border px-4 py-2">{college.cutoffRank}</td>
                  <td className="border px-4 py-2">{college.location}</td>
                  <td className="border px-4 py-2">{college.type}</td>
                  <td className="border px-4 py-2">{college.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        results.length > 0 && <p>No colleges match your filters.</p>
      )}
    </div>
  );
};

export default HomePage;
