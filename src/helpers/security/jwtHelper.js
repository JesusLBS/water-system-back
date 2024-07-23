const jwt = require("jsonwebtoken");
const CipherHelper = require("./cipherHelper");

class JwtHelper {
  #payload;
  #jwtKey;
  #cryptokey;

  constructor(payload, jwtKey, cryptokey) {
    this.#payload = payload;
    this.#jwtKey = jwtKey;
    this.#cryptokey = cryptokey;
  }

  generateJWT() {
    return new Promise((resolve, reject) => {
      const encryptedData = this.#cipher(this.#payload).cipherData();
      jwt.sign(
        { data: encryptedData },
        this.#jwtKey,
        { expiresIn: "2h" },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          resolve(token);
        },
      );
    });
  }

  validateJWT(apiKey) {
    return new Promise((resolve, reject) => {
      jwt.verify(this.#payload, this.#jwtKey, (err, data) => {
        if (err) {
          return reject(err.name);
        }
        const decryptedData = this.#cipher(data.data).decipherData();
        if (decryptedData.apiKey !== apiKey) {
          return reject(new Error("Invalid API_KEY"));
        }
        delete decryptedData.apiKey;
        resolve(decryptedData);
      });
    });
  }

  validateRefreshJWT(apiKey) {
    return new Promise((resolve, reject) => {
      jwt.verify(this.#payload, this.#jwtKey, (err, data) => {
        if (err) {
          return reject(err);
        }
        const {
          payload: { data: dataDecode },
        } = jwt.decode(this.#payload, { complete: true });
        const decryptedData = this.#cipher(dataDecode).decipherData();
        if (decryptedData.apiKey !== apiKey) {
          return reject(new Error("Invalid API_KEY"));
        }
        delete decryptedData.apiKey;
        resolve(decryptedData);
      });
    });
  }

  #cipher(data) {
    return new CipherHelper(data, this.#cryptokey);
  }
}

module.exports = JwtHelper;
