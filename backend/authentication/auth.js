const {
  registerHandler,
  loginHandler,
} = require("./handlers");

exports.register = async (req, res, next) => {
  registerHandler(req, res);
};

exports.login = async (req, res, next) => {
  loginHandler(req, res);
};

