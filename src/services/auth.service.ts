import jwt, { JwtPayload } from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcryptjs';
import { Response } from 'express';
import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/http.exception';
import { HttpStatusCode } from '@constants/http.enum';
import { AuthHelper } from '@helpers/auth.helper';
import { REFRESH_TOKEN_SECRET } from '@config';

export class AuthService {
  private userService = new UserService();
  private userModel = new PrismaClient().user;

  async login(res: Response, email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    // Check user
    if (!user) {
      throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
    }

    // Password validation
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
    }

    // User is valid
    // Make refresh token
    const refreshToken = AuthHelper.createRefreshToken(user);

    // Send it to cookie
    AuthHelper.sendRefreshToken(res, refreshToken);

    // Make acess token
    const accessToken = AuthHelper.createAccessToken(user);

    return {
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email
      },
      token: accessToken,
    };
  }

  async register(
    email: string,
    username: string,
    password: string,
  ) {
    const isUsernameExists = await this.userService.getUserByUsername(username);
    const isEmailExists = await this.userService.getUserByEmail(email);

    // Check uniqueness
    const errors: Record<string, string[]> = {};

    if (isUsernameExists) {
      errors.username = ["Username already exists"];
    }

    if (isEmailExists) {
      errors.email = ["Email already exists"];
    }

    if (Object.keys(errors).length > 0) {
      throw new HttpException(
        HttpStatusCode.Conflict, 
        'Operation failed, please check your request again', 
        errors
      );
    }

    const hashedPassword = await hash(password, await genSalt());
    await this.userModel.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword
      },
    });

    return;
  }

  async refreshToken(res: Response, refreshToken: string | null) {
    if (!refreshToken) {
      throw new HttpException(
        HttpStatusCode.Unauthorized, 
        'Invalid credentials'
      );
    }

    let payload: string | JwtPayload | undefined;

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
      }

      payload = decoded;
    });

    // Token is valid
    if (typeof payload !== 'string' && payload && 'user_id' in payload) {
      const user = await this.userService.getUserById(payload.user_id);

      if (!user) {
        throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
      }

      // User is valid
      // Refresh the token
      const newRefreshToken = AuthHelper.createRefreshToken(user);

      // Send it to cookie
      AuthHelper.sendRefreshToken(res, newRefreshToken);

      // Make acess token
      const accessToken = AuthHelper.createAccessToken(user);

      return {
        token: accessToken,
      };
    } else {
      throw new HttpException(HttpStatusCode.Unauthorized, 'Invalid credentials');
    }
  }
}