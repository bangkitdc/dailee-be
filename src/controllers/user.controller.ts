import { HttpStatusCode } from '@constants/http.enum';
import { ResponseHelper } from '@helpers/response.helper';
import { RequestWithUser } from '@interfaces/auth.interface';
import { UserService } from '@services/user.service';
import { Response } from 'express';

export class UserController {
  constructor(private userService: UserService) {
    this.getSelfData = this.getSelfData.bind(this);
  }

  public async getSelfData(req: RequestWithUser, res: Response) {
    const selfData = await this.userService.getUserSelfDataById(req.user.user_id);

    return ResponseHelper.responseSuccess(
      res, 
      HttpStatusCode.Ok, 
      'Operation successful', 
      selfData
    );
  }
}
