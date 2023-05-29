const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs/promises");
const path = require("path");

const handleLogut = async (req, res) => {
  //Also delete the token on client side

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is the fresh token available in db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // clear cookies
    return res.sendStatus(204);
  }

  // delete the refresh token if found user
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(usersDB.users)
  );

  // delete cookie
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // {secure: true} must be added...it means only serve on https
  res.sendStatus(204);
};

module.exports = { handleLogut };
