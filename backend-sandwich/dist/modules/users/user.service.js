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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_repository_1 = require("../auth/dto/auth.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { email, password } = createUserDto;
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userWithHashedPassword = {
            ...createUserDto,
            password: hashedPassword,
        };
        return this.userRepository.createUser(userWithHashedPassword);
    }
    async findAll(page = 1, limit = 10) {
        return this.userRepository.findAllUsers(page, limit);
    }
    async findOne(id) {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async findByEmailWithPassword(email) {
        return this.userRepository.findByEmailWithPassword(email);
    }
    async update(id, updateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
        if (!updatedUser) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return updatedUser;
    }
    async remove(id) {
        const result = await this.userRepository.deleteUser(id);
        if (!result) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
    }
    async search(query, page = 1, limit = 10) {
        return this.userRepository.searchUsers(query, page, limit);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map