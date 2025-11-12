import React, { useState } from "react";
import axios from "axios";
import VerdictBox from "../../../components/VerdictBox";
import LawyerPanel from "../../../components/LawyerPanel";

const AIJudgeApp = () => {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [filesA, setFilesA] = useState([]);
  const [filesB, setFilesB] = useState([]);
  const [verdict, setVerdict] = useState("");
  const [decisionA, setDecisionA] = useState("");
  const [decisionB, setDecisionB] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChangeA = (e) => setFilesA([...e.target.files]);
  const handleFileChangeB = (e) => setFilesB([...e.target.files]);

  const handleSubmit = async () => {
    if (!sideA && filesA.length === 0) {
      alert("Lawyer 1 must provide text or a file.");
      return;
    }
    if (!sideB && filesB.length === 0) {
      alert("Lawyer 2 must provide text or a file.");
      return;
    }

    setLoading(true);

    try {
      // Prepare data
      const formData = new FormData();
      formData.append("sideA", sideA);
      formData.append("sideB", sideB);
      filesA.forEach((file) => formData.append("filesA", file));
      filesB.forEach((file) => formData.append("filesB", file));

      // Send to backend
      const res = await axios.post("http://localhost:5000/api/verdict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setVerdict(res.data.verdict);
      setDecisionA(res.data.decisionA);
      setDecisionB(res.data.decisionB);
    } catch (err) {
      console.error("Error:", err);
      alert("Error getting AI decision. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <VerdictBox verdict={verdict} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LawyerPanel
            title="Lawyer 1"
            text={sideA}
            onTextChange={setSideA}
            files={filesA}
            onFileChange={handleFileChangeA}
            aiDecision={decisionA}
            onSubmit={handleSubmit}
            loading={loading}
          />

          <LawyerPanel
            title="Lawyer 2"
            text={sideB}
            onTextChange={setSideB}
            files={filesB}
            onFileChange={handleFileChangeB}
            aiDecision={decisionB}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AIJudgeApp;
