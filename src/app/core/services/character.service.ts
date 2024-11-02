import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Character } from '../models/character/character.interface';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    private apiUrl = environment.euApiUrl;
    private namespace: string = environment.euProfileNamespace;

    private createHeaders(): HttpHeaders {
        const authToken = this.authService.getToken();

        let headers = new HttpHeaders({
            'Content-Type': 'application/json;charset=UTF-8',
        });

        if (authToken) {
            headers = headers.set('Authorization', authToken);
        }

        return headers;
    }

    getCharacterByName(name: string, server: string) {
        name = name.toLowerCase();
        server = server.toLowerCase();

        return this.http.get<Character>(
            `${this.apiUrl}/profile/wow/character/${server}/${name}?namespace=${this.namespace}`,
            { headers: this.createHeaders() }
        );
    }
}
