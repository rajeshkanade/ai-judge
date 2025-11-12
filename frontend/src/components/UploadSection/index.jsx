import React from "react";

const UploadSection = ({ label, text, onTextChange, onFileChange, files }) => {
  return (
    <div className="mb-4">
      <p className="text-gray-600 mb-2 font-medium">Upload documents here:</p>
      <ul className="list-disc list-inside text-gray-600 mb-3">
        <li>Text</li>
        <li>File(s)</li>
      </ul>

      {/* Textarea for arguments */}
      <textarea
        placeholder={`Enter your ${label.toLowerCase()} here...`}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* File input */}
      <input
        type="file"
        multiple
        onChange={onFileChange}
        className="mb-2 block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
      />

      {/* Show uploaded files */}
      {files.length > 0 && (
        <ul className="text-sm text-gray-700 mt-2">
          {files.map((file, idx) => (
            <li key={idx}>📄 {file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadSection;
