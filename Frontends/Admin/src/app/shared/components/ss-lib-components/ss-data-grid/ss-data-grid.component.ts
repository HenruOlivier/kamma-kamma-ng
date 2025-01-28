import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { GridFieldTypes } from './grid-field-types.model';
import { GridManager } from './gridManager';
import * as UITools from '../../../helpers/ui-tools';
import { GridControlEvent } from './grid-control-event.model';
import { CommonModule } from '@angular/common';
import { SSInputSearchComponent } from '../ss-input-search/ss-input-search.component';
import { SSImgComponent } from '../ss-img/ss-img.component';
import { DateAgoPipe } from '../../../ss-pipes/date-ago.pipe';
import { FileSizePipe } from '../../../ss-pipes/file-size.pipe';
import { FormsModule } from '@angular/forms';
import { SSDialogComponent } from '../ss-dialog/ss-dialog.component';
import { SSInputCheckboxComponent } from '../ss-input-checkbox/ss-input-checkbox.component';

@Component({
  selector: 'ss-data-grid',
  standalone: true,
  templateUrl: './ss-data-grid.component.html',
  styleUrls: ['./ss-data-grid.component.scss'],
  imports: [CommonModule, SSInputSearchComponent, SSImgComponent, DateAgoPipe, FileSizePipe, FormsModule, SSDialogComponent, SSInputCheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SSDataGridComponent {
  @Input() manager!: GridManager;
  @Input() loading: boolean = false;
  @Input() error: boolean = false;
  @Input() errorText: string = '';

  @Output() editSingle: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSingle: EventEmitter<any> = new EventEmitter<any>();
  @Output() createNew: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteMany: EventEmitter<any> = new EventEmitter<any>();
  @Output() import: EventEmitter<any> = new EventEmitter<any>();
  @Output() export: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleSingle: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleMany: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemsPerPageChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortDirectionChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortFieldChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() controlTrigger: EventEmitter<GridControlEvent> = new EventEmitter<any>();
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();

  itemsPerPageOptions: number[] = [10, 20, 50, 100];

  gridFieldTypes: typeof GridFieldTypes = GridFieldTypes;

  deleteSingleDialogOpen: boolean = false;
  deleteSingleSelectedItem: any = null;

  deleteManyDialogOpen: boolean = false;
  deleteManySelectedItems: any[] = [];

  gridSettingsDialogOpen: boolean = false

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('manager' in changes) {
      const managerChange = changes['manager'];
      if (managerChange.currentValue) {
        this.manager.gridEvent.subscribe((gridEvent: any) => {
          this.cdr.detectChanges();
        });
      } else {
        //Manager is undefined
      }
    }
  }

  isSafeGridValue(row: any) {
    if (Object.values(this.gridFieldTypes).includes(row.valueType)) {
      return true;
    } else {
      return false;
    }
  }

  onItemsPerPageChange() {
    this.itemsPerPageChange.emit(this.manager.itemsPerPage);
  }

  onEditSingle(rowItem: any) {
    this.editSingle.emit(rowItem);
  }

  onDeleteSingle(rowItem: any) {
    this.deleteSingleSelectedItem = rowItem;
    this.deleteSingleDialogOpen = true;
  }

  onNew() {
    this.createNew.emit();
  }

  onDeleteMany() {
    this.deleteManySelectedItems = this.manager.getSelected();
    if (this.deleteManySelectedItems.length > 0) {
      this.deleteManyDialogOpen = true;
    }
  }

  async onImport(event: any) {
    var reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        let fileResult: any = event.target.result;
        var importJSON = JSON.parse(fileResult);
        this.import.emit(importJSON);
      }
    }
    reader.readAsText(event.target.files[0]);
  }

  onExport() {
    this.export.emit(this.manager.getSelected());
    this.manager.exportDownload();
  }

  onNextPage() {
    this.manager.goToNextPage();
    this.pageDown.emit();
  }

  onPreviousPage() {
    this.manager.goToPreviousPage();
    this.pageDown.emit();
  }

  onSort(columnName: string) {
    this.manager.sortField = columnName;
    this.sortFieldChange.emit(columnName);
  }

  onSortAscending() {
    this.manager.setSortAscending();
    this.sortDirectionChange.emit('asc');
  }

  onSortDescending() {
    this.manager.setSortDescending();
    this.sortDirectionChange.emit('desc');
  }

  onSearchChangeEvent(column: string, value: any) {
    this.manager.setFieldFilterValue(column, value);
    this.filterChange.emit({ column: column, value: value });
  }

  onToggleAll(event: any) {
    this.manager.toggleAll(event.target.checked);
    this.toggleMany.emit(event.target.checked);
  }

  onToggleOne(row: any) {
    let result = this.manager.toggleSingle(row);
    this.toggleSingle.emit(result);
  }

  onCustomEvent(control: any, row: any) {
    this.controlTrigger.emit({ data: row, event: control.name });
  }

  onRefresh() {
    this.refresh.emit();
  }

  getBrandURL() {
    let theme = UITools.getTheme();
    if (theme === 'light-mode') {
      return 'assets/statics/brand_sm_light.png';
    } else if (theme === 'dark-mode') {
      return 'assets/statics/brand_sm_dark.png';
    } else {
      return 'assets/statics/error.png';
    }
  }

  getErrorImgURL() {
    let theme = UITools.getTheme();
    if (theme === 'light-mode') {
      return 'assets/statics/error_sm_light.gif';
    } else if (theme === 'dark-mode') {
      return 'assets/statics/error_sm_dark.gif';
    } else {
      return 'assets/statics/error.png';
    }
  }

  onDeleteSingleDialogCancel() {
    this.deleteSingleDialogOpen = false;
    this.deleteSingleSelectedItem = null;
  }

  onDeleteSingleDialogConfirm() {
    if (this.deleteSingleSelectedItem !== null) {
      this.deleteSingle.emit(this.deleteSingleSelectedItem);
    }
    this.deleteSingleDialogOpen = false;
    this.deleteSingleSelectedItem = null;
  }

  onDeleteManyDialogCancel() {
    this.deleteManyDialogOpen = false;
    this.deleteManySelectedItems = [];

  }

  onDeleteManyDialogConfirm() {
    if (this.deleteManySelectedItems.length > 0) {
      this.deleteMany.emit(this.deleteManySelectedItems);
    }
    this.deleteManyDialogOpen = false;
    this.deleteManySelectedItems = [];
  }

  onOpenGridSettings() {
    this.gridSettingsDialogOpen = true;
  }

  onCloseGridSettings() {
    this.gridSettingsDialogOpen = false;
  }
}