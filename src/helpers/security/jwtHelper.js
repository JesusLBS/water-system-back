const jwt = require("jsonwebtoken");
const CipherHelper = require("./cipherHelper");

class JwtHelper {
  constructor(payload, jwtKey, cryptokey) {
    this.payload = payload;
    this.jwtKey = jwtKey;
    this.cryptokey = cryptokey;
  }

  async generateJWT() {
    const cipherHelper = new CipherHelper(this.payload, this.cryptokey);
    const encryptedData = cipherHelper.cipherData();
    const token = await this.signJWT(
      { data: encryptedData },
      this.jwtKey,
      "1h",
    );
    return token;
  }

  async validateJWT(token, apiKey) {
    const data = await this.verifyJWT(token, this.jwtKey);
    const cipherHelper = new CipherHelper(data.data, this.cryptokey);
    const decryptedData = cipherHelper.decipherData();
    if (decryptedData.apiKey !== apiKey) {
      throw new Error("Invalid API key");
    }
    delete decryptedData.apiKey;
    return decryptedData;
  }

  async validateRefreshJWT(token, apiKey) {
    const {
      payload: { data: dataDecode },
    } = jwt.decode(token, { complete: true });
    const cipherHelper = new CipherHelper(dataDecode, this.cryptokey);
    const decryptedData = cipherHelper.decipherData();
    if (decryptedData.apiKey !== apiKey) {
      throw new Error("Invalid API key");
    }
    delete decryptedData.apiKey;
    return decryptedData;
  }

  signJWT(payload, secret, expiresIn) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn }, (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      });
    });
  }

  verifyJWT(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
}

module.exports = JwtHelper;
