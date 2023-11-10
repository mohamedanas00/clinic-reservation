import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const GetDoctorsWithSlots = {
    body: joi.object().required()
      .keys({
        
      }).required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()
  };
export const GetDoctorWithMajors = {
    body: joi.object().required()
      .keys({
        specialization:generalFields.name
      }).required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()
  };

export const searchByDoctorName = {
    body: joi.object().required()
      .keys({
      }).required(),
    params:joi.object().keys({
    }).required()
  };

  export const getDoctorSlotById = {
    body: joi.object().required()
      .keys({
  
      }).required(),
    query: joi.object().keys({
  
    }).required(),
    params: joi.object().keys({
      id:joi.number().required()
  
    }).required()
  
  }
