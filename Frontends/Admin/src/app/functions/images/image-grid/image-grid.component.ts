import { Component } from '@angular/core';
import { SSDataGridComponent } from '../../../shared/components/ss-lib-components/ss-data-grid/ss-data-grid.component';
import { GridDefinitionField } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-definition-field.model';
import { GridFieldTypes } from '../../../shared/components/ss-lib-components/ss-data-grid/grid-field-types.model';
import { GridManager } from '../../../shared/components/ss-lib-components/ss-data-grid/gridManager';
import { ImagesService } from '../../../shared/services/images/images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Image } from '../../../shared/models/image.model';

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [SSDataGridComponent, AsyncPipe],
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent {

  gridManager = new GridManager;
  errorMessage: string = '';

  gridDefinition = [
    new GridDefinitionField('_id', 'id', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('url', 'URL', GridFieldTypes.Text, true, true, false),
    new GridDefinitionField('description', 'Description', GridFieldTypes.Text, true, true, false),
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public imagesService: ImagesService
  ) {
    this.gridManager.definition = this.gridDefinition;
    this.onRefresh();
  }

  ngOnInit(): void {
    this.imagesService.allImages$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((images: any) => {
      this.gridManager.dataset = images;
    });
  }

  onRefresh() {
    this.imagesService.refreshAllImages();
  }

  onCreateNew() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  onEditSingle(data: Image) {
    this.router.navigate(['form', data._id], { relativeTo: this.route });
  }

  onDeleteSingle(data: Image) {
    this.imagesService.deleteImage(data._id)
      .subscribe();
  }

  onDeleteMany(data: Image[]) {
    // Implement mass delete logic if needed
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
