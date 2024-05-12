import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html'
})

export class ConfirmationDialog {
  @ViewChild('buttonConfirm') buttonConfirm!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    public cdRef: ChangeDetectorRef
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}