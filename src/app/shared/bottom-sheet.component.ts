import {Component} from '@angular/core';
import {
  MatBottomSheetRef
} from '@angular/material/bottom-sheet';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
@Component({
    selector: 'app-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrl: './bottom-sheet.component.scss',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInput]
  })
  export class BottomSheet {
    constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheet>) {}
  }