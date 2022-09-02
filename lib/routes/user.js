Object.defineProperty(exports, '__esModule', { value: true });
exports.userRoutes = void 0;
const controllers_1 = require('../controllers');

exports.userRoutes = [
  {
    method: 'POST',
    path: '/api/user',
    handler: controllers_1.User.createUser,
  },
  {
    method: 'PATCH',
    path: '/api/user/{id}',
    handler: controllers_1.User.editUser,
  },
];
