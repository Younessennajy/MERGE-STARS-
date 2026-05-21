import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';

@ApiTags('Catalog')
@Controller('catalog')
export class PublicCatalogController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly brandsService: BrandsService,
    private readonly productsService: ProductsService,
  ) {}

  @Public()
  @Get('categories')
  @ApiOperation({ summary: 'Public — list active categories for homepage' })
  getCategories() {
    return this.categoriesService.findAllPublic();
  }

  @Public()
  @Get('brands')
  @ApiOperation({ summary: 'Public — list active brands' })
  getBrands() {
    return this.brandsService.findAllPublic();
  }

  @Public()
  @Get('products')
  @ApiOperation({ summary: 'Public — list active products' })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'brandId', required: false })
  getProducts(
    @Query('categoryId') categoryId?: string,
    @Query('brandId') brandId?: string,
  ) {
    return this.productsService.findAllPublic({ categoryId, brandId });
  }
}
