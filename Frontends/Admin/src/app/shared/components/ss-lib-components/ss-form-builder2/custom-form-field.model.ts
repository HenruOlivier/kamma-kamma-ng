export interface CustomFormField {

    /**
     * This function will be called whenever the value is set or updated from outside of your component
     * @param value 
     */
    writeValue(value: any): void;

    /**
     * This function will be called onInit. As paramater a callback function is passed. You must store this and call it to update the form control value
     * @param updateValueFunction Type Function
     */
    registerOnChange(updateValueFunction: any): void;
}