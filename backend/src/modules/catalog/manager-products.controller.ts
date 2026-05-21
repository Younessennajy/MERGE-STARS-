import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Manager')
@ApiBearerAuth('access-token')
@Controller('manager/products')
@UseGuards(RolesGuard)
@Roles(Role.Admin, Role.Manager)
export class ManagerProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a product under a category (Manager & Admin)',
    description: 'categoryId is required. brandId is optional.',
  })
  @ApiResponse({ status: 201, description: 'Product created.' })
  @ApiResponse({ status: 404, description: 'Category or brand not found.' })
  @ApiResponse({ status: 409, description: 'SKU already exists.' })
  create(
    @CurrentUser('sub') managerId: string,
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(managerId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List products (filter by brandId and/or categoryId)' })
  @ApiQuery({ name: 'brandId', required: false, description: 'Filter by brand UUID' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filter by category UUID',
  })
  findAll(
    @Query('brandId') brandId?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.productsService.findAll({ brandId, categoryId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product details' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
