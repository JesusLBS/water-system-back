const config = require("../../config/config");
const JwtHelper = require("../../helpers/security/jwtHelper");

exports.AuthService = class AuthService {
  token = async (user) => {
    const jwtKey = config.jwtKey;
    const cryptokey = config.cryptokey;
    const apiKey = config.apiKey;
    const payload = { user, apiKey };

    const jwtHelper = new JwtHelper(payload, jwtKey, cryptokey);

    const token = await jwtHelper.generateJWT();

    return token;
  };
};
