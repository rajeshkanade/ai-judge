import React, { useState } from "react";
import axios from "axios";

const LawyerPanel = ({ title, endpoint, onArgumentUpdate }) => {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt && !file) {
      alert("Please enter text or upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    if (file) formData.append("file", file);

    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:5000/api/verdict/${endpoint}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResponse(data.response);
      onArgumentUpdate(prompt + "\n\n" + data.response);
    } catch (error) {
      console.error(error);
      alert("Error sending data to AI Judge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border w-full">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">{title}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Enter ${title}'s argument...`}
          className="border border-gray-300 p-3 rounded-md resize-none h-32 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-gray-700 bg-amber-200 rounded-md px-2 py-2 cursor-pointer w-52"
        />

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white py-2 rounded-md transition cursor-pointer`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
              Submitting...
            </div>
          ) : (
            "Submit to AI Judge"
          )}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md border text-sm">
          <h3 className="font-semibold text-indigo-600 mb-2">
            Post Decision by AI:
          </h3>
          <p className="whitespace-pre-line text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
};

export default LawyerPanel;
