import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { InvestmentsService } from './investments.service';

@ApiTags('Investments')
@ApiBearerAuth('access-token')
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Get()
  @ApiOperation({ summary: 'List current user investments' })
  findAll(@CurrentUser('sub') userId: string) {
    return this.investmentsService.findByUser(userId);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Investment summary for dashboard' })
  getSummary(@CurrentUser('sub') userId: string) {
    return this.investmentsService.getSummary(userId);
  }
}
