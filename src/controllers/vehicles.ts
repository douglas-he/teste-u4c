import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserType, VehiclesType } from '../utils/types';
import { getUser } from "../services/user";
import { createVehicleObject, saveVehicle } from "../services/vehicles";

export const createVehicle = async (req : Request , res: ResponseToolkit) => {
  const {
    modelName, licensePlate, userId,
  } = req.payload as VehiclesType;
  let user: UserType | any = await getUser('id', userId );
  if(!user || !user.id){
    return res.response({
      status: 'User not found',
    }).code(404);
  }
  const vehicle: VehiclesType = createVehicleObject({ modelName, licensePlate, user });

  const { 
    user: { password: _password, ...restUser }, ...data
  } = await saveVehicle(vehicle);

  return res.response({
    status: 'Created',
    data: { ...data, user: restUser },
  }).code(201);
};
