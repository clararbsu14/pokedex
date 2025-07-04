// favorites/favorite.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favoris } from './favorite.entity';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Favoris])],
    providers: [FavoriteService],
    controllers: [FavoriteController],
    exports: [FavoriteService],
})
export class FavoriteModule { }
