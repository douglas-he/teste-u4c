import { AppDataSource } from "..";
import { Vehicles } from "../entity";
import { VehiclesType } from '../utils/types';

export const createVehicleObject = ({...params}: VehiclesType) => {
  let vehicle: VehiclesType = new Vehicles();
  vehicle = {
    ...vehicle,
    ...params,
  };
  return vehicle;
};

export const saveVehicle = async (vehicle: VehiclesType) => {
  const vehiclesRepository = AppDataSource.getRepository(Vehicles);
  return vehiclesRepository.save(vehicle);
};

export const getVehicle = async (key: string, value: string | any) => {
  const userRepository = AppDataSource.getRepository(Vehicles);
  const vehicle: VehiclesType | any = await userRepository.findOneBy({ 
    [key]: value
  });
  return vehicle;
}
