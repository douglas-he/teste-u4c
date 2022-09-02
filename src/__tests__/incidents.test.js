const { faker } = require('@faker-js/faker');
const JWT = require('jsonwebtoken');
const generator =  require('generate-password');

const { mockSaveUser, mockSaveVehicle, mockSaveIncident } = require('../../mocks');
const server = require('../index');
const serviceUser = require("../services/user");
const serviceVehicle = require("../services/vehicle");
const serviceIncident = require("../services/incident");


beforeAll((done) => {
    server.events.on('start', () => {
        done();
    });
});

afterAll((done) => {
  server.events.on('stop', () => {
      done();
  });
  server.stop();
});

describe('Test incident routes', () => {
  afterEach(()=> {
    jest.clearAllMocks();
  })
  describe('Create incident', () => {
    const generateInfo = (key, value) => {
      const incidentInfo = {
        thirdParty: {
          name: faker.name.fullName(),
          driverLicense: faker.vehicle.vin(),
          email: faker.internet.email(),
          phone: String(faker.phone.number('#########')),
        },
        vehicleId: Number(faker.random.numeric()),
        userId: Number(faker.random.numeric()),
        eventDate: faker.date.recent(),
      };
      return key ? { ...incidentInfo, [key]: value }: incidentInfo;
    }
    const alterThirdValues = (key, value) => {
      let incidentInfo = generateInfo();
      return { ...incidentInfo, thirdParty : { ...incidentInfo.third, [key]: value }};
    }
    describe('Test fail cases', () => {
      const invalidResponse = ({ error , message, statusCode}) => {
        expect(error).toBe("Bad Request");
        expect(message).toBe("Invalid request payload input");
        expect(statusCode).toBe(400);
      };
      test('Void payload',  async () => {
        const options = {
          method: 'POST',
          url: '/api/incident',
          payload: {} 
        };
        const { result } = await server.inject(options);
        invalidResponse(result);
      });
      [
        { key: 'vehicleId', value: 'invalidValue' },
        { key: 'userId', value: 'invalidValue' },
        { key: 'eventDate', value: 'invalidValue' },
        { key: 'thirdParty', value: {} },
      ].forEach(({ key, value }) => {
        test(`Invalid ${key}`,  async () => {
          const options = {
            method: 'POST',
            url: '/api/incident',
            payload: generateInfo(key, value),
          };
          const { result } = await server.inject(options);
          invalidResponse(result);
        });
      });
      [
        { key: 'name', value: 'teste123./'},
        { key: 'email', value: 'invalidemail.co'},
        { key: 'phone', value: '123abc'},
        { key: 'driverLicense', value: 123 },
      ].forEach(({ key, value }) => {
        test(`Invalid ${key}`,  async () => {
          const options = {
            method: 'POST',
            url: '/api/incident',
            payload: alterThirdValues(key, value),
          };
          const { result } = await server.inject(options);
          invalidResponse(result);
        });
      });
      test('Incident log with the same user', async () => {
        const incident = generateInfo();
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() =>({
          ...mockSaveUser,
          id: incident.userId,
        }));
        const options = {
          method: 'POST',
          url: '/api/incident',
          payload: incident
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toEqual({ 
          status: 'The user cannot register an incident with himself',
        });
        expect(statusCode).toBe(409);
        expect(mockGetUser).toBeCalledWith('driverLicense', incident.thirdParty.driverLicense);
      });
      test('Vehicle not found', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() => mockSaveUser);
        const mockGetVehicle = jest.spyOn(serviceVehicle, 'getVehicle').mockImplementation(() => ({}));

        const incident = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/incident',
          payload: incident
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toEqual({ 
          status: 'Vehicle not found',
        });
        expect(statusCode).toBe(404);
        expect(mockGetUser).toBeCalledWith('driverLicense', incident.thirdParty.driverLicense);
        expect(mockGetVehicle).toBeCalledWith('id', incident.vehicleId);
      });
      test('User not found', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser')
          .mockImplementationOnce(() => mockSaveUser)
          .mockImplementationOnce(() => ({}));
        const mockGetVehicle = jest.spyOn(serviceVehicle, 'getVehicle').mockImplementation(() => mockSaveVehicle);

        const incident = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/incident',
          payload: incident
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toEqual({ 
          status: 'User not found',
        });
        expect(statusCode).toBe(404);
        expect(mockGetUser).toBeCalledWith("driverLicense", incident.thirdParty.driverLicense);
        expect(mockGetUser).toBeCalledWith("id", incident.userId);
        expect(mockGetVehicle).toBeCalledWith('id', incident.vehicleId);
      });
    });
    describe('Test success cases', () => {
      test('Register with thirdParty exists', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() => mockSaveUser);
        const mockGetVehicle = jest.spyOn(serviceVehicle, 'getVehicle').mockImplementation(() => mockSaveVehicle);
        const mockSaveIncidentFunction = jest.spyOn(serviceIncident, 'saveIncident').mockImplementation(() => mockSaveIncident);

        const incident = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/incident',
          payload: incident
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toEqual({ 
          status: 'Created',
          data: mockSaveIncident,
        });
        expect(statusCode).toBe(201);
        expect(mockGetUser).toBeCalledWith("driverLicense", incident.thirdParty.driverLicense);
        expect(mockGetUser).toBeCalledWith("id", incident.userId);
        expect(mockGetVehicle).toBeCalledWith('id', incident.vehicleId);
        expect(mockSaveIncidentFunction).toBeCalledWith({
          eventDate: incident.eventDate,
          user: mockSaveUser, 
          vehicle: mockSaveVehicle,
          thirdParty: mockSaveUser
        });
      });
      test('Register with thirdParty no exists', async () => {
        const mockToken = 'teste'
      
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementationOnce(() => ({})).mockImplementation(() => mockSaveUser);
        const mockSaveUserFunction = jest.spyOn(serviceUser, 'saveUser').mockImplementation(() => mockSaveUser);
        const mockGetVehicle = jest.spyOn(serviceVehicle, 'getVehicle').mockImplementation(() => mockSaveVehicle);
        const mockSaveIncidentFunction = jest.spyOn(serviceIncident, 'saveIncident').mockImplementation(() => mockSaveIncident);
        const mockJWT = jest.spyOn(JWT, 'sign').mockImplementation(() => mockToken);
        const mockGenerator = jest.spyOn(generator, 'generate').mockImplementation(() => mockToken);
        
        const incident = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/incident',
          payload: incident
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toEqual({ 
          status: 'Created',
          data: mockSaveIncident,
        });
        expect(statusCode).toBe(201);
        expect(statusCode).toBe(201);
        expect(mockGetUser).toBeCalledWith("driverLicense", incident.thirdParty.driverLicense);
        expect(mockGetUser).toBeCalledWith("id", incident.userId);
        expect(mockGetVehicle).toBeCalledWith('id', incident.vehicleId);
        expect(mockGetUser).toBeCalledWith("driverLicense", incident.thirdParty.driverLicense);
        expect(mockGetUser).toBeCalledWith("id", incident.userId);
        expect(mockGetVehicle).toBeCalledWith('id', incident.vehicleId);
        expect(mockSaveUserFunction).toBeCalledWith({...incident.thirdParty, password: mockToken, isClient: false});
        expect(mockJWT).toBeCalledWith({ password: mockToken }, process.env.SECRET);
        expect(mockGenerator).toBeCalled();
        expect(mockSaveIncidentFunction).toBeCalledWith({
          eventDate: incident.eventDate,
          user: mockSaveUser, 
          vehicle: mockSaveVehicle,
          thirdParty: mockSaveUser
        });
      });
    });
  });
});
