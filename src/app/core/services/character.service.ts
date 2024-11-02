import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Character } from '../models/character.interface';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.euApiUrl;

    getCharacterByName(name: string, server: string) {
        return this.http.get<Character>(
            `${this.apiUrl}/profile/wow/character/${server}/${name}`
        );
    }
}
