const { error_codes } = require("./errorCode.js");

const apiResponseHandler = async (status, code, data = "", message = "") => {
  try {
    let statusMessage = message || error_codes[code];
    return {
      status,
      messageCode: code,
      message: statusMessage,
      data,
    };
  } catch (error) {
    //createLogs('getClientToken', error.message);
  }
};

module.exports = { apiResponseHandler };
