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
exports.HoagieService = void 0;
const common_1 = require("@nestjs/common");
const hoagies_repository_1 = require("./hoagies.repository");
let HoagieService = class HoagieService {
    constructor(hoagieRepository) {
        this.hoagieRepository = hoagieRepository;
    }
    async create(createHoagieDto, userId) {
        if (!createHoagieDto.name ||
            !createHoagieDto.ingredients ||
            createHoagieDto.ingredients.length === 0) {
            throw new common_1.BadRequestException('Hoagie name and at least one ingredient are required');
        }
        return this.hoagieRepository.createHoagie(createHoagieDto, userId);
    }
    async findAll(page = 1, limit = 10) {
        return this.hoagieRepository.getPaginatedHoagies(page, limit);
    }
    async findOne(id) {
        const hoagie = await this.hoagieRepository.getHoagieWithDetails(id);
        if (!hoagie) {
            throw new common_1.NotFoundException(`Hoagie with ID "${id}" not found`);
        }
        return hoagie;
    }
    async update(id, updateHoagieDto, userId) {
        const hoagie = await this.findOne(id);
        const isCreator = hoagie.creator._id.toString() === userId;
        const isCollaborator = hoagie.collaborators?.some((collaborator) => collaborator.toString() === userId);
        if (!isCreator && !isCollaborator) {
            throw new common_1.ForbiddenException('You do not have permission to update this hoagie');
        }
        const updatedHoagie = await this.hoagieRepository.update(id, updateHoagieDto);
        if (!updatedHoagie) {
            throw new common_1.NotFoundException(`Failed to update hoagie with ID "${id}"`);
        }
        return updatedHoagie;
    }
    async remove(id, userId) {
        const hoagie = await this.findOne(id);
        if (hoagie.creator._id.toString() !== userId) {
            throw new common_1.ForbiddenException('Only the creator can delete this hoagie');
        }
        const deleted = await this.hoagieRepository.delete(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Failed to delete hoagie with ID "${id}"`);
        }
    }
    async addCollaborator(hoagieId, collaboratorId, userId) {
        const hoagie = await this.findOne(hoagieId);
        if (hoagie.creator._id.toString() !== userId) {
            throw new common_1.ForbiddenException('Only the creator can add collaborators');
        }
        if (collaboratorId === userId) {
            throw new common_1.BadRequestException('You cannot add yourself as a collaborator');
        }
        const isAlreadyCollaborator = hoagie.collaborators?.some((collaborator) => collaborator.toString() === collaboratorId);
        if (isAlreadyCollaborator) {
            throw new common_1.BadRequestException('User is already a collaborator');
        }
        const updatedHoagie = await this.hoagieRepository.addCollaborator(hoagieId, collaboratorId);
        if (!updatedHoagie) {
            throw new common_1.NotFoundException(`Failed to add collaborator to hoagie with ID "${hoagieId}"`);
        }
        return updatedHoagie;
    }
    async removeCollaborator(hoagieId, collaboratorId, userId) {
        const hoagie = await this.findOne(hoagieId);
        if (hoagie.creator._id.toString() !== userId) {
            throw new common_1.ForbiddenException('Only the creator can remove collaborators');
        }
        const updatedHoagie = await this.hoagieRepository.removeCollaborator(hoagieId, collaboratorId);
        if (!updatedHoagie) {
            throw new common_1.NotFoundException(`Failed to remove collaborator from hoagie with ID "${hoagieId}"`);
        }
        return updatedHoagie;
    }
    async getCollaboratorCount(hoagieId) {
        await this.findOne(hoagieId);
        return this.hoagieRepository.getCollaboratorCount(hoagieId);
    }
    async findByCreator(creatorId, page = 1, limit = 10) {
        return this.hoagieRepository.getHoagiesByCreator(creatorId, page, limit);
    }
    async findByCollaborator(userId, page = 1, limit = 10) {
        return this.hoagieRepository.getHoagiesByCollaborator(userId, page, limit);
    }
    async search(query, page = 1, limit = 10) {
        if (!query || query.trim() === '') {
            return this.findAll(page, limit);
        }
        return this.hoagieRepository.searchHoagies(query, page, limit);
    }
    async checkPermission(hoagieId, userId) {
        const hoagie = await this.findOne(hoagieId);
        const isCreator = hoagie.creator._id.toString() === userId;
        const isCollaborator = hoagie.collaborators?.some((collaborator) => collaborator.toString() === userId);
        return { isCreator, isCollaborator };
    }
};
exports.HoagieService = HoagieService;
exports.HoagieService = HoagieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hoagies_repository_1.HoagieRepository])
], HoagieService);
//# sourceMappingURL=hoagies.service.js.map