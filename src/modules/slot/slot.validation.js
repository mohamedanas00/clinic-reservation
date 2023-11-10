import joi from "joi";

export const addSlot = {
  body: joi.object().required()
    .keys({
      date: joi.date().required(),
    }).required(),
  query: joi.object().keys({

  }).required(),
  params: joi.object().keys({

  }).required()
};

export const updateSlotDate = {
  body: joi.object().required()
    .keys({ date: joi.date().required(), }).required(),
  query: joi.object().keys({}).required(),
  params: joi.object().keys({
    slotId: joi.number().required(),
  }).required()
};

export const getAllSlots = {
  body: joi.object().required()
    .keys({

    }).required(),
  query: joi.object().keys({

  }).required(),
  params: joi.object().keys({

  }).required()

}


