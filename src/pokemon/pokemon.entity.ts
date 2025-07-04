import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Type } from '../type/entity';
import { Favoris } from '../favorites/favorite.entity';

@Entity()
export class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_en: string;

    @Column()
    name_fr: string;

    @Column()
    name_jp: string;

    @Column()
    name_cn: string;

    @Column()
    image: string;

    @ManyToMany(() => Type, type => type.pokemons)
    @JoinTable({
        name: 'pokemon_type',
        joinColumn: { name: 'pokemon_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'type_id', referencedColumnName: 'id' }
    })
    types: Type[];

    @OneToMany(() => Favoris, favori => favori.pokemon)
    favoris: Favoris[];
}
