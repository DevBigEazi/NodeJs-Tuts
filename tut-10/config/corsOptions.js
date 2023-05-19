const allowlist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:3000",
  "http://localhost:8500",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowlist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
