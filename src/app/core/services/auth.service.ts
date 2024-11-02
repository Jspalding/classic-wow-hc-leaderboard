import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    saveToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    logout() {
        localStorage.removeItem('access_token');
    }
}
