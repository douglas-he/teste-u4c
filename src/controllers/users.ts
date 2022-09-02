import JWT from 'jsonwebtoken';
import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserType } from '../utils/types';
import { createUserObect, getUser, saveUser } from '../services/user';

export const createUser = async (req : Request , res: ResponseToolkit) => {
  const {
    name, email, password, phone, driverLicense,
  } = req.payload as UserType;
  
  let user: UserType | any = await getUser('driverLicense', driverLicense) || createUserObect();
  const statusCode = user.id ? 204 : 201;
  
  user = { 
    ...user,
    name,
    email,
    password: JWT.sign({ password }, process.env.SECRET as string),
    isClient: true,
    driverLicense: driverLicense as string,
    phone,
  };

  const { password: _password, ...data } = await saveUser(user);
  return res.response({
    status: 'Created',
    data,
  }).code(statusCode);
};

export const editUser = async (req : Request , res: ResponseToolkit) => {
  const {
    name, email, password, phone,
   } = req.payload as UserType;
  
  let userToupdate: UserType | null = await getUser('id', req.params.id);
  if(userToupdate && userToupdate.id){
    userToupdate = { 
      ...userToupdate,
      name,
      email,
      password: JWT.sign({ password }, process.env.SECRET as string),
      phone,
    };
    
    await saveUser(userToupdate);
  }

  return res.response().code(204);
};
