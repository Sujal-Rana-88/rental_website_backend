// const express = require("express");
// const multer = require("multer");
// const { lendGame } = require("../controllers/LendingGame/LendGamePost");
// const { fetchLentGames, fetchAllLentGames } = require("../controllers/LendingGame/FetchLendGameGet");
// const authenticate = require("../Middlewares/lendingMiddleware");
//
// const router = express.Router();
//
// // Multer configuration for file storage
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   },
// // });
//
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
// //     cb(null, Date.now() + "-" + sanitizedFilename);
// //   },
// // });
// //
// // const upload = multer({ storage });
//
// router.post("/lend", authenticate, upload.single("image"), lendGame);
// router.get("/all-games", fetchAllLentGames);
//
// module.exports = router;


const express = require("express");
const multer = require("multer");
const { lendGame } = require("../controllers/LendingGame/LendGamePost");
const { fetchAllLentGames } = require("../controllers/LendingGame/FetchLendGameGet");
const authenticate = require("../Middlewares/lendingMiddleware");

const router = express.Router();

// Multer configuration for memory storage
// const storage = multer.memoryStorage(); // Store files in memory
// const upload = multer({ storage }); // Create multer instance with memoryStorage
//
// // Routes
// router.post("/lend", authenticate, upload.single("image"), lendGame);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + sanitizedFilename);
  },
});

const upload = multer({ storage });

router.post("/lend", authenticate, upload.single("image"), lendGame);
router.get("/all-games", fetchAllLentGames);

module.exports = router;
