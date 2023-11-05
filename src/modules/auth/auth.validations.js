import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signUp = {
  body: joi.object().required()
    .keys({
      name: generalFields.name,
      email: generalFields.email,
      age: joi.number().integer().min(1).max(110).required(),
      gender: joi.string().valid("male", "female").required(),
      phone: joi.string().trim().pattern(/^(010|012|011|015)\d{8}$/),
      role: joi.string().valid("doctor", "patient").required(),
      password: generalFields.password,
      confirmPassword: generalFields.password,
      specialization: joi.string(),
    })
    .required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()
};
export const signIn = {
  body: joi
    .object()
    .required()
    .keys({
      email: generalFields.email,
      password: generalFields.password,
    })
    .required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()
};
