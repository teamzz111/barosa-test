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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoagiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hoagies_service_1 = require("./hoagies.service");
const pagination_helper_1 = require("../../common/helpers/pagination.helper");
const update_hoagie_dto_1 = require("./dto/update-hoagie.dto");
const create_hoagie_dto_1 = require("./dto/create-hoagie.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let HoagiesController = class HoagiesController {
    constructor(hoagieService) {
        this.hoagieService = hoagieService;
    }
    create(createHoagieDto, req) {
        return this.hoagieService.create(createHoagieDto, req.user.id);
    }
    findAll(paginationDto) {
        return this.hoagieService.findAll(paginationDto.page, paginationDto.limit);
    }
    search(query, paginationDto) {
        return this.hoagieService.search(query, paginationDto.page, paginationDto.limit);
    }
    findByCreator(userId, paginationDto) {
        return this.hoagieService.findByCreator(userId, paginationDto.page, paginationDto.limit);
    }
    findByCollaborator(req, paginationDto) {
        return this.hoagieService.findByCollaborator(req.user.id, paginationDto.page, paginationDto.limit);
    }
    findOne(id) {
        return this.hoagieService.findOne(id);
    }
    update(id, updateHoagieDto, req) {
        return this.hoagieService.update(id, updateHoagieDto, req.user.id);
    }
    async remove(id, req) {
        await this.hoagieService.remove(id, req.user.id);
        return;
    }
    addCollaborator(id, collaboratorId, req) {
        return this.hoagieService.addCollaborator(id, collaboratorId, req.user.id);
    }
    removeCollaborator(id, collaboratorId, req) {
        return this.hoagieService.removeCollaborator(id, collaboratorId, req.user.id);
    }
    async getCollaboratorCount(id) {
        const count = await this.hoagieService.getCollaboratorCount(id);
        return { count };
    }
    async checkPermission(id, req) {
        return this.hoagieService.checkPermission(id, req.user.id);
    }
};
exports.HoagiesController = HoagiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new hoagie' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The hoagie has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hoagie_dto_1.CreateHoagieDto, Object]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all hoagies with pagination' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (starting from 1)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the hoagies.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_helper_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Search hoagies by name or ingredients' }),
    (0, swagger_1.ApiQuery)({
        name: 'query',
        required: true,
        type: String,
        description: 'Search term',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the matching hoagies.' }),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_helper_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Get hoagies created by a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'The ID of the user' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the hoagies.' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_helper_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "findByCreator", null);
__decorate([
    (0, common_1.Get)('collaborations'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get hoagies where the current user is a collaborator',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Items per page',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the hoagies.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_helper_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "findByCollaborator", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a hoagie by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the hoagie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the hoagie.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hoagie not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a hoagie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the hoagie' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The hoagie has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hoagie not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hoagie_dto_1.UpdateHoagieDto, Object]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a hoagie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the hoagie' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'The hoagie has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hoagie not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HoagiesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/collaborators/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a collaborator to a hoagie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the hoagie' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'The ID of the user to add as collaborator',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The collaborator has been successfully added.',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hoagie not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "addCollaborator", null);
__decorate([
    (0, common_1.Delete)(':id/collaborators/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a collaborator from a hoagie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the hoagie' }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        description: 'The ID of the user to remove as collaborator',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The collaborator has been successfully removed.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hoagie not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], HoagiesController.prototype, "removeCollaborator", null);
__decorate([
    (0, common_1.Get)(':id/collaborators/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the number of collaborators for a hoagie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the hoagie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the collaborator count.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hoagie not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HoagiesController.prototype, "getCollaboratorCount", null);
__decorate([
    (0, common_1.Get)(':id/permissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Check user permissions for a hoagie' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The ID of the hoagie' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return the permission information.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Hoagie not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HoagiesController.prototype, "checkPermission", null);
exports.HoagiesController = HoagiesController = __decorate([
    (0, swagger_1.ApiTags)('hoagies'),
    (0, common_1.Controller)('hoagies'),
    __metadata("design:paramtypes", [hoagies_service_1.HoagieService])
], HoagiesController);
//# sourceMappingURL=hoagies.controller.js.map