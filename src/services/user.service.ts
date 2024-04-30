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
}
