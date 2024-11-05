import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../../../core/services/character.service';

@Component({
    selector: 'armoury-exp-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './armoury-exp-bar.component.html',
    styleUrl: './armoury-exp-bar.component.scss',
})
export class ArmouryExpBarComponent implements OnInit {
    constructor(private characterService: CharacterService) {}

    @Input() level: number = 0;
    @Input() currentExp: number = 0;

    levelInfo: { level: number; exp: number } | undefined;
    levelPercentage: number = 0;

    ngOnInit(): void {
        this.levelInfo = this.characterService.levelsAndExp.find(
            (level) => level.level === this.level
        );

        if (this.levelInfo) {
            this.levelPercentage = Math.floor(
                (this.currentExp / this.levelInfo.exp) * 100
            );
        }

        console.log('req exp', this.levelInfo, this.levelPercentage, '%');
    }
}
