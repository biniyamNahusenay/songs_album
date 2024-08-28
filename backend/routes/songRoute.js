import express from "express";
import { createSong, deleteSong, getAllSongs, getStatistics, updateSong } from "../controllers/songController.js";
const router = express.Router()

router.post("/create",createSong)
router.get("/allSongs",getAllSongs)
router.route("/:id").put(updateSong).delete(deleteSong)
router.get("/statistics",getStatistics)

export default router