const mockSaveUser = {
  name: 'teste',
  email: 'teste@teste.com',
  password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InRlc3RlMjIyMiIsImlhdCI6MTY2MjA1ODA0NX0.HFEMQv62ZQBsBI52tvHccAX_a8BX2M1KHfJOJId9MWc',
  isClient: true,
  driverLicense: '121',
  phone: '123123123',
  updatedAt: null,
  id: 10,
  createdAt: "2022-09-01T18:47:24.118Z"
}
const mockSaveVehicle = {
  modelName: "Camaro Amarelo",
  licensePlate: "GPA123",
  updatedAt: null,
  id: 9,
  createdAt: "2022-09-02T02:49:57.426Z",
  user: {
    id: 1,
    name: "teste123./",
    email: "Priscilla_Martins@yahoo.com",
    isClient: true,
    driverLicense: "aaaaa",
    phone: "43467957976",
    createdAt: "2022-08-31T20:48:55.553Z",
    updatedAt: null
  }
}
const mockSaveIncident = {
  vehicle: {
    id: 1,
    modelName: "Camaro Amarelo",
    licensePlate: "GPA11123",
    createdAt: "2022-08-31T20:59:37.972Z",
    updatedAt: null
  },
  eventDate: "2022-08-31T16:27:54.775Z",
  updatedAt: null,
  id: 9,
  createdAt: "2022-09-02T04:43:47.851Z",
  user: {
    id: 1,
    name: "teste123./",
    email: "Priscilla_Martins@yahoo.com",
    isClient: true,
    driverLicense: "aaaaa",
    phone: "43467957976",
    createdAt: "2022-08-31T20:48:55.553Z",
    updatedAt: null
  },
  thirdParty: {
    id: 12,
    name: "aaaaa",
    email: "usuarioNãoExistente@gmail.com",
    isClient: false,
    driverLicense: "12356789",
    phone: "123123123",
    createdAt: "2022-09-02T03:37:38.698Z",
    updatedAt: null
  }
}
module.exports = {
  mockSaveUser,
  mockSaveVehicle,
  mockSaveIncident
};