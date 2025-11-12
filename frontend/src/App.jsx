import React, { useState, useEffect } from "react";
import axios from "axios";
import LawyerPanel from "./components/LawyerPanel";
import JudgePanel from "./components/JudgePanel";

export default function App() {
  const [lawyer1, setLawyer1] = useState("");
  const [lawyer2, setLawyer2] = useState("");
  const [verdict, setVerdict] = useState("");
  const [loadingVerdict, setLoadingVerdict] = useState(false);

  useEffect(() => {
    const fetchVerdict = async () => {
      if (lawyer1 && lawyer2) {
        try {
          setLoadingVerdict(true);
          const { data } = await axios.post("http://localhost:5000/api/judge/verdict", {
            lawyer1,
            lawyer2,
          });
          setVerdict(data.verdict);
        } catch (err) {
          console.error(err);
          alert("Error fetching AI Judge verdict");
        } finally {
          setLoadingVerdict(false);
        }
      }
    };
    fetchVerdict();
  }, [lawyer1, lawyer2]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <JudgePanel verdict={verdict} loading={loadingVerdict} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <LawyerPanel title="Lawyer 1" endpoint="lawyer1" onArgumentUpdate={setLawyer1} />
        <LawyerPanel title="Lawyer 2" endpoint="lawyer2" onArgumentUpdate={setLawyer2} />
      </div>
    </div>
  );
}
