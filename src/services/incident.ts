import { AppDataSource } from "..";
import { Incidents } from "../entity";
import { IncidentType } from '../utils/types';

export const createIncidentObject = () => {
  return new Incidents();
};

export const saveIncident = async (incident: IncidentType) => {
  const incidentRepository = AppDataSource.getRepository(Incidents);
  return incidentRepository.save(incident);
};
