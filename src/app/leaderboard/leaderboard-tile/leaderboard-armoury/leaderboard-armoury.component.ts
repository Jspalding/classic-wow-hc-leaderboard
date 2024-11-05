import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CharacterService } from '../../../core/services/character.service';
import {
    CharacterGear,
    EquippedItem,
} from '../../../core/models/character/character-gear.interface';
import { Character } from '../../../core/models/character/character.interface';
import { take } from 'rxjs';
import { ArmouryItemSlotComponent } from './armoury-item-slot/armoury-item-slot.component';
import { InlineLoaderComponent } from '../../../shared/inline-loader/inline-loader.component';
import { ArmouryExpBarComponent } from './armoury-exp-bar/armoury-exp-bar.component';

@Component({
    selector: 'leaderboard-armoury',
    standalone: true,
    imports: [
        CommonModule,
        InlineLoaderComponent,
        ArmouryItemSlotComponent,
        ArmouryExpBarComponent,
    ],
    templateUrl: './leaderboard-armoury.component.html',
    styleUrl: './leaderboard-armoury.component.scss',
})
export class LeaderboardArmouryComponent implements OnInit {
    constructor(private characterService: CharacterService) {}

    @Input() selectedCharacter!: Character;

    armour: EquippedItem[] = [];
    weapons: EquippedItem[] = [];
    trinkets: EquippedItem[] = [];

    isLoading: boolean = false;

    ngOnInit(): void {
        this.isLoading = true;

        this.characterService
            .getCharacterItemsByUrl(this.selectedCharacter.equipment.href)
            .pipe(take(1))
            .subscribe((response: CharacterGear) => {
                this.mapArmoury(response);
            });
    }

    mapArmoury(response: CharacterGear) {
        response.equipped_items.forEach((item: EquippedItem) => {
            if (item) {
                const itemClass = item.item_class.name.en_GB;
                const itemSlotType = item.slot.type;

                if (itemClass === 'Armor' && itemSlotType !== 'OFF_HAND') {
                    this.armour.push(item);
                }

                if (itemClass === 'Weapon' || itemSlotType === 'OFF_HAND') {
                    this.weapons.push(item);
                }
            }
        });

        this.isLoading = false;
    }
}
