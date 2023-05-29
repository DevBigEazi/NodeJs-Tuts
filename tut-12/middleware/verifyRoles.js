const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req || !req.roles) {
      return res.sendStatus(401);
    }

    console.log(allowedRoles);
    console.log(req.roles);

    const hasValidRole = req.roles.some((role) => allowedRoles.includes(role));
    if (!hasValidRole) {
      return res.sendStatus(401);
    }

    next();
  };
};

module.exports = verifyRoles;

// const verifyRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req?.roles) return res.sendStatus(401);
//     const rolesArr = [...allowedRoles];
//     const result = req.roles
//       .map((role) => rolesArr.includes(role))
//       .find((val) => val === true);
//     if (!result) return res.sendStatus(401);
//     next();
//   };
// };

// module.exports = verifyRoles;
