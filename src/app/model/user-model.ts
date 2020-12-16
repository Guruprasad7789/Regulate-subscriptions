export interface User {
    email: string;
    isNewUser: boolean;
    creationTime: string;
    lastSignInTime: string;
}
export enum dialogDistinguish{
    errorDisplay,
    forgotPassword
}
