import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Character } from '../../core/models/character/character.interface';
import { IsDeadPipe } from '../../core/pipes/isDead.pipe';
import { IsSSFPipe } from '../../core/pipes/isSSF.pipe';
import { CharacterService } from '../../core/services/character.service';
import { CharacterMedia } from '../../core/models/character/character-media.interface';
import { LeaderboardArmouryComponent } from './leaderboard-armoury/leaderboard-armoury.component';

@Component({
    selector: 'leaderboard-tile',
    standalone: true,
    imports: [CommonModule, IsDeadPipe, IsSSFPipe, LeaderboardArmouryComponent],
    templateUrl: './leaderboard-tile.component.html',
    styleUrl: './leaderboard-tile.component.scss',
})
export class LeaderboardTileComponent implements OnInit, OnDestroy {
    constructor(private characterService: CharacterService) {}

    @Input() character!: Character;
    @Input() index: number = 0;

    avatarSrc: string = '';

    badge: { roman: string; img: string } = { roman: '', img: '' };

    showArmory: boolean = false;

    isLoading: boolean = false;

    ngOnInit(): void {
        this.isLoading = true;

        this.badge = this.generateBadgeByIndex(this.index);

        this.characterService
            .getCharacterAvatarByName(this.character.name, 'stitches')
            .pipe(take(1))
            .subscribe(
                (response: CharacterMedia) => {
                    this.avatarSrc = response.assets[0].value;
                    this.isLoading = false;
                },
                (error) => {
                    if (error.error.code === 404) {
                        this.avatarSrc = '/assets/img/grave.svg';
                    }

                    console.log('404 handled');
                }
            );
    }

    generateBadgeByIndex(index: number): { roman: string; img: string } {
        switch (index) {
            case 1:
                return {
                    roman: 'I',
                    img: '/assets/img/leaderboard-icon-1.webp',
                };

            case 2:
                return {
                    roman: 'II',
                    img: '/assets/img/leaderboard-icon-2.webp',
                };

            case 3:
                return {
                    roman: 'III',
                    img: '/assets/img/leaderboard-icon-3.webp',
                };

            case 4:
                return {
                    roman: 'IV',
                    img: '/assets/img/leaderboard-icon-4.webp',
                };

            case 5:
                return {
                    roman: 'V',
                    img: '/assets/img/leaderboard-icon-5.webp',
                };

            default:
                return {
                    roman: 'R.I.P',
                    img: '/assets/img/graveyard.webp',
                };
        }
    }

    onCharacterSelect() {
        this.showArmory = !this.showArmory;
    }

    ngOnDestroy(): void {}
}
