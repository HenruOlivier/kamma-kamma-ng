import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'fileSize',
    pure: true
})
export class FileSizePipe implements PipeTransform {

    private sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    transform(value: any, decimals = 2) {
        if (!value) {
            return '';
        }
        const dm = (decimals < 0) ? 0 : decimals;
        const bytes = parseInt(value, 10);
        const index = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = parseFloat((bytes / Math.pow(1024, index)).toFixed(dm));
        return `${size} ${this.sizes[index]}`;
    }

}
