const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ email, themePreference: user.themePreference, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function signupUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ email, themePreference: user.themePreference, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function changeTheme(req, res) {
  const { email } = req.params;
  const { themePreference } = req.body;

  const user = await User.findOneAndUpdate({ email }, { themePreference });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  const token = createToken(user._id);

  res.status(200).json({email, themePreference, token });
}

module.exports = { loginUser, signupUser, changeTheme };
