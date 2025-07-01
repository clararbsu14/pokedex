import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private repo: Repository<Pokemon>,
    ) { }

    findAll(limit: number, offset: number, name?: string, type?: string) {
        const where: any = {};
        if (name) where.name = Like(`%${name}%`);
        if (type) where.type = type;
        return this.repo.find({
            where,
            skip: offset,
            take: limit,
        });
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    create(data: Partial<Pokemon>) {
        return this.repo.save(data);
    }

    update(id: number, data: Partial<Pokemon>) {
        return this.repo.update(id, data);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
