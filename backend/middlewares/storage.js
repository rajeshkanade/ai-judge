import multer from "multer"
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // keep original name with a timestamp prefix to avoid collisions
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, safeName);
  },
});
export const upload = multer({ storage });