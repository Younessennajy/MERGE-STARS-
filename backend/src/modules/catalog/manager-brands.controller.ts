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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('Manager')
@ApiBearerAuth('access-token')
@Controller('manager/brands')
@UseGuards(RolesGuard)
@Roles(Role.Admin, Role.Manager)
export class ManagerBrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a brand (Manager & Admin)' })
  @ApiResponse({ status: 201, description: 'Brand created.' })
  @ApiResponse({ status: 409, description: 'Name or slug already exists.' })
  create(
    @CurrentUser('sub') managerId: string,
    @Body() dto: CreateBrandDto,
  ) {
    return this.brandsService.create(managerId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all brands with product count' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand details' })
  @ApiParam({ name: 'id', description: 'Brand UUID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a brand' })
  @ApiParam({ name: 'id', description: 'Brand UUID' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a brand (only if no products linked)' })
  @ApiParam({ name: 'id', description: 'Brand UUID' })
  @ApiResponse({ status: 409, description: 'Brand has linked products.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.remove(id);
  }
}
