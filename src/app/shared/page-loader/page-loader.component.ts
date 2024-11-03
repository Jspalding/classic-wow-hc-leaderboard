import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-loader',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="spinner-wrapper">
        <div class="spinner-container">
            <div class="first-spinner">
                <div class="second-spinner"></div>
            </div>
        </div>

        <div class="spinner-text">
            @if(text) {
            {{ text }}
            } @else {
            <p>Loading</p>
            }
        </div>
    </div>`,
    styleUrl: './page-loader.component.scss',
})
export class PageLoaderComponent {
    @Input() text: string = '';
}
