import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, map, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { ItemIconMedia } from '../models/item/item-media.interface';

@Injectable({
    providedIn: 'root',
})
export class ItemService {
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

    getItemMediaByid(id: number): Observable<ItemIconMedia> {
        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<ItemIconMedia>(
                    `${this.apiUrl}/data/wow/media/item/${id}?namespace=${this.namespace}`,
                    { headers }
                );
            })
        );
    }

    getItemMediaByUrl(URL: string): Observable<ItemIconMedia> {
        //cache busting timestamp
        const timestamp = new Date().getTime();
        URL = URL + `&_=${timestamp}`;

        return this.createHeaders().pipe(
            take(1),
            switchMap((headers) => {
                return this.http.get<ItemIconMedia>(URL, { headers });
            })
        );
    }
}
