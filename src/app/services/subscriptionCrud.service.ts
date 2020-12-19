import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormGroup} from "@angular/forms";

@Injectable()
export class SubscriptionCrudService {
    constructor(
        private firestore: AngularFirestore
    ){
    }
    public async addSubscriptionData(subscriptionFormData: FormGroup): Promise<void>{
    await this.firestore.collection('angular-subscriptions').add(subscriptionFormData);
    }
}
