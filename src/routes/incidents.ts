import { Incidents } from '../controllers';
import { Route } from '../utils/types';
import { payloadIncident } from '../utils/validate';

export const incidentsRoutes: 
  Route []
  = [
  {
    method: "POST",
    path: "/api/incident",
    handler: Incidents.createIncident,
    options: {
      validate: {
        payload: payloadIncident
      }
    }
  },
];
