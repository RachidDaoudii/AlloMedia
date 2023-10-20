const auth = require("../controllers/authController");
const userModel = require("../models/userModel");
const jwtToken = require("../helpers/jwtToken");
const mailer = require("../helpers/mailer");
const bcrypt = require("bcryptjs");
jest.mock("../models/userModel");

jest.mock("../controllers/authController", () => ({
  ...jest.requireActual("../controllers/authController"),
  comparePassword: jest.fn(),
}));

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

describe("test parti login ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 400 if email is not allowed to be empty", async () => {
    const req = {
      body: {
        email: "",
        password: "daoudi",
      },
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: '"email" is not allowed to be empty',
    });
  });

  it("should return status 400 if password is not allowed to be empty", async () => {
    const req = {
      body: {
        email: "daoudi@gmail.com",
        password: "",
      },
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message:
        "Invalid password format. It should be alphanumeric and between 3 to 30 characters",
    });
  });

  it("should return status 400 if invalid email format", async () => {
    const req = {
      body: {
        email: "daoudi@gmail.cokm",
        password: "daoudi",
      },
    };
    await auth.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: '"email" must be a valid email',
    });
  });

  it("should return status 400 if email not found", async () => {
    const req = {
      body: {
        email: "daoudi@gmail.com",
        password: "deaoudi",
      },
    };

    // Mock the behavior of findUserbyEmail
    userModel.findUserbyEmail.mockResolvedValue(null);

    await auth.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "email or password is wrong",
    });
  });

  it("should return status 400 if password is not correct", async () => {
    const req = {
      body: {
        email: "daoudi@gmail.com",
        password: "deaoudi",
      },
    };

    // Mock the behavior of findUserbyEmail
    userModel.findUserbyEmail.mockResolvedValue({
      _id: "1234",
      email: "daoudi@gmail.com",
      password: "daoudi",
    });

    await auth.comparePassword.mockResolvedValue(false);

    await auth.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "email or password is wrong !!!",
    });
  });

  // it("should return status 400 and a message to verify email", async () => {
  //   const req = {
  //     body: {
  //       email: "daoudi@gmail.com",
  //       password: "daoudi",
  //     },
  //   };

  //   // Mock the behavior of findUserbyEmail
  //   userModel.findUserbyEmail.mockResolvedValue({
  //     _id: "1234",
  //     email: "daoudi@gmail.com",
  //     password: "daoudi",
  //     verified: false, // Simulate an unverified email
  //   });

  //   // Mock the comparePassword function to resolve with true for simplicity
  //   auth.comparePassword.mockResolvedValue();

  //   // Mock the generateToken function
  //   jwtToken.generateToken.mockResolvedValue({
  //     username: "example",
  //     email: "daoudi@gmail.com",
  //     verified: false,
  //     _id: "1234",
  //     role: "user",
  //   });

  //   // Mock the mailer function
  //   mailer.sendEmail.mockResolvedValue(); // Assuming mailer.sendEmail is a function that doesn't return a promise

  //   await auth.login(req, res);

  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     status: "success",
  //     message: "please verify your email",
  //   });

  //   // Optionally, you can also check if mailer.sendEmail was called with the correct arguments
  //   expect(mailer.sendEmail).toHaveBeenCalledWith(
  //     "example",
  //     "daoudi@gmail.com",
  //     expect.any(String),
  //     "Activation Email"
  //   );
  // });

  // it("should return status 400 if not verify email", async () => {
  //   const req = {
  //     body: {
  //       email: "daoudi@gmail.com",
  //       password: "daoudi",
  //     },
  //   };

  //   // Mock the behavior of findUserbyEmail
  //   userModel.findUserbyEmail.mockResolvedValue({
  //     email: "daoudi@gmail.com",
  //     password: "daoudi",
  //   });

  //   auth.comparePassword.mockReturnValue(true);

  //   await auth.login(req, res);

  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.json).toHaveBeenCalledWith({
  //     status: "success",
  //     message: "please verify your email",
  //   });
  // });
});
