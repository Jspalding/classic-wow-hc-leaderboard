import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { take } from 'rxjs';
import { BnetAuthResp } from './core/models/bnet-auth/bnet-auth-response.interface';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}

    hasAuthToken: boolean = false;

    ngOnInit(): void {
        if (!this.authService.getToken()) {
            console.log('NO TOKEN - REFRESHING');
            this.authService
                .authToBnet()
                .pipe(take(1))
                .subscribe((response: BnetAuthResp) => {
                    console.log('auth', response);
                    this.authService.saveToken(
                        'Bearer ' + response.access_token
                    );
                    this.hasAuthToken = true;
                });
        } else {
            console.log('TOKEN ACTIVE');
            this.hasAuthToken = true;
        }
    }
}