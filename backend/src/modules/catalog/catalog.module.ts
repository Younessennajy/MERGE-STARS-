import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ManagerBrandsController } from './manager-brands.controller';
import { ManagerCategoriesController } from './manager-categories.controller';
import { ManagerProductsController } from './manager-products.controller';
import { ProductsService } from './products.service';
import { PublicCatalogController } from './public-catalog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Category, Product])],
  controllers: [
    ManagerBrandsController,
    ManagerCategoriesController,
    ManagerProductsController,
    PublicCatalogController,
  ],
  providers: [BrandsService, CategoriesService, ProductsService],
  exports: [BrandsService, CategoriesService, ProductsService],
})
export class CatalogModule {}
