import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterService } from '../core/services/character.service';
import { catchError, forkJoin, of, Subject, takeUntil } from 'rxjs';
import { Character } from '../core/models/character/character.interface';

import { LeaderboardTileComponent } from './leaderboard-tile/leaderboard-tile.component';
import { CountdownBtnComponent } from '../shared/countdown-btn/countdown-btn.component';
import { PageLoaderComponent } from '../shared/page-loader/page-loader.component';

@Component({
    selector: 'app-leaderboard',
    standalone: true,
    imports: [
        CommonModule,
        LeaderboardTileComponent,
        CountdownBtnComponent,
        PageLoaderComponent,
    ],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit, OnDestroy {
    constructor(private characterService: CharacterService) {}

    characterList: Character[] = [];
    graveyard: Character[] = [];

    isLoading = false;
    destroy$: Subject<void> = new Subject<void>();

    ngOnInit(): void {
        this.buildCharacterList();
    }

    buildCharacterList() {
        this.isLoading = true;

        const characters = [
            { name: 'smootheyes', server: 'stitches' },
            { name: 'hoofinboofer', server: 'stitches' },
            { name: 'teezone', server: 'nekrosh' },
            { name: 'goofygal', server: 'stitches' },
            { name: 'rubyreubs', server: 'stitches' },
            { name: 'pumpumpalaii', server: 'stitches' },
            { name: 'pumpumpala', server: 'stitches' },
            { name: 'oysqdnzyr', server: 'stitches' },
            { name: 'wnorhuhno', server: 'stitches' },
        ];

        const characterRequests = characters.map((character) =>
            this.characterService
                .getCharacterByName(character.name, character.server)
                .pipe(
                    catchError((error) => {
                        if (error.status === 404) {
                            console.warn(
                                `Character ${character.name} not found.`
                            );
                        } else {
                            console.error(
                                `Error fetching ${character.name}:`,
                                error
                            );
                        }

                        return of(null);
                    })
                )
        );

        forkJoin(characterRequests)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (responses: (Character | null)[]) => {
                    const isCharacter = (
                        character: Character | null
                    ): character is Character => character !== null;

                    const validCharacters = responses.filter(isCharacter);

                    this.characterList = this.sortDescending(
                        this.getAliveCharacters(validCharacters)
                    );

                    this.graveyard = this.getDeadCharacters(
                        this.sortDescending(validCharacters)
                    );

                    this.isLoading = false;
                },
                (error) => {
                    console.error('Unexpected error:', error);
                    this.isLoading = false;
                }
            );
    }

    getAliveCharacters(characterList: Character[]) {
        return characterList.filter(
            (character) => character && !character.is_ghost
        );
    }

    getDeadCharacters(characterList: Character[]) {
        return characterList.filter(
            (character) => character && character.is_ghost
        );
    }

    sortDescending(characterList: Character[]) {
        return characterList.sort((a: Character, b: Character) => {
            if (b.level === a.level) {
                return b.experience - a.experience;
            }
            return b.level - a.level;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
