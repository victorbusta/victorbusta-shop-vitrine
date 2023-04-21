import { validatePassword } from './../../bcrypt/password-hasher';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  validateUser(email: string, pass: string): Promise<string | false> {
    return this.prisma.admin
      .findUnique({ where: { email: email } })
      .then((admin) => {
        if (admin && validatePassword(pass, admin.password)) {
          return admin.email;
        }
        return false;
      });
  }

  login(userEmail: string) {
    const payload = { admin_mail: userEmail };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
