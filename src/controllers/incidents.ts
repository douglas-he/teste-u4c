import { Request, ResponseToolkit } from '@hapi/hapi';
import generator from 'generate-password';
import JWT from "jsonwebtoken";

import { UserType, VehiclesType, IncidentType } from '../utils/types';
import { createUserObect, getUser, saveUser } from '../services/user';
import { createIncidentObject, saveIncident } from '../services/incident';
import { getVehicle } from '../services/vehicles';

export const createIncident = async (req: Request, res: ResponseToolkit) => {
  const {
    thirdParty: { name, email, driverLicense, phone },
    vehicleId,
    userId,
    eventDate,
  } = req.payload as IncidentType;

  const userThird: UserType | any = await getUser('driverLicense', driverLicense);
  let incident: IncidentType = createIncidentObject();
  if(userThird && Number(userThird.id) === Number(userId)) {
    return res.response({
      status: 'The user cannot register an incident with himself',
    }).code(409);
  }
  if (userThird && userThird.id) {
    incident.thirdParty = userThird;
  } else {
    let userThird = createUserObect();
    const password = generator.generate({
      length: 15,
      numbers: true,
    });

    userThird = {
      ...userThird,
      name,
      email,
      password: JWT.sign({ password }, process.env.SECRET as string),
      isClient: false,
      driverLicense: driverLicense as string,
      phone,
    };
    const data = await saveUser(userThird);
    incident.thirdParty = data;
  }

  const vehicle: VehiclesType | any = await getVehicle('id', vehicleId);
  if(!vehicle || !vehicle.id){
    return res.response({
      status: 'Vehicle not found',
    }).code(404);
  }
  const userRegister: UserType | any = await getUser('id', userId);
  if(!userRegister || !userRegister.id){
    return res.response({
      status: 'User not found',
    }).code(404);
  }
  incident = {
    ...incident,
    vehicle,
    user: userRegister,
    eventDate,
  };

  const { 
    user: { password: _password, ...restUser },
    thirdParty: { password: _unusedPassword, ...restThidParty },
    ...data
  } = await saveIncident(incident);

  return res
    .response({
      status: 'Created',
      data: { ...data, user: restUser, thirdParty: restThidParty},
    })
    .code(201);
};
