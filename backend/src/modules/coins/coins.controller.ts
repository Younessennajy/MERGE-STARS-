import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { CoinsService } from './coins.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { PriceCalculatorDto } from './dto/price-calculator.dto';

@ApiTags('Coins')
@ApiBearerAuth('access-token')
@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Public()
  @Post('calculator')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate coin price (public preview)' })
  calculate(@Body() dto: PriceCalculatorDto) {
    return this.coinsService.calculatePrice(dto);
  }

  @Post('applications')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a new coin application' })
  create(
    @CurrentUser('sub') userId: string,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.coinsService.createApplication(userId, dto);
  }

  @Get('applications')
  @ApiOperation({ summary: 'List my coin applications' })
  findMine(@CurrentUser('sub') userId: string) {
    return this.coinsService.findUserApplications(userId);
  }

  @Get('applications/:id')
  @ApiOperation({ summary: 'Get my application detail with timeline' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  findOne(
    @CurrentUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.coinsService.findUserApplication(userId, id);
  }
}
