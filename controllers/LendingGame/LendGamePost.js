// const { v4: uuidv4 } = require("uuid");
// const cloudinary = require("../../config/cloudinaryConfig");
// const lendingSchema = require("../../schemas/lendingSchema");
// const { createTable, insertRecord } = require("../../utils/sqlFunctions");
//
// const lendGame = async (req, res) => {
//   const { gameName, price, lendingPeriod, about, tags } = req.body;
//   const userId = req.user.userId;
//
//   // Check if all required fields are present
//   if (!gameName || !price || !lendingPeriod || !req.file) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//
//   try {
//     await createTable(lendingSchema);
//
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "lendings",
//     });
//
//     const lending = {
//       lendingId: uuidv4(),
//       gameName,
//       price,
//       about,
//       tags,
//       lendingPeriod,
//       image: result.secure_url,
//       userId,
//     };
//
//     await insertRecord("lendings", lending);
//
//     return res.status(201).json({message: "Game lent successfully", image: result.secure_url });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
//
// module.exports = {
//   lendGame
// };


const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../../config/cloudinaryConfig");
const lendingSchema = require("../../schemas/lendingSchema");
const { createTable, insertRecord } = require("../../utils/sqlFunctions");

const lendGame = async (req, res) => {
    const { gameName, price, lendingPeriod, about, tags } = req.body;
    const userId = req.user.userId;

    // Check if all required fields are present
    if (!gameName || !price || !lendingPeriod || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }
  try {
    await createTable(lendingSchema);

    // Upload image buffer to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "lendings",
    });

    const lending = {
      lendingId: uuidv4(),
      gameName,
      price,
      about,
      tags,
      lendingPeriod,
      image: result.secure_url,
      userId,
    };

    await insertRecord("lendings", lending);

    return res.status(201).json({ message: "Game lent successfully", image: result.secure_url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { lendGame };
