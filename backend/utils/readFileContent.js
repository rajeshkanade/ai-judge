export const readFileContent = async (filePath, mimetype, originalname) => {
  try {
    if (mimetype === "application/pdf" || path.extname(originalname).toLowerCase() === ".pdf") {
      const data = fs.readFileSync(filePath);
      const pdf = await pdfParse(data);
      return pdf.text || "";
    }
    // For text-like files
    const textTypes = ["text/plain", "application/json", "application/xml", "text/markdown", "text/csv", "text/html"];
    if (textTypes.includes(mimetype) || /\.(txt|md|csv|json|html|xml)$/i.test(originalname)) {
      return fs.readFileSync(filePath, "utf-8");
    }

    // Otherwise return empty string but you still store file metadata for download
    return "";
  } catch (err) {
    console.error("readFileToText error:", err);
    return "";
  }
};