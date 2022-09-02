const __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    const c = arguments.length;
    let r =
      c < 3
        ? target
        : desc === null
        ? (desc = Object.getOwnPropertyDescriptor(target, key))
        : desc;
    let d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (let i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
const __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Vehicle = void 0;
const typeorm_1 = require('typeorm');

let Vehicle = class Vehicle {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata('design:type', Number)],
  Vehicle.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', String)],
  Vehicle.prototype,
  'modelName',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', String)],
  Vehicle.prototype,
  'licensePlate',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', Number)],
  Vehicle.prototype,
  'idUser',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ default: 'NOW()' }),
    __metadata('design:type', Date),
  ],
  Vehicle.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ onUpdate: 'NOW()', nullable: true }),
    __metadata('design:type', Date),
  ],
  Vehicle.prototype,
  'updatedAt',
  void 0,
);
Vehicle = __decorate([(0, typeorm_1.Entity)()], Vehicle);
exports.Vehicle = Vehicle;
