const { faker } = require('@faker-js/faker');
const JWT = require('jsonwebtoken');
const server = require('../index');
const serviceUser = require("../services/user");
const { mockSaveUser } = require('../../mocks');

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

describe('Test user routes', () => {
  afterEach(()=> {
    jest.clearAllMocks();
  })
  describe('Create User', () => {
    const generateInfo = (key, value) => {
      const personInfo = {
        name: faker.name.fullName(),
        password: faker.internet.password(),
        driverLicense: faker.vehicle.vin(),
        email: faker.internet.email(),
        phone: String(faker.phone.number('#########')),
      };
      return key ? { ...personInfo, [key]: value }: personInfo;
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
          url: '/api/user',
          payload: {}
        };
        const { result } = await server.inject(options);
        invalidResponse(result);
      });

      [
        { key: 'name', value: 'teste123./'},
        { key: 'email', value: 'invalidemail.co'},
        { key: 'password', value: ''},
        { key: 'phone', value: '123abc'},
        { key: 'driverLicense', value: 123 },
      ].forEach(({ key, value }) => {
        test(`Invalid ${key}`,  async () => {
          const options = {
            method: 'POST',
            url: '/api/user',
            payload: generateInfo(key, value),
          };
          const { result } = await server.inject(options);
          invalidResponse(result);
        });
      })
    })
    
    describe('Test success cases', () => {  
      const mockToken = 'randomToken';
      test('Success with status 201', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() => ({}));
        const mockSaveUserFunction = jest.spyOn(serviceUser, 'saveUser').mockImplementation(() => mockSaveUser);
        const mockJWT = jest.spyOn(JWT, 'sign').mockImplementation(() => mockToken);
        const user = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/user',
          payload: user
        };
        const { result, statusCode }  = await server.inject(options);
        const { password , ...mockData } = mockSaveUser;
        expect(result).toEqual({
          status: "Created",
          data: mockData
        });
        expect(statusCode).toBe(201);
        expect(mockGetUser).toBeCalledWith('driverLicense', user.driverLicense);
        expect(mockSaveUserFunction).toBeCalledWith({
          ...user, isClient: true, password: mockToken, 
        });
        expect(mockJWT).toBeCalledWith({ password: user.password }, process.env.SECRET);
      });

      test('Success with status 204', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() => mockSaveUser);
        const mockSaveUserFunction = jest.spyOn(serviceUser, 'saveUser').mockImplementation(() => mockSaveUser);
        const mockJWT = jest.spyOn(JWT, 'sign').mockImplementation(() => mockToken);
        const user = generateInfo()
        const options = {
          method: 'POST',
          url: '/api/user',
          payload: user
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toBe(null);
        expect(statusCode).toBe(204);
        expect(mockGetUser).toBeCalledWith('driverLicense', user.driverLicense);
        expect(mockSaveUserFunction).toBeCalledWith({
          ...mockSaveUser, ...user, isClient: true, password: mockToken, 
        });
        expect(mockJWT).toBeCalledWith({ password: user.password }, process.env.SECRET);
      });
    });
  });
  describe('Edit User', () => {
    const generateInfo = (key, value) => {
      const personInfo = {
        name: faker.name.fullName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        phone: String(faker.phone.number('#########')),
      };
      return key ? { ...personInfo, [key]: value }: personInfo;
    }
    describe('Test fail cases', () => {
      const invalidResponse = ({ error , message, statusCode}) => {
        expect(error).toBe("Bad Request");
        expect(message).toBe("Invalid request payload input");
        expect(statusCode).toBe(400);
      };
      test('Void payload',  async () => {
        const options = {
          method: 'PATCH',
          url: '/api/user/1',
          payload: {}
        };
        const { result } = await server.inject(options);
        invalidResponse(result);
      });

      [
        { key: 'name', value: '***zx*zas56'},
        { key: 'email', value: 'invalidemail.co'},
        { key: 'password', value: ''},
        { key: 'phone', value: '123abc'},
      ].forEach(({ key, value }) => {
        test(`Invalid ${key}`,  async () => {
          const options = {
            method: 'PATCH',
            url: '/api/user/1',
            payload: generateInfo(key, value),
          };
          const { result } = await server.inject(options);
          invalidResponse(result);
        });
      })
    })
    
    describe('Test success cases', () => {
      const mockToken = 'randomToken';  
      test('Success with status 204', async () => {
        const mockGetUser = jest.spyOn(serviceUser, 'getUser').mockImplementation(() => mockSaveUser);
        const mockSaveUserFunction = jest.spyOn(serviceUser, 'saveUser').mockImplementation(() => mockSaveUser);
        const mockJWT = jest.spyOn(JWT, 'sign').mockImplementation(() => mockToken);
        const user = generateInfo();
        const options = {
          method: 'PATCH',
          url: '/api/user/1',
          payload: user
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toBe(null);
        expect(statusCode).toBe(204);
        expect(mockGetUser).toBeCalledWith('id', "1");
        expect(mockSaveUserFunction).toBeCalledWith({
          ...mockSaveUser, ...user, isClient: true, password: mockToken, 
        });
        expect(mockJWT).toBeCalledWith({ password: user.password }, process.env.SECRET);
      });
      test('Success with status 204 no User', async () => {
        jest.spyOn(serviceUser, 'getUser').mockImplementation(() => ({}));
        const user = generateInfo();
        const options = {
          method: 'PATCH',
          url: '/api/user/50',
          payload: user
        };
        const { result, statusCode }  = await server.inject(options);
        expect(result).toBe(null);
        expect(statusCode).toBe(204);
      });
    });
  });
});

