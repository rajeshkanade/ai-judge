import React from "react";

const VerdictBox = ({ verdict }) => (
  <div className="bg-white mb-8 p-6 rounded-2xl shadow-md text-center">
    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
      AI Judge and its Verdict
    </h1>
    <p className="text-gray-600">
      {verdict ? verdict : "Awaiting submission from both sides..."}
    </p>
  </div>
);

export default VerdictBox;
