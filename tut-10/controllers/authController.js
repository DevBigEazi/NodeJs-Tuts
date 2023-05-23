const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // unauthorized
  // evaluate the password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match)
    return res.json({ Success: `User ${user} has logged in successfully` });
  else res.sendStatus(401); // Unauthorized
};

module.exports = { handleLogin };
