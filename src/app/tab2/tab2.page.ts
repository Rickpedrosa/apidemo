import {Component, OnDestroy} from '@angular/core';
import {ApiService} from '../services/api/api.service';
import {Club} from '../interfaces/interface.club';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnDestroy {

    teams: Club[] = [];
    infiniteData: Club[] = [];
    initSub: Subscription;
    loadingSub: Subscription;

    constructor(private api: ApiService) {
        this.initSub = this.api.getRandomClubs('30').subscribe(data => {
            const r = 'records';
            this.infiniteData = data[r];
        });
    }

    loadData(event) {
        setTimeout(() => {
            if (!this.initSub.closed) {
                this.initSub.unsubscribe();
            }

            this.loadingSub = this.api.getRandomClubs('10').subscribe(data => {
                    const r = 'records';
                    this.teams = data[r];
                },
                () => {
                },
                () => {
                    for (const value of this.teams) {
                        if (this.infiniteData.indexOf(value.club) === -1) {
                            this.infiniteData.push(value);
                        }
                    }
                });
            console.log(this.loadingSub);
            event.target.complete();
            // this.loadingSub.unsubscribe();
        }, 500);
    }

    ngOnDestroy(): void {
        if (!this.loadingSub.closed) {
            this.loadingSub.unsubscribe();
        }
    }
}
