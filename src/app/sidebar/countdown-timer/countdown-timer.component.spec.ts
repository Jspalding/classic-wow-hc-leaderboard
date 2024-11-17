import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownComponent } from './countdown-timer.component';

describe('CountdownComponent', () => {
    let component: CountdownComponent;
    let fixture: ComponentFixture<CountdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CountdownComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CountdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
