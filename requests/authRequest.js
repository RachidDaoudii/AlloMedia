const Joi = require("joi");

class authRequest {
  static registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    role: Joi.string()
      .valid("client", "manager", "livreur")
      .required()
      .error(new Error("role must be one of [client, manager, livreur]")),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .error(new Error("Invalid email format")),

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
      .required()
      .error(new Error("Invalid email format")),

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
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  static resetpasswordSchema = Joi.object({
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    repeat_password: Joi.ref("password"),
  });

  static validateRegister = (req, res, next) => {
    const resultValidation = authRequest.registerSchema.validate(req.body, {
      abortEarly: false,
    });
    return resultValidation;
  };

  static validateLogin = (req, res, next) => {
    const resultValidation = authRequest.loginSchema.validate(req.body);
    return resultValidation;
  };

  static validateForgetpassword = (req, res, next) => {
    const resultValidation = authRequest.forgetpasswordSchema.validate(
      req.body
    );
    return resultValidation;
  };

  static validateResetpassword = (req, res, next) => {
    const resultValidation = authRequest.resetpasswordSchema.validate(req.body);
    return resultValidation;
  };
}

module.exports = authRequest;
