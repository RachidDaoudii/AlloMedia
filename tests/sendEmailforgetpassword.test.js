const auth = require("../controllers/authController");
jest.mock("../models/userModel");
const userModel = require("../models/userModel");
const jwtToken = require("../helpers/jwtToken");
const mailer = require("../helpers/mailer");

jest.mock("../helpers/jwtToken", () => ({
  ...jest.requireActual("../helpers/jwtToken"),
  generateToken: jest.fn(),
}));

jest.mock("../helpers/mailer", () => ({
  ...jest.requireActual("../helpers/mailer"),
  sendEmail: jest.fn(),
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("test parti send email for forget password ", () => {
  it("should return status 400 if email is not allowed to be empty", async () => {
    const req = {
      body: {
        email: "",
      },
    };

    await auth.sendEmailforgetpassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: '"email" is not allowed to be empty',
    });
  });

  it("should status 400 if invalid email format", () => {
    const req = {
      body: {
        email: "daoudi@gmail.c12om",
      },
    };

    auth.sendEmailforgetpassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: '"email" must be a valid email',
    });
  });

  it("should status 400 if user not found", async () => {
    const req = {
      body: {
        email: "testing@gmail.com",
      },
    };

    await userModel.findUserbyEmail.mockResolvedValue(null);
    await auth.sendEmailforgetpassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "user not found",
    });
  });

  it("should status 200 if please check your email", async () => {
    const req = {
      body: {
        email: "daoudi@gmail.com",
      },
    };
    await userModel.findUserbyEmail.mockResolvedValue({
      _id: "1234",
      email: "daoudi@gmail.com",
      password: "daoudi",
    });

    await jwtToken.generateToken.mockResolvedValue({
      _id: "1234",
      email: "daoudi@gmail.com",
      password: "daoudi",
    });

    await mailer.sendEmail.mockResolvedValue(
      "username",
      "daoudi@gmail.com",
      "tekon",
      "Activation Email"
    );

    await auth.sendEmailforgetpassword(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "please check your email",
    });
  });
});
