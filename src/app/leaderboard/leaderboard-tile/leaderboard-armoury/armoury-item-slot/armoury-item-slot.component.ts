import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EquippedItem } from '../../../../core/models/character/character-gear.interface';
import { ItemService } from '../../../../core/services/item.service';
import { take } from 'rxjs';
import { ItemIconMedia } from '../../../../core/models/item/item-media.interface';

@Component({
    selector: 'armoury-item-slot',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './armoury-item-slot.component.html',
    styleUrl: './armoury-item-slot.component.scss',
})
export class ArmouryItemSlotComponent implements OnInit {
    constructor(private itemService: ItemService) {}
    @Input() item!: EquippedItem;

    iconSrc: string = '';
    wowHeadTooltip: string = '';

    ngOnInit(): void {
        this.wowHeadTooltip = 'item=' + this.item.item.id + '&domain=classic';

        this.itemService
            .getItemMediaByUrl(this.item.media.key.href)
            .pipe(take(1))
            .subscribe((response: ItemIconMedia) => {
                this.iconSrc = response.assets[0].value;
            });
    }
}
