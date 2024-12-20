import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/CustomError.js";
import { attachCookiesToResponse } from "../utils/tokenUtils.js";

const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError(
      "Email already exists. Please provide another value."
    );
  }

  if (password !== confirmPassword) {
    throw new BadRequestError("Passwords don't match. Please try again.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
  });

  const tokenUser = { name: user.name, userId: user._id };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ data: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("No such user");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = { name: user.name, userId: user._id };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ data: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

const googleAuth = async (req, res) => {
  console.log(req.body);
  const { name, email, token, sub } = req.body;
  const userExists = await User.findOne({ email });
  const user = { name, email, id: sub };

  if (!userExists) {
    await User.create({ name, email, password: sub });
  }

  res.status(StatusCodes.OK).json({ data: user, token });
};

export { register, login, logout, googleAuth };
