import React from "react";

const JudgePanel = ({ verdict, loading }) => {
  return (
    <div className="w-full max-w-5xl bg-white border rounded-2xl shadow-md p-6 mb-8 text-left">
      <h1 className="text-2xl font-bold text-green-700 mb-3">🏛️ Verdict by AI Judge</h1>

      {loading ? (
        <div className="flex items-center text-gray-500">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          AI Judge is analyzing the arguments...
        </div>
      ) : verdict ? (
        <p className="whitespace-pre-line text-gray-800">{verdict}</p>
      ) : (
        <p className="text-gray-500 italic">
          Awaiting both lawyers’ arguments before making a final verdict.
        </p>
      )}
    </div>
  );
};

export default JudgePanel;
