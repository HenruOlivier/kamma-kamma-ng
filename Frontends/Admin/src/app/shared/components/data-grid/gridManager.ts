import { EventEmitter } from "@angular/core";
import { GridControl } from "./grid-control.model";

export class GridManager {

    gridEvent: EventEmitter<any> = new EventEmitter();

    private _dataset: any = [];
    private _definition: any = [];

    private _gridControls: any = [];

    private _output: any = [];

    private _itemsPerPage = 20;
    private _currentPage = 1;
    private _totalPages = 0;

    private _sortDirection: string = 'asc';
    private _sortField: string = '';

    private _verbose: boolean = false;

    private _selectActive: boolean = true;
    private _editActive: boolean = true;
    private _deleteActive: boolean = true;
    private _createNewActive: boolean = true;
    private _deleteManyActive: boolean = true;
    private _settingsActive: boolean = true;
    private _importActive: boolean = true;
    private _exportActive: boolean = true;

    constructor(dataset: any = [], definition: any = []) {
        this._dataset = dataset;
        this._definition = definition;
        this.populateDefinitionAttributes();
        this.populateDSMetadata();
    }

    //Getters
    get definition() {
        return this._definition;
    }

    get dataset() {
        return this._dataset;
    }

    get gridControls(): GridControl[] {
        return this._gridControls
    }

    get output() {
        if (this.dataset && this.dataset !== undefined && this.dataset !== null) {
            this.gridCompute();
            return this._output;
        } else {
            this._output = [];
            return this._output;
        }
    }

    get verbose() {
        return this._verbose;
    }

    get itemsPerPage() {
        return this._itemsPerPage;
    }

    get currentPage() {
        return this._currentPage;
    }

    get totalPages() {
        return this._totalPages;
    }

    get sortField() {
        return this._sortField;
    }

    get sortDirection() {
        return this._sortDirection;
    }

    get selectActive() {
        return this._selectActive;
    }

    get editActive() {
        return this._editActive;
    }

    get deleteActive() {
        return this._deleteActive;
    }

    get createNewActive() {
        return this._createNewActive;
    }

    get deleteManyActive() {
        return this._deleteManyActive;
    }

    get settingsActive() {
        return this._settingsActive;
    }

    get importActive() {
        return this._importActive;
    }

    get exportActive() {
        return this._exportActive;
    }

    //Setters
    set dataset(data: any) {
        if (data && data !== undefined && data !== null) {
            this._dataset = data;
            this.gridEvent.emit();
        } else {
            this._dataset = [];
        }
    }

    set definition(data: any) {
        this._definition = data;
        this.populateDefinitionAttributes();
        this.populateDSMetadata();
        this.gridEvent.emit();
    }

    set sortField(data: any) {
        this._sortField = data;
        this.gridEvent.emit();
    }

    set itemsPerPage(data: number) {
        this._itemsPerPage = data;
        this._totalPages = Math.ceil(this.dataset.length / this.itemsPerPage);
        this._currentPage = 1;
    }

    set verbose(data: boolean) {
        this._verbose = data;
        this.gridEvent.emit();
    }

    set selectActive(data: boolean) {
        this._selectActive = data;
        this.gridEvent.emit();
    }

    set editActive(data: boolean) {
        this._editActive = data;
        if (this.editActive === false) {
            this.removeGridControl('Edit');
        } else {
            this.addGridControl(new GridControl('Edit', 'ss-btn-circle-success', 'bi bi-pencil-fill'));
        }
        this.gridEvent.emit();
    }

    set createNewActive(data: boolean) {
        this._createNewActive = data;
        this.gridEvent.emit();
    }

    set deleteManyActive(data: boolean) {
        this._deleteManyActive = data;
        this.gridEvent.emit();
    }

    set settingsActive(data: boolean) {
        this._settingsActive = data;
        this.gridEvent.emit();
    }

