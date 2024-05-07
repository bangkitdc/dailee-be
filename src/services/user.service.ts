import { IApiBaseUserSelf } from '@interfaces/user.iterface';
import { PrismaClient, User } from '@prisma/client';

export class UserService {
  private userModel = new PrismaClient().user;

  public async getUserById(user_id: number): Promise<User> {
    const user = await this.userModel.findUnique({
      where: {
        user_id: user_id,
      },
    });

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  public async getUserByUsername(username: string): Promise<User> {
    const user = await this.userModel.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  }

  public async getUserSelfDataById(user_id: number): Promise<IApiBaseUserSelf> {
    const selfData = await this.userModel.findUnique({
      where: {
        user_id: user_id,
      },
      select: {
        user_id: true,
        username: true,
        email: true
      }
    });

    return selfData;
  }
}
