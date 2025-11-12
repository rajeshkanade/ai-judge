import express from "express"
import { verdict } from "../controllers/verdict.controller.js";
import { upload } from "../middlewares/storage.js";
import { handleLawyerRequest } from "../controllers/lawyer.controller.js";

const  router = express.Router()

router.post("/judge/verdict",verdict);
router.post("/verdict/lawyer1", upload.single("file"), (req, res) => handleLawyerRequest(req, res, "lawyer1"));
router.post("/verdict/lawyer2", upload.single("file"), (req, res) => handleLawyerRequest(req, res, "lawyer2"));
export default router;