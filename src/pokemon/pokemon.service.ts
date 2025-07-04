import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';
import { Type } from '../type/entity';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon) private repo: Repository<Pokemon>,
        @InjectRepository(Type) private typeRepo: Repository<Type>
    ) { }

    async findAll(name?: string, typeName?: string) {
        const query = this.repo.createQueryBuilder('pokemon')
            .leftJoinAndSelect('pokemon.types', 'type')
            .select([
                'pokemon.id',
                'pokemon.name_fr',
                'pokemon.image',
                'pokemon.hp',
                'pokemon.attack',
                'pokemon.defense',
                'pokemon.sp_attack',
                'pokemon.sp_defense',
                'pokemon.speed',
                'type.id',
                'type.name'
            ]);

        if (name) {
            query.andWhere(
                `pokemon.name_fr LIKE :name OR 
                 pokemon.name_en LIKE :name OR 
                 pokemon.name_jp LIKE :name OR 
                 pokemon.name_cn LIKE :name`,
                { name: `%${name}%` }
            );
        }

        if (typeName) {
            query.andWhere('type.name = :typeName', { typeName });
        }

        return query.getMany();
    }

    async findOne(id: number) {
        const pokemon = await this.repo.createQueryBuilder('pokemon')
            .leftJoinAndSelect('pokemon.types', 'type')
            .where('pokemon.id = :id', { id })
            .getOne();

        if (!pokemon) {
            throw new NotFoundException('Pokemon not found');
        }

        return pokemon;
    }
}
