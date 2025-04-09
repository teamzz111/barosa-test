"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(entityModel) {
        this.entityModel = entityModel;
    }
    async create(dto) {
        const newEntity = new this.entityModel(dto);
        return newEntity.save();
    }
    async findOne(filterQuery) {
        return this.entityModel.findOne(filterQuery);
    }
    async findById(id) {
        return this.entityModel.findById(id);
    }
    async find(filterQuery) {
        return this.entityModel.find(filterQuery);
    }
    async findAll() {
        return this.entityModel.find();
    }
    async update(id, updateDto) {
        return this.entityModel.findByIdAndUpdate(id, updateDto, { new: true });
    }
    async delete(id) {
        return this.entityModel.findByIdAndDelete(id);
    }
    async deleteMany(filterQuery) {
        const result = await this.entityModel.deleteMany(filterQuery);
        return result.deletedCount > 0;
    }
    async count(filterQuery) {
        return this.entityModel.countDocuments(filterQuery);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map