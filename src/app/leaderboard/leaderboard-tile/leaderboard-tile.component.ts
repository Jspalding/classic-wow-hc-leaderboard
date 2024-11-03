import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../core/models/character/character.interface';
import { IsDeadPipe } from '../../core/pipes/isDead.pipe';
import { IsSSFPipe } from '../../core/pipes/isSSF.pipe';
import { CharacterService } from '../../core/services/character.service';
import { CharacterMedia } from '../../core/models/character/character-media.interface';
import { take } from 'rxjs';

@Component({
    selector: 'app-leaderboard-tile',
    standalone: true,
    imports: [CommonModule, IsDeadPipe, IsSSFPipe],
    templateUrl: './leaderboard-tile.component.html',
    styleUrl: './leaderboard-tile.component.scss',
})
export class LeaderboardTileComponent implements OnInit, OnDestroy {
    constructor(private characterService: CharacterService) {}

    @Input() character!: Character;
    @Input() index: number = 0;

    avatarSrc: string = '';
    rarePortraitSrc: string = '/assets/img/rare-portrait.png';

    displayIndex: string = '';

    isLoading: boolean = false;

    ngOnInit(): void {
        this.isLoading = true;

        this.displayIndex = this.getIndexToNumeral(this.index);

        this.characterService
            .getCharacterAvatarByName(this.character.name, 'stitches')
            .pipe(take(1))
            .subscribe(
                (response: CharacterMedia) => {
                    console.log(response);
                    this.avatarSrc = response.assets[0].value;
                    this.isLoading = false;
                },
                (error) => {
                    if (error.error.code === 404) {
                        this.avatarSrc = '/assets/img/grave.svg';
                    }

                    console.log(error);
                }
            );
    }

    getIndexToNumeral(index: number): string {
        switch (index) {
            case 1:
                return 'I';

            case 2:
                return 'II';

            case 3:
                return 'III';

            case 4:
                return 'IV';

            case 5:
                return 'V';

            default:
                return '';
        }
    }

    getPositionColour(position: number): string {
        switch (position) {
            case 1:
                return 'first';

            case 2:
                return 'second';

            case 3:
                return 'third';

            default:
                return '';
        }
    }

    ngOnDestroy(): void {}
}
