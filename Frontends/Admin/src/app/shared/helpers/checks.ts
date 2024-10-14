/**
 * 
 * @param value Value, object or array of type any
 * @returns True if the argument has value as not null && not undefined && not '' (empty string)
 */
export function hasValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
}