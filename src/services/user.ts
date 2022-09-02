import { AppDataSource } from "..";
import { Users } from "../entity";
import { UserType } from '../utils/types';

export const createUserObect = () => new Users();

export const getUser = async (key: string, value: string | any) => {
  const userRepository = AppDataSource.getRepository(Users);
  const user: UserType | any = await userRepository.findOneBy({ 
    [key]: value
  });
  return user;
}

export const saveUser = async (user: UserType) => {
  const userRepository = AppDataSource.getRepository(Users);
  const savedUser: UserType | any = await userRepository.save(user);
  return savedUser;
}