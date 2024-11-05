import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Character } from '../models/character/character.interface';
import { AuthService } from './auth.service';
import { map, Observable, switchMap, take } from 'rxjs';
import { CharacterMedia } from '../models/character/character-media.interface';
import { CharacterClassMedia } from '../models/character/character-class-media.interface';
import { CharacterGear } from '../models/character/character-gear.interface';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    levelsAndExp = [
        { level: 1, exp: 400 },
        { level: 2, exp: 900 },
        { level: 3, exp: 1400 },
        { level: 4, exp: 2100 },
        { level: 5, exp: 2800 },
        { level: 6, exp: 3600 },
        { level: 7, exp: 4500 },
        { level: 8, exp: 5400 },
        { level: 9, exp: 6500 },
        { level: 10, exp: 7600 },
        { level: 11, exp: 8800 },
        { level: 12, exp: 10100 },
        { level: 13, exp: 11400 },
        { level: 14, exp: 12900 },
        { level: 15, exp: 14400 },
        { level: 16, exp: 16000 },
        { level: 17, exp: 17700 },
        { level: 18, exp: 19400 },
        { level: 19, exp: 21300 },
        { level: 20, exp: 23200 },
        { level: 21, exp: 25200 },
        { level: 22, exp: 27300 },
        { level: 23, exp: 29400 },
        { level: 24, exp: 31700 },
        { level: 25, exp: 34000 },
        { level: 26, exp: 36400 },
        { level: 27, exp: 38900 },
        { level: 28, exp: 41400 },
        { level: 29, exp: 44300 },
        { level: 30, exp: 47400 },
        { level: 31, exp: 50800 },
        { level: 32, exp: 54500 },
        { level: 33, exp: 58600 },
        { level: 34, exp: 62800 },
        { level: 35, exp: 67100 },
        { level: 36, exp: 71600 },
        { level: 37, exp: 76100 },
        { level: 38, exp: 80800 },
        { level: 39, exp: 85700 },
        { level: 40, exp: 90700 },
        { level: 41, exp: 95800 },
        { level: 42, exp: 101000 },
        { level: 43, exp: 106300 },
        { level: 44, exp: 111800 },
        { level: 45, exp: 117500 },
        { level: 46, exp: 123200 },
        { level: 47, exp: 129100 },
        { level: 48, exp: 135100 },
        { level: 49, exp: 141200 },
        { level: 50, exp: 147500 },
        { level: 51, exp: 153900 },
        { level: 52, exp: 160400 },
        { level: 53, exp: 167100 },
        { level: 54, exp: 173900 },
        { level: 55, exp: 180800 },
        { level: 56, exp: 187900 },
        { level: 57, exp: 195000 },
        { level: 58, exp: 202300 },
        { level: 59, exp: 209800 },
        { level: 60, exp: 217400 },
    ];

    constructor(private http: HttpClient, private authService: AuthService) {}

    private apiUrl = environment.euApiUrl;
    private namespace: string = environment.euProfileNamespace;

    private createHeaders(): Observable<HttpHeaders> {
        return this.authService.ensureValidToken().pipe(
            take(1),
            map((token) => {
                let headers = new HttpHeaders({
                    'Content-Type': 'application/json;charset=UTF-8',
                });

                if (token) {
                    headers = headers.set('Authorization', token);
                }

                return headers;
            })
        );
    }

    getCharacterByName(name: string, server: string): Observable<Character> {
        //cache busting timestamp
        const timestamp = new Date().getTime();

        name = name.toLowerCase();
        server = server.toLowerCase();

        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<Character>(
                    `${this.apiUrl}/profile/wow/character/${server}/${name}?namespace=${this.namespace}&_=${timestamp}`,
                    { headers }
                );
            })
        );
    }

    getCharacterAvatarByName(
        name: string,
        server: string
    ): Observable<CharacterMedia> {
        name = name.toLowerCase();
        server = server.toLowerCase();

        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<CharacterMedia>(
                    `${this.apiUrl}/profile/wow/character/${server}/${name}/character-media?namespace=${this.namespace}`,
                    { headers }
                );
            })
        );
    }

    getCharacterStatsByUrl(URL: string): Observable<any> {
        //cache busting timestamp
        const timestamp = new Date().getTime();
        URL = URL + `&_=${timestamp}`;

        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<any>(URL, { headers });
            })
        );
    }

    getCharacterClassIconById(id: number): Observable<CharacterClassMedia> {
        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<CharacterClassMedia>(
                    `${this.apiUrl}/data/wow/media/playable-class/${id}?namespace=${this.namespace}`,
                    { headers }
                );
            })
        );
    }

    getCharacterItemsByName(
        name: string,
        server: string
    ): Observable<CharacterGear> {
        //cache busting timestamp
        const timestamp = new Date().getTime();

        name = name.toLowerCase();
        server = server.toLowerCase();

        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<CharacterGear>(
                    `${this.apiUrl}/profile/wow/character/${server}/${name}/equipment?namespace=profile-classic1x-eu&_=${timestamp}`,
                    { headers }
                );
            })
        );
    }

    getCharacterItemsByUrl(URL: string): Observable<CharacterGear> {
        //cache busting timestamp
        const timestamp = new Date().getTime();
        URL = URL + `&_=${timestamp}`;

        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<CharacterGear>(URL, { headers });
            })
        );
    }
}
