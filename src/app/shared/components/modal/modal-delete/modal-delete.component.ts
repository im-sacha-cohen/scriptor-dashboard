import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { QueryService } from 'src/app/shared/services/query/query.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {
  @Input() message: string;
  @Input() deleteRoute: string;
  showSpinner = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private queryService: QueryService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
  }

  close(deleted = false) {
    this.dialogRef.close(deleted);
  }

  deleteItem() {
    this.showSpinner = true;

    this.queryService.query(
      'DELETE',
      this.deleteRoute
    ).subscribe(
      resp => {
        this.close(true);
        this.toastrService.show("L'élément a bien été supprimé !", "Supprimé", { status: 'success' });
        this.showSpinner = false;
      },
      () => this.showSpinner = false
    );
  }
}
