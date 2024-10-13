import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SSFileUploadModel } from '../../models/ss-file-upload.model';

@Component({
  selector: 'ss-chunk-uploader',
  templateUrl: './ss-chunk-uploader.component.html',
  styleUrls: ['./ss-chunk-uploader.component.scss']
})
export class SSChunkUploaderComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  isDragOver = false;
  files: SSFileUploadModel[] = [];
  isUploadActive: boolean = false;

  @Output() uploadStarted: EventEmitter<void> = new EventEmitter();
  @Output() uploadEnded: EventEmitter<void> = new EventEmitter();

  private _chunkSize: number;
  @Input()
  set chunkSize(value: number) {
    this._chunkSize = value !== undefined ? value : 1;
  }

  get chunkSize(): number {
    return Number(this._chunkSize) * 1024 * 1024 || 1 * 1024 * 1024;
  }

  //
  private _maxRetriesPerChunk: number;
  @Input()
  set maxRetriesPerChunk(value: number) {
    this._maxRetriesPerChunk = value !== undefined ? value : 5;
  }

  get maxRetriesPerChunk(): number {
    return Number(this._maxRetriesPerChunk) || 5;
  }

  //
  private _canUploadMany: boolean;
  @Input()
  set canUploadMany(value: boolean) {
    this._canUploadMany = value !== undefined ? value : false;
  }

  get canUploadMany(): boolean {
    return this._canUploadMany || false;
  }

  //
  private _uploadURL: string;
  @Input()
  set uploadURL(value: string) {
    this._uploadURL = value !== undefined ? value : '';
  }

  get uploadURL(): string {
    return this._uploadURL || '';
  }

  //
  private _descriptor: string;
  @Input()
  set descriptor(value: string) {
    this._descriptor = value !== undefined ? value : '';
  }

  get descriptor(): string {
    return this._descriptor || '';
  }

  private _fields: Array<{ key: string, value: any }> | { [key: string]: any } = [];
  @Input()
  set fields(value: Array<{ key: string, value: any }> | { [key: string]: any }) {
    this._fields = value !== undefined ? value : [];
  }

  get fields(): Array<{ key: string, value: any }> | { [key: string]: any } {
    return this._fields;
  }


  constructor(private http: HttpClient) { }

  //Action
  onStartUploading() {

    if (!this.uploadURL) {
      console.error(`SS-CHUNKLOADER-ERROR: A valid URL is required. Got: ${this.uploadURL}`);
      return;
    }

    if (!this.descriptor) {
      console.error(`SS-CHUNKLOADER-ERROR:A valid descriptor is required. Got: ${this.descriptor}`);
      return;
    }

    this.uploadStarted.emit();
    this.isUploadActive = true;
    this.files = this.files.filter(file => file.status !== 'complete');
    this.files.forEach(file => {
      if (file.status === 'error') {
        file.currentChunkIndex = 0;
        file.totalUploadedBytes = 0;
        file.status = 'waiting';
        file.progress = 0;
      }
    });
    if (this.files.length > 0) {
      this.uploadFileInChunks(this.files[0], 0);
    } else {
      this.isUploadActive = false;
      this.uploadEnded.emit()
    }

  }

  triggerFileInputClick() {
    this.fileInput.nativeElement.click();
  }

  //Queue Management
  onRemoveFile(index: number) {
    this.files.splice(index, 1);
  }

  //File handling 
  onFileSelected(event: any) {
    console.log(event);
    console.error(event);
    const selectedFiles = event.target.files;
    if (this.canUploadMany) {
      for (let i = 0; i < selectedFiles.length; i++) {
        let file = selectedFiles[i];
        if (file && file.size > 0 && file.type !== undefined && file.type !== null) {
          const totalChunks = Math.ceil(file.size / this.chunkSize);
          this.files.push({
            data: file,
            status: 'waiting',
            progress: 0,
            currentChunkIndex: 0,
            totalUploadedBytes: 0,
            totalChunks: totalChunks
          });
        }
      }
    }

    if (!this.canUploadMany) {
      this.files = [];
      let file = selectedFiles[0];
      if (file && file.size > 0 && file.type !== undefined && file.type !== null) {
        const totalChunks = Math.ceil(file.size / this.chunkSize);
        this.files.push({
          data: file,
          status: 'waiting',
          progress: 0,
          currentChunkIndex: 0,
          totalUploadedBytes: 0,
          totalChunks: totalChunks
        });
      }
    }
  }

  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const droppedFiles = event.dataTransfer.files;
    if (this.canUploadMany) {
      for (let i = 0; i < droppedFiles.length; i++) {
        let file = droppedFiles[i];
        if (file && file.size > 0 && file.type !== undefined && file.type !== null) {
          const totalChunks = Math.ceil(file.size / this.chunkSize);
          this.files.push({
            data: file,
            status: 'waiting',
            progress: 0,
            currentChunkIndex: 0,
            totalUploadedBytes: 0,
            totalChunks: totalChunks
          });
        }
      }
    } else {
      this.files = [];
      if (droppedFiles.length === 1) {
        let file = droppedFiles[0];
        if (file && file.size > 0 && file.type !== undefined && file.type !== null) {
          const totalChunks = Math.ceil(file.size / this.chunkSize);
          this.files.push({
            data: file,
            status: 'waiting',
            progress: 0,
            currentChunkIndex: 0,
            totalUploadedBytes: 0,
            totalChunks: totalChunks
          });
        }
      }
    }
  }

  //Upload:
  uploadFileInChunks(file: SSFileUploadModel, fileIndex: number) {
    file.status = 'uploading';

    const uploadChunk = (retryCount: number = 0) => {
      const start = file.currentChunkIndex * this.chunkSize;
      const end = Math.min(file.data.size, start + this.chunkSize);
      const chunk = file.data.slice(start, end);

      this.uploadChunkToServer(chunk, file).then(() => {
        file.currentChunkIndex++;
        file.totalUploadedBytes += chunk.size;
        file.progress = (file.currentChunkIndex / file.totalChunks) * 100;

        if (file.currentChunkIndex < file.totalChunks) {
          uploadChunk(); // Upload next chunk
        } else {
          file.status = 'complete';
          this.uploadNextFile(fileIndex);
        }
      }).catch(() => {
        if (retryCount < this.maxRetriesPerChunk) {
          //We retry uploading the same chunk, but add a slight wait
          setTimeout(() => {
            uploadChunk(retryCount + 1); // Retry uploading the same chunk
          }, 2500)

        } else {
          file.status = 'error';
          this.uploadNextFile(fileIndex);
        }
      });
    };

    uploadChunk();
  }

  uploadNextFile(currentFileIndex: number) {
    const nextFileIndex = currentFileIndex + 1;
    if (nextFileIndex < this.files.length) {
      this.uploadFileInChunks(this.files[nextFileIndex], nextFileIndex);
    } else {
      this.isUploadActive = false;
      this.uploadEnded.emit();
    }
  }

  uploadChunkToServer(chunk: Blob, file: SSFileUploadModel): Promise<any> {
    const formData = new FormData();

    formData.append('file', chunk, file.data.name);
    formData.append('chunkIndex', file.currentChunkIndex.toString());
    formData.append('totalChunks', file.totalChunks.toString());
    formData.append('descriptor', this.descriptor);

    let fieldsArray = [];
    if (Array.isArray(this._fields)) {
      fieldsArray = this._fields;
    } else if (this._fields && typeof this._fields === 'object') {
      fieldsArray = Object.entries(this._fields).map(([key, value]) => ({ key, value }));
    }

    fieldsArray.forEach(field => {
      formData.append(field.key, field.value);
    });

    return this.http.post(this.uploadURL, formData).toPromise();
  }

}