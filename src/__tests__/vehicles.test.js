const { faker } = require('@faker-js/faker');
const server = require('../index');
const serviceUser = require("../services/user");
const serviceVehicle = require("../services/vehicles");

const { mockSaveUser, mockSaveVehicle } = require('../../mocks');

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

describe('Test vehicle routes', () => {
  afterEach(()=> {
    jest.clearAllMocks();
  })
  describe('Create vehicle', () => {
    const generateInfo = (key, value) => {
      const vehicleInfo = {
          modelName: faker.vehicle.manufacturer(),
          licensePlate: faker.vehicle.vrm(),
          userId: Number(faker.random.numeric()),
      };
      return key ? { ...vehicleInfo, [key]: value }: vehicleInfo;
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
          url: '/api/vehicle',
          payload: {}
        };
        const { result } = await server.inject(options);
        invalidResponse(result);
      });
      [
        { key: 'modelName', value: 'te'},
        { key: 'licensePlate', value: 'te'},
        { key: 'userId', value: 'a1231'},
      ].forEach(({ key, value }) => {
        test(`Invalid ${key}`,  async () => {
          const options = {
            method: 'POST',
            url: '/api/vehicle',
            payload: generateInfo(key, value),
          };
          const { result } = await server.inject(options);
          invalidResponse(result);
        });
      });
      test('User not found', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() => ({}));
        const vehicle = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/vehicle',
          payload: vehicle
        };
        const { result, statusCode }  = await server.inject(options);
        expect(mockGetUser).toBeCalledWith('id', vehicle.userId);
        expect(result).toEqual({ 
          status: 'User not found',
        });
        expect(statusCode).toBe(404);
      });
    });
    describe('Test success cases', () => {  
      test('Success with status 201', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() => mockSaveUser);
        const mocksaveVehicleFuntion =jest.spyOn(serviceVehicle, 'saveVehicle').mockImplementation(() => mockSaveVehicle);
        const vehicle = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/vehicle',
          payload: vehicle
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toEqual({ 
          data: mockSaveVehicle, 
          status: "Created"
        });
        expect(statusCode).toBe(201);
        expect(mockGetUser).toBeCalledWith('id', vehicle.userId);
        expect(mocksaveVehicleFuntion).toBeCalledWith({ 
          modelName: vehicle.modelName,
          licensePlate: vehicle.licensePlate,
          user: mockSaveUser
        })
      });
    });
  });
});
