import CryptoJS from "crypto-js";

const encryptText = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, "secret_key").toString();
  return encrypted;
};

export { encryptText };
