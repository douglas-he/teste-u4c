# Boas vindas ao repositório teste-u4c

### Api de eventos de proteção veicular

### Principais Tecnoligas

- Typescript
- HapiJS
- TypeORM
- PostgresSQL
- Jest

### Como executar:

#### Você deve ter instalado e configurado: 

- [Node.js](https://nodejs.org/en/)
- [PostgressSQL](https://www.postgresql.org/)
- [Yarn](https://yarnpkg.com/)

1. Clonar o repositorio, em seu terminal bash ou cmd, acesse a pata raiz e execute o comando `yarn`;
2. Crie seu arquivo .env no diretorio raiz, conforme o exemplo do arquivo .env.example;
3. Para rodar o projeto utilize `yarn dev`, seu servidor ira executar na url `http://localhost:4000` caso mantenha os valores `HOST` e `PORT` do exemplo;

### Rotas

<details>

<summary style="font-size:14px">

 #### POST /api/user
</summary>

#### Cadastro de usuario e edição de terceiro já cadastrado

Modelo de entrada:

```json
  {
    "name": "Nome ficticio",
    "password": "senha fictia",
    "email": "email@email.com",
    "phone": "999999999",
    "driverLicense": "registro falso"
  }
```

Modelo de saída:

Status Code **201**

```json
  {
    "status": "Created",
    "data": {
      "name": "Nome ficticio",
      "email": "email@email.com",
      "isClient": true,
      "driverLicense": "registro falso",
      "phone": "999999999",
      "updatedAt": null,
      "id": 4,
      "createdAt": "2022-09-02T06:16:00.534Z"
    }
  }
```

**Nota**: Caso o campo `driverLicense` exista, essa rota realiza uma edição e não possuí objeto de sáida e retorna Status Code **204**.
</details>

<details>

<summary style="font-size:14px">

 #### PATCH /api/user/{id}
</summary>

#### Edição de usuario

Modelo de entrada:

```json
{
  "name": "Nome ficticio",
  "password": "senha fictia",
  "email": "email@email.com",
  "phone": "999999999"
}
```

Essa rota realiza uma edição e não possuí objeto de sáida e retorna Status Code **204**.
</details>

<details>

<summary style="font-size:14px">

 #### POST /api/vehicle
</summary>

#### Cadastro de veículo

Modelo de entrada:

```json
{
  "modelName": "Modelo de Carro",
  "licensePlate": "PLACADECARRO",
  "userId": 1
}
```

Modelo de saída:

Status Code **201**

```json
{
  "status": "Created",
  "data": {
    "modelName": "Modelo de Carro",
    "licensePlate": "PLACADECARRO",
    "updatedAt": null,
    "id": 1,
    "createdAt": "2022-09-02T06:16:00.534Z",
    "user": {
      "id": 1,
      "name": "Nome ficticio",
      "email": "email@email.com",
      "isClient": true,
      "driverLicense": "aa2a3aaaa",
      "phone": "999999999",
      "createdAt": "2022-09-02T05:38:42.021Z",
      "updatedAt": null
    }
  }
}
```

</details>

<details>

<summary style="font-size:14px">

 #### POST /api/incident
</summary>

#### Cadastro de incidente

Modelo de entrada:

```json
 {
   "thirdParty": {
     "name": "Terceiro", 
     "email": "terceiro@gmail.com", 
     "driverLicense": "licensadoterceiro", 
     "phone" : "999999999"
   },
    "vehicleId": 1, 
    "userId": 1, 
    "eventDate": "2022-08-31 13:27:54.775829"
 }
```

Modelo de saída:

Status Code **201**

```json
{
  "status": "Created",
  "data": {
    "vehicle": {
      "id": 1,
      "modelName": "Modelo de Carro",
      "licensePlate": "PLACADECARRO",
      "createdAt": "2022-09-02T06:16:00.534Z",
      "updatedAt": null
    },
    "eventDate": "2022-08-31T16:27:54.775Z",
    "updatedAt": null,
    "id": 1,
    "createdAt": "2022-09-02T06:16:00.534Z",
    "user": {
      "id": 1,
      "name": "Nome ficticio",
      "email": "email@email.com",
      "isClient": true,
      "driverLicense": "aa2a3aaaa",
      "phone": "999999999",
      "createdAt": "2022-09-02T05:38:42.021Z",
      "updatedAt": null
    },
    "thirdParty": {
      "id": 5,
      "name": "Terceiro",
      "email": "terceiro@gmail.com",
      "isClient": false,
      "driverLicense": "licensadoterceiro",
      "phone": "999999999",
      "createdAt": "2022-09-02T06:16:00.534Z",
      "updatedAt": null
    }
  }
}
```

</details>

### Execução de testes

Para executar os testes utilize o comando `yarn test` e para verificar a cobertura execute o comando `yarn test:coverage`.
