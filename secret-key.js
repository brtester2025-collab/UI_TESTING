const jwt = require("jsonwebtoken");

const token = jwt.sign(
    { userId: "u1", role: "admin" },   // payload
    "secretKey",                       // secret
    { expiresIn: "1h" }                // expiry
);

console.log(token);