import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite)
        private repo: Repository<Favorite>,
    ) { }

    create(fav: Partial<Favorite>) {
        return this.repo.save(fav);
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
