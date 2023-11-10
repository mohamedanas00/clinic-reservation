import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const addAppointment={
    body: joi.object().required()
    .keys({}).required(),
  query: joi.object().keys({
    
  }).required(),
  params:joi.object().keys({
    id:joi.number().required(),
    
  }).required()

}

export const cancelAppointment={
    body: joi.object().required()
    .keys({
      
      
    }).required(),
  query: joi.object().keys({
    
  }).required(),
  params:joi.object().keys({
      id:joi.number().required(),
    
  }).required()

}

export const updateAppointment={
    body: joi.object().required()
      .keys({
        slot:joi.number().required(),
        
      }).required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
        id:joi.number().required(),
      
    }).required()

}

export const getAllAppointments={
    body: joi.object().required()
      .keys({
        
      }).required(),
    query: joi.object().keys({
      
    }).required(),
    params:joi.object().keys({
      
    }).required()

}