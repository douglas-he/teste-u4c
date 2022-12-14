"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicles = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
let Vehicles = class Vehicles {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vehicles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicles.prototype, "modelName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Vehicles.prototype, "licensePlate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'NOW()' }),
    __metadata("design:type", Date)
], Vehicles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ onUpdate: 'NOW()', nullable: true }),
    __metadata("design:type", Date)
], Vehicles.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Users, (user) => user.vehicle),
    __metadata("design:type", _1.Users)
], Vehicles.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Incidents, (incident) => incident.vehicle),
    __metadata("design:type", Array)
], Vehicles.prototype, "vehicle", void 0);
Vehicles = __decorate([
    (0, typeorm_1.Entity)()
], Vehicles);
exports.Vehicles = Vehicles;
