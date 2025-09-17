import React, { useState } from "react";

const HomePage = () => {
  const [exam, setExam] = useState("TS-EAMCET");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OC");
  const [gender, setGender] = useState("Male");
  const [branch, setBranch] = useState("CSE");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { exam, rank, category, gender, branch };
    console.log("Form Data:", data);
    // Later: call backend API
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">College Predictor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Exam:</label>
          <select value={exam} onChange={(e) => setExam(e.target.value)} className="w-full border rounded p-2">
            <option value="TS-EAMCET">TS EAMCET</option>
            <option value="JEE">JEE</option>
          </select>
        </div>
        <div>
          <label>Rank:</label>
          <input type="number" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded p-2">
            <option value="OC">OC</option>
            <option value="BC-A">BC-A</option>
            <option value="BC-B">BC-B</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border rounded p-2">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Branch:</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full border rounded p-2">
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="ME">ME</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Predict Colleges</button>
      </form>
    </div>
  );
};

export default HomePage;
