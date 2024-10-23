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

  private imagesErrorSubject = new BehaviorSubject<string | null>(null);
  public get imagesError$(): Observable<string | null> {
    return this.imagesErrorSubject.asObservable();
  }

  private currentImageSubject = new BehaviorSubject<Image | null>(null);
  public get currentImage$(): Observable<Image | null> {
    return this.currentImageSubject.asObservable();
  }

  private allImagesSubject = new BehaviorSubject<Image[] | null>(null);
  public get allImages$(): Observable<Image[] | null> {
    return this.allImagesSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch all images
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
    return this.http.get<Image>(`${this.baseUrl}${imageId}`)
      .pipe(
        tap((image: Image) => {
          this.currentImageSubject.next(image);
        }),
        catchError((error: any) => {
          console.error('Error while fetching image:', error);
          return of(null);
        })
      );
  }

  // Add a new image
  addImage(image: Image): Observable<Image | null> {
    return this.http.post<Image>(this.baseUrl, image)
      .pipe(
        tap((newImage: Image) => {
          this.allImagesSubject.next([...(this.allImagesSubject.value || []), newImage]);
        }),
        catchError((error: any) => {
          console.error('Error while adding image:', error);
          return of(null);
        })
      );
  }

  // Update an existing image by ID
  updateImage(imageId: string, updatedImage: Image): Observable<Image | null> {
    return this.http.put<Image>(`${this.baseUrl}${imageId}`, updatedImage)
      .pipe(
        tap((res: Image) => {
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
          return of(null);
        })
      );
  }

  // Delete an image by ID
  deleteImage(imageId: string): Observable<boolean> {
    return this.http.delete<void>(`${this.baseUrl}${imageId}`)
      .pipe(
        tap(() => {
          const currentImages = this.allImagesSubject.value;
          if (currentImages && currentImages.length > 0) {
            const updatedImages = currentImages.filter((img: Image) => img._id !== imageId);
            this.allImagesSubject.next(updatedImages || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while deleting image:', error);
          return of(false);
        })
      );
  }
}
