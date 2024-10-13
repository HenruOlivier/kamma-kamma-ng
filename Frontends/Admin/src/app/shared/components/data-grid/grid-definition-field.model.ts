import { GridFieldTypes } from "./grid-field-types.model";

export class GridDefinitionField {
    constructor(
        public lookup: string,
        public displayName: string,
        public valueType: GridFieldTypes = GridFieldTypes.Text,
        public filterable: boolean = true,
        public sortable: boolean = true,
        public hidden: boolean = false
    ){}
}
