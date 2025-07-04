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
            .leftJoinAndSelect('pokemon.types', 'type')  // 💡 Jointure sur la relation ManyToMany (types)
            .select([
                'pokemon.id',
                'pokemon.name_en',
                'pokemon.name_fr',
                'pokemon.name_jp',
                'pokemon.name_cn',
                'pokemon.image',
                'type.id',
                'type.name'
            ]);

        if (name) {
            query.andWhere(
                `pokemon.name_fr LIKE :name 
                OR pokemon.name_en LIKE :name 
                OR pokemon.name_jp LIKE :name 
                OR pokemon.name_cn LIKE :name`,
                { name: `%${name}%` }
            );
        }

        if (typeName) {
            query.andWhere('type.name = :typeName', { typeName });
        }

        return query.getMany();
    }

    async findOne(id: number) {
        const pokemon = await this.repo.findOne({
            where: { id },
            relations: ['types'],  // 💡 Charger les types
            select: [
                'id',
                'name_en',
                'name_fr',
                'name_jp',
                'name_cn',
                'image'
            ]
        });

        if (!pokemon) {
            throw new NotFoundException('Pokemon not found');
        }

        return pokemon;
    }

    async create(data: any) {
        const types = await this.typeRepo.findByIds(data.typeIds || []);
        if (!types.length && data.typeIds?.length) {
            throw new NotFoundException('One or more types not found');
        }

        const pokemon = this.repo.create({
            ...data,
            types
        });

        return this.repo.save(pokemon);
    }

    async update(id: number, data: any) {
        const pokemon = await this.repo.findOne({ where: { id }, relations: ['types'] });
        if (!pokemon) {
            throw new NotFoundException('Pokemon not found');
        }

        if (data.typeIds) {
            const types = await this.typeRepo.findByIds(data.typeIds);
            if (!types.length && data.typeIds.length) {
                throw new NotFoundException('One or more types not found');
            }
            pokemon.types = types;
        }

        Object.assign(pokemon, data);
        return this.repo.save(pokemon);
    }

    async remove(id: number) {
        const pokemon = await this.repo.findOneBy({ id });
        if (!pokemon) {
            throw new NotFoundException('Pokemon not found');
        }
        return this.repo.remove(pokemon);
    }
}
