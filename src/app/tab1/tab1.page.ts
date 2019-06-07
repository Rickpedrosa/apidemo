import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../services/api/api.service';
import {Player} from '../interfaces/interface.player';
import {Club} from '../interfaces/interface.club';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

    players: Player[] = [];
    asyncClub: Club;
    title = '';
    club = 'fc barcelona';

    constructor(private api: ApiService) {

    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        this.api.getPlayers(this.club).subscribe(data => {
                console.log(data);
                const p = 'players';
                this.players = data[p];
            },
            error => {
                console.log(error);
            });
        this.api.getClub(this.club).subscribe(data => {
            const p = 'records';
            this.asyncClub = data[p][0];
            this.title = this.asyncClub.club;
        });
    }

}
