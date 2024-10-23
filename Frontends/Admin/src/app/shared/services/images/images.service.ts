import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { Image } from '../../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl: string = 'http://localhost:5000/api/images/';  // Adjust this URL if necessary

  private imagesLoadingSubject = new BehaviorSubject<boolean>(false);
  public get imagesLoading$(): Observable<boolean> {
    return this.imagesLoadingSubject.asObservable();
  }

  private imageLoadingSubject = new BehaviorSubject<boolean>(false);
  public get imageLoading$(): Observable<boolean> {
    return this.imageLoadingSubject.asObservable();
  }

  private imagesErrorSubject = new BehaviorSubject<string | null>(null);
  public get imagesError$(): Observable<string | null> {
    return this.imagesErrorSubject.asObservable();
  }

  private currentImageErrorSubject = new BehaviorSubject<string | null>(null);
  public get currentImageError$(): Observable<string | null> {
    return this.currentImageErrorSubject.asObservable();
  }

  private currentImageSubject = new BehaviorSubject<Image | null>(null);
  public get currentImage$(): Observable<Image | null> {
    return this.currentImageSubject.asObservable();
  }

  private allImagesSubject = new BehaviorSubject<Image[] | null>(null);
  public get allImages$(): Observable<Image[] | null> {
    return this.allImagesSubject.asObservable();
  }

  private singleUpdateLoadingSubject = new BehaviorSubject<boolean>(false);
  public get singleUpdateLoading$(): Observable<boolean> {
    return this.singleUpdateLoadingSubject.asObservable();
  }

  private createUpdateErrSubject = new BehaviorSubject<string | null>(null);
  public get createUpdateErr$(): Observable<string | null> {
    return this.createUpdateErrSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch all images
  refreshAllImages(): void {
    this.fetchAllImages().pipe(
      tap((res: Image[]) => {
        if (res && res.length > 0) {
          this.currentImageSubject.next(res[0]);
        }
      }),
      catchError((error: any) => {
        console.error(error);
        return of(error);
      })
    ).subscribe();
  }

  fetchAllImages(): Observable<Image[]> {
    this.imagesLoadingSubject.next(true);

    return this.http.get<Image[]>(this.baseUrl)
      .pipe(
        tap((images: Image[]) => {
          this.allImagesSubject.next(images);
        }),
        catchError((error: any) => {
          console.error('Error while fetching images:', error);
          this.imagesErrorSubject.next('Error while fetching images');
          return of([]);
        }),
        finalize(() => {
          this.imagesLoadingSubject.next(false);
        })
      );
  }

  // Fetch an image by ID
  fetchImageById(imageId: string): Observable<Image | null> {
    this.imageLoadingSubject.next(true);
    return this.http.get<Image>(`${this.baseUrl}${imageId}`)
      .pipe(
        tap((image: Image) => {
          this.currentImageSubject.next(image);
        }),
        catchError((error: any) => {
          console.error('Error while fetching image:', error);
          this.currentImageErrorSubject.next('Error while fetching image');
          return of(null);
        }),
        finalize(() => {
          this.imageLoadingSubject.next(false);
        })
      );
  }

  // Add a new image
  addImage(image: Image): Observable<Image | null> {
    this.imagesLoadingSubject.next(true);
    this.singleUpdateLoadingSubject.next(true);
    this.createUpdateErrSubject.next(null);

    return this.http.post<Image>(this.baseUrl, image)
      .pipe(
        tap((newImage: Image) => {
          this.allImagesSubject.next([...(this.allImagesSubject.value || []), newImage]);
        }),
        catchError((error: any) => {
          console.error('Error while adding image:', error);
          this.createUpdateErrSubject.next('Error while adding image');
          return of(null);
        }),
        finalize(() => {
          this.imagesLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }

  // Update an existing image by ID
  updateImage(imageId: string, updatedImage: Image): Observable<Image | null> {
    this.imageLoadingSubject.next(true);
    this.singleUpdateLoadingSubject.next(true);
    this.createUpdateErrSubject.next(null);

    return this.http.put<Image>(`${this.baseUrl}${imageId}`, updatedImage)
      .pipe(
        tap((res: Image) => {
          // Update the current image if it's the one being updated
          if (this.currentImageSubject.value?._id === imageId) {
            this.currentImageSubject.next(res);
          }

          // Update the image in the image list
          const currentImages = this.allImagesSubject.value;
          if (currentImages && currentImages.length > 0) {
            const updatedImages = currentImages.map((img: Image) =>
              img._id === imageId ? res : img
            );
            this.allImagesSubject.next(updatedImages || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while updating image:', error);
          this.createUpdateErrSubject.next('Error while updating image');
          return of(null);
        }),
        finalize(() => {
          this.imageLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }

  // Delete an image by ID
  deleteImage(imageId: string): Observable<boolean> {
    this.imagesLoadingSubject.next(true);

    return this.http.delete<void>(`${this.baseUrl}${imageId}`)
      .pipe(
        tap(() => {
          // Remove the image from the image list
          const currentImages = this.allImagesSubject.value;
          if (currentImages && currentImages.length > 0) {
            const updatedImages = currentImages.filter((img: Image) => img._id !== imageId);
            this.allImagesSubject.next(updatedImages || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while deleting image:', error);
          this.imagesErrorSubject.next('Error while deleting image');
          return of(false);
        }),
        finalize(() => {
          this.imagesLoadingSubject.next(false);
        })
      );
  }
}