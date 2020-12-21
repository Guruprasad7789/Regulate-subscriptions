
export namespace Models {
   export enum colorPicker {
        circleColorPicker,
        customColorPicker
    }
   export interface AuthCredential{
        email: string;
        password: string;
    }

    // tslint:disable-next-line:class-name
   export class labelModel{
       label: string;
    }
}
