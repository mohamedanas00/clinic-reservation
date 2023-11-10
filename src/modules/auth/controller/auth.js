import { StatusCodes } from "http-status-codes";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { compare, hash } from "../../../utils/hashing.js";
import { generateToken } from "../../../utils/generateAndVerifyToken.js";
import userModel from "./../../../../DB/models/user.model.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword, age, phone, role, gender } =
    req.body;
  const existingUser = await userModel.findOne({ where: { email: email } });

  if (existingUser) {
    return next(new ErrorClass("Email already exists", StatusCodes.CONFLICT));
  }
  if (confirmPassword === password) {
    const hashedPassword = hash(password);
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      age: age,
      phone: phone,
      role: role,
      gender: gender,
      specialization: req.body.specialization,
    });
    const token = generateToken({
      payload: {
        id:newUser.id,
        password: newUser.password,
      },
    });

    return res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "Done", result: newUser, token });
  } else {
    return next(
      new ErrorClass(
        "Password confirmation doesn't match",
        StatusCodes.BAD_REQUEST
      )
    );
  }
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ where: { email } });
  if (!user) {
    return next(
      new ErrorClass("Email does not exist sign up first"),
      StatusCodes.BAD_REQUEST
    );
  }
  const isMatch = compare(password, user.password);
  if (isMatch) {
    const token = generateToken({
      payload: {
        id:user.id,
        password,
      },
    });
    return res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "Successfully signed in",user ,token });
  } else {
    return next(new ErrorClass("Incorrect data"), StatusCodes.BAD_REQUEST);
  }
});
