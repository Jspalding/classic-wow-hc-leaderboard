import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, take } from 'rxjs';
import { BnetAuthResp } from '../models/bnet-auth/bnet-auth-response.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private authUrl: string = environment.authUrl;
    private clientId: string = environment.clientId;
    private clientSecret: string = environment.clientSecret;
    private namespace: string = environment.euProfileNamespace;

    headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Battlenet-Namespace': this.namespace,
    });

    authToBnet(): Observable<any> {
        const body = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: `${this.clientId}`,
            client_secret: `${this.clientSecret}`,
        });

        return this.http.post(this.authUrl, body, { headers: this.headers });
    }

    saveToken(token: string, expiresIn: number) {
        const expiryTime = Date.now() + expiresIn * 1000;
        localStorage.setItem('access_token', token);
        localStorage.setItem('expires_in', expiryTime.toString());
    }
    isTokenExpired(): boolean {
        const expiryTime = localStorage.getItem('expires_in');
        return !expiryTime || Date.now() > parseInt(expiryTime, 10);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    ensureValidToken(): Observable<string | null> {
        if (this.isTokenExpired()) {
            console.log('**TOKEN EXPIRED - REFRESHING**');

            return this.authToBnet().pipe(
                switchMap((response: BnetAuthResp) => {
                    this.saveToken(
                        'Bearer ' + response.access_token,
                        response.expires_in
                    );
                    return of(this.getToken());
                }),
                catchError((err) => {
                    console.error('Error refreshing token:', err);
                    this.logout();
                    return of(null);
                })
            );
        } else {
            return of(this.getToken());
        }
    }

    logout() {
        localStorage.removeItem('access_token');
    }
}
