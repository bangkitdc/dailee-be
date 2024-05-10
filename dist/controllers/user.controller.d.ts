import { RequestWithUser } from '../interfaces/auth.interface';
import { UserService } from '../services/user.service';
import { Response } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getSelfData(req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
