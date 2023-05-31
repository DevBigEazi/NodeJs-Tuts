const User = require("../models/User");

const handleLogut = async (req, res) => {
  //Also delete the token on client side

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is the fresh token available in db?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // clear cookies
    return res.sendStatus(204);
  }

  // delete the refresh token if found user
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  // delete cookie
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // {secure: true} must be added...it means only serve on https
  res.sendStatus(204);
};

module.exports = { handleLogut };
