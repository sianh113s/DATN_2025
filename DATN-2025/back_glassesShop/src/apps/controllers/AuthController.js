const UserModel = require("../models/UserModel")
const { jwtDecode } = require("jwt-decode");
const jwt = require("jsonwebtoken");
const config = require("config");
const TokenModel = require("../models/token");
const { redisClient } = require("../../common/init.redis");

const generateAccessToken = async (user) => {
  return jwt.sign(
    { email: user.email },
    config.get("app.jwtAccessKey"),
    { expiresIn: "1h" }
  );
}
const generatRefreshToken = async (user) => {
  return jwt.sign(
    { email: user.email },
    config.get("app.jwtRefreshKey"),
    { expiresIn: "1m" }
  );
}

const setTokenBlacklist = async (token) => {
  const decoded = jwtDecode(token);
  if (decoded.exp > Date.now() / 1000) {
    redisClient.set(
      token,
      token,
      {
        EXAT: decoded.exp,
      }
    );
  }
}
exports.registerUser = async (req, res) => {
  try {
    const { body } = req;
    const { email, phone } = body;
    const isEmail = await UserModel.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already in use"
      });
    }
    const isPhone = await UserModel.findOne({ phone });
    if (isPhone) {
      return res.status(400).json({
        status: "Failed",
        message: "Phone already in use"
      });
    }
    const user = {
      name: body.name,
      email,
      password: body.password,
      phone,
      address: body.address,
    }
    await UserModel(user).save();
    return res.status(201).json({
      status: "success",
      message: "Register Success",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = await UserModel.findOne({ email });

    if (!isEmail) {
      return res.status(400).json({ message: "Email not valid" });
    }
    const isPassword = isEmail.password === password;
    if (!isPassword) {
      return res.status(400).json({ message: "Password not valid" });
    }
    if (isEmail && isPassword) {
      // generate token 
      const accessToken = await generateAccessToken(isEmail);
      const refreshToken = await generatRefreshToken(isEmail);

      const isToken = await TokenModel.findOne({ user_id: isEmail._id });
      if (isToken) {
        setTokenBlacklist(isToken.accessToken);
        setTokenBlacklist(isToken.refreshToken);
        await TokenModel.deleteOne({ user_id: isEmail._id });
      }
      await TokenModel({
        user_id: isEmail._id,
        accessToken,
        refreshToken
      }).save()

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      const { password, ...userData } = isEmail._doc;
      return res.status(200).json({
        status: "Login Success",
        accessToken,
        userData,
      });
    }


  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    jwt.verify(refreshToken, config.get("app.jwtRefreshKey"), async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      const newAccessToken = await generateAccessToken({ decoded });
      return res.status(200).json({
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}

exports.logoutUser = async (req, res) => {
  try {
    const { accessToken } = req;
    const isToken = await TokenModel.findOne({ accessToken });
    setTokenBlacklist(isToken.accessToken);
    setTokenBlacklist(isToken.refreshToken);
    return res.status(200).json({ message: "Logout Success" });
  }
  catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}