import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
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
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { AssignRolesDto } from './dto/assign-roles.dto';
import { ChangeUserEmailDto } from './dto/change-user-email.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';

@ApiTags('Admin')
@ApiBearerAuth('access-token')
@Controller('admin')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @Roles(Role.Admin, Role.Manager)
  @ApiOperation({ summary: 'List all users (Admin & Manager)' })
  @ApiResponse({ status: 200, description: 'User list returned.' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions.' })
  getAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Get('stats')
  @Roles(Role.Admin, Role.Manager)
  @ApiOperation({ summary: 'User count breakdown by role' })
  @ApiResponse({ status: 200, description: 'Stats returned.' })
  getStats() {
    return this.adminService.getStats();
  }

  @Patch('users/:id/roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign roles to a user (Admin only)' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'Roles updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  assignRoles(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: AssignRolesDto,
  ) {
    return this.adminService.assignRoles(userId, dto);
  }

  @Patch('users/:id/email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change a user email (Admin only)' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'Email updated.' })
  @ApiResponse({ status: 409, description: 'Email already in use.' })
  changeEmail(
    @CurrentUser() admin: JwtPayload,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: ChangeUserEmailDto,
  ) {
    return this.adminService.changeEmail(admin.sub, userId, dto);
  }

  @Patch('users/:id/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset a user password (Admin only)' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 200, description: 'Password updated.' })
  @ApiResponse({ status: 409, description: 'Same as current password.' })
  changePassword(
    @CurrentUser() admin: JwtPayload,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: ChangeUserPasswordDto,
  ) {
    return this.adminService.changePassword(admin.sub, userId, dto);
  }
}
