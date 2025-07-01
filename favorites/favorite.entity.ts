import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @ManyToOne(() => Pokemon, pokemon => pokemon.favorites)
    pokemon: Pokemon;
}
