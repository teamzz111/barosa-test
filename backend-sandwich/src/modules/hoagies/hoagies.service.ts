import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PaginationResult } from 'src/common/helpers/pagination.helper';
import { CreateHoagieDto } from './dto/create-hoagie.dto';
import { UpdateHoagieDto } from './dto/update-hoagie.dto';
import { Hoagie } from './entities/hoagies.entity';
import { HoagieRepository } from './hoagies.repository';

@Injectable()
export class HoagieService {
  constructor(private readonly hoagieRepository: HoagieRepository) {}

  async create(
    createHoagieDto: CreateHoagieDto,
    userId: string,
  ): Promise<Hoagie> {
    if (
      !createHoagieDto.name ||
      !createHoagieDto.ingredients ||
      createHoagieDto.ingredients.length === 0
    ) {
      throw new BadRequestException(
        'Hoagie name and at least one ingredient are required',
      );
    }

    return this.hoagieRepository.createHoagie(createHoagieDto, userId);
  }

  /**
   * Obtiene una lista paginada de hoagies
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResult<Hoagie>> {
    return this.hoagieRepository.getPaginatedHoagies(page, limit);
  }

  /**
   * Obtiene un hoagie por su ID con detalles
   */
  async findOne(id: string): Promise<Hoagie> {
    const hoagie = await this.hoagieRepository.getHoagieWithDetails(id);
    if (!hoagie) {
      throw new NotFoundException(`Hoagie with ID "${id}" not found`);
    }
    return hoagie;
  }

  /**
   * Actualiza un hoagie existente
   */
  async update(
    id: string,
    updateHoagieDto: UpdateHoagieDto,
    userId: string,
  ): Promise<Hoagie> {
    const hoagie = await this.findOne(id);

    // Verificar permisos
    const isCreator = hoagie.creator._id.toString() === userId;
    const isCollaborator = hoagie.collaborators?.some(
      (collaborator) => collaborator.toString() === userId,
    );

    if (!isCreator && !isCollaborator) {
      throw new ForbiddenException(
        'You do not have permission to update this hoagie',
      );
    }

    const updatedHoagie = await this.hoagieRepository.update(
      id,
      updateHoagieDto,
    );
    if (!updatedHoagie) {
      throw new NotFoundException(`Failed to update hoagie with ID "${id}"`);
    }

    return updatedHoagie;
  }

  /**
   * Elimina un hoagie
   */
  async remove(id: string, userId: string): Promise<void> {
    const hoagie = await this.findOne(id);

    // Solo el creador puede eliminar el hoagie
    if (hoagie.creator._id.toString() !== userId) {
      throw new ForbiddenException('Only the creator can delete this hoagie');
    }

    const deleted = await this.hoagieRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Failed to delete hoagie with ID "${id}"`);
    }
  }

  /**
   * Agrega un colaborador a un hoagie
   */
  async addCollaborator(
    hoagieId: string,
    collaboratorId: string,
    userId: string,
  ): Promise<Hoagie> {
    const hoagie = await this.findOne(hoagieId);

    // Solo el creador puede añadir colaboradores
    if (hoagie.creator._id.toString() !== userId) {
      throw new ForbiddenException('Only the creator can add collaborators');
    }

    // Verificar que el colaborador no sea el mismo creador
    if (collaboratorId === userId) {
      throw new BadRequestException(
        'You cannot add yourself as a collaborator',
      );
    }

    // Verificar si el usuario ya es colaborador
    const isAlreadyCollaborator = hoagie.collaborators?.some(
      (collaborator) => collaborator.toString() === collaboratorId,
    );

    if (isAlreadyCollaborator) {
      throw new BadRequestException('User is already a collaborator');
    }

    const updatedHoagie = await this.hoagieRepository.addCollaborator(
      hoagieId,
      collaboratorId,
    );
    if (!updatedHoagie) {
      throw new NotFoundException(
        `Failed to add collaborator to hoagie with ID "${hoagieId}"`,
      );
    }

    return updatedHoagie;
  }

  /**
   * Elimina un colaborador de un hoagie
   */
  async removeCollaborator(
    hoagieId: string,
    collaboratorId: string,
    userId: string,
  ): Promise<Hoagie> {
    const hoagie = await this.findOne(hoagieId);

    // Solo el creador puede eliminar colaboradores
    if (hoagie.creator._id.toString() !== userId) {
      throw new ForbiddenException('Only the creator can remove collaborators');
    }

    const updatedHoagie = await this.hoagieRepository.removeCollaborator(
      hoagieId,
      collaboratorId,
    );
    if (!updatedHoagie) {
      throw new NotFoundException(
        `Failed to remove collaborator from hoagie with ID "${hoagieId}"`,
      );
    }

    return updatedHoagie;
  }

  /**
   * Obtiene el número de colaboradores de un hoagie
   */
  async getCollaboratorCount(hoagieId: string): Promise<number> {
    await this.findOne(hoagieId); // Asegura que el hoagie existe
    return this.hoagieRepository.getCollaboratorCount(hoagieId);
  }

  /**
   * Obtiene los hoagies creados por un usuario específico
   */
  async findByCreator(
    creatorId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResult<Hoagie>> {
    return this.hoagieRepository.getHoagiesByCreator(creatorId, page, limit);
  }

  /**
   * Obtiene los hoagies donde un usuario es colaborador
   */
  async findByCollaborator(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResult<Hoagie>> {
    return this.hoagieRepository.getHoagiesByCollaborator(userId, page, limit);
  }

  /**
   * Busca hoagies por nombre o ingredientes
   */
  async search(
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginationResult<Hoagie>> {
    if (!query || query.trim() === '') {
      return this.findAll(page, limit);
    }

    return this.hoagieRepository.searchHoagies(query, page, limit);
  }

  /**
   * Verifica si un usuario tiene permisos para modificar un hoagie
   */
  async checkPermission(
    hoagieId: string,
    userId: string,
  ): Promise<{ isCreator: boolean; isCollaborator: boolean }> {
    const hoagie = await this.findOne(hoagieId);

    const isCreator = hoagie.creator._id.toString() === userId;
    const isCollaborator = hoagie.collaborators?.some(
      (collaborator) => collaborator.toString() === userId,
    );

    return { isCreator, isCollaborator };
  }
}
