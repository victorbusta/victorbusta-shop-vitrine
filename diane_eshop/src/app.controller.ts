import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { Public } from './public.decorator';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { LoginDto } from './login.dto';
import { AuthService } from './auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any, @Body() login: LoginDto) {
    return this.authService.login(req.user);
  }
}