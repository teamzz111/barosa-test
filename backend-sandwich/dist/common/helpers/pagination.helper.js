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
exports.PaginationHelper = exports.PaginationDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
class PaginationHelper {
    static createPaginationStage(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return [{ $skip: skip }, { $limit: limit }];
    }
    static createPaginationMeta(total, page, limit) {
        return {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }
    static async paginateAggregate(model, pipeline = [], countPipeline = [], page = 1, limit = 10) {
        const countResult = await model.aggregate([
            ...countPipeline,
            { $count: 'total' },
        ]);
        const total = countResult.length > 0 ? countResult[0].total : 0;
        const paginationStage = this.createPaginationStage(page, limit);
        const data = await model.aggregate([...pipeline, ...paginationStage]);
        return {
            data,
            meta: this.createPaginationMeta(total, page, limit),
        };
    }
}
exports.PaginationHelper = PaginationHelper;
//# sourceMappingURL=pagination.helper.js.map