    set importActive(data: boolean) {
        this._importActive = data;
        this.gridEvent.emit();
    }

    set exportActive(data: boolean) {
        this._exportActive = data;
        this.gridEvent.emit();
    }

    set deleteActive(data: boolean) {
        this._deleteActive = data;
        if (this.deleteActive === false) {
            this.removeGridControl('Delete');
        } else {
            this.addGridControl(new GridControl('Delete', 'ss-btn-circle-danger', 'bi bi-trash3'));
        }
        this.gridEvent.emit();
    }

    //--------------------------------PUBLICS-------------------------------------
    public setSortAscending() {
        this._sortDirection = 'asc';
    }

    public setSortDescending() {
        this._sortDirection = 'desc';
    }

    public goToNextPage() {
        if (this._currentPage < this._totalPages) {
            this._currentPage = this._currentPage + 1;
            this.gridCompute();
        }
    }

    public goToPreviousPage() {
        if (this._currentPage > 1) {
            this._currentPage = this._currentPage - 1;
            this.gridCompute();
        }
    }

    public getFieldValue(fieldName: string, row: any) {
        if (fieldName.includes('.')) {
            return fieldName.split(".").reduce((a, v) => a[v], row)
        } else {
            return row[fieldName];
        }
    }

    public setFieldFilterValue(columnName: string, value: string) {
        this.definition.find((def: any) => def.lookup === columnName).$filter = value;
        this.gridCompute();
    }

    public toggleAll(value: boolean) {
        this.dataset.forEach((dataItem: any) => {
            dataItem.$isSelected = value;
        });
    }

    public toggleSingle(row: any) {
        row.$isSelected = !row.$isSelected;
        return row;
    }

    public getSelected() {
        return this.dataset.filter((item: any) => item.$isSelected === true);
    }

    public getExportURI(): any {
        const exportData = this.getSelected();
        const theJSON = JSON.stringify(exportData);
        const uri = "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON);
        return uri;
    }

    public addGridControl(gridControl: GridControl) {
        if (this._verbose) {
            let isFound = this.gridControls.find((control: GridControl) => control.name === gridControl.name)
            if (isFound) {
                console.log(`%cWARNING. Duplicate Grid-Control added with name: ${gridControl.name}`, 'color: red;');
            } else {
                console.log(`%cSUCCESS. Grid-Control added with name: ${gridControl.name}`, 'color: green;');
            }
        }
        this.gridControls.push(gridControl);
        this.gridEvent.emit();
    }

    public removeGridControl(name: string) {
        if (this._verbose) {
            let isFound = this.gridControls.find((control: GridControl) => control.name === name)
            if (!isFound) {
                console.log(`%cWARNING. Grid-Control not found. Could not remove: ${name}`, 'color: red;');
            } else {
                console.log(`%cSUCCESS. Grid-Control found. Removing: ${name}`, 'color: green;');
            }
        }
        this._gridControls = this._gridControls.filter((control: GridControl) => control.name !== name);
    }

    public exportDownload(name: string = '') {
        let url = this.getExportURI();
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Export-SS-GRID' + name + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    public toggleFieldVisibility(fieldName: string, data: boolean) {
        let idx = this._definition.findIndex((field: any) => field.lookup === fieldName);

        if (idx > -1) {
            this._definition[idx].hidden = data;
            if (this._verbose) {
                console.log(`%cSUCCESS. Field visibility chanded for: ${fieldName} to hidden=${data}`, 'color: green;');
            }
        } else {
            if (this._verbose) {
                console.log(`%cWARNING. Field not found! Could not toggle visibility for: ${fieldName}`, 'color: red;');
            }
        }

        this.gridEvent.emit()
    }

    //--------------------------------PRIVATES-------------------------------------

