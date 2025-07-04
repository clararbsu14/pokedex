// favorites/favorite.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class Favoris {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favoris)
    user: User;

    @ManyToOne(() => Pokemon, pokemon => pokemon.favoris)
    pokemon: Pokemon;
}
