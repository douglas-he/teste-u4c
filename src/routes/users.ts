import { User } from '../controllers';
import { Route } from '../utils/types';
import { payloadCreateUser, payloadEditUser } from '../utils/validate';

export const userRoutes: 
  Route []
  = [
    {
      method: "POST",
      path: "/api/user",
      handler: User.createUser,
      options: {
        validate: {
          payload: payloadCreateUser,
        }
      }
    },
    {
      method: "PATCH",
      path: "/api/user/{id}",
      handler: User.editUser,
      options: {
        validate: {
          payload: payloadEditUser,
        }
      }
  }
];