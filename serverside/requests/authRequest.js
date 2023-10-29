const Joi = require("joi");

class authRequest {
  static registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    _role: Joi.string().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),

    repeat_password: Joi.ref("password"),
  }).options({
    allowUnknown: true,
  });

  static loginSchema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .error(
        new Error(
          "Invalid password format. It should be alphanumeric and between 3 to 30 characters"
        )
      ),
  });

  static forgetpasswordSchema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  static resetpasswordSchema = Joi.object({
    new_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),

    repeat_password: Joi.ref("new_password"),

    old_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  static validateRegister = (req, res, next) => {
    const resultValidation = this.registerSchema.validate(req.body, {
      abortEarly: false,
    });
    return resultValidation;
  };

  static validateLogin = (req, res, next) => {
    const resultValidation = this.loginSchema.validate(req.body);
    return resultValidation;
  };

  static validateForgetpassword = (req, res, next) => {
    const resultValidation = this.forgetpasswordSchema.validate(req.body);
    return resultValidation;
  };

  static validateResetpassword = (req, res, next) => {
    const resultValidation = this.resetpasswordSchema.validate(req.body);
    return resultValidation;
  };
}

module.exports = authRequest;
