"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoagiesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const hoagies_entity_1 = require("./entities/hoagies.entity");
const hoagies_controller_1 = require("./hoagies.controller");
const hoagies_repository_1 = require("./hoagies.repository");
const hoagies_service_1 = require("./hoagies.service");
let HoagiesModule = class HoagiesModule {
};
exports.HoagiesModule = HoagiesModule;
exports.HoagiesModule = HoagiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: hoagies_entity_1.Hoagie.name, schema: hoagies_entity_1.HoagieSchema }]),
        ],
        controllers: [hoagies_controller_1.HoagiesController],
        providers: [hoagies_service_1.HoagieService, hoagies_repository_1.HoagieRepository],
        exports: [hoagies_service_1.HoagieService],
    })
], HoagiesModule);
//# sourceMappingURL=hoagies.module.js.map