import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetalPrice } from './entities/metal-price.entity';
import { MetalsController } from './metals.controller';
import { MetalsService } from './metals.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetalPrice])],
  controllers: [MetalsController],
  providers: [MetalsService],
  exports: [MetalsService],
})
export class MetalsModule {}
