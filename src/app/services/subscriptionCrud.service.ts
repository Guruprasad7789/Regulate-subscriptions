import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormGroup} from '@angular/forms';
import {Models} from '../model/models';
import labelModel = Models.labelModel;
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SubscriptionCrudService {
    constructor(
        private firestore: AngularFirestore
    ){
    }
    public async addSubscriptionData(subscriptionFormData: FormGroup): Promise<void>{
    await this.firestore.collection('angular-subscriptions').add(subscriptionFormData);
    }
    public async  addLabelToDB(label: labelModel): Promise<void>{
 await this.firestore.collection('label-db').add(label);
    }
    public getLabelFromDB(): Observable<labelModel[]>{
        return this.firestore
            .collection('label-db')
            .snapshotChanges()
            .pipe(
                map((snaps) => {
                     return snaps.map((snap) => {
                            return snap.payload.doc.data() as labelModel;
     });
                    })
            );
    }
}
