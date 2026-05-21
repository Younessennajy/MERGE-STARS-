import { Controller, Get, Patch, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CoinsService } from '../coins/coins.service';
import { InvestmentsService } from '../investments/investments.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly coinsService: CoinsService,
    private readonly investmentsService: InvestmentsService,
  ) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(@CurrentUser('sub') userId: string) {
    const user = await this.usersService.findById(userId);
    return {
      message: 'Profile retrieved successfully.',
      user: this.usersService.toPublicProfile(user),
    };
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMe(
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(userId, dto);
    return {
      message: 'Profile updated successfully.',
      user: this.usersService.toPublicProfile(user),
    };
  }

  @Get('me/dashboard')
  @ApiOperation({ summary: 'User dashboard — balance, investments, applications' })
  async getDashboard(@CurrentUser('sub') userId: string) {
    const [user, applications, investmentSummary] = await Promise.all([
      this.usersService.findById(userId),
      this.coinsService.findUserApplications(userId),
      this.investmentsService.getSummary(userId),
    ]);

    const latestApp = applications.applications[0] ?? null;

    const recentActivity = applications.applications
      .slice(0, 5)
      .map((app) => ({
        type: 'application',
        title: `Application ${app.status.replace(/_/g, ' ')}`,
        applicationId: app.id,
        coinType: app.coinType,
        status: app.status,
        date: app.updatedAt,
      }));

    return {
      message: 'Dashboard retrieved successfully.',
      mergeId: user.mergeId,
      mergeCoinBalance: user.mergeCoinBalance,
      totalInvestedUsd: investmentSummary.totalInvestedUsd,
      growthPct: investmentSummary.growthPct,
      latestApplication: latestApp,
      applications: applications.applications,
      recentActivity,
    };
  }
}
