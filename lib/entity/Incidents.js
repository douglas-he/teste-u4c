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
exports.Incidents = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
let Incidents = class Incidents {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Incidents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Users, (user) => user.incident),
    __metadata("design:type", _1.Users)
], Incidents.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Vehicles, (vehicle) => vehicle.vehicle),
    __metadata("design:type", _1.Vehicles)
], Incidents.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Users, (user) => user.thirdParty),
    __metadata("design:type", _1.Users)
], Incidents.prototype, "thirdParty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Incidents.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'NOW()' }),
    __metadata("design:type", Date)
], Incidents.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ onUpdate: 'NOW()', nullable: true }),
    __metadata("design:type", Date)
], Incidents.prototype, "updatedAt", void 0);
Incidents = __decorate([
    (0, typeorm_1.Entity)()
], Incidents);
exports.Incidents = Incidents;
