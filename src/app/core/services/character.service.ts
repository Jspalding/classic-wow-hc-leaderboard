import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Character } from '../models/character/character.interface';
import { AuthService } from './auth.service';
import { map, Observable, switchMap, take } from 'rxjs';
import { CharacterMedia } from '../models/character/character-media.interface';
import { CharacterClassMedia } from '../models/character/character-class-media.interface';

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
        name = name.toLowerCase();
        server = server.toLowerCase();

        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<Character>(
                    `${this.apiUrl}/profile/wow/character/${server}/${name}?namespace=${this.namespace}`,
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
}
