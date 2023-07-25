import * as Joi from 'joi';

export const loginSchema = Joi.object().keys({
  name: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
});
