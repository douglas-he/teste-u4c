import Joi from 'joi';

export const payloadEditUser = Joi.object({
  name: Joi.string().regex(/^[a-z ,.'-]+$/i).min(3).max(140).required(),
  email: Joi.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
).required(),
  password: Joi.string().min(6).max(140).required(),
  phone: Joi.string().regex(/^[0-9]{9,15}$/).required(),
});

export const payloadCreateUser = Joi.object({
  name: Joi.string().regex(/^[a-z ,.'-]+$/i).min(3).max(140).required(),
  email: Joi.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
).required(),
  password: Joi.string().min(6).max(140).required(),
  phone: Joi.string().regex(/^[0-9]{9,15}$/).required(),
  driverLicense: Joi.string().min(1).max(140).required(),
});

export const payloadVehicle = Joi.object({
  modelName: Joi.string().min(3).max(140).required(),
  licensePlate: Joi.string().min(3).max(140).required(),
  userId: Joi.number().integer().required(),
});

export const payloadIncident = Joi.object({
  thirdParty: Joi.object({
    name: Joi.string().regex(/^[a-z ,.'-]+$/i).min(3).max(140).required(),
    email: Joi.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
    ).required(),
    phone: Joi.string().regex(/^[0-9]{9,15}$/).required(),
    driverLicense: Joi.string().min(1).max(140).required(),
  }),
  vehicleId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  eventDate: Joi.date().required(),
});