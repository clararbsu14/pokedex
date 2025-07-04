import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) { }

    findByEmail(email: string) {
        return this.repo.findOneBy({ email });
    }

    findById(id: number) {
        return this.repo.findOneBy({ id });
    }

    create(data: any) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }
}
