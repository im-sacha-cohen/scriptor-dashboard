import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { ModalDeleteComponent } from '../modal/modal-delete/modal-delete.component';
import { TreeGridService } from '../../services/tree-grid-service/tree-grid-service.service';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss']
})
export class TreeGridComponent implements OnInit {
  @Input() customColumn = '';
  @Input() defaultColumns: any[] = [];
  @Output() isDeleted = new EventEmitter<boolean>();

  allColumns: any[];
  showSpinner = true;
  dataSource: NbTreeGridDataSource<any>;
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
    private dialogService: NbDialogService,
    private treeGridService: TreeGridService
  ) { }

  ngOnInit(): void {
    this.allColumns = [ this.customColumn, ...this.defaultColumns ];
    this.subscribeToTreeGridService();
  }

  private subscribeToTreeGridService(): void {
    this.treeGridService.data.subscribe((value: any[]) => {
      this.dataSource = this.dataSourceBuilder.create(value);
    });

    this.treeGridService.showSpinner.subscribe((showSpinner: boolean) => {
      this.showSpinner = showSpinner;
    });
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  openDeleteModalFor(link: string, message: string): void {
    this.dialogService.open(ModalDeleteComponent, { context: {
      message: message,
      deleteRoute: link
    }}).onClose.subscribe(isDeleted => {
      if (isDeleted) {
        this.isDeleted.emit(true);
      }
    });
  }
}