    private gridCompute() {
        if (this._verbose) {
            const startTime = performance.now();
            console.time('Grid-Filter');
            var temp = this.filterPipeline(this.dataset);
            console.timeEnd('Grid-Filter');
            console.time('Grid-Sort');
            temp = this.sortPipeline(temp);
            console.timeEnd('Grid-Sort');
            console.time('Grid-Page');
            temp = this.paginatorPipeline(temp);
            console.timeEnd('Grid-Page');
            this._output = temp;
            const endTime = performance.now();
            this.gridLog('Grid-Compute-Pipeline', endTime - startTime);
        } else {
            var temp = this.filterPipeline(this.dataset);
            temp = this.sortPipeline(temp);
            temp = this.paginatorPipeline(temp);
            this._output = temp;
        }
    }

    private populateDefinitionAttributes() {
        if (this.definition.length > 0) {
            this.definition.forEach((definitionItem: any) => {
                definitionItem.$filterValue = '';
            });
            //this.definition.unshift({ name: '$selector', displayName: '', orderIndex: 1, valueType: '$selector', sortable: false, filterable: false });

            this._gridControls = [];

            if (this.editActive) {
                this.addGridControl(new GridControl('Edit', 'ss-btn-circle-success', 'bi bi-pencil-fill'));
            }
            if (this.deleteActive) {
                this.addGridControl(new GridControl('Delete', 'ss-btn-circle-danger', 'bi bi-trash3'));
            }
        }
    }

    private populateDSMetadata() {
        this.dataset.forEach((dataItem: any) => {
            dataItem.$isSelected = false;
        });
    }

    private paginatorPipeline(dataIn: any) {
        let subset: any = [];

        this._totalPages = Math.ceil(dataIn.length / this.itemsPerPage);
        subset = dataIn.slice((this._currentPage - 1) * this.itemsPerPage, this._currentPage * this.itemsPerPage);

        return subset;
    }

    private sortPipeline(dataIn: any) {
        if (this.sortField !== '' && this.sortField !== null && this.sortField !== undefined) {

            dataIn.sort((a: any, b: any) => {
                if (this.sortField.includes(".")) {
                    if (this.getFieldValue(this.sortField, a) < this.getFieldValue(this.sortField, b)) {
                        return (this.sortDirection === 'asc') ? -1 : 1;
                    }
                    if (this.getFieldValue(this.sortField, a) > this.getFieldValue(this.sortField, b)) {
                        return (this.sortDirection === 'asc') ? 1 : -1;
                    }
                    return 0;
                } else {
                    if (a[this.sortField] < b[this.sortField]) {
                        return (this.sortDirection === 'asc') ? -1 : 1;
                    }
                    if (a[this.sortField] > b[this.sortField]) {
                        return (this.sortDirection === 'asc') ? 1 : -1;
                    }
                    return 0;
                }
            });

            return dataIn;
        } else {
            return dataIn;
        }
    }

    private filterPipeline(dataIn: any) {
        this.definition.forEach((definitionItem: any) => {
            if (definitionItem.$filter !== '' && definitionItem.$filter !== null && definitionItem.$filter !== undefined) {
                dataIn = dataIn.filter((dataItem: any) => {
                    if (definitionItem.lookup.includes(".")) {
                        if (this.getFieldValue(definitionItem.lookup, dataItem).toString().toLowerCase().includes(definitionItem.$filter.toString().toLowerCase())) {
                            return dataItem;
                        }
                    } else {
                        if (dataItem[definitionItem.lookup].toString().toLowerCase().includes(definitionItem.$filter.toString().toLowerCase())) {
                            return dataItem;
                        }
                    }
                });
            }
        });
        return dataIn;
    }

    private gridLog(message: string, time: number) {
        if (time < 25) {
            console.log(`%c${message} ( ${time}ms)`, 'color: green;');
        } else if (time > 25 && time < 75) {
            console.log(`%c${message} ( ${time}ms)`, 'color: yellow;');
        } else if (time > 75) {
            console.log(`%c${message} ( ${time}ms)`, 'color: red;');
        }
    }
}