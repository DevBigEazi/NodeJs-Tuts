const userDB = {
  users: require("../models/user.json"),
  setUsers: (data) => {
    this.users = data;
  },
};

const fsPromises = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");

const handleUsers = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "Username and password required" });

  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.status(409).json({ message: "Duplicate username" });

  try {
    // encrypt the password
    const hashedpwd = await bcrypt.hash(pwd, 10);
    // store the new user
    const newUser = { username: user, password: hashedpwd };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userDB.users)
    );

    console.log(userDB.users);
    res.status(201).json({ success: `New user ${user} was created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
