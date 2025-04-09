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
exports.HoagieRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hoagies_entity_1 = require("./entities/hoagies.entity");
const pagination_helper_1 = require("../../common/helpers/pagination.helper");
const base_repository_1 = require("../../common/helpers/base.repository");
let HoagieRepository = class HoagieRepository extends base_repository_1.BaseRepository {
    constructor(hoagieModel) {
        super(hoagieModel);
        this.hoagieModel = hoagieModel;
    }
    async createHoagie(dto, creatorId) {
        const hoagie = new this.hoagieModel({
            ...dto,
            creator: new mongoose_2.Types.ObjectId(creatorId),
        });
        return hoagie.save();
    }
    async getPaginatedHoagies(page = 1, limit = 10) {
        const pipeline = [
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creatorDetails',
                },
            },
            { $unwind: '$creatorDetails' },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'hoagie',
                    as: 'comments',
                },
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' },
                    creator: {
                        _id: '$creatorDetails._id',
                        name: '$creatorDetails.name',
                        email: '$creatorDetails.email',
                    },
                },
            },
            {
                $project: {
                    comments: 0,
                    creatorDetails: 0,
                },
            },
        ];
        return pagination_helper_1.PaginationHelper.paginateAggregate(this.hoagieModel, pipeline, [], page, limit);
    }
    async getHoagieWithDetails(id) {
        const [hoagie] = await this.hoagieModel.aggregate([
            { $match: { _id: new mongoose_2.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creatorDetails',
                },
            },
            { $unwind: '$creatorDetails' },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'hoagie',
                    as: 'comments',
                },
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' },
                    creator: {
                        _id: '$creatorDetails._id',
                        name: '$creatorDetails.name',
                        email: '$creatorDetails.email',
                    },
                },
            },
            {
                $project: {
                    comments: 0,
                    creatorDetails: 0,
                },
            },
        ]);
        return hoagie || null;
    }
    async getHoagiesByCreator(creatorId, page = 1, limit = 10) {
        const pipeline = [
            { $match: { creator: new mongoose_2.Types.ObjectId(creatorId) } },
            { $sort: { createdAt: -1 } },
        ];
        const countPipeline = [
            { $match: { creator: new mongoose_2.Types.ObjectId(creatorId) } },
        ];
        return pagination_helper_1.PaginationHelper.paginateAggregate(this.hoagieModel, pipeline, countPipeline, page, limit);
    }
    async getHoagiesByCollaborator(userId, page = 1, limit = 10) {
        const pipeline = [
            { $match: { collaborators: new mongoose_2.Types.ObjectId(userId) } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creatorDetails',
                },
            },
            { $unwind: '$creatorDetails' },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'hoagie',
                    as: 'comments',
                },
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' },
                    creator: {
                        _id: '$creatorDetails._id',
                        name: '$creatorDetails.name',
                        email: '$creatorDetails.email',
                    },
                },
            },
            {
                $project: {
                    comments: 0,
                    creatorDetails: 0,
                },
            },
        ];
        const countPipeline = [
            { $match: { collaborators: new mongoose_2.Types.ObjectId(userId) } },
        ];
        return pagination_helper_1.PaginationHelper.paginateAggregate(this.hoagieModel, pipeline, countPipeline, page, limit);
    }
    async getCollaboratorCount(hoagieId) {
        const [result] = await this.hoagieModel.aggregate([
            { $match: { _id: new mongoose_2.Types.ObjectId(hoagieId) } },
            {
                $project: {
                    collaboratorCount: { $size: '$collaborators' },
                },
            },
        ]);
        return result?.collaboratorCount || 0;
    }
    async removeCollaborator(hoagieId, userId) {
        return this.hoagieModel.findByIdAndUpdate(hoagieId, { $pull: { collaborators: userId } }, { new: true });
    }
    async addCollaborator(hoagieId, userId) {
        return this.hoagieModel.findByIdAndUpdate(hoagieId, { $addToSet: { collaborators: userId } }, { new: true });
    }
    async searchHoagies(query, page = 1, limit = 10) {
        const searchRegex = new RegExp(query, 'i');
        const pipeline = [
            {
                $match: {
                    $or: [{ name: searchRegex }, { 'ingredients.name': searchRegex }],
                },
            },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'creator',
                    foreignField: '_id',
                    as: 'creatorDetails',
                },
            },
            { $unwind: '$creatorDetails' },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'hoagie',
                    as: 'comments',
                },
            },
            {
                $addFields: {
                    commentCount: { $size: '$comments' },
                    creator: {
                        _id: '$creatorDetails._id',
                        name: '$creatorDetails.name',
                        email: '$creatorDetails.email',
                    },
                },
            },
            {
                $project: {
                    comments: 0,
                    creatorDetails: 0,
                },
            },
        ];
        const countPipeline = [
            {
                $match: {
                    $or: [{ name: searchRegex }, { 'ingredients.name': searchRegex }],
                },
            },
        ];
        return pagination_helper_1.PaginationHelper.paginateAggregate(this.hoagieModel, pipeline, countPipeline, page, limit);
    }
};
exports.HoagieRepository = HoagieRepository;
exports.HoagieRepository = HoagieRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hoagies_entity_1.Hoagie.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HoagieRepository);
//# sourceMappingURL=hoagies.repository.js.map