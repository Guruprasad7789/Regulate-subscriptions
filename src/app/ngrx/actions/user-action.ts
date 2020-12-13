import { user } from '../../model/user-model';

export const USER_INFO = 'user info';

export class userInfoAction {
    readonly type = USER_INFO;
    constructor(public payload?: {data:user}) {
    }
}