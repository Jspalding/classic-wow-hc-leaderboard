import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { take } from 'rxjs';
import { BnetAuthResp } from './core/models/bnet-auth/bnet-auth-response.interface';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}

    hasAuthToken: boolean = false;

    ngOnInit(): void {
        if (!this.authService.getToken() || this.authService.isTokenExpired()) {
            console.log('**NO TOKEN - REFRESHING**');
            this.authService
                .authToBnet()
                .pipe(take(1))
                .subscribe((response: BnetAuthResp) => {
                    console.log('Authenticated', response);
                    this.authService.saveToken(
                        'Bearer ' + response.access_token,
                        response.expires_in
                    );
                    this.hasAuthToken = true;
                });
        } else {
            console.log('TOKEN ACTIVE');
            this.hasAuthToken = true;
        }
    }
}
