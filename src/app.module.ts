// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';
import { TypeModule } from './type/module';
import { FavoriteModule } from './favorites/favorite.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'pokedex',
      autoLoadEntities: true,
      synchronize: false,
    }),

    PokemonModule,
    TypeModule,
    FavoriteModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule { }
