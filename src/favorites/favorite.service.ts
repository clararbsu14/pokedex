// favorites/favorite.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favoris } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favoris)
        private repo: Repository<Favoris>,
    ) { }

    create(data: any) {
        return this.repo.save(data);
    }

    findByUser(userId: number) {
        return this.repo.find({
            where: { user: { id: userId } },
            relations: ['pokemon'],
        });
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
