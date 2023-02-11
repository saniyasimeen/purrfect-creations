import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ChangePasswordDto,
  JwtAuthenticatedRequest,
  LocalAuthenticatedRequest,
  LocalAuthResponseDto,
  LoginDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Authenticate using username and password',
    description: 'Get jwt token to access protected api routes',
  })
  @ApiResponse({ type: LocalAuthResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() { user }: LocalAuthenticatedRequest,
    @Body() _: LoginDto,
  ): Promise<LocalAuthResponseDto> {
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'Authenticate using username and password',
    description: 'Get jwt token to access protected api routes',
  })
  @ApiResponse({ type: LocalAuthResponseDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('change-password')
  async changePassword(
    @Request() { user }: JwtAuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<LocalAuthResponseDto> {
    const userDto = { id: user.sub, username: user.username };
    return this.authService.changePassword(userDto, changePasswordDto.password);
  }
}
