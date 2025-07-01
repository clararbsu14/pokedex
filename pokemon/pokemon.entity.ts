import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorite } from '../favorites/favorite.entity';

@Entity()
export class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    image: string;

    @OneToMany(() => Favorite, favorite => favorite.pokemon)
    favorites: Favorite[];
}
