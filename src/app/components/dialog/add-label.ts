import {Component} from '@angular/core';
import {SubscriptionCrudService} from '../../services/subscriptionCrud.service';
import {Models} from '../../model/models';
import labelModel = Models.labelModel;
import {combineAll, map} from 'rxjs/operators';

@Component({
    template: `<div class="top-toolbar" fxLayout="row" fxLayoutAlign="start center">
        <button class="button" mat-dialog-close>
            <span class="material-icons">
            arrow_back
            </span>
        </button>
        <h2>Labels</h2>
    </div>
    <div fxLayout="row wrap" fxLayoutAlign="start center" fxLayoutGap="10px">
        <mat-chip-list *ngFor="let label of getLabelFromDB">
            <mat-chip class="mt-3 padding-top"><button (click)="selectedLabelForCurrentSubscription(label.label)">check</button><h4>{{label.label}}</h4></mat-chip>
        </mat-chip-list>

    </div>
        <footer class="footer bg-light text-center text-lg-start">
            <div fxLayoutAlign="space-evenly center" class="text-center p-3" >
                <input matInput type="text" [(ngModel)]="addSingleLabel" placeholder="Search or create new label">
                <button (click)="addLabelToLabelArray()"  class="button"><span class="material-icons">
            add
            </span>
                </button>
            </div>
        </footer>
       `,
    styles: [`
            .top-toolbar h2{
                margin-top: 8px;
                margin-left: 17px;
                color: #949191;
            }
            .top-toolbar button{
                 background:none;
                color:#4c4848;
                }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            z-index: 1000;
            left: 0;
        }
        .footer  div{
            background-color: #edeff5;
            height: 40px;
            margin: 27px 14px;
            border-radius: 20px;
        }
            .footer  div input {
                text-align: initial;
            }
        .footer  div button{
            color: #0095ff;
        }

            input::-webkit-input-placeholder {
                color: #676161;
                text-align: initial;
            }

            input::-ms-input-placeholder {
                color: #676161;
                text-align: initial;
            }

            input:-ms-input-placeholder {
                color: #676161;
                text-align: initial;
            }
            .padding-top{
                padding-top: 22px;
            }
    `]
})
export class AddLabelComponent{
    public addSingleLabel = '';
    public getLabelFromDB: labelModel[];
    public selectedLabel: string[]=[];
        constructor(private labelService: SubscriptionCrudService) {
            this.labelService.getLabelFromDB().subscribe(res => {
                console.log(res);
                this.getLabelFromDB = res;
            }, err => {
                console.log(err);
            });
    }
    public addLabelToLabelArray(): void{

            if (this.addSingleLabel !== '')
        {
            this.getLabelFromDB.push({label: this.addSingleLabel});
            this.labelService.addLabelToDB({label: this.addSingleLabel}).then(res => {
                    console.log('label added to db');
                },
                err => {
                    console.log(err);

                });
        }
            this.addSingleLabel = '';
    }
  public  selectedLabelForCurrentSubscription(label: string): void{
        this.selectedLabel.push(label);
        console.log(this.selectedLabel);
  }
}
