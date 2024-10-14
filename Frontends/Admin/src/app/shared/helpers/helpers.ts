import { Observable, catchError, forkJoin, from, map, of } from 'rxjs';
import { setSidebarOpend, initTheme } from './ui-tools';

export function AppInitGeneric(): void {
    //Need to figure out if sidebar open or closed
    //Need to set theme and default theme
    //Loading page?
    //Is logged in?
    //Anything else?

    //Start with determining sidebar for now
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    if (width > 768) {
        setSidebarOpend();
    }

    initTheme();
}

/**
 * @description console.log(0.1 + 0.2) -> This function rounds a value according to another value. If value is 0.1 + 0.2, and step size is 0.1. Then return will be 0.3
 * @param value The value to be rounded
 * @param stepSize The step size we use to calculate the decimal places
 * @returns The new value that is rounded according to the step size
 */
export function roundToStepSizeDecimalPlaces(value: number, stepSize: number) {
    const decimalPlaces = getDecimalPlaces(stepSize);
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
}

/**
 * Gets the number of decimal places a number has
 * @param value The input number used to caluculate decimal places
 * @returns The number of decimal places
 */
export function getDecimalPlaces(value: number): number {
    const match = ('' + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) return 0;
    // Count decimals (must use a string to avoid floating-point issues)
    return Math.max(
        0,
        // Number of decimals
        (match[1] ? match[1].length : 0) -
        // Adjust for scientific notation
        (match[2] ? +match[2] : 0)
    );
}

export function isPromise(obj: any): obj is Promise<any> {
    const isPromise = !!obj && typeof obj.then === 'function';
    return isPromise;
}

export function isObservable(obj: any): obj is Observable<any> {
    const isObservable = !!obj && typeof obj.subscribe === 'function';
    return isObservable;
}


/**
 * Checks if the resolved object has the structure {message: string, data: any}.
 * If so, returns true and allows for further processing to extract the data.
 * 
 * @param obj The object to check.
 * @returns True if the object matches the structure, false otherwise.
 */
export function isSSHTTPResponseFormat(obj: any): obj is { message: string; data: any } {
    return obj && typeof obj === 'object' && 'message' in obj && 'data' in obj;
}


/**
 * Modifies the coreResolver function to include error handling.
 * Each operation's result will now indicate success, data, and potential errors.
 */
export function coreResolver(operations: Array<{ [key: string]: Observable<any> | Promise<any> | any }>): Observable<any> {
    const operationKeys = operations.map(op => Object.keys(op)[0]);
    const processedOperations = operations.map(op => {
        const key = Object.keys(op)[0];
        const operation = op[key];
        let operationObservable: Observable<any>;

        if (isObservable(operation)) {
            operationObservable = operation;
        } else if (isPromise(operation)) {
            operationObservable = from(operation);
        } else {
            operationObservable = of(operation);
        }

        return operationObservable.pipe(
            map((result: any) => {
                if (isSSHTTPResponseFormat(result)) {
                    return result.data;
                }
                return result;
            }),
            catchError((error: any) => of({ error })) // Capture errors and continue
        );
    });

    return forkJoin(processedOperations).pipe(
        map((results: any) => results.reduce((acc: any, value: any, index: any) => {
            acc[operationKeys[index]] = value;
            return acc;
        }, {} as { [key: string]: any })),
        catchError((error: any) => {
            // This ensures that if there's an error in the stream itself, it's handled
            // but this catch is primarily for catching errors that might not be operation-specific
            return of({ globalError: error });
        }),
        map((results: any) => {
            // Check if any operation resulted in an error, if so, throw to trigger the error callback
            const anyErrors = Object.values(results).some(result => result && typeof result === 'object' && 'error' in result);
            if (anyErrors) {
                throw results; // This will cause the subscribe error callback to be invoked
            }
            return results;
        })
    );
}