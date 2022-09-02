const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.editUser = exports.createUser = void 0;
const entity_1 = require('../entity');
const index_1 = require('../index');

const createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
      name,
      email,
      password,
      phone,
      isClient = true,
      driverLicense,
    } = req.payload;
    let user = new entity_1.Users();
    user = {
      ...user,
      name,
      email,
      password,
      isClient,
      driverLicense,
      phone,
    };
    const userRepository = index_1.AppDataSource.getRepository(entity_1.Users);
    const data = yield userRepository.save(user);
    return res
      .response({
        status: 'Created.',
        data,
      })
      .code(201);
  });
exports.createUser = createUser;
const editUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = index_1.AppDataSource.getRepository(entity_1.Users);
    const { name, email, password, phone, isClient = true } = req.payload;
    let userToupdate = yield userRepository.findOneBy({
      id: req.params.id,
    });
    userToupdate = { ...userToupdate, name, email, password, isClient, phone };
    yield userRepository.save(userToupdate);
    return res.response().code(204);
  });
exports.editUser = editUser;
