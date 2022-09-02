import { Request, ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

export type UserType = {
  name: string;
  email: string;
  phone: string;
  password?: string;
  isClient?: boolean;
  driverLicense?: string;
  id?: number;
  updatedAt?: Date;
  createdAt?: Date;
};

export type VehiclesType = {
  modelName: string;
  licensePlate: string;
  user: UserType;
  userId?: number;
  updatedAt?: Date;
  createdAt?: Date;
};

export type IncidentType = {
  thirdParty: UserType;
  user?: UserType;
  vehicleId?: number;
  userId?: number;
  eventDate: Date;
  vehicle?: VehiclesType;
};

export interface Route {
  method: string;
  path: string;
  handler: (request: Request, response: ResponseToolkit) => any;
  options: { validate: { payload: Joi.Schema }}
}
