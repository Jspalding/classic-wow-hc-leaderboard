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
    @Input() character: Character;
    @Input() index: number = 0;

    avatarSrc: string = '';
    rarePortraitSrc: string = '/assets/img/rare-portrait.png';

    isLoading: boolean = false;

    ngOnInit(): void {
        this.isLoading = true;

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

    ngOnDestroy(): void {}
}