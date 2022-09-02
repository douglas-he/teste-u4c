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
exports.Car = void 0;
const typeorm_1 = require('typeorm');

let Car = class Car {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata('design:type', Number)],
  Car.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', String)],
  Car.prototype,
  'modelName',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', String)],
  Car.prototype,
  'licensePlate',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', Number)],
  Car.prototype,
  'idUser',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ default: 'NOW()' }),
    __metadata('design:type', Date),
  ],
  Car.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ onUpdate: 'NOW()', nullable: true }),
    __metadata('design:type', Date),
  ],
  Car.prototype,
  'updatedAt',
  void 0,
);
Car = __decorate([(0, typeorm_1.Entity)()], Car);
exports.Car = Car;
