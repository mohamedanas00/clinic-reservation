import { StatusCodes } from "http-status-codes";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { compare, hash } from "../../../utils/hashing.js";
import { generateToken } from "../../../utils/generateAndVerifyToken.js";
import { usermodel } from "../../../../DB/models/user.model.js";

export const signUp = asyncHandler(async (req, res, next) => {
    const { name, email, password, confirmpassword, age, phone, role, gender } = req.body;
    console.log({ name, email, password, age, confirmpassword, phone, role, gender });
    const existingUser = await usermodel.findOne({ where: { email: email } });

    if (existingUser) {
        return next (new ErrorClass( "Email already exists" ,StatusCodes.CONFLICT))
    }

    if (confirmpassword === password) {
        const hashedPassword = hash(password);
        const newUser = await usermodel.create({
            name: name,
            email: email,
            password: hashedPassword,
            age: age,
            phone: phone,
            role: role,
            gender: gender,
        });
        const token = generateToken({
            payload: {
                name,
                email,
                password: newUser.password,
            },
        });

        return res.status(StatusCodes.ACCEPTED).json({ message: "Done", result: newUser, token });
    } else {
        return next (new ErrorClass( "Password confirmation doesn't match" ,StatusCodes.BAD_REQUEST))
    }
});

export const signin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ where: { email } });
    if (!user) {
        return next(new ErrorClass('Email does not exist sign up first'),StatusCodes.BAD_REQUEST)
    }
    const isMatch = compare(password, user.password);
    if (isMatch) {
        const token = generateToken({ payload: {
            email,
            password,
        },});
        return res.status(StatusCodes.ACCEPTED).json({ message: 'Successfully signed in', token });
    } else {
        return next(new ErrorClass('incorrect password'),StatusCodes.BAD_REQUEST)
    }
}
);

