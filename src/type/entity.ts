import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Pokemon, pokemon => pokemon.types)
    pokemons: Pokemon[];
}
