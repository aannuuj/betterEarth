const jwt = require("jsonwebtoken");
function createJwtToken(data) {
  const token = jwt.sign(
    JSON.stringify(data),
    process.env.JWT_ACCESS_TOKEN_SECERET
  );
  return token;
}

module.exports = createJwtToken;
