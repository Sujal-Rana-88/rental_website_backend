const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Error: Fill all fields");
    return res.status(400).json({ error: "Fill all the fields" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      userId: uuidv4(),
      email,
      password: hashedPassword,
    };

    // Ensure the user table is created
    await createTable(userSchema);

    const userAlreadyExists = await checkRecordExists("users", "email", email);

    if (userAlreadyExists) {
      console.log("Error: Email already exists");
      return res.status(409).json({ error: "Email already exists" });
    }

    await insertRecord("users", user);
    console.log("User created successfully:", user);
    return res.status(201).json({ message: "User created successfully", userId: user.userId });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Fill all the fields" });
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (!existingUser || !existingUser.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      userId: existingUser.userId,
      email: existingUser.email,
      access_token: generateAccessToken(existingUser.userId),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message }); 
  }
};

module.exports = {
  register,
  login,
};
