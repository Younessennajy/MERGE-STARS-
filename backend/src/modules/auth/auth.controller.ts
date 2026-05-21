import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SetupAdminDto } from './dto/setup-admin.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { RefreshTokenPayload } from './interfaces/jwt-payload.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('setup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create the first admin account (one-time only)',
    description:
      'Disabled automatically once any admin exists. Returns 409 if already set up.',
  })
  @ApiResponse({ status: 201, description: 'Admin account created.' })
  @ApiResponse({ status: 409, description: 'Admin already exists.' })
  setup(@Body() dto: SetupAdminDto) {
    return this.authService.setupAdmin(dto);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'Account created successfully.' })
  @ApiResponse({ status: 409, description: 'Email or personal ID already used.' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Returns accessToken + user info. Sets refresh_token cookie.',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Uses the HttpOnly refresh_token cookie set by login. No Authorization header needed.',
  })
  @ApiResponse({ status: 200, description: 'New accessToken issued.' })
  @ApiResponse({ status: 401, description: 'Session expired or token invalid.' })
  refresh(
    @CurrentUser() user: RefreshTokenPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(user.sub, user.refreshToken, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout and revoke all sessions' })
  @ApiResponse({ status: 200, description: 'All sessions terminated.' })
  @ApiResponse({ status: 401, description: 'Missing or invalid token.' })
  logout(
    @CurrentUser('sub') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(userId, res);
  }
}
