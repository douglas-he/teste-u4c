import { Vehicles } from '../controllers';
import { Route } from '../utils/types';
import { payloadVehicle } from '../utils/validate';

export const vehicleRoutes: Route[] = [
  {
    method: 'POST',
    path: '/api/vehicle',
    handler: Vehicles.createVehicle,
    options: {
      validate: {
        payload: payloadVehicle,
      }
    }
  },
];
