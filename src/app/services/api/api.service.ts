import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    URL_BASE = 'http://localhost/api/entity/';
    PLAYERS = this.URL_BASE.concat('players');
    TEAMS = this.URL_BASE.concat('teams');

    constructor(private http: HttpClient) {
    }

    getPlayers(team: string) {
        return this.http.get(this.PLAYERS, {
            params: new HttpParams().set('club', team)
        });
    }

    getClub(team: string) {
        return this.http.get(this.TEAMS, {
            params: new HttpParams().set('club', team)
        });
    }

    getRandomClubs(amount: string) {
        return this.http.get(this.TEAMS, {
            params: new HttpParams().set('random', amount)
        });
    }
}
