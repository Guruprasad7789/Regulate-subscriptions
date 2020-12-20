import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormGroup} from "@angular/forms";
import { Models } from '../model/models';
import { User } from '../model/user-model';

@Injectable()
export class AuthenticationService {
    constructor(
        private auth: AngularFireAuth
    ){
    }
    public async firebaseLogin(credential: Models.AuthCredential): Promise<User>{
    return await this.auth.signInWithEmailAndPassword(credential.email,credential.password).then(res=>{
        const currentUser: User = {
            email: res.user.email,
            isNewUser: res.additionalUserInfo.isNewUser,
            creationTime: res.user.metadata.creationTime,
            lastSignInTime: res.user.metadata.lastSignInTime

        };
        return currentUser;
    });
    }
    public async firebaseRegister(credential: Models.AuthCredential): Promise<void>{
         await this.auth.createUserWithEmailAndPassword(credential.email,credential.password);
        }
  public async firebaseForgotPassword(email: string): Promise<void>{
            await this.auth.sendPasswordResetEmail(email);
           }
}
