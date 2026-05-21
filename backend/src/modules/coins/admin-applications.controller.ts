import {
  Body,
  Controller,
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
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApplicationStatus } from '../../common/enums/application-status.enum';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CoinsService } from './coins.service';
import { AddApplicationDocumentDto } from './dto/add-application-document.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { UpdateProductionTaskDto } from './dto/update-production-task.dto';

@ApiTags('Admin')
@ApiBearerAuth('access-token')
@Controller('admin/applications')
@UseGuards(RolesGuard)
@Roles(Role.Admin, Role.Manager)
export class AdminApplicationsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  @ApiOperation({ summary: 'List all applications with filters (Manager+)' })
  @ApiQuery({ name: 'status', required: false, enum: ApplicationStatus })
  @ApiQuery({ name: 'coinType', required: false })
  @ApiQuery({ name: 'from', required: false, description: 'ISO date' })
  @ApiQuery({ name: 'to', required: false, description: 'ISO date' })
  findAll(
    @Query('status') status?: ApplicationStatus,
    @Query('coinType') coinType?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.coinsService.findAllApplications({
      status,
      coinType,
      from,
      to,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Application detail + history + documents' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coinsService.findApplicationById(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Transition application status' })
  updateStatus(
    @CurrentUser('sub') actorId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateApplicationStatusDto,
  ) {
    return this.coinsService.updateStatus(actorId, id, dto);
  }

  @Post(':id/documents')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add document to application' })
  addDocument(
    @CurrentUser('sub') actorId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddApplicationDocumentDto,
  ) {
    return this.coinsService.addDocument(actorId, id, dto, true);
  }

  @Patch(':id/production')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update production task (factory, progress %)' })
  updateProduction(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductionTaskDto,
  ) {
    return this.coinsService.updateProduction(id, dto);
  }
}
