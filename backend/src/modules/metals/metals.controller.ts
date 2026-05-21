import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { MetalsService } from './metals.service';

@ApiTags('Metals')
@Controller('metals')
export class MetalsController {
  constructor(private readonly metalsService: MetalsService) {}

  @Public()
  @Get('live')
  @ApiOperation({ summary: 'Get latest live metal prices (public)' })
  getLive() {
    return this.metalsService.getLivePrices();
  }
}
