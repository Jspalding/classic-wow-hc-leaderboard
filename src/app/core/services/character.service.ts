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
