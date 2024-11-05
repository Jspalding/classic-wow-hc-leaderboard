import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'inline-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="spinner-container">
            <div class="second-spinner"></div>
        </div>
    `,
    styleUrl: './inline-loader.component.scss',
})
export class InlineLoaderComponent {}
